import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const URL = process.env.CV_TEST_URL || "http://127.0.0.1:8080/";
const DIR = process.env.CV_SCREENSHOT_DIR || path.resolve("screenshots");
fs.mkdirSync(DIR, { recursive: true });
const DOC_KEY = "libre-cv-doc-v1";
const META_KEY = "libre-cv-meta-v1";
const source = fs.readFileSync(new URL("../src/components/studio/SimpleEditor.tsx", import.meta.url), "utf8");
assert(!source.includes("getRandomBoost"), "Guided editor must not import or call random factual boosts");
assert(!source.includes("Nouvelle réalisation impactante"), "Placeholder claims must not be saved as candidate content");

async function suite(viewport) {
  const label = `${viewport.width}x${viewport.height}`;
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport, acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  const readDoc = () => page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "null"), DOC_KEY);
  const waitDoc = (predicate, arg) => page.waitForFunction(predicate, arg);
  const step = (id) => page.getByTestId(`guided-step-tab-${id}`).click();
  const workspace = page.getByRole("region", { name: "Saisie accompagnée", exact: true });
  const preview = page.getByRole("region", { name: "Aperçu du CV", exact: true });
  let passed = 0;
  const ok = (name) => { passed++; console.log(`[${label}] PASS ${name}`); };
  try {
    // Fresh isolated context: only seed navigation preferences, never overwrite a user's stored CV.
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.evaluate(({ meta }) => {
      localStorage.setItem("cv_onboarding_done", "true");
      localStorage.setItem(meta, JSON.stringify({ editorMode: "guided", activeTemplate: "modern", layoutCustomized: false }));
    }, { meta: META_KEY });
    await page.reload({ waitUntil: "networkidle" });
    await workspace.waitFor({ state: "visible" });
    assert.equal(await page.getByRole("navigation", { name: "Étapes du CV" }).getByRole("button").count(), 6);
    assert.match(await page.getByTestId("guided-step-indicator").innerText(), /Étape 1 sur 6/);
    assert.equal(await page.getByRole("navigation", { name: "Étapes du CV" }).getByRole("button", { name: /Masquer|Monter|Descendre/ }).count(), 0);
    ok("Six steps; no composition controls in navigation");

    const name = workspace.getByLabel("Nom et prénom", { exact: true });
    await name.fill("Camille Test CV");
    await name.blur();
    await waitDoc((key) => JSON.parse(localStorage.getItem(key) || "null")?.profile.name === "Camille Test CV", DOC_KEY);
    assert.match(await preview.innerText(), /Camille Test CV/);
    ok("Contact edit updates preview and saved profile");

    await workspace.getByRole("button", { name: "Continuer →", exact: true }).click();
    assert.match(await page.getByTestId("guided-step-indicator").innerText(), /Étape 2 sur 6/);
    await workspace.getByRole("button", { name: "Passer", exact: true }).click();
    assert.match(await page.getByTestId("guided-step-indicator").innerText(), /Étape 3 sur 6/);
    ok("Continue and Skip navigate without required-field blocking");

    const cards = page.locator('[data-testid^="guided-experience-"]');
    assert(await cards.count() > 0, "Fixture must contain an experience");
    assert.equal(await workspace.locator('button[aria-expanded="true"]').count(), 1);
    if (await cards.count() > 1) {
      await cards.nth(1).getByRole("button").first().click();
      assert.equal(await workspace.locator('button[aria-expanded="true"]').count(), 1);
      await cards.first().getByRole("button").first().click();
    }
    const description = workspace.getByLabel("Quelles étaient vos missions ou réalisations ?", { exact: true });
    const original = "Maintenance du produit avec TypeScript ; résultat vérifié : 12 incidents résolus.";
    await description.fill(original);
    await description.blur();
    await workspace.getByRole("button", { name: "+ Ajouter une réalisation", exact: true }).click();
    assert.equal(await description.inputValue(), `${original}\n• `);
    const afterAdd = await readDoc();
    assert.equal(afterAdd.profile.experiences[0].desc, `${original}\n• `);
    ok("Accordion opens one entry; adding a bullet inserts no invented fact");

    await page.getByRole("button", { name: "Annuler", exact: true }).click();
    assert.equal(await description.inputValue(), original);
    await page.getByRole("button", { name: "Rétablir", exact: true }).click();
    assert.equal(await description.inputValue(), `${original}\n• `);
    ok("Undo and redo restore exact candidate text");

    await step("abilities");
    await workspace.getByLabel("Vos compétences", { exact: true }).fill("TypeScript, Analyse");
    await workspace.getByLabel("Vos compétences", { exact: true }).blur();
    assert.deepEqual((await readDoc()).profile.skills, ["TypeScript", "Analyse"]);
    assert(await workspace.getByRole("heading", { name: "Langues", exact: true }).isVisible());
    ok("Skills and languages share one step; skills are preserved");

    await step("finish");
    assert.match(await page.getByTestId("guided-step-indicator").innerText(), /Étape 6 sur 6/);
    assert(await workspace.getByRole("heading", { name: "Apparence", exact: true }).isVisible());
    await workspace.getByRole("button", { name: /^Organiser les sections/ }).click();
    assert(await workspace.getByRole("button", { name: /Monter/ }).count() > 0);
    assert(await page.getByTestId("open-readability-btn").isVisible());
    assert(await page.getByTestId("open-plain-text-btn").isVisible());
    ok("Finalization contains appearance, section organization and document checks");

    const beforeStudio = await readDoc();
    await page.locator("header").getByRole("button", { name: "Studio libre ↗", exact: true }).click();
    await page.getByRole("tab", { name: "Saisie guidée", exact: true }).click();
    await workspace.waitFor({ state: "visible" });
    assert.deepEqual(await readDoc(), beforeStudio, "Mode switch must preserve document and geometry");
    await page.reload({ waitUntil: "networkidle" });
    await workspace.waitFor({ state: "visible" });
    const restored = await readDoc();
    assert.equal(restored.profile.name, "Camille Test CV");
    assert.equal(restored.profile.experiences[0].desc, `${original}\n• `);
    assert.deepEqual(restored.profile.skills, ["TypeScript", "Analyse"]);
    ok("Guided/Studio round trip and reload preserve candidate content");

    await step("finish");
    await page.screenshot({ path: path.join(DIR, `lot5-finaliser-${label}.png`) });
    await step("experience");
    await page.screenshot({ path: path.join(DIR, `lot5-experiences-${label}.png`) });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, "No horizontal document overflow");
    assert.deepEqual(errors, [], `Browser errors: ${errors.join("; ")}`);
    ok("Screenshots saved; no horizontal document overflow or browser error");
    console.log(`[${label}] ${passed} grouped checks passed. PDF export, multi-page and import must also be checked with their dedicated regression suites.`);
  } catch (error) {
    await page.screenshot({ path: path.join(DIR, `lot5-failure-${label}.png`) }).catch(() => {});
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

await suite({ width: 1366, height: 768 });
await suite({ width: 1920, height: 1080 });
console.log("Lot 5 revised workflow checks completed.");
