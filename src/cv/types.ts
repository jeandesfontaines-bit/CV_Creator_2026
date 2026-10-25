export const PAGE_W = 794;
export const PAGE_H = 1123;
export const MARGIN = 36;
export const GRID = 8;

export const INK = "#141311";
export const CREAM = "#f6f3ec";
export const MUTE = "#5e5952";
export const SIGNAL = "#d6372a";
export const SHEET = "#fffdf8";
export const HAIR = "#e4e0d8";

export type TemplateId = "modern" | "minimal" | "executive" | "creative" | "swiss" | "editorial";

export type ContactIcon = "mail" | "phone" | "pin" | "link";

export type ElType =
  | "heading"
  | "text"
  | "experience"
  | "education"
  | "skills"
  | "meters"
  | "photo"
  | "rect"
  | "ellipse"
  | "rule"
  | "contact";

export type Experience = {
  role: string;
  company: string;
  date: string;
  desc: string;
};

export type Education = {
  degree: string;
  school: string;
  date: string;
};

export type Meter = {
  label: string;
  value: number;
};

export type Profile = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  link: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  languages: Meter[];
};

export type IdentityField = "name" | "role" | "email" | "phone" | "location" | "link" | "summary";

export type Bind =
  | { kind: "name" }
  | { kind: "role" }
  | { kind: "summary" }
  | { kind: "contact"; field: "email" | "phone" | "location" | "link" }
  | { kind: "experience"; index: number }
  | { kind: "education"; index: number }
  | { kind: "skills" }
  | { kind: "languages" };

export type Content = {
  text?: string;
  role?: string;
  company?: string;
  date?: string;
  desc?: string;
  degree?: string;
  school?: string;
  items?: string[];
  meters?: Meter[];
  src?: string;
  icon?: ContactIcon;
};

export type ElStyle = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  italic: boolean;
  color: string;
  textAlign: "left" | "center" | "right";
  lineHeight: number;
  letterSpacing: number;
  backgroundColor: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  opacity: number;
  padding: number;
};

export type CVElement = {
  id: string;
  type: ElType;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  z: number;
  locked: boolean;
  hidden: boolean;
  bind?: Bind;
  content: Content;
  style: ElStyle;
};

export type Page = {
  id: string;
  name: string;
  background: string;
  elements: CVElement[];
};

export type Doc = {
  profile: Profile;
  pages: Page[];
};

export type Handle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

export type Box = { x: number; y: number; w: number; h: number };

export const FONTS = [
  "Source Sans 3",
  "Fraunces",
  "Newsreader",
  "Syne",
  "Space Grotesk",
  "Outfit",
  "JetBrains Mono",
] as const;

export const FONT_STACK: Record<string, string> = {
  "Source Sans 3": '"Source Sans 3", ui-sans-serif, sans-serif',
  Fraunces: 'Fraunces, Georgia, "Times New Roman", serif',
  Newsreader: 'Newsreader, Georgia, serif',
  Syne: 'Syne, "Source Sans 3", ui-sans-serif, sans-serif',
  "Space Grotesk": '"Space Grotesk", ui-sans-serif, sans-serif',
  Outfit: "Outfit, ui-sans-serif, sans-serif",
  "JetBrains Mono": '"JetBrains Mono", ui-monospace, monospace',
};

export const TYPE_LABEL: Record<ElType, string> = {
  heading: "Titre",
  text: "Texte",
  experience: "Expérience",
  education: "Formation",
  skills: "Compétences",
  meters: "Niveaux",
  photo: "Photo",
  rect: "Rectangle",
  ellipse: "Ellipse",
  rule: "Trait",
  contact: "Contact",
};

export function baseStyle(over: Partial<ElStyle> = {}): ElStyle {
  return {
    fontFamily: "Source Sans 3",
    fontSize: 13,
    fontWeight: 400,
    italic: false,
    color: INK,
    textAlign: "left",
    lineHeight: 1.45,
    letterSpacing: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: INK,
    opacity: 1,
    padding: 0,
    ...over,
  };
}

export function snippet(el: CVElement): string {
  const c = el.content;
  if (el.type === "heading" || el.type === "text" || el.type === "contact") return c.text || TYPE_LABEL[el.type];
  if (el.type === "experience") return c.role || "Expérience";
  if (el.type === "education") return c.degree || "Formation";
  if (el.type === "skills") return c.items?.[0] || "Compétences";
  if (el.type === "meters") return c.meters?.[0]?.label || "Niveaux";
  return TYPE_LABEL[el.type];
}

export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
