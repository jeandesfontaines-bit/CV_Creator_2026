import { useState } from "react";
import { Upload, Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
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
          <span className="cv-brand-note">L’atelier du CV · 2026</span>
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
        <main className="cv-step-screen">
        {/* ÉTAPE 2 : CHOISISSEZ VOTRE STYLE ET VOTRE PROFIL */}
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Choisissez une base à personnaliser
              </h2>
              <p className="text-xs sm:text-sm text-mute">
                Vous pourrez modifier le contenu et le design ensuite. Les exemples servent de point de départ, pas de CV final.
              </p>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-line bg-cream px-4 py-3 text-xs leading-relaxed text-mute">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-mute" />
              <span>
                {useCustomProfile
                  ? "Votre CV sera préparé avec des repères à compléter : poste, expériences, formation et compétences. Vous ne commencerez pas devant une page vide."
                  : "Les coordonnées, expériences et diplômes du métier choisi sont fictifs. Remplacez-les par les vôtres avant d’envoyer le CV."}
              </span>
            </div>

            {/* 1. Sélection du modèle graphique */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-mute">
                1. Modèle de départ
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`cv-template-card flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                      selectedTemplate === tpl.id
                        ? "border-blue-600 bg-signal/10 text-ink shadow-md ring-1 ring-blue-600"
                        : "border-line bg-cream text-mute hover:border-line hover:bg-paper/80"
                    }`}
                  >
                    <div className="cv-template-thumb" data-layout={tpl.id} aria-hidden="true">
                      <div className="cv-template-page">
                        <div className="cv-template-heading" />
                        <div className="cv-template-subheading" />
                        <div className="cv-template-rule" />
                        <div className="cv-template-columns"><span><i /><i /><i /></span><span><i /><i /></span></div>
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-2 pt-3">
                      <div><span className="block font-display text-sm font-semibold text-ink">{tpl.name}</span><span className="mt-1 block text-[10px] leading-tight text-mute">{tpl.note}</span></div>
                      {selectedTemplate === tpl.id && <Check size={16} className="mt-0.5 shrink-0 text-blue-700" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Profil métier ou personnalisé */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-mute">
                  2. Contenu de départ
                </label>
                <button
                  type="button"
                  onClick={() => setUseCustomProfile(!useCustomProfile)}
                  className="text-xs font-semibold text-signal hover:underline"
                >
                  {useCustomProfile ? "← Choisir un modèle métier" : "+ Saisir mes propres infos"}
                </button>
              </div>

              {useCustomProfile ? (
                <div className="rounded-xl border border-line bg-cream p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-semibold text-mute">Prénom</span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Votre prénom"
                        className="mt-1 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-blue-600"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-mute">Nom</span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Votre nom"
                        className="mt-1 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-blue-600"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold text-mute">Intitulé du poste recherché</span>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ex. : infirmière, comptable, designer…"
                      className="mt-1 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-blue-600"
                    />
                  </label>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {JOB_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`flex flex-col justify-between rounded-xl border p-4 text-left transition ${
                        selectedPresetId === preset.id
                          ? "border-blue-600 bg-signal/10 text-ink shadow-sm ring-1 ring-blue-600"
                          : "border-line bg-cream text-mute hover:border-line hover:bg-paper/80"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-paper px-1.5 py-0.5 text-[9px] font-mono text-mute">
                            {preset.category}
                          </span>
                          {selectedPresetId === preset.id && <Check size={14} className="text-blue-700" />}
                        </div>
                        <div className="font-display text-sm font-bold pt-1">{preset.label}</div>
                        <div className="text-[10px] text-mute">{preset.badge}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton Lancer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border border-line bg-cream px-5 py-2.5 text-xs font-semibold text-mute hover:bg-paper transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleLaunchGuided}
                className="flex min-h-11 items-center gap-2 rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-signal-ink shadow-sm hover:bg-signal/90 transition"
              >
                <span>Continuer avec mon CV</span>
              </button>
            </div>
          </div>
      </main>
      )}
    </div>
  );
}
