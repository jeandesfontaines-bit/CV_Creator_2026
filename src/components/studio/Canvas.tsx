Warning: truncated output (original token count: 10550)
Total output lines: 940

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  AlertCircle,
  Bold,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Copy,
  Download,
  FileText,
  Minus,
  Plus,
  Printer,
  Redo,
  Sparkles,
  Trash2,
  Undo,
  X,
} from "lucide-react";
import { PageSheet } from "@/components/studio/PageSheet";
import { readImage } from "@/cv/image";
import { clientToSheet, intersects, normRotation, resizeBox, snapMove } from "@/cv/geometry";
import { activePage, useStudio } from "@/cv/store";
import { computeCVHealth } from "@/cv/health";
import { BOOST_PRESETS } from "@/cv/presets";
import type { Box, Content, CVElement, Handle } from "@/cv/types";
import { PAGE_H, PAGE_W } from "@/cv/types";
import { cn } from "@/lib/utils";

type Gesture =
  | {
      kind: "move";
      pageId: string;
      ids: string[];
      primary: string;
      start: { x: number; y: number };
      orig: Map<string, Box>;
    }
  | {
      kind: "resize";
      pageId: string;
      id: string;
      handle: Handle;
      start: { x: number; y: number };
      orig: Box;
      rotation: number;
    }
  | {
      kind: "rotate";
      pageId: string;
      id: string;
      center: { x: number; y: number };
    }
  | {
      kind: "marquee";
      pageId: string;
      start: { x: number; y: number };
      additive: boolean;
      base: string[];
    }
  | { kind: "pan"; sx: number; sy: number; sl: number; st: number };

function sheetOf(pageId: string) {
  return document.querySelector<HTMLElement>(`[data-sheet="${pageId}"]`);
}

function isBackground(target: EventTarget | null, current: EventTarget | null) {
  if (target === current) return true;
  return target instanceof HTMLElement && target.dataset.canvas === "bg";
}

export function Canvas({ narrow = false }: { narrow?: boolean }) {
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const selectedIds = useStudio((s) => s.selectedIds);
  const editingId = useStudio((s) => s.editingId);
  const zoom = useStudio((s) => s.zoom);
  const showGrid = useStudio((s) => s.showGrid);
  const snap = useStudio((s) => s.snap);
  const guidesOn = useStudio((s) => s.guides);
  const margins = useStudio((s) => s.margins);
  const setZoom = useStudio((s) => s.setZoom);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const space = useRef(false);
  const [spaceOn, setSpaceOn] = useState(false);
  const [guideLines, setGuideLines] = useState<{ x: number[]; y: number[] }>({ x: [], y: [] });
  const [marquee, setMarquee] = useState<Box | null>(null);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const z = Math.min((el.clientWidth - 64) / PAGE_W, (el.clientHeight - 64) / PAGE_H);
    if (z > 0) setZoom(Math.round(Math.min(1, z) * 100) / 100);
  }, [setZoom, narrow]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.008);
      setZoom(useStudio.getState().zoom * factor);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setZoom]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLElement && (event.target.isContentEditable || ["INPUT", "TEXTAREA"].includes(event.target.tagName));
      if (event.code === "Space" && !typing) {
        event.preventDefault();
        space.current = true;
        setSpaceOn(true);
      }
    };
    const up = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        space.current = false;
        setSpaceOn(false);
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const g = gesture.current;
      if (!g) return;
      const store = useStudio.getState();
      if (g.kind === "pan") {
        const sc = scrollerRef.current;
        if (!sc) return;
        sc.scrollLeft = g.sl - (event.clientX - g.sx);
        sc.scrollTop = g.st - (event.clientY - g.sy);
        return;
      }
      const sheet = sheetOf(g.pageId);
      if (!sheet) return;
      const now = clientToSheet(event.clientX, event.clientY, sheet);
      if (g.kind === "move") {
        const dx = now.x - g.start.x;
        const dy = now.y - g.start.y;
        if (Math.hypot(dx, dy) < 1.5 && !store.historyHeld) return;
        const page = activePage(store.doc, g.pageId);
        const primary = g.orig.get(g.primary);
        if (!primary) return;
        const others = page.elements
          .filter((el) => !g.ids.includes(el.id) && !el.hidden)
          .map((el) => ({ x: el.x, y: el.y, w: el.w, h: el.h }));
        const snapped = snapMove(primary, dx, dy, others, { grid: store.snap, guides: store.guides });
        const patches: Record<string, { x: number; y: number }> = {};
        for (const [id, box] of g.orig) {
          patches[id] = { x: Math.round(box.x + snapped.dx), y: Math.round(box.y + snapped.dy) };
        }
        store.patchElements(g.pageId, patches);
        setGuideLines({ x: snapped.vx, y: snapped.hy });
      } else if (g.kind === "resize") {
        const pageDx = now.x - g.start.x;
        const pageDy = now.y - g.start.y;
        const next = resizeBox(g.orig, g.handle, pageDx, pageDy, g.rotation, event.shiftKey);
        store.patchElements(g.pageId, { [g.id]: next });
      } else if (g.kind === "rotate") {
        let deg = (Math.atan2(now.y - g.center.y, now.x - g.center.x) * 180) / Math.PI + 90;
        if (event.shiftKey) deg = Math.round(deg / 15) * 15;
        store.patchElements(g.pageId, { [g.id]: { rotation: normRotation(deg) } });
      } else if (g.kind === "marquee") {
        const x = Math.min(g.start.x, now.x);
        const y = Math.min(g.start.y, now.y);
        const w = Math.abs(now.x - g.start.x);
        const h = Math.abs(now.y - g.start.y);
        const box = { x, y, w, h };
        setMarquee(box);
        const page = activePage(store.doc, g.pageId);
        const hit = page.elements.filter((el) => !el.hidden && intersects(box, el)).map((el) => el.id);
        store.select(g.additive ? [...new Set([...g.base, ...hit])] : hit);
      }
    };
    const up = () => {
      if (!gesture.current) return;
      gesture.current = null;
      setGuideLines({ x: [], y: [] });
      setMarquee(null);
      useStudio.getState().release();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const onScrollerPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!space.current && event.button !== 1) return;
    const sc = scrollerRef.current;
    if (!sc) return;
    event.preventDefault();
    gesture.current = { kind: "pan", sx: event.clientX, sy: event.clientY, sl: sc.scrollLeft, st: sc.scrollTop };
  };

  const onSheetPointerDown = (pageId: string) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || space.current) return;
    if (!isBackground(event.target, event.currentTarget)) return;
    const store = useStudio.getState();
    store.setActive(pageId);
    store.setEditing(null);
    const sheet = event.currentTarget;
    const start = clientToSheet(event.clientX, event.clientY, sheet);
    gesture.current = {
      kind: "marquee",
      pageId,
      start,
      additive: event.shiftKey,
      base: event.shiftKey ? store.selectedIds : [],
    };
    if (!event.shiftKey) store.select([]);
  };

  const onElementPointerDown = (pageId: string) => (event: ReactPointerEvent, el: CVElement) => {
    if (event.button !== 0 || space.current) return;
    event.stopPropagation();
    const store = useStudio.getState();
    store.setActive(pageId);
    let ids = store.selectedIds;
    if (event.shiftKey) ids = ids.includes(el.id) ? ids.filter((id) => id !== el.id) : [...ids, el.id];
    else if (!ids.includes(el.id)) ids = [el.id];
    store.select(ids);
    if (el.locked || store.editingId === el.id) return;
    const sheet = sheetOf(pageId);
    if (!sheet) return;
    const page = activePage(store.doc, pageId);
    const orig = new Map<string, Box>();
    for (const id of ids) {
      const item = page.elements.find((entry) => entry.id === id);
      if (item) orig.set(id, { x: item.x, y: item.y, w: item.w, h: item.h });
    }
    gesture.current = {
      kind: "move",
      pageId,
      ids,
      primary: el.id,
      start: clientToSheet(event.clientX, event.clientY, sheet),
      orig,
    };
  };

  const onResize = (pageId: string) => (id: string, handle: Handle, event: ReactPointerEvent) => {
    if (space.current) return;
    const store = useStudio.getState();
    const sheet = sheetOf(pageId);
    const el = activePage(store.doc, pageId).elements.find((item) => item.id === id);
    if (!sheet || !el) return;
    gesture.current = {
      kind: "resize",
      pageId,
      id,
      handle,
      start: clientToSheet(event.clientX, event.clientY, sheet),
      orig: { x: el.x, y: el.y, w: el.w, h: el.h },
      rotation: el.rotation,
    };
  };

  const onRotate = (pageId: string) => (id: string, _event: ReactPointerEvent) => {
    const store = useStudio.getState();
    const el = activePage(store.doc, pageId).elements.find((item) => item.id === id);
    if (!el) return;
    gesture.current = {
      kind: "rotate",
      pageId,
      id,
      center: { x: el.x + el.w / 2, y: el.y + el.h / 2 },
    };
  };

  const onChange = (pageId: string) => (id: string, content: Partial<Content>) => {
    const store = useStudio.getState();
    const el = activePage(store.doc, pageId).elements.find((item) => item.id === id);
    if (!el) return;
    const same = Object.entries(content).every(([key, value]) => el.content[key as keyof Content] === value);
    if (same) return;
    store.patchElement(pageId, id, { content });
  };

  const onUpload = (pageId: string) => async (id: string, file: File) => {
    try {
      const src = await readImage(file);
      useStudio.getState().patchElement(pageId, id, { content: { src } });
    } catch {
      useStudio.getState().notify("Image illisible");
    }
  };

  const syncCode = useStudio((s) => s.syncCode);
  const setCloudModalOpen = useStudio((s) => s.setCloudModalOpen);
  const directPdfExport = useStudio((s) => s.directPdfExport);
  const boostElementText = useStudio((s) => s.boostElementText);
  const addSectionPack = useStudio((s) => s.addSectionPack);
  const past = useStudio((s) => s.past.length);
  const future = useStudio((s) => s.future.length);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);

  const editorMode = useStudio((s) => s.editorMode);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const isPro = editorMode === "pro";

  const [healthOpen, setHealthOpen] = useState(false);
  const [boostMenuOpen, setBoostMenuOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).useStudio = useStudio;
    }
  }, []);

  const health = useMemo(() => computeCVHealth(doc, activePageId), [doc, activePageId]);

  const primarySelected = useMemo(() => {
    const page = activePage(doc, activePageId);
    if (!selectedIds.length) return null;
    return page.elements.find((el) => el.id === selectedIds[0]) || null;
  }, [doc, activePageId, selectedIds]);

  const pageIndex = useMemo(() => {
    const idx = doc.pages.findIndex((p) => p.id === activePageId);
    return idx >= 0 ? idx : 0;
  }, [doc.pages, activePageId]);

  const floatingBarTop = useMemo(() => {
    if (!primarySelected) return 12;
    const pageOffset = pageIndex * (PAGE_H + 40);
    const elementTopZoomed = (pageOffset + primarySelected.y) * zoom;
    const elementBottomZoomed = (pageOffset + primarySelected.y + primarySelected.h) * zoom;
    // Si le bloc est trop haut (ex: Alexandra Dubois à y: 38), le placer en dessous
    // afin qu'elle ne chevauche plus le titre ; sinon le placer au-dessus avec décalage suffisant
    const isTooHigh = elementTopZoomed < 64 || primarySelected.y < 90;
    if (isTooHigh) {
      return elementBottomZoomed + 16;
    }
    return Math.max(12, elementTopZoomed - 52);
  }, [primarySelected, pageIndex, zoom]);

  const fit = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const z = Math.min((el.clientWidth - 64) / PAGE_W, (el.clientHeight - 64) / PAGE_H);
    if (z > 0) setZoom(Math.round(Math.min(1, z) * 100) / 100);
  };

  const handleHealthAction = (item: (typeof health.items)[0]) => {
    setHealthOpen(false);
    if (item.id === "experiences") {
      addSectionPack("pack-experience");
    } else if (item.id === "skills") {
      addSectionPack("pack-skills");
    } else if (item.id === "languages") {
      addSectionPack("pack-languages");
    } else if (item.id === "metrics") {
      const page = activePage(doc, activePageId);
      const firstExp = page.elements.find((e) => e.type === "experience");
      if (firstExp) {
        boostElementText(firstExp.id);
        useStudio.getState().select([firstExp.id]);
      } else {
        addSectionPack("pack-experience");
      }
    } else {
      useStudio.getState().notify(`Complétez le champ ${item.label} dans le panneau de droite`);
    }
  };

  const innerHeight = doc.pages.length * PAGE_H + Math.max(0, doc.pages.length - 1) * 40;

  const horizontalTicks = useMemo(() => {
    const ticks: number[] = [];
    for (let x = 0; x <= PAGE_W; x += 50) ticks.push(x);
    return ticks;
  }, []);

  const verticalTicks = useMemo(() => {
    const ticks: number[] = [];
    for (let y = 0; y <= PAGE_H; y += 50) ticks.push(y);
    return ticks;
  }, []);

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
      {/* HEADER SUPÉRIEUR ÉLÉGANT & SÉLECTEUR DE MODE CENTRAL */}
      <header className="no-print relative z-30 flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-slate-200 bg-white px-3 py-2 select-none sm:px-4">
        {/* Zone Gauche : Score CV : 100% + Annuler / Rétablir */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          {narrow && <span className="font-display text-sm font-bold tracking-wide whitespace-nowrap shrink-0">CV Atelier</span>}

          {/* INDICATEUR DU SCORE DE COMPLÉTION DU CV */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setHealthOpen(!healthOpen)}
              className={cn(
                "group flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition shadow-xs whitespace-nowrap shrink-0",
                healthOpen
                  ? "border-ink bg-ink text-cream"
                  : "border-slate-200 bg-white text-ink hover:border-ink hover:bg-slate-50",
              )}
              title="Cliquez pour voir la checklist de complétion de votre CV"
            >
              <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                <Sparkles size={14} className="text-slate-500" />
                <span className="text-xs font-bold whitespace-nowrap">
                  Score : {health.score}%
                </span>
              </div>
              <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-200 shrink-0">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${health.score}%`,
                    backgroundColor:
                      health.score >= 80 ? "#10b981" : health.score >= 50 ? "#f59e0b" : "#ef4444",
                  }}
                />
              </div>
              <ChevronDown size={12} className={cn("transition-transform text-mute shrink-0", healthOpen && "rotate-180 text-cream")} />
            </button>

            {/* CHECKLIST PLIANTE DE COMPLÉTION */}
            {healthOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-line bg-white p-3.5 text-ink shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="mb-2.5 flex items-center justify-between border-b border-line pb-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                      <span>Qualité & Impact du CV</span>
                      <span className="rounded-full bg-ink px-1.5 py-0.2 font-mono text-[10px] text-cream">
                        {health.score}/100
                      </span>
                    </div>
                    <p className="text-[10px] text-mute mt-0.5">
                      {health.score >= 85
                        ? "🎉 Excellent ! Votre CV est complet et très impactant."
                        : health.score >= 60
                          ? "Bonne base ! Quelques détails pour faire la différence."
                          : "Pensez à compléter les rubriques clés pour maximiser vos chances."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHealthOpen(false)}
                    className="flex size-5 items-center justify-center rounded-sm text-mute hover:text-ink"
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                  {health.items.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "rounded-lg border p-2 text-xs transition",
                        item.passed
                          ? "border-emerald-200 bg-emerald-50/40 text-emerald-950"
                          : "border-amber-200 bg-amber-50/50 text-amber-950",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5">
                          {item.passed ? (
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                          ) : (
                            <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
                          )}
                          <div>
                            <div className="font-semibold leading-tight">{item.label}</div>
                            <div className="mt-0.5 text-[10px] text-mute leading-snug">{item.hint}</div>
                          </div>
                        </div>
                        {!item.passed && item.actionText && (
                          <button
                            type="button"
                            onClick={() => handleHealthAction(item)}
                            className="shrink-0 rounded-md bg-ink px-2 py-0.5 text-[10px] font-semibold text-cream hover:bg-neutral-800 transition"
                          >
                            {item.actionText}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center jus…550 tokens truncated…"guided")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold transition-all whitespace-nowrap shrink-0",
                editorMode === "guided"
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5"
                  : "text-slate-600 hover:text-slate-900",
              )}
              title="Saisie guidée — vos modifications restent dans ce CV"
            >
              <span>Saisie guidée</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={editorMode === "pro"}
              onClick={() => setEditorMode("pro")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold transition-all whitespace-nowrap shrink-0",
                editorMode === "pro"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900",
              )}
              title="Mise en page libre — tous les éléments de ce CV restent modifiables"
            >
              <span>Studio libre</span>
            </button>
          </div>

          {/* Contrôle du Zoom (- 75% +) */}
          <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5 shrink-0 whitespace-nowrap shadow-xs">
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded text-xs font-semibold text-mute hover:bg-slate-100 hover:text-ink transition shrink-0"
              onClick={() => setZoom(zoom / 1.15)}
              title="Zoom arrière"
            >
              −
            </button>
            <button
              type="button"
              className="h-7 min-w-12 px-1 text-xs font-bold tabular-nums hover:bg-slate-100 rounded transition whitespace-nowrap shrink-0 text-center text-ink"
              onClick={fit}
              title="Adapter à l'écran"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded text-xs font-semibold text-mute hover:bg-slate-100 hover:text-ink transition shrink-0"
              onClick={() => setZoom(zoom * 1.15)}
              title="Zoom avant"
            >
              +
            </button>
          </div>

          {/* Dimensions en pixels uniquement visibles en Mode Studio Pro */}
          {isPro && (
            <div className="hidden xl:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700 shrink-0 whitespace-nowrap">
              <span>A4 · {PAGE_W}×{PAGE_H} px</span>
              {primarySelected && (
                <span className="border-l border-slate-300 pl-1.5 text-blue-600">
                  X:{Math.round(primarySelected.x)} Y:{Math.round(primarySelected.y)} · {Math.round(primarySelected.w)}×{Math.round(primarySelected.h)} px
                </span>
              )}
            </div>
          )}
        </div>

        {/* Zone Droite : Cloud Sync (uniquement en Studio Pro) + Bouton principal Télécharger mon CV (PDF) */}
        <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
          {isPro && (
            <button
              type="button"
              onClick={() => setCloudModalOpen(true)}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-xs shrink-0 whitespace-nowrap"
              title="Synchronisation Cloud & Code de partage"
            >
              <Cloud size={14} className="text-blue-600 shrink-0" />
              <span>{syncCode ? `Cloud (${syncCode})` : "Cloud Sync"}</span>
            </button>
          )}

          <div className="relative shrink-0 whitespace-nowrap">
            <div className="flex items-center rounded-lg bg-blue-600 text-white shadow-sm shrink-0 whitespace-nowrap hover:bg-blue-700 transition">
              <button
                type="button"
                onClick={() => directPdfExport()}
                className="flex items-center gap-2 h-9 px-4 text-xs font-bold transition whitespace-nowrap shrink-0"
                title="Télécharger directement le fichier A4 en PDF prêt à l'envoi"
              >
                <Download size={14} className="shrink-0" />
                <span className="whitespace-nowrap font-bold">Télécharger mon CV (PDF)</span>
              </button>
              <button
                type="button"
                onClick={() => setExportOpen(!exportOpen)}
                className="flex items-center justify-center h-9 w-7 border-l border-blue-500/40 hover:bg-blue-800 rounded-r-lg transition shrink-0"
                title="Autres formats d'export"
              >
                <ChevronDown size={12} className={cn("transition-transform shrink-0", exportOpen && "rotate-180")} />
              </button>
            </div>

            {exportOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-line bg-white p-1 text-ink shadow-2xl z-50 animate-in fade-in slide-in-from-top-1">
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    directPdfExport();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 transition"
                >
                  <Download size={14} className="text-blue-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-ink">Télécharger PDF (A4)</div>
                    <div className="text-[10px] text-mute">Export direct 1-clic haute qualité</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    document.dispatchEvent(new Event("libre-png"));
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 transition"
                >
                  <FileText size={14} className="text-zinc-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-ink">Image HD (PNG)</div>
                    <div className="text-[10px] text-mute">Idéal pour aperçu web ou mobile</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    window.print();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 transition"
                >
                  <Printer size={14} className="text-zinc-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-ink">Imprimer (Système)</div>
                    <div className="text-[10px] text-mute">Via l'imprimante ou boîte native</div>
                  </div>
                </button>
                <div className="my-1 border-t border-line" />
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    document.dispatchEvent(new Event("libre-json"));
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-mute hover:text-ink hover:bg-slate-50 transition text-xs"
                >
                  <span>Sauvegarder le projet (JSON)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ZONE DU CANVAS AVEC FOND GRIS ARDOISE DOUX (#E2E8F0 / bg-slate-200/80) */}
      <div
        ref={scrollerRef}
        className="no-print relative min-h-0 flex-1 overflow-auto bg-slate-200/80"
        style={{ backgroundColor: "#E2E8F0", cursor: spaceOn ? "grab" : "default" }}
        onPointerDown={onScrollerPointerDown}
      >
        {/* RÈGLES MILLIMÉTRÉES (UNIQUEMENT EN STUDIO PRO) */}
        {isPro && (
          <div className="sticky top-0 left-0 z-20 pointer-events-none select-none">
            {/* Règle Horizontale supérieure */}
            <div className="flex h-6 w-full items-end border-b border-slate-300 bg-slate-100/95 backdrop-blur-xs px-8 text-[9px] font-mono text-slate-500">
              <div className="relative mx-auto h-full" style={{ width: PAGE_W * zoom }}>
                {horizontalTicks.map((tick) => (
                  <div
                    key={tick}
                    className="absolute bottom-0 flex flex-col items-start"
                    style={{ left: tick * zoom }}
                  >
                    <span className="pl-1 leading-none pb-0.5">{tick}</span>
                    <div className="h-1.5 w-px bg-slate-400" />
                  </div>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2 pr-2 pb-1 text-[10px] font-semibold text-slate-600">
                <span>{ PAGE_W } × { PAGE_H } px</span>
              </div>
            </div>
          </div>
        )}

        <div className={cn("box-border min-h-full px-8", isPro ? "py-6" : "py-10")}>
          <div className="relative mx-auto" style={{ width: PAGE_W * zoom, height: innerHeight * zoom }}>
            {/* Règle Verticale gauche (Uniquement en Studio Pro) */}
            {isPro && (
              <div
                className="no-print pointer-events-none absolute top-0 -left-7 z-20 select-none overflow-hidden rounded-l border border-r-0 border-slate-300 bg-slate-100/95 font-mono text-[9px] text-slate-500"
                style={{ width: 24, height: PAGE_H * zoom }}
              >
                {verticalTicks.map((tick) => (
                  <div
                    key={tick}
                    className="absolute right-0 flex items-center justify-end pr-0.5"
                    style={{ top: tick * zoom }}
                  >
                    <span className="pr-0.5 leading-none">{tick}</span>
                    <div className="h-px w-1.5 bg-slate-400" />
                  </div>
                ))}
              </div>
            )}

            {/* BARRE D'OUTILS CONTEXTUELLE FLOTTANTE ALLÉGÉE (4 ACTIONS RAPIDES) */}
            {primarySelected && !primarySelected.locked && (
              <div
                className="no-print absolute left-1/2 z-40 -translate-x-1/2 flex items-center gap-1.5 rounded-xl border border-ink-line bg-ink p-1.5 text-xs text-cream shadow-2xl animate-in fade-in slide-in-from-top-3 whitespace-nowrap flex-nowrap w-max"
                style={{ top: floatingBarTop }}
              >
                {/* 1. BOUTON ÉTINCELLE : FORMULER COMME UN PRO */}
                {["text", "heading", "experience"].includes(primarySelected.type) && (
                  <div className="relative flex items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => boostElementText(primarySelected.id)}
                      className="flex h-8 items-center gap-1.5 rounded-l-lg bg-amber-400 px-2.5 text-xs font-bold text-black hover:bg-amber-300 transition shadow-xs whitespace-nowrap shrink-0"
                      title="Transforme ce texte en une formulation professionnelle orientée résultats"
                    >
                      <Sparkles size={13} className="shrink-0" />
                      <span className="whitespace-nowrap shrink-0">✨ Formuler comme un pro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoostMenuOpen(!boostMenuOpen)}
                      className="flex h-8 items-center px-1 rounded-r-lg bg-amber-400 text-black hover:bg-amber-300 border-l border-amber-500/40 shrink-0"
                      title="Choisir un style de formulation"
                    >
                      <ChevronDown size={11} className="shrink-0" />
                    </button>

                    {/* Menu des tonalités pro */}
                    {boostMenuOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-64 rounded-ui border border-ink-line bg-ink p-2 text-xs text-cream shadow-2xl z-50 space-y-1.5">
                        <div className="text-[10px] font-bold tracking-wider text-amber-300 uppercase px-1">
                          Variantes d'impact
                        </div>
                        {BOOST_PRESETS.map((preset) => (
                          <button
                            key={preset.tone}
                            type="button"
                            onClick={() => {
                              const random = preset.options[Math.floor(Math.random() * preset.options.length)];
                              boostElementText(primarySelected.id, random);
                              setBoostMenuOpen(false);
                            }}
                            className="w-full text-left rounded-md px-2 py-1.5 hover:bg-ink-line text-[11px] transition"
                          >
                            <div className="font-semibold text-cream">{preset.category}</div>
                            <div className="text-[10px] text-ink-mute truncate">{preset.options[0]}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. TAILLE (- / +) & GRAS (B) */}
                {["text", "heading"].includes(primarySelected.type) && (
                  <div className="flex items-center gap-1 border-l border-ink-line pl-1.5 shrink-0 whitespace-nowrap">
                    <button
                      type="button"
                      aria-label="Diminuer la taille"
                      onClick={() =>
                        useStudio.getState().patchSelectedStyle({
                          fontSize: Math.max(8, (primarySelected.style.fontSize || 12) - 1),
                        })
                      }
                      className="flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream shrink-0"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="font-mono text-xs w-6 text-center text-cream shrink-0">
                      {primarySelected.style.fontSize || 12}
                    </span>
                    <button
                      type="button"
                      aria-label="Augmenter la taille"
                      onClick={() =>
                        useStudio.getState().patchSelectedStyle({
                          fontSize: Math.min(120, (primarySelected.style.fontSize || 12) + 1),
                        })
                      }
                      className="flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream shrink-0"
                    >
                      <Plus size={11} />
                    </button>

                    <button
                      type="button"
                      aria-label="Gras"
                      onClick={() =>
                        useStudio.getState().patchSelectedStyle({
                          fontWeight: primarySelected.style.fontWeight >= 650 ? 400 : 700,
                        })
                      }
                      className={cn(
                        "flex size-7 items-center justify-center rounded-md transition shrink-0",
                        primarySelected.style.fontWeight >= 650 ? "bg-cream text-ink font-bold" : "bg-ink-raise text-ink-mute hover:text-cream",
                      )}
                    >
                      <Bold size={12} />
                    </button>
                  </div>
                )}

                {/* 3. DUPLIQUER & 4. SUPPRIMER */}
                <div className="flex items-center gap-1 border-l border-ink-line pl-1.5 shrink-0 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => useStudio.getState().duplicateSelected()}
                    className="flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream shrink-0"
                    title="Dupliquer (⌘D)"
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => useStudio.getState().deleteSelected()}
                    className="flex size-7 items-center justify-center rounded-md bg-red-950/60 text-red-300 hover:bg-red-900 shrink-0"
                    title="Supprimer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                {/* Coordonnées & Dimensions de l'élément en Studio Pro */}
                {isPro && (
                  <div className="flex items-center gap-1 border-l border-ink-line pl-2 pr-1 font-mono text-[10px] text-amber-300 shrink-0 whitespace-nowrap">
                    <span>{Math.round(primarySelected.w)}×{Math.round(primarySelected.h)}</span>
                  </div>
                )}
              </div>
            )}
            <div style={{ width: PAGE_W, transform: `scale(${zoom})`, transformOrigin: "top left" }}>
              <div className="flex flex-col gap-10">
                {doc.pages.map((page) => (
                  <div key={page.id} className="rounded-sm bg-white shadow-2xl">
                    <PageSheet
                      page={page}
                      interactive
                      selectedIds={page.id === activePageId ? selectedIds : []}
                      editingId={page.id === activePageId ? editingId : null}
                      showGrid={isPro ? showGrid : false}
                      showMargins={isPro ? margins : false}
                      guides={isPro && page.id === activePageId ? guideLines : { x: [], y: [] }}
                      marquee={page.id === activePageId ? marquee : null}
                      onSheetPointerDown={onSheetPointerDown(page.id)}
                      onElementPointerDown={onElementPointerDown(page.id)}
                      onDoubleClick={(id) => {
                        const store = useStudio.getState();
                        store.setActive(page.id);
                        const el = page.elements.find((item) => item.id === id);
                        if (!el || el.locked) return;
                        if (el.type === "photo" || el.type === "rect" || el.type === "ellipse" || el.type === "rule") return;
                        store.setEditing(id);
                      }}
                      onChange={onChange(page.id)}
                      onResize={onResize(page.id)}
                      onRotate={onRotate(page.id)}
                      onUpload={onUpload(page.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <span className="sr-only">
          Zoom {Math.round(zoom * 100)} pour cent. Mode {isPro ? "Studio Pro" : "Rapide"}. Magnétisme {snap ? "actif" : "inactif"}. Repères {guidesOn ? "actifs" : "inactifs"}.
        </span>
      </div>
    </div>
  );
}
