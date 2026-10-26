import type { Profile } from "@/cv/types";

export type JobPresetId =
  | "developer"
  | "sales"
  | "marketing"
  | "hr"
  | "designer"
  | "nurse"
  | "data"
  | "finance";

export type JobPreset = {
  id: JobPresetId;
  label: string;
  category: string;
  badge: string;
  profile: Profile;
};

export const JOB_PRESETS: JobPreset[] = [
  {
    id: "developer",
    label: "Développeur Fullstack",
    category: "Tech & Dev",
    badge: "Tech Lead / Cloud",
    profile: {
      name: "Thomas Bernard",
      role: "Lead Développeur Fullstack",
      email: "thomas.bernard@dev.io",
      phone: "+33 6 98 76 54 32",
      location: "Nantes / Télétravail",
      link: "github.com/thomas-dev",
      summary:
        "Ingénieur logiciel senior passionné par les architectures réactives, la haute disponibilité et le clean code. 7 ans d'expérience sur l'écosystème React, TypeScript, Node.js et Cloud AWS. Habitué aux environnements CI/CD à fort trafic.",
      experiences: [
        {
          role: "Tech Lead Fullstack",
          company: "Scalr Tech — Nantes",
          date: "2021 — Aujourd'hui",
          desc: "• Architecture et déploiement d'une plateforme microservices traitant 1,5M+ requêtes/jour.\n• Migration de l'application monolithique vers Next.js et Docker, réduisant les temps de chargement de 42%.\n• Encadrement et mentorat d'une équipe de 8 ingénieurs frontend et backend.",
        },
        {
          role: "Développeur Senior Frontend & API",
          company: "FinPay — Paris",
          date: "2018 — 2021",
          desc: "• Conception du dashboard bancaire en React/TypeScript avec 99,9% de conformité aux Core Web Vitals.\n• Optimisation de la consommation API GraphQL divisant le temps de latence p99 par 3.\n• Mise en place des suites de tests automatisés (Jest, Playwright) atteignant 88% de couverture.",
        },
        {
          role: "Développeur Web & Mobile",
          company: "Atelier Numérique — Rennes",
          date: "2016 — 2018",
          desc: "• Développement de 14 applications web et hybrides pour des clients grands comptes du secteur retail.\n• Intégration de passerelles de paiement Stripe et gestion d'authentification OAuth 2.0 sécurisée.",
        },
      ],
      educations: [
        { degree: "Diplôme d'Ingénieur Informatique (Bac+5)", school: "INSA Rennes", date: "2013 — 2016" },
        { degree: "DUT Informatique", school: "IUT de Nantes", date: "2011 — 2013" },
      ],
      skills: ["React & Next.js", "TypeScript", "Node.js & NestJS", "PostgreSQL", "Docker & Kubernetes", "AWS & Cloud", "GraphQL & REST", "CI/CD & DevOps"],
      languages: [
        { label: "Français (Langue maternelle)", value: 100 },
        { label: "Anglais (Bilingue technique C1)", value: 95 },
        { label: "Espagnol (Intermédiaire B1)", value: 65 },
      ],
    },
  },
  {
    id: "sales",
    label: "Commercial B2B / Sales",
    category: "Vente & Conseil",
    badge: "Grands Comptes / ARR",
    profile: {
      name: "Maxime Robert",
      role: "Senior Account Executive B2B",
      email: "maxime.robert@sales-exec.fr",
      phone: "+33 6 22 33 44 55",
      location: "Lyon, France",
      link: "linkedin.com/in/maxime-robert-sales",
      summary:
        "Commercial grand compte avec 7 ans d'expérience dans la vente de solutions logicielles complexes en cycle long. Dépassement moyen de quota de 128% sur 3 années consécutives. Expert en négociation C-Level et closing de contrats stratégiques.",
      experiences: [
        {
          role: "Senior Account Executive",
          company: "CloudSecure — Lyon",
          date: "2021 — Aujourd'hui",
          desc: "• Signature de 22 contrats grands comptes CAC 40 / SBF 120 générant 1,8M€ de nouvel ARR.\n• Dépassement annuel d'objectif à 132% en moyenne grâce à une qualification rigoureuse MEDDIC.\n• Pilotage d'appels d'offres stratégiques en coordination avec les équipes avant-vente et juridiques.",
        },
        {
          role: "Business Developer Grands Comptes",
          company: "Nexity Solutions — Paris",
          date: "2018 — 2021",
          desc: "• Prospection outbound multicanale (Cold outreach, Social selling) générant 75 opportunités qualifiées/trimestre.\n• Négociation et renouvellement d'un portefeuille de 40 comptes clients clés représentant 900k€ de CA.\n• Animation d'ateliers de co-conception de solutions pour accélérer la prise de décision client.",
        },
      ],
      educations: [
        { degree: "Master 2 Management Commercial & Négociation", school: "EM Lyon Business School", date: "2015 — 2017" },
        { degree: "Licence Économie & Gestion", school: "Université Lyon 3", date: "2012 — 2015" },
      ],
      skills: ["Négociation C-Level", "Méthodologie MEDDIC", "Salesforce & Hubspot", "Prospection Outbound", "Closing Grands Comptes", "Account-Based Marketing"],
      languages: [
        { label: "Français (Natif)", value: 100 },
        { label: "Anglais (Courant affaires C1)", value: 90 },
      ],
    },
  },
  {
    id: "marketing",
    label: "Chef de Projet Marketing & Growth",
    category: "Marketing & Comm",
    badge: "Acquisition & Data",
    profile: {
      name: "Camille Laurent",
      role: "Growth Marketing Manager",
      email: "camille.laurent@growth-consulting.fr",
      phone: "+33 6 45 12 78 90",
      location: "Bordeaux, France",
      link: "linkedin.com/in/camille-growth",
      summary:
        "Experte en stratégie d'acquisition, rétention et marketing omnicanal. Culture rigoureusement ROIste et data-driven avec historique de croissance x3 sur 2 scale-ups B2B. Maîtrise des leviers SEO, SEA, CRM automation et analytics.",
      experiences: [
        {
          role: "Head of Growth & Acquisition",
          company: "SaaS Booster — Bordeaux",
          date: "2022 — Aujourd'hui",
          desc: "• Gestion d'un budget marketing de 75k€/mois avec réduction du CAC de 35% en 18 mois.\n• Génération de plus de 500 Leads MQLs qualifiés par mois via des tunnels de conversion optimisés.\n• Déploiement de campagnes publicitaires automatisées (Google Ads, Meta, LinkedIn Ads) affichant un ROAS de 4,2.",
        },
        {
          role: "Growth Marketer & Inbound Specialist",
          company: "Agence Pulse — Paris",
          date: "2019 — 2022",
          desc: "• Mise en place d'une stratégie SEO de fond propulsant le trafic organique de 15k à 120k visites/mois.\n• Scénarisation de workflows de lead nurturing sur HubSpot augmentant le taux de conversion démo de 22%.\n• Conduite de 40+ tests A/B sur les landing pages pour maximiser la rétention.",
        },
      ],
      educations: [
        { degree: "Master Marketing Digital & E-Business", school: "KEDGE Business School", date: "2017 — 2019" },
        { degree: "Bachelor Communication Globale", school: "EFAP Paris", date: "2014 — 2017" },
      ],
      skills: ["Google Ads & Meta Ads", "SEO & Copywriting", "HubSpot & Klaviyo", "Google Analytics 4", "A/B Testing", "Marketing Automation", "Data Studio"],
      languages: [
        { label: "Français (Langue maternelle)", value: 100 },
        { label: "Anglais (Bilingue C2)", value: 95 },
        { label: "Espagnol (Opérationnel B2)", value: 75 },
      ],
    },
  },
  {
    id: "hr",
    label: "Assistant(e) RH & Talent Acquisition",
    category: "Ressources Humaines",
    badge: "Recrutement & Marque",
    profile: {
      name: "Élodie Mercier",
      role: "Responsable Ressources Humaines",
      email: "elodie.mercier@rh-conseil.fr",
      phone: "+33 6 11 22 33 44",
      location: "Toulouse, France",
      link: "linkedin.com/in/elodie-mercier-rh",
      summary:
        "Professionnelle des RH avec 6 ans d'expérience dans l'accompagnement des équipes et le recrutement de profils pénuriques. Spécialisée en marque employeur, onboarding, gestion des talents et relations sociales.",
      experiences: [
        {
          role: "Talent Acquisition & HRBP",
          company: "AeroTech Solutions — Toulouse",
          date: "2021 — Aujourd'hui",
          desc: "• Pilotage de 45 recrutements stratégiques par an (ingénieurs, managers, fonctions support).\n• Réduction du délai moyen de recrutement de 58 à 36 jours grâce à la refonte du vivier candidat.\n• Déploiement d'un programme d'onboarding complet réduisant le turnover de la première année de 28%.",
        },
        {
          role: "Chargée de Missions RH",
          company: "Groupe Santé Plus — Montpellier",
          date: "2018 — 2021",
          desc: "• Gestion administrative et contractuelle de 230 collaborateurs (DPAE, contrats, avenants, paie).\n• Élaboration et suivi du plan de développement des compétences (budget 180k€/an).\n• Co-animation des réunions CSE et veille juridique en droit du travail.",
        },
      ],
      educations: [
        { degree: "Master 2 Gestion des Ressources Humaines & Droit Social", school: "IAE Toulouse", date: "2016 — 2018" },
        { degree: "Licence Administration Économique & Sociale", school: "Université de Montpellier", date: "2013 — 2016" },
      ],
      skills: ["Sourcing & Entretiens", "Droit Social & CSE", "SIRH & Outils ATS", "Marque Employeur", "Gestion des Carrières", "Plan de Formation"],
      languages: [
        { label: "Français (Langue maternelle)", value: 100 },
        { label: "Anglais (Professionnel B2)", value: 80 },
      ],
    },
  },
  {
    id: "designer",
    label: "Product Designer Senior",
    category: "Design & UX/UI",
    badge: "Design System & UX",
    profile: {
      name: "Alexandra Dubois",
      role: "Lead Product Designer",
      email: "alexandra.dubois@design.fr",
      phone: "+33 6 12 34 56 78",
      location: "Paris, France",
      link: "linkedin.com/in/alexandra-design",
      summary:
        "Designer produit avec 8 ans d'expérience dans la création d'interfaces intuitives et de design systems pérennes. Recherche utilisateur approfondie, prototypage haute fidélité et collaboration étroite avec les ingénieurs.",
      experiences: [
        {
          role: "Lead Product Designer",
          company: "Mira Studio — Paris",
          date: "2021 — Aujourd'hui",
          desc: "• Direction d'une équipe de 6 designers et refonte de la suite SaaS (+34% de rétention mensuelle).\n• Création et gouvernance du Design System multi-marques adopté par 40+ développeurs.\n• Animation d'ateliers de co-conception UX et restitution de tests d'utilisabilité auprès du Comex.",
        },
        {
          role: "Senior UX/UI Designer",
          company: "Atelier Noir — Lyon",
          date: "2018 — 2021",
          desc: "• Conduite de 14 missions de refonte complète d'applications web et mobiles d'envergure.\n• Augmentation du score SUS (System Usability Scale) moyen de 62 à 84 sur les parcours clés.\n• Prototypage interactif sous Figma et spécifications fonctionnelles détaillées.",
        },
      ],
      educations: [
        { degree: "Master Design d'Interaction & UX", school: "ENSAD Paris", date: "2013 — 2015" },
        { degree: "Bachelor Arts Appliqués", school: "École Boulle", date: "2010 — 2013" },
      ],
      skills: ["Figma & Tokens", "Design System", "Recherche Utilisateur", "Prototypage HD", "Architecture de l'info", "Design Sprint", "HTML/CSS"],
      languages: [
        { label: "Français (Natif)", value: 100 },
        { label: "Anglais (Bilingue C1)", value: 92 },
      ],
    },
  },
  {
    id: "nurse",
    label: "Infirmier / Cadre de Santé",
    category: "Santé & Médical",
    badge: "Coordination & Soins",
    profile: {
      name: "Julien Moreau",
      role: "Infirmier Diplômé d'État & Coordinateur",
      email: "julien.moreau.ide@sante.fr",
      phone: "+33 6 77 88 99 00",
      location: "Lille, France",
      link: "linkedin.com/in/julien-moreau-sante",
      summary:
        "Infirmier expérimenté avec 8 ans d'exercice en milieu hospitalier et services d'urgences. Spécialisé dans la coordination des parcours de soins, la gestion des situations de crise et l'application stricte des protocoles HAS.",
      experiences: [
        {
          role: "Infirmier Coordinateur de Soins (IDEC)",
          company: "Centre Hospitalier Régional — Lille",
          date: "2020 — Aujourd'hui",
          desc: "• Coordination quotidienne d'une équipe pluridisciplinaire de 16 soignants et aides-soignants.\n• Optimisation du circuit du médicament et mise en conformité des protocoles de traçabilité HAS (0 non-conformité).\n• Accueil et accompagnement personnalisé de 35 patients par jour en unité de soins intensifs.",
        },
        {
          role: "Infirmier en Service d'Urgences",
          company: "Hôpital Saint-Vincent — Valenciennes",
          date: "2016 — 2020",
          desc: "• Prise en charge des urgences vitales, tri selon la grille de Glasgow et gestes de réanimation.\n• Collaboration étroite avec les médecins urgentistes et encadrement des étudiants infirmiers stagiaires.\n• Gestion du stress et communication bienveillante auprès des familles en situation d'angoisse.",
        },
      ],
      educations: [
        { degree: "Diplôme d'État d'Infirmier (IDE)", school: "IFSI CHU Lille", date: "2013 — 2016" },
        { degree: "Certification AFGSU Niveau 2 (Gestes d'Urgences)", school: "CESU 59", date: "2022" },
      ],
      skills: ["Soins d'Urgences & Réanimation", "Coordination Pluridisciplinaire", "Protocoles HAS & Hygiène", "Gestion des Risques", "Écoute & Relation d'Aide"],
      languages: [
        { label: "Français (Langue maternelle)", value: 100 },
        { label: "Anglais médical (Opérationnel)", value: 75 },
      ],
    },
  },
  {
    id: "data",
    label: "Data Engineer / Analyst",
    category: "Data & IA",
    badge: "BigQuery / Pipelines",
    profile: {
      name: "Antoine Lefebvre",
      role: "Senior Data Analyst & Analytics Engineer",
      email: "antoine.lefebvre@data-analytics.fr",
      phone: "+33 6 55 66 77 88",
      location: "Strasbourg / Remote",
      link: "github.com/antoine-data",
      summary:
        "Spécialiste de la valorisation de données avec 6 ans d'expérience dans la construction de pipelines de données fiables et de tableaux de bord décisionnels pour la direction générale. Expert SQL, dbt, Python et BigQuery.",
      experiences: [
        {
          role: "Lead Analytics Engineer",
          company: "DataMetrics Group — Strasbourg",
          date: "2021 — Aujourd'hui",
          desc: "• Modélisation et industrialisation du data warehouse sous Snowflake et dbt (+120 tables nettoyées).\n• Création de tableaux de bord C-Level sous Tableau réduisant le temps de reporting financier de 4 jours à 20 minutes.\n• Mise en place de règles de data governance et data quality assurant 99,5% de précision des métriques.",
        },
        {
          role: "Data Analyst Business Intelligence",
          company: "Retail Analytics — Mulhouse",
          date: "2018 — 2021",
          desc: "• Analyse comportementale client sur une base de 2M d'utilisateurs et segmentation RFM.\n• Détection de gisements de croissance ayant permis d'augmenter le panier moyen de 14%.\n• Automatisation des flux d'extraction ETL avec Python et Airflow.",
        },
      ],
      educations: [
        { degree: "Master 2 Économétrie & Big Data", school: "Université de Strasbourg", date: "2016 — 2018" },
        { degree: "Licence Mathématiques Appliquées & Informatique", school: "Université de Lorraine", date: "2013 — 2016" },
      ],
      skills: ["SQL Avancé & dbt", "Python (Pandas, Polars)", "Snowflake & BigQuery", "Power BI & Tableau", "ETL & Airflow", "Data Modeling"],
      languages: [
        { label: "Français (Natif)", value: 100 },
        { label: "Anglais (Technique professionnel C1)", value: 90 },
      ],
    },
  },
  {
    id: "finance",
    label: "Contrôleur de Gestion / Finance",
    category: "Finance & Audit",
    badge: "Budgets / 15M€",
    profile: {
      name: "Sophie Bertrand",
      role: "Responsable Contrôle de Gestion",
      email: "sophie.bertrand@finance-corp.fr",
      phone: "+33 6 33 44 55 66",
      location: "Marseille, France",
      link: "linkedin.com/in/sophie-bertrand-finance",
      summary:
        "Contrôleuse de gestion avec 8 ans d'expérience en environnement international. Pilotage du cycle budgétaire, modélisation financière, clôtures mensuelles et optimisation de la rentabilité opérationnelle (EBITDA).",
      experiences: [
        {
          role: "Responsable Contrôle de Gestion Opérationnel",
          company: "Méditerranée Industrie — Marseille",
          date: "2020 — Aujourd'hui",
          desc: "• Pilotage du budget annuel de 18M€ et coordination des clôtures mensuelles sous 4 jours ouvrés.\n• Identification de leviers d'économies d'achats ayant généré une réduction des coûts fixes de 7,5% (650k€/an).\n• Présentation mensuelle des écarts budgétaires et KPIs au Conseil d'Administration.",
        },
        {
          role: "Contrôleuse de Gestion Junior & Audit",
          company: "Cabinet KPMG — Aix-en-Provence",
          date: "2016 — 2020",
          desc: "• Missions d'audit financier et de contrôle interne auprès de 25 PME et ETI régionales.\n• Construction de modèles financiers prévisionnels et business plans sur 3 ans sous Excel avancé.",
        },
      ],
      educations: [
        { degree: "Master 2 Finance d'Entreprise & Contrôle de Gestion", school: "IAE Aix-Marseille", date: "2014 — 2016" },
        { degree: "Licence Sciences Économiques", school: "Université d'Aix", date: "2011 — 2014" },
      ],
      skills: ["Contrôle Budgétaire & P&L", "Clôtures Mensuelles & Fast Close", "Excel Avancé & Modélisation", "SAP & ERP Finance", "Analyse des Écarts", "Cash Flow"],
      languages: [
        { label: "Français (Natif)", value: 100 },
        { label: "Anglais (Courant financier C1)", value: 88 },
      ],
    },
  },
];

export const BOOST_PRESETS = [
  {
    category: "Impact & Résultats chiffrés",
    tone: "impact",
    options: [
      "Pilotage stratégique des activités opérationnelles avec dépassement moyen des objectifs annuels de +24%.",
      "Développement du chiffre d'affaires et closing de 18 comptes stratégiques générant +42% de croissance.",
      "Optimisation globale des processus métiers ayant permis de réduire les coûts opérationnels de 18%.",
      "Conception et déploiement d'une solution à fort impact réduisant les délais d'exécution de 35%.",
    ],
  },
  {
    category: "Leadership & Management",
    tone: "leadership",
    options: [
      "Management bienveillant et coordination d'une équipe pluridisciplinaire de 8 collaborateurs en environnement agile.",
      "Animation des rituels stratégiques, définition de la roadmap trimestrielle et alignement des parties prenantes.",
      "Accompagnement du changement et formation continue des équipes favorisant la cohésion et la performance collective.",
    ],
  },
  {
    category: "Excellence Opérationnelle",
    tone: "quality",
    options: [
      "Mise en place d'une méthodologie rigoureuse garantissant 99,8% de conformité et zéro non-qualité sur les livrables.",
      "Refonte complète des flux de travail et automatisation des tâches chronophages libérant 15h de productivité/semaine.",
      "Gestion rigoureuse du budget et négociation partenariale avec sécurisation des marges opérationnelles.",
    ],
  },
];

export function getRandomBoost(): string {
  const all = BOOST_PRESETS.flatMap((p) => p.options);
  return all[Math.floor(Math.random() * all.length)];
}
