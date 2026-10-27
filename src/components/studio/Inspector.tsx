import { type ReactNode } from "react";
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
  X,
} from "lucide-react";
import { readImage } from "@/cv/image";
import { activePage, useStudio, type ElementPatch } from "@/cv/store";
import { COLOR_PALETTES } from "@/cv/palettes";
import type { ContactIcon, CVElement, ElStyle } from "@/cv/types";
import { FONTS, TYPE_LABEL } from "@/cv/types";
import { cn } from "@/lib/utils";

const inputClass =
  "h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium text-slate-900 outline-none transition focus:border-signal focus:bg-white focus:ring-2 focus:ring-signal/15";

const textareaClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 p-2.5 text-xs font-medium text-slate-900 leading-relaxed outline-none transition focus:border-signal focus:bg-white focus:ring-2 focus:ring-signal/15 resize-none";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
      </div>
      <div>{children}</div>
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

  const currentGlobalFont = page.elements.find((el) => el.style?.fontFamily)?.style.fontFamily || "Source Sans 3";

  return (
    <aside className="flex h-full w-72 xl:w-80 shrink-0 flex-col border-l border-slate-200 bg-white text-slate-900 select-none z-20">
      {/* En-tête contextuel */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 px-4">
        <div className="min-w-0">
          <h2 className="text-xs font-semibold text-slate-900 truncate">
            {one
              ? `Propriétés · ${TYPE_LABEL[one.type]}`
              : selected.length > 1
                ? `${selected.length} éléments sélectionnés`
                : "Document & Identité"}
          </h2>
        </div>

        {selected.length > 0 ? (
          <button
            type="button"
            onClick={() => useStudio.getState().select([])}
            className="flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            title="Désélectionner (Échap)"
          >
            <X size={13} />
          </button>
        ) : (
          <span className="text-[11px] text-slate-400">Global</span>
        )}
      </div>

      {/* Corps déroulant */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-5">
        {/* ÉTAT 1 : AUCUN ÉLÉMENT SÉLECTIONNÉ -> PROFIL & STYLE GLOBAL */}
        {!selected.length && (
          <>
            {/* Style global du document */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-900">Style global du CV</h3>
              </div>

              <Field label="Police typographique">
                <select
                  className={inputClass}
                  value={currentGlobalFont}
                  onChange={(e) => useStudio.getState().applyGlobalFont(e.target.value)}
                >
                  {FONTS.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="space-y-1.5">
                <span className="text-xs font-medium text-slate-600">Palette de couleurs</span>
                <div className="grid grid-cols-6 gap-1.5">
                  {COLOR_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => useStudio.getState().applyPalette(pal.id)}
                      title={pal.name}
                      className="group flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50/60 hover:border-slate-400 transition"
                    >
                      <span
                        className="size-4 rounded-full border border-white shadow-2xs group-hover:scale-110 transition"
                        style={{ backgroundColor: pal.primary }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Coordonnées & Profil candidat */}
            <section className="space-y-3 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-900">Informations du candidat</h3>
                <span className="text-[11px] text-slate-400">Synchronisé</span>
              </div>

              <Field label="Nom complet">
                <input
                  className={inputClass}
                  value={profile.name}
                  onChange={(e) => identity("name", e.target.value)}
                  onBlur={release}
                  placeholder="Ex. Alexandra Dubois"
                />
              </Field>

              <Field label="Intitulé du poste">
                <input
                  className={inputClass}
                  value={profile.role}
                  onChange={(e) => identity("role", e.target.value)}
                  onBlur={release}
                  placeholder="Ex. Product Designer Senior"
                />
              </Field>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="E-mail">
                  <input
                    className={inputClass}
                    value={profile.email}
                    onChange={(e) => identity("email", e.target.value)}
                    onBlur={release}
                    placeholder="nom@email.com"
                  />
                </Field>
                <Field label="Téléphone">
                  <input
                    className={inputClass}
                    value={profile.phone}
                    onChange={(e) => identity("phone", e.target.value)}
                    onBlur={release}
                    placeholder="+33 6 00 00 00 00"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Ville / Mobilité">
                  <input
                    className={inputClass}
                    value={profile.location}
                    onChange={(e) => identity("location", e.target.value)}
                    onBlur={release}
                    placeholder="Paris, France"
                  />
                </Field>
                <Field label="Portfolio / LinkedIn">
                  <input
                    className={inputClass}
                    value={profile.link}
                    onChange={(e) => identity("link", e.target.value)}
                    onBlur={release}
                    placeholder="linkedin.com/in/..."
                  />
                </Field>
              </div>

              <Field label="Profil / Accroche">
                <textarea
                  className={cn(textareaClass, "h-24")}
                  value={profile.summary}
                  onChange={(e) => identity("summary", e.target.value)}
                  onBlur={release}
                  placeholder="Synthèse de votre parcours et de votre valeur ajoutée…"
                />
              </Field>
            </section>
          </>
        )}

        {/* ÉTAT 2 : SÉLECTION MULTIPLE */}
        {selected.length > 1 && (
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-900">Alignement de la sélection</h3>
            <div className="grid grid-cols-3 gap-1.5">
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
                <button
                  key={mode}
                  type="button"
                  className="h-8 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                  onClick={() => useStudio.getState().align(mode)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                className="h-8 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                onClick={() => useStudio.getState().distribute("x")}
              >
                Espacer horiz.
              </button>
              <button
                type="button"
                className="h-8 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                onClick={() => useStudio.getState().distribute("y")}
              >
                Espacer vert.
              </button>
            </div>
          </section>
        )}

        {/* BARRE D'ACTIONS RAPIDES SUR L'ÉLÉMENT SÉLECTIONNÉ */}
        {selected.length > 0 && (
          <section className="flex items-center justify-between gap-1 rounded-lg border border-slate-200 bg-slate-50/70 p-1">
            <IconAction label="Premier plan" onClick={() => useStudio.getState().order("front")}>
              <BringToFront size={14} />
            </IconAction>
            <IconAction label="Arrière-plan" onClick={() => useStudio.getState().order("back")}>
              <SendToBack size={14} />
            </IconAction>
            <IconAction label="Dupliquer (⌘D)" onClick={() => useStudio.getState().duplicateSelected()}>
              <Copy size={14} />
            </IconAction>
            <IconAction
              label={selected.some((el) => !el.locked) ? "Verrouiller" : "Déverrouiller"}
              onClick={() => useStudio.getState().lockSelected(selected.some((el) => !el.locked))}
            >
              {selected.some((el) => !el.locked) ? <Lock size={14} /> : <Unlock size={14} />}
            </IconAction>
            <IconAction label="Supprimer" danger onClick={() => useStudio.getState().deleteSelected()}>
              <Trash2 size={14} />
            </IconAction>
          </section>
        )}

        {/* CONTENU DE L'ÉLÉMENT SÉLECTIONNÉ */}
        {one && <ContentFields el={one} pageId={page.id} />}

        {/* TYPOGRAPHIE & APPARENCE */}
        {selected.length > 0 && (
          <StyleFields
            style={one?.style ?? selected[0].style}
            mixed={selected.length > 1}
            textual={!one || !["photo", "rect", "ellipse", "rule"].includes(one.type)}
          />
        )}

        {/* GÉOMÉTRIE & POSITION */}
        {one && (
          <section className="space-y-2.5 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-900">Position & Dimensions</h3>
              <span className="font-mono text-[11px] text-slate-400">px</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Field label="X">
                <input
                  className={cn(inputClass, "px-2 text-center font-mono tabular-nums")}
                  type="number"
                  value={Math.round(one.x)}
                  onChange={(e) => live(one.id, { x: Number(e.target.value) })}
                  onBlur={release}
                />
              </Field>
              <Field label="Y">
                <input
                  className={cn(inputClass, "px-2 text-center font-mono tabular-nums")}
                  type="number"
                  value={Math.round(one.y)}
                  onChange={(e) => live(one.id, { y: Number(e.target.value) })}
                  onBlur={release}
                />
              </Field>
              <Field label="L">
                <input
                  className={cn(inputClass, "px-2 text-center font-mono tabular-nums")}
                  type="number"
                  value={Math.round(one.w)}
                  onChange={(e) => live(one.id, { w: Math.max(20, Number(e.target.value) || 20) })}
                  onBlur={release}
                />
              </Field>
              <Field label="H">
                <input
                  className={cn(inputClass, "px-2 text-center font-mono tabular-nums")}
                  type="number"
                  value={Math.round(one.h)}
                  onChange={(e) => live(one.id, { h: Math.max(12, Number(e.target.value) || 12) })}
                  onBlur={release}
                />
              </Field>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}

function IconAction({
  label,
  onClick,
  children,
  danger,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "flex h-8 flex-1 items-center justify-center rounded-md transition",
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-2xs",
      )}
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
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-900">Contenu du bloc</h3>
          {el.type !== "contact" && (
            <button
              type="button"
              onClick={() => useStudio.getState().boostElementText(el.id)}
              className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-signal hover:bg-blue-100 transition"
              title="Améliorer la formulation"
            >
              <Sparkles size={11} />
              <span>Reformuler</span>
            </button>
          )}
        </div>
        {el.type === "contact" && (
          <Field label="Type de coordonnée">
            <select
              className={inputClass}
              value={c.icon ?? "mail"}
              onChange={(e) => patch({ icon: e.target.value as ContactIcon }, false)}
            >
              <option value="mail">E-mail</option>
              <option value="phone">Téléphone</option>
              <option value="pin">Localisation</option>
              <option value="link">Lien web</option>
            </select>
          </Field>
        )}
        <Field label="Texte">
          <textarea
            className={cn(textareaClass, el.type === "contact" ? "h-16" : "h-24")}
            value={c.text ?? ""}
            onChange={(e) => patch({ text: e.target.value })}
            onBlur={release}
          />
        </Field>
      </section>
    );
  }

  if (el.type === "experience") {
    return (
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-900">Détails de l’expérience</h3>
          <button
            type="button"
            onClick={() => useStudio.getState().boostElementText(el.id)}
            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-signal hover:bg-blue-100 transition"
            title="Ajouter une réalisation chiffrée"
          >
            <Sparkles size={11} />
            <span>Ajouter un impact</span>
          </button>
        </div>
        <Field label="Intitulé du poste">
          <input className={inputClass} value={c.role ?? ""} onChange={(e) => patch({ role: e.target.value })} onBlur={release} />
        </Field>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Entreprise & lieu">
            <input className={inputClass} value={c.company ?? ""} onChange={(e) => patch({ company: e.target.value })} onBlur={release} />
          </Field>
          <Field label="Période">
            <input className={inputClass} value={c.date ?? ""} onChange={(e) => patch({ date: e.target.value })} onBlur={release} />
          </Field>
        </div>
        <Field label="Missions & résultats">
          <textarea className={cn(textareaClass, "h-28")} value={c.desc ?? ""} onChange={(e) => patch({ desc: e.target.value })} onBlur={release} />
        </Field>
      </section>
    );
  }

  if (el.type === "education") {
    return (
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-900">Détails de la formation</h3>
        <Field label="Diplôme ou titre">
          <input className={inputClass} value={c.degree ?? ""} onChange={(e) => patch({ degree: e.target.value })} onBlur={release} />
        </Field>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Établissement">
            <input className={inputClass} value={c.school ?? ""} onChange={(e) => patch({ school: e.target.value })} onBlur={release} />
          </Field>
          <Field label="Années">
            <input className={inputClass} value={c.date ?? ""} onChange={(e) => patch({ date: e.target.value })} onBlur={release} />
          </Field>
        </div>
      </section>
    );
  }

  if (el.type === "skills") {
    return (
      <section className="space-y-2">
        <Field label="Compétences" hint="1 par ligne">
          <textarea
            className={cn(textareaClass, "h-28")}
            value={(c.items ?? []).join("\n")}
            onChange={(e) => patch({ items: e.target.value.split("\n") })}
            onBlur={(e) => {
              patch({ items: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) }, false);
              release();
            }}
          />
        </Field>
      </section>
    );
  }

  if (el.type === "meters") {
    const meters = c.meters ?? [];
    return (
      <section className="space-y-2.5">
        <h3 className="text-xs font-semibold text-slate-900">Niveaux & Langues</h3>
        {meters.map((meter, index) => (
          <div key={index} className="grid grid-cols-[1fr_4.5rem] gap-2">
            <input
              className={inputClass}
              value={meter.label}
              onChange={(e) => {
                const next = meters.map((m, i) => (i === index ? { ...m, label: e.target.value } : m));
                patch({ meters: next });
              }}
              onBlur={release}
            />
            <input
              className={cn(inputClass, "font-mono tabular-nums text-center")}
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
          className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
          onClick={() => patch({ meters: [...meters, { label: "Nouvelle langue", value: 75 }] }, false)}
        >
          + Ajouter une jauge
        </button>
      </section>
    );
  }

  if (el.type === "photo") {
    return (
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-900">Photo de profil</h3>
        <div className="flex items-center gap-3">
          {c.src ? (
            <img src={c.src} alt="Photo profil" className="size-14 rounded-lg object-cover border border-slate-200" />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400">
              <ImageIcon size={18} />
            </div>
          )}
          <div className="flex-1 space-y-1.5">
            <label className="flex h-8 w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition">
              <span>{c.src ? "Remplacer la photo" : "Importer une photo"}</span>
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
                    useStudio.getState().notify("Photo intégrée");
                  } catch {
                    useStudio.getState().notify("Format d'image non supporté");
                  }
                  e.target.value = "";
                }}
              />
            </label>
            {c.src && (
              <button
                type="button"
                onClick={() => patch({ src: "" }, false)}
                className="flex h-7 w-full items-center justify-center gap-1 rounded-md border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-red-600 transition"
              >
                <Trash2 size={11} />
                <span>Supprimer la photo</span>
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return null;
}

function StyleFields({
  style,
  mixed,
  textual,
}: {
  style: ElStyle;
  mixed: boolean;
  textual: boolean;
}) {
  const patch = (next: Partial<ElStyle>, live = false) => useStudio.getState().patchSelectedStyle(next, live);

  return (
    <section className="space-y-4 border-t border-slate-100 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-900">
          {textual ? "Typographie & Style" : "Apparence du bloc"}
        </h3>
        {mixed && <span className="text-[11px] text-slate-400">Sélection multiple</span>}
      </div>

      {textual && (
        <>
          <Field label="Police">
            <select
              className={inputClass}
              value={FONTS.includes(style.fontFamily as (typeof FONTS)[number]) ? style.fontFamily : "Source Sans 3"}
              onChange={(e) => patch({ fontFamily: e.target.value })}
            >
              {FONTS.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
            <Field label="Corps (px)">
              <input
                className={cn(inputClass, "font-mono tabular-nums")}
                type="number"
                min={8}
                max={160}
                value={style.fontSize}
                onChange={(e) => patch({ fontSize: Number(e.target.value) || 12 }, true)}
                onBlur={release}
              />
            </Field>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Gras"
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg border transition",
                  style.fontWeight >= 650
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                )}
                onClick={() => patch({ fontWeight: style.fontWeight >= 650 ? 400 : 700 })}
              >
                <Bold size={14} />
              </button>
              <button
                type="button"
                aria-label="Italique"
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg border transition",
                  style.italic
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                )}
                onClick={() => patch({ italic: !style.italic })}
              >
                <Italic size={14} />
              </button>
              {(
                [
                  ["left", AlignLeft],
                  ["center", AlignCenter],
                  ["right", AlignRight],
                ] as const
              ).map(([align, Icon]) => (
                <button
                  key={align}
                  type="button"
                  aria-label={align}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg border transition",
                    style.textAlign === align
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  )}
                  onClick={() => patch({ textAlign: align })}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Couleur du texte">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-2 h-9">
                <input
                  type="color"
                  value={toHex(style.color)}
                  onChange={(e) => patch({ color: e.target.value }, true)}
                  onBlur={release}
                  className="size-5 cursor-pointer rounded border-0 bg-transparent p-0"
                />
                <span className="font-mono text-[11px] uppercase text-slate-600">{toHex(style.color)}</span>
              </div>
            </Field>

            <Field label="Interligne" hint={`${style.lineHeight}`}>
              <input
                type="range"
                min={0.95}
                max={2}
                step={0.05}
                value={style.lineHeight}
                onChange={(e) => patch({ lineHeight: Number(e.target.value) }, true)}
                onPointerUp={release}
                className="mt-2.5 w-full"
              />
            </Field>
          </div>
        </>
      )}

      {/* Fond, arrondi et opacité */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <Field label="Couleur de fond">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-2 h-9">
              <input
                type="color"
                value={toHex(style.backgroundColor)}
                onChange={(e) => patch({ backgroundColor: e.target.value }, true)}
                onBlur={release}
                className="size-5 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span className="font-mono text-[11px] text-slate-600 truncate">
                {style.backgroundColor === "transparent" ? "Aucun" : toHex(style.backgroundColor)}
              </span>
            </div>
            {style.backgroundColor !== "transparent" && (
              <button
                type="button"
                onClick={() => patch({ backgroundColor: "transparent" })}
                className="h-9 rounded-lg border border-slate-200 px-2 text-[11px] text-slate-500 hover:bg-slate-50"
                title="Retirer le fond"
              >
                ×
              </button>
            )}
          </div>
        </Field>

        <Field label="Opacité" hint={`${Math.round(style.opacity * 100)}%`}>
          <input
            type="range"
            min={0.15}
            max={1}
            step={0.05}
            value={style.opacity}
            onChange={(e) => patch({ opacity: Number(e.target.value) }, true)}
            onPointerUp={release}
            className="mt-2.5 w-full"
          />
        </Field>
      </div>

      <Field label="Arrondi des angles" hint={`${style.borderRadius}px`}>
        <input
          type="range"
          min={0}
          max={48}
          value={style.borderRadius}
          onChange={(e) => patch({ borderRadius: Number(e.target.value) }, true)}
          onPointerUp={release}
          className="w-full"
        />
      </Field>
    </section>
  );
}

function toHex(color: string) {
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#141311";
}
