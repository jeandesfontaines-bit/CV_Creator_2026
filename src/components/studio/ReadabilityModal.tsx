import { useMemo } from "react";
import { auditDocument, type AuditIssue } from "@/cv/audit";
import { useStudio } from "@/cv/store";

export function ReadabilityModal() {
  const open = useStudio((s) => s.readabilityModalOpen);
  const pendingExportConfirm = useStudio((s) => s.pendingExportConfirm);
  const doc = useStudio((s) => s.doc);
  const editorMode = useStudio((s) => s.editorMode);
  const paginationBlocked = useStudio((s) => s.paginationBlocked);
  const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);
  const focusAuditIssue = useStudio((s) => s.focusAuditIssue);
  const paginateDocument = useStudio((s) => s.paginateDocument);
  const compactSpacing = useStudio((s) => s.compactSpacing);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const deletePage = useStudio((s) => s.deletePage);
  const directPdfExport = useStudio((s) => s.directPdfExport);

  const audit = useMemo(
    () => auditDocument(doc, { editorMode, paginationBlocked }),
    [doc, editorMode, paginationBlocked],
  );

  if (!open) return null;

  const actionableIssues = audit.issues.filter((i) => i.severity === "critical" || i.severity === "warning");
  const infoIssues = audit.issues.filter((i) => i.severity === "info");

  const handleViewBlock = (issue: AuditIssue) => {
    setReadabilityModalOpen(false);
    focusAuditIssue(issue);
  };

  const handleAdjustInStudio = (issue: AuditIssue) => {
    setReadabilityModalOpen(false);
    setEditorMode("pro");
    focusAuditIssue(issue);
  };

  return (
    <div
      data-testid="readability-modal"
      className="fixed inset-0 z-[190] bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      onClick={() => setReadabilityModalOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#fbf8f2] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[86vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-[#f6f3ec] flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4f1f]" />
              <h2 className="text-base font-bold tracking-tight">Contrôle avant export</h2>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {pendingExportConfirm
                ? "Des alertes de mise en page ont été détectées avant la génération du PDF."
                : "Vérification de la pagination A4, des débordements et de la lisibilité de votre CV."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setReadabilityModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold cursor-pointer"
            title="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {actionableIssues.length === 0 ? (
            <div
              data-testid="readability-clean-state"
              className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3.5"
            >
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                ✓
              </span>
              <div>
                <h3 className="text-sm font-bold">Aucun problème de débordement ni de lisibilité détecté</h3>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Toutes vos pages respectent le format A4 (1123 px), aucun texte n’est coupé ou en chevauchement, et les tailles de police ainsi que les contrastes sont conformes.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-xs font-semibold text-stone-700">
                {actionableIssues.length === 1
                  ? "1 alerte détectée :"
                  : `${actionableIssues.length} alertes détectées :`}
              </div>

              <div className="space-y-3">
                {actionableIssues.map((issue) => {
                  const isCrit = issue.severity === "critical";
                  return (
                    <div
                      key={issue.id}
                      data-testid={`readability-issue-${issue.kind}`}
                      className={`p-4 rounded-xl border ${
                        isCrit
                          ? "bg-red-50/75 border-red-200 text-red-950"
                          : "bg-amber-50/75 border-amber-200 text-amber-950"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                isCrit ? "bg-red-600 text-white" : "bg-amber-600 text-white"
                              }`}
                            >
                              {isCrit ? "Critique" : "Lisibilité"}
                            </span>
                            <span className="text-[11px] font-semibold opacity-75">
                              Page {issue.pageNumber}
                            </span>
                          </div>
                          <p className="text-sm font-bold leading-snug">• {issue.message}</p>
                          {issue.detail && (
                            <p className="text-xs opacity-80 leading-relaxed">{issue.detail}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-current/10 flex flex-wrap items-center gap-2">
                        {issue.elementIds.length > 0 && (
                          <button
                            type="button"
                            data-testid="readability-view-block-btn"
                            onClick={() => handleViewBlock(issue)}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer"
                          >
                            {issue.elementIds.length > 1 ? "Voir les blocs" : "Voir le bloc"}
                          </button>
                        )}

                        {issue.actions.includes("paginate") && (
                          <button
                            type="button"
                            data-testid="readability-paginate-btn"
                            onClick={() => paginateDocument()}
                            className="px-2.5 py-1 rounded-md text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition cursor-pointer"
                          >
                            Répartir sur les pages suivantes
                          </button>
                        )}

                        {issue.actions.includes("compact-spacing") && (
                          <button
                            type="button"
                            data-testid="readability-compact-btn"
                            onClick={() => compactSpacing(issue.pageId)}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer"
                          >
                            Réduire l’espacement
                          </button>
                        )}

                        {issue.actions.includes("delete-empty-page") && doc.pages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deletePage(issue.pageId)}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer"
                          >
                            Supprimer la page vide
                          </button>
                        )}

                        {issue.actions.includes("adjust-studio") && (
                          <button
                            type="button"
                            data-testid="readability-adjust-studio-btn"
                            onClick={() => handleAdjustInStudio(issue)}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer"
                          >
                            { issue.kind === "overlap" ? "Ajuster dans le Studio" : "Ajuster manuellement" }
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {infoIssues.map((info) => (
            <div
              key={info.id}
              className="p-3.5 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 text-xs flex flex-wrap items-center justify-between gap-2"
            >
              <span>{info.message}</span>
              <button
                type="button"
                onClick={() => handleAdjustInStudio(info)}
                className="px-2.5 py-1 rounded-md font-semibold bg-white border border-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                Ouvrir le Studio
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            data-testid="readability-fix-before-export-btn"
            onClick={() => {
              setReadabilityModalOpen(false);
              if (actionableIssues[0]) {
                focusAuditIssue(actionableIssues[0]);
              }
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 transition cursor-pointer"
          >
            Corriger avant l’export
          </button>

          <button
            type="button"
            data-testid="readability-export-anyway-btn"
            onClick={() => {
              setReadabilityModalOpen(false);
              directPdfExport();
            }}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-[#ff4f1f] text-white hover:bg-[#e54215] transition shadow-xs cursor-pointer"
          >
            {actionableIssues.length > 0 ? "Exporter quand même" : "Exporter en PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
