import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Cloud, Layers, SlidersHorizontal, Smartphone } from "lucide-react";
import { Canvas } from "@/components/studio/Canvas";
import { Inspector } from "@/components/studio/Inspector";
import { PageSheet } from "@/components/studio/PageSheet";
import { Sidebar } from "@/components/studio/Sidebar";
import { SimpleEditor } from "@/components/studio/SimpleEditor";
import { CloudSyncModal } from "@/components/studio/CloudSyncModal";
import { MobileTouchEditor } from "@/components/studio/MobileTouchEditor";
import { CvExtractorModal } from "@/components/studio/CvExtractorModal";
import { activePage, useStudio } from "@/cv/store";
import { PAGE_H, PAGE_W } from "@/cv/types";

function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return narrow;
}

export function Studio() {
  const narrow = useNarrow();
  const [panel, setPanel] = useState<null | "library" | "inspect">(null);
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const notice = useStudio((s) => s.notice);
  const cloudModalOpen = useStudio((s) => s.cloudModalOpen);
  const setCloudModalOpen = useStudio((s) => s.setCloudModalOpen);
  const mobileTouchMode = useStudio((s) => s.mobileTouchMode);
  const setMobileTouchMode = useStudio((s) => s.setMobileTouchMode);
  const editorMode = useStudio((s) => s.editorMode);
  const setEditorMode = useStudio((s) => s.setEditorMode);

  const captureRef = useRef<HTMLDivElement>(null);
  const page = activePage(doc, activePageId);

  useEffect(() => {
    useStudio.getState().hydrate();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT");
      const meta = event.metaKey || event.ctrlKey;
      const store = useStudio.getState();
      if (meta && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) store.redo();
        else store.undo();
        return;
      }
      if (meta && event.key.toLowerCase() === "y") {
        event.preventDefault();
        store.redo();
        return;
      }
      if (typing) return;
      if (meta && event.key.toLowerCase() === "d") {
        event.preventDefault();
        store.duplicateSelected();
        return;
      }
      if (meta && event.key.toLowerCase() === "c") {
        event.preventDefault();
        store.copy();
        return;
      }
      if (meta && event.key.toLowerCase() === "v") {
        event.preventDefault();
        store.paste();
        return;
      }
      if (meta && event.key.toLowerCase() === "a") {
        event.preventDefault();
        const current = activePage(store.doc, store.activePageId);
        store.select(current.elements.filter((el) => !el.hidden).map((el) => el.id));
        return;
      }
      if (event.key === "Escape") {
        store.select([]);
        store.setEditing(null);
        setPanel(null);
        return;
      }
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        store.deleteSelected();
        return;
      }
      if (event.key === "[") {
        store.order("backward");
        return;
      }
      if (event.key === "]") {
        store.order("forward");
        return;
      }
      if (!event.key.startsWith("Arrow") || store.selectedIds.length === 0) return;
      event.preventDefault();
      const step = event.shiftKey ? 8 : 1;
      const dx = event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
      const dy = event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
      const current = activePage(store.doc, store.activePageId);
      const patches: Record<string, { x: number; y: number }> = {};
      for (const el of current.elements) {
        if (!store.selectedIds.includes(el.id) || el.locked) continue;
        patches[el.id] = { x: el.x + dx, y: el.y + dy };
      }
      if (Object.keys(patches).length) store.patchElements(store.activePageId, patches);
    };
    const onUp = (event: KeyboardEvent) => {
      if (event.key.startsWith("Arrow")) useStudio.getState().release();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  useEffect(() => {
    const png = async () => {
      const node = captureRef.current;
      if (!node) return;
      useStudio.getState().notify("Image en cours…");
      try {
        const { toPng } = await import("html-to-image");
        const url = await toPng(node, { pixelRatio: 2, cacheBust: true });
        const a = document.createElement("a");
        a.href = url;
        a.download = "cv-libre.png";
        a.click();
        useStudio.getState().notify("PNG téléchargé");
      } catch {
        useStudio.getState().notify("PNG impossible — utilise PDF");
      }
    };
    const json = () => {
      const blob = new Blob([JSON.stringify(useStudio.getState().doc, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv-libre.json";
      a.click();
      URL.revokeObjectURL(url);
      useStudio.getState().notify("JSON téléchargé");
    };
    document.addEventListener("libre-png", png);
    document.addEventListener("libre-json", json);
    return () => {
      document.removeEventListener("libre-png", png);
      document.removeEventListener("libre-json", json);
    };
  }, []);

  // Si editorMode est "guided" (Mode Édition Simple), afficher le formulaire guidé en 2 colonnes sans Sidebar ni Inspector
  if (editorMode === "guided") {
    return (
      <>
        <SimpleEditor />
        <CloudSyncModal isOpen={cloudModalOpen} onClose={() => setCloudModalOpen(false)} />
        <CvExtractorModal />
        {notice && (
          <div className="no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-xl">
            {notice}
          </div>
        )}
      </>
    );
  }

  // Sinon, Mode Design Libre (Studio complet) avec bouton de retour au formulaire simple
  return (
    <div className="studio flex h-dvh w-full overflow-hidden bg-paper text-ink flex-col">
      {/* Barre supérieure Mode Studio Pro avec bouton de retour */}
      <div className="no-print flex h-11 shrink-0 items-center justify-between border-b border-line bg-ink px-4 text-cream z-30">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditorMode("guided")}
            className="flex items-center gap-1.5 rounded-lg bg-cream/10 px-3 py-1 text-xs font-bold text-cream hover:bg-cream/20 transition"
          >
            <ArrowLeft size={14} />
            <span>⬅ Retour au Mode Formulaire Simple</span>
          </button>
        </div>
        <div className="text-xs font-mono text-ink-mute">
          🎨 Mode Design Libre (Studio Expert)
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {!narrow && <Sidebar />}
        <div className="flex min-w-0 flex-1 flex-col">
          {narrow && mobileTouchMode ? (
            <MobileTouchEditor onSwitchToCanvas={() => setMobileTouchMode(false)} />
          ) : (
            <Canvas narrow={narrow} />
          )}
          {narrow && !mobileTouchMode && (
            <div className="no-print flex h-14 shrink-0 border-t border-line bg-cream">
              <button
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-blue-600"
                onClick={() => setMobileTouchMode(true)}
              >
                <Smartphone size={16} />
                Tactile
              </button>
              <button type="button" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium" onClick={() => setPanel("library")}>
                <Layers size={16} />
                Atelier
              </button>
              <button type="button" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium" onClick={() => setPanel("inspect")}>
                <SlidersHorizontal size={16} />
                Réglages
              </button>
              <button
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium"
                onClick={() => setCloudModalOpen(true)}
              >
                <Cloud size={16} />
                Cloud
              </button>
            </div>
          )}
        </div>
        {!narrow && <Inspector />}
      </div>

      <CloudSyncModal isOpen={cloudModalOpen} onClose={() => setCloudModalOpen(false)} />
      <CvExtractorModal />

      {narrow && panel && (
        <div className="no-print fixed inset-0 z-40 flex bg-ink/50" onClick={() => setPanel(null)}>
          <div className="h-full max-w-full" onClick={(event) => event.stopPropagation()}>
            {panel === "library" ? <Sidebar onDone={() => setPanel(null)} /> : <div className="h-full w-80 max-w-[100vw]"><Inspector /></div>}
          </div>
        </div>
      )}

      {notice && (
        <div className="no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-cream">
          {notice}
        </div>
      )}

      <div className="print-root">
        {doc.pages.map((item) => (
          <div key={item.id} className="print-sheet" style={{ width: PAGE_W, height: PAGE_H }}>
            <PageSheet
              page={item}
              interactive={false}
              selectedIds={[]}
              editingId={null}
              showGrid={false}
              showMargins={false}
              guides={{ x: [], y: [] }}
              marquee={null}
            />
          </div>
        ))}
      </div>

      <div className="no-print pointer-events-none fixed top-0 -left-[12000px]" aria-hidden>
        <div ref={captureRef} style={{ width: PAGE_W, height: PAGE_H }}>
          <PageSheet
            page={page}
            interactive={false}
            selectedIds={[]}
            editingId={null}
            showGrid={false}
            showMargins={false}
            guides={{ x: [], y: [] }}
            marquee={null}
          />
        </div>
      </div>
    </div>
  );
}
