import { useEffect, useRef, useState, type ReactNode } from "react";
import { DocumentAlertBanner } from "@/components/studio/DocumentAlertBanner";
import { PageSheet } from "@/components/studio/PageSheet";
import { useStudio, getStudioUnboundElements } from "@/cv/store";
import { COLOR_PALETTES } from "@/cv/palettes";
import { FONTS, PAGE_H, PAGE_W, type CVElement, type IdentityField, type TemplateId } from "@/cv/types";

type Section = "profile" | "summary" | "experience" | "education" | "skills" | "languages";
type Step = "profile" | "summary" | "experience" | "education" | "abilities" | "finish";
const STEPS: { id: Step; label: string; title: string; help: string }[] = [
  { id: "profile", label: "Coordonnées", title: "Comment peut-on vous contacter ?", help: "Renseignez les informations que vous souhaitez faire apparaître sur votre CV." },
  { id: "summary", label: "Présentation", title: "Présentez votre profil", help: "Quelques lignes sur votre parcours et ce que vous souhaitez mettre en avant. Cette étape est facultative." },
  { id: "experience", label: "Expériences", title: "Présentez votre parcours", help: "Ouvrez une expérience pour la compléter. Décrivez uniquement vos missions et résultats réels." },
  { id: "education", label: "Formation", title: "Ajoutez vos formations", help: "Indiquez les diplômes et formations que vous souhaitez présenter. Vous pouvez passer cette étape." },
  { id: "abilities", label: "Compétences & langues", title: "Mettez en avant vos savoir-faire", help: "Ajoutez vos compétences et les langues que vous souhaitez indiquer, sans niveau attribué automatiquement." },
  { id: "finish", label: "Finaliser", title: "Votre CV, à votre façon", help: "Vérifiez le résultat, ajustez son apparence et téléchargez-le. Pour une mise en page entièrement libre, ouvrez le Studio." },
];
const SECTIONS: { id: Section; label: string }[] = [
  { id: "profile", label: "Coordonnées" }, { id: "summary", label: "Présentation" },
  { id: "experience", label: "Expériences" }, { id: "education", label: "Formation" },
  { id: "skills", label: "Compétences" }, { id: "languages", label: "Langues" },
];
const MODELS: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Moderne" }, { id: "minimal", label: "Minimal" },
  { id: "executive", label: "Executive" }, { id: "creative", label: "Créatif" },
  { id: "swiss", label: "Swiss" }, { id: "editorial", label: "Éditorial" },
];
const button = "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-40";
const primary = "rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
const input = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600";
const release = () => useStudio.getState().release();
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm font-medium text-slate-700">{label}{children}</label>;
}
function sectionOf(el: CVElement): Section | null {
  const kind = el.bind?.kind;
  if (kind === "name" || kind === "role" || kind === "contact") return "profile";
  if (kind === "summary" || kind === "experience" || kind === "education" || kind === "skills" || kind === "languages") return kind;
  return null;
}
function stepOf(section: Section): Step {
  return section === "skills" || section === "languages" ? "abilities" : section;
}

export function SimpleEditor() {
  const s = useStudio();
  const { doc } = s;
  const p = doc.profile;
  const [step, setStep] = useState<Step>("profile");
  const [openExperience, setOpenExperience] = useState<number | null>(0);
  const [openEducation, setOpenEducation] = useState<number | null>(0);
  const [organize, setOrganize] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [scale, setScale] = useState(0.75);
  const [skillsDraft, setSkillsDraft] = useState(p.skills.join(", "));
  const [skillsEditing, setSkillsEditing] = useState(false);
  const workspace = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const index = STEPS.findIndex((item) => item.id === step);
  const current = STEPS[index];
  const freeCount = doc.pages.reduce((n, page) => n + getStudioUnboundElements(page).length, 0);
  const go = (next: Step) => { release(); setStep(next); setMobilePreview(false); };

  useEffect(() => {
    workspace.current?.scrollTo({ top: 0 });
  }, [step]);
  useEffect(() => {
    if (!skillsEditing) setSkillsDraft(p.skills.join(", "));
  }, [p.skills, skillsEditing]);
  useEffect(() => {
    const node = preview.current;
    if (!node) return;
    const resize = () => setScale(Math.max(0.15, Math.min(1, (node.clientWidth - 48) / PAGE_W)));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const focus = (event: Event) => {
      const id = (event as CustomEvent<{ elementIds?: string[] }>).detail?.elementIds?.[0];
      const el = doc.pages.flatMap((page) => page.elements).find((item) => item.id === id);
      if (!el) return;
      const section = sectionOf(el);
      if (section) { setStep(stepOf(section)); setMobilePreview(false); }
      if (el.bind?.kind === "experience") setOpenExperience(el.bind.index);
      if (el.bind?.kind === "education") setOpenEducation(el.bind.index);
    };
    window.addEventListener("cv-focus-issue", focus);
    return () => window.removeEventListener("cv-focus-issue", focus);
  }, [doc]);

  const identity = (field: IdentityField, label: string, placeholder = "") => (
    <Field label={label}><input className={input} value={p[field]} placeholder={placeholder}
      onChange={(e) => s.setIdentity(field, e.target.value)} onBlur={release} /></Field>
  );
  const visible = (section: Section) => {
    const elements = doc.pages.flatMap((page) => page.elements).filter((el) => sectionOf(el) === section);
    return elements.length === 0 || elements.some((el) => !el.hidden);
  };
  const orderedSections = [...SECTIONS].sort((a, b) => {
    const position = (id: Section) => {
      for (let pageIndex = 0; pageIndex < doc.pages.length; pageIndex++) {
        const matches = doc.pages[pageIndex].elements.filter((el) => sectionOf(el) === id);
        if (matches.length) return pageIndex * PAGE_H + Math.min(...matches.map((el) => el.y));
      }
      return Number.MAX_SAFE_INTEGER;
    };
    return position(a.id) - position(b.id);
  });
  const confirmRemove = (kind: "experience" | "education", entryIndex: number) => {
    s.setConfirmModal({ title: kind === "experience" ? "Supprimer cette expérience ?" : "Supprimer cette formation ?",
      message: "Cette entrée sera retirée du CV. Vous pourrez annuler cette action avec Annuler.",
      confirmLabel: "Supprimer", variant: "danger", onConfirm: () => {
        if (kind === "experience") { s.removeExperience(entryIndex); setOpenExperience(null); }
        else { s.removeEducation(entryIndex); setOpenEducation(null); }
      } });
  };
  const openElement = (pageId: string, el: CVElement) => {
    release(); s.setActive(pageId); s.select([el.id]);
    const section = sectionOf(el);
    if (!section) { s.notify("Ce bloc se modifie dans le Studio libre."); return; }
    go(stepOf(section));
    if (el.bind?.kind === "experience") setOpenExperience(el.bind.index);
    if (el.bind?.kind === "education") setOpenEducation(el.bind.index);
  };

  return <div className="flex h-dvh flex-col overflow-hidden bg-slate-100 text-slate-900">
    <header className="no-print flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 text-sm font-semibold tracking-tight">CV Creator</span>
        <span className="hidden text-xs text-slate-500 lg:inline" role="status">{s.saveStatus === "saving" ? "Enregistrement…" : s.saveStatus === "unsaved" ? "Non enregistré" : "Enregistré"}</span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {step === "finish" && <button className={primary} data-testid="export-pdf-btn" onClick={() => void s.requestPdfExport()}>Télécharger le PDF</button>}
      </div>
    </header>
    <DocumentAlertBanner />
    <main className="flex min-h-0 flex-1">
      <section aria-label="Saisie accompagnée" className={`${mobilePreview ? "hidden" : "flex"} min-h-0 w-full flex-col border-r border-slate-200 bg-white md:flex md:w-[44%] md:max-w-[600px] md:min-w-[360px]`}>
        <div ref={workspace} className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <p data-testid="guided-step-indicator" className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">Étape {index + 1} sur {STEPS.length} — {current.label}</p>
              <h1 className="text-2xl font-semibold tracking-tight">{current.title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{current.help}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 pt-1">
              <button className={`${button} md:hidden`} onClick={() => setMobilePreview((v) => !v)}>{mobilePreview ? "Saisie" : "Aperçu"}</button>
              <button className="text-xs text-slate-500 underline disabled:opacity-40" disabled={!s.past.length} onClick={s.undo}>Annuler</button>
              <button className="text-xs text-slate-500 underline disabled:opacity-40" disabled={!s.future.length} onClick={s.redo}>Rétablir</button>
            </div>
          </div>
          {step === "profile" && <button className="mb-5 block text-sm text-slate-600 underline" data-testid="guided-import-cv-btn" onClick={() => s.setExtractorModalOpen(true)}>Importer un CV existant</button>}
          {s.layoutCustomized || freeCount > 0 ? <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Votre mise en page personnalisée est conservée. Les blocs libres restent modifiables dans le Studio. <button className="underline" onClick={() => s.setEditorMode("pro")}>Ouvrir le Studio</button></div> : null}
          {step !== "finish" && step !== "abilities" && !visible(step) && <div className="mb-5 rounded-lg bg-slate-100 p-3 text-sm">Cette rubrique est masquée dans le CV. Vos informations sont conservées. <button className="underline" onClick={() => s.toggleSectionVisibility(step)}>Réafficher</button></div>}
          {step === "profile" && <div className="space-y-4">
            {identity("name", "Nom et prénom")}{identity("role", "Titre professionnel")}
            {identity("email", "Adresse e-mail")}{identity("phone", "Téléphone — facultatif")}
            {identity("location", "Ville / localisation — facultatif")}{identity("link", "LinkedIn ou portfolio — facultatif")}
          </div>}
          {step === "summary" && <Field label="Votre présentation"><textarea className={`${input} min-h-48 resize-y`} value={p.summary} placeholder="Votre domaine, votre parcours et ce que vous souhaitez mettre en avant…" onChange={(e) => s.setIdentity("summary", e.target.value)} onBlur={release} /></Field>}
          {step === "experience" && <div className="space-y-3">
            {p.experiences.map((exp, i) => <article key={i} data-testid={`guided-experience-${i}`} className="overflow-hidden rounded-xl border border-slate-200">
              <button className="flex w-full items-start justify-between gap-3 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600" aria-expanded={openExperience === i} onClick={() => { release(); setOpenExperience(openExperience === i ? null : i); }}>
                <span><span className="block text-sm font-semibold">{exp.role.trim() || "Nouvelle expérience"}</span><span className="mt-1 block text-xs text-slate-500">{[exp.company, exp.date].filter(Boolean).join(" · ") || "À renseigner"}</span></span><span aria-hidden="true">{openExperience === i ? "−" : "+"}</span>
              </button>
              {openExperience === i && <div className="space-y-4 border-t border-slate-100 px-4 pb-4 pt-4">
                <Field label="Quel poste occupiez-vous ?"><input className={input} value={exp.role} onChange={(e) => s.updateExperience(i, { role: e.target.value })} onBlur={release} /></Field>
                <Field label="Dans quelle entreprise / ville ?"><input className={input} value={exp.company} onChange={(e) => s.updateExperience(i, { company: e.target.value })} onBlur={release} /></Field>
                <Field label="À quelle période ?"><input className={input} value={exp.date} placeholder="2022 — Aujourd’hui" onChange={(e) => s.updateExperience(i, { date: e.target.value })} onBlur={release} /></Field>
                <Field label="Quelles étaient vos missions ou réalisations ?"><textarea id={`guided-description-${i}`} className={`${input} min-h-40 resize-y`} value={exp.desc} placeholder="Décrivez une mission par ligne. Ajoutez un résultat seulement si vous en disposez." onChange={(e) => s.updateExperience(i, { desc: e.target.value })} onBlur={release} /></Field>
                <button className={button} onClick={() => {
                  release(); const original = useStudio.getState().doc.profile.experiences[i]?.desc || "";
                  s.updateExperience(i, { desc: original ? `${original}\n• ` : "• " }, false);
                  requestAnimationFrame(() => { const field = document.getElementById(`guided-description-${i}`) as HTMLTextAreaElement | null; field?.focus(); field?.setSelectionRange(field.value.length, field.value.length); });
                }}>+ Ajouter une réalisation</button>
                <button className="block text-sm text-red-600 underline" onClick={() => confirmRemove("experience", i)}>Supprimer cette expérience</button>
              </div>}
            </article>)}
            <button className={`${button} w-full border-dashed`} onClick={() => { release(); setOpenExperience(p.experiences.length); s.addExperience(); }}>+ Ajouter une expérience</button>
          </div>}
          {step === "education" && <div className="space-y-3">
            {p.educations.map((entry, i) => <article key={i} className="overflow-hidden rounded-xl border border-slate-200">
              <button className="flex w-full items-start justify-between gap-3 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600" aria-expanded={openEducation === i} onClick={() => { release(); setOpenEducation(openEducation === i ? null : i); }}>
                <span><span className="block text-sm font-semibold">{entry.degree.trim() || "Nouvelle formation"}</span><span className="mt-1 block text-xs text-slate-500">{[entry.school, entry.date].filter(Boolean).join(" · ") || "À renseigner"}</span></span><span aria-hidden="true">{openEducation === i ? "−" : "+"}</span>
              </button>
              {openEducation === i && <div className="space-y-4 border-t border-slate-100 p-4">
                <Field label="Diplôme ou formation"><input className={input} value={entry.degree} onChange={(e) => s.updateEducation(i, { degree: e.target.value })} onBlur={release} /></Field>
                <Field label="Établissement"><input className={input} value={entry.school} onChange={(e) => s.updateEducation(i, { school: e.target.value })} onBlur={release} /></Field>
                <Field label="Période"><input className={input} value={entry.date} onChange={(e) => s.updateEducation(i, { date: e.target.value })} onBlur={release} /></Field>
                <button className="text-sm text-red-600 underline" onClick={() => confirmRemove("education", i)}>Supprimer cette formation</button>
              </div>}
            </article>)}
            <button className={`${button} w-full border-dashed`} onClick={() => { release(); setOpenEducation(p.educations.length); s.addEducation(); }}>+ Ajouter une formation</button>
          </div>}
          {step === "abilities" && <div className="space-y-8">
            <Field label="Vos compétences"><textarea className={`${input} min-h-28 resize-y`} value={skillsDraft} placeholder="Séparez vos compétences par une virgule" onFocus={() => setSkillsEditing(true)} onChange={(e) => { setSkillsDraft(e.target.value); s.updateSkills(e.target.value.split(",").map((v) => v.trim()).filter(Boolean)); }} onBlur={() => { release(); setSkillsEditing(false); }} /></Field>
            <section aria-label="Langues" className="space-y-4"><h2 className="text-lg font-semibold">Langues</h2><p className="text-sm text-slate-500">Le niveau utilise l’échelle existante de 0 à 100. Il n’est pas déduit de votre profil.</p>
              {p.languages.map((language, i) => <div key={i} className="space-y-2 rounded-lg border border-slate-200 p-3">
                <Field label="Langue et précision éventuelle"><input className={input} value={language.label} placeholder="Langue — niveau, si vous le souhaitez" onChange={(e) => s.updateLanguages(p.languages.map((item, j) => j === i ? { ...item, label: e.target.value } : item))} onBlur={release} /></Field>
                <Field label="Niveau sur l’échelle du modèle"><input className={input} type="number" min={0} max={100} value={language.value} onChange={(e) => s.updateLanguages(p.languages.map((item, j) => j === i ? { ...item, value: Math.max(0, Math.min(100, Number(e.target.value))) } : item))} onBlur={release} /></Field>
                <button className="text-sm text-red-600 underline" onClick={() => { release(); s.updateLanguages(p.languages.filter((_, j) => j !== i), false); }}>Retirer cette langue</button>
              </div>)}
              <button className={button} onClick={() => { release(); s.updateLanguages([...p.languages, { label: "", value: 0 }], false); }}>+ Ajouter une langue à renseigner</button>
            </section>
          </div>}
          {step === "finish" && <div className="space-y-6">
            <section className="space-y-4"><h2 className="text-lg font-semibold">Apparence</h2>
              <Field label="Modèle"><select className={input} value={s.activeTemplate} onChange={(e) => s.requestApplyTemplate(e.target.value as TemplateId)}>{MODELS.map((model) => <option key={model.id} value={model.id}>{model.label}</option>)}</select></Field>
              <div><p className="mb-2 text-sm font-medium">Palette</p><div className="flex flex-wrap gap-2">{COLOR_PALETTES.map((palette) => <button key={palette.id} className={button} title={palette.desc} onClick={() => s.applyPalette(palette.id)}><span aria-hidden="true" className="mr-2 inline-block h-3 w-3 rounded-full" style={{ background: palette.primary }} />{palette.name}</button>)}</div></div>
              <Field label="Police"><select className={input} value={doc.pages.flatMap((page) => page.elements).find((el) => el.style.fontFamily)?.style.fontFamily || FONTS[0]} onChange={(e) => s.applyGlobalFont(e.target.value)}>{FONTS.map((font) => <option key={font}>{font}</option>)}</select></Field>
              <button className={button} onClick={s.requestResetLayout}>Réinitialiser la mise en page…</button>
            </section>
            <section className="space-y-3 border-t border-slate-200 pt-5"><button className={button} aria-expanded={organize} onClick={() => setOrganize((v) => !v)}>Organiser les sections {organize ? "−" : "+"}</button>
              {organize && <div className="space-y-2">{orderedSections.map((section, i) => <div key={section.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3"><span className="text-sm font-medium">{section.label}</span><div className="flex gap-1"><button className={button} onClick={() => s.toggleSectionVisibility(section.id)}>{visible(section.id) ? "Masquer" : "Afficher"}</button><button className={button} aria-label={`Monter ${section.label}`} disabled={i === 0} onClick={() => s.moveSection(section.id, "up")}>↑</button><button className={button} aria-label={`Descendre ${section.label}`} disabled={i === orderedSections.length - 1} onClick={() => s.moveSection(section.id, "down")}>↓</button></div></div>)}</div>}
            </section>
            <section className="space-y-3 border-t border-slate-200 pt-5"><h2 className="text-lg font-semibold">Vérification</h2><p className="text-sm text-slate-500">{doc.pages.length} page{doc.pages.length > 1 ? "s" : ""} A4. Relisez vos informations avant de les envoyer.</p><div className="flex flex-wrap gap-2"><button className={button} data-testid="open-readability-btn" onClick={() => s.setReadabilityModalOpen(true, false)}>Contrôle du document</button><button className={button} data-testid="open-plain-text-btn" onClick={() => s.setPlainTextModalOpen(true)}>Aperçu texte brut</button></div><p className="text-xs leading-relaxed text-slate-500">L’aperçu texte représente le contenu du document. Il ne certifie pas l’extraction du PDF par un logiciel de recrutement.</p></section>
            <button className={button} onClick={() => s.setEditorMode("pro")}>Tout personnaliser dans le Studio</button>
          </div>}
        </div>
        <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-slate-200 bg-white p-4">
          <button className={button} disabled={index === 0} onClick={() => go(STEPS[index - 1].id)}>← Retour</button>
          {step !== "finish" && <div className="flex items-center gap-2"><button className="px-2 py-2 text-sm text-slate-500 underline" onClick={() => go(STEPS[index + 1].id)}>Passer</button><button className={primary} onClick={() => go(STEPS[index + 1].id)}>Continuer →</button></div>}
        </footer>
      </section>
      <section ref={preview} aria-label="Aperçu du CV" className={`${mobilePreview ? "block" : "hidden"} min-w-0 flex-1 overflow-auto bg-slate-100 md:block`}>
        <div className="mx-auto flex w-full flex-col items-center gap-8 p-6">
          {doc.pages.map((page, pageIndex) => <div key={page.id} className="shrink-0"><p className="mb-2 text-center text-xs text-slate-500">Page {pageIndex + 1} sur {doc.pages.length}</p><div style={{ width: PAGE_W * scale, height: PAGE_H * scale }}><div className="relative" style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <PageSheet page={page} interactive={false} selectedIds={[]} editingId={null} showGrid={false} showMargins={false} guides={{ x: [], y: [] }} marquee={null} />
            <div className="no-export absolute inset-0 pointer-events-none">{page.elements.filter((el) => !el.hidden && (el.bind || ["text", "heading", "experience", "education", "skills", "meters", "contact"].includes(el.type))).map((el) => <button key={el.id} type="button" aria-label={`Modifier ${sectionOf(el) ? SECTIONS.find((section) => section.id === sectionOf(el))?.label : "ce bloc dans le Studio"}`} onClick={() => openElement(page.id, el)} className={`pointer-events-auto absolute rounded-sm border-2 border-transparent hover:border-blue-400 focus-visible:border-blue-600 focus-visible:outline-none ${s.selectedIds.includes(el.id) ? "border-blue-300" : ""}`} style={{ left: el.x, top: el.y, width: el.w, height: el.h, transform: `rotate(${el.rotation}deg)` }} />)}</div>
          </div></div></div>)}
        </div>
      </section>
    </main>
  </div>;
}
