import { create } from "zustand";
import { uid } from "@/cv/geometry";
import {
  applyEducationAdd,
  applyEducationRemove,
  applyEducationUpdate,
  applyExperienceAdd,
  applyExperienceRemove,
  applyExperienceUpdate,
  applyIdentity,
  applyLanguagesUpdate,
  applySkillsUpdate,
  computeElementAutoHeight,
  parseProfile,
  resizeElementWithFlow,
  SAMPLE,
  syncBoundElementsFromProfile,
  syncProfile,
} from "@/cv/profile";
import { buildTemplate } from "@/cv/templates";
import { JOB_PRESETS, getRandomBoost } from "@/cv/presets";
import { COLOR_PALETTES, applyPaletteToElements } from "@/cv/palettes";
import { SECTION_PACKS } from "@/cv/packs";
import { saveCvToCloud, loadCvFromCloud } from "@/lib/cloud-cv";
import { downloadDirectPDF } from "@/cv/pdf";
import { extractFromText } from "@/cv/extractor";
import { compactPageSpacing, isStudioFreeElement, paginateDocFlow } from "@/cv/pagination";
import { auditDocument, type AuditIssue } from "@/cv/audit";
import type {
  Bind,
  ContactIcon,
  Content,
  CVElement,
  Doc,
  Education,
  ElStyle,
  ElType,
  Experience,
  IdentityField,
  Meter,
  Page,
  Profile,
  TemplateId,
} from "@/cv/types";
import { baseStyle, INK, PAGE_H, SHEET, SIGNAL } from "@/cv/types";

const KEY = "libre-cv-doc-v1";
const META_KEY = "libre-cv-meta-v1";

export type ElementPatch = Partial<Pick<CVElement, "x" | "y" | "w" | "h" | "rotation" | "locked" | "hidden">> & {
  style?: Partial<ElStyle>;
  content?: Partial<Content>;
};

type Flags = "showGrid" | "snap" | "guides" | "margins";

export type SaveStatus = "saved" | "saving" | "unsaved";
export type EditorMode = "guided" | "pro";

export type ConfirmRequest = {
  title: string;
  message: string;
  confirmLabel: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
};

type StoredMeta = {
  editorMode?: EditorMode;
  activeTemplate?: TemplateId;
  activePageId?: string;
  layoutCustomized?: boolean;
};

type State = {
  doc: Doc;
  past: Doc[];
  future: Doc[];
  historyHeld: boolean;
  activePageId: string;
  selectedIds: string[];
  editingId: string | null;
  zoom: number;
  editorMode: EditorMode;
  activeTemplate: TemplateId;
  layoutCustomized: boolean;
  paginationBlocked: boolean;
  readabilityModalOpen: boolean;
  plainTextModalOpen: boolean;
  pendingExportConfirm: boolean;
  confirmModal: ConfirmRequest | null;
  showGrid: boolean;
  snap: boolean;
  guides: boolean;
  margins: boolean;
  notice: string | null;
  clipboard: CVElement[];
  saveStatus: SaveStatus;
  lastSavedAt: string | null;
  syncCode: string | null;
  cloudStatus: "idle" | "saving" | "synced" | "error";
  cloudModalOpen: boolean;
  extractorModalOpen: boolean;
  mobileTouchMode: boolean;
  onboarding: boolean;
  setEditorMode: (mode: EditorMode) => void;
  setConfirmModal: (req: ConfirmRequest | null) => void;
  setReadabilityModalOpen: (open: boolean, pendingExport?: boolean) => void;
  setPlainTextModalOpen: (open: boolean) => void;
  paginateDocument: () => void;
  compactSpacing: (pageId?: string) => void;
  focusAuditIssue: (issue: AuditIssue) => void;
  requestPdfExport: () => Promise<void>;
  applyGlobalFont: (font: string) => void;
  setCloudModalOpen: (open: boolean) => void;
  setExtractorModalOpen: (open: boolean) => void;
  setMobileTouchMode: (active: boolean) => void;
  setOnboarding: (onboarding: boolean) => void;
  syncToCloud: (title?: string) => Promise<string | null>;
  loadFromCloud: (code: string) => Promise<boolean>;
  directPdfExport: () => Promise<void>;
  hydrate: () => void;
  saveNow: () => void;
  setZoom: (z: number) => void;
  toggle: (key: Flags) => void;
  notify: (msg: string) => void;
  select: (ids: string[]) => void;
  setActive: (id: string) => void;
  setEditing: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  hold: () => void;
  release: () => void;
  patchElements: (pageId: string, patches: Record<string, ElementPatch>) => void;
  patchElement: (pageId: string, id: string, patch: ElementPatch, live?: boolean) => void;
  patchSelectedStyle: (patch: Partial<ElStyle>, live?: boolean) => void;
  setIdentity: (field: IdentityField, value: string) => void;
  updateExperience: (index: number, patch: Partial<Experience>, live?: boolean) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateEducation: (index: number, patch: Partial<Education>, live?: boolean) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateSkills: (skills: string[], live?: boolean) => void;
  updateLanguages: (languages: Meter[], live?: boolean) => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  copy: () => void;
  paste: () => void;
  align: (mode: "left" | "center" | "right" | "top" | "middle" | "bottom") => void;
  distribute: (axis: "x" | "y") => void;
  order: (dir: "front" | "back" | "forward" | "backward") => void;
  lockSelected: (locked: boolean) => void;
  toggleHidden: (pageId: string, id: string) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  moveSection: (sectionId: string, direction: "up" | "down") => void;
  addElement: (type: ElType) => void;
  applyTemplate: (id: TemplateId) => void;
  requestApplyTemplate: (id: TemplateId) => void;
  resetLayout: () => void;
  requestResetLayout: () => void;
  applyJobPreset: (id: string) => void;
  requestApplyJobPreset: (id: string) => void;
  applyPalette: (paletteId: string) => void;
  addSectionPack: (packId: string) => void;
  boostElementText: (id: string, phrase?: string) => void;
  addPage: () => void;
  duplicatePage: () => void;
  deletePage: (id: string) => void;
  renamePage: (id: string, name: string) => void;
  setPageBackground: (color: string, live?: boolean) => void;
  importExtractedProfile: (profile: Profile, template?: TemplateId, asNewPage?: boolean) => void;
  newDocument: () => void;
  requestNewDocument: () => void;
  loadDocument: (doc: Doc) => void;
  importText: (raw: string, template: TemplateId) => void;
};

let noticeTimer = 0;

function formatTime(d = new Date()) {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const TEMPLATE_ID_RE =
  /^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-\d+$|^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-/;

export function getStudioUnboundElements(page: Page): CVElement[] {
  return page.elements.filter((el) => {
    if (el.hidden) return false;
    if (el.type === "photo" && Boolean(el.content.src)) return true;
    if (!el.bind && !TEMPLATE_ID_RE.test(el.id)) return true;
    return false;
  });
}

function freshDoc(): Doc {
  const profile = structuredClone(SAMPLE);
  return {
    profile,
    pages: [
      {
        id: "page-1",
        name: "Page 1",
        background: SHEET,
        elements: buildTemplate("modern", profile, "seed"),
      },
    ],
  };
}

export function buildPaginatedDocFromProfile(
  profile: Profile,
  template: TemplateId,
  firstPageId = "page-1",
): Doc {
  const cleanProfile = structuredClone(profile);
  const baseProfile: Profile = {
    ...cleanProfile,
    experiences: cleanProfile.experiences.slice(0, 3),
    educations: cleanProfile.educations.slice(0, 2),
  };

  let nextDoc: Doc = {
    profile: baseProfile,
    pages: [
      {
        id: firstPageId,
        name: "Page 1",
        background: SHEET,
        elements: buildTemplate(template, baseProfile, `${template}-${uid()}`),
      },
    ],
  };

  for (let i = 3; i < cleanProfile.experiences.length; i++) {
    nextDoc = applyExperienceAdd(nextDoc, firstPageId, cleanProfile.experiences[i]);
  }
  for (let i = 2; i < cleanProfile.educations.length; i++) {
    nextDoc = applyEducationAdd(nextDoc, firstPageId, cleanProfile.educations[i]);
  }

  nextDoc = syncBoundElementsFromProfile({ ...nextDoc, profile: cleanProfile });
  const paginated = paginateDocFlow(nextDoc);
  return paginated.doc;
}

function flushSave(doc: Doc) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(doc));
    useStudio.setState({ saveStatus: "saved", lastSavedAt: formatTime() });
  } catch {
    useStudio.getState().notify("Enregistrement local saturé — exporte le JSON");
  }
}

function saveMeta(patch?: Partial<StoredMeta>) {
  if (typeof window === "undefined") return;
  try {
    const s = useStudio.getState();
    const meta: StoredMeta = {
      editorMode: patch?.editorMode ?? s.editorMode,
      activeTemplate: patch?.activeTemplate ?? s.activeTemplate,
      activePageId: patch?.activePageId ?? s.activePageId,
      layoutCustomized: patch?.layoutCustomized ?? s.layoutCustomized,
    };
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    // ignore
  }
}

function readMeta(): StoredMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredMeta;
  } catch {
    return null;
  }
}

function persist(doc: Doc) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(doc));
  } catch {
    // ignore
  }
  saveMeta();
  window.clearTimeout(persistTimer);
  useStudio.setState({ saveStatus: "saved", lastSavedAt: formatTime() });
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    try {
      const doc = useStudio.getState().doc;
      if (doc) localStorage.setItem(KEY, JSON.stringify(doc));
      saveMeta();
    } catch {
      // ignore
    }
  });
}

function readStorage(): Doc | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Doc;
    if (!data?.profile || typeof data.profile.name !== "string") return null;
    if (!Array.isArray(data.pages) || data.pages.length === 0) return null;
    if (!Array.isArray(data.profile.experiences) || !Array.isArray(data.profile.skills)) return null;
    return data;
  } catch {
    return null;
  }
}

function mergeElement(el: CVElement, patch: ElementPatch): CVElement {
  return {
    ...el,
    ...patch,
    style: patch.style ? { ...el.style, ...patch.style } : el.style,
    content: patch.content ? { ...el.content, ...patch.content } : el.content,
  };
}

function mapPage(doc: Doc, pageId: string, fn: (page: Page) => Page): Doc {
  return { ...doc, pages: doc.pages.map((p) => (p.id === pageId ? fn(p) : p)) };
}

const initial = freshDoc();

export const useStudio = create<State>((set, get) => {
  function commit(recipe: (doc: Doc) => Doc, live: boolean) {
    const current = get().doc;
    if (live) {
      if (!get().historyHeld) {
        set({
          past: [...get().past, structuredClone(current)].slice(-80),
          future: [],
          historyHeld: true,
        });
      }
      const next = recipe(get().doc);
      set({ doc: next });
      persist(next);
      return;
    }
    const next = recipe(current);
    set({
      past: [...get().past, structuredClone(current)].slice(-80),
      future: [],
      historyHeld: false,
      doc: next,
    });
    persist(next);
  }

  function selectedOnActive() {
    const { doc, activePageId, selectedIds } = get();
    const page = doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0];
    return { page, elements: page.elements.filter((el) => selectedIds.includes(el.id)) };
  }

  function maybePaginateGuided(nextDoc: Doc): Doc {
    if (get().editorMode !== "guided") return nextDoc;
    const res = paginateDocFlow(nextDoc);
    const activeExists = res.doc.pages.some((p) => p.id === get().activePageId);
    const nextActiveId = activeExists
      ? get().activePageId
      : res.doc.pages[res.doc.pages.length - 1]?.id ?? res.doc.pages[0].id;
    set({
      paginationBlocked: res.blockedByFreeElement,
      activePageId: nextActiveId,
    });
    return res.doc;
  }

  return {
    doc: initial,
    past: [],
    future: [],
    historyHeld: false,
    activePageId: initial.pages[0].id,
    selectedIds: [],
    editingId: null,
    zoom: 0.85,
    editorMode: "pro",
    activeTemplate: "modern",
    layoutCustomized: false,
    paginationBlocked: false,
    readabilityModalOpen: false,
    plainTextModalOpen: false,
    pendingExportConfirm: false,
    confirmModal: null,
    showGrid: false,
    snap: true,
    guides: true,
    margins: false,
    notice: null,
    clipboard: [],
    saveStatus: "saved",
    lastSavedAt: null,
    syncCode: null,
    cloudStatus: "idle",
    cloudModalOpen: false,
    extractorModalOpen: false,
    mobileTouchMode: false,
    onboarding: false,

    setEditorMode: (mode) => {
      if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      set({ editorMode: mode, editingId: null });
      saveMeta({ editorMode: mode });
    },
    setConfirmModal: (req) => set({ confirmModal: req }),
    setReadabilityModalOpen: (open, pendingExport = false) =>
      set({ readabilityModalOpen: open, pendingExportConfirm: open ? pendingExport : false }),
    setPlainTextModalOpen: (open) => set({ plainTextModalOpen: open }),

    paginateDocument: () => {
      commit((doc) => {
        const res = paginateDocFlow(doc, { force: true });
        const activeExists = res.doc.pages.some((p) => p.id === get().activePageId);
        const nextActiveId = activeExists
          ? get().activePageId
          : res.doc.pages[res.doc.pages.length - 1]?.id ?? res.doc.pages[0].id;
        set({
          paginationBlocked: false,
          activePageId: nextActiveId,
        });
        return res.doc;
      }, false);
      get().notify("✓ Contenu réparti sur les pages A4");
    },

    compactSpacing: (targetPageId) => {
      commit((doc) => {
        const compacted = compactPageSpacing(doc, targetPageId);
        const activeExists = compacted.pages.some((p) => p.id === get().activePageId);
        const nextActiveId = activeExists
          ? get().activePageId
          : compacted.pages[compacted.pages.length - 1]?.id ?? compacted.pages[0].id;
        set({
          paginationBlocked: false,
          activePageId: nextActiveId,
        });
        return compacted;
      }, false);
      get().notify("✓ Espacement vertical optimisé");
    },

    focusAuditIssue: (issue) => {
      set({
        activePageId: issue.pageId,
        selectedIds: issue.elementIds,
        editingId: null,
      });
      saveMeta({ activePageId: issue.pageId });
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cv-focus-issue", { detail: issue }));
        window.setTimeout(() => {
          const targetId = issue.elementIds[0];
          const selector = targetId
            ? `[data-sheet="${issue.pageId}"] [data-element="${targetId}"], [data-element="${targetId}"]`
            : `[data-sheet="${issue.pageId}"]`;
          const node = document.querySelector(selector);
          if (node instanceof HTMLElement) {
            node.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
          }
        }, 40);
      }
    },

    requestPdfExport: async () => {
      const { doc, editorMode, paginationBlocked } = get();
      const audit = auditDocument(doc, { editorMode, paginationBlocked });
      if (audit.hasCriticalExportIssues) {
        set({ readabilityModalOpen: true, pendingExportConfirm: true });
        return;
      }
      await get().directPdfExport();
    },

    setCloudModalOpen: (open) => set({ cloudModalOpen: open }),
    setExtractorModalOpen: (open) => set({ extractorModalOpen: open }),
    setMobileTouchMode: (active) => set({ mobileTouchMode: active }),
    setOnboarding: (onboarding) => set({ onboarding }),

    hydrate: () => {
      // 1. Inspect URL parameters for ?sync=CODE
      let urlSyncCode: string | null = null;
      if (typeof window !== "undefined") {
        try {
          const params = new URLSearchParams(window.location.search);
          const s = params.get("sync");
          if (s && s.trim()) urlSyncCode = s.trim().toUpperCase();
        } catch {
          // ignore
        }
      }

      // 2. Retrieve local storage CV, metadata, and stored sync code
      const loaded = readStorage();
      const meta = readMeta();
      let storedSyncCode: string | null = null;
      if (typeof window !== "undefined") {
        try {
          storedSyncCode = localStorage.getItem("libre-cv-sync-code");
        } catch {
          // ignore
        }
      }

      const activeCode = urlSyncCode || storedSyncCode;
      if (activeCode) {
        set({ syncCode: activeCode });
      }

      if (meta) {
        set({
          editorMode: meta.editorMode === "guided" || meta.editorMode === "pro" ? meta.editorMode : get().editorMode,
          activeTemplate: meta.activeTemplate ?? get().activeTemplate,
          layoutCustomized: Boolean(meta.layoutCustomized),
        });
      }

      if (urlSyncCode) {
        get().loadFromCloud(urlSyncCode);
        return;
      }

      if (!loaded) return;
      const syncedDoc = syncBoundElementsFromProfile(loaded, true);
      const validPageId =
        meta?.activePageId && syncedDoc.pages.some((p) => p.id === meta.activePageId)
          ? meta.activePageId
          : syncedDoc.pages[0].id;
      set({
        doc: syncedDoc,
        activePageId: validPageId,
        selectedIds: [],
        editingId: null,
        past: [],
        future: [],
        historyHeld: false,
        saveStatus: "saved",
        lastSavedAt: formatTime(),
      });
    },

    syncToCloud: async (customTitle) => {
      const { doc, syncCode } = get();
      set({ cloudStatus: "saving" });
      get().notify("Synchronisation Cloud en cours...");
      try {
        const title = customTitle || doc.profile.name || "Mon CV";
        const res = await saveCvToCloud({
          data: {
            doc,
            syncCode: syncCode ?? undefined,
            title,
          },
        });
        if (res.success) {
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("libre-cv-sync-code", res.syncCode);
            } catch {
              // ignore
            }
          }
          set({ syncCode: res.syncCode, cloudStatus: "synced" });
          get().notify(`☁️ CV synchronisé ! Code : ${res.syncCode}`);
          return res.syncCode;
        } else {
          set({ cloudStatus: "error" });
          get().notify(`Erreur Cloud : ${res.error}`);
          return null;
        }
      } catch (err: unknown) {
        set({ cloudStatus: "error" });
        const msg = err instanceof Error ? err.message : "Erreur Cloud";
        get().notify(msg);
        return null;
      }
    },

    loadFromCloud: async (code) => {
      const clean = code.trim().toUpperCase();
      if (!clean) return false;
      set({ cloudStatus: "saving" });
      get().notify(`Récupération du CV "${clean}"...`);
      try {
        const res = await loadCvFromCloud({ data: clean });
        if (res.success) {
          get().loadDocument(res.doc);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("libre-cv-sync-code", res.syncCode);
            } catch {
              // ignore
            }
          }
          set({ syncCode: res.syncCode, cloudStatus: "synced" });
          get().notify(`✓ CV "${res.title}" chargé depuis le Cloud !`);
          return true;
        } else {
          set({ cloudStatus: "error" });
          get().notify(res.error);
          return false;
        }
      } catch (err: unknown) {
        set({ cloudStatus: "error" });
        const msg = err instanceof Error ? err.message : "Impossible de charger le CV";
        get().notify(msg);
        return false;
      }
    },

    directPdfExport: async () => {
      const { doc, activePageId } = get();
      get().notify("Génération directe du PDF en cours...");
      try {
        await downloadDirectPDF(doc, activePageId, (msg) => {
          get().notify(msg);
        });
        get().notify("✓ PDF A4 téléchargé directement !");
      } catch (err: unknown) {
        console.error("Direct PDF export error:", err);
        get().notify("Export PDF direct échoué — ouverture impression");
        window.print();
      }
    },

    saveNow: () => {
      flushSave(get().doc);
      saveMeta();
      get().notify("✓ Sauvegardé en temps réel");
    },

    setZoom: (z) => set({ zoom: Math.min(2, Math.max(0.25, z)) }),
    toggle: (key) => set({ [key]: !get()[key] }),
    notify: (msg) => {
      set({ notice: msg });
      window.clearTimeout(noticeTimer);
      noticeTimer = window.setTimeout(() => set({ notice: null }), 5000);
    },
    select: (ids) =>
      set({
        selectedIds: ids,
        editingId: get().editingId && ids.includes(get().editingId!) ? get().editingId : null,
      }),
    setActive: (id) => {
      set({ activePageId: id });
      saveMeta({ activePageId: id });
    },
    setEditing: (id) => set({ editingId: id, selectedIds: id ? [id] : get().selectedIds }),

    undo: () => {
      const { past, doc, future } = get();
      if (!past.length) return;
      const prev = past[past.length - 1];
      const active = prev.pages.some((p) => p.id === get().activePageId) ? get().activePageId : prev.pages[0].id;
      set({
        past: past.slice(0, -1),
        future: [structuredClone(doc), ...future].slice(0, 80),
        doc: prev,
        activePageId: active,
        selectedIds: [],
        editingId: null,
        historyHeld: false,
      });
      persist(prev);
    },

    redo: () => {
      const { past, doc, future } = get();
      if (!future.length) return;
      const next = future[0];
      const active = next.pages.some((p) => p.id === get().activePageId) ? get().activePageId : next.pages[0].id;
      set({
        past: [...past, structuredClone(doc)].slice(-80),
        future: future.slice(1),
        doc: next,
        activePageId: active,
        selectedIds: [],
        editingId: null,
        historyHeld: false,
      });
      persist(next);
    },

    hold: () => {
      if (get().historyHeld) return;
      set({
        past: [...get().past, structuredClone(get().doc)].slice(-80),
        future: [],
        historyHeld: true,
      });
    },

    release: () => {
      if (!get().historyHeld) return;
      set({ historyHeld: false });
      persist(get().doc);
    },

    patchElements: (pageId, patches) => {
      if (!get().historyHeld) get().hold();
      const nextDoc = mapPage(get().doc, pageId, (page) => ({
        ...page,
        elements: page.elements.map((el) => (patches[el.id] ? mergeElement(el, patches[el.id]) : el)),
      }));
      set({ doc: nextDoc, layoutCustomized: true });
      persist(nextDoc);
    },

    patchElement: (pageId, id, patch, live = false) => {
      const isLayoutChange =
        patch.x !== undefined ||
        patch.y !== undefined ||
        patch.w !== undefined ||
        patch.h !== undefined ||
        patch.rotation !== undefined ||
        patch.style !== undefined;
      if (isLayoutChange && !get().layoutCustomized) {
        set({ layoutCustomized: true });
      }
      commit((doc) => {
        let profile = doc.profile;
        let boundContentModified = false;
        const pages = doc.pages.map((page) => {
          if (page.id !== pageId && !page.elements.some((e) => e.id === id)) return page;
          let resized: { id: string; nextH: number } | null = null;
          const elements = page.elements.map((el) => {
            if (el.id !== id) return el;
            const next = mergeElement(el, patch);
            if (patch.content) {
              profile = syncProfile(profile, next.bind, next.content);
              if (next.bind) boundContentModified = true;
              if (["experience", "education", "text", "skills", "meters"].includes(next.type)) {
                const nextH = computeElementAutoHeight(next);
                if (Math.abs(nextH - next.h) >= 2) {
                  resized = { id: next.id, nextH };
                }
              }
            }
            return next;
          });
          let nextPage: Page = { ...page, elements };
          if (resized) {
            nextPage = resizeElementWithFlow(nextPage, (resized as { id: string; nextH: number }).id, (resized as { id: string; nextH: number }).nextH);
          }
          return nextPage;
        });
        const updatedDoc = { ...doc, profile, pages };
        return boundContentModified ? maybePaginateGuided(updatedDoc) : updatedDoc;
      }, live);
    },

    patchSelectedStyle: (patch, live = false) => {
      const { page, elements } = selectedOnActive();
      if (!elements.length) return;
      const ids = new Set(elements.map((e) => e.id));
      set({ layoutCustomized: true });
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: p.elements.map((el) => (ids.has(el.id) ? mergeElement(el, { style: patch }) : el)),
          })),
        live,
      );
    },

    setIdentity: (field, value) => {
      commit((doc) => maybePaginateGuided(applyIdentity(doc, field, value)), true);
    },

    updateExperience: (index, patch, live = true) => {
      commit((doc) => maybePaginateGuided(applyExperienceUpdate(doc, index, patch)), live);
    },

    addExperience: () => {
      const pageId = get().activePageId;
      commit((doc) => maybePaginateGuided(applyExperienceAdd(doc, pageId)), false);
      get().notify("Nouvelle expérience ajoutée");
    },

    removeExperience: (index) => {
      commit((doc) => maybePaginateGuided(applyExperienceRemove(doc, index)), false);
      get().notify("Expérience supprimée");
    },

    updateEducation: (index, patch, live = true) => {
      commit((doc) => maybePaginateGuided(applyEducationUpdate(doc, index, patch)), live);
    },

    addEducation: () => {
      const pageId = get().activePageId;
      commit((doc) => maybePaginateGuided(applyEducationAdd(doc, pageId)), false);
      get().notify("Formation ajoutée");
    },

    removeEducation: (index) => {
      commit((doc) => maybePaginateGuided(applyEducationRemove(doc, index)), false);
      get().notify("Formation supprimée");
    },

    updateSkills: (skills, live = true) => {
      commit((doc) => maybePaginateGuided(applySkillsUpdate(doc, skills)), live);
    },

    updateLanguages: (languages, live = true) => {
      commit((doc) => maybePaginateGuided(applyLanguagesUpdate(doc, languages)), live);
    },

    deleteSelected: () => {
      const { page, elements } = selectedOnActive();
      const ids = new Set(get().selectedIds);
      if (!ids.size) return;
      set({ layoutCustomized: true });
      commit((doc) => {
        let nextDoc = mapPage(doc, page.id, (p) => ({
          ...p,
          elements: p.elements.filter((el) => !ids.has(el.id)),
        }));
        // If any deleted element was bound to experience or education, keep profile in sync
        const expIndices = elements
          .filter((el) => el.bind?.kind === "experience")
          .map((el) => (el.bind as { kind: "experience"; index: number }).index)
          .sort((a, b) => b - a);
        for (const idx of expIndices) {
          const stillBound = nextDoc.pages.some((p) =>
            p.elements.some((el) => el.bind?.kind === "experience" && el.bind.index === idx),
          );
          if (!stillBound) {
            nextDoc = applyExperienceRemove(nextDoc, idx);
          }
        }
        const eduIndices = elements
          .filter((el) => el.bind?.kind === "education")
          .map((el) => (el.bind as { kind: "education"; index: number }).index)
          .sort((a, b) => b - a);
        for (const idx of eduIndices) {
          const stillBound = nextDoc.pages.some((p) =>
            p.elements.some((el) => el.bind?.kind === "education" && el.bind.index === idx),
          );
          if (!stillBound) {
            nextDoc = applyEducationRemove(nextDoc, idx);
          }
        }
        return nextDoc;
      }, false);
      set({ selectedIds: [], editingId: null });
    },

    duplicateSelected: () => {
      const { page, elements } = selectedOnActive();
      if (!elements.length) return;
      const maxZ = Math.max(0, ...page.elements.map((e) => e.z));
      const copies = elements.map((el, i) => ({
        ...structuredClone(el),
        id: uid(),
        x: el.x + 16,
        y: el.y + 16,
        z: maxZ + 1 + i,
        bind: undefined,
      }));
      set({ layoutCustomized: true });
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: [...p.elements, ...copies],
          })),
        false,
      );
      set({ selectedIds: copies.map((c) => c.id), editingId: null });
    },

    copy: () => {
      const { elements } = selectedOnActive();
      if (!elements.length) return;
      set({ clipboard: structuredClone(elements) });
      get().notify("Copié");
    },

    paste: () => {
      const clips = get().clipboard;
      if (!clips.length) return;
      const page = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
      const maxZ = Math.max(0, ...page.elements.map((e) => e.z));
      const copies = clips.map((el, i) => ({
        ...structuredClone(el),
        id: uid(),
        x: el.x + 20,
        y: el.y + 20,
        z: maxZ + 1 + i,
        bind: undefined,
      }));
      set({ layoutCustomized: true });
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: [...p.elements, ...copies],
          })),
        false,
      );
      set({ selectedIds: copies.map((c) => c.id) });
    },

    align: (mode) => {
      const { page, elements } = selectedOnActive();
      if (elements.length < 2) return;
      const minX = Math.min(...elements.map((e) => e.x));
      const maxX = Math.max(...elements.map((e) => e.x + e.w));
      const minY = Math.min(...elements.map((e) => e.y));
      const maxY = Math.max(...elements.map((e) => e.y + e.h));
      const midX = (minX + maxX) / 2;
      const midY = (minY + maxY) / 2;
      const ids = new Set(elements.map((e) => e.id));
      set({ layoutCustomized: true });
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: p.elements.map((el) => {
              if (!ids.has(el.id)) return el;
              if (mode === "left") return { ...el, x: Math.round(minX) };
              if (mode === "right") return { ...el, x: Math.round(maxX - el.w) };
              if (mode === "center") return { ...el, x: Math.round(midX - el.w / 2) };
              if (mode === "top") return { ...el, y: Math.round(minY) };
              if (mode === "bottom") return { ...el, y: Math.round(maxY - el.h) };
              return { ...el, y: Math.round(midY - el.h / 2) };
            }),
          })),
        false,
      );
    },

    distribute: (axis) => {
      const { page, elements } = selectedOnActive();
      if (elements.length < 3) return;
      const sorted = [...elements].sort((a, b) => (axis === "x" ? a.x - b.x : a.y - b.y));
      const first = axis === "x" ? sorted[0].x : sorted[0].y;
      const last = axis === "x" ? sorted[sorted.length - 1].x : sorted[sorted.length - 1].y;
      const step = (last - first) / (sorted.length - 1);
      const pos = new Map(sorted.map((el, i) => [el.id, Math.round(first + step * i)]));
      set({ layoutCustomized: true });
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: p.elements.map((el) => {
              const n = pos.get(el.id);
              if (n == null) return el;
              return axis === "x" ? { ...el, x: n } : { ...el, y: n };
            }),
          })),
        false,
      );
    },

    order: (dir) => {
      const { page, elements } = selectedOnActive();
      if (!elements.length) return;
      const zs = page.elements.map((e) => e.z);
      const max = Math.max(...zs);
      const min = Math.min(...zs);
      const ids = new Set(elements.map((e) => e.id));
      set({ layoutCustomized: true });
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: p.elements.map((el) => {
              if (!ids.has(el.id)) return el;
              if (dir === "front") return { ...el, z: max + 1 };
              if (dir === "back") return { ...el, z: min - 1 };
              if (dir === "forward") return { ...el, z: el.z + 1 };
              return { ...el, z: el.z - 1 };
            }),
          })),
        false,
      );
    },

    lockSelected: (locked) => {
      const { page, elements } = selectedOnActive();
      if (!elements.length) return;
      const ids = new Set(elements.map((e) => e.id));
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: p.elements.map((el) => (ids.has(el.id) ? { ...el, locked } : el)),
          })),
        false,
      );
    },

    toggleHidden: (pageId, id) => {
      commit(
        (doc) =>
          mapPage(doc, pageId, (p) => ({
            ...p,
            elements: p.elements.map((el) => (el.id === id ? { ...el, hidden: !el.hidden } : el)),
          })),
        false,
      );
    },

    toggleSectionVisibility: (sectionId) => {
      commit((doc) => {
        const matches = (el: CVElement) => {
          if (!el.bind) return false;
          if (sectionId === "profile" && ["name", "role", "contact"].includes(el.bind.kind)) return true;
          if (sectionId === "summary" && el.bind.kind === "summary") return true;
          if (sectionId === "experience" && el.bind.kind === "experience") return true;
          if (sectionId === "education" && el.bind.kind === "education") return true;
          if (sectionId === "skills" && el.bind.kind === "skills") return true;
          if (sectionId === "languages" && el.bind.kind === "languages") return true;
          return false;
        };
        const anyVisible = doc.pages.some((p) => p.elements.some((el) => matches(el) && !el.hidden));
        const targetHidden = anyVisible;
        const pages = doc.pages.map((page) => ({
          ...page,
          elements: page.elements.map((el) => (matches(el) ? { ...el, hidden: targetHidden } : el)),
        }));
        return { ...doc, pages };
      }, false);
    },

    moveSection: (sectionId, direction) => {
      commit((doc) => {
        const pageId = get().activePageId;
        const updated = mapPage(doc, pageId, (page) => {
          const getSectionElements = (sid: string) => {
            const boundEls = page.elements.filter((el) => {
              if (!el.bind) return false;
              if (sid === "profile" && ["name", "role", "contact"].includes(el.bind.kind)) return true;
              if (sid === "summary" && el.bind.kind === "summary") return true;
              if (sid === "experience" && el.bind.kind === "experience") return true;
              if (sid === "education" && el.bind.kind === "education") return true;
              if (sid === "skills" && el.bind.kind === "skills") return true;
              if (sid === "languages" && el.bind.kind === "languages") return true;
              return false;
            });
            if (!boundEls.length || sid === "profile") return boundEls;
            const firstBound = [...boundEls].sort((a, b) => a.y - b.y)[0];
            const attachedHeaders = page.elements.filter(
              (el) =>
                !el.bind &&
                !isStudioFreeElement(el) &&
                el.type === "heading" &&
                Math.min(el.x + el.w, firstBound.x + firstBound.w) - Math.max(el.x, firstBound.x) > 32 &&
                firstBound.y - el.y >= 6 &&
                firstBound.y - el.y <= 38,
            );
            return [...attachedHeaders, ...boundEls];
          };

          const sectionOrder = ["profile", "summary", "experience", "education", "skills", "languages"];
          const idx = sectionOrder.indexOf(sectionId);
          if (idx === -1) return page;
          const targetIdx = direction === "up" ? idx - 1 : idx + 1;
          if (targetIdx < 0 || targetIdx >= sectionOrder.length) return page;
          const otherSectionId = sectionOrder[targetIdx];

          const elsA = getSectionElements(sectionId);
          const elsB = getSectionElements(otherSectionId);
          if (!elsA.length || !elsB.length) return page;

          const minY_A = Math.min(...elsA.map((e) => e.y));
          const minY_B = Math.min(...elsB.map((e) => e.y));

          const upper = minY_A <= minY_B ? elsA : elsB;
          const lower = minY_A <= minY_B ? elsB : elsA;

          const topU = Math.min(...upper.map((e) => e.y));
          const bottomU = Math.max(...upper.map((e) => e.y + e.h));

          const topL = Math.min(...lower.map((e) => e.y));
          const bottomL = Math.max(...lower.map((e) => e.y + e.h));
          const hL = bottomL - topL;

          const gap = Math.max(12, topL - bottomU);
          const dyLower = topU - topL;
          const dyUpper = hL + gap;

          const idsUpper = new Set(upper.map((e) => e.id));
          const idsLower = new Set(lower.map((e) => e.id));

          return {
            ...page,
            elements: page.elements.map((el) => {
              if (idsUpper.has(el.id)) return { ...el, y: Math.round(el.y + dyUpper) };
              if (idsLower.has(el.id)) return { ...el, y: Math.round(el.y + dyLower) };
              return el;
            }),
          };
        });
        return maybePaginateGuided(updated);
      }, false);
    },

    addElement: (type) => {
      const page = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
      const bottom = page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48);
      const y = Math.min(PAGE_H - 80, bottom + 16);
      const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
      let profile = get().doc.profile;
      let bind: Bind | undefined;
      let content: Content = {};
      let w = 280;
      let h = 40;
      let style = baseStyle();

      if (type === "heading") {
        content = { text: "Nouveau titre" };
        style = baseStyle({ fontFamily: "Fraunces", fontSize: 28, fontWeight: 600, lineHeight: 1.1 });
        w = 420;
        h = 44;
      } else if (type === "text") {
        content = { text: "Écris ici. Double-clic, ou le panneau de droite." };
        style = baseStyle({ fontSize: 14, lineHeight: 1.5 });
        w = 360;
        h = 64;
      } else if (type === "experience") {
        const blank = {
          role: "Nouveau poste",
          company: "Entreprise — Ville",
          date: "2024 — Présent",
          desc: "Ce que tu as vraiment fait, en une ou deux phrases.",
        };
        const index = profile.experiences.length;
        profile = { ...profile, experiences: [...profile.experiences, blank] };
        bind = { kind: "experience", index };
        content = blank;
        w = 640;
        h = 108;
      } else if (type === "education") {
        const blank = { degree: "Diplôme", school: "École", date: "2020 — 2023" };
        const index = profile.educations.length;
        profile = { ...profile, educations: [...profile.educations, blank] };
        bind = { kind: "education", index };
        content = blank;
        w = 640;
        h = 48;
      } else if (type === "skills") {
        content = { items: ["Une compétence", "Une autre"] };
        w = 480;
        h = 56;
      } else if (type === "meters") {
        content = { meters: [{ label: "Langue", value: 80 }] };
        w = 320;
        h = 48;
      } else if (type === "photo") {
        content = { src: "" };
        style = baseStyle({ backgroundColor: "#ece8e1", borderRadius: 12 });
        w = 120;
        h = 120;
      } else if (type === "rect") {
        style = baseStyle({ backgroundColor: "#f3efe6", borderRadius: 12 });
        w = 200;
        h = 120;
      } else if (type === "ellipse") {
        style = baseStyle({ backgroundColor: SIGNAL });
        w = 140;
        h = 140;
      } else if (type === "rule") {
        style = baseStyle({ backgroundColor: INK });
        w = 280;
        h = 2;
      } else if (type === "contact") {
        content = { icon: "mail" satisfies ContactIcon, text: "contact@email.com" };
        w = 260;
        h = 24;
      }

      const element: CVElement = {
        id: uid(),
        type,
        x: 48,
        y,
        w,
        h,
        rotation: 0,
        z: maxZ,
        locked: false,
        hidden: false,
        bind,
        content,
        style,
      };

      if (!bind) {
        set({ layoutCustomized: true });
      }
      commit((doc) => {
        const withProfile = type === "experience" || type === "education" ? { ...doc, profile } : doc;
        return mapPage(withProfile, page.id, (p) => ({ ...p, elements: [...p.elements, element] }));
      }, false);
      set({ selectedIds: [element.id], editingId: null });
    },

    applyTemplate: (id) => {
      set({ activeTemplate: id, layoutCustomized: false, selectedIds: [], editingId: null, paginationBlocked: false });
      commit((doc) => {
        const firstId = doc.pages[0]?.id || "page-1";
        return buildPaginatedDocFromProfile(doc.profile, id, firstId);
      }, false);
      const firstId = get().doc.pages[0]?.id || "page-1";
      set({ activePageId: firstId });
      saveMeta({ activeTemplate: id, layoutCustomized: false, activePageId: firstId });
      get().notify(`Modèle ${id} appliqué`);
    },

    requestApplyTemplate: (id) => {
      const { doc, activePageId, layoutCustomized, activeTemplate } = get();
      const page = doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0];
      const unbound = getStudioUnboundElements(page);
      if (layoutCustomized || unbound.length > 0) {
        get().setConfirmModal({
          title: id === activeTemplate ? "Réinitialiser la mise en page du modèle ?" : `Appliquer le modèle « ${id} » ?`,
          message:
            unbound.length > 0
              ? `Cette action réappliquera la mise en page du modèle « ${id} » et retirera les ${unbound.length} élément(s) libre(s) ajouté(s) dans le Studio. Vos informations de candidat (profil, expériences, formations, compétences) seront intégralement conservées.`
              : `Vous avez déplacé ou ajusté des blocs dans le Studio. Appliquer le modèle « ${id} » réinitialisera la disposition des blocs tout en conservant l'intégralité de vos textes et informations de candidat.`,
          confirmLabel: id === activeTemplate ? "Réinitialiser la disposition" : `Appliquer le modèle`,
          variant: "warning",
          onConfirm: () => {
            get().setConfirmModal(null);
            get().applyTemplate(id);
          },
        });
        return;
      }
      get().applyTemplate(id);
    },

    resetLayout: () => {
      const id = get().activeTemplate;
      get().applyTemplate(id);
      get().notify("Mise en page réinitialisée (informations conservées)");
    },

    requestResetLayout: () => {
      const { activeTemplate } = get();
      get().setConfirmModal({
        title: "Réinitialiser la mise en page ?",
        message: `Les déplacements de blocs et les éléments libres ajoutés dans le Studio seront remis à zéro selon le modèle « ${activeTemplate} ». Vos textes et informations de candidat (profil, expériences, formations, compétences) seront intégralement conservés.`,
        confirmLabel: "Réinitialiser la mise en page",
        variant: "warning",
        onConfirm: () => {
          get().setConfirmModal(null);
          get().resetLayout();
        },
      });
    },

    applyJobPreset: (presetId) => {
      const preset = JOB_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      const pageId = get().activePageId;
      const tpl = get().activeTemplate;
      set({ layoutCustomized: false, selectedIds: [], editingId: null });
      commit((doc) => {
        const page = doc.pages.find((p) => p.id === pageId) ?? doc.pages[0];
        const nextProfile = structuredClone(preset.profile);
        return mapPage({ ...doc, profile: nextProfile }, page.id, (p) => ({
          ...p,
          elements: buildTemplate(tpl, nextProfile, `preset-${uid()}`),
        }));
      }, false);
      saveMeta({ layoutCustomized: false });
      get().notify(`⚡ Métier "${preset.label}" chargé !`);
    },

    requestApplyJobPreset: (presetId) => {
      const preset = JOB_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      get().setConfirmModal({
        title: `Remplacer par l'exemple « ${preset.label} » ?`,
        message:
          "Attention : cette action remplacera les informations actuelles du candidat (nom, expériences, formations, compétences) ainsi que la mise en page par cet exemple pré-rédigé.",
        confirmLabel: "Remplacer mes données par l'exemple",
        variant: "danger",
        onConfirm: () => {
          get().setConfirmModal(null);
          get().applyJobPreset(presetId);
        },
      });
    },

    applyPalette: (paletteId) => {
      const palette = COLOR_PALETTES.find((p) => p.id === paletteId);
      if (!palette) return;
      const pageId = get().activePageId;
      commit((doc) => {
        return mapPage(doc, pageId, (p) => ({
          ...p,
          elements: applyPaletteToElements(p.elements, palette),
        }));
      }, false);
      get().notify(`Harmonie "${palette.name}" appliquée`);
    },

    applyGlobalFont: (font) => {
      const pageId = get().activePageId;
      commit((doc) => {
        return mapPage(doc, pageId, (p) => ({
          ...p,
          elements: p.elements.map((el) =>
            ["photo", "rect", "ellipse", "rule"].includes(el.type)
              ? el
              : mergeElement(el, { style: { fontFamily: font } }),
          ),
        }));
      }, false);
      get().notify(`Police globale "${font}" appliquée`);
    },

    addSectionPack: (packId) => {
      const pack = SECTION_PACKS.find((p) => p.id === packId);
      if (!pack) return;
      const page = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
      const bottom = page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48);
      const startY = Math.min(PAGE_H - 120, bottom + 20);
      const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
      const { elements: rawElements } = pack.createElements(startY, maxZ);

      set({ layoutCustomized: true });
      commit((doc) => {
        const profile = {
          ...doc.profile,
          experiences: [...doc.profile.experiences],
          educations: [...doc.profile.educations],
        };
        const newElements = rawElements.map((el) => {
          if (el.type === "experience" && !el.bind) {
            const index = profile.experiences.length;
            profile.experiences.push({
              role: el.content.role ?? "Nouveau poste",
              company: el.content.company ?? "Entreprise",
              date: el.content.date ?? "Dates",
              desc: el.content.desc ?? "",
            });
            return { ...el, bind: { kind: "experience" as const, index } };
          }
          if (el.type === "education" && !el.bind) {
            const index = profile.educations.length;
            profile.educations.push({
              degree: el.content.degree ?? "Diplôme",
              school: el.content.school ?? "Établissement",
              date: el.content.date ?? "Années",
            });
            return { ...el, bind: { kind: "education" as const, index } };
          }
          return el;
        });
        return mapPage({ ...doc, profile }, page.id, (p) => ({
          ...p,
          elements: [...p.elements, ...newElements],
        }));
      }, false);
      set({ selectedIds: rawElements.map((e) => e.id), editingId: null });
      get().notify(`Pack "${pack.name}" ajouté`);
    },

    boostElementText: (id, customPhrase) => {
      const pageId = get().activePageId;
      const phrase = customPhrase || getRandomBoost();
      const page = get().doc.pages.find((p) => p.id === pageId) ?? get().doc.pages[0];
      const el = page.elements.find((e) => e.id === id);
      if (!el) return;

      if (el.type === "experience") {
        const curDesc = el.content.desc ? el.content.desc.trim() : "";
        const updatedDesc = curDesc ? `${curDesc}\n• ${phrase}` : `• ${phrase}`;
        get().patchElement(pageId, id, { content: { desc: updatedDesc } });
        get().notify("✨ Réalisation chiffrée ajoutée au poste !");
      } else if (el.type === "text" || el.type === "heading") {
        get().patchElement(pageId, id, { content: { text: phrase } });
        get().notify("✨ Formulation professionnelle appliquée !");
      }
    },

    addPage: () => {
      const page: Page = { id: uid(), name: `Page ${get().doc.pages.length + 1}`, background: SHEET, elements: [] };
      commit((doc) => ({ ...doc, pages: [...doc.pages, page] }), false);
      set({ activePageId: page.id, selectedIds: [], editingId: null });
      saveMeta({ activePageId: page.id });
    },

    duplicatePage: () => {
      const current = get().doc.pages.find((p) => p.id === get().activePageId) ?? get().doc.pages[0];
      const page: Page = {
        id: uid(),
        name: `${current.name} copie`,
        background: current.background,
        elements: current.elements.map((el) => ({ ...structuredClone(el), id: uid(), bind: undefined })),
      };
      commit((doc) => ({ ...doc, pages: [...doc.pages, page] }), false);
      set({ activePageId: page.id, selectedIds: [] });
      saveMeta({ activePageId: page.id });
    },

    deletePage: (id) => {
      if (get().doc.pages.length < 2) {
        get().notify("Il reste une page");
        return;
      }
      commit((doc) => ({ ...doc, pages: doc.pages.filter((p) => p.id !== id) }), false);
      if (get().activePageId === id) {
        const firstId = get().doc.pages[0].id;
        set({ activePageId: firstId, selectedIds: [] });
        saveMeta({ activePageId: firstId });
      }
    },

    renamePage: (id, name) => {
      const doc = mapPage(get().doc, id, (p) => ({ ...p, name }));
      set({ doc });
      persist(doc);
    },

    setPageBackground: (color, live = false) => {
      const id = get().activePageId;
      commit((doc) => mapPage(doc, id, (p) => ({ ...p, background: color })), live);
    },

    newDocument: () => {
      const doc = freshDoc();
      set({
        activePageId: doc.pages[0].id,
        activeTemplate: "modern",
        layoutCustomized: false,
        selectedIds: [],
        editingId: null,
      });
      commit(() => doc, false);
      saveMeta({ activePageId: doc.pages[0].id, activeTemplate: "modern", layoutCustomized: false });
      get().notify("Nouveau document");
    },

    requestNewDocument: () => {
      get().setConfirmModal({
        title: "Réinitialiser tout le document ?",
        message:
          "Cette action est destructive : toutes vos informations (profil, expériences, formations, compétences) et votre mise en page personnalisée seront remplacées par un nouveau document par défaut.",
        confirmLabel: "Tout réinitialiser",
        variant: "danger",
        onConfirm: () => {
          get().setConfirmModal(null);
          get().newDocument();
        },
      });
    },

    loadDocument: (doc) => {
      if (!doc.pages?.length || !doc.profile) {
        get().notify("Fichier illisible");
        return;
      }
      const synced = syncBoundElementsFromProfile(doc);
      commit(() => synced, false);
      set({ activePageId: synced.pages[0].id, selectedIds: [], editingId: null });
      saveMeta({ activePageId: synced.pages[0].id });
      get().notify("Projet ouvert");
    },

    importExtractedProfile: (profile, template = "executive", asNewPage = false) => {
      set({
        activeTemplate: template,
        layoutCustomized: false,
        paginationBlocked: false,
        editorMode: "guided",
        onboarding: false,
        extractorModalOpen: false,
      });
      commit((doc) => {
        const nextProfile: Profile = structuredClone(profile);
        if (asNewPage) {
          const newPageId = `page-${uid()}`;
          const newPage: Page = {
            id: newPageId,
            name: `Page ${doc.pages.length + 1} (${nextProfile.name.split(" ")[0] || "CV"})`,
            background: SHEET,
            elements: buildTemplate(template, nextProfile, `${template}-${uid()}`),
          };
          return syncBoundElementsFromProfile({
            ...doc,
            profile: nextProfile,
            pages: [...doc.pages, newPage],
          });
        } else {
          return buildPaginatedDocFromProfile(nextProfile, template, "page-1");
        }
      }, false);
      const pages = get().doc.pages;
      const targetPageId = asNewPage ? (pages[pages.length - 1]?.id || "page-1") : (pages[0]?.id || "page-1");
      set({ activePageId: targetPageId, selectedIds: [], editingId: null });
      flushSave(get().doc);
      saveMeta({
        editorMode: "guided",
        activeTemplate: template,
        activePageId: targetPageId,
        layoutCustomized: false,
      });
      get().notify("Ton CV a été importé. Vérifie les informations détectées et personnalise-le.");
    },

    importText: (raw, template) => {
      const pageId = get().activePageId;
      set({ activeTemplate: template, layoutCustomized: false });
      commit((doc) => {
        let profile: Profile;
        try {
          const res = extractFromText(raw, doc.profile);
          profile = res.profile;
        } catch {
          profile = parseProfile(raw, doc.profile);
        }
        return syncBoundElementsFromProfile(
          mapPage({ ...doc, profile }, pageId, (p) => ({
            ...p,
            elements: buildTemplate(template, profile, `${template}-${uid()}`),
          })),
        );
      }, false);
      set({ selectedIds: [], editingId: null });
      get().notify("CV textuel analysé et disposé");
    },
  };
});

export function activePage(doc: Doc, id: string) {
  return doc.pages.find((p) => p.id === id) ?? doc.pages[0];
}
