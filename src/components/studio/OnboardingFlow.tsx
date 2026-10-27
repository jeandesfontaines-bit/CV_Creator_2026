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
    <div className="flex h-dvh w-full items-center justify-center bg-slate-950 text-slate-100 p-4 sm:p-6 select-none overflow-y-auto">
      <div className="w-full max-w-5xl space-y-8 animate-in fade-in zoom-in-95 duration-300 py-8">
        {/* En-tête de marque */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600 font-display text-sm font-black text-white shadow-lg shadow-blue-600/30">
              CV
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight text-white">CV Studio Pro</h2>
              <p className="text-xs text-slate-400">Éditeur intelligent et conception A4 haute précision</p>
            </div>
          </div>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
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
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1 text-xs font-bold text-slate-300 border border-slate-700">
                <Sparkles size={14} />
                <span>Étape 1 · Votre point de départ</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Refaire votre CV, à votre façon.
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                On avance étape par étape. Dites-nous simplement ce que vous avez déjà ; vous pourrez choisir le niveau d’aide et de liberté ensuite.
              </p>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
              <h2 className="border-b border-slate-800 px-5 py-4 text-sm font-semibold text-white">
                Qu’avez-vous déjà pour refaire votre CV ?
              </h2>
              <div className="divide-y divide-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setOnboarding(false);
                    setEditorMode("guided");
                    setExtractorModalOpen(true);
                  }}
                  className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-200 group-hover:bg-signal group-hover:text-signal-ink transition">
                    <Upload size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">Un CV à reprendre</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-400">Importez un PDF ou un Word, ou collez le texte pour récupérer votre contenu et retravailler le design.</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-slate-500 group-hover:text-white transition" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUseCustomProfile(true);
                    setStep(2);
                  }}
                  className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-200 group-hover:bg-signal group-hover:text-signal-ink transition">
                    <FileText size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">Mes informations, sans fichier</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-400">Saisissez les éléments dont vous vous souvenez. Un exemple vous aide à voir quoi compléter.</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-slate-500 group-hover:text-white transition" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUseCustomProfile(false);
                    setStep(2);
                  }}
                  className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-200 group-hover:bg-signal group-hover:text-signal-ink transition">
                    <UserRound size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">J’ai besoin d’un exemple pour démarrer</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-400">Choisissez un métier pour voir un CV déjà rempli. Les informations sont fictives et à remplacer.</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-slate-500 group-hover:text-white transition" />
                </button>
              </div>
            </section>

            <p className="flex items-start gap-2 rounded-xl border border-slate-800 px-4 py-3 text-xs leading-relaxed text-slate-400">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-slate-300" />
              <span>Quel que soit votre point de départ, vous retrouverez le même CV dans l’éditeur. Vous pourrez le remplir guidé, puis ajuster librement le design sans perdre vos modifications.</span>
            </p>
          </div>
        )}

        {/* ÉTAPE 2 : CHOISISSEZ VOTRE STYLE ET VOTRE PROFIL */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-extrabold text-white">
                Choisissez une base à personnaliser
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Vous pourrez modifier le contenu et le design ensuite. Les exemples servent de point de départ, pas de CV final.
              </p>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-xs leading-relaxed text-slate-300">
              <Sparkles size={15} className="mt-0.5 shrink-0 text-slate-400" />
              <span>
                {useCustomProfile
                  ? "Votre CV sera préparé avec des repères à compléter : poste, expériences, formation et compétences. Vous ne commencerez pas devant une page vide."
                  : "Les coordonnées, expériences et diplômes du métier choisi sont fictifs. Remplacez-les par les vôtres avant d’envoyer le CV."}
              </span>
            </div>

            {/* 1. Sélection du modèle graphique */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
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
                        ? "border-blue-500 bg-blue-500/10 text-white shadow-md ring-1 ring-blue-500"
                        : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-xs font-bold">{tpl.name}</span>
                        {selectedTemplate === tpl.id && <Check size={14} className="text-blue-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">{tpl.note}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Profil métier ou personnalisé */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  2. Contenu de départ
                </label>
                <button
                  type="button"
                  onClick={() => setUseCustomProfile(!useCustomProfile)}
                  className="text-xs font-semibold text-blue-400 hover:underline"
                >
                  {useCustomProfile ? "← Choisir un modèle métier" : "+ Saisir mes propres infos"}
                </button>
              </div>

              {useCustomProfile ? (
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-300">Prénom</span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Votre prénom"
                        className="mt-1 h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-300">Nom</span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Votre nom"
                        className="mt-1 h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-300">Intitulé du poste recherché</span>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ex. : infirmière, comptable, designer…"
                      className="mt-1 h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-blue-500"
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
                          ? "border-emerald-500 bg-emerald-500/10 text-white shadow-md ring-1 ring-emerald-500"
                          : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-300">
                            {preset.category}
                          </span>
                          {selectedPresetId === preset.id && <Check size={14} className="text-emerald-400" />}
                        </div>
                        <div className="font-display text-sm font-bold pt-1">{preset.label}</div>
                        <div className="text-[10px] text-slate-400">{preset.badge}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton Lancer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleLaunchGuided}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
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
