import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Compass,
  Download,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  Palette,
  PenLine,
  Plus,
  Redo2,
  RotateCcw,
  ShieldCheck,
  SkipForward,
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
import { FONTS, PAGE_H, PAGE_W } from "@/cv/types";
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

interface StepGuidance {
  id: SectionId;
  stepNumber: number;
  label: string;
  shortLabel: string;
  icon: typeof User;
  whatToFill: string;
  whyUseful: string;
  whatCanBeIgnored: string;
  optionalBadge?: string;
}

const GUIDED_STEPS: StepGuidance[] = [
  {
    id: "profile",
    stepNumber: 1,
    label: "Profil & Contact",
    shortLabel: "1. Contact",
    icon: User,
    whatToFill: "Indiquez votre nom, le titre du poste visé et un moyen de vous joindre directement.",
    whyUseful:
      "C'est le premier repère lu par le recruteur et les logiciels ATS pour identifier votre cible professionnelle en 3 secondes.",
    whatCanBeIgnored:
      "L'adresse postale complète et le lien LinkedIn/Portfolio sont facultatifs : une ville et un e-mail suffisent.",
  },
  {
    id: "summary",
    stepNumber: 2,
    label: "Résumé / Bio",
    shortLabel: "2. Accroche",
    icon: Sparkles,
    whatToFill: "Rédigez 2 à 3 phrases résumant votre spécialité, votre niveau d'expérience et votre valeur ajoutée.",
    whyUseful:
      "Donne immédiatement le fil conducteur de votre candidature avant même la lecture détaillée des expériences.",
    whatCanBeIgnored:
      "Si vos expériences parlent d'elles-mêmes, vous pouvez passer cette étape ou masquer la rubrique sans pénalité.",
    optionalBadge: "Optionnel",
  },
  {
    id: "experience",
    stepNumber: 3,
    label: "Expériences professionnelles",
    shortLabel: "3. Expériences",
    icon: Briefcase,
    whatToFill: "Saisissez vos postes les plus pertinents en privilégiant 2 à 4 réalisations concrètes par poste.",
    whyUseful:
      "C'est le cœur de décision du recruteur : les actions concrètes et résultats mesurables prouvent votre impact réel.",
    whatCanBeIgnored:
      "Inutile de lister chaque tâche quotidienne ou les jobs très anciens sans rapport avec le poste visé.",
  },
  {
    id: "education",
    stepNumber: 4,
    label: "Formation & Diplômes",
    shortLabel: "4. Formation",
    icon: GraduationCap,
    whatToFill: "Mentionnez votre diplôme principal ou vos certifications les plus récentes.",
    whyUseful:
      "Valide votre socle académique ou vos qualifications réglementaires auprès des RH.",
    whatCanBeIgnored:
      "Avec plus de 5 ans d'expérience, inutile de détailler les diplômes secondaires ou les mentions anciennes.",
  },
  {
    id: "skills",
    stepNumber: 5,
    label: "Compétences",
    shortLabel: "5. Compétences",
    icon: Palette,
    whatToFill: "Listez 6 à 10 compétences clés (outils, méthodes, technologies) séparées par des virgules.",
    whyUseful:
      "Permet aux recruteurs et aux filtres ATS de repérer instantanément les mots-clés techniques attendus sur l'offre.",
    whatCanBeIgnored:
      "Évitez les listes génériques (« motivé, dynamique ») ou les outils bureautiques évidents.",
  },
  {
    id: "languages",
    stepNumber: 6,
    label: "Langues",
    shortLabel: "6. Langues",
    icon: Compass,
    whatToFill: "Ajoutez uniquement les langues utiles dans votre contexte professionnel et estimez votre aisance.",
    whyUseful:
      "Indispensable pour les postes en environnement international, technique ou au contact de clients étrangers.",
    whatCanBeIgnored:
      "Si la maîtrise d'une langue étrangère n'est pas demandée dans votre secteur, vous pouvez masquer cette section.",
    optionalBadge: "Optionnel",
  },
];

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
  const [showStructureDrawer, setShowStructureDrawer] = useState(false);
  const [showAppearanceBar, setShowAppearanceBar] = useState(false);

  const page = activePage(doc, activePageId);
  const profile = doc.profile;
  const studioUnbound = doc.pages.flatMap((p) => getStudioUnboundElements(p));
  const currentGlobalFont =
    page.elements.find((el) => el.style?.fontFamily)?.style.fontFamily || "Source Sans 3";

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

  // Evaluate whether a step has meaningful content
  const isStepCompleted = (secId: SectionId): boolean => {
    if (!isSectionVisible(secId)) return false;
    switch (secId) {
      case "profile":
        return Boolean(profile.name.trim() && (profile.role.trim() || profile.email.trim()));
      case "summary":
        return Boolean(profile.summary.trim().length > 15);
      case "experience":
        return profile.experiences.some((e) => Boolean(e.role.trim() || e.company.trim()));
      case "education":
        return profile.educations.some((e) => Boolean(e.degree.trim() || e.school.trim()));
      case "skills":
        return profile.skills.length > 0;
      case "languages":
        return profile.languages.length > 0;
    }
  };

  const currentStepIndex = GUIDED_STEPS.findIndex((s) => s.id === activeSection);
  const currentStep = GUIDED_STEPS[currentStepIndex] ?? GUIDED_STEPS[0];
  const prevStep = currentStepIndex > 0 ? GUIDED_STEPS[currentStepIndex - 1] : null;
  const nextStep =
    currentStepIndex < GUIDED_STEPS.length - 1 ? GUIDED_STEPS[currentStepIndex + 1] : null;
  const completedCount = GUIDED_STEPS.filter((s) => isStepCompleted(s.id)).length;

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
    const nextDesc = curDesc
      ? `${curDesc}\n• Nouvelle réalisation impactante`
      : `• Nouvelle réalisation impactante`;
    updateExperience(index, { desc: nextDesc }, false);
  };

  const handleSkipCurrentStep = () => {
    if (nextStep) {
      setActiveSection(nextStep.id);
      notify(`Étape « ${currentStep.label} » passée — vous pourrez y revenir à tout moment.`);
    } else {
      setActiveSection("profile");
    }
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
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span
              className="inline-flex items-center gap-1 text-slate-500"
              title={
                lastSavedAt
                  ? `Dernière sauvegarde automatique à ${lastSavedAt}`
                  : "Sauvegarde automatique active"
              }
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

      {/* 2-ZONE ACCOMPANIED LAYOUT: Left (Guided Step Companion) + Right (Live Interactive A4 CV) */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden md:flex-row">
        {/* ZONE 1: ACCOMPANIED GUIDED COMPANION */}
        <aside
          data-testid="guided-sections-sidebar"
          aria-label="Parcours guidé étape par étape"
          className={cn(
            showMobilePreview ? "hidden" : "flex",
            "w-full min-h-0 min-w-0 flex-1 flex-col bg-white border-r border-slate-200 shadow-sm z-10 md:flex md:w-[500px] lg:w-[560px] xl:w-[600px] md:flex-none",
          )}
        >
          {/* STEPPER BAR + SECTION STRUCTURE CONTROLS */}
          <div className="border-b border-slate-200 bg-slate-50/90 px-4 py-3 shrink-0 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  data-testid="guided-step-indicator"
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs"
                >
                  Étape {currentStep.stepNumber} sur {GUIDED_STEPS.length}
                </span>
                <span className="text-xs font-bold text-slate-800">{currentStep.label}</span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  ({completedCount}/{GUIDED_STEPS.length} rubriques complétées)
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  data-testid="toggle-structure-drawer-btn"
                  onClick={() => setShowStructureDrawer((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition",
                    showStructureDrawer
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100",
                  )}
                  title="Organiser l'ordre ou masquer des rubriques du CV"
                >
                  <Layers size={12} />
                  <span>Gérer les sections</span>
                </button>
              </div>
            </div>

            {/* Horizontal non-blocking step pills + inline section controls */}
            <div
              role="navigation"
              aria-label="Étapes du parcours guidé"
              className="grid grid-cols-2 sm:grid-cols-3 gap-1.5"
            >
              {GUIDED_STEPS.map((sec, index) => {
                const visible = isSectionVisible(sec.id);
                const completed = isStepCompleted(sec.id);
                const isSelected = activeSection === sec.id;

                return (
                  <div
                    key={sec.id}
                    data-testid={`guided-step-tab-${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={cn(
                      "group flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer",
                      isSelected
                        ? "border-blue-600 bg-white text-blue-700 shadow-2xs ring-1 ring-blue-600/20"
                        : visible
                          ? "border-slate-200 bg-white/80 text-slate-700 hover:bg-white hover:border-slate-300"
                          : "border-dashed border-slate-200 bg-slate-100/60 text-slate-400 hover:bg-white",
                    )}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {!visible ? (
                        <EyeOff size={12} className="text-amber-600 shrink-0" />
                      ) : completed ? (
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      ) : (
                        <Circle
                          size={12}
                          className={isSelected ? "text-blue-600 shrink-0" : "text-slate-300 shrink-0"}
                        />
                      )}
                      <span className="truncate text-[11px]" title={sec.label}>
                        {sec.label}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-0.5 shrink-0",
                        showStructureDrawer ? "opacity-100" : "opacity-75 group-hover:opacity-100",
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSectionVisibility(sec.id)}
                        className={cn(
                          "flex size-5 items-center justify-center rounded transition",
                          visible
                            ? "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            : "text-amber-600 bg-amber-50 hover:bg-amber-100",
                        )}
                        title={
                          visible
                            ? "Masquer la section sur le CV"
                            : "Afficher la section sur le CV"
                        }
                      >
                        {visible ? <Eye size={11} /> : <EyeOff size={11} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(sec.id, "up")}
                        disabled={index === 0}
                        className="flex size-5 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 transition"
                        title="Monter la section"
                      >
                        <ChevronUp size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(sec.id, "down")}
                        disabled={index === GUIDED_STEPS.length - 1}
                        className="flex size-5 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 transition"
                        title="Descendre la section"
                      >
                        <ChevronDown size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick add shortcuts */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("experience");
                    addExperience();
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                >
                  <Plus size={12} />
                  <span>Ajouter une expérience</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection("education");
                    addEducation();
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                >
                  <Plus size={12} />
                  <span>Ajouter une formation</span>
                </button>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Parcours libre et non bloquant
              </span>
            </div>
          </div>

          {/* SCROLLABLE STEP WORKSPACE */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5 space-y-5">
            {/* ACCOMPANIED COACHING CARD: Answers the 4 core UX questions */}
            <div
              data-testid="guided-step-coaching"
              className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-white to-slate-50 p-4 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                      Quoi remplir maintenant
                    </span>
                    {currentStep.optionalBadge && (
                      <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                        {currentStep.optionalBadge}
                      </span>
                    )}
                    {!isSectionVisible(currentStep.id) && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        Section masquée sur le CV
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {currentStep.whatToFill}
                  </p>
                </div>

                {!isSectionVisible(currentStep.id) ? (
                  <button
                    type="button"
                    onClick={() => toggleSectionVisibility(currentStep.id)}
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-amber-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-amber-700 transition"
                  >
                    <Eye size={13} />
                    <span>Réafficher sur le CV</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleSectionVisibility(currentStep.id)}
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition"
                    title="Masquer cette rubrique sans perdre vos textes"
                  >
                    <EyeOff size={12} />
                    <span>Masquer cette rubrique</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-blue-100/80 text-xs">
                <div className="rounded-xl bg-white/90 border border-slate-200/70 p-2.5 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 text-[11px]">
                    <HelpCircle size={12} className="text-blue-600 shrink-0" />
                    <span>Pourquoi c'est utile</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {currentStep.whyUseful}
                  </p>
                </div>

                <div className="rounded-xl bg-white/90 border border-slate-200/70 p-2.5 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 text-[11px]">
                    <SkipForward size={12} className="text-slate-500 shrink-0" />
                    <span>Ce que vous pouvez ignorer</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {currentStep.whatCanBeIgnored}
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 1: PROFILE & CONTACT */}
            {activeSection === "profile" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-3">
                  <label className="block">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">Nom & Prénom</span>
                      <span className="text-[11px] text-blue-600 font-medium">Essentiel</span>
                    </div>
                    <input
                      className={cn(inputStyle, "mt-1")}
                      value={profile.name}
                      onChange={(e) => setIdentity("name", e.target.value)}
                      onBlur={release}
                      placeholder="Ex: Alexandra Dubois"
                    />
                  </label>

                  <label className="block">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">
                        Intitulé du poste recherché
                      </span>
                      <span className="text-[11px] text-blue-600 font-medium">Recommandé</span>
                    </div>
                    <input
                      className={cn(inputStyle, "mt-1")}
                      value={profile.role}
                      onChange={(e) => setIdentity("role", e.target.value)}
                      onBlur={release}
                      placeholder="Ex: Product Designer Senior"
                    />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">
                          Ville / Localisation
                        </span>
                        <span className="text-[10px] text-slate-400">Optionnel</span>
                      </div>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.location}
                        onChange={(e) => setIdentity("location", e.target.value)}
                        onBlur={release}
                        placeholder="Paris, France"
                      />
                    </label>
                    <label className="block">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">
                          Lien (LinkedIn / Portfolio)
                        </span>
                        <span className="text-[10px] text-slate-400">Optionnel</span>
                      </div>
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

            {/* STEP 2: SUMMARY / BIO */}
            {activeSection === "summary" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Votre accroche en quelques lignes
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      2 à 3 phrases suffisent. Vous pouvez aussi laisser vide ou utiliser une formulation type.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleBoostSummary}
                    className="flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-500/25 transition shrink-0"
                  >
                    <Sparkles size={12} />
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

            {/* STEP 3: EXPERIENCES */}
            {activeSection === "experience" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Vos expériences ({profile.experiences.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Commencez par le poste le plus récent. Privilégiez les résultats concrets.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addExperience()}
                    className="flex items-center gap-1 rounded-lg bg-signal px-3 py-1.5 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-xs"
                  >
                    <Plus size={13} />
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
                        <div className="flex items-center gap-2">
                          <span className="inline-flex size-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-800">
                            {index + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {exp.role?.trim() ? exp.role : `Poste #${index + 1}`}
                          </span>
                          {exp.company?.trim() && (
                            <span className="text-xs text-slate-500 truncate max-w-[180px]">
                              · {exp.company}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold"
                        >
                          <Trash2 size={12} />
                          <span>Supprimer</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">
                            Intitulé du poste
                          </span>
                          <input
                            className={inputStyle}
                            value={exp.role}
                            onChange={(e) => updateExperience(index, { role: e.target.value })}
                            onBlur={release}
                            placeholder="Intitulé du poste"
                          />
                        </label>
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">
                            Entreprise — Ville
                          </span>
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
                        <span className="text-[11px] font-semibold text-slate-700">
                          Période (dates)
                        </span>
                        <input
                          className={inputStyle}
                          value={exp.date}
                          onChange={(e) => updateExperience(index, { date: e.target.value })}
                          onBlur={release}
                          placeholder="Ex: 2021 — Présent"
                        />
                      </label>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <label
                            htmlFor={`exp-desc-${index}`}
                            className="text-[11px] font-semibold text-slate-700"
                          >
                            Missions & Réalisations (1 réalisation par ligne)
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

            {/* STEP 4: EDUCATION */}
            {activeSection === "education" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Formations & Diplômes ({profile.educations.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Indiquez vos diplômes principaux ou certifications professionnelles.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addEducation()}
                    className="flex items-center gap-1 rounded-lg bg-signal px-3 py-1.5 text-xs font-bold text-signal-ink hover:bg-signal/90 transition shadow-xs"
                  >
                    <Plus size={13} />
                    <span>+ Ajouter une formation</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {profile.educations.map((edu, index) => (
                    <div
                      key={index}
                      data-testid={`guided-education-${index}`}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          {edu.degree?.trim() ? edu.degree : `Formation #${index + 1}`}
                        </span>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">
                            École / Université
                          </span>
                          <input
                            className={inputStyle}
                            value={edu.school}
                            onChange={(e) => updateEducation(index, { school: e.target.value })}
                            onBlur={release}
                            placeholder="École / Université"
                          />
                        </label>
                        <label className="block space-y-1">
                          <span className="text-[11px] font-semibold text-slate-700">
                            Période / Année
                          </span>
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

            {/* STEP 5: SKILLS */}
            {activeSection === "skills" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Compétences clés ({profile.skills.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Séparez vos compétences par des virgules ou des retours à la ligne.
                  </p>
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
                {profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {profile.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: LANGUAGES */}
            {activeSection === "languages" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Langues & Niveaux (%)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      100 % = Bilingue / Maternel · 80 % = Courant · 60 % = Opérationnel
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateLanguages(
                        [...profile.languages, { label: "Nouvelle langue", value: 75 }],
                        false,
                      );
                    }}
                    className="flex items-center gap-1 rounded-md bg-signal/15 px-2.5 py-1 text-xs font-bold text-signal hover:bg-signal/25 transition"
                  >
                    <Plus size={12} />
                    <span>Ajouter une langue</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {profile.languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                    >
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

          {/* ACCOMPANIED STEP NAVIGATION FOOTER (Non-blocking) */}
          <div
            data-testid="guided-step-footer"
            className="border-t border-slate-200 bg-slate-50 px-5 py-3.5 shrink-0 space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                data-testid="guided-prev-step-btn"
                disabled={!prevStep}
                onClick={() => prevStep && setActiveSection(prevStep.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition shadow-2xs"
              >
                <ArrowLeft size={13} />
                <span>{prevStep ? prevStep.shortLabel : "Début"}</span>
              </button>

              <div className="flex items-center gap-2">
                {nextStep && (
                  <button
                    type="button"
                    data-testid="guided-skip-step-btn"
                    onClick={handleSkipCurrentStep}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                    title="Passer cette étape sans bloquer la suite"
                  >
                    <span>Passer cette étape</span>
                  </button>
                )}

                {nextStep ? (
                  <button
                    type="button"
                    data-testid="guided-next-step-btn"
                    onClick={() => setActiveSection(nextStep.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
                  >
                    <span>Étape suivante : {nextStep.label}</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    type="button"
                    data-testid="guided-finish-export-btn"
                    onClick={() => requestPdfExport()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
                  >
                    <Download size={13} />
                    <span>Terminer & Exporter le PDF</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/70">
              <span>
                {nextStep
                  ? `Prochaine étape : ${nextStep.label}`
                  : "Parcours terminé — votre CV est prêt à être téléchargé ou personnalisé."}
              </span>
              <button
                type="button"
                data-testid="guided-footer-studio-link"
                onClick={() => setEditorMode("pro")}
                className="font-semibold text-blue-700 hover:underline"
              >
                Personnaliser librement dans le Studio →
              </button>
            </div>
          </div>
        </aside>

        {/* ZONE 2: LIVE INTERACTIVE A4 CV PREVIEW */}
        <div
          className={cn(
            showMobilePreview ? "flex" : "hidden",
            "md:flex min-h-0 flex-1 flex-col bg-slate-200/70 overflow-hidden relative",
          )}
        >
          {/* Preview Top Bar: Quick Template / Style Switcher & Studio Info */}
          <div className="no-print border-b border-slate-300/80 bg-white/90 backdrop-blur-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0 z-20">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Aperçu A4 en direct</span>
              <span className="text-slate-300">·</span>
              <span className="text-[11px] text-slate-500">
                Cliquez sur n'importe quelle section du CV pour l'éditer à gauche
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                data-testid="toggle-appearance-bar-btn"
                onClick={() => setShowAppearanceBar((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition",
                  showAppearanceBar
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                )}
              >
                <Palette size={13} />
                <span>Modèle & Couleurs</span>
              </button>
            </div>
          </div>

          {/* Collapsible Appearance Bar (Template, Palette, Font) */}
          {showAppearanceBar && (
            <div
              data-testid="guided-appearance-bar"
              className="no-print border-b border-slate-300 bg-slate-50 px-4 py-3 flex flex-wrap items-center gap-4 shrink-0 z-20 animate-in fade-in"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase text-slate-500">Modèle :</span>
                <div className="flex flex-wrap items-center gap-1">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => requestApplyTemplate(tpl.id)}
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-xs font-semibold transition",
                        activeTemplate === tpl.id
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
                      )}
                    >
                      {tpl.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase text-slate-500">Palette :</span>
                <div className="flex items-center gap-1.5">
                  {COLOR_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => applyPalette(pal.id)}
                      title={pal.name}
                      className="size-5 rounded-full border border-slate-300 shadow-2xs transition hover:scale-110"
                      style={{ background: pal.primary }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase text-slate-500">Police :</span>
                <select
                  value={currentGlobalFont}
                  onChange={(e) => applyGlobalFont(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-800"
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Customization Banner & Studio Unbound Notice */}
          {(layoutCustomized || studioUnbound.length > 0) && (
            <div className="px-4 pt-3 z-20 shrink-0 no-print">
              <div className="rounded-xl border border-blue-200 bg-blue-50/95 px-4 py-2 text-xs text-blue-900 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Info size={15} className="shrink-0 text-blue-600" />
                  <span>
                    {studioUnbound.length > 0
                      ? `${studioUnbound.length} élément(s) libre(s) créé(s) dans le Studio sont conservés sur votre CV.`
                      : "Mise en page personnalisée du Studio active. Les textes modifiés ici se mettent à jour en direct."}
                  </span>
                </div>
                {layoutCustomized && (
                  <button
                    type="button"
                    onClick={() => requestResetLayout()}
                    className="shrink-0 inline-flex items-center gap-1 rounded-md border border-blue-300 bg-white px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 transition"
                  >
                    <RotateCcw size={11} />
                    <span>Réinitialiser</span>
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-auto p-6 md:p-8 flex flex-col items-center">
            <div
              className="simple-preview-sheet flex flex-col items-center gap-8 transition-all origin-top scale-[0.68] sm:scale-[0.76] md:scale-[0.78] lg:scale-[0.86] xl:scale-[0.92]"
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
                    className="simple-preview-frame bg-white shadow-2xl rounded-sm relative cursor-pointer"
                    style={{ width: PAGE_W, height: PAGE_H }}
                    onClick={(e) => {
                      const target = (e.target as HTMLElement | null)?.closest?.(
                        "[data-element]",
                      ) as HTMLElement | null;
                      const elId = target?.getAttribute("data-element");
                      setActive(p.id);
                      if (!elId) return;
                      select([elId]);
                      const clickedEl = p.elements.find((item) => item.id === elId);
                      if (!clickedEl) return;
                      if (clickedEl.bind) {
                        if (["name", "role", "contact"].includes(clickedEl.bind.kind))
                          setActiveSection("profile");
                        else if (clickedEl.bind.kind === "summary") setActiveSection("summary");
                        else if (clickedEl.bind.kind === "experience") setActiveSection("experience");
                        else if (clickedEl.bind.kind === "education") setActiveSection("education");
                        else if (clickedEl.bind.kind === "skills") setActiveSection("skills");
                        else if (clickedEl.bind.kind === "languages") setActiveSection("languages");
                        return;
                      }
                      const rawHeading = (clickedEl.content?.text || "").trim();
                      if (/formation|éducation|études|diplôme/i.test(rawHeading))
                        setActiveSection("education");
                      else if (/expérience|parcours/i.test(rawHeading))
                        setActiveSection("experience");
                      else if (/compétence|expertise|outil/i.test(rawHeading))
                        setActiveSection("skills");
                      else if (/langue/i.test(rawHeading))
                        setActiveSection("languages");
                      else if (/profil|résumé|propos/i.test(rawHeading))
                        setActiveSection("summary");
                      else if (/contact|coordonnées/i.test(rawHeading))
                        setActiveSection("profile");
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
      </div>
    </div>
  );
}
