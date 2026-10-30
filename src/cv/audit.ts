import { computeElementAutoHeight } from "@/cv/profile";
import { boxesOverlap, isDecorativeElement, isStudioFreeElement } from "@/cv/pagination";
import type { CVElement, Doc, Page } from "@/cv/types";
import { PAGE_H, PAGE_W, snippet, TYPE_LABEL } from "@/cv/types";

export type AuditIssueKind =
  | "overflow-bottom"
  | "overflow-right"
  | "truncated-text"
  | "overlap"
  | "empty-page"
  | "free-block-limit"
  | "small-font"
  | "low-contrast"
  | "small-margin"
  | "high-density";

export type AuditSeverity = "critical" | "warning" | "info";

export type AuditActionKind =
  | "paginate"
  | "compact-spacing"
  | "adjust-studio"
  | "switch-guided"
  | "delete-empty-page";

export type AuditIssue = {
  id: string;
  kind: AuditIssueKind;
  severity: AuditSeverity;
  pageId: string;
  pageNumber: number;
  elementIds: string[];
  bannerTitle: string;
  message: string;
  detail?: string;
  actions: AuditActionKind[];
};

export type DocumentAudit = {
  issues: AuditIssue[];
  criticalIssues: AuditIssue[];
  warningIssues: AuditIssue[];
  infoIssues: AuditIssue[];
  primaryBannerIssue: AuditIssue | null;
  hasCriticalExportIssues: boolean;
  totalStudioFreeBlocks: number;
};

export function getElementLabel(el: CVElement): string {
  if (el.bind) {
    if (el.bind.kind === "experience") return `Expérience ${el.bind.index + 1}`;
    if (el.bind.kind === "education") return `Formation ${el.bind.index + 1}`;
    if (el.bind.kind === "skills") return "Compétences";
    if (el.bind.kind === "languages") return "Langues";
    if (el.bind.kind === "summary") return "Profil";
    if (el.bind.kind === "name") return "Nom";
    if (el.bind.kind === "role") return "Titre";
    if (el.bind.kind === "contact") return `Contact (${el.bind.field})`;
  }
  if (el.type === "skills") return "Compétences";
  if (el.type === "meters") return "Langues";
  if (el.type === "experience") return el.content.role ? `Expérience (${el.content.role})` : "Expérience";
  if (el.type === "education") return el.content.degree ? `Formation (${el.content.degree})` : "Formation";
  const s = snippet(el).trim();
  if (s && s.length <= 28) return s;
  if (s) return `${s.slice(0, 25)}…`;
  return TYPE_LABEL[el.type];
}

function parseHexRgb(hex: string): [number, number, number] | null {
  if (!hex || hex === "transparent") return null;
  const clean = hex.trim().replace(/^#/, "");
  if (clean.length === 3) {
    const r = Number.parseInt(clean[0] + clean[0], 16);
    const g = Number.parseInt(clean[1] + clean[1], 16);
    const b = Number.parseInt(clean[2] + clean[2], 16);
    if ([r, g, b].some(Number.isNaN)) return null;
    return [r, g, b];
  }
  if (clean.length === 6) {
    const r = Number.parseInt(clean.slice(0, 2), 16);
    const g = Number.parseInt(clean.slice(2, 4), 16);
    const b = Number.parseInt(clean.slice(4, 6), 16);
    if ([r, g, b].some(Number.isNaN)) return null;
    return [r, g, b];
  }
  return null;
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hexA: string, hexB: string): number | null {
  const rgbA = parseHexRgb(hexA);
  const rgbB = parseHexRgb(hexB);
  if (!rgbA || !rgbB) return null;
  const lumA = relativeLuminance(rgbA);
  const lumB = relativeLuminance(rgbB);
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  return (brightest + 0.05) / (darkest + 0.05);
}

function getEffectiveBackgroundColor(el: CVElement, page: Page): string {
  if (el.style.backgroundColor && el.style.backgroundColor !== "transparent") {
    return el.style.backgroundColor;
  }
  const cx = el.x + el.w / 2;
  const cy = el.y + el.h / 2;
  // Find highest-z visible rect/ellipse underneath this element
  const bgShapes = page.elements
    .filter(
      (other) =>
        !other.hidden &&
        other.id !== el.id &&
        (other.type === "rect" || other.type === "ellipse") &&
        other.z <= el.z &&
        other.style.backgroundColor &&
        other.style.backgroundColor !== "transparent" &&
        cx >= other.x &&
        cx <= other.x + other.w &&
        cy >= other.y &&
        cy <= other.y + other.h,
    )
    .sort((a, b) => b.z - a.z);

  if (bgShapes.length > 0) {
    return bgShapes[0].style.backgroundColor;
  }
  return page.background || "#ffffff";
}

function isContentElement(el: CVElement): boolean {
  if (el.hidden) return false;
  return ["heading", "text", "experience", "education", "skills", "meters", "contact"].includes(el.type);
}

export function auditDocument(
  doc: Doc,
  options?: { editorMode?: "guided" | "pro"; paginationBlocked?: boolean },
): DocumentAudit {
  const issues: AuditIssue[] = [];
  const editorMode = options?.editorMode ?? "guided";
  let totalStudioFreeBlocks = 0;

  doc.pages.forEach((page, pageIdx) => {
    const pageNumber = pageIdx + 1;
    const freeBlocksOnPage = page.elements.filter(isStudioFreeElement);
    totalStudioFreeBlocks += freeBlocksOnPage.length;

    const visibleContentEls = page.elements.filter(isContentElement);

    // 1. Empty page detection
    if (visibleContentEls.length === 0 && freeBlocksOnPage.length === 0) {
      issues.push({
        id: `empty-page-${page.id}`,
        kind: "empty-page",
        severity: "critical",
        pageId: page.id,
        pageNumber,
        elementIds: [],
        bannerTitle: `La page ${pageNumber} est vide.`,
        message: `La page ${pageNumber} est vide et ne contient aucun bloc.`,
        detail: "Supprimez cette page vide ou ajoutez-y du contenu avant d'exporter votre CV.",
        actions: doc.pages.length > 1 ? ["delete-empty-page", "adjust-studio"] : ["adjust-studio"],
      });
    }

    // 2. Per-element checks: bottom overflow, width overflow, truncated text, font size, contrast, margins, density
    for (const el of visibleContentEls) {
      const label = getElementLabel(el);

      // Bottom page overflow (y + h > PAGE_H)
      if (el.y + el.h > PAGE_H + 1) {
        const actions: AuditActionKind[] = ["paginate", "compact-spacing"];
        if (editorMode === "guided") actions.push("adjust-studio");
        else actions.push("adjust-studio", "switch-guided");

        issues.push({
          id: `overflow-bottom-${page.id}-${el.id}`,
          kind: "overflow-bottom",
          severity: "critical",
          pageId: page.id,
          pageNumber,
          elementIds: [el.id],
          bannerTitle: `Ton contenu dépasse la page ${pageNumber}.`,
          message: `Le bloc “${label}” dépasse la page ${pageNumber}.`,
          detail: `Bas du bloc à ${Math.round(el.y + el.h)} px (limite A4 : ${PAGE_H} px).`,
          actions,
        });
      }

      // Width / horizontal page overflow
      if (el.x < -2 || el.x + el.w > PAGE_W + 2) {
        const actions: AuditActionKind[] = ["adjust-studio"];
        if (editorMode === "pro") actions.push("switch-guided");

        issues.push({
          id: `overflow-right-${page.id}-${el.id}`,
          kind: "overflow-right",
          severity: "critical",
          pageId: page.id,
          pageNumber,
          elementIds: [el.id],
          bannerTitle: "Un bloc dépasse la page.",
          message: `Le bloc “${label}” dépasse la largeur de la page ${pageNumber}.`,
          detail: `Position horizontale (${Math.round(el.x)} px à ${Math.round(el.x + el.w)} px) hors de la feuille A4 (${PAGE_W} px).`,
          actions,
        });
      }

      // Truncated / clipped text check (height smaller than required auto height)
      if (["experience", "education", "text", "skills", "meters"].includes(el.type)) {
        const minNeeded = computeElementAutoHeight(el);
        if (el.h < minNeeded - 10) {
          issues.push({
            id: `truncated-${page.id}-${el.id}`,
            kind: "truncated-text",
            severity: "critical",
            pageId: page.id,
            pageNumber,
            elementIds: [el.id],
            bannerTitle: "Un bloc dépasse la page.",
            message: `Le texte du bloc “${label}” est tronqué ou coupé sur la page ${pageNumber}.`,
            detail: `Hauteur actuelle ${Math.round(el.h)} px pour environ ${Math.round(minNeeded)} px nécessaires.`,
            actions: ["compact-spacing", "adjust-studio"],
          });
        }
      }

      // Readability: font size too small (< 10px)
      if (el.style.fontSize && el.style.fontSize < 10) {
        issues.push({
          id: `small-font-${page.id}-${el.id}`,
          kind: "small-font",
          severity: "warning",
          pageId: page.id,
          pageNumber,
          elementIds: [el.id],
          bannerTitle: `La police du bloc “${label}” est trop petite.`,
          message: `La police du bloc “${label}” est trop petite (${el.style.fontSize} px).`,
          detail: "Une taille minimale de 10 px est recommandée pour une lecture confortable par les recruteurs.",
          actions: ["adjust-studio"],
        });
      }

      // Readability: insufficient contrast (< 3.0)
      const bgHex = getEffectiveBackgroundColor(el, page);
      const ratio = contrastRatio(el.style.color || "#141311", bgHex);
      if (ratio !== null && ratio < 2.8) {
        issues.push({
          id: `low-contrast-${page.id}-${el.id}`,
          kind: "low-contrast",
          severity: "warning",
          pageId: page.id,
          pageNumber,
          elementIds: [el.id],
          bannerTitle: `Contraste insuffisant sur le bloc “${label}”.`,
          message: `Le contraste du bloc “${label}” est insuffisant sur la page ${pageNumber} (ratio ${ratio.toFixed(1)}:1).`,
          detail: "Assurez un contraste net entre la couleur du texte et le fond.",
          actions: ["adjust-studio"],
        });
      }

      // Readability: tight margins (< 14px from A4 edges, excluding centered full-width headings)
      const isFullWidthCentered = el.x <= 2 && el.w >= PAGE_W - 4 && el.style.textAlign === "center";
      if (
        !isFullWidthCentered &&
        (el.x < 14 || el.x + el.w > PAGE_W - 14 || el.y < 14) &&
        el.x >= -2 &&
        el.x + el.w <= PAGE_W + 2
      ) {
        issues.push({
          id: `small-margin-${page.id}-${el.id}`,
          kind: "small-margin",
          severity: "warning",
          pageId: page.id,
          pageNumber,
          elementIds: [el.id],
          bannerTitle: `Marges faibles sur la page ${pageNumber}.`,
          message: `Les marges du bloc “${label}” sont trop faibles sur la page ${pageNumber}.`,
          detail: "Laissez au moins 20 à 36 px de marge par rapport au bord de la feuille A4.",
          actions: ["adjust-studio"],
        });
      }

      // Readability: excessive density
      if (el.type === "experience" && (el.content.desc?.length ?? 0) > 680) {
        issues.push({
          id: `high-density-${page.id}-${el.id}`,
          kind: "high-density",
          severity: "warning",
          pageId: page.id,
          pageNumber,
          elementIds: [el.id],
          bannerTitle: `Densité élevée dans “${label}”.`,
          message: `Le bloc “${label}” contient un texte très dense (${el.content.desc?.length} caractères).`,
          detail: "Synthétisez en 3 à 5 réalisations clés pour faciliter la lecture rapide.",
          actions: ["adjust-studio"],
        });
      }
    }

    // 3. Overlapping blocks detection on the same page
    for (let i = 0; i < visibleContentEls.length; i++) {
      for (let j = i + 1; j < visibleContentEls.length; j++) {
        const a = visibleContentEls[i];
        const b = visibleContentEls[j];
        if (isDecorativeElement(a) || isDecorativeElement(b)) continue;

        const interX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const interY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (interX > 10 && interY > 8) {
          const labelA = getElementLabel(a);
          const labelB = getElementLabel(b);
          const actions: AuditActionKind[] = ["compact-spacing", "adjust-studio"];
          if (editorMode === "pro") actions.push("switch-guided");

          issues.push({
            id: `overlap-${page.id}-${a.id}-${b.id}`,
            kind: "overlap",
            severity: "critical",
            pageId: page.id,
            pageNumber,
            elementIds: [a.id, b.id],
            bannerTitle: "Deux blocs se chevauchent.",
            message: `Deux blocs se chevauchent sur la page ${pageNumber} (“${labelA}” et “${labelB}”).`,
            detail: "Déplacez l'un des blocs dans le Studio ou réorganisez l'espacement.",
            actions,
          });
        }
      }
    }

    // 4. Studio free blocks limitation / pagination notice in Guided Mode
    if (editorMode === "guided" && freeBlocksOnPage.length > 0) {
      const freeIds = freeBlocksOnPage.map((e) => e.id);
      if (options?.paginationBlocked) {
        issues.push({
          id: `free-block-blocking-${page.id}`,
          kind: "free-block-limit",
          severity: "warning",
          pageId: page.id,
          pageNumber,
          elementIds: freeIds,
          bannerTitle: "Un bloc libre du Studio empêche la pagination automatique.",
          message: `Un bloc libre sur la page ${pageNumber} est situé dans la zone de flux. Ses coordonnées sont préservées ; utilisez l'action manuelle pour répartir sur les pages suivantes.`,
          detail: "Les blocs libres ne sont jamais déplacés ni supprimés silencieusement en Mode Guidé.",
          actions: ["paginate", "adjust-studio"],
        });
      } else {
        issues.push({
          id: `free-block-info-${page.id}`,
          kind: "free-block-limit",
          severity: "info",
          pageId: page.id,
          pageNumber,
          elementIds: freeIds,
          bannerTitle: `${freeBlocksOnPage.length} bloc(s) libre(s) du Studio conservé(s) sur la page ${pageNumber}.`,
          message:
            "Certains blocs ont été créés dans le Studio et restent en position libre. Ils sont conservés mais ne sont pas paginés automatiquement en Mode Guidé.",
          detail: "Cliquez pour sélectionner le bloc libre ou basculez vers le Studio libre pour l'éditer.",
          actions: ["adjust-studio"],
        });
      }
    }
  });

  const criticalIssues = issues.filter((i) => i.severity === "critical");
  const warningIssues = issues.filter((i) => i.severity === "warning");
  const infoIssues = issues.filter((i) => i.severity === "info");

  const primaryBannerIssue = criticalIssues[0] ?? warningIssues[0] ?? infoIssues[0] ?? null;

  return {
    issues,
    criticalIssues,
    warningIssues,
    infoIssues,
    primaryBannerIssue,
    hasCriticalExportIssues: criticalIssues.length > 0,
    totalStudioFreeBlocks,
  };
}

export type PlainTextPreviewResult = {
  text: string;
  readingOrderWarnings: string[];
  blockCount: number;
};

/**
 * Generates an ATS-oriented plain text representation of the CV following the actual visual reading order
 * of all visible text/content blocks across pages (including Studio free blocks with text, excluding decorative shapes).
 */
export function generatePlainTextPreview(doc: Doc): PlainTextPreviewResult {
  const lines: string[] = [];
  const warnings: string[] = [];
  let blockCount = 0;

  doc.pages.forEach((page, pageIdx) => {
    if (pageIdx > 0) {
      lines.push(`\n--- PAGE ${pageIdx + 1} ---`);
    }

    const textEls = page.elements.filter((el) => {
      if (el.hidden) return false;
      if (el.type === "rect" || el.type === "ellipse" || el.type === "rule" || el.type === "photo") return false;
      return true;
    });

    // Check reading order anomalies on the page
    const nameEl = textEls.find((e) => e.bind?.kind === "name");
    const roleEl = textEls.find((e) => e.bind?.kind === "role");
    const expHeading = textEls.find(
      (e) => e.type === "heading" && !e.bind && /exp[eé]rience|parcours/i.test(e.content.text ?? ""),
    );
    const firstExp = textEls
      .filter((e) => e.type === "experience")
      .sort((a, b) => a.y - b.y)[0];

    if (nameEl && roleEl && roleEl.y + 8 < nameEl.y) {
      warnings.push(
        `Page ${pageIdx + 1} : Le titre du poste (« ${roleEl.content.text} ») est placé visuellement au-dessus du nom du candidat.`,
      );
    }
    if (expHeading && firstExp && firstExp.y + 6 < expHeading.y) {
      warnings.push(
        `Page ${pageIdx + 1} : Une expérience apparaît visuellement au-dessus du titre de section « ${expHeading.content.text} ».`,
      );
    }

    // Check overlapping text blocks that could scramble ATS extraction
    for (let i = 0; i < textEls.length; i++) {
      for (let j = i + 1; j < textEls.length; j++) {
        const a = textEls[i];
        const b = textEls[j];
        if (boxesOverlap(a, b, -6)) {
          warnings.push(
            `Page ${pageIdx + 1} : Les blocs « ${getElementLabel(a)} » et « ${getElementLabel(b)} » se chevauchent, ce qui peut altérer l'ordre de lecture ATS.`,
          );
        }
      }
    }

    // Sort elements in visual reading order:
    // 1. Header identity zone on page 1 (name -> role -> contacts) if situated in the top band (y < 245)
    // 2. Remaining elements sorted by visual vertical flow (grouping multi-column sidebars cleanly if distinct, or top-to-bottom y then x)
    const isHeaderIdentity = (el: CVElement) =>
      pageIdx === 0 &&
      el.y < 245 &&
      Boolean(el.bind && ["name", "role", "contact"].includes(el.bind.kind));

    const headerEls = textEls.filter(isHeaderIdentity).sort((a, b) => {
      const rank = (e: CVElement) => {
        if (e.bind?.kind === "name") return 0;
        if (e.bind?.kind === "role") return 1;
        return 2;
      };
      // If user explicitly placed role above name, preserve true visual y order so ATS preview shows actual visual order
      if (a.bind?.kind === "name" && b.bind?.kind === "role" && b.y + 8 < a.y) return 1;
      if (b.bind?.kind === "name" && a.bind?.kind === "role" && a.y + 8 < b.y) return -1;
      const rDiff = rank(a) - rank(b);
      if (rDiff !== 0) return rDiff;
      return Math.abs(a.y - b.y) <= 8 ? a.x - b.x : a.y - b.y;
    });

    const bodyEls = textEls
      .filter((el) => !isHeaderIdentity(el))
      .sort((a, b) => (Math.abs(a.y - b.y) <= 10 ? a.x - b.x : a.y - b.y));

    const ordered = [...headerEls, ...bodyEls];

    for (const el of ordered) {
      blockCount += 1;
      if (el.type === "heading") {
        const t = (el.content.text ?? "").trim();
        if (!t) continue;
        if (el.bind?.kind === "name") {
          lines.push(t);
        } else {
          if (lines.length > 0 && lines[lines.length - 1] !== "") {
            lines.push("");
          }
          lines.push(t.toUpperCase());
        }
      } else if (el.type === "text" || el.type === "contact") {
        const t = (el.content.text ?? "").trim();
        if (t) lines.push(t);
      } else if (el.type === "experience") {
        const header = [el.content.role?.trim(), el.content.company?.trim(), el.content.date?.trim()]
          .filter(Boolean)
          .join(" — ");
        if (header) lines.push(header);
        const desc = (el.content.desc ?? "").trim();
        if (desc) {
          const descLines = desc
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean)
            .map((l) => (l.startsWith("•") || l.startsWith("-") ? l : `• ${l}`));
          lines.push(...descLines);
        }
        lines.push("");
      } else if (el.type === "education") {
        const eduLine = [el.content.degree?.trim(), el.content.school?.trim(), el.content.date?.trim()]
          .filter(Boolean)
          .join(" — ");
        if (eduLine) lines.push(eduLine);
      } else if (el.type === "skills") {
        const items = (el.content.items ?? []).map((s) => s.trim()).filter(Boolean);
        if (items.length) lines.push(items.join(", "));
      } else if (el.type === "meters") {
        const meters = (el.content.meters ?? [])
          .filter((m) => m.label?.trim())
          .map((m) => `${m.label.trim()} (${m.value}%)`);
        if (meters.length) lines.push(meters.join(", "));
      }
    }
  });

  // Clean up consecutive blank lines
  const compactLines: string[] = [];
  for (const line of lines) {
    if (line === "" && (compactLines.length === 0 || compactLines[compactLines.length - 1] === "")) {
      continue;
    }
    compactLines.push(line);
  }
  while (compactLines.length > 0 && compactLines[compactLines.length - 1] === "") {
    compactLines.pop();
  }

  return {
    text: compactLines.join("\n"),
    readingOrderWarnings: [...new Set(warnings)],
    blockCount,
  };
}
