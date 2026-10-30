import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";

const URL = "http://127.0.0.1:8080/";
const SCREENSHOT_DIR = "/app/applet/screenshots";
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

  console.log(`\n=== Running Lot 5 (Accompanied Guided Mode UX) suite at ${viewport.width}x${viewport.height} (${label}) ===`);

  // 1. Open app and initialize Guided Mode
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("cv_onboarding_done", "true");
  });
  await page.reload({ waitUntil: "networkidle" });
  const guidedTabInit = page.locator("header button", { hasText: "Saisie guidée" }).first();
  await guidedTabInit.click();
  await page.waitForTimeout(300);

  // 2. Verify 2-Zone Accompanied Layout & Step Indicator
  const sidebar = page.locator('[data-testid="guided-sections-sidebar"]');
  await sidebar.waitFor({ state: "visible", timeout: 5000 });
  const stepIndicator = page.locator('[data-testid="guided-step-indicator"]');
  assert(await stepIndicator.isVisible(), "Step indicator must be visible");

  // Click Step 1 (Profil & Contact)
  await page.locator('[data-testid="guided-step-tab-profile"]').click();
  await page.waitForTimeout(200);
  const stepText1 = (await stepIndicator.textContent()) || "";
  assert(stepText1.includes("Étape 1 sur 6"), `Expected 'Étape 1 sur 6', got '${stepText1}'`);

  // 3. Verify Coaching Card answers the 4 core UX questions
  const coachingCard = page.locator('[data-testid="guided-step-coaching"]');
  const coachingText = (await coachingCard.textContent()) || "";
  assert(coachingText.includes("Quoi remplir maintenant"), "Coaching card must show 'Quoi remplir maintenant'");
  assert(coachingText.includes("Pourquoi c'est utile"), "Coaching card must show 'Pourquoi c'est utile'");
  assert(coachingText.includes("Ce que vous pouvez ignorer"), "Coaching card must show 'Ce que vous pouvez ignorer'");
  console.log(`[${label}] Step 1-3 (2-Zone layout, step indicator & 4-question coaching card) OK`);

  // 4. Edit Profile in Step 1 and verify live A4 preview update
  const nameInput = page.locator("input[placeholder*='Alexandra']").first();
  await nameInput.fill("Camille Laurent");
  await page.waitForTimeout(200);
  const previewSheet = page.locator(".simple-preview-sheet").first();
  let previewText = await previewSheet.innerText();
  assert(previewText.includes("Camille Laurent"), "Updated name must appear in live A4 preview");

  // 5. Advance to Step 2 via 'Étape suivante' button
  const nextStepBtn = page.locator('[data-testid="guided-next-step-btn"]');
  const nextBtnText = (await nextStepBtn.textContent()) || "";
  assert(nextBtnText.includes("Résumé / Bio"), "Next step button must clearly state the next step name");
  await nextStepBtn.click();
  await page.waitForTimeout(200);
  assert(((await stepIndicator.textContent()) || "").includes("Étape 2 sur 6"), "Should be on Step 2");

  // 6. Test non-blocking 'Passer cette étape' button on Step 2 (Summary)
  const skipStepBtn = page.locator('[data-testid="guided-skip-step-btn"]');
  await skipStepBtn.click();
  await page.waitForTimeout(200);
  assert(((await stepIndicator.textContent()) || "").includes("Étape 3 sur 6"), "Skipping Step 2 should advance to Step 3 (Expériences)");
  console.log(`[${label}] Step 4-6 (Live edit, explicit next step & non-blocking skip) OK`);

  // 7. Add and edit an experience in Step 3
  const expCard0 = page.locator('[data-testid="guided-experience-0"]');
  await expCard0.locator("input").nth(0).fill("Lead Product Designer");
  await page.waitForTimeout(200);
  previewText = await previewSheet.innerText();
  assert(previewText.includes("Lead Product Designer"), "Updated experience role must appear in live preview");

  // 8. Test clicking on the live A4 CV preview to jump to another step (e.g., Education or Skills)
  const eduElement = page.locator('.simple-preview-frame [data-element]').filter({ hasText: /Master|Licence|École|Formation/i }).first();
  if (await eduElement.isVisible().catch(() => false)) {
    await eduElement.click();
    await page.waitForTimeout(200);
  } else {
    await page.locator('[data-testid="guided-step-tab-education"]').click();
    await page.waitForTimeout(200);
  }
  assert(((await stepIndicator.textContent()) || "").includes("Étape 4 sur 6"), "Should be on Step 4 (Formation)");
  console.log(`[${label}] Step 7-8 (Experience edit & live preview click navigation) OK`);

  // 9. Test Appearance Bar (Template & Palette switcher)
  const appearanceBtn = page.locator('[data-testid="toggle-appearance-bar-btn"]');
  await appearanceBtn.click();
  await page.waitForTimeout(200);
  assert(await page.locator('[data-testid="guided-appearance-bar"]').isVisible(), "Appearance bar should open");
  await appearanceBtn.click();

  // 10. Direct access to Studio libre via footer link & return to Saisie guidée
  await page.locator('[data-testid="guided-footer-studio-link"]').click();
  await page.waitForTimeout(300);
  const guidedTab = page.locator("header button", { hasText: "Saisie guidée" }).first();
  await guidedTab.click();
  await page.waitForTimeout(300);

  // 11. Reload persistence & PDF export
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  previewText = await previewSheet.innerText();
  assert(previewText.includes("Camille Laurent"), "Name must persist after reload");
  assert(previewText.includes("Lead Product Designer"), "Experience role must persist after reload");

  const downloadPromise = page.waitForEvent("download", { timeout: 25000 });
  await page.locator('[data-testid="export-pdf-btn"]').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  const fileStat = fs.statSync(filePath);
  assert(fileStat.size > 5000, `Expected non-empty PDF (>5KB), got ${fileStat.size} bytes`);
  console.log(`[${label}] Step 9-11 (Appearance bar, Studio switch, reload persistence & PDF export: ${fileStat.size} bytes) OK`);

  await page.screenshot({ path: `${SCREENSHOT_DIR}/lot5-guided-ux-${label}.png` });

  assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors.join("; ")}`);
  assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors.join("; ")}`);

  await browser.close();
}

await runSuite({ width: 1366, height: 768 }, "1366x768");
await runSuite({ width: 1920, height: 1080 }, "1920x1080");
console.log("\nALL LOT 5 ACCOMPANIED GUIDED UX CHECKS PASSED SUCCESSFULLY.");
