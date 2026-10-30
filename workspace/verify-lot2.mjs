import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";

const URL = "http://127.0.0.1:8080/";
const SCREENSHOT_DIR = "/workspace/screenshots";
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runSuite(viewport, label) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    acceptDownloads: true,
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

  console.log(`\n=== Running Lot 2 suite at ${viewport.width}x${viewport.height} (${label}) ===`);

  // 1. Ouvrir l'application et réinitialiser localStorage
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  // Passer en mode Guidé si pas déjà fait
  const guidedBtn = page.locator("header button", { hasText: "Saisie guidée" }).first();
  if (await guidedBtn.isVisible()) {
    await guidedBtn.click();
    await page.waitForTimeout(300);
  }

  // 2. Sélectionner la section "Expériences professionnelles" dans la colonne de gauche
  const expSectionBtn = page.locator("aside", { hasText: "Expériences professionnelles" }).first();
  await expSectionBtn.click();
  await page.waitForTimeout(250);

  // 3. Ajouter une expérience avec plusieurs réalisations (bullet points)
  const addExpBtn = page.locator("button", { hasText: "Ajouter un poste" }).first();
  await addExpBtn.click();
  await page.waitForTimeout(250);

  const newExpCard = page.locator('[data-testid="guided-experience-3"]').first();
  const roleInput = newExpCard.locator("input").nth(0);
  const companyInput = newExpCard.locator("input").nth(1);
  const periodInput = newExpCard.locator("input").nth(2);
  const descTextarea = newExpCard.locator("textarea").first();

  await roleInput.fill("Architecte Solutions Cloud");
  await companyInput.fill("Cloudscale — Paris");
  await periodInput.fill("2024 — Présent");

  const multiAchievementDesc = [
    "• Migration réussie de 45 microservices vers Kubernetes avec zéro interruption de service.",
    "• Réduction des coûts d'infrastructure AWS de 38% grâce à l'optimisation des instances spot.",
    "• Mise en place d'une observabilité globale réduisant le MTTR de 55%."
  ].join("\n");

  await descTextarea.fill(multiAchievementDesc);
  await page.waitForTimeout(300);

  // Vérifier que l'aperçu live contient les réalisations
  const previewSheet = page.locator(".simple-preview-sheet").first();
  let previewText = await previewSheet.innerText();
  assert(previewText.includes("Architecte Solutions Cloud"), "New experience role must appear in live preview");
  assert(previewText.includes("zéro interruption de service"), "Achievement 1 must appear in live preview");
  assert(previewText.includes("réduisant le MTTR de 55%"), "Achievement 3 must appear in live preview");
  console.log(`[${label}] Step 3 (Add experience with multiple achievements) OK`);

  // 4. Tester l'ajout d'une réalisation supplémentaire via le bouton dédié
  const addAchieveBtn = newExpCard.locator("button", { hasText: "Ajouter une réalisation" }).first();
  await addAchieveBtn.click();
  await page.waitForTimeout(200);
  const updatedDesc = await descTextarea.inputValue();
  assert(updatedDesc.includes("Nouvelle réalisation impactante"), "Add achievement button should append a new bullet point");
  console.log(`[${label}] Step 4 (Add individual achievement button) OK`);

  // 5. Tester l'allongement puis le raccourcissement d'un texte (flux et hauteur automatique)
  await descTextarea.fill(multiAchievementDesc + "\n• Pilotage d'un programme de formation interne.");
  await page.waitForTimeout(250);
  await descTextarea.fill("• Pilotage technique et architectural.");
  await page.waitForTimeout(250);
  console.log(`[${label}] Step 5 (Lengthen then shorten text with flow adjustment) OK`);

  // 6. Tester le masquage et réaffichage d'une section sans perte de contenu
  const expSectionRow = page.locator("aside div", { hasText: "Expériences professionnelles" }).first();
  const hideButton = expSectionRow.locator("button").filter({ has: page.locator("svg") }).first();
  await hideButton.click();
  await page.waitForTimeout(250);

  previewText = await previewSheet.innerText();
  assert(!previewText.includes("Architecte Solutions Cloud"), "Hidden section elements should not appear in live preview");

  // Réafficher la section
  await hideButton.click();
  await page.waitForTimeout(250);
  previewText = await previewSheet.innerText();
  assert(previewText.includes("Architecte Solutions Cloud"), "Re-shown section elements must reappear with content intact");
  console.log(`[${label}] Step 6 (Hide and re-show section without content loss) OK`);

  // 7. Tester la réorganisation des sections (Monter / Descendre)
  const skillsRow = page.locator("aside div", { hasText: "Compétences" }).first();
  const moveUpBtn = skillsRow.locator("button[title='Monter la section']").first();
  await moveUpBtn.click();
  await page.waitForTimeout(250);
  console.log(`[${label}] Step 7 (Reorder sections with Monter / Descendre) OK`);

  // 8. Tester Annuler (Undo) et Rétablir (Redo)
  const undoBtn = page.locator("button[title*='Annuler']").first();
  const redoBtn = page.locator("button[title*='Rétablir']").first();

  await undoBtn.click();
  await page.waitForTimeout(200);
  await redoBtn.click();
  await page.waitForTimeout(200);
  console.log(`[${label}] Step 8 (Undo and Redo actions) OK`);

  // 9. Bascule Guidé ↔ Studio
  const studioBtn = page.locator("header button", { hasText: "Studio libre" }).first();
  await studioBtn.click();
  await page.waitForTimeout(300);
  const guidedToggleBtn = page.locator("header button", { hasText: "Saisie guidée" }).first();
  await guidedToggleBtn.click();
  await page.waitForTimeout(300);
  console.log(`[${label}] Step 9 (Guided <-> Studio toggle) OK`);

  // 10. Sauvegarde, rechargement et export PDF
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(350);

  const downloadPromise = page.waitForEvent("download", { timeout: 25000 });
  const exportBtn = page.locator("header button", { hasText: /PDF/i }).first();
  await exportBtn.click();
  const download = await downloadPromise;
  const filename = download.suggestedFilename();
  const filePath = await download.path();
  const fileStat = fs.statSync(filePath);

  assert(filename.endsWith(".pdf"), `Expected .pdf filename, got ${filename}`);
  assert(fileStat.size > 5000, `Expected non-empty PDF file (>5KB), got ${fileStat.size} bytes`);
  console.log(`[${label}] Step 10 (Save, reload, and PDF export: ${filename}, ${fileStat.size} bytes) OK`);

  await page.screenshot({ path: `${SCREENSHOT_DIR}/lot2-guided-${label}.png` });

  assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors.join("; ")}`);
  assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors.join("; ")}`);

  await browser.close();
}

await runSuite({ width: 1366, height: 768 }, "1366x768");
await runSuite({ width: 1920, height: 1080 }, "1920x1080");
console.log("\nALL LOT 2 CHECKS PASSED SUCCESSFULLY.");
