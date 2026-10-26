import { parseLines } from "./parse.ts";
import { plainLine, textToLines } from "./text.ts";
import type { CvExtraction, TextLine } from "./types.ts";

type Kind = "pdf" | "docx" | "odt" | "rtf" | "html" | "text" | "doc-legacy" | "unknown";
function bytesOf(data: ArrayBuffer | Uint8Array): Uint8Array { return data instanceof Uint8Array ? data : new Uint8Array(data); }
async function detectKind(name: string, bytes: Uint8Array): Promise<Kind> {
  const ext = name.toLowerCase().split(".").pop() ?? "";
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return "pdf";
  if (bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0) return "doc-legacy";
  if (bytes[0] === 0x50 && bytes[1] === 0x4b) {
    if (ext === "odt") return "odt";
    if (ext === "docx") return "docx";
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(bytes);
    const mime = await zip.file("mimetype")?.async("string");
    if (mime?.includes("opendocument.text")) return "odt";
    if (zip.file("word/document.xml")) return "docx";
    return "unknown";
  }
  const head = new TextDecoder().decode(bytes.slice(0, 500)).trimStart().toLowerCase();
  if (head.startsWith("{\\rtf") || ext === "rtf") return "rtf";
  if (ext === "html" || ext === "htm" || head.startsWith("<!doctype html") || head.startsWith("<html")) return "html";
  if (ext === "pdf") return "pdf";
  if (bytes.slice(0, 200).includes(0)) return "unknown";
  return "text";
}
function htmlToLines(html: string): TextLine[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const lines: TextLine[] = [];
  const walk = (el: Element) => {
    for (const child of Array.from(el.children)) {
      const tag = child.tagName.toLowerCase();
      if (/^h[1-3]$/.test(tag) || tag === "p" || tag === "li" || tag === "tr") {
        const text = (child.textContent ?? "").replace(/\s+/g, " ").trim();
        if (text) lines.push(plainLine(text, { bold: /^h[1-3]$/.test(tag) || Boolean(child.querySelector("strong, b")), headingHint: /^h[1-3]$/.test(tag), listItem: tag === "li", fontSize: /^h[1-3]$/.test(tag) ? 18 : 12 }));
        continue;
      }
      walk(child);
    }
  };
  if (doc.body) walk(doc.body);
  return lines;
}
function rtfToText(input: string): string {
  let index = 0;
  let out = "";
  const destinations = new Set(["fonttbl", "colortbl", "stylesheet", "info", "pict", "datastore", "themedata", "listtable", "listoverridetable", "generator", "header", "footer", "headerl", "headerr", "footerl", "footerr"]);
  const parseGroup = (skip: boolean) => {
    while (index < input.length) {
      const char = input[index];
      if (char === "{") {
        index += 1;
        let nested = skip;
        if (input[index] === "\\" && input[index + 1] === "*") nested = true;
        else { const word = /^\\([a-zA-Z]+)/.exec(input.slice(index)); if (word && destinations.has(word[1]!.toLowerCase())) nested = true; }
        parseGroup(nested); continue;
      }
      if (char === "}") { index += 1; return; }
      if (char === "\\") {
        if (input[index + 1] === "\\") { if (!skip) out += "\\"; index += 2; continue; }
        if (input[index + 1] === "{") { if (!skip) out += "{"; index += 2; continue; }
        if (input[index + 1] === "}") { if (!skip) out += "}"; index += 2; continue; }
        if (input[index + 1] === "'") {
          const hex = input.slice(index + 2, index + 4);
          if (!skip && /^[0-9a-fA-F]{2}$/.test(hex)) out += new TextDecoder("windows-1252").decode(new Uint8Array([Number.parseInt(hex, 16)]));
          index += 4; continue;
        }
        const control = /^\\([a-zA-Z]+)(-?\d+)? ?/.exec(input.slice(index));
        if (control) {
          const word = control[1]?.toLowerCase() ?? "";
          if (!skip && (word === "par" || word === "line")) out += "\n";
          else if (!skip && word === "tab") out += "\t";
          else if (!skip && word === "u" && control[2]) { let code = Number(control[2]); if (code < 0) code += 65536; out += String.fromCharCode(code); }
          index += control[0].length; continue;
        }
        index += 1; continue;
      }
      if (!skip && char !== "\r" && char !== "\n") out += char;
      index += 1;
    }
  };
  if (input.startsWith("{")) { index = 1; parseGroup(false); } else parseGroup(false);
  return out.replace(/\n{3,}/g, "\n\n").trim();
}
async function docxToLines(bytes: Uint8Array): Promise<TextLine[]> {
  const mammoth = await import("mammoth");
  const api = (mammoth.default ?? mammoth) as { convertToHtml: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }> };
  const html = await api.convertToHtml({ arrayBuffer: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer });
  return htmlToLines(html.value);
}
async function odtToLines(bytes: Uint8Array): Promise<TextLine[]> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(bytes);
  const file = zip.file("content.xml");
  if (!file) throw new Error("Ce fichier ODT n'a pas de contenu lisible.");
  const doc = new DOMParser().parseFromString(await file.async("string"), "application/xml");
  const lines: TextLine[] = [];
  let root: Element | null = null;
  for (const el of Array.from(doc.getElementsByTagName("*"))) if (el.localName === "text" && el.parentElement?.localName === "body") { root = el; break; }
  const walk = (el: Element, list: boolean) => {
    for (const child of Array.from(el.children)) {
      const local = child.localName;
      if (local === "p" || local === "h") {
        const text = (child.textContent ?? "").replace(/\s+/g, " ").trim();
        if (text) lines.push(plainLine(text, { headingHint: local === "h", bold: local === "h", listItem: list, fontSize: local === "h" ? 18 : 12 }));
      } else walk(child, list || local === "list" || local === "list-item");
    }
  };
  if (root) walk(root, false);
  return lines;
}
interface PdfGlyph { str: string; x: number; end: number; y: number; fontSize: number; bold: boolean; width: number; height: number; }
function glyphsToLines(glyphs: PdfGlyph[], page: number, pageWidth: number): TextLine[] {
  const sorted = [...glyphs].sort((a, b) => a.y - b.y || a.x - b.x);
  const rows: PdfGlyph[][] = [];
  for (const glyph of sorted) {
    const row = rows[rows.length - 1];
    const ref = row?.[0];
    if (ref && Math.abs(glyph.y - ref.y) <= Math.max(ref.fontSize, glyph.fontSize) * 0.45) row.push(glyph); else rows.push([glyph]);
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
      if (value) { const first = chunk[0]!; lines.push(plainLine(value, { page, x: first.x, y: first.y, width: Math.max(end - first.x, 1), height: first.height || first.fontSize, fontSize: Math.max(...chunk.map((item) => item.fontSize)), bold: chunk.some((item) => item.bold), pageWidth })); }
      chunk = [];
    };
    for (const glyph of row) { const prev = chunk[chunk.length - 1]; if (prev && glyph.x - prev.end > Math.max(glyph.fontSize, prev.fontSize) * 3.2) emit(); chunk.push(glyph); }
    emit();
  }
  return lines;
}
async function pdfToLines(bytes: Uint8Array): Promise<{ lines: TextLine[]; truncated: boolean }> {
  const pdfjs = await import("pdfjs-dist");
  if (!pdfjs.GlobalWorkerOptions.workerSrc) { const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url"); pdfjs.GlobalWorkerOptions.workerSrc = worker.default; }
  const task = pdfjs.getDocument({ data: bytes, isEvalSupported: false, useSystemFonts: true });
  const doc = await task.promise;
  const pageCount = Math.min(doc.numPages, 15);
  const lines: TextLine[] = [];
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await doc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    const styles = content.styles as Record<string, { fontFamily?: string }>;
    const glyphs: PdfGlyph[] = [];
    for (const item of content.items) {
      if (!("str" in item) || !item.str) continue;
      const transform = item.transform as number[];
      const fontSize = Math.hypot(transform[2] ?? 0, transform[3] ?? 0) || Math.hypot(transform[0] ?? 0, transform[1] ?? 0) || 12;
      const fontName = `${item.fontName ?? ""} ${styles[item.fontName ?? ""]?.fontFamily ?? ""}`;
      const x = transform[4] ?? 0;
      glyphs.push({ str: item.str, x, end: x + (item.width ?? 0), y: viewport.height - (transform[5] ?? 0), fontSize, bold: /bold|black|semibold|heavy|demi/i.test(fontName), width: item.width ?? 0, height: item.height || fontSize });
    }
    lines.push(...glyphsToLines(glyphs, pageNumber, viewport.width));
  }
  return { lines, truncated: doc.numPages > 15 };
}
export async function parseFile(file: File): Promise<CvExtraction> {
  if (file.size > 12 * 1024 * 1024) throw new Error("Fichier trop volumineux (maximum 12 Mo).");
  const bytes = bytesOf(await file.arrayBuffer());
  const kind = await detectKind(file.name, bytes);
  if (kind === "doc-legacy") throw new Error("Le format .doc (Word 97-2003) n'est pas lu : la conversion abîmerait le texte. Enregistrez-le en PDF ou en DOCX.");
  if (kind === "unknown") throw new Error("Format non reconnu. Déposez un PDF texte, un DOCX, un ODT, un RTF, un HTML ou un TXT.");
  if (kind === "pdf") { const pdf = await pdfToLines(bytes); return parseLines({ filename: file.name, format: "pdf", lines: pdf.lines, truncated: pdf.truncated }); }
  if (kind === "docx") return parseLines({ filename: file.name, format: "docx", lines: await docxToLines(bytes) });
  if (kind === "odt") return parseLines({ filename: file.name, format: "odt", lines: await odtToLines(bytes) });
  const decoded = new TextDecoder().decode(bytes);
  if (kind === "rtf") return parseLines({ filename: file.name, format: "rtf", lines: textToLines(rtfToText(decoded)) });
  if (kind === "html") return parseLines({ filename: file.name, format: "html", lines: htmlToLines(decoded) });
  return parseLines({ filename: file.name, format: "text", lines: textToLines(decoded) });
}
