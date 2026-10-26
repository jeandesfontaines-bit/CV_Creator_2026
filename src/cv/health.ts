import type { Doc } from "@/cv/types";

export type HealthCheckItem = {
  id: string;
  label: string;
  passed: boolean;
  hint: string;
  actionText?: string;
};

export type CVHealth = {
  score: number;
  grade: "excellent" | "bon" | "moyen" | "incomplet";
  items: HealthCheckItem[];
  missingCount: number;
};

export function computeCVHealth(doc: Doc, activePageId: string): CVHealth {
  const page = doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0];
  const elements = page ? page.elements.filter((e) => !e.hidden) : [];
  const profile = doc.profile;

  // 1. Identity & Name
  const hasName =
    Boolean(profile.name && profile.name.trim().length > 3) ||
    elements.some((e) => e.type === "heading" && Boolean(e.content.text && e.content.text.trim().length > 3));

  // 2. Clear role/title
  const hasRole =
    Boolean(profile.role && profile.role.trim().length > 2) ||
    elements.some((e) => e.bind?.kind === "role" || (e.type === "text" && e.y < 160 && Boolean(e.content.text)));

  // 3. Contact (email and phone)
  const hasEmail =
    Boolean(profile.email && profile.email.includes("@")) ||
    elements.some((e) => e.type === "contact" && e.content.icon === "mail" && e.content.text?.includes("@"));
  const hasPhone =
    Boolean(profile.phone && profile.phone.replace(/\D/g, "").length >= 8) ||
    elements.some((e) => e.type === "contact" && e.content.icon === "phone");

  const contactOk = hasEmail && hasPhone;

  // 4. Summary / Bio accroche
  const hasSummary =
    Boolean(profile.summary && profile.summary.trim().length >= 35) ||
    elements.some((e) => e.type === "text" && (e.content.text?.length ?? 0) >= 40);

  // 5. At least 2 experiences with quantified details
  const expElements = elements.filter((e) => e.type === "experience");
  const expCount = Math.max(profile.experiences.length, expElements.length);
  const hasMinExp = expCount >= 2;

  // Check if experiences have rich metrics
  const hasDetailedExp =
    expElements.some((e) => Boolean(e.content.desc && (e.content.desc.includes("%") || e.content.desc.length > 80))) ||
    profile.experiences.some((e) => Boolean(e.desc && (e.desc.includes("%") || e.desc.length > 80)));

  // 6. Skills
  const skillsElement = elements.find((e) => e.type === "skills");
  const skillsCount = skillsElement?.content.items?.length ?? profile.skills.length;
  const hasSkills = skillsCount >= 3;

  // 7. Education
  const eduCount = elements.filter((e) => e.type === "education").length || profile.educations.length;
  const hasEducation = eduCount >= 1;

  // 8. Languages or levels
  const meterElements = elements.filter((e) => e.type === "meters");
  const hasLanguages = meterElements.length > 0 || profile.languages.length > 0;

  const items: HealthCheckItem[] = [
    {
      id: "name",
      label: "Nom & Prénom renseignés",
      passed: hasName,
      hint: "Le recruteur doit vous identifier dès les 3 premières secondes.",
      actionText: "Renseigner",
    },
    {
      id: "role",
      label: "Intitulé de poste précis",
      passed: hasRole,
      hint: "Un titre clair (ex: 'Product Designer Senior' plutôt que juste 'Designer').",
      actionText: "Ajouter un titre",
    },
    {
      id: "contact",
      label: "Coordonnées de contact (Email + Tél)",
      passed: contactOk,
      hint: "Email professionnel et numéro de téléphone mobile indispensables.",
      actionText: "Compléter contact",
    },
    {
      id: "summary",
      label: "Bio / Accroche professionnelle",
      passed: hasSummary,
      hint: "2 à 3 phrases percutantes résumant vos forces et votre valeur ajoutée.",
      actionText: "Rédiger l'accroche",
    },
    {
      id: "experiences",
      label: "Au moins 2 expériences avec réalisations",
      passed: hasMinExp,
      hint: "Structurez avec poste, entreprise, dates et missions concrètes.",
      actionText: "Ajouter un poste",
    },
    {
      id: "metrics",
      label: "Puces de résultats chiffrés (+20%, 500k€)",
      passed: hasDetailedExp,
      hint: "Les chiffres attirent l'œil et prouvent l'impact réel de vos actions.",
      actionText: "✨ Chiffrer avec l'IA",
    },
    {
      id: "skills",
      label: "Compétences clés (au moins 3)",
      passed: hasSkills,
      hint: "Mots-clés recherchés par les recruteurs et les algorithmes ATS.",
      actionText: "Ajouter des skills",
    },
    {
      id: "education",
      label: "Formation ou diplôme",
      passed: hasEducation,
      hint: "Mentionnez votre niveau d'études ou vos certifications.",
      actionText: "Ajouter formation",
    },
    {
      id: "languages",
      label: "Langues ou niveaux de compétences",
      passed: hasLanguages,
      hint: "Indiquez votre niveau en langues étrangères (ex: Anglais C1).",
      actionText: "Ajouter langues",
    },
  ];

  const passedCount = items.filter((i) => i.passed).length;
  const score = Math.round((passedCount / items.length) * 100);

  let grade: CVHealth["grade"] = "incomplet";
  if (score >= 90) grade = "excellent";
  else if (score >= 70) grade = "bon";
  else if (score >= 45) grade = "moyen";

  return {
    score,
    grade,
    items,
    missingCount: items.length - passedCount,
  };
}
