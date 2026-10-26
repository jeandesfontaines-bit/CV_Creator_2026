import type { ReactNode } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  BringToFront,
  Copy,
  Image as ImageIcon,
  Italic,
  Lock,
  SendToBack,
  Sparkles,
  Trash2,
  Unlock,
} from "lucide-react";
import { readImage } from "@/cv/image";
import { activePage, useStudio, type ElementPatch } from "@/cv/store";
import type { ContactIcon, CVElement, ElStyle } from "@/cv/types";
import { FONTS, TYPE_LABEL } from "@/cv/types";
import { cn } from "@/lib/utils";

const input = "h-10 w-full rounded-ui border border-line bg-sheet px-2 text-sm outline-none";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-mute">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function release() {
  useStudio.getState().release();
}

export function Inspector() {
  const doc = useStudio((s) => s.doc);
  const activePageId = useStudio((s) => s.activePageId);
  const selectedIds = useStudio((s) => s.selectedIds);
  const page = activePage(doc, activePageId);
  const selected = page.elements.filter((el) => selectedIds.includes(el.id));
  const one = selected.length === 1 ? selected[0] : null;
  const profile = doc.profile;

  const live = (id: string, patch: ElementPatch) => {
    useStudio.getState().patchElement(page.id, id, patch, true);
  };

  const identity = (field: "name" | "role" | "email" | "phone" | "location" | "link" | "summary", value: string) => {
    useStudio.getState().setIdentity(field, value);
  };

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-l border-line bg-cream select-none z-20">
      <div className="flex h-13 shrink-0 items-center justify-between border-b border-line px-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ink">
          {one ? TYPE_LABEL[one.type] : selected.length > 1 ? `${selected.length} éléments sélectionnés` : "Propriétés du document"}
        </h2>
        {one && (
          <span className="text-[10px] text-mute font-mono">
            {Math.round(one.w)}×{Math.round(one.h)}px
          </span>
        )}
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {!selected.length && (
          <>
            <div className="rounded-xl border border-line bg-sheet/80 p-3 space-y-1.5">
              <div className="text-xs font-semibold text-ink flex items-center gap-1.5">
                <span>💡</span>
                <span>Astuce d'édition</span>
              </div>
              <p className="text-[11px] leading-relaxed text-mute">
                Cliquez sur n'importe quel bloc sur la page pour le modifier directement, ou ajustez vos informations globales ci-dessous.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between border-b border-line pb-1.5">
                <span className="text-[10px] font-bold tracking-widest text-mute uppercase">Coordonnées du profil</span>
              </div>

              <Field label="Nom complet">
                <input className={input} value={profile.name} onChange={(e) => identity("name", e.target.value)} onBlur={release} placeholder="Ex: Alexandra Dubois" />
              </Field>
              <Field label="Intitulé du poste">
                <input className={input} value={profile.role} onChange={(e) => identity("role", e.target.value)} onBlur={release} placeholder="Ex: Lead Développeur" />
              </Field>
              <Field label="Adresse e-mail">
                <input className={input} value={profile.email} onChange={(e) => identity("email", e.target.value)} onBlur={release} placeholder="contact@domaine.com" />
              </Field>
              <Field label="Téléphone">
                <input className={input} value={profile.phone} onChange={(e) => identity("phone", e.target.value)} onBlur={release} placeholder="+33 6 00 00 00 00" />
              </Field>
              <Field label="Ville / Mobilité">
                <input className={input} value={profile.location} onChange={(e) => identity("location", e.target.value)} onBlur={release} placeholder="Paris, France" />
              </Field>
              <Field label="Lien professionnel (LinkedIn, Portfolio)">
                <input className={input} value={profile.link} onChange={(e) => identity("link", e.target.value)} onBlur={release} placeholder="linkedin.com/in/nom" />
              </Field>
              <Field label="Résumé de profil / Accroche">
                <textarea className={`${input} h-24 resize-none py-2`} value={profile.summary} onChange={(e) => identity("summary", e.target.value)} onBlur={release} placeholder="Présentation synthétique..." />
              </Field>
              <Field label="Couleur de fond du document A4">
                <input
                  type="color"
                  value={toHex(page.background)}
                  onChange={(e) => useStudio.getState().setPageBackground(e.target.value, true)}
                  onBlur={release}
                  className="h-10 w-full cursor-pointer rounded-ui border border-line bg-sheet"
                />
              </Field>
            </div>

            <div className="space-y-1.5 border-t border-line pt-3 text-[11px] leading-relaxed text-mute">
              <div className="font-semibold text-ink text-xs mb-1">Raccourcis clavier :</div>
              <p>• <strong>Double-clic</strong> : éditer le texte sur la feuille</p>
              <p>• <strong>Flèches</strong> : déplacer de 1 px (Maj : 8 px)</p>
              <p>• <strong>⌘D / Ctrl+D</strong> : dupliquer le bloc</p>
              <p>• <strong>Suppr / Retour</strong> : effacer le bloc</p>
            </div>
          </>
        )}

        {selected.length > 1 && (
          <div className="space-y-2">
            <p className="text-xs text-mute">Aligner la sélection</p>
            <div className="grid grid-cols-3 gap-1">
              {(
                [
                  ["left", "Gauche"],
                  ["center", "Centre"],
                  ["right", "Droite"],
                  ["top", "Haut"],
                  ["middle", "Milieu"],
                  ["bottom", "Bas"],
                ] as const
              ).map(([mode, label]) => (
                <button key={mode} type="button" className="h-9 rounded-ui border border-line text-xs" onClick={() => useStudio.getState().align(mode)}>
                  {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1">
              <button type="button" className="h-9 rounded-ui border border-line text-xs" onClick={() => useStudio.getState().distribute("x")}>
                Répartir ↔
              </button>
              <button type="button" className="h-9 rounded-ui border border-line text-xs" onClick={() => useStudio.getState().distribute("y")}>
                Répartir ↕
              </button>
            </div>
          </div>
        )}

        {one && <ContentFields el={one} pageId={page.id} />}

        {selected.length > 0 && (
          <StyleFields
            style={one?.style ?? selected[0].style}
            mixed={selected.length > 1}
            textual={!one || !["photo", "rect", "ellipse", "rule"].includes(one.type)}
          />
        )}

        {one && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="X">
              <input className={input} type="number" value={Math.round(one.x)} onChange={(e) => live(one.id, { x: Number(e.target.value) })} onBlur={release} />
            </Field>
            <Field label="Y">
              <input className={input} type="number" value={Math.round(one.y)} onChange={(e) => live(one.id, { y: Number(e.target.value) })} onBlur={release} />
            </Field>
            <Field label="Largeur">
              <input className={input} type="number" value={Math.round(one.w)} onChange={(e) => live(one.id, { w: Math.max(20, Number(e.target.value) || 20) })} onBlur={release} />
            </Field>
            <Field label="Hauteur">
              <input className={input} type="number" value={Math.round(one.h)} onChange={(e) => live(one.id, { h: Math.max(12, Number(e.target.value) || 12) })} onBlur={release} />
            </Field>
            <Field label="Rotation">
              <input className={input} type="number" value={Math.round(one.rotation)} onChange={(e) => live(one.id, { rotation: Number(e.target.value) || 0 })} onBlur={release} />
            </Field>
          </div>
        )}

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1 border-t border-line pt-3">
            <IconTip label="Premier plan" onClick={() => useStudio.getState().order("front")}>
              <BringToFront size={15} />
            </IconTip>
            <IconTip label="Arrière-plan" onClick={() => useStudio.getState().order("back")}>
              <SendToBack size={15} />
            </IconTip>
            <IconTip label="Dupliquer" onClick={() => useStudio.getState().duplicateSelected()}>
              <Copy size={15} />
            </IconTip>
            <IconTip label={selected.some((el) => !el.locked) ? "Verrouiller" : "Déverrouiller"} onClick={() => useStudio.getState().lockSelected(selected.some((el) => !el.locked))}>
              {selected.some((el) => !el.locked) ? <Lock size={15} /> : <Unlock size={15} />}
            </IconTip>
            <IconTip label="Supprimer" danger onClick={() => useStudio.getState().deleteSelected()}>
              <Trash2 size={15} />
            </IconTip>
          </div>
        )}
      </div>
    </aside>
  );
}

function IconTip({ label, onClick, children, danger }: { label: string; onClick: () => void; children: ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn("flex size-10 items-center justify-center rounded-ui border border-line", danger && "text-signal")}
    >
      {children}
    </button>
  );
}

function ContentFields({ el, pageId }: { el: CVElement; pageId: string }) {
  const patch = (content: CVElement["content"], live = true) => {
    useStudio.getState().setEditing(null);
    useStudio.getState().patchElement(pageId, el.id, { content }, live);
  };
  const c = el.content;
  if (el.type === "heading" || el.type === "text" || el.type === "contact") {
    return (
      <div className="space-y-3">
        {el.type === "contact" && (
          <Field label="Icône">
            <select className={input} value={c.icon ?? "mail"} onChange={(e) => patch({ icon: e.target.value as ContactIcon }, false)}>
              <option value="mail">E-mail</option>
              <option value="phone">Téléphone</option>
              <option value="pin">Lieu</option>
              <option value="link">Lien</option>
            </select>
          </Field>
        )}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-mute">Texte</span>
            <button
              type="button"
              onClick={() => useStudio.getState().boostElementText(el.id)}
              className="flex items-center gap-1 rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-900 hover:bg-amber-400/30 transition"
              title="Formuler ce texte de manière percutante"
            >
              <Sparkles size={11} />
              <span>✨ Formuler comme un pro</span>
            </button>
          </div>
          <textarea className={`${input} h-24 resize-none py-2`} value={c.text ?? ""} onChange={(e) => patch({ text: e.target.value })} onBlur={release} />
        </div>
      </div>
    );
  }
  if (el.type === "experience") {
    return (
      <div className="space-y-3">
        <Field label="Poste">
          <input className={input} value={c.role ?? ""} onChange={(e) => patch({ role: e.target.value })} onBlur={release} />
        </Field>
        <Field label="Structure">
          <input className={input} value={c.company ?? ""} onChange={(e) => patch({ company: e.target.value })} onBlur={release} />
        </Field>
        <Field label="Dates">
          <input className={input} value={c.date ?? ""} onChange={(e) => patch({ date: e.target.value })} onBlur={release} />
        </Field>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-mute">Récit & Réalisations</span>
            <button
              type="button"
              onClick={() => useStudio.getState().boostElementText(el.id)}
              className="flex items-center gap-1 rounded-md bg-amber-400/25 px-2 py-0.5 text-[10px] font-bold text-amber-900 hover:bg-amber-400/40 transition"
              title="Ajoute une réalisation concrète et chiffrée"
            >
              <Sparkles size={11} />
              <span>✨ Chiffrer comme un pro</span>
            </button>
          </div>
          <textarea className={`${input} h-28 resize-none py-2`} value={c.desc ?? ""} onChange={(e) => patch({ desc: e.target.value })} onBlur={release} />
        </div>
      </div>
    );
  }
  if (el.type === "education") {
    return (
      <div className="space-y-3">
        <Field label="Diplôme">
          <input className={input} value={c.degree ?? ""} onChange={(e) => patch({ degree: e.target.value })} onBlur={release} />
        </Field>
        <Field label="École">
          <input className={input} value={c.school ?? ""} onChange={(e) => patch({ school: e.target.value })} onBlur={release} />
        </Field>
        <Field label="Dates">
          <input className={input} value={c.date ?? ""} onChange={(e) => patch({ date: e.target.value })} onBlur={release} />
        </Field>
      </div>
    );
  }
  if (el.type === "skills") {
    return (
      <Field label="Une compétence par ligne">
        <textarea
          className={`${input} h-28 resize-none py-2`}
          value={(c.items ?? []).join("\n")}
          onChange={(e) => patch({ items: e.target.value.split("\n") })}
          onBlur={(e) => {
            patch({ items: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) }, false);
            release();
          }}
        />
      </Field>
    );
  }
  if (el.type === "meters") {
    const meters = c.meters ?? [];
    return (
      <div className="space-y-2">
        {meters.map((meter, index) => (
          <div key={index} className="grid grid-cols-[1fr_4.5rem] gap-1">
            <input
              className={input}
              value={meter.label}
              onChange={(e) => {
                const next = meters.map((m, i) => (i === index ? { ...m, label: e.target.value } : m));
                patch({ meters: next });
              }}
              onBlur={release}
            />
            <input
              className={input}
              type="number"
              min={0}
              max={100}
              value={meter.value}
              onChange={(e) => {
                const next = meters.map((m, i) => (i === index ? { ...m, value: Number(e.target.value) } : m));
                patch({ meters: next });
              }}
              onBlur={release}
            />
          </div>
        ))}
        <button
          type="button"
          className="h-9 w-full rounded-ui border border-line text-xs"
          onClick={() => patch({ meters: [...meters, { label: "Nouvelle", value: 50 }] }, false)}
        >
          Ajouter un niveau
        </button>
      </div>
    );
  }
  if (el.type === "photo") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {c.src ? (
            <img src={c.src} alt="Photo profil" className="size-16 rounded-xl object-cover border border-line shadow-xs" />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-xl border border-dashed border-line bg-sheet text-mute">
              <ImageIcon size={20} />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <label className="flex h-9 w-full cursor-pointer items-center justify-center rounded-ui bg-ink text-xs font-semibold text-cream hover:bg-neutral-800 transition">
              <span>{c.src ? "Remplacer l'image" : "Choisir une photo"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const src = await readImage(file);
                    patch({ src }, false);
                    useStudio.getState().notify("Photo optimisée & intégrée !");
                  } catch {
                    useStudio.getState().notify("Impossible de lire cette image");
                  }
                  e.target.value = "";
                }}
              />
            </label>
            <p className="text-[10px] text-mute">Compression & redimensionnement automatiques HD (&lt;80 KB)</p>
          </div>
        </div>
        {c.src && (
          <button
            type="button"
            onClick={() => patch({ src: "" }, false)}
            className="flex h-8 w-full items-center justify-center gap-1 rounded-ui border border-line text-xs text-mute hover:border-red-300 hover:text-red-500 transition"
          >
            <Trash2 size={12} />
            <span>Retirer la photo</span>
          </button>
        )}
      </div>
    );
  }
  return null;
}

function StyleFields({ style, mixed, textual }: { style: ElStyle; mixed: boolean; textual: boolean }) {
  const patch = (next: Partial<ElStyle>, live = false) => useStudio.getState().patchSelectedStyle(next, live);
  return (
    <div className="space-y-3 border-t border-line pt-3">
      {mixed && <p className="text-xs text-mute">Le style s’applique à toute la sélection.</p>}
      {textual && (
        <>
          <Field label="Police">
            <select className={input} value={FONTS.includes(style.fontFamily as (typeof FONTS)[number]) ? style.fontFamily : "Source Sans 3"} onChange={(e) => patch({ fontFamily: e.target.value })}>
              {FONTS.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-[1fr_auto_auto] gap-1">
            <input className={input} type="number" min={8} max={160} value={style.fontSize} onChange={(e) => patch({ fontSize: Number(e.target.value) || 12 }, true)} onBlur={release} />
            <button type="button" aria-label="Gras" className={cn("flex size-10 items-center justify-center rounded-ui border border-line", style.fontWeight >= 650 && "bg-ink text-cream")} onClick={() => patch({ fontWeight: style.fontWeight >= 650 ? 400 : 700 })}>
              <Bold size={15} />
            </button>
            <button type="button" aria-label="Italique" className={cn("flex size-10 items-center justify-center rounded-ui border border-line", style.italic && "bg-ink text-cream")} onClick={() => patch({ italic: !style.italic })}>
              <Italic size={15} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {(
              [
                ["left", AlignLeft],
                ["center", AlignCenter],
                ["right", AlignRight],
              ] as const
            ).map(([align, Icon]) => (
              <button key={align} type="button" aria-label={align} className={cn("flex h-9 items-center justify-center rounded-ui border border-line", style.textAlign === align && "bg-ink text-cream")} onClick={() => patch({ textAlign: align })}>
                <Icon size={15} />
              </button>
            ))}
          </div>
          <Field label="Couleur du texte">
            <input type="color" value={toHex(style.color)} onChange={(e) => patch({ color: e.target.value }, true)} onBlur={release} className="h-10 w-full cursor-pointer rounded-ui border border-line bg-sheet" />
          </Field>
          <Field label="Interligne">
            <input type="range" min={0.9} max={2} step={0.05} value={style.lineHeight} onChange={(e) => patch({ lineHeight: Number(e.target.value) }, true)} onPointerUp={release} className="w-full" />
          </Field>
          <Field label="Approche">
            <input type="range" min={-1} max={8} step={0.1} value={style.letterSpacing} onChange={(e) => patch({ letterSpacing: Number(e.target.value) }, true)} onPointerUp={release} className="w-full" />
          </Field>
        </>
      )}
      <Field label="Fond">
        <div className="flex gap-1">
          <input type="color" value={toHex(style.backgroundColor)} onChange={(e) => patch({ backgroundColor: e.target.value }, true)} onBlur={release} className="h-10 min-w-0 flex-1 cursor-pointer rounded-ui border border-line bg-sheet" />
          <button type="button" className="h-10 rounded-ui border border-line px-2 text-xs" onClick={() => patch({ backgroundColor: "transparent" })}>
            Aucun
          </button>
        </div>
      </Field>
      <Field label="Coins">
        <input type="range" min={0} max={80} value={style.borderRadius} onChange={(e) => patch({ borderRadius: Number(e.target.value) }, true)} onPointerUp={release} className="w-full" />
      </Field>
      <Field label="Opacité">
        <input type="range" min={0.15} max={1} step={0.05} value={style.opacity} onChange={(e) => patch({ opacity: Number(e.target.value) }, true)} onPointerUp={release} className="w-full" />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Bord">
          <input className={input} type="number" min={0} max={12} value={style.borderWidth} onChange={(e) => patch({ borderWidth: Number(e.target.value) || 0 }, true)} onBlur={release} />
        </Field>
        <Field label="Trait">
          <input type="color" value={toHex(style.borderColor)} onChange={(e) => patch({ borderColor: e.target.value }, true)} onBlur={release} className="h-10 w-full cursor-pointer rounded-ui border border-line bg-sheet" />
        </Field>
      </div>
    </div>
  );
}

function toHex(color: string) {
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#141311";
}
