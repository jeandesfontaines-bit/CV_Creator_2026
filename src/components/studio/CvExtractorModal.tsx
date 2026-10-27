import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Languages,
  Tags,
  Loader2,
  FileType,
} from "lucide-react";
import { useStudio } from "@/cv/store";
import { extractFromFile, extractFromText, type ExtractorResult } from "@/cv/extractor";
import { TEMPLATES } from "@/cv/templates";
import type { TemplateId } from "@/cv/types";
import { cn } from "@/lib/utils";

const SAMPLE_RAW_TEXT = `Jean-Baptiste Vasseur
Consultant Senior Data & IA
Paris, France • +33 6 42 18 90 12 • jb.vasseur@data-consulting.fr • linkedin.com/in/jb-vasseur

À PROPOS
Consultant avec 7 ans d'expérience dans le conseil stratégique en gouvernance de données et architecture cloud pour des clients CAC 40. Pilotage de programmes d'IA générative et de modernisation des entrepôts de données.

EXPÉRIENCE PROFESSIONNELLE
Senior Manager Data & Analytics
Atos Consulting — Paris
2021 — Aujourd'hui
• Direction d'un pôle de 12 consultants sur 4 missions d'accélération Data Cloud (Snowflake, AWS).
• Accroissement de 35% de la vélocité des livrables de reporting financier pour un groupe d'assurance.
• Animation de comités de direction et cadrage d'appels d'offres stratégiques (budget 1,2 M€).

Consultant Big Data & Business Intelligence
Wavestone — Paris
2018 — 2021
• Conception de pipelines ETL en Python/Airflow traitant plus de 500k transactions par jour.
• Modélisation de tableaux de bord Power BI utilisés quotidiennement par 150 décideurs.
• Réduction de 40% des incidents de qualité de données grâce à des tests automatisés.

FORMATION
Master 2 Big Data & Systèmes Décisionnels
Université Paris-Dauphine
2016 — 2018

Licence Mathématiques & Informatique
Sorbonne Université
2013 — 2016

COMPÉTENCES
Python, SQL Avancé, Snowflake, AWS, Databricks, Power BI, Dbt, Airflow, Docker, Conduite du changement

LANGUES
Français : Langue maternelle
Anglais : Courant C1 (Score TOEIC 945)
Espagnol : Intermédiaire B1`;

export function CvExtractorModal() {
  const open = useStudio((s) => s.extractorModalOpen);
  const setOpen = useStudio((s) => s.setExtractorModalOpen);
  const importExtractedProfile = useStudio((s) => s.importExtractedProfile);
  const currentProfile = useStudio((s) => s.doc.profile);

  const [activeTab, setActiveTab] = useState<"file" | "text">("file");
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ExtractorResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern");
  const [showDetails, setShowDetails] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset states when closed or opened
  useEffect(() => {
    if (!open) {
      setErrorMsg(null);
    }
  }, [open]);

  if (!open) return null;

  const handleProcessFile = async (file: File) => {
    setSelectedFile(file);
    setErrorMsg(null);
    setIsProcessing(true);
    try {
      const res = await extractFromFile(file, currentProfile);
      setResult(res);
      setShowDetails(true);
    } catch (err: unknown) {
      console.error("Extraction error:", err);
      const msg = err instanceof Error ? err.message : "Impossible de lire le fichier";
      setErrorMsg(msg);
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessText = (text: string) => {
    setRawText(text);
    setErrorMsg(null);
    if (!text.trim()) {
      setResult(null);
      return;
    }
    setIsProcessing(true);
    try {
      const res = extractFromText(text, currentProfile);
      setResult(res);
      setShowDetails(true);
    } catch (err: unknown) {
      console.error("Text extraction error:", err);
      const msg = err instanceof Error ? err.message : "Erreur lors de l'analyse du texte";
      setErrorMsg(msg);
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyExtracted = (asNewPage = false) => {
    if (!result) return;
    importExtractedProfile(result.profile, selectedTemplate, asNewPage);
    setOpen(false);
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5 backdrop-blur-xs">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-2xl border border-line bg-sheet text-ink shadow-2xl overflow-hidden">
        {/* Header de la modale */}
        <div className="flex items-center justify-between border-b border-line bg-paper px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-signal font-bold text-signal-ink shadow-xs">
              <Sparkles size={18} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base font-bold tracking-tight">
                  Importateur & Extracteur de CV
                </h3>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  CV_extractor 2026
                </span>
              </div>
              <p className="text-xs text-mute">
                Importez votre CV existant : extraction automatique des expériences, formations, compétences et coordonnées.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="flex size-8 items-center justify-center rounded-lg border border-line bg-sheet text-mute hover:bg-line/40 hover:text-ink transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Formats acceptés */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-line bg-cream/50 px-5 py-2 text-[11px] text-mute">
          <span className="font-semibold text-ink">Formats reconnus :</span>
          {["PDF (texte)", "Word .DOCX", "OpenDocument .ODT", "RTF", "HTML", "TXT brut"].map((fmt) => (
            <span key={fmt} className="rounded-md border border-line/70 bg-sheet px-1.5 py-0.5 font-mono text-[10px] text-ink">
              {fmt}
            </span>
          ))}
        </div>

        {/* Sélection d'onglet */}
        <div className="flex border-b border-line bg-paper text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-3 transition",
              activeTab === "file"
                ? "border-blue-600 bg-sheet text-blue-700"
                : "border-transparent text-mute hover:text-ink",
            )}
          >
            <Upload size={14} />
            Fichier (PDF, Word, ODT, TXT)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 border-b-2 py-3 transition",
              activeTab === "text"
                ? "border-blue-600 bg-sheet text-blue-700"
                : "border-transparent text-mute hover:text-ink",
            )}
          >
            <FileText size={14} />
            Copier-Coller le texte brut
          </button>
        </div>

        {/* Corps déroulant */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: FICHIER */}
          {activeTab === "file" && (
            <div className="space-y-3">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleProcessFile(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all",
                  dragOver
                    ? "border-blue-600 bg-signal/5 scale-[0.99]"
                    : "border-line bg-sheet hover:border-blue-600/50 hover:bg-cream/40",
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.odt,.rtf,.html,.htm,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleProcessFile(f);
                    e.target.value = "";
                  }}
                />

                <span className="flex size-12 items-center justify-center rounded-2xl bg-signal/10 text-blue-700 mb-2">
                  <Upload size={24} />
                </span>
                <p className="text-sm font-bold text-ink">
                  Glissez-déposez votre CV ici, ou <span className="text-blue-700 underline">cliquez pour parcourir</span>
                </p>
                <p className="mt-1 text-xs text-mute">
                  Sélectionnez un document PDF, DOCX, ODT ou TXT (jusqu'à 12 Mo).
                </p>
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between rounded-xl border border-line bg-paper px-3.5 py-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileType size={16} className="text-blue-700 shrink-0" />
                    <span className="font-semibold text-ink truncate">{selectedFile.name}</span>
                    <span className="text-[10px] text-mute font-mono">
                      ({(selectedFile.size / 1024).toFixed(1)} Ko)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProcessFile(selectedFile);
                    }}
                    disabled={isProcessing}
                    className="flex items-center gap-1 font-semibold text-blue-700 hover:underline disabled:opacity-50"
                  >
                    Ré-analyser
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEXTE BRUT */}
          {activeTab === "text" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-ink">
                  Texte brut de votre CV ou profil LinkedIn :
                </label>
                <button
                  type="button"
                  onClick={() => handleProcessText(SAMPLE_RAW_TEXT)}
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Charger un exemple type →
                </button>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => handleProcessText(e.target.value)}
                rows={7}
                placeholder="Collez ici le texte brut de votre CV ou résumé LinkedIn..."
                className="w-full resize-none rounded-xl border border-line bg-sheet p-3 font-mono text-xs leading-relaxed text-ink outline-none focus:border-blue-600"
              />
            </div>
          )}

          {/* Indicateur de chargement */}
          {isProcessing && (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-blue-600/20 bg-signal/5 p-4 text-xs font-semibold text-blue-700">
              <Loader2 size={16} className="animate-spin" />
              <span>Extraction intelligente des entités en cours...</span>
            </div>
          )}

          {/* Message d'erreur */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-700">
              <AlertTriangle size={16} className="shrink-0 mt-0.5 text-red-600" />
              <div>
                <div className="font-bold">Erreur de lecture</div>
                <div>{errorMsg}</div>
              </div>
            </div>
          )}

          {/* RÉSULTAT DE L'EXTRACTION */}
          {result && !isProcessing && (
            <div className="space-y-4 rounded-xl border border-line bg-paper p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span className="font-display text-sm font-bold text-ink">
                    Données extraites avec succès
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-1 text-xs font-semibold text-mute hover:text-ink"
                >
                  <span>{showDetails ? "Masquer détails" : "Voir détails"}</span>
                  {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Aperçu rapide de la fiche identité extraite */}
              <div className="rounded-xl border border-line bg-sheet p-3 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <h4 className="font-display text-base font-bold text-ink">
                      {result.profile.name}
                    </h4>
                    <p className="text-xs font-semibold text-blue-700">
                      {result.profile.role}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] text-mute">
                    {result.profile.email && <span>✉ {result.profile.email}</span>}
                    {result.profile.phone && <span>• ☎ {result.profile.phone}</span>}
                    {result.profile.location && <span>• 📍 {result.profile.location}</span>}
                  </div>
                </div>

                {result.profile.summary && (
                  <p className="text-xs text-mute line-clamp-2 italic">
                    "{result.profile.summary}"
                  </p>
                )}

                {/* Badges de comptage */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-line/60">
                  <div className="flex items-center gap-2 rounded-lg bg-paper p-2 text-xs">
                    <Briefcase size={14} className="text-blue-700" />
                    <div>
                      <div className="font-bold text-ink">{result.stats.experiencesCount}</div>
                      <div className="text-[10px] text-mute">Expériences</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-paper p-2 text-xs">
                    <GraduationCap size={14} className="text-blue-700" />
                    <div>
                      <div className="font-bold text-ink">{result.stats.educationsCount}</div>
                      <div className="text-[10px] text-mute">Formations</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-paper p-2 text-xs">
                    <Tags size={14} className="text-blue-700" />
                    <div>
                      <div className="font-bold text-ink">{result.stats.skillsCount}</div>
                      <div className="text-[10px] text-mute">Compétences</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-paper p-2 text-xs">
                    <Languages size={14} className="text-blue-700" />
                    <div>
                      <div className="font-bold text-ink">{result.stats.languagesCount}</div>
                      <div className="text-[10px] text-mute">Langues</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Détails déroulants */}
              {showDetails && (
                <div className="space-y-3 pt-2 text-xs">
                  {/* Expériences */}
                  {result.profile.experiences.length > 0 && (
                    <div>
                      <div className="font-bold text-ink mb-1">Expériences détectées :</div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {result.profile.experiences.map((exp, i) => (
                          <div key={i} className="rounded-lg border border-line bg-sheet p-2">
                            <div className="flex justify-between font-semibold text-ink">
                              <span>{exp.role}</span>
                              <span className="text-[10px] text-mute font-mono">{exp.date}</span>
                            </div>
                            <div className="text-[11px] text-mute">{exp.company}</div>
                            {exp.desc && (
                              <div className="text-[10px] text-mute/80 line-clamp-2 mt-0.5">
                                {exp.desc}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formations */}
                  {result.profile.educations.length > 0 && (
                    <div>
                      <div className="font-bold text-ink mb-1">Formations & Diplômes :</div>
                      <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                        {result.profile.educations.map((edu, i) => (
                          <div key={i} className="rounded-lg border border-line bg-sheet p-2 flex justify-between">
                            <div>
                              <div className="font-semibold text-ink">{edu.degree}</div>
                              <div className="text-[10px] text-mute">{edu.school}</div>
                            </div>
                            <span className="text-[10px] text-mute font-mono">{edu.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Compétences tags */}
                  {result.profile.skills.length > 0 && (
                    <div>
                      <div className="font-bold text-ink mb-1">Compétences extraites :</div>
                      <div className="flex flex-wrap gap-1">
                        {result.profile.skills.map((s, i) => (
                          <span
                            key={i}
                            className="rounded-md border border-line bg-sheet px-2 py-0.5 text-[11px] font-medium text-ink"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remarques / Avertissements éventuels */}
                  {result.warnings.length > 0 && (
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 text-[11px] text-amber-800 space-y-1">
                      <div className="font-bold flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Observations :
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {result.warnings.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Sélection du gabarit de mise en page */}
              <div className="pt-2 border-t border-line space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">
                    Choisir la mise en page de destination :
                  </span>
                  <span className="text-[11px] text-mute">Format A4 Haute Définition</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={cn(
                        "rounded-xl border p-2 text-center transition",
                        selectedTemplate === tpl.id
                          ? "border-blue-600 bg-signal/10 font-bold text-blue-700 shadow-xs"
                          : "border-line bg-sheet text-mute hover:border-ink hover:text-ink",
                      )}
                    >
                      <div className="text-xs font-semibold leading-tight">{tpl.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer avec boutons d'actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-paper p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-line bg-sheet px-4 py-2 text-xs font-semibold text-mute hover:text-ink transition"
          >
            Annuler
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={!result || isProcessing}
              onClick={() => applyExtracted(true)}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-sheet px-4 py-2.5 text-xs font-semibold text-ink hover:bg-cream disabled:opacity-40 transition"
              title="Ajoute une nouvelle page avec ce profil sans toucher à la page actuelle"
            >
              <Layers size={14} />
              <span>Créer une nouvelle page</span>
            </button>

            <button
              type="button"
              disabled={!result || isProcessing}
              onClick={() => applyExtracted(false)}
              className="flex items-center gap-1.5 rounded-xl bg-signal px-5 py-2.5 text-xs font-bold text-signal-ink shadow-sm hover:bg-signal/90 disabled:opacity-40 transition"
            >
              <FileCheck size={14} />
              <span>Appliquer sur le CV (1 clic)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
