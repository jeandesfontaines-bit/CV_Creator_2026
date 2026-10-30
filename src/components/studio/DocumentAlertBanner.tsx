import { useMemo } from "react";
import { auditDocument } from "@/cv/audit";
import { useStudio } from "@/cv/store";

export function DocumentAlertBanner() {
  const doc = useStudio((s) => s.doc);
  const editorMode = useStudio((s) => s.editorMode);
  const paginationBlocked = useStudio((s) => s.paginationBlocked);
  const focusAuditIssue = useStudio((s) => s.focusAuditIssue);
  const paginateDocument = useStudio((s) => s.paginateDocument);
  const compactSpacing = useStudio((s) => s.compactSpacing);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const deletePage = useStudio((s) => s.deletePage);
  const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);

  const audit = useMemo(
    () => auditDocument(doc, { editorMode, paginationBlocked }),
    [doc, editorMode, paginationBlocked],
  );

  const issue = audit.primaryBannerIssue;
  if (!issue) return null;

  const isCritical = issue.severity === "critical";
  const isWarning = issue.severity === "warning";

  const containerStyle = isCritical
    ? "bg-red-50/95 border-red-300 text-red-950"
    : isWarning
      ? "bg-amber-50/95 border-amber-300 text-amber-950"
      : "bg-stone-100/95 border-stone-300 text-stone-900";

  const badgeStyle = isCritical
    ? "bg-red-600 text-white"
    : isWarning
      ? "bg-amber-600 text-white"
      : "bg-stone-800 text-white";

  return (
    <div
      data-testid="document-alert-banner"
      data-issue-kind={issue.kind}
      className={`no-print border-b px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 transition-colors shrink-0 ${containerStyle}`}
    >
      <button
        type="button"
        onClick={() => focusAuditIssue(issue)}
        data-testid="document-alert-focus-btn"
        title="Cliquer pour centrer et sélectionner le bloc concerné"
        className="flex items-center gap-2.5 text-left group min-w-0 flex-1 cursor-pointer"
      >
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${badgeStyle}`}>
          {isCritical ? "Alerte" : isWarning ? "Attention" : "Info Studio"}
        </span>
        <div className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <span className="text-xs font-bold group-hover:underline">
            {issue.bannerTitle}
          </span>
          <span className="text-xs opacity-85 truncate">
            {issue.message}
          </span>
        </div>
        {issue.elementIds.length > 0 && (
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold underline opacity-75 group-hover:opacity-100 shrink-0">
            Voir le bloc →
          </span>
        )}
      </button>

      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
        {issue.actions.includes("paginate") && (
          <button
            type="button"
            data-testid="banner-action-paginate"
            onClick={() => paginateDocument()}
            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs cursor-pointer"
          >
            Répartir sur les pages suivantes
          </button>
        )}

        {issue.actions.includes("compact-spacing") && (
          <button
            type="button"
            data-testid="banner-action-compact"
            onClick={() => compactSpacing(issue.pageId)}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer"
          >
            Réduire l’espacement
          </button>
        )}

        {issue.actions.includes("delete-empty-page") && doc.pages.length > 1 && (
          <button
            type="button"
            data-testid="banner-action-delete-page"
            onClick={() => deletePage(issue.pageId)}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer"
          >
            Supprimer la page vide
          </button>
        )}

        {issue.actions.includes("adjust-studio") && editorMode !== "pro" && (
          <button
            type="button"
            data-testid="banner-action-studio"
            onClick={() => {
              setEditorMode("pro");
              focusAuditIssue(issue);
            }}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer"
          >
            Ajuster manuellement dans le Studio
          </button>
        )}

        {issue.actions.includes("adjust-studio") && editorMode === "pro" && (
          <button
            type="button"
            data-testid="banner-action-focus-studio"
            onClick={() => focusAuditIssue(issue)}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer"
          >
            Ajuster manuellement dans le Studio
          </button>
        )}

        {issue.actions.includes("switch-guided") && editorMode === "pro" && (
          <button
            type="button"
            data-testid="banner-action-guided"
            onClick={() => setEditorMode("guided")}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 border border-current/20 hover:bg-white transition cursor-pointer"
          >
            Revenir au Mode Guidé
          </button>
        )}

        {audit.issues.length > 1 && (
          <button
            type="button"
            data-testid="banner-open-readability"
            onClick={() => setReadabilityModalOpen(true, false)}
            className="px-2 py-1 rounded-md text-[11px] font-semibold underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            Toutes les alertes ({audit.issues.length})
          </button>
        )}
      </div>
    </div>
  );
}
