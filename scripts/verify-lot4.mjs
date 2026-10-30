import { chromium } from "playwright";

const BASE_URL = "http://127.0.0.1:8080";

/**
 * Builds a minimal valid uncompressed ZIP buffer containing `word/document.xml`
 * so mammoth / extractDocxXml can extract the structured DOCX text.
 */
function createMinimalDocxBuffer(paragraphs) {
  const xmlBody = paragraphs
    .map(
      (p) =>
        `<w:p><w:r><w:t xml:space="preserve">${p
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</w:t></w:r></w:p>`
    )
    .join("");
  const docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${xmlBody}</w:body>
</w:document>`;

  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const files = [
    { name: "[Content_Types].xml", data: Buffer.from(contentTypesXml, "utf8") },
    { name: "_rels/.rels", data: Buffer.from(relsXml, "utf8") },
    { name: "word/document.xml", data: Buffer.from(docXml, "utf8") },
  ];

  // CRC32 helper
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c >>> 0;
  }
  const crc32 = (buf) => {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  };

  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const nameBuf = Buffer.from(file.name, "utf8");
    const crc = crc32(file.data);
    const size = file.data.length;

    const localHeader = Buffer.alloc(30 + nameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8); // store (no compression)
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(size, 18);
    localHeader.writeUInt32LE(size, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);
    nameBuf.copy(localHeader, 30);

    const centralHeader = Buffer.alloc(46 + nameBuf.length);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(size, 20);
    centralHeader.writeUInt32LE(size, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    nameBuf.copy(centralHeader, 46);

    localParts.push(localHeader, file.data);
    centralParts.push(centralHeader);
    offset += localHeader.length + size;
  }

  const centralDir = Buffer.concat(centralParts);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralDir.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralDir, eocd]);
}

/**
 * Builds a valid selectable-text PDF buffer containing the given lines.
 */
function createSelectablePdfBuffer(lines) {
  const streamLines = [
    "BT",
    "/F1 11 Tf",
    "50 780 Td",
    "14 TL",
    ...lines.map((l) => {
      const safe = l.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
      return `(${safe}) Tj T*`;
    }),
    "ET",
  ].join("\n");

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${Buffer.byteLength(streamLines, "utf8")} >>
stream
${streamLines}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
trailer
<< /Root 1 0 R >>
%%EOF`;

  return Buffer.from(pdf, "utf8");
}

function createScannedEmptyPdfBuffer() {
  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] >>
endobj
trailer
<< /Root 1 0 R >>
%%EOF`;
  return Buffer.from(pdf, "utf8");
}

const SAMPLE_TXT_CV = `Thomas Moreau
Architecte Cloud & DevOps
thomas.moreau@cloudops.fr | +33 6 45 78 12 34 | Lyon | linkedin.com/in/thomasmoreau

Profil
Architecte Cloud avec 8 ans d'experience dans la conception d'infrastructures haute disponibilite et l'automatisation CI/CD pour des plateformes SaaS critiques.

Expériences professionnelles
Lead Cloud Architect — OVHcloud
2022 - Présent | Lyon
• Conception d'une architecture multi-region Kubernetes supportant 15M de requetes par jour
• Reduction des couts d'infrastructure de 28% via le dimensionnement automatique

DevOps Engineer — Criteo
2019 - 2022 | Paris
• Automatisation des pipelines Terraform et GitLab CI pour 40 microservices

Formations
Diplôme d'Ingénieur Informatique — INSA Lyon
2014 - 2019 | Lyon

Compétences
Kubernetes, Terraform, AWS, Docker, Linux, Go, Prometheus

Langues
Français : Langue maternelle
Anglais : Courant (C1)

Certifications
AWS Certified Solutions Architect Professional (2023)
CKA - Certified Kubernetes Administrator

PUBLICATIONS
Auteur du guide OpenTelemetry en production (2024)`;

const SAMPLE_DOCX_PARAGRAPHS = [
  "Claire Fontaine",
  "Directrice Marketing Produit",
  "claire.fontaine@exemple.fr | +33 6 98 11 22 33 | Bordeaux",
  "Profil",
  "Directrice Marketing Produit specialisee dans le lancement d'offres B2B SaaS en Europe.",
  "Expériences professionnelles",
  "Head of Product Marketing — PayFit",
  "2021 - 2025 | Paris",
  "• Structuration du positionnement produit sur 4 marches europeens",
  "• Croissance du pipeline enterprise de 45% en 18 mois",
  "Formations",
  "Master Marketing & Stratégie — HEC Paris",
  "2015 - 2017",
  "Compétences",
  "Go-to-Market, Product Positioning, Pricing, CRM, Copywriting",
  "Langues",
  "Français : Natif",
  "Anglais : Bilingue",
];

const SAMPLE_PDF_LINES = [
  "Julien Garnier",
  "Senior Data Scientist",
  "julien.garnier@datainsight.fr | +33 6 22 33 44 55 | Paris | github.com/jgarnier",
  "Profil",
  "Senior Data Scientist specialise en modeles predictifs et moteurs de recommandation.",
  "Experiences",
  "Lead Data Scientist | ManoMano",
  "2021 - 2025 | Paris",
  "- Deploiement du moteur de recommandation temps reel sur 12 millions de produits",
  "- Amelioration du taux de conversion panier de 14%",
  "Data Scientist | BlaBlaCar",
  "2018 - 2021 | Paris",
  "- Modelisation du matching covoiturage et detection de fraude",
  "Formations",
  "Master Data Science | Ecole Polytechnique",
  "2016 - 2018",
  "Competences",
  "Python, PyTorch, SQL, Spark, MLOps, Docker",
  "Langues",
  "Francais : Natif",
  "Anglais : Courant (C1)",
];

const LONG_TXT_CV = `Nicolas Bernard
Directeur Technique (CTO)
nicolas.bernard@techlead.fr | +33 6 11 22 33 44 | Paris | linkedin.com/in/nicolasbernard

Profil
Directeur Technique avec 14 ans d'experience dans la direction d'equipes d'ingenierie (de 15 a 120 personnes), l'architecture de plateformes distribuées à fort trafic et l'accompagnement de scale-ups de la Serie A au rachat industriel.

Expériences professionnelles
Chief Technology Officer — FinScale Europe
2022 - Présent | Paris
• Direction d'une organisation Engineering, Produit et Data de 85 personnes réparties en 9 squads pluridisciplinaires.
• Refonte complète du coeur bancaire temps réel permettant de traiter plus de 4 milliards d'euros de flux annuels avec un SLA de 99,99%.
• Mise en place de la gouvernance sécurité ISO 27001 et SOC2 Type II en moins de 10 mois sans ralentir la vélocité produit.
• Réduction du temps de déploiement de 3 jours à 25 minutes grâce à l'automatisation complète de la chaîne CI/CD.

VP Engineering — MedTech Pulse
2019 - 2022 | Lyon
• Structuration de l'équipe technique de 18 à 60 ingénieurs suite à une levée de fonds de 35M€.
• Architecture de la plateforme de téléconsultation sécurisée agréée Hébergeur de Données de Santé (HDS).
• Ouverture de 3 nouveaux pays européens (Allemagne, Espagne, Italie) avec localisation réglementaire complète.
• Amélioration du NPS praticiens de 32 à 68 en l'espace de 14 mois.

Engineering Manager — RetailCloud
2016 - 2019 | Paris
• Encadrement de 3 équipes full-stack (24 développeurs) en charge du moteur de catalogue et de tarification dynamique.
• Migration progressive d'un monolithe PHP historique vers une architecture orientée événements sous Go et Kafka.
• Division par 4 de la latence P99 des APIs publiques lors des pics de trafic Black Friday.

Lead Software Engineer — StreamLine Media
2014 - 2016 | Paris
• Conception et développement du lecteur vidéo adaptatif bas débit pour 3 millions d'abonnés actifs.
• Mise en place des tests de charge automatisés et de l'observabilité temps réel sous Grafana et Prometheus.

Senior Backend Developer — WebFactory
2012 - 2014 | Nantes
• Développement d'APIs REST haute performance et d'outils d'intégration continue pour des grands comptes européens.
• Mentorat des développeurs juniors et animation des revues d'architecture hebdomadaires.

Formations
Diplôme d'Ingénieur Systèmes Distribués — Télécom Paris
2009 - 2012 | Paris

Master Recherche Informatique Fondamentale — Université Paris-Saclay
2011 - 2012 | Orsay

Compétences
Architecture distribuée, Management d'équipes, Go, TypeScript, Kubernetes, PostgreSQL, Kafka, AWS, GCP, Sécurité ISO 27001, FinOps, Stratégie Produit

Langues
Français : Langue maternelle
Anglais : Bilingue (C2)
Allemand : Professionnel (B2)`;

async function runSuiteForViewport(browser, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const results = [];
  const consoleErrors = [];

  page.on("pageerror", (err) => consoleErrors.push(err.message));

  const record = (num, name, passed, details = "") => {
    results.push({ num, name, passed, details });
    if (!passed) {
      console.error(`[FAIL] (${viewport.width}x${viewport.height}) #${num} ${name}: ${details}`);
    }
  };

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  // 1. Cliquer sur “Importer mon CV” depuis l’accueil
  const openOnboardingBtn = page.getByTestId("open-onboarding-btn");
  if (await openOnboardingBtn.isVisible()) {
    await openOnboardingBtn.click();
  }
  const importBtn = page.getByTestId("onboarding-import-cv-btn");
  await importBtn.waitFor({ state: "visible", timeout: 5000 });
  await importBtn.click();
  const modal = page.getByTestId("cv-import-modal");
  await modal.waitFor({ state: "visible", timeout: 5000 });
  record(1, "Cliquer sur 'Importer mon CV' depuis l'accueil", await modal.isVisible());

  // 29. Tester un PDF sans texte sélectionnable et vérifier le message d’erreur + l’alternative “Coller mon texte”
  const scannedPdfBuf = createScannedEmptyPdfBuffer();
  await page.getByTestId("import-file-input").setInputFiles({
    name: "cv-scanne.pdf",
    mimeType: "application/pdf",
    buffer: scannedPdfBuf,
  });
  const errBanner29 = page.getByTestId("import-error-banner");
  await errBanner29.waitFor({ state: "visible", timeout: 5000 });
  const errMsg29 = await page.getByTestId("import-error-message").innerText();
  const hasPasteBtn29 = await page.getByTestId("error-action-paste").isVisible();
  record(
    29,
    "PDF sans texte sélectionnable -> message d'erreur + alternative 'Coller mon texte'",
    errMsg29.includes("Ce PDF ne contient pas de texte sélectionnable") && hasPasteBtn29,
    errMsg29
  );

  // 30. Tester un fichier non supporté et vérifier le message d’erreur
  await page.getByTestId("import-file-input").setInputFiles({
    name: "photo-profil.png",
    mimeType: "image/png",
    buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  });
  await errBanner29.waitFor({ state: "visible", timeout: 5000 });
  const errMsg30 = await page.getByTestId("import-error-message").innerText();
  record(
    30,
    "Fichier non supporté -> message d'erreur clair",
    errMsg30.includes("Ce format n’est pas supporté"),
    errMsg30
  );

  // 31. Tester un fichier > 10 Mo et vérifier le message d’erreur
  const largeBuf = Buffer.alloc(10 * 1024 * 1024 + 2048, 0x41);
  await page.getByTestId("import-file-input").setInputFiles({
    name: "cv-trop-lourd.txt",
    mimeType: "text/plain",
    buffer: largeBuf,
  });
  await errBanner29.waitFor({ state: "visible", timeout: 5000 });
  const errMsg31 = await page.getByTestId("import-error-message").innerText();
  record(
    31,
    "Fichier > 10 Mo -> message d'erreur limite 10 Mo",
    errMsg31.includes("Ce fichier dépasse la limite de 10 Mo"),
    errMsg31
  );

  // 3. Importer un CV DOCX structuré
  const docxBuf = createMinimalDocxBuffer(SAMPLE_DOCX_PARAGRAPHS);
  await page.getByTestId("import-file-input").setInputFiles({
    name: "claire-fontaine.docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    buffer: docxBuf,
  });
  await page.getByTestId("mapping-verification-screen").waitFor({ state: "visible", timeout: 5000 });
  const docxName = await page.getByTestId("mapping-profile-name").innerText();
  record(3, "Importer un CV DOCX structuré", docxName.includes("Claire Fontaine"), docxName);

  // Go back to upload to test PDF
  await page.getByRole("button", { name: "Changer de fichier" }).click();

  // 4. Importer un CV PDF avec texte sélectionnable
  const pdfBuf = createSelectablePdfBuffer(SAMPLE_PDF_LINES);
  await page.getByTestId("import-file-input").setInputFiles({
    name: "julien-garnier.pdf",
    mimeType: "application/pdf",
    buffer: pdfBuf,
  });
  await page.getByTestId("mapping-verification-screen").waitFor({ state: "visible", timeout: 5000 });
  const pdfName = await page.getByTestId("mapping-profile-name").innerText();
  record(4, "Importer un CV PDF avec texte sélectionnable", pdfName.includes("Julien Garnier"), pdfName);

  // Go back to upload to test TXT + full mapping verification workflow
  await page.getByRole("button", { name: "Changer de fichier" }).click();

  // 2. Importer un CV TXT structuré
  await page.getByTestId("import-file-input").setInputFiles({
    name: "thomas-moreau.txt",
    mimeType: "text/plain",
    buffer: Buffer.from(SAMPLE_TXT_CV, "utf8"),
  });
  await page.getByTestId("mapping-verification-screen").waitFor({ state: "visible", timeout: 5000 });
  const importedFilenameText = await page.getByTestId("imported-filename").innerText();
  record(2, "Importer un CV TXT structuré", importedFilenameText.includes("thomas-moreau.txt"), importedFilenameText);

  // 5. Vérifier l’extraction du nom et du titre
  const extractedName = await page.getByTestId("mapping-profile-name").innerText();
  const extractedRole = await page.getByTestId("mapping-profile-role").innerText();
  record(
    5,
    "Vérifier l'extraction du nom et du titre",
    extractedName === "Thomas Moreau" && extractedRole.includes("Architecte Cloud"),
    `${extractedName} / ${extractedRole}`
  );

  // 6. Vérifier l’extraction de l’email et du téléphone
  const profileSectionText = await page.getByTestId("mapping-section-profile").innerText();
  record(
    6,
    "Vérifier l'extraction de l'email et du téléphone",
    profileSectionText.includes("thomas.moreau@cloudops.fr") && profileSectionText.includes("+33 6 45 78 12 34"),
    profileSectionText
  );

  // 7. Vérifier l’extraction du profil / résumé
  record(
    7,
    "Vérifier l'extraction du profil / résumé",
    profileSectionText.includes("Architecte Cloud avec 8 ans"),
    profileSectionText
  );

  // 8. Vérifier la détection des expériences
  const expSectionText = await page.getByTestId("mapping-section-experiences").innerText();
  record(
    8,
    "Vérifier la détection des expériences",
    expSectionText.toLowerCase().includes("expériences détectées : 2") &&
      expSectionText.includes("Lead Cloud Architect") &&
      expSectionText.includes("OVHcloud"),
    expSectionText
  );

  // 9. Vérifier la détection des formations
  const eduSectionText = await page.getByTestId("mapping-section-educations").innerText();
  record(
    9,
    "Vérifier la détection des formations",
    eduSectionText.toLowerCase().includes("formations détectées : 1") && eduSectionText.includes("INSA Lyon"),
    eduSectionText
  );

  // 10. Vérifier la détection des compétences
  const skillsSectionText = await page.getByTestId("mapping-section-skills").innerText();
  record(
    10,
    "Vérifier la détection des compétences",
    skillsSectionText.includes("Kubernetes") && skillsSectionText.includes("Terraform"),
    skillsSectionText
  );

  // 11. Vérifier la détection des langues
  const langSectionText = await page.getByTestId("mapping-section-languages").innerText();
  record(
    11,
    "Vérifier la détection des langues",
    langSectionText.includes("Français") && langSectionText.includes("Anglais"),
    langSectionText
  );

  // 12. Tester l’écran de vérification du mapping
  const unrecSectionText = await page.getByTestId("mapping-section-unrecognized").innerText();
  record(
    12,
    "Tester l'écran de vérification du mapping (résumé complet visible)",
    unrecSectionText.toLowerCase().includes("contenu non reconnu : 2 bloc(s)"),
    unrecSectionText
  );

  // 13. Modifier une expérience dans l’écran de mapping
  await page.getByTestId("mapping-exp-edit-0").click();
  const roleInput0 = page.getByTestId("mapping-exp-role-input-0");
  await roleInput0.fill("Principal Cloud Architect");
  await page.getByTestId("mapping-exp-edit-0").click();
  const updatedExp0Text = await page.getByTestId("mapping-exp-item-0").innerText();
  record(
    13,
    "Modifier une expérience dans l'écran de mapping",
    updatedExp0Text.includes("Principal Cloud Architect"),
    updatedExp0Text
  );

  // 14. Supprimer une entrée incorrecte dans l’écran de mapping
  await page.getByTestId("mapping-exp-delete-1").click();
  const expTextAfterDelete = await page.getByTestId("mapping-section-experiences").innerText();
  record(
    14,
    "Supprimer une entrée dans l'écran de mapping",
    expTextAfterDelete.toLowerCase().includes("expériences détectées : 1"),
    expTextAfterDelete
  );

  // 15. Attribuer un bloc “Contenu non reconnu” à une section
  await page.getByTestId("unrecognized-assign-btn-0").click();
  await page.getByTestId("assign-target-skills-0").click();
  const skillsAfterAssign = await page.getByTestId("mapping-section-skills").innerText();
  record(
    15,
    "Attribuer un bloc 'Contenu non reconnu' à une section",
    skillsAfterAssign.includes("OpenTelemetry") ||
      skillsAfterAssign.includes("AWS Certified Solutions Architect Professional"),
    skillsAfterAssign
  );

  // 16. Ignorer un bloc “Contenu non reconnu”
  await page.getByTestId("unrecognized-ignore-btn-0").click();
  const unrecAfterIgnore = await page.getByTestId("mapping-section-unrecognized").innerText();
  record(
    16,
    "Ignorer un bloc 'Contenu non reconnu'",
    unrecAfterIgnore.toLowerCase().includes("contenu non reconnu : 0 bloc(s)"),
    unrecAfterIgnore
  );

  // 17. Choisir un template après l’import
  await page.getByTestId("mapping-create-cv-btn").click();
  const templateStep = page.getByTestId("import-template-step");
  await templateStep.waitFor({ state: "visible", timeout: 5000 });
  const recCard0Visible = await page.getByTestId("recommended-template-card-0").isVisible();
  await page.getByTestId("use-template-btn-executive").click();
  record(17, "Choisir un template après l'import", recCard0Visible);

  // 18. Vérifier que le CV s’ouvre en Mode Guidé
  await page.getByRole("tab", { name: "Saisie guidée" }).waitFor({ state: "visible", timeout: 5000 });
  const isGuidedSelected = await page
    .getByRole("tab", { name: "Saisie guidée" })
    .getAttribute("aria-selected");
  record(18, "Vérifier que le CV s'ouvre en Mode Guidé", isGuidedSelected === "true");

  // 19. Vérifier que les sections importées apparaissent à gauche
  const leftNav = page.getByTestId("guided-sections-sidebar");
  const leftNavText = await leftNav.innerText();
  record(
    19,
    "Vérifier que les sections importées apparaissent à gauche",
    leftNavText.includes("Profil & Contact") &&
      leftNavText.includes("Expériences professionnelles") &&
      leftNavText.includes("Formation & Diplômes") &&
      leftNavText.includes("Compétences"),
    leftNavText
  );

  // 20. Vérifier que le CV live apparaît au centre
  const centerSheet = page.getByTestId("guided-page-1");
  const centerSheetText = await centerSheet.innerText();
  record(
    20,
    "Vérifier que le CV live apparaît au centre avec les données importées",
    centerSheetText.includes("Thomas Moreau") && centerSheetText.includes("Principal Cloud Architect"),
    centerSheetText.slice(0, 120)
  );

  // 21. Vérifier que les champs éditables apparaissent à droite
  const rightFieldValue = await page.locator("input[placeholder='Intitulé du poste']").first().inputValue();
  record(
    21,
    "Vérifier que les champs éditables apparaissent à droite",
    rightFieldValue === "Principal Cloud Architect",
    rightFieldValue
  );

  // 22. Modifier une expérience importée en Mode Guidé
  const expRoleInputGuided = page.locator("input[placeholder='Intitulé du poste']").first();
  await expRoleInputGuided.fill("VP Cloud Infrastructure");
  await expRoleInputGuided.blur();
  const centerAfterEdit = await centerSheet.innerText();
  record(
    22,
    "Modifier une expérience importée en Mode Guidé",
    centerAfterEdit.includes("VP Cloud Infrastructure"),
    centerAfterEdit.slice(0, 140)
  );

  // 23. Passer au Mode Studio puis revenir au Mode Guidé sans perte
  await page.getByRole("tab", { name: "Studio libre" }).click();
  await page.waitForTimeout(200);
  await page.getByRole("tab", { name: "Saisie guidée" }).click();
  await page.getByTestId("guided-sections-sidebar").waitFor({ state: "visible", timeout: 5000 });
  const centerAfterRoundtrip = await page.getByTestId("guided-page-1").innerText();
  record(
    23,
    "Passer au Mode Studio puis revenir au Mode Guidé sans perte",
    centerAfterRoundtrip.includes("VP Cloud Infrastructure") && centerAfterRoundtrip.includes("Thomas Moreau")
  );

  // 25. Tester l’aperçu texte brut après import
  await page.getByTestId("open-plain-text-btn").click();
  const plainModal = page.getByTestId("plain-text-modal");
  await plainModal.waitFor({ state: "visible", timeout: 5000 });
  const plainContent = await page.getByTestId("plain-text-content").inputValue();
  record(
    25,
    "Tester l'aperçu texte brut après import",
    plainContent.includes("Thomas Moreau") &&
      plainContent.includes("VP Cloud Infrastructure") &&
      plainContent.includes("INSA Lyon"),
    plainContent.slice(0, 120)
  );
  await plainModal.getByRole("button", { name: "Fermer" }).first().click();
  await plainModal.waitFor({ state: "hidden", timeout: 5000 });

  // 26. Tester le contrôle de lisibilité après import
  await page.getByTestId("open-readability-btn").click();
  const readModal = page.getByTestId("readability-modal");
  await readModal.waitFor({ state: "visible", timeout: 5000 });
  const readText = await readModal.innerText();
  record(
    26,
    "Tester le contrôle de lisibilité après import",
    readText.includes("Contrôle") || readText.includes("lisibilité"),
    readText.slice(0, 100)
  );
  await readModal.locator("button[title='Fermer']").click();
  await readModal.waitFor({ state: "hidden", timeout: 5000 });

  // 27. Tester la persistance après rechargement de la page
  await page.reload({ waitUntil: "networkidle" });
  const centerAfterReload = await page.getByTestId("guided-page-1").innerText();
  record(
    27,
    "Tester la persistance après rechargement de la page",
    centerAfterReload.includes("Thomas Moreau") && centerAfterReload.includes("VP Cloud Infrastructure"),
    centerAfterReload.slice(0, 120)
  );

  // 28. Tester la confirmation avant remplacement d’un CV déjà ouvert + 24. Tester un CV long importé qui génère 2 pages A4
  await page.getByTestId("guided-import-cv-btn").click();
  await page.getByTestId("cv-import-modal").waitFor({ state: "visible", timeout: 5000 });
  await page.getByTestId("import-file-input").setInputFiles({
    name: "nicolas-bernard-long.txt",
    mimeType: "text/plain",
    buffer: Buffer.from(LONG_TXT_CV, "utf8"),
  });
  await page.getByTestId("mapping-verification-screen").waitFor({ state: "visible", timeout: 5000 });
  await page.getByTestId("mapping-create-cv-btn").click();
  await page.getByTestId("import-template-step").waitFor({ state: "visible", timeout: 5000 });
  // Choose first recommended template
  await page.locator("[data-testid^='use-template-btn-']").first().click();

  // Because a CV is already open (!onboarding), the confirmation step must appear!
  const confirmStep = page.getByTestId("confirm-replace-cv-step");
  await confirmStep.waitFor({ state: "visible", timeout: 5000 });
  const confirmStepText = await confirmStep.innerText();
  record(
    28,
    "Tester la confirmation avant remplacement d'un CV déjà ouvert",
    confirmStepText.includes("Remplacer le CV actuel ?") &&
      confirmStepText.includes("Le CV actuellement ouvert sera remplacé par le CV importé."),
    confirmStepText
  );

  // Confirm replacement and check 24 (long CV generates 2 A4 pages)
  await page.getByTestId("confirm-replace-cv-btn").click();
  await page.waitForTimeout(300);
  const pageCountBadge = await page.getByTestId("guided-page-count").innerText();
  const sheetsCount = await page.getByTestId("guided-page-2").count();
  record(
    24,
    "Tester un CV long importé qui génère 2 pages A4",
    sheetsCount >= 1 && pageCountBadge.includes("pages A4"),
    `${pageCountBadge} (page 2 count: ${sheetsCount})`
  );

  await context.close();
  return { viewport, results, consoleErrors };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const viewports = [
      { width: 1366, height: 768 },
      { width: 1920, height: 1080 },
    ];
    let allPassed = true;
    for (const vp of viewports) {
      const report = await runSuiteForViewport(browser, vp);
      const passedCount = report.results.filter((r) => r.passed).length;
      console.log(
        `\n=== Viewport ${vp.width}x${vp.height}: ${passedCount}/${report.results.length} scenarios passed (Console errors: ${report.consoleErrors.length}) ===`
      );
      for (const r of report.results.sort((a, b) => a.num - b.num)) {
        console.log(`  [${r.passed ? "PASS" : "FAIL"}] #${r.num} ${r.name}`);
      }
      if (passedCount !== report.results.length || report.consoleErrors.length > 0) {
        allPassed = false;
        if (report.consoleErrors.length > 0) {
          console.error("Console errors:", report.consoleErrors);
        }
      }
    }
    if (!allPassed) process.exit(1);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
