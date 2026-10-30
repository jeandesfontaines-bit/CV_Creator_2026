import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  ClipboardPaste,
  FileText,
  FileUp,
  FolderPlus,
  GraduationCap,
  HelpCircle,
  Languages,
  Loader2,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  User,
  Wrench,
  X,
} from "lucide-react";
import { PageSheet } from "@/components/studio/PageSheet";
import {
  assignUnrecognizedBlock,
  CvImportError,
  draftToProfile,
  extractCVFromFile,
  extractCVFromText,
  filterTemplatesForImport,
  getRecommendedTemplates,
  ignoreUnrecognizedBlock,
  IMPORT_ERROR_MESSAGES,
  type AssignableSectionTarget,
  type ImportMappingDraft,
  type ImportTemplateFilter,
} from "@/cv/extractor";
import { buildPaginatedDocFromProfile, useStudio } from "@/cv/store";
import { TEMPLATES } from "@/cv/templates";
import type { TemplateId } from "@/cv/types";
import { cn } from "@/lib/utils";

type WizardStep = "upload" | "verify" | "template" | "confirm-replace";
type InputTab = "file" | "paste";

interface ImportErrorState {
  code: string;
  message: string;
}

const inputClass =
  "h-9 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-900 outline-none focus:border-slate-900";
const textareaClass =
  "w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 outline-none focus:border-slate-900 resize-y";

export function CvExtractorModal() {
  const isOpen = useStudio((s) => s.extractorModalOpen);
  const setOpen = useStudio((s) => s.setExtractorModalOpen);
  const onboarding = useStudio((s) => s.onboarding);
  const setOnboarding = useStudio((s) => s.setOnboarding);
  const importExtractedProfile = useStudio((s) => s.importExtractedProfile);

  const [step, setStep] = useState<WizardStep>("upload");
  const [inputTab, setInputTab] = useState<InputTab>("file");
  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<ImportErrorState | null>(null);

  const [draft, setDraft] = useState<ImportMappingDraft | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [editingSkills, setEditingSkills] = useState(false);
  const [editingLanguages, setEditingLanguages] = useState(false);
  const [assigningBlockId, setAssigningBlockId] = useState<string | null>(null);

  const [templateFilter, setTemplateFilter] = useState<ImportTemplateFilter>("all");
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>("executive");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetWizard = () => {
    setStep("upload");
    setInputTab("file");
    setRawText("");
    setIsLoading(false);
    setErrorState(null);
    setDraft(null);
    setEditingProfile(false);
    setEditingExpId(null);
    setEditingEduId(null);
    setEditingSkills(false);
    setEditingLanguages(false);
    setAssigningBlockId(null);
    setTemplateFilter("all");
    setShowAllTemplates(false);
  };

  const handleClose = () => {
    resetWizard();
    setOpen(false);
  };

  const handleCreateWithAI = () => {
    resetWizard();
    setOpen(false);
    setOnboarding(true);
  };

  const handleFileChange = async (file: File) => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const res = await extractCVFromFile(file);
      setDraft(res.draft);
      setSelectedTemplateId(res.recommendedTemplate);
      setStep("verify");
    } catch (err: unknown) {
      if (err instanceof CvImportError) {
        setErrorState({ code: err.code, message: err.message });
      } else {
        setErrorState({
          code: "TECHNICAL_ERROR",
          message: IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR,
        });
      }
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAnalyzePastedText = async () => {
    if (!rawText.trim()) {
      setErrorState({
        code: "NO_SECTION_DETECTED",
        message: IMPORT_ERROR_MESSAGES.NO_SECTION_DETECTED,
      });
      return;
    }
    setIsLoading(true);
    setErrorState(null);
    try {
      const isLinkedIn = /linkedin|coordonnées|principales compétences|infos\n/i.test(rawText);
      const res = await extractCVFromText(
        rawText,
        isLinkedIn ? "Profil LinkedIn (texte collé)" : "Texte collé"
      );
      setDraft(res.draft);
      setSelectedTemplateId(res.recommendedTemplate);
      setStep("verify");
    } catch (err: unknown) {
      if (err instanceof CvImportError) {
        setErrorState({ code: err.code, message: err.message });
      } else {
        setErrorState({
          code: "TECHNICAL_ERROR",
          message: IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const mappedProfile = useMemo(() => (draft ? draftToProfile(draft) : null), [draft]);
  const recommendedTemplates = useMemo(
    () => (draft ? getRecommendedTemplates(draft) : []),
    [draft]
  );
  const filteredAllTemplates = useMemo(
    () => filterTemplatesForImport(templateFilter),
    [templateFilter]
  );

  const handleSelectTemplateToUse = (tplId: TemplateId) => {
    setSelectedTemplateId(tplId);
    if (!onboarding) {
      // A CV is already open in the editor: ask explicit confirmation before replacing
      setStep("confirm-replace");
    } else {
      finalizeImport(tplId);
    }
  };

  const finalizeImport = (tplId: TemplateId) => {
    if (!mappedProfile) return;
    importExtractedProfile(mappedProfile, tplId, false);
    resetWizard();
  };

  if (!isOpen) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-5 backdrop-blur-xs animate-in fade-in"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Importer mon CV"
        data-testid="cv-import-modal"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white">
              <FileUp size={18} />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">
                {step === "upload" && "Importer mon CV"}
                {step === "verify" && "Vérifie les informations détectées"}
                {step === "template" && "Choisis un point de départ"}
                {step === "confirm-replace" && "Remplacer le CV actuel ?"}
              </h2>
              <p className="text-xs text-slate-500">
                {step === "upload" &&
                  "Importe un fichier PDF, Word (.docx) ou TXT (jusqu'à 10 Mo), ou colle ton texte / profil LinkedIn."}
                {step === "verify" &&
                  "Vérifie et corrige les sections extraites avant de générer ton CV éditable."}
                {step === "template" &&
                  "Ton contenu importé est conservé quel que soit le modèle choisi."}
                {step === "confirm-replace" &&
                  "Confirmation requise avant de remplacer le document ouvert."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* STEP 1: UPLOAD OR PASTE */}
          {step === "upload" && (
            <div className="mx-auto max-w-2xl space-y-5">
              {/* Mode tabs */}
              <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  data-testid="import-tab-file"
                  onClick={() => {
                    setInputTab("file");
                    setErrorState(null);
                  }}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition",
                    inputTab === "file"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <FileUp size={14} />
                  <span>Fichier PDF, DOCX ou TXT</span>
                </button>
                <button
                  type="button"
                  data-testid="import-tab-paste"
                  onClick={() => {
                    setInputTab("paste");
                    setErrorState(null);
                  }}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition",
                    inputTab === "paste"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <ClipboardPaste size={14} />
                  <span>Coller mon texte / LinkedIn</span>
                </button>
              </div>

              {/* Error banner with exact messages and action alternatives */}
              {errorState && (
                <div
                  role="alert"
                  data-testid="import-error-banner"
                  className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-sm" data-testid="import-error-message">
                        {errorState.message}
                      </p>
                      <p className="text-amber-800">
                        Aucune donnée n’a été inventée ni écrasée. Choisis l’une des options ci-dessous pour continuer :
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pl-7">
                    <button
                      type="button"
                      data-testid="error-action-paste"
                      onClick={() => {
                        setErrorState(null);
                        setInputTab("paste");
                      }}
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                    >
                      Coller mon texte
                    </button>
                    <button
                      type="button"
                      data-testid="error-action-ai"
                      onClick={handleCreateWithAI}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
                    >
                      Créer avec l’IA
                    </button>
                    <button
                      type="button"
                      data-testid="error-action-other-file"
                      onClick={() => {
                        setErrorState(null);
                        setInputTab("file");
                        fileInputRef.current?.click();
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                    >
                      Choisir un autre fichier
                    </button>
                  </div>
                </div>
              )}

              {inputTab === "file" ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFileChange(file);
                  }}
                  onClick={() => !isLoading && fileInputRef.current?.click()}
                  data-testid="import-dropzone"
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition",
                    isLoading
                      ? "border-slate-300 bg-slate-50 cursor-wait"
                      : "border-slate-300 bg-slate-50/70 hover:border-slate-900 hover:bg-slate-50"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    data-testid="import-file-input"
                    accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange(file);
                    }}
                  />
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <Loader2 size={32} className="animate-spin text-slate-900" />
                      <p className="text-sm font-bold text-slate-900">
                        Extraction et détection des sections en cours…
                      </p>
                      <p className="text-xs text-slate-500">
                        Analyse locale du document sans inventer de contenu
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                        <FileUp size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        Clique pour choisir un fichier ou glisse ton CV ici
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Formats acceptés : <strong>PDF</strong> (texte sélectionnable ou export LinkedIn),{" "}
                        <strong>Word (.docx)</strong>, <strong>TXT</strong> · Max <strong>10 Mo</strong>
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white">
                        Sélectionner mon fichier
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="cv-paste-textarea"
                      className="text-xs font-bold text-slate-700"
                    >
                      Colle le texte de ton CV ou de ton profil LinkedIn :
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Sections FR / EN détectées automatiquement
                    </span>
                  </div>
                  <textarea
                    id="cv-paste-textarea"
                    data-testid="import-paste-textarea"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder={`Exemple :\nCamille Laurent\nProduct Manager\ncamille.laurent@email.fr | +33 6 12 34 56 78 | Paris\n\nProfil\nProduct Manager avec 6 ans d'expérience...\n\nExpériences professionnelles\nSenior Product Manager — Doctolib\n2022 - Présent | Paris\n• Pilotage de la roadmap patient...`}
                    className="h-60 w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 font-mono text-xs text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      data-testid="import-analyze-text-btn"
                      disabled={isLoading}
                      onClick={handleAnalyzePastedText}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition"
                    >
                      {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      <span>Détecter les sections</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: MAPPING VERIFICATION SCREEN */}
          {step === "verify" && draft && (
            <div className="space-y-5" data-testid="mapping-verification-screen">
              {/* Imported file summary bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-slate-700" />
                  <span className="text-xs font-bold text-slate-900" data-testid="imported-filename">
                    Fichier importé : {draft.filename}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {draft.detectedSections.map((sec) => (
                    <span
                      key={sec}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-900"
                    >
                      <Check size={11} /> {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Partial extraction notice if applicable */}
              {draft.partialDetection && (
                <div
                  role="status"
                  data-testid="partial-extraction-banner"
                  className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-950"
                >
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
                  <div>
                    <p className="font-bold">
                      {IMPORT_ERROR_MESSAGES.PARTIAL_EXTRACTION}
                    </p>
                    <p className="mt-0.5 text-amber-800">
                      Les champs non trouvés ont été laissés vides sans inventer d’information.
                    </p>
                  </div>
                </div>
              )}

              {/* 1. PROFIL */}
              <div
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3"
                data-testid="mapping-section-profile"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-slate-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Profil
                    </h3>
                  </div>
                  <button
                    type="button"
                    data-testid="profile-edit-toggle"
                    onClick={() => setEditingProfile((v) => !v)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Pencil size={12} />
                    <span>{editingProfile ? "Terminer" : "Modifier"}</span>
                  </button>
                </div>

                {editingProfile ? (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">Nom complet</span>
                      <input
                        data-testid="mapping-profile-name-input"
                        className={inputClass}
                        value={draft.profile.name}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, name: e.target.value },
                          })
                        }
                        placeholder="Nom et prénom"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">Titre / Poste</span>
                      <input
                        data-testid="mapping-profile-role-input"
                        className={inputClass}
                        value={draft.profile.role}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, role: e.target.value },
                          })
                        }
                        placeholder="Intitulé de poste"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">Email</span>
                      <input
                        data-testid="mapping-profile-email-input"
                        className={inputClass}
                        value={draft.profile.email}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, email: e.target.value },
                          })
                        }
                        placeholder="email@domaine.com"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">Téléphone</span>
                      <input
                        data-testid="mapping-profile-phone-input"
                        className={inputClass}
                        value={draft.profile.phone}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, phone: e.target.value },
                          })
                        }
                        placeholder="+33 6 ..."
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">Localisation</span>
                      <input
                        className={inputClass}
                        value={draft.profile.location}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, location: e.target.value },
                          })
                        }
                        placeholder="Ville, Pays"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">Lien / Portfolio / LinkedIn</span>
                      <input
                        className={inputClass}
                        value={draft.profile.link}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, link: e.target.value },
                          })
                        }
                        placeholder="linkedin.com/in/..."
                      />
                    </label>
                    <label className="space-y-1 sm:col-span-2">
                      <span className="text-[11px] font-semibold text-slate-600">Résumé / Accroche</span>
                      <textarea
                        rows={3}
                        data-testid="mapping-profile-summary-input"
                        className={textareaClass}
                        value={draft.profile.summary}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            profile: { ...draft.profile, summary: e.target.value },
                          })
                        }
                        placeholder="Résumé professionnel..."
                      />
                    </label>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                    <div>
                      <span className="text-slate-500">Nom : </span>
                      <strong className="text-slate-900" data-testid="mapping-profile-name">
                        {draft.profile.name || <em className="text-amber-700 font-normal">Non détecté (vide)</em>}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Titre : </span>
                      <strong className="text-slate-900" data-testid="mapping-profile-role">
                        {draft.profile.role || <em className="text-amber-700 font-normal">Non détecté (vide)</em>}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Email : </span>
                      <span className="text-slate-900">{draft.profile.email || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Téléphone : </span>
                      <span className="text-slate-900">{draft.profile.phone || "—"}</span>
                    </div>
                    {draft.profile.summary && (
                      <div className="sm:col-span-2 text-slate-600 line-clamp-2 border-t border-slate-100 pt-1.5">
                        {draft.profile.summary}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. EXPÉRIENCES DÉTECTÉES */}
              <div
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3"
                data-testid="mapping-section-experiences"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase size={15} className="text-slate-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Expériences détectées : {draft.experiences.length}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = `exp-manual-${Date.now()}`;
                      setDraft({
                        ...draft,
                        experiences: [
                          ...draft.experiences,
                          {
                            id: newId,
                            role: "",
                            company: "",
                            date: "",
                            location: "",
                            desc: "",
                            needsReview: true,
                            dateNeedsReview: true,
                            reviewReason: "ajout manuel",
                          },
                        ],
                      });
                      setEditingExpId(newId);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Plus size={12} />
                    <span>Ajouter</span>
                  </button>
                </div>

                {draft.experiences.length === 0 ? (
                  <p className="text-xs italic text-slate-500">
                    Aucune expérience détectée. Tu peux en ajouter une ou attribuer un bloc ci-dessous.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {draft.experiences.map((exp, idx) => {
                      const isEditing = editingExpId === exp.id;
                      return (
                        <div
                          key={exp.id}
                          data-testid={`mapping-exp-item-${idx}`}
                          className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 space-y-2"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-900">
                                <span>
                                  {idx + 1}. {exp.role || "Poste non précisé"}
                                  {exp.company ? ` — ${exp.company}` : ""}
                                  {exp.date ? ` (${exp.date})` : ""}
                                </span>
                                {exp.needsReview && (
                                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                                    À vérifier
                                  </span>
                                )}
                                {exp.dateNeedsReview && (
                                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                                    Dates à vérifier
                                  </span>
                                )}
                              </div>
                              {exp.desc && !isEditing && (
                                <p className="text-[11px] text-slate-600 line-clamp-2 whitespace-pre-line">
                                  {exp.desc}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                data-testid={`mapping-exp-edit-${idx}`}
                                onClick={() => setEditingExpId(isEditing ? null : exp.id)}
                                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                              >
                                {isEditing ? "Terminer" : "Modifier"}
                              </button>
                              <button
                                type="button"
                                data-testid={`mapping-exp-delete-${idx}`}
                                onClick={() =>
                                  setDraft({
                                    ...draft,
                                    experiences: draft.experiences.filter((e) => e.id !== exp.id),
                                  })
                                }
                                className="rounded-md border border-red-200 bg-white px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>

                          {isEditing && (
                            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-200 sm:grid-cols-2">
                              <label className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-600">Poste / Rôle</span>
                                <input
                                  data-testid={`mapping-exp-role-input-${idx}`}
                                  className={inputClass}
                                  value={exp.role}
                                  onChange={(e) => {
                                    const next = [...draft.experiences];
                                    next[idx] = {
                                      ...exp,
                                      role: e.target.value,
                                      needsReview: !e.target.value.trim() || !exp.company.trim(),
                                    };
                                    setDraft({ ...draft, experiences: next });
                                  }}
                                />
                              </label>
                              <label className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-600">Entreprise</span>
                                <input
                                  data-testid={`mapping-exp-company-input-${idx}`}
                                  className={inputClass}
                                  value={exp.company}
                                  onChange={(e) => {
                                    const next = [...draft.experiences];
                                    next[idx] = {
                                      ...exp,
                                      company: e.target.value,
                                      needsReview: !exp.role.trim() || !e.target.value.trim(),
                                    };
                                    setDraft({ ...draft, experiences: next });
                                  }}
                                />
                              </label>
                              <label className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-600">Dates</span>
                                <input
                                  data-testid={`mapping-exp-date-input-${idx}`}
                                  className={inputClass}
                                  value={exp.date}
                                  onChange={(e) => {
                                    const next = [...draft.experiences];
                                    next[idx] = {
                                      ...exp,
                                      date: e.target.value,
                                      dateNeedsReview: !e.target.value.trim(),
                                    };
                                    setDraft({ ...draft, experiences: next });
                                  }}
                                />
                              </label>
                              <label className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-600">Lieu</span>
                                <input
                                  className={inputClass}
                                  value={exp.location}
                                  onChange={(e) => {
                                    const next = [...draft.experiences];
                                    next[idx] = { ...exp, location: e.target.value };
                                    setDraft({ ...draft, experiences: next });
                                  }}
                                />
                              </label>
                              <label className="space-y-1 sm:col-span-2">
                                <span className="text-[11px] font-semibold text-slate-600">
                                  Description / Réalisations
                                </span>
                                <textarea
                                  rows={3}
                                  data-testid={`mapping-exp-desc-input-${idx}`}
                                  className={textareaClass}
                                  value={exp.desc}
                                  onChange={(e) => {
                                    const next = [...draft.experiences];
                                    next[idx] = { ...exp, desc: e.target.value };
                                    setDraft({ ...draft, experiences: next });
                                  }}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. FORMATIONS DÉTECTÉES */}
              <div
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3"
                data-testid="mapping-section-educations"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={15} className="text-slate-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Formations détectées : {draft.educations.length}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newId = `edu-manual-${Date.now()}`;
                      setDraft({
                        ...draft,
                        educations: [
                          ...draft.educations,
                          {
                            id: newId,
                            degree: "",
                            school: "",
                            date: "",
                            location: "",
                            needsReview: true,
                            dateNeedsReview: true,
                          },
                        ],
                      });
                      setEditingEduId(newId);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Plus size={12} />
                    <span>Ajouter</span>
                  </button>
                </div>

                {draft.educations.length === 0 ? (
                  <p className="text-xs italic text-slate-500">Aucune formation détectée.</p>
                ) : (
                  <div className="space-y-2">
                    {draft.educations.map((edu, idx) => {
                      const isEditing = editingEduId === edu.id;
                      return (
                        <div
                          key={edu.id}
                          data-testid={`mapping-edu-item-${idx}`}
                          className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-900">
                              <span>
                                {idx + 1}. {edu.degree || "Diplôme à préciser"}
                                {edu.school ? ` — ${edu.school}` : ""}
                                {edu.date ? ` (${edu.date})` : ""}
                              </span>
                              {edu.needsReview && (
                                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                                  À vérifier
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                data-testid={`mapping-edu-edit-${idx}`}
                                onClick={() => setEditingEduId(isEditing ? null : edu.id)}
                                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                              >
                                {isEditing ? "Terminer" : "Modifier"}
                              </button>
                              <button
                                type="button"
                                data-testid={`mapping-edu-delete-${idx}`}
                                onClick={() =>
                                  setDraft({
                                    ...draft,
                                    educations: draft.educations.filter((e) => e.id !== edu.id),
                                  })
                                }
                                className="rounded-md border border-red-200 bg-white px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>

                          {isEditing && (
                            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-200 sm:grid-cols-3">
                              <label className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-600">Diplôme</span>
                                <input
                                  data-testid={`mapping-edu-degree-input-${idx}`}
                                  className={inputClass}
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const next = [...draft.educations];
                                    next[idx] = { ...edu, degree: e.target.value, needsReview: false };
                                    setDraft({ ...draft, educations: next });
                                  }}
                                />
                              </label>
                              <label className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-600">Établissement</span>
                                <input
                                  data-testid={`mapping-edu-school-input-${idx}`}
                                  className={inputClass}
                                  value={edu.school}
                                  onChange={(e) => {
                                    const next = [...draft.educations];
                                    next[idx] = { ...edu, school: e.target.value, needsReview: false };
                                    setDraft({ ...draft, educations: next });
                                  }}
                                />
                              </label>
                              <label className="space-y-1">
                                <span className="text-[11px] font-semibold text-slate-600">Dates</span>
                                <input
                                  className={inputClass}
                                  value={edu.date}
                                  onChange={(e) => {
                                    const next = [...draft.educations];
                                    next[idx] = { ...edu, date: e.target.value, dateNeedsReview: false };
                                    setDraft({ ...draft, educations: next });
                                  }}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. COMPÉTENCES & 5. LANGUES */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Compétences */}
                <div
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3"
                  data-testid="mapping-section-skills"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench size={15} className="text-slate-700" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Compétences détectées : {draft.skills.length}
                      </h3>
                    </div>
                    <button
                      type="button"
                      data-testid="skills-edit-toggle"
                      onClick={() => setEditingSkills((v) => !v)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      {editingSkills ? "Terminer" : "Modifier"}
                    </button>
                  </div>

                  {editingSkills ? (
                    <textarea
                      rows={3}
                      data-testid="mapping-skills-textarea"
                      className={textareaClass}
                      value={draft.skills.join(", ")}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          skills: e.target.value
                            .split(/[,;\n]+/)
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Sépare les compétences par une virgule..."
                    />
                  ) : draft.skills.length === 0 ? (
                    <p className="text-xs italic text-slate-500">Aucune compétence détectée.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {draft.skills.map((skill, idx) => (
                        <span
                          key={`${skill}-${idx}`}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Langues */}
                <div
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3"
                  data-testid="mapping-section-languages"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Languages size={15} className="text-slate-700" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Langues détectées : {draft.languages.length}
                      </h3>
                    </div>
                    <button
                      type="button"
                      data-testid="languages-edit-toggle"
                      onClick={() => setEditingLanguages((v) => !v)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      {editingLanguages ? "Terminer" : "Modifier"}
                    </button>
                  </div>

                  {editingLanguages ? (
                    <div className="space-y-2">
                      {draft.languages.map((lang, idx) => (
                        <div key={lang.id} className="flex items-center gap-2">
                          <input
                            className={inputClass}
                            value={lang.name}
                            onChange={(e) => {
                              const next = [...draft.languages];
                              next[idx] = { ...lang, name: e.target.value };
                              setDraft({ ...draft, languages: next });
                            }}
                            placeholder="Langue"
                          />
                          <input
                            className={inputClass}
                            value={lang.level}
                            onChange={(e) => {
                              const next = [...draft.languages];
                              next[idx] = { ...lang, level: e.target.value };
                              setDraft({ ...draft, languages: next });
                            }}
                            placeholder="Niveau"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                languages: draft.languages.filter((l) => l.id !== lang.id),
                              })
                            }
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            languages: [
                              ...draft.languages,
                              {
                                id: `lang-${Date.now()}`,
                                name: "Nouvelle langue",
                                level: "Courant",
                                pct: 80,
                              },
                            ],
                          })
                        }
                        className="text-xs font-semibold text-slate-700 underline"
                      >
                        + Ajouter une langue
                      </button>
                    </div>
                  ) : draft.languages.length === 0 ? (
                    <p className="text-xs italic text-slate-500">Aucune langue détectée.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {draft.languages.map((lang) => (
                        <span
                          key={lang.id}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800"
                        >
                          {lang.name} ({lang.level})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 6. CONTENU NON RECONNU / À VÉRIFIER */}
              <div
                className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-3"
                data-testid="mapping-section-unrecognized"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={15} className="text-amber-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                      Contenu non reconnu : {draft.unrecognizedBlocks.length} bloc(s)
                    </h3>
                  </div>
                </div>

                {draft.unrecognizedBlocks.length === 0 ? (
                  <p className="text-xs text-slate-600">
                    Aucun bloc non reconnu — tout le texte a été associé à une section.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {draft.unrecognizedBlocks.map((block, idx) => (
                      <div
                        key={block.id}
                        data-testid={`unrecognized-block-${idx}`}
                        className="rounded-lg border border-amber-200 bg-white p-3 space-y-2"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-slate-900">
                              {block.heading}
                            </span>
                            <p className="mt-1 text-xs text-slate-700 whitespace-pre-line">
                              {block.text}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              data-testid={`unrecognized-assign-btn-${idx}`}
                              onClick={() =>
                                setAssigningBlockId(assigningBlockId === block.id ? null : block.id)
                              }
                              className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-slate-800"
                            >
                              <FolderPlus size={12} />
                              <span>Attribuer à une section</span>
                            </button>
                            <button
                              type="button"
                              data-testid={`unrecognized-ignore-btn-${idx}`}
                              onClick={() => setDraft(ignoreUnrecognizedBlock(draft, block.id))}
                              className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200"
                            >
                              Ignorer
                            </button>
                          </div>
                        </div>

                        {assigningBlockId === block.id && (
                          <div
                            data-testid={`unrecognized-assign-targets-${idx}`}
                            className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2"
                          >
                            <span className="text-[11px] font-semibold text-slate-500">
                              Choisir la section cible :
                            </span>
                            {(
                              [
                                { id: "profile", label: "Profil" },
                                { id: "experience", label: "Expériences" },
                                { id: "education", label: "Formations" },
                                { id: "skills", label: "Compétences" },
                                { id: "languages", label: "Langues" },
                              ] as { id: AssignableSectionTarget; label: string }[]
                            ).map((target) => (
                              <button
                                key={target.id}
                                type="button"
                                data-testid={`assign-target-${target.id}-${idx}`}
                                onClick={() => {
                                  setDraft(assignUnrecognizedBlock(draft, block.id, target.id));
                                  setAssigningBlockId(null);
                                }}
                                className="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-800 hover:bg-slate-900 hover:text-white transition"
                              >
                                {target.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: TEMPLATE SELECTION AFTER IMPORT */}
          {step === "template" && draft && mappedProfile && (
            <div className="space-y-5" data-testid="import-template-step">
              {/* Filter bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtres de modèles">
                  {(
                    [
                      { id: "all", label: "Recommandés" },
                      { id: "ats", label: "ATS-safe" },
                      { id: "onepage", label: "1 page" },
                      { id: "moderne", label: "Moderne" },
                      { id: "creatif", label: "Créatif" },
                    ] as { id: ImportTemplateFilter; label: string }[]
                  ).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      data-testid={`import-filter-${f.id}`}
                      onClick={() => {
                        setTemplateFilter(f.id);
                        if (f.id !== "all") setShowAllTemplates(true);
                      }}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-bold transition",
                        templateFilter === f.id
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  data-testid="import-toggle-all-templates"
                  onClick={() => setShowAllTemplates((v) => !v)}
                  className="text-xs font-bold text-slate-700 underline hover:text-slate-900"
                >
                  {showAllTemplates ? "Voir les 3 recommandés" : `Voir tous les modèles (${TEMPLATES.length})`}
                </button>
              </div>

              {/* Cards grid: 3 recommended templates by default, or filtered/all templates */}
              {!showAllTemplates && templateFilter === "all" ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {recommendedTemplates.map((rec, idx) => {
                    const previewDoc = buildPaginatedDocFromProfile(
                      mappedProfile,
                      rec.template.id,
                      `rec-prev-${rec.template.id}`
                    );
                    const firstPage = previewDoc.pages[0];
                    return (
                      <div
                        key={rec.template.id}
                        data-testid={`recommended-template-card-${idx}`}
                        className={cn(
                          "flex flex-col justify-between rounded-2xl border p-3.5 transition",
                          selectedTemplateId === rec.template.id
                            ? "border-slate-900 bg-slate-50 shadow-md"
                            : "border-slate-200 bg-white hover:border-slate-400"
                        )}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                              {rec.badge}
                            </span>
                            <span className="text-[11px] font-medium text-slate-500">
                              {previewDoc.pages.length} page{previewDoc.pages.length > 1 ? "s" : ""} A4
                            </span>
                          </div>

                          {/* Mini live A4 preview */}
                          <div
                            onClick={() => setSelectedTemplateId(rec.template.id)}
                            className="relative mx-auto flex h-56 w-full cursor-pointer items-start justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-2"
                          >
                            <div
                              style={{
                                transform: "scale(0.24)",
                                transformOrigin: "top center",
                                width: 794,
                                height: 1123,
                              }}
                            >
                              <PageSheet
                                page={firstPage}
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

                          <div>
                            <h4 className="font-display text-sm font-bold text-slate-900">
                              {rec.template.name}
                            </h4>
                            <p className="text-[11px] text-slate-600">{rec.reason}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          data-testid={`use-template-btn-${rec.template.id}`}
                          onClick={() => handleSelectTemplateToUse(rec.template.id)}
                          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                        >
                          <span>Utiliser</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {filteredAllTemplates.map((tpl) => {
                    const previewDoc = buildPaginatedDocFromProfile(
                      mappedProfile,
                      tpl.id,
                      `all-prev-${tpl.id}`
                    );
                    const firstPage = previewDoc.pages[0];
                    return (
                      <div
                        key={tpl.id}
                        data-testid={`all-template-card-${tpl.id}`}
                        className={cn(
                          "flex flex-col justify-between rounded-2xl border p-3.5 transition",
                          selectedTemplateId === tpl.id
                            ? "border-slate-900 bg-slate-50 shadow-md"
                            : "border-slate-200 bg-white hover:border-slate-400"
                        )}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-sm font-bold text-slate-900">
                              {tpl.name}
                            </span>
                            <span className="text-[11px] text-slate-500">{tpl.note}</span>
                          </div>
                          <div
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className="relative mx-auto flex h-48 w-full cursor-pointer items-start justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-2"
                          >
                            <div
                              style={{
                                transform: "scale(0.21)",
                                transformOrigin: "top center",
                                width: 794,
                                height: 1123,
                              }}
                            >
                              <PageSheet
                                page={firstPage}
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

                        <button
                          type="button"
                          data-testid={`use-template-btn-${tpl.id}`}
                          onClick={() => handleSelectTemplateToUse(tpl.id)}
                          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                        >
                          <span>Utiliser</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: EXPLICIT CONFIRMATION WHEN REPLACING AN OPEN CV */}
          {step === "confirm-replace" && draft && (
            <div
              className="mx-auto max-w-md rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-center space-y-4"
              data-testid="confirm-replace-cv-step"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-base font-bold text-slate-900">
                  Remplacer le CV actuel ?
                </h3>
                <p className="text-xs text-slate-700">
                  Le CV actuellement ouvert sera remplacé par le CV importé.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  data-testid="cancel-replace-cv-btn"
                  onClick={() => setStep("template")}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  data-testid="confirm-replace-cv-btn"
                  onClick={() => finalizeImport(selectedTemplateId)}
                  className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  Remplacer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer navigation */}
        <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3.5">
          <div>
            {step === "verify" && (
              <button
                type="button"
                onClick={() => setStep("upload")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <ArrowLeft size={13} />
                <span>Changer de fichier</span>
              </button>
            )}
            {step === "template" && (
              <button
                type="button"
                onClick={() => setStep("verify")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <ArrowLeft size={13} />
                <span>Retour à la vérification</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {step === "verify" && (
              <button
                type="button"
                data-testid="mapping-create-cv-btn"
                onClick={() => setStep("template")}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-sm"
              >
                <CheckCircle2 size={15} />
                <span>Créer mon CV</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
