import { useState } from "react";
import { Upload, Sparkles, Layout, ArrowRight, User } from "lucide-react";
import { useStudio } from "@/cv/store";

export function Onboarding() {
  const setOnboarding = useStudio((s) => s.setOnboarding);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const setExtractorModalOpen = useStudio((s) => s.setExtractorModalOpen);
  const loadDocument = useStudio((s) => s.loadDocument);
  const doc = useStudio((s) => s.doc);

  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [firstName, setFirstName] = useState("Alexandra");
  const [lastName, setLastName] = useState("Dubois");
  const [role, setRole] = useState("Product Designer Senior");

  const handleStartGuided = (useSample: boolean) => {
    if (useSample) {
      setOnboarding(false);
      setEditorMode("guided");
      return;
    }
    // Create new doc with custom name & role
    const profile = {
      ...doc.profile,
      name: `${firstName} ${lastName}`.trim() || "Mon Nom",
      role: role || "Intitulé du poste",
    };
    loadDocument({
      ...doc,
      profile,
    });
    setOnboarding(false);
    setEditorMode("guided");
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-slate-900 text-slate-100 p-6 select-none overflow-y-auto">
      <div className="w-full max-w-4xl space-y-8 text-center animate-in fade-in zoom-in-95 duration-300 py-10">
        {/* En-tête */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
            <Sparkles size={14} />
            <span>Studio CV Professionnel & Extracteur IA</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Créez un CV d'exception en quelques secondes
          </h1>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-400">
            Choisissez votre méthode pour démarrer : importez votre CV existant, créez-le pas à pas, ou lancez le studio graphique pro.
          </p>
        </div>

        {/* 3 Cartes principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {/* Carte 1 : Importer */}
          <button
            type="button"
            onClick={() => {
              setOnboarding(false);
              setEditorMode("guided");
              setExtractorModalOpen(true);
            }}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-800/80 p-6 shadow-xl hover:border-blue-500 hover:bg-slate-800 transition text-left"
          >
            <div className="space-y-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                <Upload size={24} />
              </span>
              <div className="space-y-1">
                <span className="inline-block rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                  Recommandé
                </span>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-blue-400 transition">
                  📥 Importer mon CV actuel
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Glissez un fichier PDF ou Word (.docx) : notre IA extrait automatiquement vos expériences et compétences.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition">
              <span>Importer un fichier</span>
              <ArrowRight size={14} />
            </div>
          </button>

          {/* Carte 2 : Créer pas à pas (Mode Simple) */}
          <button
            type="button"
            onClick={() => setShowQuickCreate(true)}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-800/80 p-6 shadow-xl hover:border-emerald-500 hover:bg-slate-800 transition text-left"
          >
            <div className="space-y-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                <User size={24} />
              </span>
              <div className="space-y-1">
                <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  Mode Simple
                </span>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-400 transition">
                  ✨ Créer un nouveau CV pas à pas
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Remplissez vos informations dans un formulaire guidé clair avec aperçu A4 en direct.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
              <span>Commencer la saisie</span>
              <ArrowRight size={14} />
            </div>
          </button>

          {/* Carte 3 : Studio Pro (Design Libre) */}
          <button
            type="button"
            onClick={() => {
              setOnboarding(false);
              setEditorMode("pro");
            }}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-800/80 p-6 shadow-xl hover:border-purple-500 hover:bg-slate-800 transition text-left"
          >
            <div className="space-y-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition">
                <Layout size={24} />
              </span>
              <div className="space-y-1">
                <span className="inline-block rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-400">
                  Studio Expert
                </span>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-purple-400 transition">
                  🎨 Ouvrir le Studio Pro
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Éditeur graphique complet façon Figma. Glisser-déposer au pixel près, formes, calques et templates.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">
              <span>Ouvrir le Studio</span>
              <ArrowRight size={14} />
            </div>
          </button>
        </div>

        {/* Modal de création rapide si clic sur Carte 2 */}
        {showQuickCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-left space-y-5 shadow-2xl">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Nouveau CV pas à pas</h3>
                <p className="text-xs text-slate-400">Entrez vos informations de base pour lancer l'édition simple.</p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
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

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuickCreate(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Annuler
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartGuided(true)}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                  >
                    Charger l'exemple type
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartGuided(false)}
                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition"
                  >
                    Commencer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
