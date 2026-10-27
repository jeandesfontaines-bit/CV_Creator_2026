import { useState } from "react";
import { Upload, FileText, UserRound, Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
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
    <div className="cv-onboarding flex h-dvh w-full items-center justify-center bg-paper text-ink px-5 py-6 sm:px-10 sm:py-8 select-none overflow-y-auto">
      <div className="w-full max-w-5xl space-y-10 animate-in fade-in duration-300 py-4 sm:py-8">
        {/* En-tête de marque */}
        <div className="flex items-center justify-between border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-cream">
              CV
            </span>
            <div>
              <h2 className="font-display text-base font-bold tracking-tight text-ink">CV Atelier</h2>
              <p className="text-xs text-mute">Votre CV, construit à votre mesure</p>
            </div>
          </div>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-cream px-3 py-1.5 text-xs font-semibold text-mute hover:bg-paper hover:text-ink transition"
            >
              <ArrowLeft size={14} />
              <span>Retour</span>
            </button>
          )}
        </div>

        {/* ÉTAPE 1 : POINT DE DÉPART DANS UN PARCOURS COMMUN */}
        {step === 1 && (
          <div className="mx-auto max-w-3xl space-y-7">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-transparent px-0 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-signal border-0">
                <Sparkles size={14} />
                <span>Étape 1 · Votre point de départ</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-ink">
                Refaire votre CV, à votre façon.
              </h1>
              <p className="text-sm sm:text-base text-mute leading-relaxed">
                On avance étape par étape. Dites-nous simplement ce que vous avez déjà ; vous pourrez choisir le niveau d’aide et de liberté ensuite.
              </p>
            </div>

            <section className="overflow-hidden rounded-2xl border border-line bg-cream shadow-sm">
              <h2 className="border-b border-line px-5 py-4 text-sm font-semibold text-ink">
                Qu’avez-vous déjà pour refaire votre CV ?
              </h2>
              <div className="divide-y divide-line">
                <button
                  type="button"
                  onClick={() => {
                    setOnboarding(false);
                    setEditorMode("guided");
                    setExtractorModalOpen(true);
                  }}
                  className="group flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-paper/70 sm:px-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper text-ink group-hover:bg-ink group-hover:text-cream transition">
                    <Upload size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">Un CV à reprendre</span>
                    <span className="mt-1 block text-xs leading-relaxed text-mute">Importez un PDF ou un Word, ou collez le texte pour récupérer votre contenu et retravailler le design.</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-mute group-hover:text-ink transition" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUseCustomProfile(true);
                    setStep(2);
                  }}
                  className="group flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-paper/70 sm:px-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper text-ink group-hover:bg-ink group-hover:text-cream transition">
                    <FileText size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">Mes informations, sans fichier</span>
                    <span className="mt-1 block text-xs leading-relaxed text-mute">Saisissez les éléments dont vous vous souvenez. Un exemple vous aide à voir quoi compléter.</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-mute group-hover:text-ink transition" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUseCustomProfile(false);
                    setStep(2);
                  }}
                  className="group flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-paper/70 sm:px-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper text-ink group-hover:bg-ink group-hover:text-cream transition">
                    <UserRound size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">J’ai besoin d’un exemple pour démarrer</span>
                    <span className="mt-1 block text-xs leading-relaxed text-mute">Choisissez un métier pour voir un CV déjà rempli. Les informations sont fictives et à remplacer.</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-mute group-hover:text-ink transition" />
                </button>
              </div>
            </section>

            <p className="flex items-start gap-2 rounded-xl border border-line px-4 py-3 text-xs leading-relaxed text-mute">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-mute" />
              <span>Quel que soit votre point de départ, vous retrouverez le même CV dans l’éditeur. Vous pourrez le remplir guidé, puis ajuster librement le design sans perdre vos modifications.</span>
            </p>
          </div>
        )}

        {/* ÉTAPE 2 : CHOISISSEZ VOTRE STYLE ET VOTRE PROFIL */}
        {step === 2 && (
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                      selectedTemplate === tpl.id
                        ? "border-signal bg-signal/10 text-ink shadow-md ring-1 ring-signal"
                        : "border-line bg-cream text-mute hover:border-line hover:bg-paper/80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-sm font-semibold">{tpl.name}</span>
                        {selectedTemplate === tpl.id && <Check size={14} className="text-signal" />}
                      </div>
                      <p className="text-[10px] text-mute leading-tight">{tpl.note}</p>
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
                        className="mt-1 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-signal"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-mute">Nom</span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Votre nom"
                        className="mt-1 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-signal"
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
                      className="mt-1 h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-signal"
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
                          ? "border-signal bg-signal/10 text-ink shadow-sm ring-1 ring-signal"
                          : "border-line bg-cream text-mute hover:border-line hover:bg-paper/80"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-paper px-1.5 py-0.5 text-[9px] font-mono text-mute">
                            {preset.category}
                          </span>
                          {selectedPresetId === preset.id && <Check size={14} className="text-signal" />}
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
                className="flex min-h-11 items-center gap-2 rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-signal/90 transition"
              >
                <span>Continuer avec mon CV</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
