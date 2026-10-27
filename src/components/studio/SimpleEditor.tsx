import { useState } from "react";
import { ArrowLeft, Briefcase, Download, Eye, GraduationCap, Sparkles, User, Palette, PenLine } from "lucide-react";
import { PageSheet } from "@/components/studio/PageSheet";
import { activePage, useStudio } from "@/cv/store";
import { TEMPLATES } from "@/cv/templates";
import { COLOR_PALETTES } from "@/cv/palettes";
import { FONTS, PAGE_H, PAGE_W } from "@/cv/types";
import { getRandomBoost } from "@/cv/presets";
import { cn } from "@/lib/utils";

const inputStyle = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600";
const textareaStyle = "w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none";

export function SimpleEditor() {
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const setEditorMode = useStudio((s) => s.setEditorMode);
  const setOnboarding = useStudio((s) => s.setOnboarding);
  const directPdfExport = useStudio((s) => s.directPdfExport);
  const setIdentity = useStudio((s) => s.setIdentity);
  const applyTemplate = useStudio((s) => s.applyTemplate);
  const applyPalette = useStudio((s) => s.applyPalette);
  const applyGlobalFont = useStudio((s) => s.applyGlobalFont);
  const notify = useStudio((s) => s.notify);

  const [activeTab, setActiveTab] = useState<"profile" | "experience" | "education" | "skills-design">("profile");
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const page = activePage(doc, activePageId);
  const profile = doc.profile;

  const updateProfile = (nextProfile: typeof profile) => {
    const nextDoc = { ...doc, profile: nextProfile };
    useStudio.getState().loadDocument(nextDoc);
  };

  const handleBoostSummary = () => {
    const phrase = getRandomBoost();
    const nextSummary = profile.summary ? `${profile.summary} ${phrase}` : phrase;
    setIdentity("summary", nextSummary);
    notify("✨ Résumé formulé avec succès !");
  };

  const handleBoostExp = (index: number) => {
    const phrase = getRandomBoost();
    const nextExps = [...profile.experiences];
    const exp = nextExps[index];
    if (exp) {
      const curDesc = exp.desc || "";
      exp.desc = curDesc ? `${curDesc}\n• ${phrase}` : `• ${phrase}`;
      updateProfile({ ...profile, experiences: nextExps });
      notify("✨ Réalisation chiffrée ajoutée au poste !");
    }
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-slate-200 text-slate-900 select-none flex-col">
      <div className="no-print flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white px-3 py-2 z-30 shadow-xs sm:px-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOnboarding(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs"
            title="Revenir au point de départ"
          >
            <ArrowLeft size={14} />
            <span>Parcours</span>
          </button>
        </div>

        <div className="flex items-center rounded-xl bg-slate-100 p-1 shadow-inner border border-slate-300" aria-label="Vues du même CV">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition"
            title="Vous pouvez passer à la mise en page libre sans perdre vos changements"
          >
            <span>Saisie guidée</span>
          </button>
          <button
            type="button"
            onClick={() => setEditorMode("pro")}
            className="flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            title="Même CV, mise en page libre"
          >
            <span>Studio libre</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMobilePreview((visible) => !visible)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition md:hidden"
          >
            {showMobilePreview ? <PenLine size={14} /> : <Eye size={14} />}
            <span>{showMobilePreview ? "Modifier" : "Aperçu"}</span>
          </button>
          <button
            type="button"
            onClick={() => directPdfExport()}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-sm"
          >
            <Download size={14} />
            <span>Télécharger mon CV (PDF)</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 flex-col overflow-hidden md:flex-row">
        {/* COLONNE DE GAUCHE : FORMULAIRE GUIDÉ (45%) */}
        <div className={`${showMobilePreview ? "hidden" : "flex"} w-full min-h-0 min-w-0 flex-1 flex-col bg-white border-r border-slate-200 shadow-sm z-10 md:flex md:w-[45%] md:flex-none md:min-w-[420px]`}>
          {/* 4 Onglets simples en haut */}
          <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50 p-2 text-xs font-medium shrink-0 gap-1.5">
            {(
              [
                ["profile", "1. Profil", User],
                ["experience", "2. Expériences", Briefcase],
                ["education", "3. Formation", GraduationCap],
                ["skills-design", "4. Compétences & Design", Palette],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-lg py-2.5 transition text-[11px]",
                  activeTab === id
                    ? "bg-white text-blue-600 font-bold shadow-xs ring-1 ring-slate-950/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80",
                )}
              >
                <Icon size={16} />
                <span className="truncate w-full text-center">{label}</span>
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === "profile" && (
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Profil & Contact</h3>
                  <p className="text-[11px] text-slate-500">Ces informations apparaissent en haut de votre CV.</p>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Nom & Prénom</span>
                    <input
                      className={cn(inputStyle, "mt-1")}
                      value={profile.name}
                      onChange={(e) => setIdentity("name", e.target.value)}
                      placeholder="Ex: Alexandra Dubois"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Intitulé du poste recherché</span>
                    <input
                      className={cn(inputStyle, "mt-1")}
                      value={profile.role}
                      onChange={(e) => setIdentity("role", e.target.value)}
                      placeholder="Ex: Product Designer Senior"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Adresse e-mail</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.email}
                        onChange={(e) => setIdentity("email", e.target.value)}
                        placeholder="alexandra@email.com"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Téléphone</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.phone}
                        onChange={(e) => setIdentity("phone", e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Ville / Localisation</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.location}
                        onChange={(e) => setIdentity("location", e.target.value)}
                        placeholder="Paris, France"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Lien (LinkedIn / Portfolio)</span>
                      <input
                        className={cn(inputStyle, "mt-1")}
                        value={profile.link}
                        onChange={(e) => setIdentity("link", e.target.value)}
                        placeholder="linkedin.com/in/nom"
                      />
                    </label>
                  </div>

                  <label className="block pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-700">Résumé de profil / Bio</span>
                      <button
                        type="button"
                        onClick={handleBoostSummary}
                        className="flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-500/25 transition"
                      >
                        <Sparkles size={11} />
                        <span>✨ Formuler comme un pro</span>
                      </button>
                    </div>
                    <textarea
                      className={cn(textareaStyle, "h-28")}
                      value={profile.summary}
                      onChange={(e) => setIdentity("summary", e.target.value)}
                      placeholder="Présentation synthétique de votre parcours..."
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Expériences professionnelles</h3>
                    <p className="text-[11px] text-slate-500">Ajoutez vos postes clés avec des réalisations mesurables.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nextExps = [{ role: "Nouveau poste", company: "Entreprise", date: "2024 — Présent", desc: "Principales réalisations..." }, ...profile.experiences];
                      updateProfile({ ...profile, experiences: nextExps });
                      notify("Nouvelle expérience ajoutée");
                    }}
                    className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
                  >
                    <span>+ Ajouter un poste</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {profile.experiences.map((exp, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Poste #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const nextExps = profile.experiences.filter((_, i) => i !== index);
                            updateProfile({ ...profile, experiences: nextExps });
                            notify("Expérience supprimée");
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold"
                        >
                          Supprimer
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          className={inputStyle}
                          value={exp.role}
                          onChange={(e) => {
                            const nextExps = [...profile.experiences];
                            nextExps[index].role = e.target.value;
                            updateProfile({ ...profile, experiences: nextExps });
                          }}
                          placeholder="Intitulé du poste"
                        />
                        <input
                          className={inputStyle}
                          value={exp.company}
                          onChange={(e) => {
                            const nextExps = [...profile.experiences];
                            nextExps[index].company = e.target.value;
                            updateProfile({ ...profile, experiences: nextExps });
                          }}
                          placeholder="Entreprise — Ville"
                        />
                      </div>

                      <input
                        className={inputStyle}
                        value={exp.date}
                        onChange={(e) => {
                          const nextExps = [...profile.experiences];
                          nextExps[index].date = e.target.value;
                          updateProfile({ ...profile, experiences: nextExps });
                        }}
                        placeholder="Ex: 2021 — Présent"
                      />

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-700">Missions & Réalisations</span>
                          <button
                            type="button"
                            onClick={() => handleBoostExp(index)}
                            className="flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-500/25 transition"
                          >
                            <Sparkles size={11} />
                            <span>✨ Formuler comme un pro</span>
                          </button>
                        </div>
                        <textarea
                          className={cn(textareaStyle, "h-24")}
                          value={exp.desc}
                          onChange={(e) => {
                            const nextExps = [...profile.experiences];
                            nextExps[index].desc = e.target.value;
                            updateProfile({ ...profile, experiences: nextExps });
                          }}
                          placeholder="Décrivez vos missions et impacts..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Formation & Diplômes</h3>
                    <p className="text-[11px] text-slate-500">Ajoutez vos cursus académiques.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nextEdus = [{ degree: "Diplôme", school: "École", date: "2020 — 2023" }, ...profile.educations];
                      updateProfile({ ...profile, educations: nextEdus });
                      notify("Formation ajoutée");
                    }}
                    className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
                  >
                    <span>+ Ajouter une formation</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {profile.educations.map((edu, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">Formation #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const nextEdus = profile.educations.filter((_, i) => i !== index);
                            updateProfile({ ...profile, educations: nextEdus });
                            notify("Formation supprimée");
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-semibold"
                        >
                          Supprimer
                        </button>
                      </div>

                      <input
                        className={inputStyle}
                        value={edu.degree}
                        onChange={(e) => {
                          const nextEdus = [...profile.educations];
                          nextEdus[index].degree = e.target.value;
                          updateProfile({ ...profile, educations: nextEdus });
                        }}
                        placeholder="Diplôme (ex: Master Informatique)"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          className={inputStyle}
                          value={edu.school}
                          onChange={(e) => {
                            const nextEdus = [...profile.educations];
                            nextEdus[index].school = e.target.value;
                            updateProfile({ ...profile, educations: nextEdus });
                          }}
                          placeholder="École / Université"
                        />
                        <input
                          className={inputStyle}
                          value={edu.date}
                          onChange={(e) => {
                            const nextEdus = [...profile.educations];
                            nextEdus[index].date = e.target.value;
                            updateProfile({ ...profile, educations: nextEdus });
                          }}
                          placeholder="2020 — 2023"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills-design" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Compétences clés</h3>
                  <p className="text-[11px] text-slate-500">Saisissez vos compétences séparées par des virgules ou une par ligne.</p>
                </div>

                <textarea
                  className={cn(textareaStyle, "h-28")}
                  value={profile.skills.join("\n")}
                  onChange={(e) => {
                    const skills = e.target.value.split("\n").map((s) => s.trim()).filter(Boolean);
                    updateProfile({ ...profile, skills });
                  }}
                  placeholder="Figma&#10;React / TypeScript&#10;Gestion de projet"
                />

                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Langues & Niveaux</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const languages = [...profile.languages, { label: "Nouvelle langue", value: 80 }];
                        updateProfile({ ...profile, languages });
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      + Ajouter une langue
                    </button>
                  </div>

                  <div className="space-y-3">
                    {profile.languages.map((lang, index) => (
                      <div key={index} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <input
                          className={cn(inputStyle, "flex-1 h-9")}
                          value={lang.label}
                          onChange={(e) => {
                            const languages = [...profile.languages];
                            languages[index].label = e.target.value;
                            updateProfile({ ...profile, languages });
                          }}
                          placeholder="Langue"
                        />
                        <div className="flex items-center gap-2 w-36">
                          <input
                            type="range"
                            min={20}
                            max={100}
                            step={10}
                            value={lang.value}
                            onChange={(e) => {
                              const languages = [...profile.languages];
                              languages[index].value = Number(e.target.value);
                              updateProfile({ ...profile, languages });
                            }}
                            className="w-full accent-blue-600"
                          />
                          <span className="font-mono text-xs w-8 text-right">{lang.value}%</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const languages = profile.languages.filter((_, i) => i !== index);
                            updateProfile({ ...profile, languages });
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-bold px-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modèle de design & Style */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Modèle de design & Style</h3>
                    <p className="text-[11px] text-slate-500">Choisissez l'apparence globale de votre CV en 1 clic.</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-700">Modèle de mise en page</span>
                    <div className="grid grid-cols-3 gap-2">
                      {TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => applyTemplate(tpl.id)}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left hover:border-blue-600 hover:bg-blue-50/40 transition group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">{tpl.name}</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">{tpl.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-700">Harmonie de couleurs</span>
                    <div className="grid grid-cols-3 gap-2">
                      {COLOR_PALETTES.map((pal) => (
                        <button
                          key={pal.id}
                          type="button"
                          onClick={() => applyPalette(pal.id)}
                          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-left hover:border-blue-600 transition"
                        >
                          <div className="size-5 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: pal.primary }} />
                          <span className="text-[11px] font-semibold text-slate-800 truncate">{pal.name.split("/")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-700">Police typographique globale</span>
                    <select
                      className={inputStyle}
                      onChange={(e) => applyGlobalFont(e.target.value)}
                    >
                      {FONTS.map((font) => (
                        <option key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLONNE DE DROITE : APERÇU A4 LISIBLE (55%) sur fond atelier #E2E8F0 */}
        <div className={`${showMobilePreview ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col bg-[#E2E8F0] md:flex`}>
          {/* Sous-barre de droite avec bouton Personnaliser au pixel près */}
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-300 bg-white/90 px-3 sm:px-8">
            <div className="text-xs font-semibold text-slate-600">
              Aperçu du CV · A4
            </div>
            <button
              type="button"
              onClick={() => setEditorMode("pro")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-xs"
            >
              <span>Modifier la mise en page</span>
            </button>
          </div>

          {/* Zone d'affichage A4 avec responsive scale (0.72) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 flex justify-center items-start">
            <div style={{ width: PAGE_W * 0.72, height: PAGE_H * 0.72 }} className="simple-preview-frame shrink-0">
              <div className="simple-preview-sheet relative overflow-hidden rounded-sm bg-white shadow-2xl" style={{ width: PAGE_W, height: PAGE_H, transform: "scale(0.72)", transformOrigin: "top center" }}>
                <PageSheet
                  page={page}
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
        </div>
      </div>
    </div>
  );
}
