import { useState } from "react";
import {
  Briefcase,
  ChevronDown,
  Download,
  Eye,
  FileCheck,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Palette,
  Plus,
  Sparkles,
  Trash2,
  User,
  Wand2,
} from "lucide-react";
import { useStudio } from "@/cv/store";
import { JOB_PRESETS } from "@/cv/presets";
import { COLOR_PALETTES } from "@/cv/palettes";
import { readImage } from "@/cv/image";

export function MobileTouchEditor({ onSwitchToCanvas }: { onSwitchToCanvas: () => void }) {
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const setIdentity = useStudio((s) => s.setIdentity);
  const addSectionPack = useStudio((s) => s.addSectionPack);
  const applyJobPreset = useStudio((s) => s.applyJobPreset);
  const applyPalette = useStudio((s) => s.applyPalette);
  const directPdfExport = useStudio((s) => s.directPdfExport);
  const boostElementText = useStudio((s) => s.boostElementText);
  const patchElement = useStudio((s) => s.patchElement);

  const [expandedSection, setExpandedSection] = useState<
    "identity" | "summary" | "experiences" | "educations" | "skills" | "presets" | null
  >("identity");

  const [pdfLoading, setPdfLoading] = useState(false);

  const profile = doc.profile;
  const page = doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0];

  const handlePhotoUpload = async (file: File) => {
    try {
      const src = await readImage(file);
      // Find photo element on page or add photo
      const photoEl = page.elements.find((e) => e.type === "photo");
      if (photoEl) {
        patchElement(page.id, photoEl.id, { content: { src } });
      } else {
        useStudio.getState().addElement("photo");
      }
      useStudio.getState().notify("Photo optimisée & ajoutée !");
    } catch {
      useStudio.getState().notify("Impossible de traiter cette photo");
    }
  };

  const handleDirectPdf = async () => {
    setPdfLoading(true);
    await directPdfExport();
    setPdfLoading(false);
  };

  const toggleSection = (sec: typeof expandedSection) => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  return (
    <div className="flex h-full w-full flex-col bg-paper text-ink overflow-y-auto pb-24">
      {/* En-tête mobile tactile */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-cream px-4 py-3 shadow-xs">
        <div>
          <span className="font-display text-sm font-bold tracking-wide">MODE ÉDITION TACTILE</span>
          <p className="text-[10px] text-mute">Modifiez facilement chaque rubrique au doigt</p>
        </div>

        <button
          type="button"
          onClick={onSwitchToCanvas}
          className="flex items-center gap-1.5 rounded-full border border-ink bg-ink px-3 py-1.5 text-xs font-bold text-cream shadow-sm hover:bg-neutral-800 transition"
        >
          <Eye size={13} />
          <span>Aperçu A4</span>
        </button>
      </div>

      <div className="p-3.5 space-y-3 max-w-lg mx-auto w-full">
        {/* NOUVEAUTÉ: EXTRACTION DE CV EXISTANT (PDF/WORD) */}
        <button
          type="button"
          onClick={() => useStudio.getState().setExtractorModalOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl border border-emerald-300 bg-emerald-50 p-3 shadow-xs text-left transition active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <FileCheck size={18} />
            </span>
            <div>
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <span>Importer un CV existant</span>
                <span className="rounded bg-emerald-200 px-1 py-0.2 text-[9px] font-bold text-emerald-800">
                  PDF / Word
                </span>
              </div>
              <div className="text-[10px] text-emerald-800/80">
                Extrait automatiquement vos rubriques
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700">Ouvrir →</span>
        </button>

        {/* BAGUETTE MAGIQUE 8 MÉTIERS EN 1 CLIC */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
              <Wand2 size={14} className="text-amber-700" />
              <span>Remplir par métier (Zéro page blanche)</span>
            </div>
            <span className="text-[10px] font-semibold text-amber-800">1 clic</span>
          </div>

          <select
            onChange={(e) => {
              if (e.target.value) {
                applyJobPreset(e.target.value);
                e.target.value = "";
              }
            }}
            defaultValue=""
            className="h-11 w-full rounded-xl border border-amber-300 bg-white px-3 text-xs font-semibold text-ink outline-none shadow-xs"
          >
            <option value="" disabled>
              Choisir un métier pré-rédigé...
            </option>
            {JOB_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* SECTION 1: IDENTITÉ & CONTACT */}
        <div className="rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection("identity")}
            className="flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-paper text-ink">
                <User size={14} />
              </span>
              <span>Identité & Coordonnées</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${expandedSection === "identity" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "identity" && (
            <div className="border-t border-line p-3.5 space-y-3 bg-sheet">
              {/* Photo de profil */}
              <div className="flex items-center gap-3 rounded-xl border border-line bg-paper p-2.5">
                <div className="size-14 rounded-full bg-line/60 overflow-hidden flex items-center justify-center text-mute font-bold text-xs shrink-0">
                  {page.elements.find((e) => e.type === "photo")?.content?.src ? (
                    <img
                      src={page.elements.find((e) => e.type === "photo")?.content?.src}
                      alt="Profil"
                      className="size-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={20} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold">Photo de profil</div>
                  <div className="text-[10px] text-mute mb-1.5">Compression automatique sans ralentissement</div>
                  <label className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg bg-ink px-3 text-xs font-bold text-cream hover:bg-neutral-800">
                    Choisir photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handlePhotoUpload(f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-mute">Nom complet</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setIdentity("name", e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-mute">Intitulé de poste cible</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setIdentity("role", e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-mute">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setIdentity("email", e.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-mute">Téléphone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setIdentity("phone", e.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-mute">Ville / Pays</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setIdentity("location", e.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-mute">Lien / LinkedIn</label>
                  <input
                    type="text"
                    value={profile.link}
                    onChange={(e) => setIdentity("link", e.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-line bg-paper px-3 text-xs text-ink outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: RÉSUMÉ / BIO */}
        <div className="rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection("summary")}
            className="flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-paper text-ink">
                <FileText size={14} />
              </span>
              <span>Accroche & Bio professionnelle</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${expandedSection === "summary" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "summary" && (
            <div className="border-t border-line p-3.5 space-y-2 bg-sheet">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-mute">Présentation concise de votre profil :</span>
                <button
                  type="button"
                  onClick={() => {
                    const firstExp = page.elements.find((e) => e.type === "experience");
                    if (firstExp) boostElementText(firstExp.id);
                  }}
                  className="flex items-center gap-1 rounded-lg bg-amber-400 px-2 py-1 text-[10px] font-bold text-black"
                >
                  <Sparkles size={11} />
                  <span>✨ Formuler pro</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={profile.summary}
                onChange={(e) => setIdentity("summary", e.target.value)}
                className="w-full rounded-xl border border-line bg-paper p-3 text-xs leading-relaxed text-ink outline-none"
              />
            </div>
          )}
        </div>

        {/* SECTION 3: EXPÉRIENCES PROFESSIONNELLES */}
        <div className="rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection("experiences")}
            className="flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-paper text-ink">
                <Briefcase size={14} />
              </span>
              <span>Expériences ({page.elements.filter((e) => e.type === "experience").length})</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${expandedSection === "experiences" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "experiences" && (
            <div className="border-t border-line p-3.5 space-y-3 bg-sheet">
              {page.elements
                .filter((e) => e.type === "experience")
                .map((el, idx) => (
                  <div key={el.id} className="rounded-xl border border-line bg-paper p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink">Poste #{idx + 1}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => boostElementText(el.id)}
                          className="flex items-center gap-1 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-black"
                        >
                          <Sparkles size={11} />
                          <span>✨ Chiffrer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            useStudio.getState().select([el.id]);
                            useStudio.getState().deleteSelected();
                          }}
                          className="flex size-6 items-center justify-center rounded-md text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Intitulé du poste"
                      value={el.content.role ?? ""}
                      onChange={(e) => patchElement(page.id, el.id, { content: { role: e.target.value } })}
                      className="h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs font-semibold text-ink outline-none"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Entreprise"
                        value={el.content.company ?? ""}
                        onChange={(e) => patchElement(page.id, el.id, { content: { company: e.target.value } })}
                        className="h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Dates"
                        value={el.content.date ?? ""}
                        onChange={(e) => patchElement(page.id, el.id, { content: { date: e.target.value } })}
                        className="h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
                      />
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Missions & réalisations chiffrées"
                      value={el.content.desc ?? ""}
                      onChange={(e) => patchElement(page.id, el.id, { content: { desc: e.target.value } })}
                      className="w-full rounded-lg border border-line bg-sheet p-2.5 text-xs leading-relaxed text-ink outline-none"
                    />
                  </div>
                ))}

              <button
                type="button"
                onClick={() => addSectionPack("pack-experience")}
                className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/40 bg-paper text-xs font-bold text-ink hover:bg-cream transition"
              >
                <Plus size={14} />
                <span>+ Ajouter une expérience chiffrée</span>
              </button>
            </div>
          )}
        </div>

        {/* SECTION 4: FORMATIONS */}
        <div className="rounded-2xl border border-line bg-sheet overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection("educations")}
            className="flex w-full items-center justify-between p-3.5 text-left font-semibold text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-paper text-ink">
                <GraduationCap size={14} />
              </span>
              <span>Formations ({page.elements.filter((e) => e.type === "education").length})</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${expandedSection === "educations" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "educations" && (
            <div className="border-t border-line p-3.5 space-y-3 bg-sheet">
              {page.elements
                .filter((e) => e.type === "education")
                .map((el, idx) => (
                  <div key={el.id} className="rounded-xl border border-line bg-paper p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink">Formation #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          useStudio.getState().select([el.id]);
                          useStudio.getState().deleteSelected();
                        }}
                        className="flex size-6 items-center justify-center rounded-md text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Diplôme"
                      value={el.content.degree ?? ""}
                      onChange={(e) => patchElement(page.id, el.id, { content: { degree: e.target.value } })}
                      className="h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs font-semibold text-ink outline-none"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="École / Université"
                        value={el.content.school ?? ""}
                        onChange={(e) => patchElement(page.id, el.id, { content: { school: e.target.value } })}
                        className="h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Dates"
                        value={el.content.date ?? ""}
                        onChange={(e) => patchElement(page.id, el.id, { content: { date: e.target.value } })}
                        className="h-9 w-full rounded-lg border border-line bg-sheet px-2.5 text-xs text-ink outline-none"
                      />
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => addSectionPack("pack-education")}
                className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/40 bg-paper text-xs font-bold text-ink hover:bg-cream transition"
              >
                <Plus size={14} />
                <span>+ Ajouter une formation</span>
              </button>
            </div>
          )}
        </div>

        {/* SECTION 5: HARMONIES DE COULEURS */}
        <div className="rounded-2xl border border-line bg-sheet p-3.5 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <Palette size={14} />
            <span>Harmonies Couleurs (1 clic)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {COLOR_PALETTES.map((pal) => (
              <button
                key={pal.id}
                type="button"
                onClick={() => applyPalette(pal.id)}
                className="flex flex-col items-center gap-1 rounded-xl border border-line bg-paper p-2 hover:border-ink transition"
              >
                <div
                  className="flex size-7 items-center justify-center rounded-full border border-line"
                  style={{ backgroundColor: pal.primary }}
                >
                  <div className="size-2.5 rounded-full" style={{ backgroundColor: pal.accent }} />
                </div>
                <span className="text-[10px] font-medium text-ink truncate w-full text-center">
                  {pal.name.split("/")[0].trim()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barre d'action mobile fixe en bas */}
      <div className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between border-t border-line bg-cream px-4 py-2.5 shadow-lg">
        <button
          type="button"
          onClick={onSwitchToCanvas}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-line bg-sheet py-2.5 text-xs font-bold text-ink shadow-xs hover:bg-paper transition"
        >
          <Eye size={15} />
          <span>Voir Planche A4</span>
        </button>

        <button
          type="button"
          disabled={pdfLoading}
          onClick={handleDirectPdf}
          className="ml-2 flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
        >
          <Download size={15} />
          <span>{pdfLoading ? "Génération..." : "PDF Direct"}</span>
        </button>
      </div>
    </div>
  );
}
