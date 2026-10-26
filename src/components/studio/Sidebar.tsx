import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Circle,
  Copy,
  Eye,
  EyeOff,
  FileCheck,
  FileText,
  Gauge,
  GraduationCap,
  Grid3x3,
  Heading,
  Image,
  Layers,
  LayoutTemplate,
  Link,
  Magnet,
  Minus,
  Package,
  Plus,
  Square,
  Tags,
  Trash2,
  Type,
  Upload,
  Wand2,
} from "lucide-react";
import { activePage, useStudio } from "@/cv/store";
import { TEMPLATES } from "@/cv/templates";
import { JOB_PRESETS } from "@/cv/presets";
import { COLOR_PALETTES } from "@/cv/palettes";
import { SECTION_PACKS } from "@/cv/packs";
import type { ElType, TemplateId } from "@/cv/types";
import { snippet } from "@/cv/types";
import { cn } from "@/lib/utils";

const ADD: { type: ElType; label: string; icon: typeof Type }[] = [
  { type: "heading", label: "Titre", icon: Heading },
  { type: "text", label: "Texte", icon: Type },
  { type: "experience", label: "Poste", icon: Briefcase },
  { type: "education", label: "École", icon: GraduationCap },
  { type: "skills", label: "Skills", icon: Tags },
  { type: "meters", label: "Niveau", icon: Gauge },
  { type: "photo", label: "Photo", icon: Image },
  { type: "contact", label: "Contact", icon: Link },
  { type: "rect", label: "Bloc", icon: Square },
  { type: "ellipse", label: "Rond", icon: Circle },
  { type: "rule", label: "Trait", icon: Minus },
];

function Thumb({ id }: { id: TemplateId }) {
  if (id === "executive") {
    return (
      <div className="flex h-full">
        <div className="h-full w-1/3 bg-ink" />
        <div className="flex flex-1 flex-col gap-1 p-1.5">
          <div className="h-1 w-2/3 rounded-full bg-ink" />
          <div className="h-1 w-full rounded-full bg-line" />
          <div className="h-1 w-4/5 rounded-full bg-line" />
        </div>
      </div>
    );
  }
  if (id === "creative") {
    return (
      <div className="relative h-full bg-sheet">
        <div className="absolute top-0 right-0 size-8 rounded-full bg-signal" />
        <div className="absolute right-1 bottom-1 left-1 h-2 rounded-sm bg-ink" />
        <div className="absolute top-3 left-1.5 h-1.5 w-8 rounded-full bg-ink" />
      </div>
    );
  }
  if (id === "swiss") {
    return (
      <div className="flex h-full bg-sheet">
        <div className="h-full w-1 bg-signal" />
        <div className="grid flex-1 grid-cols-2">
          <div className="border-r border-line p-1">
            <div className="h-1 w-full rounded-full bg-ink" />
          </div>
          <div className="p-1">
            <div className="h-1 w-full rounded-full bg-line" />
          </div>
        </div>
      </div>
    );
  }
  if (id === "editorial") {
    return (
      <div className="flex h-full flex-col justify-center gap-1 bg-sheet px-1.5">
        <div className="h-2 w-5/6 rounded-full bg-ink" />
        <div className="h-px w-full bg-ink" />
        <div className="h-1 w-1/2 rounded-full bg-line" />
      </div>
    );
  }
  if (id === "minimal") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 bg-sheet px-2">
        <div className="h-1.5 w-2/3 rounded-full bg-ink" />
        <div className="h-px w-6 bg-ink" />
        <div className="h-1 w-full rounded-full bg-line" />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col bg-sheet">
      <div className="h-2/5 bg-ink" />
      <div className="flex flex-1 flex-col gap-1 p-1.5">
        <div className="h-1 w-1/2 rounded-full bg-ink" />
        <div className="h-1 w-full rounded-full bg-line" />
        <div className="h-1 w-4/5 rounded-full bg-line" />
      </div>
    </div>
  );
}

export function Sidebar({ onDone }: { onDone?: () => void }) {
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const selectedIds = useStudio((s) => s.selectedIds);
  const showGrid = useStudio((s) => s.showGrid);
  const snap = useStudio((s) => s.snap);
  const guides = useStudio((s) => s.guides);
  const margins = useStudio((s) => s.margins);
  const saveStatus = useStudio((s) => s.saveStatus);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const page = activePage(doc, activePageId);
  const jsonRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"templates" | "blocks" | "layers">("templates");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const done = () => onDone?.();

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col bg-ink text-cream border-r border-ink-line select-none z-20">
      {/* En-tête épuré */}
      <div className="flex h-13 shrink-0 items-center justify-between border-b border-ink-line px-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-white font-display text-xs font-black text-ink shadow-xs">
            CV
          </span>
          <div>
            <div className="font-display text-xs font-bold tracking-wider leading-none">CV STUDIO PRO</div>
            <div className="mt-1 text-[10px] text-ink-mute">Édition & Design A4</div>
          </div>
        </div>

        {/* Indicateur de sauvegarde discret */}
        <div
          className="flex items-center gap-1.5 text-[11px] text-ink-mute"
          title="Sauvegarde automatique active"
        >
          <span
            className={cn(
              "size-2 rounded-full transition-all duration-300",
              saveStatus === "saving" ? "bg-amber-400 animate-ping" : "bg-emerald-400",
            )}
          />
          <span className="text-[10px] text-zinc-400">
            {saveStatus === "saving" ? "Sauvegarde..." : mounted && lastSavedAt ? "Auto-save" : "Auto-save"}
          </span>
        </div>
      </div>

      {/* 3 Onglets clairs et ordonnés */}
      <div className="grid grid-cols-3 border-b border-ink-line bg-ink-raise/40 p-1 text-[11px] font-medium shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("templates")}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-md py-1.5 transition text-xs",
            activeTab === "templates" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream",
          )}
        >
          <LayoutTemplate size={13} />
          Modèles
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("blocks")}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-md py-1.5 transition text-xs",
            activeTab === "blocks" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream",
          )}
        >
          <Package size={13} />
          Ajouter
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("layers")}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-md py-1.5 transition text-xs",
            activeTab === "layers" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream",
          )}
        >
          <Layers size={13} />
          Calques
        </button>
      </div>

      {/* Contenu déroulant principal */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3.5 py-3.5">
        {/* ONGLET 1 : MODÈLES, IMPORT & MÉTIERS */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            {/* CARTE HERO : IMPORTER UN CV EXISTANT */}
            <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <FileCheck size={14} className="text-emerald-400" />
                  <span>Importer un CV</span>
                </div>
                <span className="rounded bg-emerald-500/25 px-1.5 py-0.5 text-[9px] font-bold text-emerald-200">
                  IA & Extraction
                </span>
              </div>
              <p className="text-[11px] leading-snug text-zinc-300">
                Téléversez votre PDF, Word (.docx) ou texte brut : l'extracteur remplit instantanément vos sections.
              </p>
              <button
                type="button"
                onClick={() => {
                  useStudio.getState().setExtractorModalOpen(true);
                  done();
                }}
                className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
              >
                <Upload size={13} />
                <span>Sélectionner mon CV existant</span>
              </button>
            </div>

            {/* MODÈLES DE DESIGN */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
                  Modèles de design ({TEMPLATES.length})
                </h2>
                <span className="text-[10px] text-zinc-400">Mise en page pro</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      useStudio.getState().applyTemplate(tpl.id);
                      done();
                    }}
                    className="group overflow-hidden rounded-xl border border-ink-line bg-ink-raise text-left transition hover:border-cream"
                  >
                    <div className="h-16 overflow-hidden bg-sheet/10 p-1 group-hover:scale-[1.02] transition">
                      <Thumb id={tpl.id} />
                    </div>
                    <div className="p-2 border-t border-ink-line/50">
                      <div className="text-xs font-semibold text-cream leading-tight">{tpl.name}</div>
                      <div className="text-[10px] text-ink-mute truncate">{tpl.note}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* REMPLIR PAR MÉTIER (ZÉRO PAGE BLANCHE) */}
            <div className="space-y-2 border-t border-ink-line pt-3">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase flex items-center gap-1">
                  <Wand2 size={12} className="text-amber-400" />
                  <span>Profils par métier</span>
                </h2>
                <span className="text-[10px] text-amber-400 font-medium">1 clic = pré-rempli</span>
              </div>
              <p className="text-[11px] leading-snug text-ink-mute">
                Besoin d'inspiration ? Chargez un profil complet avec chiffres d'impact et compétences types :
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {JOB_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      useStudio.getState().applyJobPreset(preset.id);
                      done();
                    }}
                    className="flex flex-col rounded-lg border border-ink-line bg-ink-raise p-2 text-left transition hover:border-amber-400/60 hover:bg-ink-line/40"
                  >
                    <div className="text-xs font-semibold text-cream leading-tight truncate">{preset.label}</div>
                    <div className="text-[9px] text-ink-mute truncate mt-0.5">{preset.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* HARMONIES COULEURS */}
            <div className="space-y-2 border-t border-ink-line pt-3">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
                  Harmonies Couleurs
                </h2>
                <span className="text-[10px] text-ink-mute">Harmonise tout le CV</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => useStudio.getState().applyPalette(palette.id)}
                    className="group flex flex-col items-center gap-1 rounded-lg border border-ink-line bg-ink-raise p-2 hover:border-cream transition"
                    title={palette.desc}
                  >
                    <div
                      className="size-6 rounded-full border border-ink-line group-hover:scale-110 group-hover:border-cream transition flex items-center justify-center"
                      style={{ backgroundColor: palette.primary }}
                    >
                      <div className="size-2 rounded-full" style={{ backgroundColor: palette.accent }} />
                    </div>
                    <span className="text-[9px] font-medium text-cream text-center leading-tight truncate w-full">
                      {palette.name.split("/")[0].trim()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 2 : AJOUTER DES BLOCS & PACKS */}
        {activeTab === "blocks" && (
          <div className="space-y-4">
            {/* PACKS DE SECTIONS COMPLÈTES */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
                  Packs complets prêts à poser
                </h2>
                <span className="text-[10px] text-amber-400 font-medium">Pré-groupés</span>
              </div>
              <div className="space-y-1.5">
                {SECTION_PACKS.map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => {
                      useStudio.getState().addSectionPack(pack.id);
                      done();
                    }}
                    className="group flex w-full items-center gap-2.5 rounded-xl border border-ink-line bg-ink-raise p-2.5 text-left transition hover:border-cream hover:bg-ink-line/40"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink-line text-sm">
                      {pack.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-cream leading-tight">{pack.name}</div>
                      <div className="text-[10px] text-ink-mute truncate">{pack.desc}</div>
                    </div>
                    <span className="text-xs font-bold text-ink-mute group-hover:text-cream">+</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BLOCS UNITAIRES */}
            <div className="space-y-2 border-t border-ink-line pt-3">
              <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
                Blocs individuels
              </h2>
              <div className="grid grid-cols-4 gap-1.5">
                {ADD.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      useStudio.getState().addElement(item.type);
                      done();
                    }}
                    className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg border border-ink-line bg-ink-raise text-ink-mute hover:text-cream hover:border-cream transition"
                  >
                    <item.icon size={13} strokeWidth={1.75} aria-hidden />
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 3 : PAGES, CALQUES & AFFICHAGE */}
        {activeTab === "layers" && (
          <div className="space-y-4">
            {/* PAGES A4 DU DOCUMENT */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
                  Pages A4 ({doc.pages.length})
                </h2>
                <button
                  type="button"
                  aria-label="Nouvelle page"
                  className="flex h-6 items-center gap-1 px-2 rounded-md bg-cream text-[10px] font-bold text-ink hover:bg-white transition"
                  onClick={() => useStudio.getState().addPage()}
                >
                  <Plus size={11} />
                  <span>Page</span>
                </button>
              </div>
              <div className="space-y-1">
                {doc.pages.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition",
                      item.id === activePageId ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line bg-ink-raise text-cream",
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
                      className="flex size-6 items-center justify-center text-ink-mute hover:text-cream"
                      onClick={() => {
                        useStudio.getState().setActive(item.id);
                        useStudio.getState().duplicatePage();
                      }}
                    >
                      <Copy size={11} />
                    </button>
                    {doc.pages.length > 1 && (
                      <button
                        type="button"
                        title="Supprimer la page"
                        className="flex size-6 items-center justify-center text-red-400 hover:text-red-300"
                        onClick={() => useStudio.getState().deletePage(item.id)}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CALQUES DE LA PAGE ACTIVE */}
            <div className="space-y-2 border-t border-ink-line pt-3">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
                  Calques ({page.elements.length})
                </h2>
                <span className="text-[10px] text-ink-mute">Ordre Z</span>
              </div>
              <div className="max-h-48 space-y-1 overflow-y-auto pr-0.5">
                {[...page.elements]
                  .sort((a, b) => b.z - a.z)
                  .map((el) => (
                    <div
                      key={el.id}
                      className={cn(
                        "flex items-center gap-1 rounded-lg border px-2 py-1 text-xs transition",
                        selectedIds.includes(el.id)
                          ? "border-cream bg-cream text-ink font-medium"
                          : "border-ink-line bg-ink-raise text-cream",
                      )}
                    >
                      <button
                        type="button"
                        className="min-w-0 flex-1 truncate text-left text-xs"
                        onClick={() => {
                          useStudio.getState().setActive(page.id);
                          useStudio.getState().select([el.id]);
                        }}
                      >
                        {snippet(el)}
                      </button>
                      <button
                        type="button"
                        aria-label={el.hidden ? "Afficher" : "Masquer"}
                        className="flex size-6 items-center justify-center text-ink-mute hover:text-cream"
                        onClick={() => useStudio.getState().toggleHidden(page.id, el.id)}
                      >
                        {el.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                    </div>
                  ))}
                {page.elements.length === 0 && (
                  <p className="text-xs text-ink-mute py-2 text-center">Page vide.</p>
                )}
              </div>
            </div>

            {/* REPÈRES & AFFICHAGE */}
            <div className="space-y-2 border-t border-ink-line pt-3">
              <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
                Aides au positionnement
              </h2>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    ["Grille", showGrid, "showGrid", Grid3x3],
                    ["Aimant", snap, "snap", Magnet],
                    ["Repères", guides, "guides", Magnet],
                    ["Marges A4", margins, "margins", Minus],
                  ] as const
                ).map(([label, on, key]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => useStudio.getState().toggle(key)}
                    className={cn(
                      "flex h-8 items-center justify-between rounded-lg border px-2.5 text-[11px] font-medium transition",
                      on ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line bg-ink-raise text-ink-mute hover:text-cream",
                    )}
                  >
                    <span>{label}</span>
                    <span className="text-[10px] font-bold">{on ? "✓" : ""}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PIED DE BARRE LATÉRALE ÉPURÉ (ZÉRO BOUTONS EN DOUBLE) */}
      <div className="shrink-0 border-t border-ink-line p-3 space-y-2 bg-ink">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            className="flex h-8 items-center justify-center gap-1 rounded-lg border border-ink-line bg-ink-raise text-[11px] font-medium text-cream hover:bg-ink-line/50 transition"
            onClick={() => jsonRef.current?.click()}
          >
            <Upload size={12} />
            <span>Ouvrir JSON</span>
          </button>
          <button
            type="button"
            className="flex h-8 items-center justify-center gap-1 rounded-lg border border-ink-line bg-ink-raise text-[11px] font-medium text-cream hover:bg-ink-line/50 transition"
            onClick={() => document.dispatchEvent(new Event("libre-json"))}
          >
            <FileText size={12} />
            <span>Sauvegarder</span>
          </button>
        </div>

        <button
          type="button"
          className="h-7 w-full text-[11px] text-ink-mute hover:text-cream transition text-center"
          onClick={() => {
            if (confirm("Réinitialiser et créer un nouveau document vierge ?")) {
              useStudio.getState().newDocument();
            }
          }}
        >
          Nouveau document vierge
        </button>

        <input
          ref={jsonRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              try {
                useStudio.getState().loadDocument(JSON.parse(String(reader.result)));
              } catch {
                useStudio.getState().notify("JSON illisible");
              }
            };
            reader.readAsText(file);
            event.target.value = "";
          }}
        />
      </div>
    </aside>
  );
}
