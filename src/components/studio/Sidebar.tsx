import { useRef, useState } from "react";
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
  Printer,
  Square,
  Tags,
  Type,
  Upload,
} from "lucide-react";
import { activePage, useStudio } from "@/cv/store";
import { TEMPLATES } from "@/cv/templates";
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
  const page = activePage(doc, activePageId);
  const jsonRef = useRef<HTMLInputElement>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importTemplate, setImportTemplate] = useState<TemplateId>("modern");

  const done = () => onDone?.();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-ink text-cream">
      <div className="flex h-12 items-center gap-2 border-b border-ink-line px-3">
        <span className="flex size-7 items-center justify-center rounded-ui bg-signal font-display text-sm font-bold text-signal-ink">L</span>
        <div className="min-w-0">
          <div className="font-display text-sm leading-none font-bold tracking-wide">LIBRE</div>
          <div className="mt-1 text-xs tracking-wide text-ink-mute">Éditeur de CV</div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <section className="space-y-2">
          <h2 className="text-xs font-semibold tracking-widest text-ink-mute uppercase">Modèles</h2>
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  useStudio.getState().applyTemplate(tpl.id);
                  done();
                }}
                className="overflow-hidden rounded-ui border border-ink-line bg-ink-raise text-left hover:border-ink-mute"
              >
                <div className="h-14">{<Thumb id={tpl.id} />}</div>
                <div className="px-2 py-1.5">
                  <div className="text-xs font-semibold">{tpl.name}</div>
                  <div className="text-xs text-ink-mute">{tpl.note}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold tracking-widest text-ink-mute uppercase">Ajouter</h2>
          <div className="grid grid-cols-4 gap-1.5">
            {ADD.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => {
                  useStudio.getState().addElement(item.type);
                  done();
                }}
                className="flex h-14 flex-col items-center justify-center gap-1 rounded-ui border border-ink-line bg-ink-raise text-ink-mute hover:text-cream"
              >
                <item.icon size={14} strokeWidth={1.75} aria-hidden />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold tracking-widest text-ink-mute uppercase">Calques</h2>
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {[...page.elements].sort((a, b) => b.z - a.z).map((el) => (
              <div
                key={el.id}
                className={cn(
                  "flex items-center gap-1 rounded-ui border px-1.5 py-1",
                  selectedIds.includes(el.id) ? "border-cream bg-cream text-ink" : "border-ink-line bg-ink-raise",
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
                  className="flex size-7 items-center justify-center"
                  onClick={() => useStudio.getState().toggleHidden(page.id, el.id)}
                >
                  {el.hidden ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            ))}
            {page.elements.length === 0 && <p className="text-xs text-ink-mute">Page vide. Ajoute un bloc, ou pose un modèle.</p>}
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-widest text-ink-mute uppercase">Pages</h2>
            <button type="button" aria-label="Nouvelle page" className="flex size-7 items-center justify-center rounded-ui bg-cream text-ink" onClick={() => useStudio.getState().addPage()}>
              <FilePlus size={14} />
            </button>
          </div>
          <div className="space-y-1">
            {doc.pages.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-1 rounded-ui border px-2 py-1",
                  item.id === activePageId ? "border-cream bg-cream text-ink" : "border-ink-line",
                )}
              >
                <button type="button" className="min-w-0 flex-1 truncate text-left text-xs font-medium" onClick={() => useStudio.getState().setActive(item.id)}>
                  {index + 1}. {item.name}
                </button>
                <button type="button" aria-label="Dupliquer la page" className="flex size-7 items-center justify-center" onClick={() => { useStudio.getState().setActive(item.id); useStudio.getState().duplicatePage(); }}>
                  <Copy size={12} />
                </button>
                <button type="button" aria-label="Supprimer la page" className="px-1 text-xs text-signal" onClick={() => useStudio.getState().deletePage(item.id)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold tracking-widest text-ink-mute uppercase">Planche</h2>
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
                  "h-9 rounded-ui border px-2 text-left text-xs font-medium",
                  on ? "border-cream bg-cream text-ink" : "border-ink-line text-ink-mute",
                )}
              >
                {label}
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
