import { TEMPLATES } from "../templates";
import type { Profile, TemplateId } from "../types";
import type {
  DetectedEducationItem,
  DetectedExperienceItem,
  ImportMappingDraft,
} from "./parse";

export type TemplateMeta = (typeof TEMPLATES)[number];

export type AssignableSectionTarget =
  | "profile"
  | "experience"
  | "education"
  | "skills"
  | "languages";

export function assignUnrecognizedBlock(
  draft: ImportMappingDraft,
  blockId: string,
  target: AssignableSectionTarget
): ImportMappingDraft {
  const block = draft.unrecognizedBlocks.find((b) => b.id === blockId);
  if (!block) return draft;

  const remainingBlocks = draft.unrecognizedBlocks.filter((b) => b.id !== blockId);
  const next: ImportMappingDraft = {
    ...draft,
    profile: { ...draft.profile },
    experiences: [...draft.experiences],
    educations: [...draft.educations],
    skills: [...draft.skills],
    languages: [...draft.languages],
    unrecognizedBlocks: remainingBlocks,
  };

  const cleanText = block.text.trim();
  if (!cleanText) return next;

  if (target === "profile") {
    next.profile.summary = [next.profile.summary, cleanText].filter(Boolean).join("\n\n");
    if (!next.detectedSections.includes("Profil")) {
      next.detectedSections = ["Profil", ...next.detectedSections];
    }
  } else if (target === "experience") {
    const lines = cleanText.split("\n").map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0] || block.heading || "Expérience importée";
    const parts = firstLine.split(/\s*(?:\||—|–|@|-)\s*/).map((p) => p.trim()).filter(Boolean);
    const role = parts[0] || firstLine;
    const company = parts[1] || (block.heading !== "Contenu à vérifier" ? block.heading : "");
    const desc = (lines.length > 1 ? lines.slice(1) : lines).join("\n");
    const newExp: DetectedExperienceItem = {
      id: `exp-assigned-${Date.now()}-${next.experiences.length + 1}`,
      role,
      company,
      date: "",
      location: "",
      desc,
      needsReview: !role || !company,
      dateNeedsReview: true,
      reviewReason: "attribué manuellement · dates à vérifier",
    };
    next.experiences.push(newExp);
    if (!next.detectedSections.includes("Expériences")) {
      next.detectedSections = [...next.detectedSections, "Expériences"];
    }
  } else if (target === "education") {
    const lines = cleanText.split("\n").map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0] || block.heading || "Formation importée";
    const parts = firstLine.split(/\s*(?:\||—|–|,|-)\s*/).map((p) => p.trim()).filter(Boolean);
    const degree = parts[0] || firstLine;
    const school = parts[1] || (lines[1] ?? "");
    const newEdu: DetectedEducationItem = {
      id: `edu-assigned-${Date.now()}-${next.educations.length + 1}`,
      degree,
      school,
      date: "",
      location: "",
      needsReview: !degree || !school,
      dateNeedsReview: true,
      reviewReason: "attribué manuellement · dates à vérifier",
    };
    next.educations.push(newEdu);
    if (!next.detectedSections.includes("Formations")) {
      next.detectedSections = [...next.detectedSections, "Formations"];
    }
  } else if (target === "skills") {
    const tokens = cleanText
      .split(/[\n,;|•·]+/)
      .map((s) => s.replace(/^[•●▪▸►*-]\s*/, "").trim())
      .filter(Boolean);
    for (const tok of tokens) {
      if (!next.skills.some((s) => s.toLowerCase() === tok.toLowerCase())) {
        next.skills.push(tok);
      }
    }
    if (!next.detectedSections.includes("Compétences")) {
      next.detectedSections = [...next.detectedSections, "Compétences"];
    }
  } else if (target === "languages") {
    const tokens = cleanText
      .split(/[\n,;|•·]+/)
      .map((s) => s.replace(/^[•●▪▸►*-]\s*/, "").trim())
      .filter(Boolean);
    tokens.forEach((tok, idx) => {
      const sep = tok.split(/\s*[:–—()-]\s*/).filter(Boolean);
      const name = sep[0] || tok;
      const level = sep[1] || "À préciser";
      next.languages.push({
        id: `lang-assigned-${Date.now()}-${idx}`,
        name,
        level,
        pct: 75,
      });
    });
    if (!next.detectedSections.includes("Langues")) {
      next.detectedSections = [...next.detectedSections, "Langues"];
    }
  }

  return next;
}

export function ignoreUnrecognizedBlock(
  draft: ImportMappingDraft,
  blockId: string
): ImportMappingDraft {
  return {
    ...draft,
    unrecognizedBlocks: draft.unrecognizedBlocks.filter((b) => b.id !== blockId),
  };
}

/**
 * Converts the user-verified ImportMappingDraft into a CV Creator Profile.
 * Never invents missing information or falls back to SAMPLE data.
 */
export function draftToProfile(draft: ImportMappingDraft): Profile {
  const formatLocationDate = (date: string, location: string): string => {
    const d = date.trim();
    const loc = location.trim();
    if (d && loc && !d.toLowerCase().includes(loc.toLowerCase())) {
      return `${d} · ${loc}`;
    }
    return d || loc || "";
  };

  return {
    name: draft.profile.name.trim(),
    role: draft.profile.role.trim(),
    email: draft.profile.email.trim(),
    phone: draft.profile.phone.trim(),
    location: draft.profile.location.trim(),
    link: draft.profile.link.trim(),
    summary: draft.profile.summary.trim(),
    experiences: draft.experiences.map((exp) => ({
      role: exp.role.trim(),
      company: exp.company.trim(),
      date: formatLocationDate(exp.date, exp.location),
      desc: exp.desc.trim(),
    })),
    educations: draft.educations.map((edu) => ({
      degree: edu.degree.trim(),
      school: edu.school.trim(),
      date: formatLocationDate(edu.date, edu.location),
    })),
    skills: draft.skills.map((s) => s.trim()).filter(Boolean),
    languages: draft.languages.map((l) => {
      const cleanName = l.name.trim();
      const cleanLevel = l.level.trim();
      const label =
        cleanLevel && cleanLevel !== "À préciser" && !cleanName.toLowerCase().includes(cleanLevel.toLowerCase())
          ? `${cleanName} (${cleanLevel})`
          : cleanName;
      return {
        label,
        value: typeof l.pct === "number" ? Math.max(10, Math.min(100, l.pct)) : 75,
      };
    }),
  };
}

export type ImportTemplateFilter = "all" | "ats" | "onepage" | "moderne" | "creatif";

export interface RecommendedTemplateOption {
  template: TemplateMeta;
  badge: string;
  reason: string;
}

export function getRecommendedTemplates(draft: ImportMappingDraft): RecommendedTemplateOption[] {
  const expCount = draft.experiences.length;
  const totalTextLen =
    draft.profile.summary.length +
    draft.experiences.reduce((acc, e) => acc + e.desc.length, 0);

  const isDense = expCount >= 4 || totalTextLen > 1400;

  const primaryId: TemplateId = isDense ? "minimal" : "executive";
  const atsId: TemplateId = primaryId === "minimal" ? "swiss" : "minimal";
  const modernId: TemplateId = "modern";

  const findMeta = (id: TemplateId): TemplateMeta =>
    TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];

  return [
    {
      template: findMeta(primaryId),
      badge: "Recommandé",
      reason: isDense
        ? "Idéal pour structurer un parcours dense sans perte de lisibilité"
        : "Mise en page équilibrée et hiérarchie claire pour ton profil",
    },
    {
      template: findMeta(atsId),
      badge: "ATS-safe",
      reason: "Lecture linéaire 100 % compatible avec les recruteurs et logiciels ATS",
    },
    {
      template: findMeta(modernId),
      badge: "Moderne",
      reason: "Bandeau contrasté qui met en valeur compétences et expériences",
    },
  ];
}

export function filterTemplatesForImport(filter: ImportTemplateFilter): TemplateMeta[] {
  if (filter === "all") return TEMPLATES;
  if (filter === "ats") {
    return TEMPLATES.filter((t) =>
      ["minimal", "modern", "swiss", "executive"].includes(t.id)
    );
  }
  if (filter === "onepage") {
    return TEMPLATES.filter((t) =>
      ["executive", "modern", "swiss", "minimal"].includes(t.id)
    );
  }
  if (filter === "moderne") {
    return TEMPLATES.filter((t) =>
      ["modern", "executive", "swiss"].includes(t.id)
    );
  }
  if (filter === "creatif") {
    return TEMPLATES.filter((t) =>
      ["creative", "editorial", "swiss"].includes(t.id)
    );
  }
  return TEMPLATES;
}
