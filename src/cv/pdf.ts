import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import type { Doc } from "@/cv/types";

/**
 * Directly generates and downloads a clean A4 PDF file without opening the browser print dialog.
 * Supports multi-page documents.
 */
export async function downloadDirectPDF(
  doc: Doc,
  activePageId: string,
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
  const fileName = `CV_${cleanName}.pdf`;

  // We can render each page sheet
  const pages = doc.pages;
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    onProgress?.(`Rendu de la page ${i + 1}/${pages.length}...`);

    // Look for the rendered sheet in DOM
    const sheetEl = document.querySelector<HTMLElement>(`[data-sheet="${page.id}"]`);
    if (!sheetEl) continue;

    // Hide selection handles and rulers during capture
    const dataUrl = await toPng(sheetEl, {
      pixelRatio: 2.2,
      cacheBust: true,
      filter: (node) => {
        if (node instanceof HTMLElement && node.classList.contains("no-export")) {
          return false;
        }
        return true;
      },
    });

    if (i > 0) {
      pdf.addPage("a4", "portrait");
    }

    // A4 in mm is 210 x 297
    pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297, undefined, "FAST");
  }

  pdf.save(fileName);
}
