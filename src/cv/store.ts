import { create } from "zustand";
import { uid } from "@/cv/geometry";
import { applyIdentity, parseProfile, SAMPLE, syncProfile } from "@/cv/profile";
import { buildTemplate } from "@/cv/templates";
import { JOB_PRESETS, getRandomBoost } from "@/cv/presets";
import { COLOR_PALETTES, applyPaletteToElements } from "@/cv/palettes";
import { SECTION_PACKS } from "@/cv/packs";
import { saveCvToCloud, loadCvFromCloud } from "@/lib/cloud-cv";
import { downloadDirectPDF } from "@/cv/pdf";
import { extractFromText } from "@/cv/extractor";
import type {
  Bind,
  ContactIcon,
  Content,
  CVElement,
  Doc,
  ElStyle,
  ElType,
  IdentityField,
  Page,
  Profile,
  TemplateId,
} from "@/cv/types";
import { baseStyle, INK, PAGE_H, SHEET, SIGNAL } from "@/cv/types";

const KEY = "libre-cv-doc-v1";

export type ElementPatch = Partial<Pick<CVElement, "x" | "y" | "w" | "h" | "rotation" | "locked" | "hidden">> & {
  style?: Partial<ElStyle>;
  content?: Partial<Content>;
};

type Flags = "showGrid" | "snap" | "guides" | "margins";

export type SaveStatus = "saved" | "saving" | "unsaved";
export type EditorMode = "guided" | "pro";

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
  deleteSelected: () => void;
  duplicateSelected: () => void;
  copy: () => void;
  paste: () => void;
  align: (mode: "left" | "center" | "right" | "top" | "middle" | "bottom") => void;
  distribute: (axis: "x" | "y") => void;
  order: (dir: "front" | "back" | "forward" | "backward") => void;
  lockSelected: (locked: boolean) => void;
  toggleHidden: (pageId: string, id: string) => void;
  addElement: (type: ElType) => void;
  applyTemplate: (id: TemplateId) => void;
  applyJobPreset: (id: string) => void;
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
  loadDocument: (doc: Doc) => void;
  importText: (raw: string, template: TemplateId) => void;
};

let noticeTimer = 0;
let persistTimer = 0;

function formatTime(d = new Date()) {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
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

function flushSave(doc: Doc) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(doc));
    useStudio.setState({ saveStatus: "saved", lastSavedAt: formatTime() });
  } catch {
    useStudio.getState().notify("Enregistrement local saturé — exporte le JSON");
  }
}

function persist(doc: Doc) {
  if (typeof window === "undefined") return;
  useStudio.setState({ saveStatus: "saving" });
  window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => {
    flushSave(doc);
  }, 250);
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    try {
      const doc = useStudio.getState().doc;
      if (doc) localStorage.setItem(KEY, JSON.stringify(doc));
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
      set({ doc: recipe(get().doc) });
      persist(get().doc);
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

    setEditorMode: (mode) => set({ editorMode: mode }),
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

      // 2. Retrieve local storage CV and stored sync code
      const loaded = readStorage();
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

      if (urlSyncCode) {
        // If an explicit sync code is passed in URL, load it directly from the cloud
        get().loadFromCloud(urlSyncCode);
        return;
      }

      if (!loaded) return;
      set({
        doc: loaded,
        activePageId: loaded.pages[0].id,
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
      get().notify("✓ Sauvegardé en temps réel");
    },

    setZoom: (z) => set({ zoom: Math.min(2, Math.max(0.25, z)) }),
    toggle: (key) => set({ [key]: !get()[key] }),
    notify: (msg) => {
      set({ notice: msg });
      window.clearTimeout(noticeTimer);
      noticeTimer = window.setTimeout(() => set({ notice: null }), 2400);
    },
    select: (ids) => set({ selectedIds: ids, editingId: get().editingId && ids.includes(get().editingId!) ? get().editingId : null }),
    setActive: (id) => set({ activePageId: id }),
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
      set({
        doc: mapPage(get().doc, pageId, (page) => ({
          ...page,
          elements: page.elements.map((el) => (patches[el.id] ? mergeElement(el, patches[el.id]) : el)),
        })),
      });
    },

    patchElement: (pageId, id, patch, live = false) => {
      commit((doc) => {
        let profile = doc.profile;
        const pages = doc.pages.map((page) => {
          if (page.id !== pageId) return page;
          return {
            ...page,
            elements: page.elements.map((el) => {
              if (el.id !== id) return el;
              const next = mergeElement(el, patch);
              if (patch.content) profile = syncProfile(profile, next.bind, next.content);
              return next;
            }),
          };
        });
        return { ...doc, profile, pages };
      }, live);
    },

    patchSelectedStyle: (patch, live = false) => {
      const { page, elements } = selectedOnActive();
      if (!elements.length) return;
      const ids = new Set(elements.map((e) => e.id));
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
      if (!get().historyHeld) get().hold();
      const doc = applyIdentity(get().doc, field, value);
      set({ doc });
      persist(doc);
    },

    deleteSelected: () => {
      const { page } = selectedOnActive();
      const ids = new Set(get().selectedIds);
      if (!ids.size) return;
      commit(
        (doc) =>
          mapPage(doc, page.id, (p) => ({
            ...p,
            elements: p.elements.filter((el) => !ids.has(el.id)),
          })),
        false,
      );
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

      commit((doc) => {
        const withProfile = type === "experience" || type === "education" ? { ...doc, profile } : doc;
        return mapPage(withProfile, page.id, (p) => ({ ...p, elements: [...p.elements, element] }));
      }, false);
      set({ selectedIds: [element.id], editingId: null });
    },

    applyTemplate: (id) => {
      const pageId = get().activePageId;
      commit((doc) => {
        const page = doc.pages.find((p) => p.id === pageId) ?? doc.pages[0];
        return mapPage(doc, page.id, (p) => ({
          ...p,
          background: SHEET,
          elements: buildTemplate(id, doc.profile, `${id}-${uid()}`),
        }));
      }, false);
      set({ selectedIds: [], editingId: null, activeTemplate: id });
      get().notify(`Modèle ${id} appliqué`);
    },

    applyJobPreset: (presetId) => {
      const preset = JOB_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      const pageId = get().activePageId;
      commit((doc) => {
        const page = doc.pages.find((p) => p.id === pageId) ?? doc.pages[0];
        const nextProfile = structuredClone(preset.profile);
        return mapPage({ ...doc, profile: nextProfile }, page.id, (p) => ({
          ...p,
          elements: buildTemplate("modern", nextProfile, `preset-${uid()}`),
        }));
      }, false);
      set({ selectedIds: [], editingId: null });
      get().notify(`⚡ Métier "${preset.label}" chargé !`);
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
      const { elements: newElements } = pack.createElements(startY, maxZ);

      commit((doc) => {
        return mapPage(doc, page.id, (p) => ({
          ...p,
          elements: [...p.elements, ...newElements],
        }));
      }, false);
      set({ selectedIds: newElements.map((e) => e.id), editingId: null });
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
    },

    deletePage: (id) => {
      if (get().doc.pages.length < 2) {
        get().notify("Il reste une page");
        return;
      }
      commit((doc) => ({ ...doc, pages: doc.pages.filter((p) => p.id !== id) }), false);
      if (get().activePageId === id) set({ activePageId: get().doc.pages[0].id, selectedIds: [] });
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
      commit(() => doc, false);
      set({ activePageId: doc.pages[0].id, selectedIds: [], editingId: null });
      get().notify("Nouveau document");
    },

    loadDocument: (doc) => {
      if (!doc.pages?.length || !doc.profile) {
        get().notify("Fichier illisible");
        return;
      }
      commit(() => doc, false);
      set({ activePageId: doc.pages[0].id, selectedIds: [], editingId: null });
      get().notify("Projet ouvert");
    },

    importExtractedProfile: (profile, template = "modern", asNewPage = false) => {
      const activeId = get().activePageId;
      commit((doc) => {
        const nextProfile = { ...doc.profile, ...profile };
        if (asNewPage) {
          const newPageId = `page-${uid()}`;
          const newPage: Page = {
            id: newPageId,
            name: `Page ${doc.pages.length + 1} (${profile.name.split(" ")[0] || "CV"})`,
            background: SHEET,
            elements: buildTemplate(template, nextProfile, `${template}-${uid()}`),
          };
          return {
            ...doc,
            profile: nextProfile,
            pages: [...doc.pages, newPage],
          };
        } else {
          return mapPage({ ...doc, profile: nextProfile }, activeId, (p) => ({
            ...p,
            elements: buildTemplate(template, nextProfile, `${template}-${uid()}`),
          }));
        }
      }, false);
      if (asNewPage) {
        const pages = get().doc.pages;
        const lastPage = pages[pages.length - 1];
        if (lastPage) set({ activePageId: lastPage.id });
      }
      set({ selectedIds: [], editingId: null });
      get().notify(`CV extrait : ${profile.name} (${profile.experiences.length} exp, ${profile.educations.length} form)`);
    },

    importText: (raw, template) => {
      const pageId = get().activePageId;
      commit((doc) => {
        // Run full CV extraction using CV_extractor engine
        let profile: Profile;
        try {
          const res = extractFromText(raw, doc.profile);
          profile = res.profile;
        } catch {
          profile = parseProfile(raw, doc.profile);
        }
        return mapPage({ ...doc, profile }, pageId, (p) => ({
          ...p,
          elements: buildTemplate(template, profile, `${template}-${uid()}`),
        }));
      }, false);
      set({ selectedIds: [], editingId: null });
      get().notify("CV textuel analysé et disposé");
    },
  };
});

export function activePage(doc: Doc, id: string) {
  return doc.pages.find((p) => p.id === id) ?? doc.pages[0];
}
