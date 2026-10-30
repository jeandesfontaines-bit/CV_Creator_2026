import { useMemo, useState } from "react";
import { ArrowRight, Check, FileUp, FolderOpen, Plus, Sparkles } from "lucide-react";
import { PageSheet } from "@/components/studio/PageSheet";
import { useStudio } from "@/cv/store";
import { JOB_PRESETS } from "@/cv/presets";
import { buildTemplate, TEMPLATES } from "@/cv/templates";
import type { Page, Profile, TemplateId } from "@/cv/types";

type StartMode = "resume" | "guided" | "example";
function blankProfile(): Profile {
  return { name: "", role: "", email: "", phone: "", location: "", link: "", summary: "", experiences: [], educations: [], skills: [], languages: [] };
}

export function OnboardingFlow() {
  const s = useStudio();
  const [startMode, setStartMode] = useState<StartMode>("resume");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(s.activeTemplate);
  const [selectedPresetId, setSelectedPresetId] = useState("designer");
  const selectedPreset = JOB_PRESETS.find((preset) => preset.id === selectedPresetId) ?? JOB_PRESETS[0];
  // Fictional data is used only for a clearly labelled template demonstration.
  const previewProfile = useMemo(() => startMode === "resume" ? s.doc.profile : selectedPreset.profile, [startMode, s.doc.profile, selectedPreset.profile]);
  const pageFor = (templateId: TemplateId, prefix: string): Page => ({
    id: prefix, name: "Aperçu", background: "#ffffff", elements: buildTemplate(templateId, previewProfile, prefix),
  });
  const openCurrent = (mode: "guided" | "pro") => {
    s.release();
    s.setEditorMode(mode);
    s.setOnboarding(false);
  };
  const createDocument = () => {
    const nextProfile = startMode === "example" ? structuredClone(selectedPreset.profile) : blankProfile();
    const apply = () => {
      s.setConfirmModal(null);
      s.release();
      s.importExtractedProfile(nextProfile, selectedTemplate);
      s.setEditorMode("guided");
      s.setOnboarding(false);
    };
    const p = s.doc.profile;
    const hasContent = [p.name, p.role, p.email, p.phone, p.location, p.link, p.summary].some((value) => value.trim()) || p.experiences.length > 0 || p.educations.length > 0 || p.skills.length > 0 || p.languages.length > 0;
    const hasLayout = s.layoutCustomized || s.doc.pages.length > 1;
    if (hasContent || hasLayout) {
      s.setConfirmModal({
        title: startMode === "example" ? "Charger ce parcours fictif ?" : "Créer un nouveau CV ?",
        message: "Cette action remplace le CV actuellement ouvert et sa mise en page. Elle ne crée pas une deuxième sauvegarde séparée. Annulez pour conserver le CV actuel ou téléchargez-le avant de continuer.",
        confirmLabel: startMode === "example" ? "Remplacer par cet exemple" : "Remplacer par un CV vide",
        variant: "warning", onConfirm: apply,
      });
    } else apply();
  };
  const launch = () => startMode === "resume" ? openCurrent("guided") : createDocument();
  const cta = startMode === "resume" ? "Reprendre mon CV" : startMode === "example" ? "Explorer cet exemple fictif" : "Créer mon CV";

  return <div className="cv-onboarding-shell min-h-dvh w-full overflow-y-auto">
    <header className="cv-brandbar">
      <div className="cv-wordmark"><span className="cv-wordmark-mark">L.</span><span>LIBRE <span className="cv-brand-suffix">CV STUDIO</span></span></div>
      <div className="cv-brand-progress"><span className="cv-progress-dot" /> Votre espace de création</div>
      <div className="flex items-center gap-2">
        <button type="button" data-testid="onboarding-import-cv-btn" onClick={() => s.setExtractorModalOpen(true)} className="cv-header-action"><FileUp size={15} /> Importer mon CV</button>
        <button type="button" onClick={() => openCurrent("pro")} className="cv-header-action">Ouvrir le Studio <ArrowRight size={15} /></button>
      </div>
    </header>
    <main className="cv-workbench">
      <section className="cv-workspace-main">
        <div className="cv-workspace-heading">
          <div className="cv-eyebrow">VOTRE POINT DE DÉPART</div>
          <h1>Votre CV, <em>à votre façon.</em></h1>
          <p>Reprenez votre travail ou commencez avec une base visuelle. La saisie guidée et le Studio restent accessibles à tout moment.</p>
        </div>
        <section className="cv-start-panel" aria-labelledby="start-heading">
          <div className="cv-section-title"><span>01</span><div><h2 id="start-heading">Par où souhaitez-vous commencer ?</h2><p>Aucune information personnelle à ressaisir ici.</p></div></div>
          <div className="cv-start-options" role="group" aria-label="Point de départ">
            <button type="button" data-testid="onboarding-resume-btn" aria-pressed={startMode === "resume"} onClick={() => setStartMode("resume")} className={`cv-start-option ${startMode === "resume" ? "is-selected" : ""}`}>
              <FolderOpen size={18} /><span><b>Reprendre le CV ouvert</b><small>Conserver son contenu et sa mise en page</small></span>{startMode === "resume" && <Check size={16} />}
            </button>
            <button type="button" data-testid="onboarding-new-btn" aria-pressed={startMode === "guided"} onClick={() => setStartMode("guided")} className={`cv-start-option ${startMode === "guided" ? "is-selected" : ""}`}>
              <Plus size={18} /><span><b>Créer mon CV</b><small>Un modèle, puis vos propres informations</small></span>{startMode === "guided" && <Check size={16} />}
            </button>
            <button type="button" onClick={() => s.setExtractorModalOpen(true)} className="cv-start-option">
              <FileUp size={18} /><span><b>Importer mon CV</b><small>PDF, Word (.docx), TXT ou texte LinkedIn</small></span>
            </button>
            <button type="button" data-testid="onboarding-example-btn" aria-pressed={startMode === "example"} onClick={() => setStartMode("example")} className={`cv-start-option ${startMode === "example" ? "is-selected" : ""}`}>
              <Sparkles size={18} /><span><b>Explorer un exemple fictif</b><small>Comprendre la structure avant de rédiger</small></span>{startMode === "example" && <Check size={16} />}
            </button>
          </div>
          {startMode === "resume" && <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-slate-900"><p className="font-semibold">{s.doc.profile.name || "CV actuellement ouvert"}</p><p className="mt-1 text-sm text-slate-500">{s.doc.profile.role || "Votre brouillon"} · {s.doc.pages.length} page{s.doc.pages.length > 1 ? "s" : ""}</p><p className="mt-2 text-sm text-slate-600">Reprendre ne change ni le modèle, ni vos textes, ni vos blocs personnalisés.</p></div>}
          {startMode === "guided" && <p className="cv-import-hint">Votre nouveau CV commencera sans expérience, diplôme ou chiffre prérempli. Vous renseignerez vos informations dans l’éditeur. Les données de démonstration de l’aperçu ne seront pas enregistrées.</p>}
          {startMode === "example" && <div><label className="cv-preset-field">EXEMPLE FICTIF À EXPLORER<select value={selectedPresetId} onChange={(event) => setSelectedPresetId(event.target.value)}>{JOB_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}</select></label><p className="cv-import-hint">Ce parcours, ses entreprises et ses chiffres sont fictifs. Ils servent uniquement d’exemple et doivent être remplacés par vos informations réelles avant envoi.</p></div>}
          <button type="button" data-testid="onboarding-continue-btn" onClick={launch} className="cv-continue-button">{cta}<ArrowRight size={17} /></button>
        </section>
        {startMode !== "resume" && <section className="cv-model-section" aria-labelledby="models-heading">
          <div className="cv-section-title"><span>02</span><div><h2 id="models-heading">Choisissez une base visuelle</h2><p>Modèles présentés avec un parcours fictif pour illustrer leur apparence.</p></div><span className="cv-model-count">{TEMPLATES.length} MODÈLES</span></div>
          <div className="cv-template-gallery">{TEMPLATES.map((template) => <button key={template.id} type="button" onClick={() => setSelectedTemplate(template.id)} aria-pressed={selectedTemplate === template.id} className={`cv-template-card ${selectedTemplate === template.id ? "is-selected" : ""}`}>
            <span className="cv-template-thumb" aria-hidden="true"><span className="cv-sheet-scale-thumb"><PageSheet page={pageFor(template.id, `gallery-${template.id}`)} interactive={false} selectedIds={[]} editingId={null} showGrid={false} showMargins={false} guides={{ x: [], y: [] }} marquee={null} /></span></span>
            <span className="cv-template-caption"><b>{template.name}</b><small>{template.note}</small>{selectedTemplate === template.id && <Check size={15} />}</span>
          </button>)}</div>
        </section>}
      </section>
      <aside className="cv-preview-column"><div className="cv-preview-sticky">
        <div className="cv-preview-heading"><span><i /> {startMode === "resume" ? "CV ACTUEL — PAGE 1" : "DÉMONSTRATION FICTIVE"}</span><small>A4</small></div>
        <div className="cv-preview-stage"><span className="cv-sheet-scale-live"><PageSheet page={startMode === "resume" ? s.doc.pages[0] : pageFor(selectedTemplate, `live-${selectedTemplate}`)} interactive={false} selectedIds={[]} editingId={null} showGrid={false} showMargins={false} guides={{ x: [], y: [] }} marquee={null} /></span></div>
        <div className="cv-preview-caption"><b>{previewProfile.name || "Votre CV"}</b><span>{startMode === "resume" ? previewProfile.role : "Exemple de présentation — données fictives"}</span></div>
        <p className="cv-free-note">Simple pour commencer. Libre quand vous le souhaitez.</p>
      </div></aside>
    </main>
  </div>;
}
