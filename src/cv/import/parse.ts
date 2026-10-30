import { parseLines } from "../../CV_extractor_2026-main/src/lib/cv/parse";
import { CvImportError, type ExtractedRawDocument, IMPORT_ERROR_MESSAGES, type SupportedImportKind } from "./extract";

export interface DetectedExperienceItem {
  id: string;
  role: string;
  company: string;
  date: string;
  location: string;
  desc: string;
  needsReview: boolean;
  dateNeedsReview: boolean;
  reviewReason?: string;
}

export interface DetectedEducationItem {
  id: string;
  degree: string;
  school: string;
  date: string;
  location: string;
  needsReview: boolean;
  dateNeedsReview: boolean;
  reviewReason?: string;
}

export interface DetectedLanguageItem {
  id: string;
  name: string;
  level: string;
  pct: number;
}

export type UnrecognizedBlockKind =
  | "project"
  | "certification"
  | "interest"
  | "unclassified";

export interface UnrecognizedBlock {
  id: string;
  heading: string;
  text: string;
  kind: UnrecognizedBlockKind;
}

export interface ImportMappingDraft {
  filename: string;
  sourceKind: SupportedImportKind;
  rawText: string;
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    link: string;
    summary: string;
  };
  experiences: DetectedExperienceItem[];
  educations: DetectedEducationItem[];
  skills: string[];
  languages: DetectedLanguageItem[];
  unrecognizedBlocks: UnrecognizedBlock[];
  detectedSections: string[];
  partialDetection: boolean;
  warnings: string[];
}

function stripAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeHeadingKey(line: string): string {
  return stripAccents(line)
    .toLowerCase()
    .replace(/^[\s•●▪▸►*\-–—#0-9.)]+/, "")
    .replace(/[\s:.;,\-–—/\\|()[\]]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export type CanonicalSectionKey =
  | "profile"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "projects"
  | "certifications"
  | "links"
  | "interests";

const SECTION_MATCHERS: Array<{ key: CanonicalSectionKey; label: string; patterns: RegExp[] }> = [
  {
    key: "profile",
    label: "Profil",
    patterns: [
      /^(profil|profil professionnel|resume|resume professionnel|a propos|a propos de moi|about|about me|summary|professional summary|executive summary|objectif|objectifs|infos|introduction|presentation|bio)$/i,
    ],
  },
  {
    key: "experience",
    label: "Expériences",
    patterns: [
      /^(experience|experiences|experiences professionnelles|experience professionnelle|parcours professionnel|parcours|work experience|professional experience|employment|employment history|career|career history|carriere|historique professionnel|postes occupes)$/i,
    ],
  },
  {
    key: "education",
    label: "Formations",
    patterns: [
      /^(formation|formations|education|etudes|diplomes|diplome|academic background|academics|scolarite|cursus|cursus academique|qualifications)$/i,
    ],
  },
  {
    key: "skills",
    label: "Compétences",
    patterns: [
      /^(competence|competences|competences cles|competences techniques|principales competences|skills|technical skills|core competencies|key skills|expertise|savoir faire|stack technique|technologies|outils)$/i,
    ],
  },
  {
    key: "languages",
    label: "Langues",
    patterns: [
      /^(langue|langues|languages|langues parlees|foreign languages)$/i,
    ],
  },
  {
    key: "projects",
    label: "Projets",
    patterns: [
      /^(projet|projets|projects|personal projects|side projects|realisations|projets personnels|projets cles)$/i,
    ],
  },
  {
    key: "certifications",
    label: "Certifications",
    patterns: [
      /^(certification|certifications|certificats|certificates|licenses|licenses & certifications|licences et certifications|formations complementaires|distinctions|awards)$/i,
    ],
  },
  {
    key: "links",
    label: "Liens / portfolio",
    patterns: [
      /^(liens|lien|portfolio|links|reseaux|reseaux sociaux|web|coordonnees|contact|contacts)$/i,
    ],
  },
  {
    key: "interests",
    label: "Centres d'intérêt",
    patterns: [
      /^(centres d'interet|centre d'interet|interets|loisirs|hobbies|interests|activites)$/i,
    ],
  },
];

export function matchSectionHeading(line: string): { key: CanonicalSectionKey; label: string } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 56) return null;
  // Ignore lines that look like full sentences or bullet points with long text
  if (/^[•●▪▸►*-]\s+.{32,}/.test(trimmed)) return null;
  const key = normalizeHeadingKey(trimmed);
  if (!key) return null;
  for (const matcher of SECTION_MATCHERS) {
    if (matcher.patterns.some((re) => re.test(key))) {
      return { key: matcher.key, label: matcher.label };
    }
  }
  return null;
}

const DATE_RANGE_REGEX =
  /\b((?:(?:janv?\.?|fevr?\.?|feb\.?|mars|mar\.?|avr\.?|apr\.?|mai|may|juin|jun\.?|juil\.?|jul\.?|aout|aug\.?|sept?\.?|oct\.?|nov\.?|dec\.?)\s+)?(?:19|20)\d{2}|(?:0?[1-9]|1[0-2])\/(?:19|20)\d{2})\s*(?:-|–|—|to|au|jusqu['’]a|à|\/)\s*((?:(?:janv?\.?|fevr?\.?|feb\.?|mars|mar\.?|avr\.?|apr\.?|mai|may|juin|jun\.?|juil\.?|jul\.?|aout|aug\.?|sept?\.?|oct\.?|nov\.?|dec\.?)\s+)?(?:19|20)\d{2}|(?:0?[1-9]|1[0-2])\/(?:19|20)\d{2}|present|aujourd['’]hui|actuel|current|now|en cours)\b/i;

const SINGLE_YEAR_REGEX = /\b((?:19|20)\d{2})\b/;

const AMBIGUOUS_DATE_PATTERNS = [
  /^\d{1,2}\s*(?:ans?|mois|years?|months?)$/i,
  /^(?:depuis|since)\b/i,
  /\?/,
];

function evaluateDateQuality(dateStr: string): { cleanDate: string; dateNeedsReview: boolean } {
  const trimmed = dateStr.trim();
  if (!trimmed) return { cleanDate: "", dateNeedsReview: true };
  const stripped = stripAccents(trimmed);
  if (AMBIGUOUS_DATE_PATTERNS.some((re) => re.test(stripped))) {
    return { cleanDate: trimmed, dateNeedsReview: true };
  }
  if (DATE_RANGE_REGEX.test(stripped)) {
    return { cleanDate: trimmed, dateNeedsReview: false };
  }
  const years = stripped.match(/\b(?:19|20)\d{2}\b/g);
  if (years && years.length >= 1) {
    return { cleanDate: trimmed, dateNeedsReview: false };
  }
  return { cleanDate: trimmed, dateNeedsReview: true };
}

function mapLanguagePct(level: string): { level: string; pct: number } {
  const norm = stripAccents(level || "").toLowerCase();
  if (!norm) return { level: "À préciser", pct: 70 };
  if (/maternelle|natif|native|bilingue|fluent|c2/.test(norm)) {
    return { level: level.trim(), pct: 100 };
  }
  if (/c1|avance|advanced|courant|full professional|professionnel complet/.test(norm)) {
    return { level: level.trim(), pct: 85 };
  }
  if (/b2|intermediaire|intermediate|working proficiency|professionnel/.test(norm)) {
    return { level: level.trim(), pct: 72 };
  }
  if (/b1|a2|scolaire|notions|elementary|debutant|basic/.test(norm)) {
    return { level: level.trim(), pct: 48 };
  }
  return { level: level.trim(), pct: 70 };
}

function cleanLinkedInNoise(lines: string[]): string[] {
  return lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return true;
    if (/^Page\s+\d+\s+(?:of|sur)\s+\d+$/i.test(trimmed)) return false;
    if (/^Generated by LinkedIn$/i.test(trimmed)) return false;
    // LinkedIn duration line like "2 ans 4 mois" or "1 yr 6 mos" when standalone
    if (/^\d+\s*(?:ans?|yrs?|years?)(?:\s+\d+\s*(?:mois|mos?|months?))?$/i.test(stripAccents(trimmed))) {
      return false;
    }
    if (/^\d+\s*(?:mois|mos?|months?)$/i.test(stripAccents(trimmed))) {
      return false;
    }
    return true;
  });
}

function extractDateFromLine(line: string): { date: string; rest: string } {
  const norm = stripAccents(line);
  const rangeMatch = norm.match(DATE_RANGE_REGEX);
  if (rangeMatch && rangeMatch.index !== undefined) {
    const rawMatched = line.slice(rangeMatch.index, rangeMatch.index + rangeMatch[0].length);
    const rest = (line.slice(0, rangeMatch.index) + " " + line.slice(rangeMatch.index + rangeMatch[0].length))
      .replace(/^[\s|•—–,-]+|[\s|•—–,-]+$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return { date: rawMatched.trim(), rest };
  }
  const yearMatches = [...line.matchAll(/\b(?:19|20)\d{2}(?:\s*[-–—]\s*(?:(?:19|20)\d{2}|Présent|Present|Aujourd'hui|Actuel|Current))?\b/gi)];
  if (yearMatches.length > 0) {
    const m = yearMatches[yearMatches.length - 1];
    const rawMatched = m[0];
    const idx = m.index ?? 0;
    const rest = (line.slice(0, idx) + " " + line.slice(idx + rawMatched.length))
      .replace(/^[\s|•—–,-]+|[\s|•—–,-]+$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return { date: rawMatched.trim(), rest };
  }
  return { date: "", rest: line.trim() };
}

function parseExperienceSectionLines(lines: string[]): DetectedExperienceItem[] {
  const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
  if (nonEmpty.length === 0) return [];

  // Group into blocks separated by blank lines or date/header transitions
  const rawBlocks: string[][] = [];
  let current: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (current.length > 0) {
        rawBlocks.push(current);
        current = [];
      }
      continue;
    }
    const isBullet = /^[•●▪▸►*-]\s+/.test(line);
    const hasDateRange = DATE_RANGE_REGEX.test(stripAccents(line));
    // Start a new block if current already has bullets and we hit a non-bullet line with a date or separator
    if (
      !isBullet &&
      current.length >= 2 &&
      (hasDateRange || current.some((prev) => /^[•●▪▸►*-]\s+/.test(prev)))
    ) {
      rawBlocks.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) rawBlocks.push(current);

  const items: DetectedExperienceItem[] = [];

  rawBlocks.forEach((block, idx) => {
    const bulletLines: string[] = [];
    const headerLines: string[] = [];

    for (const line of block) {
      if (/^[•●▪▸►*-]\s+/.test(line)) {
        bulletLines.push(line.replace(/^[•●▪▸►*-]\s+/, "").trim());
      } else if (headerLines.length < 3 && bulletLines.length === 0) {
        headerLines.push(line);
      } else {
        bulletLines.push(line);
      }
    }

    let role = "";
    let company = "";
    let date = "";
    let location = "";

    const combinedHeaders = [...headerLines];
    for (let i = 0; i < combinedHeaders.length; i++) {
      const { date: extractedDate, rest } = extractDateFromLine(combinedHeaders[i]);
      if (extractedDate && !date) {
        date = extractedDate;
        combinedHeaders[i] = rest;
      }
    }

    const cleanHeaders = combinedHeaders.map((h) => h.trim()).filter(Boolean);
    if (cleanHeaders.length >= 1) {
      const first = cleanHeaders[0];
      // Check separators like "Senior Product Designer — Qonto (Paris)" or "Lead Dev @ Doctolib | Paris"
      const parts = first.split(/\s*(?:\||—|–|@|\bchez\b|\bat\b)\s*/i).map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        role = parts[0];
        company = parts[1];
        if (parts.length >= 3) {
          location = parts.slice(2).join(", ");
        }
      } else {
        role = first;
      }
    }

    if (cleanHeaders.length >= 2) {
      const second = cleanHeaders[1];
      if (!company) {
        const subParts = second.split(/\s*(?:\||—|–|·|,)\s*/).map((p) => p.trim()).filter(Boolean);
        company = subParts[0] || "";
        if (subParts.length >= 2 && !location) {
          location = subParts.slice(1).join(", ");
        }
      } else if (!location && second.length <= 45) {
        location = second;
      } else {
        bulletLines.unshift(second);
      }
    }

    if (cleanHeaders.length >= 3) {
      const third = cleanHeaders[2];
      if (!location && third.length <= 40) {
        location = third;
      } else {
        bulletLines.unshift(third);
      }
    }

    const desc = bulletLines.filter(Boolean).join("\n").trim();
    const { cleanDate, dateNeedsReview } = evaluateDateQuality(date);
    const missingCore = !role.trim() || !company.trim();
    const needsReview = missingCore || dateNeedsReview;
    const reasons: string[] = [];
    if (!role.trim()) reasons.push("intitulé de poste manquant");
    if (!company.trim()) reasons.push("entreprise à vérifier");
    if (dateNeedsReview) reasons.push("dates à vérifier");

    if (role || company || desc || cleanDate) {
      items.push({
        id: `exp-imp-${idx + 1}`,
        role: role.trim(),
        company: company.trim(),
        date: cleanDate,
        location: location.trim(),
        desc,
        needsReview,
        dateNeedsReview,
        reviewReason: reasons.length > 0 ? reasons.join(" · ") : undefined,
      });
    }
  });

  return items;
}

function parseEducationSectionLines(lines: string[]): DetectedEducationItem[] {
  const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
  if (nonEmpty.length === 0) return [];

  const rawBlocks: string[][] = [];
  let current: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (current.length > 0) {
        rawBlocks.push(current);
        current = [];
      }
      continue;
    }
    const hasYear = SINGLE_YEAR_REGEX.test(line);
    if (current.length >= 2 && hasYear && current.some((prev) => SINGLE_YEAR_REGEX.test(prev))) {
      rawBlocks.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) rawBlocks.push(current);

  const items: DetectedEducationItem[] = [];

  rawBlocks.forEach((block, idx) => {
    let degree = "";
    let school = "";
    let date = "";
    let location = "";

    const processed = block.map((line) => {
      const { date: d, rest } = extractDateFromLine(line.replace(/^[•●▪▸►*-]\s+/, ""));
      if (d && !date) {
        date = d;
        return rest;
      }
      return line.replace(/^[•●▪▸►*-]\s+/, "").trim();
    }).filter(Boolean);

    if (processed.length >= 1) {
      const parts = processed[0].split(/\s*(?:\||—|–|,|-)\s*/).map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        degree = parts[0];
        school = parts[1];
        if (parts.length >= 3) location = parts.slice(2).join(", ");
      } else {
        degree = processed[0];
      }
    }
    if (processed.length >= 2 && !school) {
      school = processed[1];
    } else if (processed.length >= 2 && !location && processed[1].length <= 45) {
      location = processed[1];
    }

    const { cleanDate, dateNeedsReview } = evaluateDateQuality(date);
    const missingCore = !degree.trim() || !school.trim();
    const needsReview = missingCore || dateNeedsReview;
    const reasons: string[] = [];
    if (!degree.trim()) reasons.push("diplôme à vérifier");
    if (!school.trim()) reasons.push("établissement à vérifier");
    if (dateNeedsReview) reasons.push("dates à vérifier");

    if (degree || school || cleanDate) {
      items.push({
        id: `edu-imp-${idx + 1}`,
        degree: degree.trim(),
        school: school.trim(),
        date: cleanDate,
        location: location.trim(),
        needsReview,
        dateNeedsReview,
        reviewReason: reasons.length > 0 ? reasons.join(" · ") : undefined,
      });
    }
  });

  return items;
}

function parseSkillsLines(lines: string[]): string[] {
  const skills: string[] = [];
  const seen = new Set<string>();

  for (const rawLine of lines) {
    const cleaned = rawLine
      .replace(/^[•●▪▸►*-]\s*/, "")
      .replace(/^[^:]{2,28}:\s*/, "") // strip category prefix like "Frontend : React, TypeScript"
      .trim();
    if (!cleaned) continue;

    const parts = cleaned
      .split(/[,;|•·/]+|\s{2,}/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 2 && s.length <= 48);

    for (const part of parts) {
      const key = part.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        skills.push(part);
      }
    }
  }

  return skills;
}

function parseLanguagesLines(lines: string[]): DetectedLanguageItem[] {
  const items: DetectedLanguageItem[] = [];
  const seen = new Set<string>();

  const tokens: string[] = [];
  for (const line of lines) {
    const cleaned = line.replace(/^[•●▪▸►*-]\s*/, "").trim();
    if (!cleaned) continue;
    // Split multiple languages on a single line if separated by ";" or "•" or "|"
    const sub = cleaned.split(/[;|•]+/).map((s) => s.trim()).filter(Boolean);
    tokens.push(...sub);
  }

  tokens.forEach((token, idx) => {
    // Match "Anglais : Courant (C1)" or "Français - Langue maternelle" or "Espagnol (Intermédiaire)"
    const parenMatch = token.match(/^([^():–—-]+?)\s*\(([^)]+)\)\s*$/);
    const sepMatch = token.match(/^([^:–—-]+?)\s*[:–—-]\s*(.+)$/);

    let name = "";
    let rawLevel = "";

    if (parenMatch) {
      name = parenMatch[1].trim();
      rawLevel = parenMatch[2].trim();
    } else if (sepMatch) {
      name = sepMatch[1].trim();
      rawLevel = sepMatch[2].trim();
    } else {
      name = token.trim();
      rawLevel = "";
    }

    if (!name || name.length > 40) return;
    const key = name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);

    const { level, pct } = mapLanguagePct(rawLevel);
    items.push({
      id: `lang-imp-${idx + 1}`,
      name,
      level,
      pct,
    });
  });

  return items;
}

export function parseExtractedDocument(doc: ExtractedRawDocument): ImportMappingDraft {
  const rawLines = cleanLinkedInNoise(doc.normalizedText.split("\n"));
  const nonEmptyLines = rawLines.map((l) => l.trim()).filter(Boolean);

  if (nonEmptyLines.length === 0) {
    throw new CvImportError("NO_SECTION_DETECTED", IMPORT_ERROR_MESSAGES.NO_SECTION_DETECTED);
  }

  // First run the existing 2026 CV line parser for rich identity & fallback signals
  const parsedFromEngine = parseLines({
    filename: doc.filename,
    format: doc.kind,
    lines: doc.lines,
  });

  // Also run our explicit FR/EN section splitter so we preserve blank-line grouping & exact unrecognized blocks
  const preambleLines: string[] = [];
  const sectionBuckets = new Map<CanonicalSectionKey, string[]>();
  const detectedSectionLabels: string[] = [];
  const unrecognizedBlocks: UnrecognizedBlock[] = [];

  let currentSection: CanonicalSectionKey | null = null;
  let unknownHeading: string | null = null;
  let unknownLines: string[] = [];

  const flushUnknown = () => {
    const text = unknownLines.join("\n").trim();
    if (text) {
      unrecognizedBlocks.push({
        id: `unrec-${unrecognizedBlocks.length + 1}`,
        heading: unknownHeading || "Contenu à vérifier",
        text,
        kind: "unclassified",
      });
    }
    unknownHeading = null;
    unknownLines = [];
  };

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    const matched = matchSectionHeading(trimmed);
    if (matched) {
      flushUnknown();
      currentSection = matched.key;
      if (!detectedSectionLabels.includes(matched.label)) {
        detectedSectionLabels.push(matched.label);
      }
      if (!sectionBuckets.has(matched.key)) {
        sectionBuckets.set(matched.key, []);
      }
      continue;
    }

    // Check if it looks like an uppercase unknown section title (e.g. "PUBLICATIONS", "BÉNÉVOLAT", " RÉFÉRENCES")
    const isShortAllCapsHeading =
      trimmed.length >= 4 &&
      trimmed.length <= 38 &&
      !/\d/.test(trimmed) &&
      trimmed === trimmed.toUpperCase() &&
      /[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]{4,}/.test(trimmed) &&
      currentSection !== null;

    if (isShortAllCapsHeading) {
      flushUnknown();
      currentSection = null;
      unknownHeading = trimmed;
      continue;
    }

    if (unknownHeading !== null) {
      unknownLines.push(rawLine);
    } else if (currentSection !== null) {
      sectionBuckets.get(currentSection)!.push(rawLine);
    } else {
      preambleLines.push(rawLine);
    }
  }
  flushUnknown();

  // Extract contact & identity from preamble + links bucket + engine
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const phoneRegex = /(?:\+?\d[\d\s().-]{7,}\d)/;
  const urlRegex = /(?:https?:\/\/[^\s,;|]+|(?:www\.|linkedin\.com\/in\/|github\.com\/)[a-zA-Z0-9._/-]+)/i;

  const allContactLines = [
    ...preambleLines,
    ...(sectionBuckets.get("links") || []),
  ];

  let email = parsedFromEngine.identity.emails[0]?.text.text || "";
  let phone = parsedFromEngine.identity.phones[0]?.text.text || "";
  let link = parsedFromEngine.identity.urls[0]?.text.text || "";
  let location = parsedFromEngine.identity.location?.text || "";
  let name = parsedFromEngine.identity.fullName?.text || "";
  let role = parsedFromEngine.identity.headline?.text || "";

  const remainingPreamble: string[] = [];

  for (const rawLine of allContactLines) {
    const line = rawLine.trim();
    if (!line) continue;

    const emailMatch = line.match(emailRegex);
    if (emailMatch && !email) email = emailMatch[0];

    const urlMatch = line.match(urlRegex);
    if (urlMatch && !link) link = urlMatch[0].replace(/^https?:\/\//i, "");

    const phoneMatch = line.match(phoneRegex);
    if (phoneMatch && !phone && !DATE_RANGE_REGEX.test(stripAccents(line))) {
      phone = phoneMatch[0].trim();
    }

    // Strip extracted contact tokens from the line to see what's left
    const stripped = line
      .replace(emailRegex, "")
      .replace(urlRegex, "")
      .replace(phoneRegex, "")
      .replace(/^[\s|•·,;-]+|[\s|•·,;-]+$/g, "")
      .trim();

    if (!stripped) continue;

    // Detect location if it matches a city/country pattern
    if (
      !location &&
      stripped.length <= 45 &&
      /\b(paris|lyon|marseille|bordeaux|lille|nantes|toulouse|nice|rennes|strasbourg|montpellier|france|belgique|suisse|canada|luxembourg|london|remote|teletravail|\d{5})\b/i.test(
        stripAccents(stripped)
      )
    ) {
      location = stripped;
      continue;
    }

    if (!name && stripped.split(/\s+/).length >= 2 && stripped.split(/\s+/).length <= 5 && !/\d/.test(stripped)) {
      name = stripped;
      continue;
    }

    if (!role && stripped.length <= 75 && remainingPreamble.length === 0) {
      role = stripped;
      continue;
    }

    remainingPreamble.push(stripped);
  }

  // Profile summary
  const explicitProfileLines = (sectionBuckets.get("profile") || [])
    .map((l) => l.trim())
    .filter(Boolean);

  let summary = "";
  if (explicitProfileLines.length > 0) {
    summary = explicitProfileLines.join(" ");
  } else if (parsedFromEngine.profile.text?.text) {
    summary = parsedFromEngine.profile.text.text;
  } else if (remainingPreamble.length > 0) {
    // Check if remaining preamble lines are actual summary sentences vs unclassified
    const summaryCandidates = remainingPreamble.filter((l) => l.length >= 30);
    const leftoverShort = remainingPreamble.filter((l) => l.length < 30);
    if (summaryCandidates.length > 0) {
      summary = summaryCandidates.join(" ");
    }
    if (leftoverShort.length > 0) {
      unrecognizedBlocks.push({
        id: `unrec-${unrecognizedBlocks.length + 1}`,
        heading: "En-tête / Informations complémentaires",
        text: leftoverShort.join("\n"),
        kind: "unclassified",
      });
    }
  }

  // Experiences
  let experiences = parseExperienceSectionLines(sectionBuckets.get("experience") || []);
  if (experiences.length === 0 && parsedFromEngine.experiences.length > 0) {
    experiences = parsedFromEngine.experiences.map((exp, idx) => {
      const dateStr = exp.dates?.raw.text || "";
      const { cleanDate, dateNeedsReview } = evaluateDateQuality(dateStr);
      const roleVal = exp.title?.text.trim() || "";
      const companyVal = exp.organization?.text.trim() || "";
      const needsReview = !roleVal || !companyVal || dateNeedsReview;
      const reasons: string[] = [];
      if (!roleVal) reasons.push("intitulé de poste manquant");
      if (!companyVal) reasons.push("entreprise à vérifier");
      if (dateNeedsReview) reasons.push("dates à vérifier");
      const descParts = [
        exp.description?.text || "",
        ...(exp.realizations || []),
      ].filter(Boolean);
      return {
        id: `exp-imp-${idx + 1}`,
        role: roleVal,
        company: companyVal,
        date: cleanDate,
        location: exp.location?.text.trim() || "",
        desc: descParts.join("\n").trim(),
        needsReview,
        dateNeedsReview,
        reviewReason: reasons.length > 0 ? reasons.join(" · ") : undefined,
      };
    });
  }

  // Educations
  let educations = parseEducationSectionLines(sectionBuckets.get("education") || []);
  if (educations.length === 0 && parsedFromEngine.education.length > 0) {
    educations = parsedFromEngine.education.map((edu, idx) => {
      const dateStr = edu.dates?.raw.text || "";
      const { cleanDate, dateNeedsReview } = evaluateDateQuality(dateStr);
      const degreeVal = edu.degree?.text.trim() || "";
      const schoolVal = edu.school?.text.trim() || "";
      const needsReview = !degreeVal || !schoolVal || dateNeedsReview;
      const reasons: string[] = [];
      if (!degreeVal) reasons.push("diplôme à vérifier");
      if (!schoolVal) reasons.push("établissement à vérifier");
      if (dateNeedsReview) reasons.push("dates à vérifier");
      return {
        id: `edu-imp-${idx + 1}`,
        degree: degreeVal,
        school: schoolVal,
        date: cleanDate,
        location: edu.location?.text.trim() || "",
        needsReview,
        dateNeedsReview,
        reviewReason: reasons.length > 0 ? reasons.join(" · ") : undefined,
      };
    });
  }

  // Skills
  let skills = parseSkillsLines(sectionBuckets.get("skills") || []);
  if (skills.length === 0 && parsedFromEngine.skills.length > 0) {
    skills = parsedFromEngine.skills
      .flatMap((g) => g.items.map((item) => item.text.text.trim()))
      .filter(Boolean);
  }

  // Languages
  let languages = parseLanguagesLines(sectionBuckets.get("languages") || []);
  if (languages.length === 0 && parsedFromEngine.languages.length > 0) {
    languages = parsedFromEngine.languages.map((l, idx) => {
      const { level, pct } = mapLanguagePct(l.levelRaw?.text || "");
      return {
        id: `lang-imp-${idx + 1}`,
        name: l.name.text.trim(),
        level,
        pct,
      };
    });
  }

  // Route Projects, Certifications, Interests into UnrecognizedBlocks so the user can review & assign them without losing anything
  const projectLines = (sectionBuckets.get("projects") || []).map((l) => l.trim()).filter(Boolean);
  if (projectLines.length > 0) {
    unrecognizedBlocks.push({
      id: `unrec-${unrecognizedBlocks.length + 1}`,
      heading: "Projets détectés",
      text: projectLines.join("\n"),
      kind: "project",
    });
  }

  const certLines = (sectionBuckets.get("certifications") || []).map((l) => l.trim()).filter(Boolean);
  if (certLines.length > 0) {
    unrecognizedBlocks.push({
      id: `unrec-${unrecognizedBlocks.length + 1}`,
      heading: "Certifications détectées",
      text: certLines.join("\n"),
      kind: "certification",
    });
  }

  const interestLines = (sectionBuckets.get("interests") || []).map((l) => l.trim()).filter(Boolean);
  if (interestLines.length > 0) {
    unrecognizedBlocks.push({
      id: `unrec-${unrecognizedBlocks.length + 1}`,
      heading: "Centres d'intérêt",
      text: interestLines.join("\n"),
      kind: "interest",
    });
  }

  const hasAnyStructuredSection =
    detectedSectionLabels.length > 0 ||
    experiences.length > 0 ||
    educations.length > 0 ||
    skills.length > 0 ||
    languages.length > 0 ||
    Boolean(email || phone);

  if (!hasAnyStructuredSection) {
    throw new CvImportError("NO_SECTION_DETECTED", IMPORT_ERROR_MESSAGES.NO_SECTION_DETECTED);
  }

  if (summary && !detectedSectionLabels.includes("Profil")) {
    detectedSectionLabels.unshift("Profil");
  }
  if (experiences.length > 0 && !detectedSectionLabels.includes("Expériences")) {
    detectedSectionLabels.push("Expériences");
  }
  if (educations.length > 0 && !detectedSectionLabels.includes("Formations")) {
    detectedSectionLabels.push("Formations");
  }
  if (skills.length > 0 && !detectedSectionLabels.includes("Compétences")) {
    detectedSectionLabels.push("Compétences");
  }
  if (languages.length > 0 && !detectedSectionLabels.includes("Langues")) {
    detectedSectionLabels.push("Langues");
  }

  const warnings: string[] = [];
  const coreDetectedCount = [
    experiences.length > 0,
    educations.length > 0,
    skills.length > 0,
    Boolean(name && (email || phone || summary)),
  ].filter(Boolean).length;

  const partialDetection =
    coreDetectedCount < 3 ||
    experiences.some((e) => e.needsReview) ||
    educations.some((e) => e.needsReview) ||
    unrecognizedBlocks.length > 0;

  if (partialDetection) {
    warnings.push(IMPORT_ERROR_MESSAGES.PARTIAL_EXTRACTION);
  }

  return {
    filename: doc.filename,
    sourceKind: doc.kind,
    rawText: doc.normalizedText,
    profile: {
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      link: link.trim(),
      summary: summary.trim(),
    },
    experiences,
    educations,
    skills,
    languages,
    unrecognizedBlocks,
    detectedSections: detectedSectionLabels,
    partialDetection,
    warnings,
  };
}
