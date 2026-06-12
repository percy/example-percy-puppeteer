# Advanced Percy + Puppeteer example

This directory exercises the full applicable Percy SDK feature surface for `@percy/puppeteer`. See the basic example at the repo root for the minimum integration.

## What this example covers

A single `mocha` test file (`tests/todomvc_advanced.spec.js`) where each `it(...)` block exercises one row of the [Percy SDK Advanced Feature Matrix](../../../docs/advanced-example-feature-matrix.md). Global SDK config — readiness preset, default widths, discovery, browser list — lives in `.percy.yml` and is consumed by every snapshot.

## Run locally

```bash
cd advanced
npm install
export PERCY_TOKEN="<your project token>"      # do NOT commit this
npm run test:advanced
```

To run without a real token (CI assertion mode):

```bash
npm run test:advanced:ci   # uses --testing + PERCY_TOKEN=fake_token
```

The CI variant asserts every matrix row appears in the captured POST bodies at the local `/test/requests` endpoint. No real Percy build is created.

## Coverage matrix

States: `Covered` / `N/A — <reason>` / `Planned` / `Deprecated`. Source of truth is [`matrix.yml`](./matrix.yml); this table is regenerated from it (do not hand-edit).

| Feature | State | Test |
|---|---|---|
| widths | Covered | `exercises widths` |
| percyCSS | Covered | `exercises percyCSS` |
| minHeight | Covered | `exercises minHeight` |
| enableJavaScript | Covered | `exercises enableJavaScript` |
| scope | Covered | `exercises scope` |
| discovery options | Covered | `exercises discovery options` |
| domTransformation | Covered | `exercises domTransformation` |
| responsiveSnapshotCapture | Covered | `exercises responsiveSnapshotCapture` |
| labels | Covered | `exercises labels` |
| testCase | Covered | `exercises testCase` |
| devicePixelRatio | Covered | `exercises devicePixelRatio` |
| regions | Covered | `exercises regions` |
| readiness preset | Covered | `exercises readiness preset` |
| browsers override | Covered | `exercises browsers override` |
| PERCY_SERVER_ADDRESS env | Covered | CI advanced job sets via env |
| `.percy.yml` global config | Covered | consumed by every snapshot |
| environmentInfo / clientInfo | Covered | automatic via `@percy/puppeteer` |
| disableShadowDOM | Planned | — |
| enableLayout | Planned | — |
| reshuffleInvalidTags | Planned | — |
| pseudoClassEnabledElements | Planned | — |
| scopeOptions.scroll | Planned | — |
| cliEnableJavaScript | Planned | — |
| sync mode | Planned | — |
| browserWaitForReady | Planned | — |

## Secrets

Do **not** commit `PERCY_TOKEN`, `.env`, or any project token into this directory. `.gitignore` covers `.env*`. The `PERCY_TOKEN` env var is supplied at runtime by the user locally or by GitHub Actions in CI.
