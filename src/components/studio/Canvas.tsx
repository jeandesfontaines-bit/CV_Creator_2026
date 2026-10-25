import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { PageSheet } from "@/components/studio/PageSheet";
import { readImage } from "@/cv/image";
import { clientToSheet, intersects, normRotation, resizeBox, snapMove } from "@/cv/geometry";
import { activePage, useStudio } from "@/cv/store";
import type { Box, Content, CVElement, Handle } from "@/cv/types";
import { PAGE_H, PAGE_W } from "@/cv/types";

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

  const onRotate = (pageId: string) => (id: string, event: ReactPointerEvent) => {
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

  const fit = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const z = Math.min((el.clientWidth - 64) / PAGE_W, (el.clientHeight - 64) / PAGE_H);
    if (z > 0) setZoom(Math.round(Math.min(1, z) * 100) / 100);
  };

  const innerHeight = doc.pages.length * PAGE_H + Math.max(0, doc.pages.length - 1) * 40;
  const page = activePage(doc, activePageId);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="no-print flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line bg-cream px-3">
        <div className="flex min-w-0 items-center gap-2">
          {narrow && <span className="font-display text-sm font-bold tracking-wide">LIBRE</span>}
          <span className="truncate text-sm font-medium">{page.name}</span>
          <span className="hidden text-xs text-mute sm:inline">A4</span>
        </div>
        <p className="hidden text-xs text-mute lg:block">Double-clic pour écrire · Espace pour se déplacer</p>
        <div className="flex items-center gap-1">
          <button type="button" className="h-8 rounded-ui px-2 text-xs font-semibold text-mute hover:bg-paper hover:text-ink" onClick={() => setZoom(zoom / 1.1)}>
            −
          </button>
          <button type="button" className="h-8 min-w-12 rounded-ui px-2 text-xs font-semibold tabular-nums hover:bg-paper" onClick={fit}>
            {Math.round(zoom * 100)}%
          </button>
          <button type="button" className="h-8 rounded-ui px-2 text-xs font-semibold text-mute hover:bg-paper hover:text-ink" onClick={() => setZoom(zoom * 1.1)}>
            +
          </button>
        </div>
      </header>
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
