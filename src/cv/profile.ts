import type { Bind, Content, Doc, Experience, IdentityField, Meter, Profile } from "@/cv/types";

export const SAMPLE: Profile = {
  name: "Alexandra Dubois",
  role: "Product Designer Senior",
  email: "alexandra.dubois@email.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  link: "linkedin.com/in/alexandra",
  summary:
    "Designer produit avec 8 ans d'expérience. Design systems, recherche et prototypes haute fidélité — je cherche le point où une interface devient évidente.",
  experiences: [
    {
      role: "Lead Product Designer",
      company: "Mira Studio — Paris",
      date: "2021 — Aujourd'hui",
      desc: "Équipe de 6 designers. Refonte de la plateforme SaaS, +34 % de rétention. Design system utilisé par une quarantaine de produits.",
    },
    {
      role: "Senior UI/UX Designer",
      company: "Atelier Noir — Lyon",
      date: "2018 — 2021",
      desc: "Applications pour des maisons de luxe et des institutions. Direction artistique sur douze projets, prix Design Lumen 2020.",
    },
    {
      role: "UI Designer",
      company: "Indépendante",
      date: "2015 — 2018",
      desc: "Startups early-stage, de la fintech à l'éducation. Une trentaine de produits accompagnés jusqu'au lancement.",
    },
  ],
  educations: [
    { degree: "Master Design d'interaction", school: "ENSAD Paris", date: "2013 — 2015" },
    { degree: "Bachelor Arts appliqués", school: "École Boulle", date: "2010 — 2013" },
  ],
  skills: ["Figma", "Design system", "Recherche", "Prototypage", "Direction artistique", "HTML / CSS"],
  languages: [
    { label: "Français", value: 100 },
    { label: "Anglais", value: 90 },
    { label: "Espagnol", value: 60 },
  ],
};

export function syncProfile(profile: Profile, bind: Bind | undefined, content: Content): Profile {
  if (!bind) return profile;
  const next: Profile = {
    ...profile,
    experiences: profile.experiences.map((e) => ({ ...e })),
    educations: profile.educations.map((e) => ({ ...e })),
    skills: [...profile.skills],
    languages: profile.languages.map((e) => ({ ...e })),
  };
  if (bind.kind === "name" && content.text != null) next.name = content.text;
  if (bind.kind === "role" && content.text != null) next.role = content.text;
  if (bind.kind === "summary" && content.text != null) next.summary = content.text;
  if (bind.kind === "contact" && content.text != null) next[bind.field] = content.text;
  if (bind.kind === "experience") {
    const cur = next.experiences[bind.index];
    if (cur) {
      next.experiences[bind.index] = {
        role: content.role ?? cur.role,
        company: content.company ?? cur.company,
        date: content.date ?? cur.date,
        desc: content.desc ?? cur.desc,
      };
    }
  }
  if (bind.kind === "education") {
    const cur = next.educations[bind.index];
    if (cur) {
      next.educations[bind.index] = {
        degree: content.degree ?? cur.degree,
        school: content.school ?? cur.school,
        date: content.date ?? cur.date,
      };
    }
  }
  if (bind.kind === "skills" && content.items) next.skills = [...content.items];
  if (bind.kind === "languages" && content.meters) next.languages = content.meters.map((m) => ({ ...m }));
  return next;
}

export function applyIdentity(doc: Doc, field: IdentityField, value: string): Doc {
  const profile = { ...doc.profile, [field]: value };
  const pages = doc.pages.map((page) => ({
    ...page,
    elements: page.elements.map((el) => {
      const bind = el.bind;
      if (!bind) return el;
      if (bind.kind === "name" && field === "name") return { ...el, content: { ...el.content, text: value } };
      if (bind.kind === "summary" && field === "summary") return { ...el, content: { ...el.content, text: value } };
      if (bind.kind === "role" && field === "role") {
        const current = el.content.text ?? "";
        const upper = current === current.toUpperCase() && current !== current.toLowerCase();
        return { ...el, content: { ...el.content, text: upper ? value.toUpperCase() : value } };
      }
      if (bind.kind === "contact" && bind.field === field) return { ...el, content: { ...el.content, text: value } };
      return el;
    }),
  }));
  return { ...doc, profile, pages };
}

const SECTION =
  /^(exp[eé]riences?|parcours professionnel|parcours|formation|études|etudes|education|comp[eé]tences|skills|langues?|languages|profil|à propos|a propos|résumé|resume|summary|contact)\b/i;

function isSection(line: string) {
  return SECTION.test(line.trim());
}

function sectionBlocks(lines: string[], test: RegExp): string[][] {
  const start = lines.findIndex((l) => test.test(l.trim()));
  if (start === -1) return [];
  const out: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (isSection(lines[i]) && lines[i].trim()) break;
    out.push(lines[i]);
  }
  const blocks: string[][] = [];
  let cur: string[] = [];
  for (const line of out) {
    if (!line.trim()) {
      if (cur.length) blocks.push(cur);
      cur = [];
    } else cur.push(line.trim());
  }
  if (cur.length) blocks.push(cur);
  return blocks;
}

function readExperience(block: string[]): Experience | null {
  if (!block.length) return null;
  const dateRe = /(\d{4}\s*[–—-]\s*(?:\d{4}|aujourd['’]hui|présent|present|actuel|en cours))/i;
  let date = "";
  const rest: string[] = [];
  for (const line of block) {
    const found = line.match(dateRe);
    if (found && !date) {
      date = found[1].replace(/\s+/g, " ");
      const leftover = line.replace(found[1], "").replace(/^[\s·•,|–—-]+|[\s·•,|–—-]+$/g, "");
      if (leftover) rest.push(leftover);
    } else rest.push(line);
  }
  const role = rest[0] || "Poste";
  const company = rest[1] || "";
  const desc = rest.slice(company ? 2 : 1).join(" ");
  return { role, company, date, desc };
}

function readEducation(block: string[]): { degree: string; school: string; date: string } | null {
  if (!block.length) return null;
  const dateRe = /(\d{4}\s*[–—-]\s*\d{4})/;
  let date = "";
  const rest: string[] = [];
  for (const line of block) {
    const found = line.match(dateRe);
    if (found && !date) {
      date = found[1];
      const leftover = line.replace(found[1], "").replace(/^[\s·•,|–—-]+|[\s·•,|–—-]+$/g, "");
      if (leftover) rest.push(leftover);
    } else rest.push(line);
  }
  return { degree: rest[0] || "Diplôme", school: rest[1] || "", date };
}

function languageValue(raw: string): number {
  const num = raw.match(/(\d{1,3})\s*%?/);
  if (num) return Math.max(0, Math.min(100, Number(num[1])));
  const t = raw.toLowerCase();
  if (/natif|bilingue|maternel/.test(t)) return 100;
  if (/courant|professionnel|c1|c2/.test(t)) return 88;
  if (/intermédiaire|avance|b2|b1/.test(t)) return 65;
  if (/notion|débutant|scolaire|a1|a2/.test(t)) return 35;
  return 70;
}

export function parseProfile(raw: string, base: Profile): Profile {
  const text = raw.replace(/\t/g, " ").replace(/\r/g, "");
  if (!text.trim()) return base;
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? base.email;
  const phone = text.match(/(?:\+\d{1,3}[\s.]?)?(?:\(?\d{1,4}\)?[\s.]?){2,}\d{2,4}/)?.[0]?.trim() ?? base.phone;
  const link = (text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,)]+/i)?.[0] ?? base.link).replace(
    /^https?:\/\//,
    "",
  );
  const lines = text.split("\n");
  const trimmed = lines.map((l) => l.trim()).filter(Boolean);
  const firstSection = trimmed.findIndex(isSection);
  const preamble = (firstSection === -1 ? trimmed : trimmed.slice(0, firstSection)).filter((l) => {
    if (l.includes("@")) return false;
    if (/linkedin/i.test(l)) return false;
    if (phone && l.includes(phone)) return false;
    return true;
  });
  const name = preamble[0] && preamble[0].length < 60 ? preamble[0] : base.name;
  const role = preamble[1] && preamble[1].length < 90 ? preamble[1] : base.role;
  const summary = preamble.slice(2).join(" ") || base.summary;
  const locLine = preamble.find((l, i) => i > 1 && l.length < 42 && /,/.test(l));

  const experiences = sectionBlocks(lines, /^(exp[eé]riences?|parcours)/i)
    .map(readExperience)
    .filter((e): e is Experience => !!e && !!(e.role || e.desc));
  const educations = sectionBlocks(lines, /^(formation|études|etudes|education)/i)
    .map(readEducation)
    .filter((e): e is NonNullable<typeof e> => !!e);

  const skillLines = sectionBlocks(lines, /^(comp[eé]tences|skills)/i).flat();
  const skills = skillLines
    .flatMap((l) => l.split(/[,•|·]/))
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 40);

  const langBlocks = sectionBlocks(lines, /^langues?|^languages/i).flat();
  const languages: Meter[] = langBlocks
    .flatMap((l) => l.split(/[,•|]/))
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [label, ...rest] = l.split(/[:–—-]/);
      return { label: (label || l).trim(), value: languageValue(rest.join(" ") || l) };
    })
    .filter((l) => l.label.length < 32);

  return {
    name,
    role,
    email,
    phone,
    location: locLine || base.location,
    link,
    summary,
    experiences: experiences.length ? experiences : base.experiences,
    educations: educations.length ? educations : base.educations,
    skills: skills.length ? skills : base.skills,
    languages: languages.length ? languages : base.languages,
  };
}
