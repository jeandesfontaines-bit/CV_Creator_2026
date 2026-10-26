import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseText, parseLines } from './parse.ts';
import { parseCvText } from '../../cvParser.ts';
import { SAMPLES } from './samples.ts';
import { findDateRanges } from './dates.ts';
import { plainLine, includesPhrase, fold } from './text.ts';
import { parseIdentity } from './identity.ts';

// Standalone smoke tests. These are not a copy of the entire upstream suite.
describe('standalone CV extraction smoke tests', () => {
  it('preserves empty text and reports a warning', () => {
    const cv = parseText('');
    assert.equal(cv.sourceText, '');
    assert.equal(cv.identity.fullName, null);
    assert.ok(cv.warnings.some(w => w.code === 'file.empty'));
  });
  it('extracts explicit identity and contact without inventing values', () => {
    const cv = parseText('Nom : Camille Laurent\nPoste recherché : Développeuse fullstack\ncamille@example.com\n+33 6 18 42 77 05');
    assert.equal(cv.identity.fullName?.text, 'Camille Laurent');
    assert.equal(cv.identity.headline?.text, 'Développeuse fullstack');
    assert.equal(cv.identity.emails[0]?.text.text, 'camille@example.com');
    assert.equal(cv.identity.phones.length, 1);
    assert.equal(cv.verification.ok, true, cv.verification.errors.join('\n'));
  });
  it('retains open-ended dates without inserting the current year', () => {
    for (const text of ['janvier 2021 – aujourd’hui', 'March 2022 – Present', 'März 2019 – heute']) {
      const range = findDateRanges(text).find(r => r.isRange);
      assert.ok(range, text);
      assert.equal(range.openEnded, true);
      assert.equal(range.end, null);
    }
  });
  it('parses sample CVs and preserves observed evidence', () => {
    for (const fixture of SAMPLES) {
      const cv = parseText(fixture.text, fixture.filename);
      assert.equal(cv.meta.filename, fixture.filename);
      assert.equal(cv.verification.ok, true, cv.verification.errors.join('\n'));
      assert.ok(cv.experiences.length > 0, fixture.id);
      assert.ok(cv.education.length > 0, fixture.id);
    }
  });
  it('supports the optional simplified-output adapter', () => {
    const profile = parseCvText('Nom : Camille Laurent\ncamille@example.com');
    assert.equal(profile.first_name, 'Camille');
    assert.equal(profile.last_name, 'Laurent');
    assert.equal(profile.email, 'camille@example.com');
    assert.ok(Array.isArray(profile.experiences));
    assert.ok(Array.isArray(profile.formations));
  });
  it('requires word boundaries in lexical phrases', () => {
    assert.equal(includesPhrase(fold('TypeScript'), fold('TypeScript')), true);
    assert.equal(includesPhrase(fold('JavaScript'), fold('Java')), false);
  });
  it('reports PDF text absence and truncation independently', () => {
    const cv = parseLines({ filename: 'scan.pdf', format: 'pdf', lines: [], truncated: true });
    assert.ok(cv.warnings.some(w => w.code === 'pdf.no-text'));
    assert.ok(cv.warnings.some(w => w.code === 'pdf.truncated'));
  });
  it('parses labeled nationality', () => {
    const line = plainLine('Nationalité : Suisse');
    const result = parseIdentity([{ kind: 'header', heading: null, lines: [line], confidence: 'high' }], [line]);
    assert.equal(result.identity.facts.find(f => f.label === 'Nationalité')?.value.text, 'Suisse');
  });
});
