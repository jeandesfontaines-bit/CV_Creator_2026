import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Info,
  Palette,
  PenLine,
  Plus,
  Redo2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Undo2,
  Upload,
  User,
} from "lucide-react";
import { DocumentAlertBanner } from "@/components/studio/DocumentAlertBanner";
import { PageSheet } from "@/components/studio/PageSheet";
import { auditDocument, type AuditIssue } from "@/cv/audit";
import { activePage, getStudioUnboundElements, useStudio } from "@/cv/store";
import { TEMPLATES } from "@/cv/templates";
import { COLOR_PALETTES } from "@/cv/palettes";
import { FONTS, PAGE_H, PAGE_W, snippet, TYPE_LABEL } from "@/cv/types";
import { getRandomBoost } from "@/cv/presets";
import { cn } from "@/lib/utils";

const inputStyle =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600";
const textareaStyle =
  "w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none";

function release() {
  useStudio.getState().release();
}

type SectionId = "profile" | "summary" | "experience" | "education" | "skills" | "languages";

export function SimpleEditor() {
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const selectedIds = useStudio((s) => s.selectedIds);
  const select = useStudio((s) => s.select);
  const setActive = useStudio((s) => s.setActive);
  const activeTemplate = useStudio((s) => s.activeTemplate);
  const layoutCustomized = useStudio((s) => s.layoutCustomized);
  const paginationBlocked = useStudio((s) => s.paginationBlocked);
  const saveStatus = useStudio((s) => s.saveStatus);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const setOnboarding = useStudio((s) => s.setOnboarding);
  const setExtractorModalOpen = useStudio((s) => s.setExtractorModalOpen);
  const requestPdfExport = useStudio((s) => s.requestPdfExport);
  const setReadabilityModalOpen = useStudio((s) => s.setReadabilityModalOpen);
  const setPlainTextModalOpen = useStudio((s) => s.setPlainTextModalOpen);
  const setIdentity = useStudio((s) => s.setIdentity);
  const updateExperience = useStudio((s) => s.updateExperience);
  const addExperience = useStudio((s) => s.addExperience);
  const removeExperience = useStudio((s) => s.removeExperience);
  const updateEducation = useStudio((s) => s.updateEducation);
  const addEducation = useStudio((s) => s.addEducation);
  const removeEducation = useStudio((s) => s.removeEducation);
  const updateSkills = useStudio((s) => s.updateSkills);
  const updateLanguages = useStudio((s) => s.updateLanguages);
  const toggleSectionVisibility = useStudio((s) => s.toggleSectionVisibility);
  const moveSection = useStudio((s) => s.moveSection);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);
  const past = useStudio((s) => s.past);
  const future = useStudio((s) => s.future);
  const requestApplyTemplate = useStudio((s) => s.requestApplyTemplate);
  const requestResetLayout = useStudio((s) => s.requestResetLayout);
  const applyPalette = useStudio((s) => s.applyPalette);
  const applyGlobalFont = useStudio((s) => s.applyGlobalFont);
  const notify = useStudio((s) => s.notify);

  const [activeSection, setActiveSection] = useState<SectionId>("experience");
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const page = activePage(doc, activePageId);
  const profile = doc.profile;
  const studioUnbound = doc.pages.flatMap((p) => getStudioUnboundElements(p));
  const currentGlobalFont = page.elements.find((el) => el.style?.fontFamily)?.style.fontFamily || "Source Sans 3";

  const audit = useMemo(
    () => auditDocument(doc, { editorMode: "guided", paginationBlocked }),
    [doc, paginationBlocked],
  );
  const actionableIssueCount = audit.criticalIssues.length + audit.warningIssues.length;

  useEffect(() => {
    const onFocusIssue = (evt: Event) => {
      const custom = evt as CustomEvent<AuditIssue>;
      const targetId = custom.detail?.elementIds?.[0];
      if (!targetId) return;
      const found = doc.pages.flatMap((p) => p.elements).find((e) => e.id === targetId);
      if (!found?.bind) return;
      if (["name", "role", "contact"].includes(found.bind.kind)) setActiveSection("profile");
      else if (found.bind.kind === "summary") setActiveSection("summary");
      else if (found.bind.kind === "experience") setActiveSection("experience");
      else if (found.bind.kind === "education") setActiveSection("education");
      else if (found.bind.kind === "skills") setActiveSection("skills");
      else if (found.bind.kind === "languages") setActiveSection("languages");
    };
    window.addEventListener("cv-focus-issue", onFocusIssue);
    return () => window.removeEventListener("cv-focus-issue", onFocusIssue);
  }, [doc]);

  const sectionsList: { id: SectionId; label: string; icon: typeof User; bindKind?: string }[] = [
    { id: "profile", label: "Profil & Contact", icon: User },
    { id: "summary", label: "Résumé / Bio", icon: Sparkles },
    { id: "experience", label: "Expériences professionnelles", icon: Briefcase },
    { id: "education", label: "Formation & Diplômes", icon: GraduationCap },
    { id: "skills", label: "Compétences", icon: Palette },
    { id: "languages", label: "Langues", icon: Palette },
  ];

  // Check if section is currently visible across pages
  const isSectionVisible = (secId: SectionId) => {
    const matches = (el: any) => {
      if (!el.bind) return false;
      if (secId === "profile" && ["name", "role", "contact"].includes(el.bind.kind)) return true;
      if (secId === "summary" && el.bind.kind === "summary") return true;
      if (secId === "experience" && el.bind.kind === "experience") return true;
      if (secId === "education" && el.bind.kind === "education") return true;
      if (secId === "skills" && el.bind.kind === "skills") return true;
      if (secId === "languages" && el.bind.kind === "languages") return true;
      return false;
    };
    const sectionEls = doc.pages.flatMap((p) => p.elements).filter(matches);
    if (!sectionEls.length) return true;
    return sectionEls.some((el) => !el.hidden);
  };

  const handleBoostSummary = () => {
    const phrase = getRandomBoost();
    const nextSummary = profile.summary ? `${profile.summary} ${phrase}` : phrase;
    setIdentity("summary", nextSummary);
    release();
    notify("✨ Résumé formulé avec succès !");
  };

  const handleBoostExp = (index: number) => {
    const phrase = getRandomBoost();
    const exp = profile.experiences[index];
    if (exp) {
      const curDesc = exp.desc || "";
      const nextDesc = curDesc ? `${curDesc}\n• ${phrase}` : `• ${phrase}`;
      updateExperience(index, { desc: nextDesc }, false);
      notify("✨ Réalisation chiffrée ajoutée au poste !");
    }
  };

  const handleAddAchievement = (index: number) => {
    const exp = profile.experiences[index];
    if (!exp) return;
    const curDesc = exp.desc || "";
    const nextDesc = curDesc ? `${curDesc}\n• Nouvelle réalisation impactante` : `• Nouvelle réalisation impactante`;
    updateExperience(index, { desc: nextDesc }, false);
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-paper text-slate-900 select-none flex-col">
      {/* Header */}
      <header className="no-print flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white px-3 py-2 z-30 shadow-xs sm:px-5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setOnboarding(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs"
            title="Revenir au point de départ"
          >
            <ArrowLeft size={14} />
            <span>Parcours</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 pl-1">
            <span className="font-semibold text-slate-800" data-testid="guided-page-count">
              {doc.pages.length > 1 ? `${doc.pages.length} pages A4` : page.name}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span
              className="inline-flex items-center gap-1 text-slate-500"
              title={lastSavedAt ? `Dernière sauvegarde automatique à ${lastSavedAt}` : "Sauvegarde automatique active"}
            >
              <Check size={13} className="text-emerald-600 shrink-0" />
              <span>{saveStatus === "saving" ? "Sauvegarde…" : "Enregistré"}</span>
            </span>
          </div>

          {/* Undo / Redo buttons */}
          <div className="flex items-center gap-1 border-l border-slate-300 pl-3">
            <button
              type="button"
              onClick={() => undo()}
              disabled={!past.length}
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition shadow-xs"
              title="Annuler (Ctrl+Z)"
            >
              <Undo2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => redo()}
              disabled={!future.length}
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition shadow-xs"
              title="Rétablir (Ctrl+Y)"
            >
              <Redo2 size={14} />
            </button>
          </div>
        </div>

        {/* Mode switch */}
        <div
          role="tablist"
          aria-label="Mode d'édition"
          className="flex items-center rounded-xl bg-slate-100 p-1 shadow-inner border border-slate-300"
        >
          <button
            type="button"
            role="tab"
            aria-selected={true}
            className="flex items-center gap-2 rounded-lg bg-signal px-4 py-1.5 text-xs font-bold text-signal-ink shadow-sm transition"
          >
            <span>Saisie guidée</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={false}
            onClick={() => setEditorMode("pro")}
            className="flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <span>Studio libre</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-testid="guided-import-cv-btn"
            onClick={() => setExtractorModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            title="Importer un CV (PDF, Word, TXT ou LinkedIn)"
          >
            <Upload size={14} />
            <span className="hidden xl:inline">Importer mon CV</span>
            <span className="xl:hidden">Importer</span>
          </button>

          <button
            type="button"
            data-testid="open-plain-text-btn"
            onClick={() => setPlainTextModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            title="Voir ce qu'un ATS lira réellement (Aperçu texte brut)"
          >
            <FileText size={14} />
            <span className="hidden lg:inline">Aperçu texte brut</span>
            <span className="lg:hidden">Texte brut</span>
          </button>

          <button
            type="button"
            data-testid="open-readability-btn"
            onClick={() => setReadabilityModalOpen(true, false)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-semibold transition shadow-xs",
              actionableIssueCount > 0
                ? "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
            )}
            title="Contrôle de lisibilité et de mise en page avant export"
          >
            <ShieldCheck size={14} />
            <span>Contrôle</span>
            {actionableIssueCount > 0 && (
              <span className="ml-0.5 rounded-full bg-amber-600 px-1.5 py-0.2 text-[10px] font-bold text-white">
                {actionableIssueCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowMobilePreview((visible) => !visible)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition md:hidden"
          >
            {showMobilePreview ? <PenLine size={14} /> : <Eye size={14} />}
            <span>{showMobilePreview ? "Modifier" : "Aperçu"}</span>
          </button>
          <button
            type="button"
            data-testid="export-pdf-btn"
            onClick={() => requestPdfExport()}
            className="flex items-center gap-2 rounded-lg bg-signal px-4 py-2 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-sm"
          >
            <Download size={14} />
            <span>Télécharger mon CV (PDF)</span>
          </button>
        </div>
      </header>

      {/* Real-time Document Alert Banner */}
      <DocumentAlertBanner />

      {/* 3-Column Layout: Left (Sections & Order), Center (Live CV Preview), Right (Selected Section Form) */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden md:flex-row">
        {/* LEFT COLUMN: SECTIONS LIST & REORDER */}
        <div
          data-testid="guided-sections-sidebar"
          className={`${showMobilePreview ? "hidden" : "flex"} w-full min-h-0 min-w-0 flex-1 flex-col bg-slate-50/90 border-r border-slate-200 shadow-sm z-10 md:flex md:w-[280px] md:flex-none`}
        >
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Sections du CV</h3>
            <span className="text-[11px] font-medium text-slate-400">{sectionsList.length} sections</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3 space-y-2">
            {sectionsList.map((sec, index) => {
              const Icon = sec.icon;
              const visible = isSectionVisible(sec.id);
              const isSelected = activeSection === sec.id;

              return (
                <div
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={cn(
                    "group flex items-center justify-between rounded-xl border p-3 text-xs font-semibold transition cursor-pointer shadow-2xs",
                    isSelected
                      ? "border-blue-600 bg-white text-blue-700 shadow-xs ring-1 ring-blue-600/20"
                      : "border-slate-200 bg-white/70 text-slate-700 hover:bg-white hover:border-slate-300",
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon size={15} className={isSelected ? "text-blue-600 shrink-0" : "text-slate-400 shrink-0"} />
                    <span className="truncate">{sec.label}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                    {/* Hide / Show toggle */}
                    <button
                      type="button"
                      onClick={() => toggleSectionVisibility(sec.id)}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-lg transition",
                        visible ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900" : "text-amber-600 bg-amber-50 hover:bg-amber-100",
                      )}
                      title={visible ? "Masquer la section sur le CV" : "Afficher la section sur le CV"}
                    >
                      {visible ? <Eye size={13} /> : <EyeOff size={13} />}
                    </button>

                    {/* Move Up */}
                    <button
                      type="button"
                      onClick={() => moveSection(sec.id, "up")}
                      disabled={index === 0}
                      className="flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 transition"
                      title="Monter la section"
                    >
                      <ChevronUp size={13} />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      onClick={() => moveSection(sec.id, "down")}
                      disabled={index === sectionsList.length - 1}
                      className="flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 transition"
                      title="Descendre la section"
                    >
                      <ChevronDown size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-200 bg-white shrink-0 space-y-2">
            <button
              type="button"
              onClick={() => {
                setActiveSection("experience");
                addExperience();
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition shadow-2xs"
            >
              <Plus size={14} />
              <span>Ajouter une expérience</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSection("education");
                addEducation();
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition shadow-2xs"
            >
              <Plus size={14} />
              <span>Ajouter une formation</span>
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: LIVE CV PREVIEW */}
        <div
          className={`${showMobilePreview ? "flex" : "hidden"} md:flex min-h-0 flex-1 flex-col bg-slate-200/60 overflow-hidden relative`}
        >
          {/* Customization Banner */}
          {layoutCustomized && (
            <div className="px-4 pt-3 z-20 shrink-0 no-print">
              <div className="rounded-xl border border-blue-200 bg-blue-50/95 px-4 py-2 text-xs text-blue-900 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Info size={15} className="shrink-0 text-blue-600" />
                  <span>Mise en page personnalisée du Studio active. Les textes modifiés ici se mettent à jour en direct.</span>
                </div>
                <button
                  type="button"
                  onClick={() => requestResetLayout()}
                  className="shrink-0 inline-flex items-center gap-1 rounded-md border border-blue-300 bg-white px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 transition"
                >
                  <RotateCcw size={11} />
                  <span>Réinitialiser</span>
                </button>
              </div>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-auto p-6 md:p-10 flex flex-col items-center">
            <div
              className="simple-preview-sheet flex flex-col items-center gap-8 transition-all origin-top scale-[0.72] sm:scale-[0.80] md:scale-[0.85] lg:scale-[0.90]"
              style={{ width: PAGE_W, transformOrigin: "top center" }}
            >
              {doc.pages.map((p, pageIdx) => (
                <div
                  key={p.id}
                  data-testid={`guided-page-${pageIdx + 1}`}
                  className="flex flex-col items-center gap-2"
                >
                  {doc.pages.length > 1 && (
                    <div className="w-full flex items-center justify-between px-1 text-xs font-bold text-slate-600">
                      <span>
                        Page {pageIdx + 1} sur {doc.pages.length} — Format A4 (1123 px)
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">{p.name}</span>
                    </div>
                  )}
                  <div
                    className="simple-preview-frame bg-white shadow-2xl rounded-sm relative"
                    style={{ width: PAGE_W, height: PAGE_H }}
                    onClick={(e) => {
                      const target = (e.target as HTMLElement | null)?.closest?.("[data-element]") as HTMLElement | null;
                      const elId = target?.getAttribute("data-element");
                      setActive(p.id);
                      if (!elId) return;
                      select([elId]);
                      const clickedEl = p.elements.find((item) => item.id === elId);
                      if (!clickedEl?.bind) return;
                      if (["name", "role", "contact"].includes(clickedEl.bind.kind)) setActiveSection("profile");
                      else if (clickedEl.bind.kind === "summary") setActiveSection("summary");
                      else if (clickedEl.bind.kind === "experience") setActiveSection("experience");
                      else if (clickedEl.bind.kind === "education") setActiveSection("education");
                      else if (clickedEl.bind.kind === "skills") setActiveSection("skills");
                      else if (clickedEl.bind.kind === "languages") setActiveSection("languages");
                    }}
                  >
                    <PageSheet
                      page={p}
                      interactive={false}
                      selectedIds={selectedIds}
                      editingId={null}
                      showGrid={false}
                      showMargins={false}
                      guides={{ x: [], y: [] }}
                      marquee={null}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FIELDS OF SELECTED SECTION */}
        <div
          className={`${showMobilePreview ? "hidden" : "flex"} w-full min-h-0 min-w-0 flex-1 flex-col bg-white border-l border-slate-200 shadow-sm z-10 md:flex md:w-[420px] md:flex-none`}
        >
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {sectionsList.find((s) => s.id === activeSection)?.label ?? "Édition"}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Mise à jour en direct</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-6">
            {activeSection === "profile" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Profil & Contact</h3>
                  <p className="text-[11px] text-slate-500">Ces informations apparaissent en haut de votre CV.</p>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Nom & Prénom</span>
                    <input
                      className={cn(inputStyle, "mt-1")}
                      value={profile.name}
                      onChange={(e) => setIdentity("name", e.target.value)}
                      onBlur={release}
                      placeholder="Ex: Alexandra Dubois"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Intitulé du poste recherché</span>
                    <input
                      className={cn(inputStyle, "mt-1")}
                      value={profile.role}
                      onChange={(e) => setIdentity("role", e.target.value)}
                      onBlur={release}
                      placeholder="Ex: Product Designer Senior"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Adresse e-mail</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.email}
                        onChange={(e) => setIdentity("email", e.target.value)}
                        onBlur={release}
                        placeholder="alexandra@email.com"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Téléphone</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.phone}
                        onChange={(e) => setIdentity("phone", e.target.value)}
                        onBlur={release}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Ville / Localisation</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.location}
                        onChange={(e) => setIdentity("location", e.target.value)}
                        onBlur={release}
                        placeholder="Paris, France"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Lien (LinkedIn / Portfolio)</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.link}
                        onChange={(e) => setIdentity("link", e.target.value)}
                        onBlur={release}
                        placeholder="linkedin.com/in/nom"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "summary" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Résumé de profil / Bio</h3>
                  <button
                    type="button"
                    onClick={handleBoostSummary}
                    className="flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-500/25 transition"
                  >
                    <Sparkles size={11} />
                    <span>✨ Formuler comme un pro</span>
                  </button>
                </div>
                <textarea
                  className={cn(textareaStyle, "h-40")}
                  value={profile.summary}
                  onChange={(e) => setIdentity("summary", e.target.value)}
                  onBlur={release}
                  placeholder="Présentation synthétique de votre parcours..."
                />
              </div>
            )}

            {activeSection === "experience" && (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Expériences professionnelles</h3>
                    <p className="text-[11px] text-slate-500">Ajoutez et détaillez vos réalisations.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addExperience()}
                    className="flex items-center gap-1 rounded-lg bg-signal px-3 py-1.5 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-xs"
                  >
                    <span>+ Ajouter un poste</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {profile.experiences.map((exp, index) => (
                    <div
                      key={index}
                      data-testid={`guided-experience-${index}`}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Poste #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold"
                        >
                          <Trash2 size={12} />
                          <span>Supprimer</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">Intitulé du poste</span>
                          <input
                            className={inputStyle}
                            value={exp.role}
                            onChange={(e) => updateExperience(index, { role: e.target.value })}
                            onBlur={release}
                            placeholder="Intitulé du poste"
                          />
                        </label>
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">Entreprise — Ville</span>
                          <input
                            className={inputStyle}
                            value={exp.company}
                            onChange={(e) => updateExperience(index, { company: e.target.value })}
                            onBlur={release}
                            placeholder="Entreprise — Ville"
                          />
                        </label>
                      </div>

                      <label className="block space-y-1">
                        <span className="text-[11px] font-semibold text-slate-700">Période</span>
                        <input
                          className={inputStyle}
                          value={exp.date}
                          onChange={(e) => updateExperience(index, { date: e.target.value })}
                          onBlur={release}
                          placeholder="Ex: 2021 — Présent"
                        />
                      </label>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`exp-desc-${index}`} className="text-[11px] font-semibold text-slate-700">
                            Missions & Réalisations (puces)
                          </label>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleAddAchievement(index)}
                              className="flex items-center gap-1 rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-800 hover:bg-blue-500/25 transition"
                            >
                              <Plus size={11} />
                              <span>Ajouter une réalisation</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBoostExp(index)}
                              className="flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-500/25 transition"
                            >
                              <Sparkles size={11} />
                              <span>✨ Pro</span>
                            </button>
                          </div>
                        </div>
                        <textarea
                          id={`exp-desc-${index}`}
                          className={cn(textareaStyle, "h-32")}
                          value={exp.desc}
                          onChange={(e) => updateExperience(index, { desc: e.target.value })}
                          onBlur={release}
                          placeholder="• Réalisation 1&#10;• Réalisation 2..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "education" && (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Formation & Diplômes</h3>
                    <p className="text-[11px] text-slate-500">Ajoutez vos cursus académiques.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addEducation()}
                    className="flex items-center gap-1 rounded-lg bg-signal px-3 py-1.5 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-xs"
                  >
                    <span>+ Ajouter une formation</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {profile.educations.map((edu, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Formation #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold"
                        >
                          <Trash2 size={12} />
                          <span>Supprimer</span>
                        </button>
                      </div>

                      <label className="block space-y-1">
                        <span className="text-[11px] font-semibold text-slate-700">Diplôme</span>
                        <input
                          className={inputStyle}
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, { degree: e.target.value })}
                          onBlur={release}
                          placeholder="Diplôme (ex: Master Informatique)"
                        />
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">École / Université</span>
                          <input
                            className={inputStyle}
                            value={edu.school}
                            onChange={(e) => updateEducation(index, { school: e.target.value })}
                            onBlur={release}
                            placeholder="École / Université"
                          />
                        </label>
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">Période / Année</span>
                          <input
                            className={inputStyle}
                            value={edu.date}
                            onChange={(e) => updateEducation(index, { date: e.target.value })}
                            onBlur={release}
                            placeholder="Ex: 2020 — 2023"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "skills" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Compétences clés</h3>
                  <p className="text-[11px] text-slate-500">Séparez vos compétences par des virgules ou des retours à la ligne.</p>
                </div>
                <textarea
                  className={cn(textareaStyle, "h-36")}
                  value={profile.skills.join(", ")}
                  onChange={(e) => {
                    const items = e.target.value
                      .split(/[,;\n]+/)
                      .map((s) => s.trim())
                      .filter(Boolean);
                    updateSkills(items, false);
                  }}
                  onBlur={release}
                  placeholder="Figma, Design system, React, TypeScript..."
                />
              </div>
            )}

            {activeSection === "languages" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Langues & Niveaux (%)</h3>
                  <button
                    type="button"
                    onClick={() => {
                      updateLanguages([...profile.languages, { label: "Nouvelle langue", value: 75 }], false);
                    }}
                    className="flex items-center gap-1 rounded-md bg-signal/15 px-2.5 py-1 text-xs font-bold text-signal hover:bg-signal/25 transition"
                  >
                    <Plus size={12} />
                    <span>Ajouter une langue</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <input
                        className={cn(inputStyle, "flex-1 h-9")}
                        value={lang.label}
                        onChange={(e) => {
                          const next = [...profile.languages];
                          next[index] = { ...lang, label: e.target.value };
                          updateLanguages(next, false);
                        }}
                        onBlur={release}
                        placeholder="Langue"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className={cn(inputStyle, "w-20 h-9 text-center")}
                        value={lang.value}
                        onChange={(e) => {
                          const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                          const next = [...profile.languages];
                          next[index] = { ...lang, value: val };
                          updateLanguages(next, false);
                        }}
                        onBlur={release}
                      />
                      <span className="text-xs text-slate-500">%</span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = profile.languages.filter((_, i) => i !== index);
                          updateLanguages(next, false);
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 transition"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
