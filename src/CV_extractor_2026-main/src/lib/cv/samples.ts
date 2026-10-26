export interface SampleCv { id: string; title: string; note: string; filename: string; text: string; }

// Synthetic fixtures, not the user's uploaded CVs.
export const SAMPLES: SampleCv[] = [
  { id: 'fr-demo', title: 'French fixture', note: 'Synthetic CV for smoke tests', filename: 'demo-fr.txt', text: `Nom : Camille Laurent
Poste recherché : Développeuse fullstack
camille@example.com
+33 6 18 42 77 05
Paris

EXPÉRIENCE PROFESSIONNELLE
Développeuse fullstack
Atelier Numérique SAS · Paris
janvier 2021 – aujourd'hui
- Conception d'une plateforme de suivi de dossiers.
- Maintenance de services TypeScript.

FORMATION
Master Informatique
Université de Lille
2016 – 2018

COMPÉTENCES
Langages : TypeScript, Python, SQL

LANGUES
Français : langue maternelle
Anglais : C1
` },
  { id: 'en-demo', title: 'English fixture', note: 'Synthetic CV for smoke tests', filename: 'demo-en.txt', text: `Name: Jordan Ellis
Desired role: Product designer
jordan@example.com

EXPERIENCE
Product Designer
Northwind Labs Inc
March 2022 – Present
- Built a component library.

EDUCATION
BFA Graphic Design
Rhode Island School of Design
2015 - 2019

LANGUAGES
English — Native
French — Professional working proficiency
` }
];
