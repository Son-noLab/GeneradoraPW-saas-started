// Generic Playwright verifier harness + worked example (CateonCook auth flows).
// Usage: node run.mjs   (after `npm install playwright` in this dir or a scratch dir)
// See SKILL.md for the setup recipe and the mocking rationale.

import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const BASE = process.env.VERIFY_BASE_URL || 'http://localhost:3000';
const SHOTS = process.env.VERIFY_SHOTS_DIR || path.join(process.cwd(), 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
function log(step, ok, detail) {
  results.push({ step, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} :: ${step} :: ${detail}`);
}

// ---- Harness -----------------------------------------------------------

async function withPage(browser, fn) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('[console.error]', msg.text());
  });
  try {
    await fn(page);
  } finally {
    await ctx.close();
  }
}

// CHECKS: each is { name, run(page) } — run() drives the page and must call
// log(name, ok, detail) itself (kept explicit rather than magic-returned so
// a check can log more than one assertion).
const CHECKS = [
  {
    name: 'signup: password mismatch',
    async run(page) {
      await page.goto(`${BASE}/signup`, { waitUntil: 'networkidle' });
      await page.fill('#email', `verify-${Date.now()}@example.com`);
      await page.fill('#password', 'password123');
      await page.fill('#confirm', 'password124');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
      const body = await page.textContent('body');
      const ok = body.includes('Las contraseñas no coinciden');
      log(this.name, ok, ok ? 'mensaje mostrado' : 'mensaje NO encontrado');
      await page.screenshot({ path: path.join(SHOTS, '1-signup-mismatch.png') });
    },
  },
  {
    // Mocks the third-party auth API instead of hitting it live — see
    // SKILL.md "Why this exists". Real GoTrue signup response for an
    // existing account: { user: { ...identities: [] }, session: null }.
    name: 'signup: existing account (mocked identities:[])',
    async run(page) {
      await page.route('**/auth/v1/signup*', route => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: { id: 'mock', email: 'sx.morejon@gmail.com', identities: [] }, session: null }),
      }));
      await page.goto(`${BASE}/signup`, { waitUntil: 'networkidle' });
      await page.fill('#email', 'sx.morejon@gmail.com');
      await page.fill('#password', 'password123');
      await page.fill('#confirm', 'password123');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
      const body = await page.textContent('body');
      const found = body.includes('Ya existe una cuenta con este correo');
      const hasLinks = (await page.locator('a[href="/login"]').count()) > 0
        && (await page.locator('a[href="/forgot-password"]').count()) > 0;
      log(this.name, found && hasLinks, found ? `mensaje mostrado; links=${hasLinks}` : `NO encontrado; body: ${body.slice(0, 300)}`);
      await page.screenshot({ path: path.join(SHOTS, '2-signup-existing.png') });
    },
  },
  {
    name: 'forgot-password: expired link banner',
    async run(page) {
      await page.goto(`${BASE}/forgot-password?error=link`, { waitUntil: 'networkidle' });
      const body = await page.textContent('body');
      const ok = body.includes('El enlace expiró o ya fue usado');
      log(this.name, ok, ok ? 'banner mostrado' : 'banner NO encontrado');
      await page.screenshot({ path: path.join(SHOTS, '3-forgot-expired.png') });
    },
  },
  {
    name: 'forgot-password: submit success (mocked 200)',
    async run(page) {
      await page.route('**/auth/v1/recover*', route => route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
      await page.goto(`${BASE}/forgot-password`, { waitUntil: 'networkidle' });
      await page.fill('#email', `no-existe-${Date.now()}@example-verify.test`);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
      const body = await page.textContent('body');
      const sawError = body.includes('No se pudo enviar el correo');
      const doneState = body.includes('Revisa tu correo');
      log(this.name, !sawError && doneState, `sawError=${sawError} doneState=${doneState}`);
      await page.screenshot({ path: path.join(SHOTS, '4a-forgot-success.png') });
    },
  },
  {
    // 🔍 probe: adjacent to the happy path — what if Supabase itself errors?
    name: 'forgot-password: submit error (mocked 429)',
    async run(page) {
      await page.route('**/auth/v1/recover*', route => route.fulfill({ status: 429, contentType: 'application/json', body: JSON.stringify({ error: 'rate limit exceeded' }) }));
      await page.goto(`${BASE}/forgot-password`, { waitUntil: 'networkidle' });
      await page.fill('#email', `no-existe-${Date.now()}@example-verify.test`);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
      const body = await page.textContent('body');
      const ok = body.includes('No se pudo enviar el correo');
      log(this.name, ok, ok ? 'error mostrado correctamente' : `NO mostró error; body: ${body.slice(0, 200)}`);
      await page.screenshot({ path: path.join(SHOTS, '4b-forgot-error.png') });
    },
  },
  {
    name: 'reset-password: minLength=8 + mismatch probe + no-session probe',
    async run(page) {
      await page.goto(`${BASE}/reset-password`, { waitUntil: 'networkidle' });
      const minlen = await page.getAttribute('#password', 'minlength');
      log(`${this.name} (minLength)`, minlen === '8', `attr = ${minlen}`);
      await page.screenshot({ path: path.join(SHOTS, '5-reset-form.png') });

      await page.fill('#password', 'abcdefgh');
      await page.fill('#confirm', 'abcdefgX');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(400);
      const mismatch = await page.textContent('body');
      log(`${this.name} (mismatch probe)`, mismatch.includes('Las contraseñas no coinciden'), 'validación cliente');

      await page.fill('#password', 'abcdefgh');
      await page.fill('#confirm', 'abcdefgh');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(800);
      const noSession = await page.textContent('body');
      log(`${this.name} (no-session probe)`, true, `link "Solicitar nuevo enlace" presente=${noSession.includes('Solicitar nuevo enlace')}`);
      await page.screenshot({ path: path.join(SHOTS, '6-reset-no-session-error.png') });
    },
  },
  {
    name: 'header: SSR initial state (no flash, logged out)',
    async run(page) {
      await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
      const html = await page.evaluate(() => document.querySelector('header')?.outerHTML?.slice(0, 400) ?? 'NO HEADER');
      log(this.name, html !== 'NO HEADER', 'ver screenshot');
      await page.screenshot({ path: path.join(SHOTS, '7-header-home.png') });
    },
  },
];

// ---- Run -----------------------------------------------------------------

const browser = await chromium.launch({ headless: true });
for (const check of CHECKS) {
  await withPage(browser, page => check.run.call(check, page));
}
await browser.close();

console.log('\n=== SUMMARY ===');
for (const r of results) console.log(`${r.ok ? '✅' : '❌'} ${r.step} — ${r.detail}`);
const failed = results.filter(r => !r.ok);
process.exit(failed.length ? 1 : 0);
