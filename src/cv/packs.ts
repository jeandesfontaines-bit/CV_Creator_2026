import { uid } from "@/cv/geometry";
import type { CVElement } from "@/cv/types";
import { baseStyle, INK, MUTE, PAGE_H } from "@/cv/types";

export type SectionPackId =
  | "pack-experience"
  | "pack-education"
  | "pack-skills"
  | "pack-languages"
  | "pack-interests"
  | "pack-contact";

export type SectionPack = {
  id: SectionPackId;
  name: string;
  desc: string;
  icon: string;
  createElements: (startY: number, maxZ: number) => { elements: CVElement[]; nextY: number };
};

export const SECTION_PACKS: SectionPack[] = [
  {
    id: "pack-experience",
    name: "Expérience avec réalisations chiffrées",
    desc: "Poste, entreprise, dates et 3 réalisations d'impact avec métriques",
    icon: "💼",
    createElements: (startY: number, maxZ: number) => {
      const y = Math.min(PAGE_H - 140, startY);
      const elements: CVElement[] = [
        {
          id: uid(),
          type: "experience",
          x: 40,
          y,
          w: 714,
          h: 116,
          rotation: 0,
          z: maxZ + 1,
          locked: false,
          hidden: false,
          content: {
            role: "Chef de Projet Senior / Lead",
            company: "Entreprise Innovante — Paris / Hybride",
            date: "2022 — Présent",
            desc: "• Pilotage stratégique et livraison de 12 projets majeurs avec respect strict des délais et budgets (+28% de satisfaction client).\n• Coordination d'une équipe transverse de 7 collaborateurs et optimisation des processus opérationnels (-30% de temps de cycle).\n• Présentation des bilans d'avancement et KPIs d'impact directement auprès de la direction générale.",
          },
          style: baseStyle({
            fontFamily: "Source Sans 3",
            fontSize: 13,
            lineHeight: 1.45,
            color: INK,
          }),
        },
      ];
      return { elements, nextY: y + 128 };
    },
  },
  {
    id: "pack-education",
    name: "Formation & Diplôme certifié",
    desc: "Diplôme, école de renom, dates et mention d'excellence",
    icon: "🎓",
    createElements: (startY: number, maxZ: number) => {
      const y = Math.min(PAGE_H - 80, startY);
      const elements: CVElement[] = [
        {
          id: uid(),
          type: "education",
          x: 40,
          y,
          w: 714,
          h: 52,
          rotation: 0,
          z: maxZ + 1,
          locked: false,
          hidden: false,
          content: {
            degree: "Master 2 Management & Stratégie d'Entreprise (Mention Très Bien)",
            school: "Université Paris-Dauphine / Grande École",
            date: "2018 — 2020",
          },
          style: baseStyle({
            fontFamily: "Source Sans 3",
            fontSize: 13,
            color: INK,
          }),
        },
      ];
      return { elements, nextY: y + 64 };
    },
  },
  {
    id: "pack-skills",
    name: "Compétences clés en Tags stylisés",
    desc: "Bloc de compétences techniques et managériales prêtes à l'emploi",
    icon: "🏷️",
    createElements: (startY: number, maxZ: number) => {
      const y = Math.min(PAGE_H - 90, startY);
      const elements: CVElement[] = [
        {
          id: uid(),
          type: "heading",
          x: 40,
          y,
          w: 240,
          h: 18,
          rotation: 0,
          z: maxZ + 1,
          locked: false,
          hidden: false,
          content: { text: "COMPÉTENCES CLÉS" },
          style: baseStyle({
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.8,
            color: INK,
          }),
        },
        {
          id: uid(),
          type: "skills",
          x: 40,
          y: y + 24,
          w: 714,
          h: 52,
          rotation: 0,
          z: maxZ + 2,
          locked: false,
          hidden: false,
          content: {
            items: [
              "Gestion de projet Agile",
              "Leadership d'équipe",
              "Négociation & Closing",
              "Data & Reporting KPIs",
              "Communication transverse",
              "Stratégie de croissance",
            ],
          },
          style: baseStyle({
            fontSize: 12,
            color: INK,
          }),
        },
      ];
      return { elements, nextY: y + 88 };
    },
  },
  {
    id: "pack-languages",
    name: "Langues avec niveaux visuels",
    desc: "Barres de progression élégantes pour les langues maîtrisées",
    icon: "🌐",
    createElements: (startY: number, maxZ: number) => {
      const y = Math.min(PAGE_H - 100, startY);
      const elements: CVElement[] = [
        {
          id: uid(),
          type: "heading",
          x: 40,
          y,
          w: 240,
          h: 18,
          rotation: 0,
          z: maxZ + 1,
          locked: false,
          hidden: false,
          content: { text: "LANGUES" },
          style: baseStyle({
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.8,
            color: INK,
          }),
        },
        {
          id: uid(),
          type: "meters",
          x: 40,
          y: y + 24,
          w: 714,
          h: 60,
          rotation: 0,
          z: maxZ + 2,
          locked: false,
          hidden: false,
          content: {
            meters: [
              { label: "Français (Langue maternelle)", value: 100 },
              { label: "Anglais (Professionnel courant C1)", value: 90 },
              { label: "Espagnol (Opérationnel B2)", value: 70 },
            ],
          },
          style: baseStyle({
            fontSize: 12,
            color: INK,
          }),
        },
      ];
      return { elements, nextY: y + 96 };
    },
  },
  {
    id: "pack-interests",
    name: "Loisirs & Centres d'intérêt",
    desc: "Badges valorisants (sport, culture, engagement associatif)",
    icon: "🏃",
    createElements: (startY: number, maxZ: number) => {
      const y = Math.min(PAGE_H - 80, startY);
      const elements: CVElement[] = [
        {
          id: uid(),
          type: "heading",
          x: 40,
          y,
          w: 240,
          h: 18,
          rotation: 0,
          z: maxZ + 1,
          locked: false,
          hidden: false,
          content: { text: "CENTRES D'INTÉRÊT" },
          style: baseStyle({
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.8,
            color: INK,
          }),
        },
        {
          id: uid(),
          type: "skills",
          x: 40,
          y: y + 24,
          w: 714,
          h: 46,
          rotation: 0,
          z: maxZ + 2,
          locked: false,
          hidden: false,
          content: {
            items: [
              "🏃 Marathon & Semi-marathon",
              "📚 Économie & Essais contemporains",
              "🌍 Photographie de voyage & Randonnée",
              "🤝 Bénévolat associatif",
            ],
          },
          style: baseStyle({
            fontSize: 12,
            color: INK,
          }),
        },
      ];
      return { elements, nextY: y + 80 };
    },
  },
  {
    id: "pack-contact",
    name: "En-tête de Contact Pro complet",
    desc: "Rangée d'icônes Email, Tél, Ville et Réseau professionnel",
    icon: "✉️",
    createElements: (startY: number, maxZ: number) => {
      const y = Math.min(PAGE_H - 50, startY);
      const elements: CVElement[] = [
        {
          id: uid(),
          type: "contact",
          x: 40,
          y,
          w: 230,
          h: 22,
          rotation: 0,
          z: maxZ + 1,
          locked: false,
          hidden: false,
          content: { icon: "mail", text: "prenom.nom@email.com" },
          style: baseStyle({ fontSize: 12, color: MUTE }),
        },
        {
          id: uid(),
          type: "contact",
          x: 280,
          y,
          w: 180,
          h: 22,
          rotation: 0,
          z: maxZ + 2,
          locked: false,
          hidden: false,
          content: { icon: "phone", text: "+33 6 12 34 56 78" },
          style: baseStyle({ fontSize: 12, color: MUTE }),
        },
        {
          id: uid(),
          type: "contact",
          x: 470,
          y,
          w: 160,
          h: 22,
          rotation: 0,
          z: maxZ + 3,
          locked: false,
          hidden: false,
          content: { icon: "pin", text: "Paris, France" },
          style: baseStyle({ fontSize: 12, color: MUTE }),
        },
      ];
      return { elements, nextY: y + 36 };
    },
  },
];
