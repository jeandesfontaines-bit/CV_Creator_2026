import {
  CvImportError,
  extractTextFromFile,
  extractTextFromRawInput,
  IMPORT_ERROR_MESSAGES,
  MAX_IMPORT_FILE_SIZE,
  type ExtractedRawDocument,
  type SupportedImportKind,
} from "./import/extract";
import {
  assignUnrecognizedBlock,
  draftToProfile,
  filterTemplatesForImport,
  getRecommendedTemplates,
  ignoreUnrecognizedBlock,
  type AssignableSectionTarget,
  type ImportTemplateFilter,
  type RecommendedTemplateOption,
  type TemplateMeta,
} from "./import/map";
import {
  parseExtractedDocument,
  type DetectedEducationItem,
  type DetectedExperienceItem,
  type DetectedLanguageItem,
  type ImportMappingDraft,
  type UnrecognizedBlock,
} from "./import/parse";
import { TEMPLATES } from "./templates";
import type { Profile, TemplateId } from "./types";

export {
  CvImportError,
  IMPORT_ERROR_MESSAGES,
  MAX_IMPORT_FILE_SIZE,
  extractTextFromFile,
  extractTextFromRawInput,
  parseExtractedDocument,
  assignUnrecognizedBlock,
  ignoreUnrecognizedBlock,
  draftToProfile,
  getRecommendedTemplates,
  filterTemplatesForImport,
  type ExtractedRawDocument,
  type SupportedImportKind,
  type ImportMappingDraft,
  type DetectedExperienceItem,
  type DetectedEducationItem,
  type DetectedLanguageItem,
  type UnrecognizedBlock,
  type AssignableSectionTarget,
  type ImportTemplateFilter,
  type RecommendedTemplateOption,
  type TemplateMeta,
};

export interface ExtractedCVResult {
  filename: string;
  sourceKind: SupportedImportKind | "unknown";
  profile: Profile;
  recommendedTemplate: TemplateId;
  confidence: number;
  warnings: string[];
  sectionsCount: number;
  draft: ImportMappingDraft;
}

export async function extractCVFromFile(file: File): Promise<ExtractedCVResult> {
  const rawDoc = await extractTextFromFile(file);
  const draft = parseExtractedDocument(rawDoc);
  const profile = draftToProfile(draft);
  const recs = getRecommendedTemplates(draft);
  const recommendedTemplate = recs[0]?.template.id || TEMPLATES[0].id;

  return {
    filename: draft.filename,
    sourceKind: draft.sourceKind,
    profile,
    recommendedTemplate,
    confidence: draft.partialDetection ? 0.72 : 0.92,
    warnings: draft.warnings,
    sectionsCount: draft.detectedSections.length,
    draft,
  };
}

export async function extractCVFromText(
  text: string,
  sourceLabel = "Texte collé"
): Promise<ExtractedCVResult> {
  const rawDoc = extractTextFromRawInput(text, sourceLabel);
  const draft = parseExtractedDocument(rawDoc);
  const profile = draftToProfile(draft);
  const recs = getRecommendedTemplates(draft);
  const recommendedTemplate = recs[0]?.template.id || TEMPLATES[0].id;

  return {
    filename: draft.filename,
    sourceKind: draft.sourceKind,
    profile,
    recommendedTemplate,
    confidence: draft.partialDetection ? 0.72 : 0.92,
    warnings: draft.warnings,
    sectionsCount: draft.detectedSections.length,
    draft,
  };
}

export function extractFromText(
  text: string,
  _fallbackProfile?: Profile
): ExtractedCVResult {
  const rawDoc = extractTextFromRawInput(text, "Texte collé");
  const draft = parseExtractedDocument(rawDoc);
  const profile = draftToProfile(draft);
  const recs = getRecommendedTemplates(draft);
  const recommendedTemplate = recs[0]?.template.id || TEMPLATES[0].id;

  return {
    filename: draft.filename,
    sourceKind: draft.sourceKind,
    profile,
    recommendedTemplate,
    confidence: draft.partialDetection ? 0.72 : 0.92,
    warnings: draft.warnings,
    sectionsCount: draft.detectedSections.length,
    draft,
  };
}
