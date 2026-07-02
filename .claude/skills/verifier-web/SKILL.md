---
name: verifier-web
description: Playwright headless-browser verifier for this Next.js app. Auto-discovered by the `verify` skill (it runs `ls .claude/skills/` and picks a matching `verifier-*`). Use for any change whose surface is the browser — pages, forms, auth flows, client components.
---

# verifier-web

Drives the real app in headless Chromium and reports what actually
rendered. Copy this whole folder into any other project's
`.claude/skills/verifier-web/` to get the same capability there —
only `BASE_URL` and the per-project check list need to change.

## Why this exists

Background/sandboxed sessions often cannot resolve third-party API
subdomains (confirmed here: `*.supabase.co` fails DNS even via
`8.8.8.8` directly, while the bare root domain and unrelated hosts
resolve fine — it's an egress allowlist, not a real outage). Two
consequences drive this design:

1. **Don't trust "it failed" at face value.** Before blaming the app,
   prove the network is actually reachable: `curl` the literal
   third-party root domain, then a random nonexistent subdomain of it.
   If the random one also fails to resolve, it's the sandbox, not the
   backend.
2. **Mock the third-party network calls with `page.route()` instead of
   hitting them live.** This is strictly better even with network
   access: deterministic, doesn't burn real rate limits (e.g. email
   sending quotas), works identically in CI and in a sandboxed agent
   session. Only test client logic that reacts to a response — not
   whether the third party itself is up.

## Setup (first run in a project)

Playwright's browsers are large; install once, reuse forever via the
global cache (`~/AppData/Local/ms-playwright` on Windows /
`~/.cache/ms-playwright` on Linux/Mac) — subsequent installs across
*any* project skip the download if the same version is already cached.

```bash
npx --yes playwright install chromium --with-deps
```

Then, in a scratch dir (do **not** add `playwright` to the target
project's `package.json` — this is a verification tool, not a
project dependency):

```bash
mkdir -p /tmp/verifier-web-scratch && cd /tmp/verifier-web-scratch
npm init -y && npm install playwright
```

Copy `run.mjs` from this folder next to that `node_modules`, edit the
`CHECKS` array for the current diff, then:

```bash
node run.mjs
```

## Writing checks

Each check is one `{ name, run(page) }` entry. Inside `run`:

- `page.route('**/some-third-party-domain/**', route => route.fulfill({...}))`
  to mock any external API call *before* `page.goto`.
- Drive it exactly like a user: `page.fill`, `page.click`.
- Assert on rendered text (`page.textContent('body')`), not on
  internal state.
- Always `page.screenshot({ path })` — the screenshot is the evidence,
  not the console log.
- Include at least one 🔍 probe per flow: wrong input, error response
  mocked instead of success, double-submit, etc.

See `run.mjs` in this folder for the worked example against
CateonCook's auth flows (signup mismatch/existing-account, forgot-password
expired-link/success/error, reset-password minLength + no-session
submit, header SSR check) — use it as the template.

## Report format

Follow the parent `verify` skill's report format exactly (PASS/FAIL/
BLOCKED/SKIP, Steps with ✅/❌/⚠️/🔍, Findings). This skill only
supplies the *handle* (how to drive the browser) — the report
contract is the `verify` skill's.
