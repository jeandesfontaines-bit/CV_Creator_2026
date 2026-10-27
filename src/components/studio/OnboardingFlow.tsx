import { useState } from "react";
import { Upload, Sparkles, Layout, ArrowRight, User, Check, ArrowLeft } from "lucide-react";
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
  const [firstName, setFirstName] = useState("Alexandra");
  const [lastName, setLastName] = useState("Dubois");
  const [role, setRole] = useState("Product Designer Senior");

  const handleLaunchGuided = () => {
    let nextProfile = doc.profile;
    if (useCustomProfile) {
      nextProfile = {
        ...doc.profile,
        name: `${firstName} ${lastName}`.trim() || "Mon Nom",
        role: role || "Poste recherché",
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
              <span>← Retour aux modes</span>
            </button>
          )}
        </div>

        {/* ÉTAPE 1 : CHOIX DU PARCOURS */}
        {step === 1 && (
          <div className="space-y-8 text-center sm:text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
                <Sparkles size={14} />
                <span>Parcours d'entrée intelligent</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Comment souhaitez-vous créer votre CV ?
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Sélectionnez une option pour commencer. Vous pourrez à tout moment changer de mode ou affiner vos choix.
              </p>
            </div>

            {/* 3 Grandes Cartes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Carte 1 : Importer mon CV (IA) */}
              <button
                type="button"
                onClick={() => {
                  setOnboarding(false);
                  setEditorMode("guided");
                  setExtractorModalOpen(true);
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-6 text-left shadow-xl hover:border-blue-500 hover:bg-slate-900 transition-all hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                      <Upload size={24} />
                    </span>
                    <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-bold text-blue-400 border border-blue-500/30">
                      Le plus rapide
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-blue-400 transition">
                      📥 Importer mon CV actuel (IA)
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Glissez votre PDF ou Word : notre extracteur IA renseigne automatiquement toutes vos expériences et compétences.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition">
                  <span>Importer un fichier</span>
                  <ArrowRight size={14} />
                </div>
              </button>

              {/* Carte 2 : Créer un CV pas à pas (Mode Guidé) */}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-700 bg-slate-900 p-6 text-left shadow-xl hover:border-emerald-500 hover:bg-slate-900 transition-all hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                      <User size={24} />
                    </span>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      Recommandé
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-400 transition">
                      ✨ Créer un CV pas à pas (Mode Guidé)
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Choisissez votre style et votre métier de départ, puis éditez vos informations dans un formulaire en direct.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
                  <span>Choisir le style et le profil</span>
                  <ArrowRight size={14} />
                </div>
              </button>

              {/* Carte 3 : Mode Studio Pro (Liberté totale) */}
              <button
                type="button"
                onClick={() => {
                  setOnboarding(false);
                  setEditorMode("pro");
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-6 text-left shadow-xl hover:border-purple-500 hover:bg-slate-900 transition-all hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition">
                      <Layout size={24} />
                    </span>
                    <span className="rounded-full bg-purple-500/15 px-2.5 py-1 text-[10px] font-bold text-purple-400 border border-purple-500/30">
                      Pour les experts
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-purple-400 transition">
                      🎨 Mode Studio Pro (Liberté totale)
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ouvrez directement l'éditeur Canvas A4 complet pour tout personnaliser au pixel près, ajouter des formes et calques.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">
                  <span>Ouvrir l'éditeur Pro</span>
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : CHOISISSEZ VOTRE STYLE ET VOTRE PROFIL */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-extrabold text-white">
                Choisissez votre style et votre profil de départ
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Sélectionnez le modèle graphique et le métier de référence (ou entrez vos informations personnalisées).
              </p>
            </div>

            {/* 1. Sélection du modèle graphique */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Modèle graphique (Template A4)
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
                  2. Profil de départ
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
                        className="mt-1 h-10 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-300">Nom</span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                <span>🚀 Lancer l'éditeur (Mode Guidé)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
