import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Circle,
  Copy,
  Eye,
  EyeOff,
  FileJson,
  FilePlus,
  Gauge,
  GraduationCap,
  Grid3x3,
  Heading,
  Image,
  Link,
  Magnet,
  Minus,
  Package,
  Palette,
  Printer,
  Square,
  Tags,
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
  const past = useStudio((s) => s.past.length);
  const future = useStudio((s) => s.future.length);
  const saveStatus = useStudio((s) => s.saveStatus);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const page = activePage(doc, activePageId);
  const jsonRef = useRef<HTMLInputElement>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importTemplate, setImportTemplate] = useState<TemplateId>("modern");
  const [activeTab, setActiveTab] = useState<"presets" | "blocks" | "templates">("presets");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const done = () => onDone?.();

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col bg-ink text-cream">
      {/* En-tête avec indicateur d'Auto-Save en direct */}
      <div className="flex h-13 items-center justify-between border-b border-ink-line px-3.5">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-ui bg-signal font-display text-sm font-bold text-signal-ink">
            CV
          </span>
          <div className="min-w-0">
            <div className="font-display text-sm leading-none font-bold tracking-wide">STUDIO PRO</div>
            <div className="mt-0.5 text-[10px] tracking-wide text-ink-mute">Éditeur & Remplissage</div>
          </div>
        </div>

        {/* Badge d'Auto-Save temps réel */}
        <div
          className="flex items-center gap-1.5 rounded-full border border-ink-line bg-ink-raise px-2 py-0.5 text-[11px] text-ink-mute"
          title="Vos modifications sont automatiquement sauvegardées en continu dans le navigateur"
        >
          <span
            className={cn(
              "size-2 rounded-full transition-all duration-300",
              saveStatus === "saving" ? "bg-amber-400 animate-ping" : "bg-emerald-400",
            )}
          />
          <span className="font-mono text-[10px] text-cream">
            {saveStatus === "saving" ? "Sauvegarde..." : mounted && lastSavedAt ? `Sauvegardé` : "Auto-save"}
          </span>
        </div>
      </div>

      {/* Onglets de navigation rapide */}
      <div className="grid grid-cols-3 border-b border-ink-line bg-ink-raise/40 p-1 text-[11px] font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("presets")}
          className={cn(
            "flex items-center justify-center gap-1 rounded-md py-1.5 transition",
            activeTab === "presets" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream",
          )}
        >
          <Wand2 size={12} />
          Métiers
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("blocks")}
          className={cn(
            "flex items-center justify-center gap-1 rounded-md py-1.5 transition",
            activeTab === "blocks" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream",
          )}
        >
          <Package size={12} />
          Packs
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("templates")}
          className={cn(
            "flex items-center justify-center gap-1 rounded-md py-1.5 transition",
            activeTab === "templates" ? "bg-cream text-ink font-semibold shadow-xs" : "text-ink-mute hover:text-cream",
          )}
        >
          <Palette size={12} />
          Modèles
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-3">
        {/* ONGLET 1: LA BAGUETTE MAGIQUE (REMPLIR PAR MÉTIER EN 1 CLIC) */}
        {activeTab === "presets" && (
          <div className="space-y-4">
            <div className="rounded-ui border border-amber-500/30 bg-amber-500/10 p-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Wand2 size={13} className="shrink-0" />
                <span>Zéro page blanche en 1 clic</span>
              </div>
              <p className="mt-1 text-[11px] leading-snug text-ink-mute">
                Sélectionnez votre métier : l'ensemble du CV est instantanément rempli avec des textes réalistes, des chiffres d'impact et des compétences percutantes.
              </p>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">8 Métiers pré-rédigés</h2>
              <div className="grid grid-cols-1 gap-1.5">
                {JOB_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      useStudio.getState().applyJobPreset(preset.id);
                      done();
                    }}
                    className="group flex items-center justify-between rounded-ui border border-ink-line bg-ink-raise px-3 py-2 text-left transition hover:border-amber-400/60 hover:bg-ink-line/50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-cream group-hover:text-amber-200 truncate">
                        {preset.label}
                      </div>
                      <div className="text-[10px] text-ink-mute truncate">{preset.badge}</div>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity">
                      Remplir →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* HARMONIES COULEURS EN 1 CLIC */}
            <div className="space-y-2 border-t border-ink-line pt-3">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">Harmonies Couleurs (1 clic)</h2>
                <span className="text-[10px] text-ink-mute">Harmonise tout</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => useStudio.getState().applyPalette(palette.id)}
                    className="group flex flex-col items-center gap-1 rounded-ui border border-ink-line bg-ink-raise p-2 hover:border-cream"
                    title={palette.desc}
                  >
                    <div
                      className="size-7 rounded-full border-2 border-ink-line group-hover:scale-105 group-hover:border-cream transition flex items-center justify-center"
                      style={{ backgroundColor: palette.primary }}
                    >
                      <div className="size-2.5 rounded-full" style={{ backgroundColor: palette.accent }} />
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

        {/* ONGLET 2: PACKS DE BLOCS TOUTS-FAITS & AJOUT INDIVIDUEL */}
        {activeTab === "blocks" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">Packs de sections pré-groupées</h2>
                <span className="text-[10px] text-amber-400 font-medium">Prêts à poser</span>
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
                    className="group flex w-full items-center gap-2.5 rounded-ui border border-ink-line bg-ink-raise p-2 text-left transition hover:border-cream hover:bg-ink-line/40"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-ink-line text-sm">
                      {pack.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-cream leading-tight">{pack.name}</div>
                      <div className="text-[10px] text-ink-mute truncate">{pack.desc}</div>
                    </div>
                    <span className="text-xs text-ink-mute group-hover:text-cream">+</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-ink-line pt-3">
              <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">Blocs unitaires</h2>
              <div className="grid grid-cols-4 gap-1.5">
                {ADD.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      useStudio.getState().addElement(item.type);
                      done();
                    }}
                    className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-ui border border-ink-line bg-ink-raise text-ink-mute hover:text-cream transition"
                  >
                    <item.icon size={13} strokeWidth={1.75} aria-hidden />
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 3: MODÈLES ET THÈMES */}
        {activeTab === "templates" && (
          <div className="space-y-4">
            <section className="space-y-2">
              <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">Templates Graphiques</h2>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      useStudio.getState().applyTemplate(tpl.id);
                      done();
                    }}
                    className="overflow-hidden rounded-ui border border-ink-line bg-ink-raise text-left hover:border-cream transition"
                  >
                    <div className="h-14">{<Thumb id={tpl.id} />}</div>
                    <div className="px-2 py-1.5">
                      <div className="text-xs font-semibold">{tpl.name}</div>
                      <div className="text-[10px] text-ink-mute">{tpl.note}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SECTION CALQUES */}
        <section className="space-y-2 border-t border-ink-line pt-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">
              Calques ({page.elements.length})
            </h2>
            <span className="text-[10px] text-ink-mute">Ordre Z</span>
          </div>
          <div className="max-h-36 space-y-1 overflow-y-auto pr-0.5">
            {[...page.elements]
              .sort((a, b) => b.z - a.z)
              .map((el) => (
                <div
                  key={el.id}
                  className={cn(
                    "flex items-center gap-1 rounded-ui border px-1.5 py-1",
                    selectedIds.includes(el.id)
                      ? "border-cream bg-cream text-ink"
                      : "border-ink-line bg-ink-raise",
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
              <p className="text-xs text-ink-mute">Page vide. Choisissez un métier ou un pack.</p>
            )}
          </div>
        </section>

        {/* SECTION PAGES & PLANCHE */}
        <section className="space-y-2 border-t border-ink-line pt-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">Pages ({doc.pages.length})</h2>
            <button
              type="button"
              aria-label="Nouvelle page"
              className="flex size-6 items-center justify-center rounded-ui bg-cream text-xs font-bold text-ink hover:bg-white"
              onClick={() => useStudio.getState().addPage()}
            >
              <FilePlus size={13} />
            </button>
          </div>
          <div className="space-y-1">
            {doc.pages.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-1 rounded-ui border px-2 py-1 text-xs",
                  item.id === activePageId ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line",
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
                  aria-label="Dupliquer la page"
                  className="flex size-6 items-center justify-center text-ink-mute hover:text-cream"
                  onClick={() => {
                    useStudio.getState().setActive(item.id);
                    useStudio.getState().duplicatePage();
                  }}
                >
                  <Copy size={11} />
                </button>
                <button
                  type="button"
                  aria-label="Supprimer la page"
                  className="px-1 text-signal hover:text-red-300"
                  onClick={() => useStudio.getState().deletePage(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* AFFICHAGE & REPERES */}
        <section className="space-y-2 border-t border-ink-line pt-3">
          <h2 className="text-[10px] font-bold tracking-widest text-ink-mute uppercase">Affichage & Planche</h2>
          <div className="grid grid-cols-2 gap-1.5">
            {(
              [
                ["Grille", showGrid, "showGrid", Grid3x3],
                ["Aimant", snap, "snap", Magnet],
                ["Repères", guides, "guides", Magnet],
                ["Marges", margins, "margins", Minus],
              ] as const
            ).map(([label, on, key]) => (
              <button
                key={key}
                type="button"
                onClick={() => useStudio.getState().toggle(key)}
                className={cn(
                  "flex h-8 items-center justify-between rounded-ui border px-2 text-[11px] font-medium transition",
                  on ? "border-cream bg-cream text-ink font-semibold" : "border-ink-line bg-ink-raise text-ink-mute hover:text-cream",
                )}
              >
                <span>{label}</span>
                <span className="text-[10px]">{on ? "✓" : ""}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-2 border-t border-ink-line p-3">
        <div className="flex gap-1.5">
          <button type="button" className="h-10 flex-1 rounded-ui border border-ink-line text-xs font-medium disabled:opacity-30" disabled={past === 0} onClick={() => useStudio.getState().undo()}>
            Annuler
          </button>
          <button type="button" className="h-10 flex-1 rounded-ui border border-ink-line text-xs font-medium disabled:opacity-30" disabled={future === 0} onClick={() => useStudio.getState().redo()}>
            Rétablir
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button type="button" className="flex h-11 items-center justify-center gap-1 rounded-ui bg-cream text-xs font-semibold text-ink" onClick={() => window.print()}>
            <Printer size={13} /> PDF
          </button>
          <button type="button" className="h-11 rounded-ui border border-ink-line text-xs font-semibold" onClick={() => document.dispatchEvent(new Event("libre-png"))}>
            PNG
          </button>
          <button type="button" className="h-11 rounded-ui border border-ink-line text-xs font-semibold" onClick={() => document.dispatchEvent(new Event("libre-json"))}>
            JSON
          </button>
        </div>
        <div className="flex gap-1.5">
          <button type="button" className="flex h-10 flex-1 items-center justify-center gap-1 rounded-ui border border-ink-line text-xs" onClick={() => jsonRef.current?.click()}>
            <Upload size={13} /> Ouvrir
          </button>
          <button type="button" className="flex h-10 flex-1 items-center justify-center gap-1 rounded-ui border border-ink-line text-xs" onClick={() => setImportOpen(true)}>
            <FileJson size={13} /> Coller
          </button>
        </div>
        <button type="button" className="h-8 w-full text-xs text-ink-mute hover:text-cream" onClick={() => useStudio.getState().newDocument()}>
          Nouveau document
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

      {importOpen && (
        <div className="no-print fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 sm:items-center">
          <div className="w-full max-w-lg rounded-ui border border-line bg-cream p-4 text-ink shadow-none">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-bold">Coller un CV</h3>
              <button type="button" className="flex size-8 items-center justify-center rounded-ui bg-paper" onClick={() => setImportOpen(false)} aria-label="Fermer">
                ×
              </button>
            </div>
            <p className="mb-3 text-sm text-mute">
              Colle le texte brut. Nom, poste, e-mail, puis des blocs séparés par une ligne vide sous Expérience, Formation, Compétences, Langues.
            </p>
            <textarea
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              rows={8}
              className="mb-3 w-full resize-none rounded-ui border border-line bg-sheet p-3 text-sm outline-none"
              placeholder={"Camille Martin\nDirectrice artistique\nHuit ans entre l'édition et le numérique.\n\nExpérience\nDirectrice artistique\nAtelier Nord — Genève\n2022 — Aujourd'hui\nRefonte de l'identité et du site.\n\nFormation\nBachelor design\nECAL\n2014 — 2017\n\nCompétences\nTypographie, Direction, Print\n\nLangues\nFrançais — natif\nAnglais — courant"}
            />
            <div className="flex flex-wrap items-center justify-end gap-2">
              <select
                value={importTemplate}
                onChange={(event) => setImportTemplate(event.target.value as TemplateId)}
                className="h-11 rounded-ui border border-line bg-sheet px-2 text-sm"
              >
                {TEMPLATES.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="h-11 rounded-ui bg-ink px-4 text-sm font-semibold text-cream"
                onClick={() => {
                  useStudio.getState().importText(importText, importTemplate);
                  setImportOpen(false);
                  setImportText("");
                  done();
                }}
              >
                Poser sur la page
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
