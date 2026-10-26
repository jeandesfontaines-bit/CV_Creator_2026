# CV_extractor_2026

CV-only TypeScript extraction toolkit separated from JobPilot for reuse in another project. No job scraping, matching, exclusions, application tracking, user data or uploaded CVs are included. JobPilot itself is unchanged.

## Validation status

The core parser, simplified-output adapter, browser file readers and standalone smoke tests are supplied. Installation, TypeScript checks, tests, build and browser file parsing have NOT been executed in this transfer environment. Do not treat this as a verified release. No lockfile has been generated.

## Setup

Use Node.js 22 or newer, then run:

```sh
npm install
npm run typecheck
npm test
npm run build
```

Keep the generated package-lock.json after validating the installation. The dependency ranges come from the source projects and have not been independently installed here.

## Parse text (Node.js or browser)

```ts
import { parseText, parseCvText } from './src/index.ts';

const detailed = parseText(cvText, 'candidate.txt');
console.log(detailed.identity, detailed.experiences);
console.log(detailed.warnings, detailed.ambiguities, detailed.verification);

const simplified = parseCvText(cvText);
console.log(simplified.experiences, simplified.formations);
```

After building, Node.js can import from ./dist/index.js. In another TypeScript project you can copy src and preserve its relative imports, or install this private repository with credentials and build it before importing its package entry point. There is no automatic install-time build.

## Read a file in a browser app

```ts
import { parseFile } from './src/browser.ts';
const result = await parseFile(fileInput.files![0]!);
```

The original browser adapters use DOMParser, File and a PDF.js worker imported with ?url. Use a Vite-compatible browser bundler, or adapt worker configuration for your own bundler. Browser document parsing has not been validated in this standalone package. The browser subpath exposes TypeScript source; it is not a prebuilt universal browser bundle. Do not import that subpath directly into an ordinary Node.js server.

Readers cover selectable-text PDF, DOCX, ODT, RTF, HTML and text. Legacy .doc is rejected. No OCR is included. The retained file limit is 12 MiB and PDF extraction reads at most 15 pages, reporting truncation. RTF/HTML extraction is heuristic; test representative documents.

## Detailed versus simplified output

parseText / parseLines retain observations, dates, warnings, ambiguities and evidence checks. Verification only checks that extracted evidence occurs in the read text; it does not prove semantic accuracy.

parseCvText is the optional JobPilot-format adapter. It splits names heuristically and uses fallback labels such as Suisse for missing experience locations. It drops much of the detailed warning/evidence information. Prefer the detailed result when those distinctions matter.

## Layout

- src/lib/cv/: core extraction and browser adapters
- src/index.ts: text parsing API and public types
- src/browser.ts: browser file API
- src/cvParser.ts: optional simplified-output adapter
- src/lib/cv/parse.test.ts: focused standalone smoke tests
- src/lib/cv/samples.ts: synthetic smoke-test fixtures

The original upstream regression suite and original sample collection have not been copied in this batch; the smoke tests are deliberately identified as a separate suite and are not a claim of equivalent coverage.

## Provenance and privacy

Core source originates from jeandesfontaines-bit/Jobpilot_official under src/services/Cv-extractor-main/src/lib/cv; the simplified adapter originates from src/services/cvParser.ts. Some formatting was compacted, imports were relocated, and package configuration and smoke tests were added. No third-party license is newly granted by this transfer; check upstream licensing before redistribution.

The parser modules do not upload documents. Your surrounding application controls file handling and storage. Never commit real CVs, extraction results or secrets; .gitignore includes common private file patterns.
