import type { Bind, Content, CVElement, Doc, Education, Experience, IdentityField, Meter, Page, Profile } from "@/cv/types";
import { baseStyle, INK, PAGE_H } from "@/cv/types";
import { uid } from "@/cv/geometry";

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

export function computeElementAutoHeight(el: CVElement, minH?: number): number {
  const fs = el.style.fontSize || 13;
  const lh = el.style.lineHeight || 1.4;
  const pad = (el.style.padding || 0) * 2;
  const availW = Math.max(140, el.w - pad);
  const charW = fs * 0.51;
  const charsPerLine = Math.max(18, Math.floor(availW / charW));
  const linePx = fs * lh;

  if (el.type === "experience") {
    const roleText = `${el.content.role ?? ""} ${el.content.date ?? ""}`.trim();
    const roleLines = Math.max(1, Math.ceil((roleText.length + 3) / charsPerLine));
    const companyLines = Math.max(1, Math.ceil(((el.content.company ?? "").length || 1) / charsPerLine));
    const desc = el.content.desc ?? "";
    const descLines = desc
      ? desc.split("\n").reduce((sum, line) => sum + Math.max(1, Math.ceil(Math.max(1, line.trim().length) / charsPerLine)), 0)
      : 1;
    const needed = Math.ceil((roleLines + companyLines + descLines) * linePx + pad + 12);
    const baseMin = minH ?? (el.w < 400 ? 136 : 104);
    return Math.max(baseMin, needed);
  }

  if (el.type === "education") {
    const degText = `${el.content.degree ?? ""} ${el.content.date ?? ""}`.trim();
    const degLines = Math.max(1, Math.ceil((degText.length + 3) / charsPerLine));
    const schoolLines = Math.max(1, Math.ceil(((el.content.school ?? "").length || 1) / charsPerLine));
    const needed = Math.ceil((degLines + schoolLines) * linePx + pad + 8);
    return Math.max(minH ?? 44, needed);
  }

  if (el.type === "text" || el.type === "heading") {
    const text = el.content.text ?? "";
    const lines = text
      ? text.split("\n").reduce((sum, line) => sum + Math.max(1, Math.ceil(Math.max(1, line.trim().length) / charsPerLine)), 0)
      : 1;
    const needed = Math.ceil(lines * linePx + pad + 8);
    const defaultMin = el.type === "heading" ? 20 : el.bind?.kind === "summary" ? 48 : 22;
    return Math.max(minH ?? defaultMin, needed);
  }

  if (el.type === "skills") {
    const items = el.content.items ?? [];
    let rowW = 0;
    let rows = 1;
    for (const item of items) {
      const pillW = Math.min(availW, item.length * fs * 0.56 + 26);
      if (rowW > 0 && rowW + pillW + 6 > availW) {
        rows += 1;
        rowW = pillW;
      } else {
        rowW += (rowW > 0 ? 6 : 0) + pillW;
      }
    }
    return Math.max(minH ?? 52, rows * 28 + pad + 8);
  }

  if (el.type === "meters") {
    const meters = el.content.meters ?? [];
    const wide = el.w >= 480;
    const rows = Math.max(1, wide ? Math.ceil(meters.length / 3) : meters.length);
    return Math.max(minH ?? 60, rows * 34 + pad + 8);
  }

  return el.h;
}

const TEMPLATE_ID_RE =
  /^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-\d+$|^(seed|modern|editorial|minimal|executive|creative|tech|swiss|timeline|split|monogram|preset|extracted|imported|page)-/;

function isFreeStudioEl(el: CVElement): boolean {
  if (el.type === "photo" && Boolean(el.content.src)) return true;
  if (!el.bind && !TEMPLATE_ID_RE.test(el.id)) return true;
  return false;
}

export function resizeElementWithFlow(page: Page, elId: string, nextH: number): Page {
  const target = page.elements.find((e) => e.id === elId);
  if (!target) return page;
  const prevH = target.h;
  const dh = nextH - prevH;
  if (Math.abs(dh) < 2) return page;

  const isBelowInColumn = (other: CVElement) => {
    if (other.id === target.id) return false;
    if (isFreeStudioEl(other)) return false;
    if ((other.type === "rect" || other.type === "rule" || other.type === "ellipse") && (other.h > 200 || other.y < 180)) return false;
    if (
      other.y >= 1000 &&
      (other.type === "rect" ||
        (other.type === "text" && !other.bind && (other.style.color === "#b7b1a6" || other.style.color === "#f6f3ec")))
    ) {
      return false;
    }
    const overlapX = Math.min(target.x + target.w, other.x + other.w) - Math.max(target.x, other.x);
    if (overlapX <= 32) return false;
    return other.y > target.y + 8;
  };

  return {
    ...page,
    elements: page.elements.map((el) => {
      if (el.id === target.id) return { ...el, h: nextH };
      if (isBelowInColumn(el)) return { ...el, y: Math.max(24, el.y + dh) };
      return el;
    }),
  };
}

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
  if (bind.kind === "role" && content.text != null) {
    next.role = content.text.replace(/^—\s+/, "");
  }
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
  const pages = doc.pages.map((page) => {
    let resizedIds: { id: string; nextH: number }[] = [];
    const elements = page.elements.map((el) => {
      const bind = el.bind;
      if (!bind) return el;
      if (bind.kind === "name" && field === "name") return { ...el, content: { ...el.content, text: value } };
      if (bind.kind === "summary" && field === "summary") {
        const updated = { ...el, content: { ...el.content, text: value } };
        const nextH = computeElementAutoHeight(updated, 54);
        if (Math.abs(nextH - el.h) >= 2) resizedIds.push({ id: el.id, nextH });
        return updated;
      }
      if (bind.kind === "role" && field === "role") {
        const current = el.content.text ?? "";
        const hasDash = current.startsWith("—  ");
        const rawCurrent = hasDash ? current.slice(3) : current;
        const upper = rawCurrent === rawCurrent.toUpperCase() && rawCurrent !== rawCurrent.toLowerCase();
        const formatted = upper ? value.toUpperCase() : value;
        return { ...el, content: { ...el.content, text: hasDash ? `—  ${formatted}` : formatted } };
      }
      if (bind.kind === "contact" && bind.field === field) return { ...el, content: { ...el.content, text: value } };
      return el;
    });
    let nextPage: Page = { ...page, elements };
    for (const item of resizedIds) {
      nextPage = resizeElementWithFlow(nextPage, item.id, item.nextH);
    }
    return nextPage;
  });
  return { ...doc, profile, pages };
}

export function applyExperienceUpdate(doc: Doc, index: number, patch: Partial<Experience>): Doc {
  const cur = doc.profile.experiences[index];
  if (!cur) return doc;
  const updatedExp: Experience = { ...cur, ...patch };
  const experiences = doc.profile.experiences.map((exp, i) => (i === index ? updatedExp : exp));
  const profile: Profile = { ...doc.profile, experiences };

  const pages = doc.pages.map((page) => {
    const toResize: { id: string; nextH: number }[] = [];
    const elements = page.elements.map((el) => {
      if (el.bind?.kind === "experience" && el.bind.index === index) {
        const updatedEl: CVElement = {
          ...el,
          content: {
            ...el.content,
            role: updatedExp.role,
            company: updatedExp.company,
            date: updatedExp.date,
            desc: updatedExp.desc,
          },
        };
        const nextH = computeElementAutoHeight(updatedEl);
        if (Math.abs(nextH - el.h) >= 2) toResize.push({ id: el.id, nextH });
        return updatedEl;
      }
      return el;
    });
    let nextPage: Page = { ...page, elements };
    for (const r of toResize) {
      nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
    }
    return nextPage;
  });

  return { ...doc, profile, pages };
}

export function applyExperienceAdd(doc: Doc, activePageId: string, entry?: Experience): Doc {
  const newExp: Experience = entry ?? {
    role: "Nouveau poste",
    company: "Entreprise — Ville",
    date: "2024 — Présent",
    desc: "Principales réalisations et résultats obtenus.",
  };
  const newIndex = doc.profile.experiences.length;
  const profile: Profile = {
    ...doc.profile,
    experiences: [...doc.profile.experiences, newExp],
  };

  // Find the page containing the highest-indexed experience element (across all pages)
  let hostPageId = doc.pages.some((p) => p.id === activePageId) ? activePageId : doc.pages[0].id;
  let bestExpIdx = -1;
  for (const p of doc.pages) {
    for (const el of p.elements) {
      if (el.bind?.kind === "experience" && el.bind.index > bestExpIdx) {
        bestExpIdx = el.bind.index;
        hostPageId = p.id;
      }
    }
  }

  const pages = doc.pages.map((page) => {
    if (page.id !== hostPageId) return page;
    const expElements = page.elements.filter((el) => el.type === "experience");
    const lastExp = expElements.length
      ? expElements.reduce((a, b) => (a.y + a.h >= b.y + b.h ? a : b))
      : null;

    const x = lastExp ? lastExp.x : 40;
    const w = lastExp ? lastExp.w : 714;
    const style = lastExp ? { ...lastExp.style } : baseStyle({ fontSize: 13, color: INK, lineHeight: 1.4 });
    const gap = 12;
    const y = lastExp
      ? lastExp.y + lastExp.h + gap
      : Math.min(PAGE_H - 120, page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48) + 16);
    const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;

    const draftEl: CVElement = {
      id: uid(),
      type: "experience",
      x,
      y,
      w,
      h: lastExp ? Math.min(120, Math.max(96, lastExp.h)) : 104,
      rotation: 0,
      z: maxZ,
      locked: false,
      hidden: false,
      bind: { kind: "experience", index: newIndex },
      content: { ...newExp },
      style,
    };
    const h = computeElementAutoHeight(draftEl);
    const newEl: CVElement = { ...draftEl, h };

    const shiftedElements = lastExp
      ? page.elements.map((el) => {
          if (isFreeStudioEl(el)) return el;
          if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return el;
          if (el.y >= 990 && (el.type === "rect" || (!el.bind && el.w >= 450))) return el;
          const overlapX = Math.min(x + w, el.x + el.w) - Math.max(x, el.x);
          if (overlapX > 32 && el.y > lastExp.y + 8) {
            return { ...el, y: el.y + h + gap };
          }
          return el;
        })
      : page.elements;

    return {
      ...page,
      elements: [...shiftedElements, newEl],
    };
  });

  return { ...doc, profile, pages };
}

export function applyExperienceRemove(doc: Doc, index: number): Doc {
  if (index < 0 || index >= doc.profile.experiences.length) return doc;
  const profile: Profile = {
    ...doc.profile,
    experiences: doc.profile.experiences.filter((_, i) => i !== index),
  };

  const pages = doc.pages.map((page) => {
    const removed = page.elements.find((el) => el.bind?.kind === "experience" && el.bind.index === index);
    const remaining = page.elements
      .filter((el) => !(el.bind?.kind === "experience" && el.bind.index === index))
      .map((el) => {
        let nextEl = el;
        if (el.bind?.kind === "experience" && el.bind.index > index) {
          nextEl = { ...nextEl, bind: { kind: "experience", index: el.bind.index - 1 } };
        }
        if (removed && !isFreeStudioEl(el)) {
          if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return nextEl;
          if (el.y >= 990 && (el.type === "rect" || (!el.bind && el.w >= 450))) return nextEl;
          const overlapX = Math.min(removed.x + removed.w, el.x + el.w) - Math.max(removed.x, el.x);
          if (overlapX > 32 && el.y > removed.y + 8) {
            return { ...nextEl, y: Math.max(24, nextEl.y - (removed.h + 12)) };
          }
        }
        return nextEl;
      });
    return { ...page, elements: remaining };
  });

  return { ...doc, profile, pages };
}

export function applyEducationUpdate(doc: Doc, index: number, patch: Partial<Education>): Doc {
  const cur = doc.profile.educations[index];
  if (!cur) return doc;
  const updatedEdu: Education = { ...cur, ...patch };
  const educations = doc.profile.educations.map((edu, i) => (i === index ? updatedEdu : edu));
  const profile: Profile = { ...doc.profile, educations };

  const pages = doc.pages.map((page) => {
    const toResize: { id: string; nextH: number }[] = [];
    const elements = page.elements.map((el) => {
      if (el.bind?.kind === "education" && el.bind.index === index) {
        const updatedEl: CVElement = {
          ...el,
          content: {
            ...el.content,
            degree: updatedEdu.degree,
            school: updatedEdu.school,
            date: updatedEdu.date,
          },
        };
        const nextH = computeElementAutoHeight(updatedEl, 44);
        if (Math.abs(nextH - el.h) >= 2) toResize.push({ id: el.id, nextH });
        return updatedEl;
      }
      return el;
    });
    let nextPage: Page = { ...page, elements };
    for (const r of toResize) {
      nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
    }
    return nextPage;
  });

  return { ...doc, profile, pages };
}

export function applyEducationAdd(doc: Doc, activePageId: string, entry?: Education): Doc {
  const newEdu: Education = entry ?? {
    degree: "Diplôme",
    school: "École / Université",
    date: "2020 — 2023",
  };
  const newIndex = doc.profile.educations.length;
  const profile: Profile = {
    ...doc.profile,
    educations: [...doc.profile.educations, newEdu],
  };

  let hostPageId = doc.pages.some((p) => p.id === activePageId) ? activePageId : doc.pages[0].id;
  let bestEduIdx = -1;
  for (const p of doc.pages) {
    for (const el of p.elements) {
      if (el.bind?.kind === "education" && el.bind.index > bestEduIdx) {
        bestEduIdx = el.bind.index;
        hostPageId = p.id;
      }
    }
  }

  const pages = doc.pages.map((page) => {
    if (page.id !== hostPageId) return page;
    const eduElements = page.elements.filter((el) => el.type === "education");
    const lastEdu = eduElements.length
      ? eduElements.reduce((a, b) => (a.y + a.h >= b.y + b.h ? a : b))
      : null;

    const x = lastEdu ? lastEdu.x : 40;
    const w = lastEdu ? lastEdu.w : 714;
    const h = 44;
    const gap = 8;
    const y = lastEdu
      ? lastEdu.y + lastEdu.h + gap
      : Math.min(PAGE_H - 80, page.elements.reduce((m, el) => Math.max(m, el.hidden ? m : el.y + el.h), 48) + 16);
    const maxZ = Math.max(1, ...page.elements.map((e) => e.z)) + 1;
    const style = lastEdu ? { ...lastEdu.style } : baseStyle({ fontSize: 13, color: INK });

    const newEl: CVElement = {
      id: uid(),
      type: "education",
      x,
      y,
      w,
      h,
      rotation: 0,
      z: maxZ,
      locked: false,
      hidden: false,
      bind: { kind: "education", index: newIndex },
      content: { ...newEdu },
      style,
    };

    const shiftedElements = lastEdu
      ? page.elements.map((el) => {
          if (isFreeStudioEl(el)) return el;
          if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return el;
          if (el.y >= 990 && (el.type === "rect" || (!el.bind && el.w >= 450))) return el;
          const overlapX = Math.min(x + w, el.x + el.w) - Math.max(x, el.x);
          if (overlapX > 32 && el.y > lastEdu.y + 8) {
            return { ...el, y: el.y + h + gap };
          }
          return el;
        })
      : page.elements;

    return {
      ...page,
      elements: [...shiftedElements, newEl],
    };
  });

  return { ...doc, profile, pages };
}

export function applyEducationRemove(doc: Doc, index: number): Doc {
  if (index < 0 || index >= doc.profile.educations.length) return doc;
  const profile: Profile = {
    ...doc.profile,
    educations: doc.profile.educations.filter((_, i) => i !== index),
  };

  const pages = doc.pages.map((page) => {
    const removed = page.elements.find((el) => el.bind?.kind === "education" && el.bind.index === index);
    const remaining = page.elements
      .filter((el) => !(el.bind?.kind === "education" && el.bind.index === index))
      .map((el) => {
        let nextEl = el;
        if (el.bind?.kind === "education" && el.bind.index > index) {
          nextEl = { ...nextEl, bind: { kind: "education", index: el.bind.index - 1 } };
        }
        if (removed && !isFreeStudioEl(el)) {
          if ((el.type === "rect" || el.type === "rule" || el.type === "ellipse") && (el.h > 200 || el.y < 180)) return nextEl;
          if (el.y >= 990 && (el.type === "rect" || (!el.bind && el.w >= 450))) return nextEl;
          const overlapX = Math.min(removed.x + removed.w, el.x + el.w) - Math.max(removed.x, el.x);
          if (overlapX > 32 && el.y > removed.y + 8) {
            return { ...nextEl, y: Math.max(24, nextEl.y - (removed.h + 8)) };
          }
        }
        return nextEl;
      });
    return { ...page, elements: remaining };
  });

  return { ...doc, profile, pages };
}

export function applySkillsUpdate(doc: Doc, skills: string[]): Doc {
  const profile: Profile = { ...doc.profile, skills: [...skills] };
  const pages = doc.pages.map((page) => {
    const toResize: { id: string; nextH: number }[] = [];
    const elements = page.elements.map((el) => {
      if (el.bind?.kind === "skills") {
        const updatedEl: CVElement = { ...el, content: { ...el.content, items: [...skills] } };
        const nextH = computeElementAutoHeight(updatedEl, 52);
        if (Math.abs(nextH - el.h) >= 2) toResize.push({ id: el.id, nextH });
        return updatedEl;
      }
      return el;
    });
    let nextPage: Page = { ...page, elements };
    for (const r of toResize) {
      nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
    }
    return nextPage;
  });
  return { ...doc, profile, pages };
}

export function applyLanguagesUpdate(doc: Doc, languages: Meter[]): Doc {
  const profile: Profile = { ...doc.profile, languages: languages.map((l) => ({ ...l })) };
  const pages = doc.pages.map((page) => {
    const toResize: { id: string; nextH: number }[] = [];
    const elements = page.elements.map((el) => {
      if (el.bind?.kind === "languages") {
        const updatedEl: CVElement = { ...el, content: { ...el.content, meters: languages.map((l) => ({ ...l })) } };
        const nextH = computeElementAutoHeight(updatedEl, 60);
        if (Math.abs(nextH - el.h) >= 2) toResize.push({ id: el.id, nextH });
        return updatedEl;
      }
      return el;
    });
    let nextPage: Page = { ...page, elements };
    for (const r of toResize) {
      nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
    }
    return nextPage;
  });
  return { ...doc, profile, pages };
}

export function syncBoundElementsFromProfile(doc: Doc, preserveCustomGeometry = false): Doc {
  const p = doc.profile;
  const pages = doc.pages.map((page) => {
    const toResize: { id: string; nextH: number }[] = [];
    const elements = page.elements.map((el) => {
      const bind = el.bind;
      if (!bind) return el;
      if (bind.kind === "name") return { ...el, content: { ...el.content, text: p.name } };
      if (bind.kind === "summary") {
        const textChanged = el.content.text !== p.summary;
        const updated = { ...el, content: { ...el.content, text: p.summary } };
        if (!preserveCustomGeometry || textChanged) {
          const nextH = computeElementAutoHeight(updated, 54);
          if (Math.abs(nextH - el.h) >= 2) toResize.push({ id: el.id, nextH });
        }
        return updated;
      }
      if (bind.kind === "role") {
        const current = el.content.text ?? "";
        const hasDash = current.startsWith("—  ");
        const rawCurrent = hasDash ? current.slice(3) : current;
        const upper = rawCurrent === rawCurrent.toUpperCase() && rawCurrent !== rawCurrent.toLowerCase();
        const formatted = upper ? p.role.toUpperCase() : p.role;
        return { ...el, content: { ...el.content, text: hasDash ? `—  ${formatted}` : formatted } };
      }
      if (bind.kind === "contact") {
        return { ...el, content: { ...el.content, text: p[bind.field] } };
      }
      if (bind.kind === "experience") {
        const exp = p.experiences[bind.index];
        if (!exp) return el;
        const expChanged =
          el.content.role !== exp.role ||
          el.content.company !== exp.company ||
          el.content.date !== exp.date ||
          el.content.desc !== exp.desc;
        const updated = {
          ...el,
          content: {
            ...el.content,
            role: exp.role,
            company: exp.company,
            date: exp.date,
            desc: exp.desc,
          },
        };
        if (!preserveCustomGeometry || expChanged) {
          const nextH = computeElementAutoHeight(updated);
          if (Math.abs(nextH - el.h) >= 2) toResize.push({ id: el.id, nextH });
        }
        return updated;
      }
      if (bind.kind === "education") {
        const edu = p.educations[bind.index];
        if (!edu) return el;
        const eduChanged =
          el.content.degree !== edu.degree ||
          el.content.school !== edu.school ||
          el.content.date !== edu.date;
        const updated = {
          ...el,
          content: {
            ...el.content,
            degree: edu.degree,
            school: edu.school,
            date: edu.date,
          },
        };
        if (!preserveCustomGeometry || eduChanged) {
          const nextH = computeElementAutoHeight(updated, 44);
          if (Math.abs(nextH - el.h) >= 2) toResize.push({ id: el.id, nextH });
        }
        return updated;
      }
      if (bind.kind === "skills") {
        return { ...el, content: { ...el.content, items: [...p.skills] } };
      }
      if (bind.kind === "languages") {
        return { ...el, content: { ...el.content, meters: p.languages.map((m) => ({ ...m })) } };
      }
      return el;
    });
    let nextPage: Page = { ...page, elements };
    for (const r of toResize) {
      nextPage = resizeElementWithFlow(nextPage, r.id, r.nextH);
    }
    return nextPage;
  });
  return { ...doc, pages };
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
