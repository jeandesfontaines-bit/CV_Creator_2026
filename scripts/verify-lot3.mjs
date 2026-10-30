import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";

const URL = "http://127.0.0.1:8080/";
const SCREENSHOT_DIR = "/app/applet/screenshots";
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function getDocState(page) {
  return page.evaluate(() => {
    const raw = localStorage.getItem("libre-cv-doc-v1");
    const meta = localStorage.getItem("libre-cv-meta-v1");
    return {
      doc: raw ? JSON.parse(raw) : null,
      meta: meta ? JSON.parse(meta) : null,
    };
  });
}

async function runLot3Suite(viewport, label) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    acceptDownloads: true,
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    pageErrors.push(err.message);
  });

  console.log(`\n=== Running Lot 3 Verification Suite at ${viewport.width}x${viewport.height} (${label}) ===`);

  // 1. Ouvrir un CV avec un modèle existant
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("cv_onboarding_done", "true");
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  console.log(`[${label}] 1. Open CV with existing template OK`);

  // 2. Passer en Mode Guidé
  const guidedTab = page.locator("header button", { hasText: "Saisie guidée" }).first();
  await guidedTab.click();
  await page.waitForTimeout(300);

  // Enregistrer les positions initiales des expériences 1 et 2 et de la formation sur la page 1
  const initialState = await page.evaluate(() => {
    const p1 = document.querySelector('[data-sheet="page-1"]');
    if (!p1) return null;
    const els = Array.from(p1.querySelectorAll("[data-element]")).map((node) => ({
      id: node.getAttribute("data-element"),
      top: parseFloat(node.style.top || "0"),
      height: parseFloat(node.style.height || "0"),
      text: (node.textContent || "").trim().slice(0, 40),
    }));
    return { pageCount: document.querySelectorAll(".simple-preview-sheet [data-sheet]").length, els };
  });
  assert.equal(initialState.pageCount, 1, "Initial CV should have 1 A4 page");
  const initialExp1 = initialState.els.find((e) => e.text.includes("Senior UI/UX Designer"));
  assert(initialExp1, "Second experience block should exist on Page 1");
  console.log(`[${label}] 2. Switch to Guided Mode OK (Exp2 initial top: ${initialExp1.top}px)`);

  // 3. Allonger une expérience avec un texte long
  const expCard0 = page.locator('[data-testid="guided-experience-0"]').first();
  const desc0 = expCard0.locator("textarea").first();
  const originalShortText = await desc0.inputValue();

  const mediumLongText = [
    "• Refonte complète du design system multi-marques (180+ composants accessibles WCAG AA) adopté par 14 équipes produit.",
    "• Direction de la recherche utilisateur continue et tests d'utilisabilité hebdomadaires ayant permis d'augmenter la conversion de +34%.",
    "• Mise en place d'une gouvernance design ops et d'indicateurs de qualité réduisant le temps de livraison front-end de 40%.",
  ].join("\n");

  await desc0.fill(mediumLongText);
  await page.waitForTimeout(300);

  // 4. Vérifier que les blocs suivants se décalent
  const afterMediumState = await page.evaluate(() => {
    const p1 = document.querySelector('[data-sheet="page-1"]');
    const els = Array.from(p1.querySelectorAll("[data-element]")).map((node) => ({
      id: node.getAttribute("data-element"),
      top: parseFloat(node.style.top || "0"),
      height: parseFloat(node.style.height || "0"),
      text: (node.textContent || "").trim().slice(0, 40),
    }));
    return { els };
  });
  const shiftedExp1 = afterMediumState.els.find((e) => e.id === initialExp1.id);
  assert(
    shiftedExp1.top > initialExp1.top + 20,
    `Following block must shift down when experience lengthens (before: ${initialExp1.top}px, after: ${shiftedExp1.top}px)`,
  );
  console.log(`[${label}] 3 & 4. Lengthen experience & verify subsequent blocks shift down OK (${initialExp1.top}px -> ${shiftedExp1.top}px)`);

  // 5. Continuer jusqu’à dépasser la page 1
  const veryLongText = [
    mediumLongText,
    "• Conception de l'architecture d'information d'une plateforme SaaS B2B internationale utilisée par 250 000 utilisateurs actifs quotidiens.",
    "• Animation d'ateliers de co-conception avec les équipes dirigeantes, produit et ingénierie sur 4 fuseaux horaires.",
    "• Mentorat direct de 8 Product Designers seniors et structuration des parcours d'évolution de carrière.",
    "• Standardisation des tokens typographiques, couleurs et espacements synchronisés automatiquement avec Figma et GitHub.",
    "• Réduction de 52% des tickets de dette visuelle et amélioration du score SUS de 68 à 86 en douze mois.",
    "• Déploiement d'un référentiel de composants documentés sous Storybook avec tests de régression visuelle automatisés.",
  ].join("\n");

  await desc0.fill(veryLongText);
  await page.waitForTimeout(350);

  // 6. Vérifier la création ou l’utilisation de la page 2
  // 7. Vérifier qu’aucun texte n’est coupé
  const paginatedState = await page.evaluate(() => {
    const sheets = Array.from(document.querySelectorAll(".simple-preview-sheet [data-sheet]"));
    const pagesInfo = sheets.map((sheet) => {
      const els = Array.from(sheet.querySelectorAll("[data-element]")).map((node) => ({
        id: node.getAttribute("data-element"),
        top: parseFloat(node.style.top || "0"),
        height: parseFloat(node.style.height || "0"),
        bottom: parseFloat(node.style.top || "0") + parseFloat(node.style.height || "0"),
        text: (node.textContent || "").trim(),
      }));
      return {
        sheetId: sheet.getAttribute("data-sheet"),
        elementCount: els.length,
        maxBottom: Math.max(0, ...els.map((e) => e.bottom)),
        els,
      };
    });
    return {
      pageCount: sheets.length,
      pagesInfo,
      fullText: document.querySelector(".simple-preview-sheet")?.innerText || "",
    };
  });

  assert(paginatedState.pageCount >= 2, `Expected automatic creation of Page 2 when overflowing Page 1, got ${paginatedState.pageCount} page(s)`);
  assert(paginatedState.pagesInfo[0].maxBottom <= 1123, `Page 1 blocks must not exceed 1123px A4 height (got ${paginatedState.pagesInfo[0].maxBottom}px)`);
  assert(paginatedState.pagesInfo[1].elementCount > 0, "Page 2 must contain the overflowed blocks");
  assert(paginatedState.fullText.includes("Storybook avec tests de régression"), "Long experience text must be fully visible and never cut");
  assert(paginatedState.fullText.includes("Français"), "Paginated section (Langues) must remain intact on Page 2");
  console.log(
    `[${label}] 5, 6 & 7. Overflow Page 1 -> Auto-create Page 2 (${paginatedState.pageCount} pages, Page 1 maxBottom=${paginatedState.pagesInfo[0].maxBottom}px, Page 2 elements=${paginatedState.pagesInfo[1].elementCount}, 0 clipped text) OK`,
  );

  await page.screenshot({ path: `${SCREENSHOT_DIR}/lot3-multipage-${label}.png` });

  // 8. Raccourcir le texte
  await desc0.fill(originalShortText);
  await page.waitForTimeout(350);

  // 9. Vérifier que les blocs remontent
  // 10. Vérifier que la page 2 vide est supprimée si elle ne contient aucun bloc libre
  const shortenedState = await page.evaluate((exp1Id) => {
    const sheets = Array.from(document.querySelectorAll(".simple-preview-sheet [data-sheet]"));
    const p1 = sheets[0];
    const exp1Node = p1?.querySelector(`[data-element="${exp1Id}"]`);
    return {
      pageCount: sheets.length,
      exp1Top: exp1Node ? parseFloat(exp1Node.style.top || "0") : null,
      fullText: document.querySelector(".simple-preview-sheet")?.innerText || "",
    };
  }, initialExp1.id);

  assert.equal(shortenedState.pageCount, 1, "Empty Page 2 without Studio free blocks must be removed when content is shortened");
  assert(
    Math.abs(shortenedState.exp1Top - initialExp1.top) <= 6,
    `Following blocks must move back up when text is shortened (expected ~${initialExp1.top}px, got ${shortenedState.exp1Top}px)`,
  );
  assert(shortenedState.fullText.includes("Français"), "Pulled-back sections must be back on Page 1");
  console.log(`[${label}] 8, 9 & 10. Shorten text -> Blocks move up (${shortenedState.exp1Top}px) & empty Page 2 removed OK`);

  // 11. Passer au Studio
  const studioTab = page.locator("header button", { hasText: "Studio libre" }).first();
  await studioTab.click();
  await page.waitForTimeout(350);

  // 12. Ajouter un bloc libre dans le Studio
  const blocksTabBtn = page.locator("aside button", { hasText: "Ajouter" }).first();
  await blocksTabBtn.click();
  await page.waitForTimeout(200);

  const addTextBtn = page.locator("aside button", { hasText: "Paragraphe" }).first();
  await addTextBtn.click();
  await page.waitForTimeout(300);

  const afterFreeBlock = await getDocState(page);
  const freeBlocksInStudio = afterFreeBlock.doc.pages[0].elements.filter(
    (el) => !el.bind && !/^(seed|modern)-/.test(el.id),
  );
  assert(freeBlocksInStudio.length >= 1, "Studio free block should be added to Page 1");
  const freeBlockId = freeBlocksInStudio[0].id;
  console.log(`[${label}] 11 & 12. Switch to Studio & add free block (${freeBlockId}) OK`);

  // 13. Revenir au Mode Guidé
  const guidedTabFromStudio = page.locator("header button", { hasText: "Saisie guidée" }).first();
  await guidedTabFromStudio.click();
  await page.waitForTimeout(350);

  // 14. Vérifier que le bloc libre est conservé et que la limite est expliquée
  const alertBanner = page.locator('[data-testid="document-alert-banner"]').first();
  await alertBanner.waitFor({ state: "visible", timeout: 5000 });
  const bannerText = await alertBanner.innerText();
  assert(
    bannerText.includes("Studio") && bannerText.includes("position libre"),
    `Expected Studio free block limitation notice in banner, got: ${bannerText}`,
  );
  const stateInGuided = await getDocState(page);
  const freeStillExists = stateInGuided.doc.pages.some((p) => p.elements.some((e) => e.id === freeBlockId));
  assert(freeStillExists, "Studio free block must be preserved when returning to Guided Mode");
  console.log(`[${label}] 13 & 14. Return to Guided Mode -> Free block preserved & limitation banner shown OK`);

  await page.screenshot({ path: `${SCREENSHOT_DIR}/lot3-banner-guided-${label}.png` });

  // 15. Recharger la page
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(350);

  // 16. Vérifier que le document complet est restauré
  const restoredState = await getDocState(page);
  const restoredFree = restoredState.doc.pages.some((p) => p.elements.some((e) => e.id === freeBlockId));
  assert(restoredFree, "Studio free block must still be present after page reload");
  assert.equal(restoredState.meta.editorMode, "guided", "Editor mode (guided) must be preserved after reload");
  console.log(`[${label}] 15 & 16. Reload page & verify full document restoration OK`);

  // 17. Ouvrir l’aperçu texte brut
  const openPlainTextBtn = page.locator('[data-testid="open-plain-text-btn"]').first();
  await openPlainTextBtn.click();
  await page.waitForTimeout(250);

  const plainTextModal = page.locator('[data-testid="plain-text-modal"]').first();
  await plainTextModal.waitFor({ state: "visible", timeout: 5000 });

  // 18. Vérifier que le texte correspond au contenu visible et copier le texte
  const plainTextValue = await page.locator('[data-testid="plain-text-content"]').inputValue();
  assert(plainTextValue.includes("Alexandra"), "Plain text preview must contain candidate name");
  assert(plainTextValue.includes("EXPÉRIENCE"), "Plain text preview must contain EXPÉRIENCE section");
  assert(plainTextValue.includes("Écris ici"), "Plain text preview must include Studio free text block");

  const copyBtn = page.locator('[data-testid="copy-plain-text-btn"]').first();
  await copyBtn.click();
  await page.waitForTimeout(200);
  const copyBtnText = await copyBtn.innerText();
  assert(copyBtnText.includes("copié"), "Copy button should confirm text was copied");

  await page.screenshot({ path: `${SCREENSHOT_DIR}/lot3-plaintext-${label}.png` });

  // Fermer la modale texte brut
  await plainTextModal.locator("button", { hasText: "Fermer" }).first().click();
  await page.waitForTimeout(200);
  console.log(`[${label}] 17 & 18. Plain text ATS preview opened, verified content & copied text OK`);

  // Vérifier également la modale "Contrôle avant export"
  const openReadabilityBtn = page.locator('[data-testid="open-readability-btn"]').first();
  await openReadabilityBtn.click();
  await page.waitForTimeout(250);
  const readabilityModal = page.locator('[data-testid="readability-modal"]').first();
  await readabilityModal.waitFor({ state: "visible", timeout: 5000 });
  await page.screenshot({ path: `${SCREENSHOT_DIR}/lot3-readability-${label}.png` });
  await readabilityModal.locator("button", { hasText: "Corriger avant l’export" }).first().click();
  await page.waitForTimeout(200);
  console.log(`[${label}] Readability control modal verified OK`);

  // 19. Exporter le CV en PDF et vérifier le téléchargement
  const downloadPromise = page.waitForEvent("download", { timeout: 25000 });
  const exportPdfBtn = page.locator('[data-testid="export-pdf-btn"]').first();
  await exportPdfBtn.click();

  // Si une alerte critique ouvre la modale de confirmation, cliquer sur "Exporter quand même"
  await page.waitForTimeout(250);
  const exportAnywayBtn = page.locator('[data-testid="readability-export-anyway-btn"]').first();
  if (await exportAnywayBtn.isVisible().catch(() => false)) {
    await exportAnywayBtn.click();
  }

  const download = await downloadPromise;
  const filename = download.suggestedFilename();
  const filePath = await download.path();
  const fileStat = fs.statSync(filePath);
  assert(filename.endsWith(".pdf"), `Expected .pdf download, got ${filename}`);
  assert(fileStat.size > 5000, `Expected non-empty PDF (>5KB), got ${fileStat.size} bytes`);
  console.log(`[${label}] 19. PDF export downloaded (${filename}, ${fileStat.size} bytes) OK`);

  // 20. Vérifier 0 erreur console
  assert.equal(consoleErrors.length, 0, `Console errors detected: ${consoleErrors.join("; ")}`);
  assert.equal(pageErrors.length, 0, `Uncaught page errors detected: ${pageErrors.join("; ")}`);
  console.log(`[${label}] 20. 0 console errors & 0 page errors OK`);

  await browser.close();
}

await runLot3Suite({ width: 1366, height: 768 }, "1366x768");
await runLot3Suite({ width: 1920, height: 1080 }, "1920x1080");
console.log("\nALL 20 LOT 3 SCENARIOS PASSED AT 1366x768 AND 1920x1080.");
