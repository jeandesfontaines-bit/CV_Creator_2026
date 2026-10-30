import { useMemo, useState } from "react";
import { ArrowDownToLine, ArrowRight, Check, FileUp, Sparkles } from "lucide-react";
import { PageSheet } from "@/components/studio/PageSheet";
import { useStudio } from "@/cv/store";
import { JOB_PRESETS } from "@/cv/presets";
import { buildTemplate, TEMPLATES } from "@/cv/templates";
import type { Page, TemplateId } from "@/cv/types";

type StartMode = "import" | "guided" | "example";

export function OnboardingFlow() {
  const setOnboarding = useStudio((s) => s.setOnboarding);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const setExtractorModalOpen = useStudio((s) => s.setExtractorModalOpen);
  const loadDocument = useStudio((s) => s.loadDocument);
  const applyTemplate = useStudio((s) => s.applyTemplate);
  const setIdentity = useStudio((s) => s.setIdentity);
  const activeTemplate = useStudio((s) => s.activeTemplate);
  const doc = useStudio((s) => s.doc);

  const [startMode, setStartMode] = useState<StartMode>("guided");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(activeTemplate);
  const [selectedPresetId, setSelectedPresetId] = useState("designer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const selectedPreset = JOB_PRESETS.find((preset) => preset.id === selectedPresetId) ?? JOB_PRESETS[0];
  const typedName = `${firstName} ${lastName}`.trim();
  const previewProfile = useMemo(
    () => ({
      ...(startMode === "example" ? selectedPreset.profile : doc.profile),
      name: startMode === "example" ? selectedPreset.profile.name : typedName || doc.profile.name || "Votre nom",
      role: startMode === "example" ? selectedPreset.profile.role : role.trim() || doc.profile.role || "Votre métier",
    }),
    [doc.profile, role, selectedPreset.profile, startMode, typedName],
  );

  const pageFor = (templateId: TemplateId, prefix: string): Page => ({
    id: prefix,
    name: "Aperçu",
    background: "#ffffff",
    elements: buildTemplate(templateId, previewProfile, prefix),
  });

  const launchEditor = () => {
    if (startMode === "import") {
      setExtractorModalOpen(true);
      return;
    }

    if (startMode === "example") {
      const profile = structuredClone(selectedPreset.profile);
      loadDocument({ ...doc, profile });
      applyTemplate(selectedTemplate);
      setOnboarding(false);
      setEditorMode("guided");
      return;
    }

    // Mode guidé : conserver toutes les informations existantes du candidat
    if (typedName) setIdentity("name", typedName);
    if (role.trim()) setIdentity("role", role.trim());
    if (selectedTemplate !== activeTemplate) {
      applyTemplate(selectedTemplate);
    }
    setOnboarding(false);
    setEditorMode("guided");
  };

  return (
    <div className="cv-onboarding-shell min-h-dvh w-full overflow-y-auto">
      <header className="cv-brandbar">
        <div className="cv-wordmark"><span className="cv-wordmark-mark">L.</span><span>LIBRE <span className="cv-brand-suffix">CV STUDIO</span></span></div>
        <div className="cv-brand-progress"><span className="cv-progress-dot" /> Votre CV · brouillon</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-testid="onboarding-import-cv-btn"
            onClick={() => setExtractorModalOpen(true)}
            className="cv-header-action"
          >
            <FileUp size={15} /> Importer mon CV
          </button>
          <button type="button" onClick={launchEditor} className="cv-header-action">Ouvrir le studio <ArrowRight size={15} /></button>
        </div>
      </header>

      <main className="cv-workbench">
        <section className="cv-workspace-main">
          <div className="cv-workspace-heading">
            <div className="cv-eyebrow">ATELIER DE CRÉATION <span>01 — 01</span></div>
            <h1>Votre CV, <em>à votre façon.</em></h1>
            <p>Partez de ce que vous avez. Le contenu et la mise en page restent modifiables ensemble.</p>
          </div>

          <section className="cv-start-panel" aria-labelledby="start-heading">
            <div className="cv-section-title"><span>01</span><div><h2 id="start-heading">Qu’avez-vous déjà ?</h2><p>Vous pourrez changer de méthode dans l’éditeur.</p></div></div>
            <div className="cv-start-options" role="group" aria-label="Point de départ">
              <button
                type="button"
                aria-pressed={startMode === "import"}
                onClick={() => {
                  setStartMode("import");
                  setExtractorModalOpen(true);
                }}
                className={`cv-start-option ${startMode === "import" ? "is-selected" : ""}`}
              >
                <FileUp size={18} /><span><b>Importer mon CV</b><small>PDF, Word (.docx), TXT ou LinkedIn</small></span>{startMode === "import" && <Check size={16} />}
              </button>
              <button type="button" aria-pressed={startMode === "guided"} onClick={() => setStartMode("guided")} className={`cv-start-option ${startMode === "guided" ? "is-selected" : ""}`}>
                <ArrowDownToLine size={18} /><span><b>Quelques infos</b><small>Être guidé pour le construire</small></span>{startMode === "guided" && <Check size={16} />}
              </button>
              <button type="button" aria-pressed={startMode === "example"} onClick={() => setStartMode("example")} className={`cv-start-option ${startMode === "example" ? "is-selected" : ""}`}>
                <Sparkles size={18} /><span><b>Besoin d’un exemple</b><small>Partir d’un parcours fictif</small></span>{startMode === "example" && <Check size={16} />}
              </button>
            </div>
            {startMode === "guided" && (
              <div className="cv-start-fields">
                <label>PRÉNOM<input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Ex. Alex" /></label>
                <label>NOM<input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Ex. Martin" /></label>
                <label className="cv-field-wide">MÉTIER OU POSTE VISÉ<input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Ex. architecte, infirmier…" /></label>
              </div>
            )}
            {startMode === "example" && (
              <label className="cv-preset-field">CHOISIR UN EXEMPLE
                <select value={selectedPresetId} onChange={(event) => setSelectedPresetId(event.target.value)}>
                  {JOB_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
                </select>
              </label>
            )}
            {startMode === "import" && <p className="cv-import-hint">Votre fichier sera importé dans cet atelier. Vous pourrez corriger le texte et refaire toute la mise en page ensuite.</p>}
          </section>

          <section className="cv-model-section" aria-labelledby="models-heading">
            <div className="cv-section-title"><span>02</span><div><h2 id="models-heading">Choisissez une base visuelle</h2><p>Ce sont des modèles de départ, pas des cadres figés.</p></div><span className="cv-model-count">{TEMPLATES.length} MODÈLES</span></div>
            <div className="cv-template-gallery">
              {TEMPLATES.map((template) => (
                <button key={template.id} type="button" onClick={() => setSelectedTemplate(template.id)} aria-pressed={selectedTemplate === template.id} className={`cv-template-card ${selectedTemplate === template.id ? "is-selected" : ""}`}>
                  <span className="cv-template-thumb" aria-hidden="true"><span className="cv-sheet-scale-thumb"><PageSheet page={pageFor(template.id, `gallery-${template.id}`)} interactive={false} selectedIds={[]} editingId={null} showGrid={false} showMargins={false} guides={{ x: [], y: [] }} marquee={null} /></span></span>
                  <span className="cv-template-caption"><b>{template.name}</b><small>{template.note}</small>{selectedTemplate === template.id && <Check size={15} />}</span>
                </button>
              ))}
            </div>
          </section>
        </section>

        <aside className="cv-preview-column">
          <div className="cv-preview-sticky">
            <div className="cv-preview-heading"><span><i /> APERÇU EN DIRECT</span><small>A4 · {TEMPLATES.find((template) => template.id === selectedTemplate)?.name}</small></div>
            <div className="cv-preview-stage"><span className="cv-sheet-scale-live"><PageSheet page={pageFor(selectedTemplate, `live-${selectedTemplate}`)} interactive={false} selectedIds={[]} editingId={null} showGrid={false} showMargins={false} guides={{ x: [], y: [] }} marquee={null} /></span></div>
            <div className="cv-preview-caption"><b>{previewProfile.name}</b><span>{previewProfile.role}</span></div>
            <button type="button" onClick={launchEditor} className="cv-continue-button">{startMode === "import" ? "Importer mon CV" : "Continuer dans l’éditeur"}<ArrowRight size={17} /></button>
            <p className="cv-free-note">Le mode guidé et les réglages libres restent accessibles dans le même CV.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
