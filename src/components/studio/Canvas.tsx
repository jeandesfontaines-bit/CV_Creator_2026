import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  Bold,
  BringToFront,
  ChevronDown,
  Copy,
  Lock,
  Minus,
  Plus,
  SendToBack,
  Sparkles,
  Trash2,
  Unlock,
} from "lucide-react";
import { PageSheet } from "@/components/studio/PageSheet";
import { readImage } from "@/cv/image";
import { clientToSheet, intersects, normRotation, resizeBox, snapMove } from "@/cv/geometry";
import { activePage, useStudio } from "@/cv/store";
import { BOOST_PRESETS } from "@/cv/presets";
import type { Box, Content, CVElement, Handle } from "@/cv/types";
import { PAGE_H, PAGE_W, TYPE_LABEL } from "@/cv/types";
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
  const boostElementText = useStudio((s) => s.boostElementText);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const space = useRef(false);
  const [spaceOn, setSpaceOn] = useState(false);
  const [guideLines, setGuideLines] = useState<{ x: number[]; y: number[] }>({ x: [], y: [] });
  const [marquee, setMarquee] = useState<Box | null>(null);
  const [boostMenuOpen, setBoostMenuOpen] = useState(false);

  // Calcule un zoom optimal privilégiant la lisibilité du CV dans l'espace de travail
  const fitComfortableWidth = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const availW = el.clientWidth - (narrow ? 32 : 72);
    const availH = el.clientHeight - 56;
    if (availW <= 0 || availH <= 0) return;
    const widthZoom = availW / PAGE_W;
    const heightZoom = availH / PAGE_H;
    // Sur ordinateur portable et grand écran, privilégier un affichage large et lisible (entre 0.78 et 0.96)
    const target = narrow
      ? Math.min(widthZoom, heightZoom)
      : Math.min(widthZoom, Math.max(heightZoom * 1.24, 0.84));
    const clamped = Math.round(Math.min(1.05, Math.max(0.42, target)) * 100) / 100;
    setZoom(clamped);
  }, [narrow, setZoom]);

  const fitWholePage = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const z = Math.min((el.clientWidth - 64) / PAGE_W, (el.clientHeight - 48) / PAGE_H);
    if (z > 0) setZoom(Math.round(Math.min(1, z) * 100) / 100);
  }, [setZoom]);

  useLayoutEffect(() => {
    fitComfortableWidth();
  }, [fitComfortableWidth]);

  useEffect(() => {
    const onFitWidth = () => fitComfortableWidth();
    const onFitPage = () => fitWholePage();
    window.addEventListener("resize", onFitWidth);
    document.addEventListener("studio-fit-width", onFitWidth);
    document.addEventListener("studio-fit-page", onFitPage);
    return () => {
      window.removeEventListener("resize", onFitWidth);
      document.removeEventListener("studio-fit-width", onFitWidth);
      document.removeEventListener("studio-fit-page", onFitPage);
    };
  }, [fitComfortableWidth, fitWholePage]);

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
      const typing =
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName));
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

  useEffect(() => {
    setBoostMenuOpen(false);
  }, [selectedIds]);

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

  const primarySelected = useMemo(() => {
    const page = activePage(doc, activePageId);
    if (!selectedIds.length) return null;
    return page.elements.find((el) => el.id === selectedIds[0]) || null;
  }, [doc, activePageId, selectedIds]);

  const pageIndex = useMemo(() => {
    const idx = doc.pages.findIndex((p) => p.id === activePageId);
    return idx >= 0 ? idx : 0;
  }, [doc.pages, activePageId]);

  // Positionne la barre d'actions flottante sans jamais masquer l'élément sélectionné
  const floatingPosition = useMemo(() => {
    if (!primarySelected) return { top: 12, left: (PAGE_W * zoom) / 2 };
    const pageOffset = pageIndex * (PAGE_H + 40);
    const elementTopZoomed = (pageOffset + primarySelected.y) * zoom;
    const elementBottomZoomed = (pageOffset + primarySelected.y + primarySelected.h) * zoom;
    const elementCenterX = (primarySelected.x + primarySelected.w / 2) * zoom;

    const placeBelow = elementTopZoomed < 56 || primarySelected.y < 64;
    const top = placeBelow ? elementBottomZoomed + 12 : Math.max(8, elementTopZoomed - 46);
    const minLeft = 170;
    const maxLeft = Math.max(minLeft, PAGE_W * zoom - 170);
    const left = Math.min(maxLeft, Math.max(minLeft, elementCenterX));

    return { top, left };
  }, [primarySelected, pageIndex, zoom]);

  const innerHeight = doc.pages.length * PAGE_H + Math.max(0, doc.pages.length - 1) * 40;

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
      <div
        ref={scrollerRef}
        data-canvas="bg"
        className="no-print relative min-h-0 flex-1 overflow-auto bg-[#EEF2F6]"
        style={{ cursor: spaceOn ? "grab" : "default" }}
        onPointerDown={(e) => {
          onScrollerPointerDown(e);
          if (e.target === e.currentTarget && !space.current && e.button === 0) {
            useStudio.getState().select([]);
            useStudio.getState().setEditing(null);
          }
        }}
      >
        <div
          data-canvas="bg"
          className="box-border min-h-full px-4 py-6 sm:px-8 sm:py-8 flex justify-center items-start"
          onPointerDown={(e) => {
            if (e.target === e.currentTarget && !space.current && e.button === 0) {
              useStudio.getState().select([]);
              useStudio.getState().setEditing(null);
            }
          }}
        >
          <div className="relative shrink-0" style={{ width: PAGE_W * zoom, height: innerHeight * zoom }}>
            {/* BARRE D'ACTIONS CONTEXTUELLE COMPACTE & BIEN POSITIONNÉE */}
            {primarySelected && (
              <div
                className="no-print absolute z-40 -translate-x-1/2 flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-900/95 px-2 py-1 text-xs text-white shadow-xl backdrop-blur-md whitespace-nowrap"
                style={{ top: floatingPosition.top, left: floatingPosition.left }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <span className="px-1.5 text-[11px] font-medium text-slate-300">
                  {TYPE_LABEL[primarySelected.type]}
                </span>

                {!primarySelected.locked && ["text", "heading", "experience"].includes(primarySelected.type) && (
                  <div className="relative flex items-center border-l border-slate-700 pl-1.5">
                    <button
                      type="button"
                      onClick={() => boostElementText(primarySelected.id)}
                      className="flex h-7 items-center gap-1 rounded-l-md bg-blue-600 px-2 text-[11px] font-semibold text-white hover:bg-blue-500 transition"
                      title="Améliorer la formulation de ce bloc"
                    >
                      <Sparkles size={11} className="shrink-0" />
                      <span>Reformuler</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoostMenuOpen(!boostMenuOpen)}
                      className="flex h-7 items-center rounded-r-md border-l border-blue-400/30 bg-blue-600 px-1 text-white hover:bg-blue-500 transition"
                      title="Choisir un style de formulation"
                    >
                      <ChevronDown size={11} />
                    </button>

                    {boostMenuOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-60 rounded-lg border border-slate-700 bg-slate-900 p-1.5 text-xs text-white shadow-2xl z-50 space-y-1">
                        <div className="px-2 py-1 text-[10px] font-semibold text-slate-400">
                          Suggestions de formulation
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
                            className="w-full rounded-md px-2 py-1.5 text-left hover:bg-slate-800 transition"
                          >
                            <div className="text-xs font-medium text-white">{preset.category}</div>
                            <div className="text-[11px] text-slate-400 truncate">{preset.options[0]}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {!primarySelected.locked && ["text", "heading", "experience", "education", "contact"].includes(primarySelected.type) && (
                  <div className="flex items-center gap-0.5 border-l border-slate-700 pl-1.5">
                    <button
                      type="button"
                      aria-label="Diminuer la taille"
                      onClick={() =>
                        useStudio.getState().patchSelectedStyle({
                          fontSize: Math.max(8, (primarySelected.style.fontSize || 12) - 1),
                        })
                      }
                      className="flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="min-w-6 text-center font-mono text-[11px] tabular-nums text-white">
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
                      className="flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white"
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
                        "flex size-6 items-center justify-center rounded transition",
                        primarySelected.style.fontWeight >= 650
                          ? "bg-white text-slate-900 font-bold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white",
                      )}
                    >
                      <Bold size={11} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-0.5 border-l border-slate-700 pl-1.5">
                  <button
                    type="button"
                    onClick={() => useStudio.getState().order("front")}
                    className="flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                    title="Mettre au premier plan"
                  >
                    <BringToFront size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => useStudio.getState().order("back")}
                    className="flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                    title="Mettre à l'arrière-plan"
                  >
                    <SendToBack size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => useStudio.getState().duplicateSelected()}
                    className="flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                    title="Dupliquer (⌘D)"
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => useStudio.getState().lockSelected(!primarySelected.locked)}
                    className="flex size-6 items-center justify-center rounded text-slate-300 hover:bg-slate-800 hover:text-white"
                    title={primarySelected.locked ? "Déverrouiller" : "Verrouiller"}
                  >
                    {primarySelected.locked ? <Lock size={12} className="text-amber-400" /> : <Unlock size={12} />}
                  </button>
                  {!primarySelected.locked && (
                    <button
                      type="button"
                      onClick={() => useStudio.getState().deleteSelected()}
                      className="flex size-6 items-center justify-center rounded text-red-400 hover:bg-red-950/60 hover:text-red-300"
                      title="Supprimer (Suppr)"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* FEUILLE(S) A4 */}
            <div style={{ width: PAGE_W, transform: `scale(${zoom})`, transformOrigin: "top left" }}>
              <div className="flex flex-col gap-10">
                {doc.pages.map((page) => (
                  <div key={page.id} className="rounded-xs bg-white shadow-xl">
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
