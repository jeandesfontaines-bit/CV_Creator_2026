import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Download,
  FileText,
  FolderOpen,
  Layers,
  Maximize2,
  Minus,
  Plus,
  Printer,
  Redo2,
  RotateCcw,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Undo2,
  Upload,
  X,
} from "lucide-react";
import { Canvas } from "@/components/studio/Canvas";
import { Inspector } from "@/components/studio/Inspector";
import { PageSheet } from "@/components/studio/PageSheet";
import { Sidebar } from "@/components/studio/Sidebar";
import { SimpleEditor } from "@/components/studio/SimpleEditor";
import { CloudSyncModal } from "@/components/studio/CloudSyncModal";
import { MobileTouchEditor } from "@/components/studio/MobileTouchEditor";
import { CvExtractorModal } from "@/components/studio/CvExtractorModal";
import { OnboardingFlow } from "@/components/studio/OnboardingFlow";
import { DocumentAlertBanner } from "@/components/studio/DocumentAlertBanner";
import { ReadabilityModal } from "@/components/studio/ReadabilityModal";
import { PlainTextModal } from "@/components/studio/PlainTextModal";
import { computeCVHealth } from "@/cv/health";
import { activePage, useStudio } from "@/cv/store";
import { PAGE_H, PAGE_W } from "@/cv/types";
import { cn } from "@/lib/utils";

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
  const [healthOpen, setHealthOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const notice = useStudio((s) => s.notice);
  const saveStatus = useStudio((s) => s.saveStatus);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const zoom = useStudio((s) => s.zoom);
  const setZoom = useStudio((s) => s.setZoom);
  const past = useStudio((s) => s.past.length);
  const future = useStudio((s) => s.future.length);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);
  const syncCode = useStudio((s) => s.syncCode);
  const cloudModalOpen = useStudio((s) => s.cloudModalOpen);
  const setCloudModalOpen = useStudio((s) => s.setCloudModalOpen);
  const setExtractorModalOpen = useStudio((s) => s.setExtractorModalOpen);
  const directPdfExport = useStudio((s) => s.directPdfExport);
  const requestPdfExport = useStudio((s) => s.requestPdfExport);
  const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);
  const setPlainTextModalOpen = useStudio((s) => s.setPlainTextModalOpen);
  const addSectionPack = useStudio((s) => s.addSectionPack);
  const boostElementText = useStudio((s) => s.boostElementText);
  const mobileTouchMode = useStudio((s) => s.mobileTouchMode);
  const setMobileTouchMode = useStudio((s) => s.setMobileTouchMode);
  const editorMode = useStudio((s) => s.editorMode);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const onboarding = useStudio((s) => s.onboarding);
  const setOnboarding = useStudio((s) => s.setOnboarding);

  const captureRef = useRef<HTMLDivElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const page = activePage(doc, activePageId);
  const health = useMemo(() => computeCVHealth(doc, activePageId), [doc, activePageId]);

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
        setHealthOpen(false);
        setExportOpen(false);
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
      useStudio.getState().notify("Génération de l'image HD…");
      try {
        const { toPng } = await import("html-to-image");
        const url = await toPng(node, { pixelRatio: 2, cacheBust: true });
        const a = document.createElement("a");
        a.href = url;
        a.download = "cv-atelier.png";
        a.click();
        useStudio.getState().notify("Image PNG téléchargée");
      } catch {
        useStudio.getState().notify("Export PNG indisponible — utilisez PDF");
      }
    };
    const json = () => {
      const blob = new Blob([JSON.stringify(useStudio.getState().doc, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv-atelier.json";
      a.click();
      URL.revokeObjectURL(url);
      useStudio.getState().notify("Fichier JSON sauvegardé");
    };
    document.addEventListener("libre-png", png);
    document.addEventListener("libre-json", json);
    return () => {
      document.removeEventListener("libre-png", png);
      document.removeEventListener("libre-json", json);
    };
  }, []);

  const handleHealthAction = (item: (typeof health.items)[0]) => {
    setHealthOpen(false);
    if (item.id === "experiences") {
      addSectionPack("pack-experience");
    } else if (item.id === "skills") {
      addSectionPack("pack-skills");
    } else if (item.id === "languages") {
      addSectionPack("pack-languages");
    } else if (item.id === "metrics") {
      const current = activePage(doc, activePageId);
      const firstExp = current.elements.find((e) => e.type === "experience");
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

  const confirmModal = useStudio((s) => s.confirmModal);
  const setConfirmModal = useStudio((s) => s.setConfirmModal);
  const requestResetLayout = useStudio((s) => s.requestResetLayout);
  const requestNewDocument = useStudio((s) => s.requestNewDocument);
  const layoutCustomized = useStudio((s) => s.layoutCustomized);

  const sharedOverlays = (
    <>
      <CloudSyncModal isOpen={cloudModalOpen} onClose={() => setCloudModalOpen(false)} />
      <CvExtractorModal />

      {confirmModal && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
          onClick={() => setConfirmModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl",
                    confirmModal.variant === "danger"
                      ? "bg-red-100 text-red-600"
                      : "bg-amber-100 text-amber-700",
                  )}
                >
                  <AlertCircle size={18} />
                </div>
                <h3 id="confirm-modal-title" className="text-sm font-bold text-slate-900">
                  {confirmModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="flex size-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs leading-relaxed text-slate-600">{confirmModal.message}</p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => confirmModal.onConfirm()}
                className={cn(
                  "rounded-lg px-4 py-2 text-xs font-bold text-white transition shadow-xs",
                  confirmModal.variant === "danger"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-900 hover:bg-slate-800",
                )}
              >
                {confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {notice && (
        <div className="no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-xl">
          {notice}
        </div>
      )}

      <ReadabilityModal />
      <PlainTextModal />

      <div className="print-root">
        {doc.pages.map((item) => (
          <div key={item.id} className="print-sheet" style={{ width: PAGE_W, height: PAGE_H }}>
            <PageSheet
              page={item}
              interactive={false}
              exportSheetId={`print-${item.id}`}
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

      {/* Feuilles A4 1:1 dédiées à l'export PDF et PNG dans tous les modes */}
      <div className="no-print pointer-events-none fixed top-0 -left-[12000px]" aria-hidden>
        {doc.pages.map((item) => (
          <div
            key={item.id}
            ref={item.id === page.id ? captureRef : undefined}
            style={{ width: PAGE_W, height: PAGE_H }}
          >
            <PageSheet
              page={item}
              interactive={false}
              exportSheetId={item.id}
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
    </>
  );

  if (onboarding) {
    return (
      <>
        <OnboardingFlow />
        {sharedOverlays}
      </>
    );
  }

  if (editorMode === "guided") {
    return (
      <>
        <SimpleEditor />
        {sharedOverlays}
      </>
    );
  }

  return (
    <div className="studio flex h-dvh w-full flex-col overflow-hidden bg-paper text-ink select-none">
      {/* BARRE SUPÉRIEURE UNIFIÉE : 3 ZONES PRÉVISIBLES */}
      <header className="no-print relative z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3.5 sm:px-5">
        {/* ZONE 1 : Identité du Studio, Page active & Sauvegarde automatique */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <button
            type="button"
            data-testid="open-onboarding-btn"
            onClick={() => setOnboarding(true)}
            className="flex items-center gap-2.5 rounded-lg p-1 text-left hover:bg-slate-100 transition"
            title="Ouvrir l'accueil / parcours de création"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-display text-xs font-bold tracking-tight text-white">
              CV
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-sm font-bold tracking-tight text-slate-900 leading-none">
                Atelier CV
              </div>
              <div className="mt-0.5 text-[11px] font-medium text-slate-500 leading-none">
                Accueil · Studio A4
              </div>
            </div>
          </button>

          <div className="hidden md:block h-4 w-px bg-slate-200" />

          {/* Indicateur de page et état de sauvegarde sobre */}
          <div className="hidden md:flex items-center gap-2.5 text-xs text-slate-600">
            <span className="font-medium text-slate-800">{page.name}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span
              className="inline-flex items-center gap-1 text-slate-500"
              title={lastSavedAt ? `Dernière sauvegarde automatique à ${lastSavedAt}` : "Sauvegarde automatique active"}
            >
              <Check size={13} className="text-emerald-600 shrink-0" />
              <span>{saveStatus === "saving" ? "Sauvegarde…" : "Enregistré"}</span>
            </span>
          </div>
        </div>

        {/* ZONE 2 : Outils du document (Mode, Annuler/Rétablir, Zoom, Qualité) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sélecteur de vue segmenté toujours accessible */}
          <div
            role="tablist"
            aria-label="Mode d'édition"
            className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200/80"
          >
            <button
              type="button"
              role="tab"
              aria-selected={false}
              onClick={() => setEditorMode("guided")}
              className="rounded-md px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition whitespace-nowrap"
              title="Revenir au mode Saisie guidée sans perdre la mise en page"
            >
              Saisie guidée
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={editorMode === "pro"}
              onClick={() => setEditorMode("pro")}
              className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-2xs transition whitespace-nowrap"
            >
              Studio libre
            </button>
          </div>

          {/* Annuler / Rétablir */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              type="button"
              onClick={() => undo()}
              disabled={past === 0}
              className="flex size-7 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition"
              title="Annuler (⌘Z)"
              aria-label="Annuler"
            >
              <Undo2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => redo()}
              disabled={future === 0}
              className="flex size-7 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition"
              title="Rétablir (⌘Y)"
              aria-label="Rétablir"
            >
              <Redo2 size={14} />
            </button>
          </div>

          {/* Contrôle du Zoom */}
          <div className="hidden sm:flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setZoom(Math.round((zoom - 0.1) * 100) / 100)}
              className="flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              title="Zoom arrière"
              aria-label="Zoom arrière"
            >
              <Minus size={13} />
            </button>
            <button
              type="button"
              onClick={() => document.dispatchEvent(new Event("studio-fit-width"))}
              className="h-7 min-w-13 px-1.5 font-mono text-xs font-semibold tabular-nums text-slate-800 hover:bg-slate-100 rounded-md transition"
              title="Ajuster confortablement à la largeur de travail"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setZoom(Math.round((zoom + 0.1) * 100) / 100)}
              className="flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              title="Zoom avant"
              aria-label="Zoom avant"
            >
              <Plus size={13} />
            </button>
            <button
              type="button"
              onClick={() => document.dispatchEvent(new Event("studio-fit-page"))}
              className="flex size-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition border-l border-slate-100"
              title="Voir la page entière"
              aria-label="Voir la page entière"
            >
              <Maximize2 size={12} />
            </button>
          </div>

          {/* Diagnostic de complétion discret */}
          <div className="relative hidden xl:block">
            <button
              type="button"
              onClick={() => setHealthOpen(!healthOpen)}
              className={cn(
                "flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium transition whitespace-nowrap",
                healthOpen
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              )}
              title="Vérifier les éléments clés du CV"
            >
              <span className="font-mono text-[11px] font-semibold tabular-nums">
                Qualité {health.score}%
              </span>
              <ChevronDown size={12} className={cn("text-slate-400 transition-transform", healthOpen && "rotate-180 text-white")} />
            </button>

            {healthOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl z-50">
                <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Vérification du CV ({health.score}/100)
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Points clés recommandés pour la lisibilité recruteur.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHealthOpen(false)}
                    className="flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                  {health.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-2.5 rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs"
                    >
                      <div className="flex items-start gap-2">
                        {item.passed ? (
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                        ) : (
                          <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
                        )}
                        <div>
                          <div className="font-semibold text-slate-800 leading-snug">{item.label}</div>
                          <div className="mt-0.5 text-[11px] text-slate-500 leading-snug">{item.hint}</div>
                        </div>
                      </div>
                      {!item.passed && item.actionText && (
                        <button
                          type="button"
                          onClick={() => handleHealthAction(item)}
                          className="shrink-0 rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white hover:bg-slate-800 transition"
                        >
                          {item.actionText}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ZONE 3 : Actions d'importation, Cloud & Exportation principale */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-testid="open-plain-text-btn"
            onClick={() => setPlainTextModalOpen(true)}
            className="hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap"
            title="Aperçu texte brut (lecture ATS)"
          >
            <FileText size={13} className="text-slate-500 shrink-0" />
            <span className="hidden lg:inline">Aperçu texte brut</span>
            <span className="lg:hidden">Texte brut</span>
          </button>

          <button
            type="button"
            data-testid="open-readability-btn"
            onClick={() => setReadabilityModalOpen(true, false)}
            className="hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap"
            title="Contrôle de lisibilité et de mise en page avant export"
          >
            <CheckCircle2 size={13} className="text-slate-500 shrink-0" />
            <span>Contrôle</span>
          </button>

          <button
            type="button"
            data-testid="studio-import-cv-btn"
            onClick={() => setExtractorModalOpen(true)}
            className="hidden md:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap"
            title="Importer un CV existant (PDF, Word ou texte)"
          >
            <Upload size={13} className="text-slate-500 shrink-0" />
            <span>Importer mon CV</span>
          </button>

          <button
            type="button"
            onClick={() => setCloudModalOpen(true)}
            className="hidden sm:flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition whitespace-nowrap"
            title="Synchronisation Cloud multi-appareils"
          >
            <Cloud size={13} className="text-slate-500 shrink-0" />
            <span className="hidden lg:inline">{syncCode ? syncCode : "Cloud"}</span>
          </button>

          {/* Action principale unique : Exporter en PDF */}
          <div className="relative flex items-center">
            <div className="flex items-center rounded-lg bg-signal text-white shadow-2xs hover:bg-blue-700 transition">
              <button
                type="button"
                data-testid="export-pdf-btn"
                onClick={() => requestPdfExport()}
                className="flex h-8 items-center gap-1.5 px-3.5 text-xs font-semibold whitespace-nowrap"
                title="Exporter le CV au format PDF A4 haute définition"
              >
                <Download size={13} className="shrink-0" />
                <span>Exporter en PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setExportOpen(!exportOpen)}
                className="flex h-8 w-7 items-center justify-center rounded-r-lg border-l border-white/20 hover:bg-blue-800 transition"
                title="Plus d'options d'export et de fichier"
                aria-label="Options d'export"
              >
                <ChevronDown size={12} className={cn("transition-transform", exportOpen && "rotate-180")} />
              </button>
            </div>

            {exportOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 rounded-xl border border-slate-200 bg-white p-1.5 text-slate-900 shadow-xl z-50">
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    requestPdfExport();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 transition"
                >
                  <Download size={14} className="text-signal shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Télécharger PDF (A4)</div>
                    <div className="text-[11px] text-slate-500">Document prêt à l’envoi</div>
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
                  <FileText size={14} className="text-slate-600 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-slate-900">Image PNG haute résolution</div>
                    <div className="text-[11px] text-slate-500">Pour portfolio ou aperçu</div>
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
                  <Printer size={14} className="text-slate-600 shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-slate-900">Imprimer le document</div>
                    <div className="text-[11px] text-slate-500">Boîte de dialogue système</div>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    document.dispatchEvent(new Event("libre-json"));
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 transition"
                >
                  <FileText size={13} className="text-slate-400 shrink-0" />
                  <span>Sauvegarder le projet (.json)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    jsonInputRef.current?.click();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 transition"
                >
                  <FolderOpen size={13} className="text-slate-400 shrink-0" />
                  <span>Ouvrir un projet (.json)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    setOnboarding(true);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 transition"
                >
                  <Sparkles size={13} className="text-slate-400 shrink-0" />
                  <span>Assistant de démarrage</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    requestResetLayout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-amber-700 hover:bg-amber-50 transition"
                >
                  <RotateCcw size={13} className="shrink-0" />
                  <span>Réinitialiser la mise en page{layoutCustomized ? " *" : ""}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setExportOpen(false);
                    requestNewDocument();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 transition"
                >
                  <RotateCcw size={13} className="shrink-0" />
                  <span>Réinitialiser tout le document</span>
                </button>
              </div>
            )}
          </div>

          <input
            ref={jsonInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  useStudio.getState().loadDocument(JSON.parse(String(reader.result)));
                } catch {
                  useStudio.getState().notify("Fichier JSON invalide");
                }
              };
              reader.readAsText(file);
              event.target.value = "";
            }}
          />
        </div>
      </header>

      <DocumentAlertBanner />

      {/* CORPS DE L'ESPACE DE TRAVAIL : PANNEAU GAUCHE + CANVAS CENTRAL + INSPECTEUR DROIT */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {!narrow && <Sidebar />}

        <div className="flex min-w-0 flex-1 flex-col">
          {narrow && mobileTouchMode ? (
            <MobileTouchEditor onSwitchToCanvas={() => setMobileTouchMode(false)} />
          ) : (
            <Canvas narrow={narrow} />
          )}

          {narrow && !mobileTouchMode && (
            <div className="no-print flex h-14 shrink-0 border-t border-slate-200 bg-white">
              <button
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-signal"
                onClick={() => setMobileTouchMode(true)}
              >
                <Smartphone size={16} />
                <span>Édition rapide</span>
              </button>
              <button
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700"
                onClick={() => setPanel("library")}
              >
                <Layers size={16} />
                <span>Modèles & Ajout</span>
              </button>
              <button
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700"
                onClick={() => setPanel("inspect")}
              >
                <SlidersHorizontal size={16} />
                <span>Propriétés</span>
              </button>
              <button
                type="button"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-slate-700"
                onClick={() => setCloudModalOpen(true)}
              >
                <Cloud size={16} />
                <span>Cloud</span>
              </button>
            </div>
          )}
        </div>

        {!narrow && <Inspector />}
      </div>

      {narrow && panel && (
        <div className="no-print fixed inset-0 z-40 flex bg-slate-900/40 backdrop-blur-2xs" onClick={() => setPanel(null)}>
          <div className="h-full max-w-full" onClick={(event) => event.stopPropagation()}>
            {panel === "library" ? (
              <Sidebar onDone={() => setPanel(null)} />
            ) : (
              <div className="h-full w-80 max-w-[100vw]">
                <Inspector />
              </div>
            )}
          </div>
        </div>
      )}

      {sharedOverlays}
    </div>
  );
}
