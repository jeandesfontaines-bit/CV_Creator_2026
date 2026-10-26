import type { CVElement } from "@/cv/types";

export type ColorPalette = {
  id: string;
  name: string;
  desc: string;
  primary: string; // Header or prominent shapes
  accent: string;  // Badges, highlights, secondary accents
  rule: string;    // Dividers and separators
  textLight: string; // Text on primary
  softBg: string;  // Light soft cards or page tint
};

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: "graphite",
    name: "Graphite / Encre",
    desc: "Classique indémodable, sérieux & intemporel",
    primary: "#141311",
    accent: "#5e5952",
    rule: "#d5cfc4",
    textLight: "#fffdf8",
    softBg: "#f6f3ec",
  },
  {
    id: "marine",
    name: "Bleu Corporate",
    desc: "Sérieux, conseil, finance & grands comptes",
    primary: "#0f2b5c",
    accent: "#2563eb",
    rule: "#bfdbfe",
    textLight: "#ffffff",
    softBg: "#eff6ff",
  },
  {
    id: "emerald",
    name: "Vert Forêt",
    desc: "Moderne, santé, RSE & écologie",
    primary: "#064e3b",
    accent: "#059669",
    rule: "#a7f3d0",
    textLight: "#ffffff",
    softBg: "#f0fdf4",
  },
  {
    id: "burgundy",
    name: "Bordeaux / Prune",
    desc: "Luxe, élégance, droit & raffinement",
    primary: "#701a3b",
    accent: "#be185d",
    rule: "#fbcfe8",
    textLight: "#ffffff",
    softBg: "#fdf2f8",
  },
  {
    id: "terracotta",
    name: "Terracotta / Ocre",
    desc: "Chaleureux, design, créatif & communication",
    primary: "#7c2d12",
    accent: "#ea580c",
    rule: "#fed7aa",
    textLight: "#ffffff",
    softBg: "#fff7ed",
  },
  {
    id: "indigo",
    name: "Violet Moderne",
    desc: "Tech, SaaS, startup & produit digital",
    primary: "#312e81",
    accent: "#6366f1",
    rule: "#c7d2fe",
    textLight: "#ffffff",
    softBg: "#eef2ff",
  },
];

/**
 * Harmonizes elements of a page with the selected color palette
 * without modifying their positions, dimensions or bindings.
 */
export function applyPaletteToElements(elements: CVElement[], palette: ColorPalette): CVElement[] {
  return elements.map((el) => {
    // Header banner or large dark background rectangle
    if (el.type === "rect" && el.style.backgroundColor && el.style.backgroundColor !== "transparent") {
      const isDark = el.y < 200 || el.h > 600 || el.w > 700;
      if (isDark) {
        return {
          ...el,
          style: {
            ...el.style,
            backgroundColor: palette.primary,
            borderColor: palette.primary,
          },
        };
      }
      return {
        ...el,
        style: {
          ...el.style,
          backgroundColor: palette.softBg,
          borderColor: palette.rule,
        },
      };
    }

    // Circles / Ellipses
    if (el.type === "ellipse") {
      return {
        ...el,
        style: {
          ...el.style,
          backgroundColor: palette.accent,
        },
      };
    }

    // Dividers and rules
    if (el.type === "rule") {
      return {
        ...el,
        style: {
          ...el.style,
          backgroundColor: palette.rule,
        },
      };
    }

    // Badges / Tags or elements on dark backgrounds
    if (el.y < 160 && el.w > 400 && el.style.color && (el.style.color === "#ffffff" || el.style.color === "#f6f3ec" || el.style.color === "#fffdf8")) {
      // Keep light text on the dark banner
      return el;
    }

    // Role tags with background
    if (el.style.backgroundColor && el.style.backgroundColor !== "transparent" && el.style.borderRadius > 20) {
      return {
        ...el,
        style: {
          ...el.style,
          backgroundColor: palette.primary,
          color: palette.textLight,
        },
      };
    }

    return el;
  });
}
