import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  AlertCircle,
  Bold,
  BringToFront,
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
  SendToBack,
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

  const saveStatus = useStudio((s) => s.saveStatus);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const saveNow = useStudio((s) => s.saveNow);
  const syncCode = useStudio((s) => s.syncCode);
  const setCloudModalOpen = useStudio((s) => s.setCloudModalOpen);
  const directPdfExport = useStudio((s) => s.directPdfExport);
  const boostElementText = useStudio((s) => s.boostElementText);
  const addSectionPack = useStudio((s) => s.addSectionPack);
  const past = useStudio((s) => s.past.length);
  const future = useStudio((s) => s.future.length);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);

  const [healthOpen, setHealthOpen] = useState(false);
  const [boostMenuOpen, setBoostMenuOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const health = useMemo(() => computeCVHealth(doc, activePageId), [doc, activePageId]);

  const primarySelected = useMemo(() => {
    const page = activePage(doc, activePageId);
    if (!selectedIds.length) return null;
    return page.elements.find((el) => el.id === selectedIds[0]) || null;
  }, [doc, activePageId, selectedIds]);

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
  const page = activePage(doc, activePageId);

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
      {/* HEADER SUPÉRIEUR ÉLÉGANT & DÉCLUSTRING */}
      <header className="no-print relative z-30 flex h-13 shrink-0 items-center justify-between gap-3 border-b border-line bg-cream px-4 select-none">
        {/* Zone Gauche : Document & Score */}
        <div className="flex min-w-0 items-center gap-3">
          {narrow && <span className="font-display text-sm font-bold tracking-wide">CV PRO</span>}
          <div className="flex items-center gap-1.5 text-xs text-ink">
            <span className="font-bold">{page.name}</span>
            <span className="text-mute font-normal">·</span>
            <span className="text-mute font-mono text-[11px]">A4 (794×1123)</span>
          </div>

          <div className="hidden h-4 w-px bg-line sm:block" />

          {/* INDICATEUR DU SCORE DE COMPLÉTION DU CV */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setHealthOpen(!healthOpen)}
              className={cn(
                "group flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-medium transition shadow-xs",
                healthOpen
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-sheet text-ink hover:border-ink hover:bg-cream",
              )}
              title="Cliquez pour voir la checklist de complétion de votre CV"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs">
                  {health.score >= 85 ? "🎯" : health.score >= 60 ? "⚡" : "💡"}
                </span>
                <span className="text-[11px] font-semibold">
                  Score : {health.score}%
                </span>
              </div>
              <div className="h-1.5 w-10 overflow-hidden rounded-full bg-line/80">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${health.score}%`,
                    backgroundColor:
                      health.score >= 80 ? "#10b981" : health.score >= 50 ? "#f59e0b" : "#ef4444",
                  }}
                />
              </div>
              <ChevronDown size={11} className={cn("transition-transform text-mute", healthOpen && "rotate-180 text-cream")} />
            </button>

            {/* CHECKLIST PLIANTE DE COMPLÉTION */}
            {healthOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-xl border border-line bg-sheet p-3.5 text-ink shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
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

                <div className="mt-3 flex items-center justify-between border-t border-line pt-2 text-[10px] text-mute">
                  <span>Temps réel</span>
                  <button
                    type="button"
                    onClick={() => {
                      useStudio.getState().applyJobPreset("developer");
                      setHealthOpen(false);
                    }}
                    className="font-semibold text-amber-600 hover:underline"
                  >
                    ⚡ Compléter à 100%
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zone Centre : Undo / Redo & Sauvegarde */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-0.5 rounded-lg border border-line bg-sheet p-0.5">
            <button
              type="button"
              onClick={() => undo()}
              disabled={past === 0}
              className="flex size-7 items-center justify-center rounded text-ink disabled:opacity-25 hover:bg-paper transition"
              title="Annuler (⌘Z)"
            >
              <Undo size={13} />
            </button>
            <button
              type="button"
              onClick={() => redo()}
              disabled={future === 0}
              className="flex size-7 items-center justify-center rounded text-ink disabled:opacity-25 hover:bg-paper transition"
              title="Rétablir (⌘Y)"
            >
              <Redo size={13} />
            </button>
          </div>

          <div
            onClick={saveNow}
            className="flex items-center gap-1.5 text-[11px] text-mute hover:text-ink cursor-pointer transition"
            title="Enregistrement continu en local. Cliquez pour sauvegarder maintenant."
          >
            <span className={cn("size-2 rounded-full", saveStatus === "saving" ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
            <span className="font-mono text-[10px]">
              {saveStatus === "saving" ? "Sauvegarde..." : mounted && lastSavedAt ? `Enregistré (${lastSavedAt})` : "Enregistré"}
            </span>
          </div>
        </div>

        {/* Zone Droite : Sync, Zoom & Export Principal */}
        <div className="flex items-center gap-2">
          {/* Synchronisation Cloud Multi-appareils */}
          <button
            type="button"
            onClick={() => setCloudModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-line bg-sheet px-2.5 py-1.5 text-[11px] font-medium text-ink hover:border-blue-500 hover:text-blue-600 transition shadow-xs"
            title="Synchroniser votre CV sur mobile ou un autre appareil sans compte"
          >
            <Cloud size={13} className={syncCode ? "text-blue-600" : "text-mute"} />
            <span>{syncCode ? `Sync: ${syncCode}` : "Cloud Sync"}</span>
          </button>

          {/* Zoom */}
          <div className="flex items-center gap-0.5 rounded-lg border border-line bg-sheet p-0.5">
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded text-xs font-semibold text-mute hover:bg-paper hover:text-ink transition"
              onClick={() => setZoom(zoom / 1.15)}
              title="Zoom arrière"
            >
              −
            </button>
            <button
              type="button"
              className="h-7 min-w-11 px-1 text-xs font-semibold tabular-nums hover:bg-paper rounded transition"
              onClick={fit}
              title="Adapter à l'écran"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded text-xs font-semibold text-mute hover:bg-paper hover:text-ink transition"
              onClick={() => setZoom(zoom * 1.15)}
              title="Zoom avant"
            >
              +
            </button>
          </div>

          {/* BOUTON EXPORT CENTRAL AVEC MENU DÉROULANT (SEUL POINT D'EXPORT) */}
          <div className="relative">
            <div className="flex items-center rounded-lg bg-blue-600 text-white shadow-xs">
              <button
                type="button"
                onClick={() => directPdfExport()}
                className="flex items-center gap-1.5 h-8 px-3 text-xs font-bold hover:bg-blue-700 rounded-l-lg transition"
                title="Télécharger directement le fichier A4 en PDF prêt à l'envoi"
              >
                <Download size={13} />
                <span>Télécharger PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setExportOpen(!exportOpen)}
                className="flex items-center justify-center h-8 w-6 border-l border-blue-500/50 hover:bg-blue-700 rounded-r-lg transition"
                title="Autres formats d'export"
              >
                <ChevronDown size={12} className={cn("transition-transform", exportOpen && "rotate-180")} />
              </button>
            </div>

            {exportOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-line bg-sheet p-1 text-ink shadow-2xl z-50 animate-in fade-in slide-in-from-top-1">
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    directPdfExport();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-cream transition"
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
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-cream transition"
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
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-cream transition"
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
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-mute hover:text-ink hover:bg-cream transition text-xs"
                >
                  <span>Sauvegarder le projet (JSON)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BARRE D'OUTILS CONTEXTUELLE FLOTTANTE (CANVA / FIGMA PRO) */}
      {primarySelected && !primarySelected.locked && (
        <div className="no-print absolute top-15 left-1/2 z-40 -translate-x-1/2 flex items-center gap-1.5 rounded-xl border border-ink-line bg-ink p-1.5 text-xs text-cream shadow-2xl animate-in fade-in slide-in-from-top-3">
          {/* BOUTON ÉTINCELLE : FORMULER COMME UN PRO */}
          {["text", "heading", "experience"].includes(primarySelected.type) && (
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => boostElementText(primarySelected.id)}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-amber-400 px-2.5 text-xs font-bold text-black hover:bg-amber-300 transition shadow-xs"
                title="Transforme ce texte en une formulation professionnelle orientée résultats"
              >
                <Sparkles size={13} className="shrink-0" />
                <span>Formuler comme un pro</span>
              </button>
              <button
                type="button"
                onClick={() => setBoostMenuOpen(!boostMenuOpen)}
                className="flex h-8 items-center px-1 rounded-r-lg bg-amber-400 text-black hover:bg-amber-300 border-l border-amber-500/40"
                title="Choisir un style de formulation"
              >
                <ChevronDown size={11} />
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

          {/* CONTRÔLES TYPOGRAPHIQUES RAPIDES */}
          {["text", "heading"].includes(primarySelected.type) && (
            <div className="flex items-center gap-1 border-l border-ink-line pl-1.5">
              <button
                type="button"
                aria-label="Diminuer la taille"
                onClick={() =>
                  useStudio.getState().patchSelectedStyle({
                    fontSize: Math.max(8, (primarySelected.style.fontSize || 12) - 1),
                  })
                }
                className="flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream"
              >
                <Minus size={11} />
              </button>
              <span className="font-mono text-xs w-6 text-center text-cream">
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
                className="flex size-7 items-center justify-center rounded-md bg-ink-raise hover:bg-ink-line text-ink-mute hover:text-cream"
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
                  "flex size-7 items-center justify-center rounded-md transition",
                  primarySelected.style.fontWeight >= 650 ? "bg-cream text-ink font-bold" : "bg-ink-raise text-ink-mute hover:text-cream",
                )}
              >
                <Bold size={12} />
              </button>
            </div>
          )}

          {/* COULEUR DE FOND DU BLOC */}
          <div className="flex items-center gap-1 border-l border-ink-line pl-1.5">
            <label className="flex items-center gap-1 cursor-pointer" title="Couleur de fond">
              <span className="text-[10px] text-ink-mute">Fond:</span>
              <input
                type="color"
                value={primarySelected.style.backgroundColor !== "transparent" ? primarySelected.style.backgroundColor : "#ffffff"}
                onChange={(e) => useStudio.getState().patchSelectedStyle({ backgroundColor: e.target.value })}
                className="size-6 cursor-pointer rounded-md border border-ink-line bg-transparent p-0"
              />
            </label>
          </div>

          {/* ACTIONS D'ARRANGEMENT */}
          <div className="flex items-center gap-0.5 border-l border-ink-line pl-1.5">
            <button
              type="button"
              onClick={() => useStudio.getState().order("front")}
              className="flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream"
              title="Mettre au premier plan"
            >
              <BringToFront size={12} />
            </button>
            <button
              type="button"
              onClick={() => useStudio.getState().order("back")}
              className="flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream"
              title="Mettre à l'arrière-plan"
            >
              <SendToBack size={12} />
            </button>
            <button
              type="button"
              onClick={() => useStudio.getState().duplicateSelected()}
              className="flex size-7 items-center justify-center rounded-md bg-ink-raise text-ink-mute hover:text-cream"
              title="Dupliquer (⌘D)"
            >
              <Copy size={12} />
            </button>
            <button
              type="button"
              onClick={() => useStudio.getState().deleteSelected()}
              className="flex size-7 items-center justify-center rounded-md bg-red-950/60 text-red-300 hover:bg-red-900"
              title="Supprimer"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      )}

      {/* ZONE DU CANVAS */}
      <div
        ref={scrollerRef}
        className="no-print relative min-h-0 flex-1 overflow-auto bg-paper"
        style={{ cursor: spaceOn ? "grab" : "default" }}
        onPointerDown={onScrollerPointerDown}
      >
        <div className="box-border min-h-full px-8 py-10">
          <div className="relative mx-auto" style={{ width: PAGE_W * zoom, height: innerHeight * zoom }}>
            <div style={{ width: PAGE_W, transform: `scale(${zoom})`, transformOrigin: "top left" }}>
              <div className="flex flex-col gap-10">
                {doc.pages.map((page) => (
                  <div key={page.id} className={page.id === activePageId ? "rounded-sm ring-1 ring-ink" : "rounded-sm ring-1 ring-line"}>
                    <PageSheet
                      page={page}
                      interactive
                      selectedIds={page.id === activePageId ? selectedIds : []}
                      editingId={page.id === activePageId ? editingId : null}
                      showGrid={showGrid}
                      showMargins={margins}
                      guides={page.id === activePageId ? guideLines : { x: [], y: [] }}
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
          Zoom {Math.round(zoom * 100)} pour cent. Magnétisme {snap ? "actif" : "inactif"}. Repères {guidesOn ? "actifs" : "inactifs"}.
        </span>
      </div>
    </div>
  );
}
