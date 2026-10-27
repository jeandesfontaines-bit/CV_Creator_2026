import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useStudio } from "@/cv/store";
import { TEMPLATES } from "@/cv/templates";
import { JOB_PRESETS } from "@/cv/presets";
import type { TemplateId } from "@/cv/types";

export function OnboardingFlow() {
  const setOnboarding = useStudio((s) => s.setOnboarding);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const setExtractorModalOpen = useStudio((s) => s.setExtractorModalOpen);
  const loadDocument = useStudio((s) => s.loadDocument);
  const applyTemplate = useStudio((s) => s.applyTemplate);
  const doc = useStudio((s) => s.doc);

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("designer");
  const [useCustomProfile, setUseCustomProfile] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const selectedPreset = JOB_PRESETS.find((preset) => preset.id === selectedPresetId) ?? JOB_PRESETS[0];
  const previewName = useCustomProfile ? `${firstName} ${lastName}`.trim() || "Votre nom" : selectedPreset.profile.name;
  const previewRole = useCustomProfile ? role || "Votre métier" : selectedPreset.profile.role;

  const handleLaunchGuided = () => {
    let nextProfile = doc.profile;
    if (useCustomProfile) {
      nextProfile = {
        ...doc.profile,
        name: `${firstName} ${lastName}`.trim() || "Votre nom",
        role: role || "Votre métier",
        email: "Votre adresse e-mail",
        phone: "Votre téléphone",
        location: "Votre ville",
        link: "Votre lien professionnel",
        summary: "Présentez votre parcours, vos points forts et le poste recherché.",
        experiences: [
          {
            role: "Votre poste",
            company: "Entreprise · Ville",
            date: "Dates",
            desc: "Décrivez vos missions et vos résultats.",
          },
        ],
        educations: [{ degree: "Votre diplôme", school: "Établissement", date: "Années" }],
        skills: ["Compétence 1", "Compétence 2", "Compétence 3"],
        languages: [{ label: "Votre langue", value: 70 }],
      };
    } else {
      const preset = JOB_PRESETS.find((p) => p.id === selectedPresetId);
      if (preset) {
        nextProfile = structuredClone(preset.profile);
      }
    }

    loadDocument({
      ...doc,
      profile: nextProfile,
    });
    applyTemplate(selectedTemplate);
    setOnboarding(false);
    setEditorMode("guided");
  };

  return (
    <div className="cv-onboarding-shell min-h-dvh w-full overflow-y-auto">
      <header className="cv-brandbar">
        <div className="cv-wordmark">
          <span className="cv-wordmark-mark">L.</span>
          <span>LIBRE <span className="font-normal opacity-60">/ CV STUDIO</span></span>
        </div>
        <div className="flex items-center gap-5">
          <span className="cv-brand-note hidden sm:block">L’atelier du CV · 2026</span>
          {step === 2 && (
            <button type="button" onClick={() => setStep(1)} className="flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white transition hover:border-signal hover:text-signal">
              <ArrowLeft size={14} /> Retour
            </button>
          )}
        </div>
      </header>

      {step === 1 && (
        <main className="cv-welcome-grid">
          <section className="cv-welcome-copy">
            <div className="cv-eyebrow">On commence par votre parcours</div>
            <h1 className="cv-welcome-title">Un CV.<br />Vos <em>règles.</em></h1>
            <p className="cv-welcome-lede">
              Vous refaites votre CV. On part de ce que vous avez déjà, puis vous décidez jusqu’où vous voulez pousser chaque détail.
            </p>

            <div className="cv-start-list" aria-label="Choisissez votre point de départ">
              <button type="button" onClick={() => { setOnboarding(false); setEditorMode("guided"); setExtractorModalOpen(true); }} className="cv-start-choice group">
                <span className="cv-start-number">01</span>
                <span><span className="cv-start-title">J’ai déjà un CV</span><span className="cv-start-detail">Importez-le ou collez son contenu, puis refaites sa mise en page.</span></span>
                <ArrowRight className="cv-start-arrow" size={18} />
              </button>
              <button type="button" onClick={() => { setUseCustomProfile(true); setStep(2); }} className="cv-start-choice group">
                <span className="cv-start-number">02</span>
                <span><span className="cv-start-title">J’ai des infos à rassembler</span><span className="cv-start-detail">On vous guide pour remettre votre parcours en forme.</span></span>
                <ArrowRight className="cv-start-arrow" size={18} />
              </button>
              <button type="button" onClick={() => { setUseCustomProfile(false); setStep(2); }} className="cv-start-choice group">
                <span className="cv-start-number">03</span>
                <span><span className="cv-start-title">Je veux une base pour me lancer</span><span className="cv-start-detail">Partez d’un exemple concret, à remplacer par votre histoire.</span></span>
                <ArrowRight className="cv-start-arrow" size={18} />
              </button>
            </div>
            <p className="cv-one-journey"><span aria-hidden="true">↳</span> Le même CV vous suit partout : avancez guidé, puis passez aux réglages libres quand vous le souhaitez.</p>
          </section>

          <aside className="cv-visual-stage" aria-label="Aperçu d’un CV personnalisable">
            <span className="cv-stage-label">EXEMPLE VISUEL · CONTENU FICTIF</span>
            <div className="cv-sample-sheet" aria-hidden="true">
              <div className="cv-sheet-kicker">CURRICULUM VITAE</div>
              <div className="cv-sheet-name">Camille<br />Martin</div>
              <div className="cv-sheet-role">DIRECTION ARTISTIQUE</div>
              <div className="cv-sheet-rule" />
              <div className="cv-sheet-section">À PROPOS</div>
              <div className="cv-sheet-line" /><div className="cv-sheet-line medium" /><div className="cv-sheet-line short" />
              <div className="cv-sheet-section">EXPÉRIENCE</div>
              <div className="cv-sheet-line medium" /><div className="cv-sheet-line" /><div className="cv-sheet-line short" />
              <div className="cv-sheet-section">SAVOIR-FAIRE</div>
              <div className="cv-sheet-line" /><div className="cv-sheet-line medium" />
            </div>
            <div className="cv-stage-sticker">LIBRE<br />DE BOUGER<br />LES LIGNES</div>
            <span className="cv-stage-index">APERÇU DE MISE EN PAGE · 01</span>
          </aside>
        </main>
      )}

      {step === 2 && (
        <main className="cv-builder-grid">
          <aside className="cv-step-nav" aria-label="Étapes de création du CV">
            <div className="cv-steps-caption">VOTRE PARCOURS</div>
            <div className="cv-step-item is-done"><span>01</span><div><b>Point de départ</b><small>Ce que vous avez déjà</small></div><Check size={15} /></div>
            <div className="cv-step-item is-current"><span>02</span><div><b>Style & contenu</b><small>À votre façon</small></div></div>
            <div className="cv-steps-note"><span className="cv-steps-note-mark">↗</span><p>Un seul CV.<br />Toute la liberté de le faire vôtre.</p></div>
          </aside>

          <section className="cv-template-workspace">
            <div className="cv-gallery-heading">
              <span className="cv-eyebrow">02 / VOTRE MISE EN PAGE</span>
              <h1>Choisissez un<br /><em>terrain de jeu.</em></h1>
              <p>Chaque modèle est un point de départ. Vous pourrez déplacer, redimensionner et transformer les éléments ensuite.</p>
            </div>
            <div className="cv-gallery-toolbar"><span>LES MODÈLES</span><span>{TEMPLATES.length} BASES · TOUTES MODIFIABLES</span></div>
            <div className="cv-template-gallery">
              {TEMPLATES.map((tpl, index) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tpl.id)}
                  aria-pressed={selectedTemplate === tpl.id}
                  className={`cv-template-card ${selectedTemplate === tpl.id ? "is-selected" : ""}`}
                >
                  <div className="cv-template-thumb" data-layout={tpl.id} aria-hidden="true">
                    <div className="cv-template-page">
                      <div className="cv-template-heading" />
                      <div className="cv-template-subheading" />
                      <div className="cv-template-rule" />
                      <div className="cv-template-columns"><span><i /><i /><i /></span><span><i /><i /></span></div>
                    </div>
                    <span className="cv-template-index">0{index + 1}</span>
                  </div>
                  <div className="cv-template-caption"><span><b>{tpl.name}</b><small>{tpl.note}</small></span>{selectedTemplate === tpl.id && <Check size={17} />}</div>
                </button>
              ))}
            </div>
          </section>

          <aside className="cv-side-column">
            <section className="cv-preview-card">
              <div className="cv-preview-topline"><span>APERÇU EN DIRECT</span><span className="cv-live-dot" />
              </div>
              <div className="cv-live-paper" data-layout={selectedTemplate}>
                <div className="cv-live-paper-head"><div><small>CURRICULUM VITAE</small><h2>{previewName || "Votre nom"}</h2><p>{previewRole || "Votre métier"}</p></div><span className="cv-live-avatar">{previewName.slice(0, 1).toUpperCase()}</span></div>
                <div className="cv-live-paper-section"><b>PROFIL</b><i /><i /><i className="short" /></div>
                <div className="cv-live-paper-section"><b>EXPÉRIENCE</b><i /><i /><i /><i className="medium" /></div>
                <div className="cv-live-paper-section"><b>COMPÉTENCES</b><div className="cv-live-tags"><i /><i /><i /></div></div>
              </div>
              <div className="cv-preview-footer"><span>{TEMPLATES.find((tpl) => tpl.id === selectedTemplate)?.name}</span><span>A4 · PERSONNALISABLE</span></div>
            </section>

            <section className="cv-content-card">
              <div className="cv-content-heading"><span>VOTRE CONTENU</span><span>CHOISISSEZ VOTRE DÉPART</span></div>
              <div className="cv-content-switch" role="group" aria-label="Contenu de départ">
                <button type="button" onClick={() => setUseCustomProfile(true)} className={useCustomProfile ? "is-active" : ""}>Mes infos</button>
                <button type="button" onClick={() => setUseCustomProfile(false)} className={!useCustomProfile ? "is-active" : ""}>Un exemple</button>
              </div>
              {useCustomProfile ? (
                <div className="cv-content-fields">
                  <label>PRÉNOM<input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Ex. : Alex" /></label>
                  <label>NOM<input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Ex. : Martin" /></label>
                  <label className="cv-field-wide">POSTE VISÉ<input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Ex. : architecte, infirmier…" /></label>
                  <p>Vous pourrez compléter vos expériences et votre formation dans l’éditeur.</p>
                </div>
              ) : (
                <div className="cv-content-fields">
                  <label className="cv-field-wide">EXEMPLE DE PARCOURS
                    <select value={selectedPresetId} onChange={(event) => setSelectedPresetId(event.target.value)}>
                      {JOB_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
                    </select>
                  </label>
                  <p>Contenu fictif, à remplacer. Vous pourrez modifier chaque ligne du modèle.</p>
                </div>
              )}
              <button type="button" onClick={handleLaunchGuided} className="cv-continue-button">Continuer dans l’éditeur <ArrowRight size={17} /></button>
              <p className="cv-free-note"><Sparkles size={13} /> Guidage maintenant, studio libre dès que vous le voulez.</p>
            </section>
          </aside>
        </main>
      )}
    </div>
  );
}
