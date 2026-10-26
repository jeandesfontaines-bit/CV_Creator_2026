import { parseText } from "@/CV_extractor_2026-main/src/index.ts";
import { parseFile } from "@/CV_extractor_2026-main/src/browser.ts";
import type { CvExtraction, Dated } from "@/CV_extractor_2026-main/src/lib/cv/types.ts";
import type { Experience, Education, Meter, Profile } from "@/cv/types";
import { SAMPLE } from "@/cv/profile";

export interface ExtractorStats {
  experiencesCount: number;
  educationsCount: number;
  skillsCount: number;
  languagesCount: number;
  hasContact: boolean;
}

export interface ExtractorResult {
  profile: Profile;
  rawExtraction?: CvExtraction;
  sourceText?: string;
  warnings: string[];
  ambiguities: string[];
  stats: ExtractorStats;
}

function formatDatePoint(point: { year: number; month: number | null } | null | undefined): string {
  if (!point) return "";
  if (point.month != null) return `${String(point.month).padStart(2, "0")}/${point.year}`;
  return String(point.year);
}

function extractDatesString(dated: Dated | null | undefined): string {
  if (!dated) return "";
  if (dated.raw?.text) return dated.raw.text.trim();
  const parsed = dated.parsed?.value;
  if (!parsed) return "";
  const start = formatDatePoint(parsed.start);
  if (parsed.openEnded) {
    return start ? `${start} — Aujourd'hui` : "En cours";
  }
  const end = formatDatePoint(parsed.end);
  if (start && end) return `${start} — ${end}`;
  return start || end || "";
}

function parseLevelToValue(levelText?: string): number {
  if (!levelText) return 80;
  const t = levelText.toLowerCase();
  if (/c2|natif|maternelle|fluent|bilingue/i.test(t)) return 100;
  if (/c1|courant|avancé|avance/i.test(t)) return 90;
  if (/b2|professionnel|intermédiaire sup/i.test(t)) return 75;
  if (/b1|intermédiaire|intermediaire/i.test(t)) return 60;
  if (/a2|élémentaire|notions/i.test(t)) return 40;
  if (/a1|débutant|debutant/i.test(t)) return 25;
  const num = t.match(/(\d{1,3})\s*%/);
  if (num) return Math.min(100, Math.max(0, parseInt(num[1], 10)));
  return 75;
}

export function cvExtractionToProfile(extraction: CvExtraction, base: Profile = SAMPLE): Profile {
  const ident = extraction.identity;

  // Name
  const fullName = ident.fullName?.text?.trim();
  const name = fullName && fullName.length > 2 && fullName.length < 80 ? fullName : base.name;

  // Role / Headline
  const headline = ident.headline?.text?.trim() || extraction.experiences[0]?.title?.text?.trim();
  const role = headline && headline.length > 2 && headline.length < 100 ? headline : base.role;

  // Contact info
  const email = ident.emails[0]?.text?.text?.trim() || base.email;
  const phone = ident.phones[0]?.text?.text?.trim() || base.phone;
  const location = ident.location?.text?.trim() || base.location;
  const link = ident.urls[0]?.text?.text?.trim() || base.link;

  // Summary / Bio
  const summary = extraction.profile.text?.text?.trim() || ident.intro?.text?.trim() || base.summary;

  // Experiences
  const experiences: Experience[] = extraction.experiences
    .map((exp) => {
      const roleName = exp.title?.text?.trim() || "Poste";
      const company = exp.organization?.text?.trim() || "";
      const date = extractDatesString(exp.dates);

      let desc = "";
      if (exp.realizations && exp.realizations.length > 0) {
        desc = exp.realizations.map((r) => `• ${r.trim()}`).join("\n");
      } else if (exp.description?.text) {
        desc = exp.description.text.trim();
      } else if (exp.rawLines && exp.rawLines.length > 2) {
        desc = exp.rawLines.slice(2).join(" ").trim();
      }

      return {
        role: roleName,
        company,
        date,
        desc,
      };
    })
    .filter((e) => e.role || e.company || e.desc);

  // Educations
  const educations: Education[] = extraction.education
    .map((edu) => {
      const degree = edu.degree?.text?.trim() || "Diplôme";
      const school = edu.school?.text?.trim() || "";
      const date = extractDatesString(edu.dates);
      return { degree, school, date };
    })
    .filter((e) => e.degree || e.school);

  // Skills
  const rawSkills: string[] = [];
  for (const group of extraction.skills) {
    for (const item of group.items) {
      const s = item.text.text.trim();
      if (s && s.length > 1 && s.length < 50) {
        rawSkills.push(s);
      }
    }
  }
  const cleanSkills = Array.from(new Set(rawSkills));

  // Languages
  const languages: Meter[] = extraction.languages
    .map((l) => {
      const name = l.name.text.trim();
      const level = l.levelCanon?.value ? l.levelCanon.value.value : l.levelRaw?.text || "";
      return {
        label: level ? `${name} (${level})` : name,
        value: parseLevelToValue(level),
      };
    })
    .filter((l) => l.label.length > 0);

  return {
    name,
    role,
    email,
    phone,
    location,
    link,
    summary,
    experiences: experiences.length > 0 ? experiences : base.experiences,
    educations: educations.length > 0 ? educations : base.educations,
    skills: cleanSkills.length > 0 ? cleanSkills : base.skills,
    languages: languages.length > 0 ? languages : base.languages,
  };
}

export function computeExtractionStats(profile: Profile): ExtractorStats {
  return {
    experiencesCount: profile.experiences.length,
    educationsCount: profile.educations.length,
    skillsCount: profile.skills.length,
    languagesCount: profile.languages.length,
    hasContact: Boolean(profile.email || profile.phone || profile.location),
  };
}

/**
 * Extrait le profil complet à partir d'un fichier (PDF, DOCX, ODT, RTF, HTML, TXT)
 */
export async function extractFromFile(file: File, baseProfile: Profile = SAMPLE): Promise<ExtractorResult> {
  const extraction = await parseFile(file);
  const profile = cvExtractionToProfile(extraction, baseProfile);
  const stats = computeExtractionStats(profile);

  const warnings = (extraction.warnings || []).map((w) => w.message);
  const ambiguities = (extraction.ambiguities || []).map((a) => a.message);

  return {
    profile,
    rawExtraction: extraction,
    sourceText: extraction.sourceText,
    warnings,
    ambiguities,
    stats,
  };
}

/**
 * Extrait le profil complet à partir d'un texte brut ou copié-collé
 */
export function extractFromText(text: string, baseProfile: Profile = SAMPLE): ExtractorResult {
  const extraction = parseText(text, "texte-colle.txt");
  const profile = cvExtractionToProfile(extraction, baseProfile);
  const stats = computeExtractionStats(profile);

  const warnings = (extraction.warnings || []).map((w) => w.message);
  const ambiguities = (extraction.ambiguities || []).map((a) => a.message);

  return {
    profile,
    rawExtraction: extraction,
    sourceText: text,
    warnings,
    ambiguities,
    stats,
  };
}
