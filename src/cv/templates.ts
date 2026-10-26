import type { CVElement, ElStyle, ElType, Profile, TemplateId } from "@/cv/types";
import { baseStyle, CREAM, HAIR, INK, MUTE, SIGNAL } from "@/cv/types";

const DARK_MUTE = "#b7b1a6";

type Draft = {
  type: ElType;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  bind?: CVElement["bind"];
  content?: CVElement["content"];
  style?: Partial<ElStyle>;
};

function builder(prefix: string) {
  let n = 0;
  return (draft: Draft): CVElement => {
    n += 1;
    return {
      id: `${prefix}-${n}`,
      type: draft.type,
      x: draft.x,
      y: draft.y,
      w: draft.w,
      h: draft.h,
      rotation: 0,
      z: draft.z,
      locked: false,
      hidden: false,
      bind: draft.bind,
      content: draft.content ?? {},
      style: baseStyle(draft.style),
    };
  };
}

function label(text: string, x: number, y: number, z: number, extra?: Partial<ElStyle>): Draft {
  return {
    type: "heading",
    x,
    y,
    w: 240,
    h: 16,
    z,
    content: { text },
    style: { fontSize: 11, fontWeight: 700, letterSpacing: 1.8, color: INK, ...extra },
  };
}

function experiences(p: Profile, x: number, y: number, w: number, h: number, gap: number, z: number, style?: Partial<ElStyle>): Draft[] {
  return p.experiences.map((exp, i) => ({
    type: "experience" as const,
    x,
    y: y + i * (h + gap),
    w,
    h,
    z: z + i,
    bind: { kind: "experience" as const, index: i },
    content: { ...exp },
    style: { fontSize: 13, color: INK, lineHeight: 1.4, ...style },
  }));
}

function educations(p: Profile, x: number, y: number, w: number, z: number, style?: Partial<ElStyle>): Draft[] {
  return p.educations.map((edu, i) => ({
    type: "education" as const,
    x,
    y: y + i * 50,
    w,
    h: 44,
    z: z + i,
    bind: { kind: "education" as const, index: i },
    content: { ...edu },
    style: { fontSize: 13, color: INK, ...style },
  }));
}

function modern(p: Profile, el: ReturnType<typeof builder>): CVElement[] {
  return [
    el({ type: "rect", x: 0, y: 0, w: 794, h: 172, z: 1, style: { backgroundColor: INK } }),
    el({
      type: "heading",
      x: 40,
      y: 38,
      w: 420,
      h: 48,
      z: 3,
      bind: { kind: "name" },
      content: { text: p.name },
      style: { fontFamily: "Fraunces", fontSize: 34, fontWeight: 600, color: CREAM, lineHeight: 1.05 },
    }),
    el({
      type: "text",
      x: 40,
      y: 94,
      w: 420,
      h: 22,
      z: 4,
      bind: { kind: "role" },
      content: { text: p.role.toUpperCase() },
      style: { fontSize: 12, fontWeight: 600, color: DARK_MUTE, letterSpacing: 1.6 },
    }),
    el({ type: "contact", x: 470, y: 40, w: 284, h: 22, z: 5, bind: { kind: "contact", field: "email" }, content: { icon: "mail", text: p.email }, style: { fontSize: 12, color: CREAM } }),
    el({ type: "contact", x: 470, y: 68, w: 284, h: 22, z: 6, bind: { kind: "contact", field: "phone" }, content: { icon: "phone", text: p.phone }, style: { fontSize: 12, color: CREAM } }),
    el({ type: "contact", x: 470, y: 96, w: 284, h: 22, z: 7, bind: { kind: "contact", field: "location" }, content: { icon: "pin", text: p.location }, style: { fontSize: 12, color: CREAM } }),
    el({ type: "contact", x: 470, y: 124, w: 284, h: 22, z: 8, bind: { kind: "contact", field: "link" }, content: { icon: "link", text: p.link }, style: { fontSize: 12, color: CREAM } }),
    el(label("PROFIL", 40, 196, 9)),
    el({
      type: "text",
      x: 40,
      y: 220,
      w: 714,
      h: 58,
      z: 10,
      bind: { kind: "summary" },
      content: { text: p.summary },
      style: { fontSize: 14, lineHeight: 1.5, color: "#3a3632" },
    }),
    el({ type: "rule", x: 40, y: 292, w: 714, h: 1, z: 11, style: { backgroundColor: HAIR } }),
    el(label("EXPÉRIENCE", 40, 312, 12)),
    ...experiences(p, 40, 338, 714, 104, 12, 13).map(el),
    el(label("FORMATION", 40, 698, 20)),
    ...educations(p, 40, 722, 714, 21).map(el),
    el(label("COMPÉTENCES", 40, 836, 30)),
    el({
      type: "skills",
      x: 40,
      y: 860,
      w: 714,
      h: 52,
      z: 31,
      bind: { kind: "skills" },
      content: { items: [...p.skills] },
      style: { fontSize: 12, color: INK },
    }),
    el(label("LANGUES", 40, 928, 32)),
    el({
      type: "meters",
      x: 40,
      y: 952,
      w: 714,
      h: 88,
      z: 33,
      bind: { kind: "languages" },
      content: { meters: p.languages.map((m) => ({ ...m })) },
      style: { fontSize: 12, color: INK },
    }),
  ];
}

function minimal(p: Profile, el: ReturnType<typeof builder>): CVElement[] {
  return [
    el({
      type: "heading",
      x: 60,
      y: 56,
      w: 674,
      h: 52,
      z: 1,
      bind: { kind: "name" },
      content: { text: p.name },
      style: { fontFamily: "Fraunces", fontSize: 40, fontWeight: 500, textAlign: "center", lineHeight: 1.05 },
    }),
    el({
      type: "text",
      x: 80,
      y: 116,
      w: 634,
      h: 20,
      z: 2,
      bind: { kind: "role" },
      content: { text: p.role.toUpperCase() },
      style: { fontSize: 12, fontWeight: 600, textAlign: "center", letterSpacing: 2.4, color: MUTE },
    }),
    el({ type: "rule", x: 347, y: 152, w: 100, h: 1, z: 3, style: { backgroundColor: INK } }),
    el({ type: "contact", x: 197, y: 172, w: 400, h: 20, z: 4, bind: { kind: "contact", field: "email" }, content: { icon: "mail", text: p.email }, style: { fontSize: 12, textAlign: "center", color: MUTE } }),
    el({ type: "contact", x: 197, y: 194, w: 400, h: 20, z: 5, bind: { kind: "contact", field: "phone" }, content: { icon: "phone", text: p.phone }, style: { fontSize: 12, textAlign: "center", color: MUTE } }),
    el({ type: "contact", x: 197, y: 216, w: 400, h: 20, z: 6, bind: { kind: "contact", field: "location" }, content: { icon: "pin", text: p.location }, style: { fontSize: 12, textAlign: "center", color: MUTE } }),
    el({
      type: "text",
      x: 100,
      y: 256,
      w: 594,
      h: 78,
      z: 7,
      bind: { kind: "summary" },
      content: { text: p.summary },
      style: { fontFamily: "Newsreader", fontSize: 15, fontWeight: 400, italic: true, textAlign: "center", lineHeight: 1.55, color: "#2c2926" },
    }),
    el({ ...label("EXPÉRIENCE", 0, 352, 8), x: 0, w: 794, style: { fontSize: 11, fontWeight: 700, letterSpacing: 2.2, textAlign: "center" } }),
    ...experiences(p, 110, 384, 574, 112, 14, 9).map(el),
    el({ ...label("FORMATION", 0, 770, 16), x: 0, w: 794, style: { fontSize: 11, fontWeight: 700, letterSpacing: 2.2, textAlign: "center" } }),
    ...educations(p, 110, 798, 574, 17).map(el),
    el({
      type: "skills",
      x: 110,
      y: 910,
      w: 574,
      h: 56,
      z: 20,
      bind: { kind: "skills" },
      content: { items: [...p.skills] },
      style: { fontSize: 12, textAlign: "center", color: INK },
    }),
    el({
      type: "meters",
      x: 160,
      y: 980,
      w: 474,
      h: 88,
      z: 21,
      bind: { kind: "languages" },
      content: { meters: p.languages.map((m) => ({ ...m })) },
      style: { fontSize: 12, color: INK },
    }),
  ];
}

function executive(p: Profile, el: ReturnType<typeof builder>): CVElement[] {
  const side = { color: CREAM };
  return [
    el({ type: "rect", x: 0, y: 0, w: 252, h: 1123, z: 1, style: { backgroundColor: INK } }),
    el({ type: "photo", x: 78, y: 40, w: 96, h: 96, z: 2, content: { src: "" }, style: { backgroundColor: "#2a2724", borderRadius: 48 } }),
    el({
      type: "heading",
      x: 24,
      y: 156,
      w: 204,
      h: 58,
      z: 3,
      bind: { kind: "name" },
      content: { text: p.name },
      style: { fontFamily: "Fraunces", fontSize: 22, fontWeight: 600, color: CREAM, lineHeight: 1.12 },
    }),
    el({
      type: "text",
      x: 24,
      y: 220,
      w: 204,
      h: 36,
      z: 4,
      bind: { kind: "role" },
      content: { text: p.role.toUpperCase() },
      style: { fontSize: 11, fontWeight: 600, color: DARK_MUTE, letterSpacing: 1.1, lineHeight: 1.35 },
    }),
    el({ type: "rule", x: 24, y: 268, w: 204, h: 1, z: 5, style: { backgroundColor: "#3a3834" } }),
    el(label("CONTACT", 24, 286, 6, { color: "#8d877c", fontSize: 10, letterSpacing: 1.6 })),
    el({ type: "contact", x: 24, y: 310, w: 204, h: 22, z: 7, bind: { kind: "contact", field: "email" }, content: { icon: "mail", text: p.email }, style: { ...side, fontSize: 11 } }),
    el({ type: "contact", x: 24, y: 336, w: 204, h: 22, z: 8, bind: { kind: "contact", field: "phone" }, content: { icon: "phone", text: p.phone }, style: { ...side, fontSize: 11 } }),
    el({ type: "contact", x: 24, y: 362, w: 204, h: 22, z: 9, bind: { kind: "contact", field: "location" }, content: { icon: "pin", text: p.location }, style: { ...side, fontSize: 11 } }),
    el({ type: "contact", x: 24, y: 388, w: 204, h: 22, z: 10, bind: { kind: "contact", field: "link" }, content: { icon: "link", text: p.link }, style: { ...side, fontSize: 11 } }),
    el(label("COMPÉTENCES", 24, 432, 11, { color: "#8d877c", fontSize: 10, letterSpacing: 1.6 })),
    el({
      type: "skills",
      x: 24,
      y: 456,
      w: 204,
      h: 188,
      z: 12,
      bind: { kind: "skills" },
      content: { items: [...p.skills] },
      style: { ...side, fontSize: 11 },
    }),
    el(label("LANGUES", 24, 664, 13, { color: "#8d877c", fontSize: 10, letterSpacing: 1.6 })),
    el({
      type: "meters",
      x: 24,
      y: 688,
      w: 204,
      h: 150,
      z: 14,
      bind: { kind: "languages" },
      content: { meters: p.languages.map((m) => ({ ...m })) },
      style: { ...side, fontSize: 12 },
    }),
    el(label("PROFIL", 284, 44, 15)),
    el({
      type: "text",
      x: 284,
      y: 70,
      w: 470,
      h: 78,
      z: 16,
      bind: { kind: "summary" },
      content: { text: p.summary },
      style: { fontSize: 14, lineHeight: 1.5, color: "#3a3632" },
    }),
    el(label("EXPÉRIENCE", 284, 164, 17)),
    ...experiences(p, 284, 190, 470, 120, 16, 18).map(el),
    el(label("FORMATION", 284, 610, 24)),
    ...educations(p, 284, 636, 470, 25).map(el),
  ];
}

function creative(p: Profile, el: ReturnType<typeof builder>): CVElement[] {
  return [
    el({ type: "ellipse", x: 540, y: -80, w: 340, h: 340, z: 1, style: { backgroundColor: SIGNAL } }),
    el({ type: "rect", x: 0, y: 992, w: 794, h: 131, z: 2, style: { backgroundColor: INK } }),
    el({
      type: "heading",
      x: 36,
      y: 40,
      w: 490,
      h: 120,
      z: 4,
      bind: { kind: "name" },
      content: { text: p.name },
      style: { fontFamily: "Syne", fontSize: 52, fontWeight: 800, lineHeight: 0.92, color: INK },
    }),
    el({
      type: "text",
      x: 36,
      y: 172,
      w: 300,
      h: 36,
      z: 5,
      bind: { kind: "role" },
      content: { text: p.role },
      style: { fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: CREAM, backgroundColor: INK, borderRadius: 999, padding: 8 },
    }),
    el({
      type: "text",
      x: 36,
      y: 224,
      w: 460,
      h: 72,
      z: 6,
      bind: { kind: "summary" },
      content: { text: p.summary },
      style: { fontFamily: "Syne", fontSize: 14, fontWeight: 500, lineHeight: 1.4 },
    }),
    el({ type: "rule", x: 36, y: 312, w: 64, h: 4, z: 7, style: { backgroundColor: INK } }),
    el({
      type: "heading",
      x: 36,
      y: 332,
      w: 280,
      h: 28,
      z: 8,
      content: { text: "Expériences" },
      style: { fontFamily: "Syne", fontSize: 18, fontWeight: 700 },
    }),
    ...experiences(p, 36, 368, 460, 108, 10, 9, { fontFamily: "Source Sans 3" }).map(el),
    el(label("FORMATION", 36, 742, 16)),
    ...educations(p, 36, 766, 460, 17).map(el),
    el({ type: "rect", x: 524, y: 268, w: 234, h: 690, z: 3, style: { backgroundColor: "#f3efe6", borderRadius: 18 } }),
    el(label("CONTACT", 546, 292, 20)),
    el({ type: "contact", x: 546, y: 318, w: 192, h: 36, z: 21, bind: { kind: "contact", field: "email" }, content: { icon: "mail", text: p.email }, style: { fontSize: 12 } }),
    el({ type: "contact", x: 546, y: 358, w: 192, h: 28, z: 22, bind: { kind: "contact", field: "phone" }, content: { icon: "phone", text: p.phone }, style: { fontSize: 12 } }),
    el({ type: "contact", x: 546, y: 390, w: 192, h: 28, z: 23, bind: { kind: "contact", field: "location" }, content: { icon: "pin", text: p.location }, style: { fontSize: 12 } }),
    el({ type: "contact", x: 546, y: 422, w: 192, h: 36, z: 24, bind: { kind: "contact", field: "link" }, content: { icon: "link", text: p.link }, style: { fontSize: 12 } }),
    el(label("COMPÉTENCES", 546, 478, 25)),
    el({
      type: "skills",
      x: 546,
      y: 504,
      w: 192,
      h: 210,
      z: 26,
      bind: { kind: "skills" },
      content: { items: [...p.skills] },
      style: { fontSize: 12, color: INK },
    }),
    el(label("LANGUES", 546, 730, 27)),
    el({
      type: "meters",
      x: 546,
      y: 756,
      w: 192,
      h: 150,
      z: 28,
      bind: { kind: "languages" },
      content: { meters: p.languages.map((m) => ({ ...m })) },
      style: { fontSize: 12, color: INK },
    }),
    el({
      type: "text",
      x: 36,
      y: 1036,
      w: 500,
      h: 28,
      z: 30,
      content: { text: "Ouverte aux projets — " + p.location },
      style: { fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: CREAM },
    }),
  ];
}

function swiss(p: Profile, el: ReturnType<typeof builder>): CVElement[] {
  return [
    el({ type: "rect", x: 0, y: 0, w: 14, h: 1123, z: 1, style: { backgroundColor: SIGNAL } }),
    el({
      type: "heading",
      x: 44,
      y: 36,
      w: 710,
      h: 28,
      z: 2,
      bind: { kind: "name" },
      content: { text: p.name.toUpperCase() },
      style: { fontFamily: "Syne", fontSize: 20, fontWeight: 800, letterSpacing: 2.4 },
    }),
    el({
      type: "text",
      x: 44,
      y: 68,
      w: 400,
      h: 18,
      z: 3,
      bind: { kind: "role" },
      content: { text: p.role },
      style: { fontFamily: "JetBrains Mono", fontSize: 11, color: MUTE },
    }),
    el({ type: "rule", x: 36, y: 100, w: 722, h: 1, z: 4, style: { backgroundColor: HAIR } }),
    el({ type: "rule", x: 397, y: 100, w: 1, h: 980, z: 4, style: { backgroundColor: HAIR } }),
    el({
      type: "text",
      x: 40,
      y: 124,
      w: 330,
      h: 110,
      z: 5,
      bind: { kind: "summary" },
      content: { text: p.summary },
      style: { fontSize: 13, lineHeight: 1.5, color: "#2c2926" },
    }),
    el(label("CONTACT", 40, 252, 6)),
    el({ type: "contact", x: 40, y: 276, w: 330, h: 22, z: 7, bind: { kind: "contact", field: "email" }, content: { icon: "mail", text: p.email }, style: { fontSize: 12 } }),
    el({ type: "contact", x: 40, y: 302, w: 330, h: 22, z: 8, bind: { kind: "contact", field: "phone" }, content: { icon: "phone", text: p.phone }, style: { fontSize: 12 } }),
    el({ type: "contact", x: 40, y: 328, w: 330, h: 22, z: 9, bind: { kind: "contact", field: "location" }, content: { icon: "pin", text: p.location }, style: { fontSize: 12 } }),
    el({ type: "contact", x: 40, y: 354, w: 330, h: 22, z: 10, bind: { kind: "contact", field: "link" }, content: { icon: "link", text: p.link }, style: { fontSize: 12 } }),
    el(label("FORMATION", 40, 400, 11)),
    ...educations(p, 40, 424, 330, 12).map(el),
    el(label("COMPÉTENCES", 40, 540, 16)),
    el({
      type: "skills",
      x: 40,
      y: 564,
      w: 330,
      h: 150,
      z: 17,
      bind: { kind: "skills" },
      content: { items: [...p.skills] },
      style: { fontSize: 12, color: INK },
    }),
    el(label("LANGUES", 40, 732, 18)),
    el({
      type: "meters",
      x: 40,
      y: 756,
      w: 330,
      h: 140,
      z: 19,
      bind: { kind: "languages" },
      content: { meters: p.languages.map((m) => ({ ...m })) },
      style: { fontSize: 12, color: INK },
    }),
    el(label("EXPÉRIENCE", 424, 124, 20)),
    ...experiences(p, 424, 152, 330, 150, 18, 21).map(el),
  ];
}

function editorial(p: Profile, el: ReturnType<typeof builder>): CVElement[] {
  return [
    el({
      type: "heading",
      x: 40,
      y: 36,
      w: 714,
      h: 92,
      z: 1,
      bind: { kind: "name" },
      content: { text: p.name },
      style: { fontFamily: "Fraunces", fontSize: 60, fontWeight: 500, lineHeight: 0.9, letterSpacing: -1.2 },
    }),
    el({
      type: "text",
      x: 40,
      y: 140,
      w: 714,
      h: 20,
      z: 2,
      bind: { kind: "role" },
      content: { text: "—  " + p.role.toUpperCase() },
      style: { fontSize: 12, fontWeight: 700, letterSpacing: 2.6 },
    }),
    el({ type: "rule", x: 40, y: 176, w: 714, h: 1, z: 3, style: { backgroundColor: INK } }),
    el({
      type: "text",
      x: 40,
      y: 196,
      w: 380,
      h: 130,
      z: 4,
      bind: { kind: "summary" },
      content: { text: p.summary },
      style: { fontFamily: "Newsreader", fontSize: 16, italic: true, lineHeight: 1.55 },
    }),
    el({ type: "contact", x: 460, y: 200, w: 294, h: 22, z: 5, bind: { kind: "contact", field: "email" }, content: { icon: "mail", text: p.email }, style: { fontSize: 13 } }),
    el({ type: "contact", x: 460, y: 228, w: 294, h: 22, z: 6, bind: { kind: "contact", field: "phone" }, content: { icon: "phone", text: p.phone }, style: { fontSize: 13 } }),
    el({ type: "contact", x: 460, y: 256, w: 294, h: 22, z: 7, bind: { kind: "contact", field: "location" }, content: { icon: "pin", text: p.location }, style: { fontSize: 13 } }),
    el({ type: "contact", x: 460, y: 284, w: 294, h: 22, z: 8, bind: { kind: "contact", field: "link" }, content: { icon: "link", text: p.link }, style: { fontSize: 13 } }),
    el(label("EXPÉRIENCE", 40, 348, 9)),
    ...experiences(p, 40, 376, 714, 120, 12, 10, { fontFamily: "Newsreader", fontSize: 14 }).map(el),
    el(label("FORMATION", 40, 792, 16)),
    ...educations(p, 40, 816, 340, 17, { fontFamily: "Newsreader" }).map(el),
    el(label("COMPÉTENCES", 420, 792, 20)),
    el({
      type: "skills",
      x: 420,
      y: 816,
      w: 334,
      h: 90,
      z: 21,
      bind: { kind: "skills" },
      content: { items: [...p.skills] },
      style: { fontSize: 12, color: INK },
    }),
    el({
      type: "meters",
      x: 420,
      y: 916,
      w: 334,
      h: 110,
      z: 22,
      bind: { kind: "languages" },
      content: { meters: p.languages.map((m) => ({ ...m })) },
      style: { fontSize: 12, color: INK },
    }),
  ];
}

const BUILDERS: Record<TemplateId, (p: Profile, el: ReturnType<typeof builder>) => CVElement[]> = {
  modern,
  minimal,
  executive,
  creative,
  swiss,
  editorial,
};

export const TEMPLATES: { id: TemplateId; name: string; note: string }[] = [
  { id: "modern", name: "Modern", note: "Bandeau encre" },
  { id: "minimal", name: "Minimal", note: "Centré, serif" },
  { id: "executive", name: "Executive", note: "Colonne sombre" },
  { id: "creative", name: "Créatif", note: "Formes libres" },
  { id: "swiss", name: "Swiss", note: "Grille et rouge" },
  { id: "editorial", name: "Éditorial", note: "Magazine" },
];

export function buildTemplate(id: TemplateId, profile: Profile, prefix: string): CVElement[] {
  return BUILDERS[id](profile, builder(prefix));
}
