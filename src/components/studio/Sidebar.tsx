import { useState } from "react";
import {
  Award,
  Briefcase,
  Check,
  Circle,
  Copy,
  Eye,
  EyeOff,
  FolderGit2,
  Gauge,
  Globe,
  GraduationCap,
  Grid3x3,
  Heading,
  Image,
  Layers,
  LayoutTemplate,
  Link,
  Magnet,
  Minus,
  Plus,
  Square,
  Tags,
  Trash2,
  Type,
  Upload,
} from "lucide-react";
import { activePage, useStudio } from "@/cv/store";
import { TEMPLATES } from "@/cv/templates";
import { JOB_PRESETS } from "@/cv/presets";
import { COLOR_PALETTES } from "@/cv/palettes";
import { SECTION_PACKS } from "@/cv/packs";
import type { ElType, TemplateId } from "@/cv/types";
import { snippet, TYPE_LABEL } from "@/cv/types";
import { cn } from "@/lib/utils";

const ADD: { type: ElType; label: string; icon: typeof Type }[] = [
  { type: "heading", label: "Titre", icon: Heading },
  { type: "text", label: "Paragraphe", icon: Type },
  { type: "experience", label: "Expérience", icon: Briefcase },
  { type: "education", label: "Formation", icon: GraduationCap },
  { type: "skills", label: "Compétences", icon: Tags },
  { type: "meters", label: "Niveaux", icon: Gauge },
  { type: "photo", label: "Photo", icon: Image },
  { type: "contact", label: "Contact", icon: Link },
  { type: "rect", label: "Bloc fond", icon: Square },
  { type: "ellipse", label: "Forme ronde", icon: Circle },
  { type: "rule", label: "Ligne", icon: Minus },
];

const PACK_ICONS: Record<string, typeof Briefcase> = {
  "pack-experience": Briefcase,
  "pack-education": GraduationCap,
  "pack-projects": FolderGit2,
  "pack-certifications": Award,
  "pack-languages": Globe,
};

function TemplatePreview({ id }: { id: TemplateId }) {
  if (id === "modern") {
    return (
      <div className="flex h-full w-full flex-col bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80">
        <div className="h-6 bg-slate-900 px-2 flex flex-col justify-center gap-0.5">
          <div className="h-1.5 w-12 rounded-full bg-white" />
          <div className="h-0.5 w-8 rounded-full bg-slate-400" />
        </div>
        <div className="flex-1 p-2 space-y-1.5">
          <div className="h-1 w-full rounded-full bg-slate-200" />
          <div className="h-1 w-4/5 rounded-full bg-slate-200" />
          <div className="pt-1 space-y-1">
            <div className="h-1 w-8 rounded-full bg-slate-700" />
            <div className="h-1 w-full rounded-full bg-slate-100" />
            <div className="h-1 w-5/6 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }
  if (id === "executive") {
    return (
      <div className="flex h-full w-full bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80">
        <div className="h-full w-1/3 bg-slate-900 p-1.5 flex flex-col items-center gap-1">
          <div className="size-3.5 rounded-full bg-slate-700" />
          <div className="h-1 w-full rounded-full bg-slate-400" />
          <div className="h-0.5 w-3/4 rounded-full bg-slate-600" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-2">
          <div className="h-1.5 w-2/3 rounded-full bg-slate-800" />
          <div className="h-1 w-full rounded-full bg-slate-200" />
          <div className="h-1 w-4/5 rounded-full bg-slate-200" />
          <div className="h-1 w-full rounded-full bg-slate-100 mt-1" />
        </div>
      </div>
    );
  }
  if (id === "creative") {
    return (
      <div className="relative h-full w-full bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80 p-2">
        <div className="absolute -top-2 -right-2 size-8 rounded-full bg-blue-600/90" />
        <div className="h-2 w-10 rounded-full bg-slate-900 mt-1" />
        <div className="h-1 w-7 rounded-full bg-slate-400 mt-1" />
        <div className="mt-2.5 space-y-1">
          <div className="h-1 w-3/5 rounded-full bg-slate-200" />
          <div className="h-1 w-1/2 rounded-full bg-slate-200" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2.5 bg-slate-900" />
      </div>
    );
  }
  if (id === "swiss") {
    return (
      <div className="flex h-full w-full bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80">
        <div className="h-full w-1.5 bg-blue-600" />
        <div className="grid flex-1 grid-cols-2 divide-x divide-slate-200">
          <div className="p-1.5 space-y-1">
            <div className="h-1.5 w-4/5 rounded-full bg-slate-900" />
            <div className="h-1 w-full rounded-full bg-slate-200" />
            <div className="h-1 w-3/4 rounded-full bg-slate-200" />
          </div>
          <div className="p-1.5 space-y-1">
            <div className="h-1 w-2/3 rounded-full bg-slate-700" />
            <div className="h-1 w-full rounded-full bg-slate-200" />
            <div className="h-1 w-5/6 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }
  if (id === "editorial") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80 p-2">
        <div>
          <div className="h-2.5 w-4/5 rounded-xs bg-slate-900" />
          <div className="h-px w-full bg-slate-300 my-1.5" />
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-2.5 rounded-xs bg-slate-100" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-300" />
              <div className="h-0.5 w-3/4 bg-slate-300" />
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-1 w-full rounded-full bg-slate-200" />
          <div className="h-1 w-3/4 rounded-full bg-slate-200" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-white rounded-xs shadow-2xs overflow-hidden border border-slate-200/80 p-2">
      <div className="h-1.5 w-1/2 rounded-full bg-slate-900" />
      <div className="h-px w-6 bg-slate-400" />
      <div className="h-1 w-4/5 rounded-full bg-slate-200" />
      <div className="h-1 w-3/5 rounded-full bg-slate-100" />
    </div>
  );
}

export function Sidebar({ onDone }: { onDone?: () => void }) {
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const selectedIds = useStudio((s) => s.selectedIds);
  const activeTemplate = useStudio((s) => s.activeTemplate);
  const showGrid = useStudio((s) => s.showGrid);
  const snap = useStudio((s) => s.snap);
  const guides = useStudio((s) => s.guides);
  const margins = useStudio((s) => s.margins);

  const page = activePage(doc, activePageId);
  const [activeTab, setActiveTab] = useState<"templates" | "blocks" | "layers">("templates");

  const done = () => onDone?.();

  return (
    <aside className="flex h-full w-64 xl:w-72 shrink-0 flex-col border-r border-slate-200 bg-white text-slate-900 select-none z-20">
      {/* Navigation par onglets claire et structurée */}
      <div className="border-b border-slate-200 p-2.5 shrink-0">
        <div className="grid grid-cols-3 rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("templates")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-md py-1.5 transition whitespace-nowrap",
              activeTab === "templates"
                ? "bg-white text-slate-900 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900",
            )}
          >
            <LayoutTemplate size={13} />
            <span>Modèles</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("blocks")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-md py-1.5 transition whitespace-nowrap",
              activeTab === "blocks"
                ? "bg-white text-slate-900 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900",
            )}
          >
            <Plus size={13} />
            <span>Ajouter</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("layers")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-md py-1.5 transition whitespace-nowrap",
              activeTab === "layers"
                ? "bg-white text-slate-900 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900",
            )}
          >
            <Layers size={13} />
            <span>Calques</span>
          </button>
        </div>
      </div>

      {/* Contenu déroulant */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3.5 space-y-5">
        {/* ONGLET 1 : MODÈLES, HARMONIES & PROFILS MÉTIERS */}
        {activeTab === "templates" && (
          <>
            {/* Grille de modèles lisible */}
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-900">Modèles de mise en page</h2>
                <span className="text-[11px] text-slate-500">{TEMPLATES.length} styles</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {TEMPLATES.map((tpl) => {
                  const isCurrent = activeTemplate === tpl.id;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => {
                        useStudio.getState().requestApplyTemplate(tpl.id);
                        done();
                      }}
                      className={cn(
                        "group flex flex-col overflow-hidden rounded-lg border text-left transition",
                        isCurrent
                          ? "border-signal bg-blue-50/30 ring-1 ring-signal"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50",
                      )}
                    >
                      <div className="h-22 w-full bg-slate-100/80 p-2 transition group-hover:bg-slate-100">
                        <TemplatePreview id={tpl.id} />
                      </div>
                      <div className="flex items-center justify-between gap-1 px-2.5 py-2 border-t border-slate-100">
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-900 truncate">{tpl.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{tpl.note}</div>
                        </div>
                        {isCurrent && (
                          <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-signal text-white">
                            <Check size={10} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Harmonies de couleurs */}
            <section className="space-y-2.5 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-900">Harmonies de couleurs</h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => useStudio.getState().applyPalette(palette.id)}
                    className="group flex flex-col items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-2 hover:border-slate-300 hover:bg-slate-50 transition"
                    title={palette.desc}
                  >
                    <div className="flex items-center -space-x-1">
                      <span
                        className="size-4 rounded-full border border-white shadow-2xs"
                        style={{ backgroundColor: palette.primary }}
                      />
                      <span
                        className="size-4 rounded-full border border-white shadow-2xs"
                        style={{ backgroundColor: palette.accent }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 truncate w-full text-center">
                      {palette.name.split("/")[0].trim()}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Exemples pré-remplis par métier */}
            <section className="space-y-2.5 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-900">Exemples par métier</h2>
                <span className="text-[11px] text-slate-500">Pré-rédigés</span>
              </div>
              <div className="space-y-1.5">
                {JOB_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      useStudio.getState().requestApplyJobPreset(preset.id);
                      done();
                    }}
                    className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left hover:border-slate-300 hover:bg-slate-50 transition"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-slate-800 truncate">{preset.label}</div>
                      <div className="text-[11px] text-slate-500 truncate">{preset.badge}</div>
                    </div>
                    <span className="text-[11px] font-medium text-signal shrink-0">Charger</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Importation de CV sobre */}
            <section className="border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  useStudio.getState().setExtractorModalOpen(true);
                  done();
                }}
                className="flex w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-left hover:border-slate-300 hover:bg-slate-100/80 transition"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200 text-slate-700">
                  <Upload size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-900">Importer un CV existant</div>
                  <div className="text-[11px] text-slate-500 truncate">PDF, Word (.docx) ou texte</div>
                </div>
              </button>
            </section>
          </>
        )}

        {/* ONGLET 2 : AJOUTER DES SECTIONS & ÉLÉMENTS */}
        {activeTab === "blocks" && (
          <>
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-900">Sections complètes</h2>
                <span className="text-[11px] text-slate-500">1 clic</span>
              </div>
              <div className="space-y-2">
                {SECTION_PACKS.map((pack) => {
                  const Icon = PACK_ICONS[pack.id] ?? Briefcase;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => {
                        useStudio.getState().addSectionPack(pack.id);
                        done();
                      }}
                      className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-2.5 text-left hover:border-slate-300 hover:bg-slate-50 transition"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700 group-hover:bg-signal group-hover:text-white transition">
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-slate-900">{pack.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{pack.desc}</div>
                      </div>
                      <Plus size={14} className="text-slate-400 group-hover:text-slate-900 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-2.5 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-900">Éléments unitaires</h2>
                <span className="text-[11px] text-slate-500">Blocs libres</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ADD.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      useStudio.getState().addElement(item.type);
                      done();
                    }}
                    className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition"
                  >
                    <item.icon size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ONGLET 3 : PAGES, CALQUES & REPÈRES */}
        {activeTab === "layers" && (
          <>
            {/* Pages A4 */}
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-900">Pages du document ({doc.pages.length})</h2>
                <button
                  type="button"
                  onClick={() => useStudio.getState().addPage()}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  <Plus size={11} />
                  <span>Nouvelle page</span>
                </button>
              </div>
              <div className="space-y-1.5">
                {doc.pages.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition",
                      item.id === activePageId
                        ? "border-signal bg-blue-50/40 font-semibold text-slate-900"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <button
                      type="button"
                      className="min-w-0 flex-1 truncate text-left"
                      onClick={() => useStudio.getState().setActive(item.id)}
                    >
                      {index + 1}. {item.name}
                    </button>
                    <button
                      type="button"
                      title="Dupliquer la page"
                      className="flex size-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      onClick={() => {
                        useStudio.getState().setActive(item.id);
                        useStudio.getState().duplicatePage();
                      }}
                    >
                      <Copy size={12} />
                    </button>
                    {doc.pages.length > 1 && (
                      <button
                        type="button"
                        title="Supprimer la page"
                        className="flex size-6 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-red-600"
                        onClick={() => useStudio.getState().deletePage(item.id)}
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Repères & Grille */}
            <section className="space-y-2.5 border-t border-slate-100 pt-4">
              <h2 className="text-xs font-semibold text-slate-900">Aides à l’alignement</h2>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["Grille", showGrid, "showGrid", Grid3x3],
                    ["Magnétisme", snap, "snap", Magnet],
                    ["Repères", guides, "guides", Magnet],
                    ["Marges A4", margins, "margins", Minus],
                  ] as const
                ).map(([label, on, key]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => useStudio.getState().toggle(key)}
                    className={cn(
                      "flex h-8 items-center justify-between rounded-lg border px-2.5 text-xs font-medium transition",
                      on
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    )}
                  >
                    <span>{label}</span>
                    {on && <Check size={12} />}
                  </button>
                ))}
              </div>
            </section>

            {/* Liste des calques */}
            <section className="space-y-2.5 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-900">Calques ({page.elements.length})</h2>
                <span className="text-[11px] text-slate-500">Ordre Z</span>
              </div>
              <div className="space-y-1">
                {[...page.elements]
                  .sort((a, b) => b.z - a.z)
                  .map((el) => {
                    const isSelected = selectedIds.includes(el.id);
                    return (
                      <div
                        key={el.id}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition",
                          isSelected
                            ? "border-signal bg-blue-50/50 text-slate-900 font-medium"
                            : "border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50",
                        )}
                      >
                        <button
                          type="button"
                          className="min-w-0 flex-1 truncate text-left"
                          onClick={() => {
                            useStudio.getState().setActive(page.id);
                            useStudio.getState().select([el.id]);
                          }}
                        >
                          <span className="text-[11px] text-slate-400 mr-1.5">{TYPE_LABEL[el.type]}</span>
                          <span>{snippet(el)}</span>
                        </button>
                        <button
                          type="button"
                          aria-label={el.hidden ? "Afficher" : "Masquer"}
                          className="flex size-6 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          onClick={() => useStudio.getState().toggleHidden(page.id, el.id)}
                        >
                          {el.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </section>
          </>
        )}
      </div>
    </aside>
  );
}
