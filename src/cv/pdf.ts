import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import type { Doc } from "@/cv/types";
import { PAGE_H, PAGE_W } from "@/cv/types";

/**
 * Directly generates and downloads a clean A4 PDF file without opening the browser print dialog.
 * Supports multi-page documents in both Guided and Studio modes.
 */
export async function downloadDirectPDF(
  doc: Doc,
  _activePageId: string,
  onProgress?: (msg: string) => void,
): Promise<void> {
  onProgress?.("Génération du PDF en cours...");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const cleanName = (doc.profile.name || "CV")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w-]/g, "");
  const fileName = `CV_${cleanName || "Document"}.pdf`;

  const pages = doc.pages;
  let renderedCount = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    onProgress?.(`Rendu de la page ${i + 1}/${pages.length}...`);

    const sheetEl =
      document.querySelector<HTMLElement>(`[data-export-sheet="${page.id}"]`) ??
      document.querySelector<HTMLElement>(`[data-sheet="${page.id}"]`);
    if (!sheetEl) continue;

    const dataUrl = await toPng(sheetEl, {
      pixelRatio: 2,
      width: PAGE_W,
      height: PAGE_H,
      skipFonts: true,
      cacheBust: true,
      filter: (node) => {
        if (node instanceof HTMLElement && node.classList.contains("no-export")) {
          return false;
        }
        return true;
      },
    });

    if (renderedCount > 0) {
      pdf.addPage("a4", "portrait");
    }

    // A4 in mm is 210 x 297
    pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST");
    renderedCount += 1;
  }

  if (renderedCount === 0) {
    throw new Error("Aucune feuille A4 trouvée pour l'export PDF");
  }

  pdf.save(fileName);
}
