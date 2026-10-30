import type { TextLine } from "@/CV_extractor_2026-main/src/lib/cv/types.ts";
import { plainLine, textToLines } from "@/CV_extractor_2026-main/src/lib/cv/text.ts";

export const MAX_IMPORT_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo

export type ImportErrorCode =
  | "FILE_TOO_LARGE"
  | "PDF_NO_TEXT"
  | "UNSUPPORTED_FORMAT"
  | "PARTIAL_EXTRACTION"
  | "NO_SECTION_DETECTED"
  | "TECHNICAL_ERROR";

export class CvImportError extends Error {
  code: ImportErrorCode;

  constructor(code: ImportErrorCode, message: string) {
    super(message);
    this.name = "CvImportError";
    this.code = code;
  }
}

export const IMPORT_ERROR_MESSAGES: Record<ImportErrorCode, string> = {
  FILE_TOO_LARGE: "Ce fichier dépasse la limite de 10 Mo.\nChoisis un fichier plus léger.",
  PDF_NO_TEXT:
    "Ce PDF ne contient pas de texte sélectionnable.\nTu peux copier-coller ton contenu ou créer un CV avec l’IA.",
  UNSUPPORTED_FORMAT: "Ce format n’est pas supporté.\nImporte un fichier PDF, Word ou TXT.",
  PARTIAL_EXTRACTION:
    "Certaines sections n’ont pas été détectées.\nTu peux les vérifier et les compléter avant de créer ton CV.",
  NO_SECTION_DETECTED:
    "Nous n’avons pas pu détecter automatiquement la structure.\nTu peux coller ton texte ou créer un CV avec l’IA.",
  TECHNICAL_ERROR: "L’import a échoué.\nRéessaie ou choisis un autre fichier.",
};

export type SupportedImportKind = "pdf" | "docx" | "txt";

export interface ExtractedRawDocument {
  filename: string;
  kind: SupportedImportKind;
  rawText: string;
  normalizedText: string;
  lines: TextLine[];
}

function bytesOf(data: ArrayBuffer | Uint8Array): Uint8Array {
  return data instanceof Uint8Array ? data : new Uint8Array(data);
}

/**
 * Normalizes raw extracted text:
 * - removes invisible characters
 * - normalizes bullet characters
 * - collapses multiple spaces
 * - strips repetitive page headers/footers ("Page 1 sur 2", "Page 1 of 2", etc.)
 * - collapses excessive blank lines
 */
export function normalizeExtractedText(raw: string): string {
  if (!raw) return "";

  const cleanedLines = raw
    .replace(/\r\n?/g, "\n")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u200B-\u200D\uFEFF\u00AD\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .split("\n")
    .map((line) => {
      let l = line.replace(/[ \t\u00A0]{2,}/g, " ").trim();
      // Normalize bullet points
      l = l.replace(/^(?:[▪▫●◦‣⁃\uF0B7\u2022*]|-(?=\s))\s*/, "• ");
      return l;
    });

  // Detect and filter out repetitive page numbering footers/headers
  const lineCounts = new Map<string, number>();
  for (const l of cleanedLines) {
    if (!l) continue;
    lineCounts.set(l, (lineCounts.get(l) ?? 0) + 1);
  }

  const filtered = cleanedLines.filter((l) => {
    if (!l) return true;
    // Standard page number footers ("Page 1 / 2", "Page 1 of 3", "1/2")
    if (/^(?:page\s*)?\d+\s*(?:\/|sur|of)\s*\d+$/i.test(l)) return false;
    return true;
  });

  return filtered
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function detectSupportedKind(name: string, bytes: Uint8Array): Promise<SupportedImportKind> {
  const ext = (name.toLowerCase().split(".").pop() ?? "").trim();

  // Check PDF magic header %PDF
  const isPdfHeader =
    bytes.length >= 4 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46;

  if (ext === "pdf" || isPdfHeader) {
    if (!isPdfHeader) {
      throw new CvImportError("TECHNICAL_ERROR", IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR);
    }
    return "pdf";
  }

  // Check ZIP header PK (used by .docx)
  const isZipHeader = bytes.length >= 2 && bytes[0] === 0x50 && bytes[1] === 0x4b;
  if (ext === "docx" || isZipHeader) {
    if (ext !== "docx" && ext !== "") {
      throw new CvImportError("UNSUPPORTED_FORMAT", IMPORT_ERROR_MESSAGES.UNSUPPORTED_FORMAT);
    }
    try {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(bytes);
      if (zip.file("word/document.xml")) {
        return "docx";
      }
    } catch {
      throw new CvImportError("TECHNICAL_ERROR", IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR);
    }
    throw new CvImportError("UNSUPPORTED_FORMAT", IMPORT_ERROR_MESSAGES.UNSUPPORTED_FORMAT);
  }

  if (ext === "txt") {
    // Reject binary files masquerading as .txt
    if (bytes.slice(0, 256).includes(0)) {
      throw new CvImportError("UNSUPPORTED_FORMAT", IMPORT_ERROR_MESSAGES.UNSUPPORTED_FORMAT);
    }
    return "txt";
  }

  throw new CvImportError("UNSUPPORTED_FORMAT", IMPORT_ERROR_MESSAGES.UNSUPPORTED_FORMAT);
}

interface PdfGlyph {
  str: string;
  x: number;
  end: number;
  y: number;
  fontSize: number;
  bold: boolean;
  width: number;
  height: number;
}

function glyphsToLines(glyphs: PdfGlyph[], page: number, pageWidth: number): TextLine[] {
  const sorted = [...glyphs].sort((a, b) => a.y - b.y || a.x - b.x);
  const rows: PdfGlyph[][] = [];
  for (const glyph of sorted) {
    const row = rows[rows.length - 1];
    const ref = row?.[0];
    if (ref && Math.abs(glyph.y - ref.y) <= Math.max(ref.fontSize, glyph.fontSize) * 0.45) {
      row.push(glyph);
    } else {
      rows.push([glyph]);
    }
  }
  const lines: TextLine[] = [];
  for (const row of rows) {
    row.sort((a, b) => a.x - b.x);
    let chunk: PdfGlyph[] = [];
    const emit = () => {
      if (!chunk.length) return;
      let text = "";
      let end = chunk[0]!.x;
      for (const glyph of chunk) {
        const gap = glyph.x - end;
        if (!text) text = glyph.str;
        else if (text.endsWith("-") && gap < glyph.fontSize * 0.25) text = `${text.slice(0, -1)}${glyph.str}`;
        else text += `${gap > glyph.fontSize * 0.22 ? " " : ""}${glyph.str}`;
        end = Math.max(end, glyph.end);
      }
      const value = text.replace(/[ \t]{2,}/g, " ").trim();
      if (value) {
        const first = chunk[0]!;
        lines.push(
          plainLine(value, {
            page,
            x: first.x,
            y: first.y,
            width: Math.max(end - first.x, 1),
            height: first.height || first.fontSize,
            fontSize: Math.max(...chunk.map((item) => item.fontSize)),
            bold: chunk.some((item) => item.bold),
            pageWidth,
          }),
        );
      }
      chunk = [];
    };
    for (const glyph of row) {
      const prev = chunk[chunk.length - 1];
      if (prev && glyph.x - prev.end > Math.max(glyph.fontSize, prev.fontSize) * 3.2) emit();
      chunk.push(glyph);
    }
    emit();
  }
  return lines;
}

/**
 * Fallback extractor for uncompressed PDF text streams (BT ... (text) Tj ... ET)
 * in case pdfjs worker fails or when parsing lightweight synthetic PDFs.
 */
function fallbackExtractPdfStreamText(bytes: Uint8Array): string[] {
  const raw = new TextDecoder("latin1").decode(bytes);
  const extracted: string[] = [];
  const btBlocks = raw.match(/BT[\s\S]*?ET/g) ?? [];
  for (const block of btBlocks) {
    const matches = block.matchAll(/\((?:\\.|[^\\()])*\)\s*Tj|\[((?:\\.|[^\]])*)\]\s*TJ/g);
    for (const m of matches) {
      const token = m[0];
      const strParts = Array.from(token.matchAll(/\(((?:\\.|[^\\()])*)\)/g)).map((p) =>
        p[1]
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "")
          .replace(/\\\(/g, "(")
          .replace(/\\\)/g, ")")
          .replace(/\\\\/g, "\\")
          .replace(/\\(\d{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8))),
      );
      const line = strParts.join("").trim();
      if (line) extracted.push(line);
    }
  }
  return extracted;
}

async function extractPdfLines(bytes: Uint8Array): Promise<TextLine[]> {
  let lines: TextLine[] = [];
  let pdfLoaded = false;

  try {
    const pdfjs = await import("pdfjs-dist");
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    }
    const task = pdfjs.getDocument({
      data: bytes.slice(),
      isEvalSupported: false,
      useSystemFonts: true,
    });
    const doc = await task.promise;
    pdfLoaded = true;
    const pageCount = Math.min(doc.numPages, 15);
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const page = await doc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      const content = await page.getTextContent();
      const styles = content.styles as Record<string, { fontFamily?: string }>;
      const glyphs: PdfGlyph[] = [];
      for (const item of content.items) {
        if (!("str" in item) || !item.str) continue;
        const transform = item.transform as number[];
        const fontSize =
          Math.hypot(transform[2] ?? 0, transform[3] ?? 0) ||
          Math.hypot(transform[0] ?? 0, transform[1] ?? 0) ||
          12;
        const fontName = `${item.fontName ?? ""} ${styles[item.fontName ?? ""]?.fontFamily ?? ""}`;
        const x = transform[4] ?? 0;
        glyphs.push({
          str: item.str,
          x,
          end: x + (item.width ?? 0),
          y: viewport.height - (transform[5] ?? 0),
          fontSize,
          bold: /bold|black|semibold|heavy|demi/i.test(fontName),
          width: item.width ?? 0,
          height: item.height || fontSize,
        });
      }
      lines.push(...glyphsToLines(glyphs, pageNumber, viewport.width));
    }
  } catch {
    // Fallback to raw stream parser if pdfjs encountered a stream/worker error
    const fallbackStrings = fallbackExtractPdfStreamText(bytes);
    if (fallbackStrings.length > 0) {
      lines = fallbackStrings.map((s, idx) => plainLine(s, { page: 1, y: idx * 16 }));
      pdfLoaded = true;
    }
  }

  if (!pdfLoaded) {
    throw new CvImportError("TECHNICAL_ERROR", IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR);
  }

  if (lines.length === 0) {
    const fallbackStrings = fallbackExtractPdfStreamText(bytes);
    if (fallbackStrings.length > 0) {
      lines = fallbackStrings.map((s, idx) => plainLine(s, { page: 1, y: idx * 16 }));
    }
  }

  const combinedText = lines.map((l) => l.text.trim()).filter(Boolean).join("\n");
  if (!combinedText || combinedText.length < 3) {
    throw new CvImportError("PDF_NO_TEXT", IMPORT_ERROR_MESSAGES.PDF_NO_TEXT);
  }

  return lines;
}

function htmlToLines(html: string): TextLine[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const lines: TextLine[] = [];
  const walk = (el: Element) => {
    for (const child of Array.from(el.children)) {
      const tag = child.tagName.toLowerCase();
      if (/^h[1-4]$/.test(tag) || tag === "p" || tag === "li" || tag === "tr") {
        const text = (child.textContent ?? "").replace(/\s+/g, " ").trim();
        if (text) {
          lines.push(
            plainLine(text, {
              bold: /^h[1-4]$/.test(tag) || Boolean(child.querySelector("strong, b")),
              headingHint: /^h[1-4]$/.test(tag),
              listItem: tag === "li",
              fontSize: /^h[1-4]$/.test(tag) ? 18 : 12,
            }),
          );
        }
        continue;
      }
      walk(child);
    }
  };
  if (doc.body) walk(doc.body);
  return lines;
}

async function extractDocxLines(bytes: Uint8Array): Promise<TextLine[]> {
  try {
    const mammoth = await import("mammoth");
    const api = (mammoth.default ?? mammoth) as {
      convertToHtml: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
    };
    const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    const html = await api.convertToHtml({ arrayBuffer });
    const lines = htmlToLines(html.value);
    if (lines.length > 0) return lines;
  } catch {
    // Fallback to direct XML parsing of word/document.xml
  }

  try {
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(bytes);
    const docXml = await zip.file("word/document.xml")?.async("string");
    if (!docXml) throw new Error("Missing word/document.xml");
    const xml = new DOMParser().parseFromString(docXml, "application/xml");
    const paragraphs = Array.from(xml.getElementsByTagName("w:p"));
    const lines: TextLine[] = [];
    for (const p of paragraphs) {
      const texts = Array.from(p.getElementsByTagName("w:t")).map((t) => t.textContent ?? "");
      const joined = texts.join("").replace(/\s+/g, " ").trim();
      if (joined) lines.push(plainLine(joined));
    }
    return lines;
  } catch {
    throw new CvImportError("TECHNICAL_ERROR", IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR);
  }
}

export async function extractTextFromFile(file: File): Promise<ExtractedRawDocument> {
  if (file.size > MAX_IMPORT_FILE_SIZE) {
    throw new CvImportError("FILE_TOO_LARGE", IMPORT_ERROR_MESSAGES.FILE_TOO_LARGE);
  }

  let bytes: Uint8Array;
  try {
    bytes = bytesOf(await file.arrayBuffer());
  } catch {
    throw new CvImportError("TECHNICAL_ERROR", IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR);
  }

  if (bytes.length === 0) {
    throw new CvImportError("TECHNICAL_ERROR", IMPORT_ERROR_MESSAGES.TECHNICAL_ERROR);
  }

  const kind = await detectSupportedKind(file.name, bytes);

  if (kind === "pdf") {
    const rawLines = await extractPdfLines(bytes);
    const rawText = rawLines.map((l) => l.text).join("\n");
    const normalizedText = normalizeExtractedText(rawText);
    const normalizedLines = textToLines(normalizedText);
    return {
      filename: file.name,
      kind: "pdf",
      rawText,
      normalizedText,
      lines: rawLines.length > 0 ? rawLines : normalizedLines,
    };
  }

  if (kind === "docx") {
    const rawLines = await extractDocxLines(bytes);
    const rawText = rawLines.map((l) => l.text).join("\n");
    const normalizedText = normalizeExtractedText(rawText);
    if (!normalizedText) {
      throw new CvImportError("NO_SECTION_DETECTED", IMPORT_ERROR_MESSAGES.NO_SECTION_DETECTED);
    }
    return {
      filename: file.name,
      kind: "docx",
      rawText,
      normalizedText,
      lines: rawLines,
    };
  }

  const rawText = new TextDecoder("utf-8").decode(bytes);
  const normalizedText = normalizeExtractedText(rawText);
  if (!normalizedText) {
    throw new CvImportError("NO_SECTION_DETECTED", IMPORT_ERROR_MESSAGES.NO_SECTION_DETECTED);
  }
  return {
    filename: file.name,
    kind: "txt",
    rawText,
    normalizedText,
    lines: textToLines(normalizedText),
  };
}

export function extractTextFromRawInput(rawInput: string, filename = "Texte collé"): ExtractedRawDocument {
  const normalizedText = normalizeExtractedText(rawInput);
  if (!normalizedText) {
    throw new CvImportError("NO_SECTION_DETECTED", IMPORT_ERROR_MESSAGES.NO_SECTION_DETECTED);
  }
  return {
    filename,
    kind: "txt",
    rawText: rawInput,
    normalizedText,
    lines: textToLines(normalizedText),
  };
}
