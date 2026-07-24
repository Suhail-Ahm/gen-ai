# gen-ai

An installable **PWA** to take a software engineer from zero to an applied Gen AI role in 8 focused weeks.
Static site — no build step, deploys on Vercel with the **Other** preset.

## What's inside

| Page | URL | What it is |
|------|-----|-----------|
| Hub | `/` | Landing page + live progress + install prompt |
| Study Plan & Tracker | `/plan` | 56 dated day-cards, weekly quizzes, streak & progress tracking |
| Roadmap | `/roadmap` | Interactive dependency-ordered skill tree |
| Study Guide | `/prep` | Concept deep-dives, system design, coding, question bank |

The plan is the spine; the roadmap and guide are referenced on demand. Progress is stored in
`localStorage` on the user's device (nothing is sent anywhere).

## Structure

```
├── index.html            # /        hub
├── plan.html             # /plan    8-week tracker (writes genai_plan_summary the hub reads)
├── roadmap.html          # /roadmap interactive roadmap
├── prep.html             # /prep    study guide
├── manifest.webmanifest  # PWA manifest (name, icons, shortcuts)
├── sw.js                 # service worker — offline app-shell cache
├── favicon.svg           # vector favicon (progress-ring mark)
├── icon-192.png          # PWA icon
├── icon-512.png          # PWA icon (also used maskable)
├── icon-180.png          # apple-touch-icon
└── vercel.json           # cleanUrls + service-worker/manifest headers
```

## PWA

- Installable on Android/desktop (Chrome/Edge show an install button) and iOS (Share → Add to Home Screen).
- Works offline after first visit — the service worker caches the app shell.
- Mobile-first, safe-area aware (notch/home-indicator), theme-aware (light/dark).
- To ship a service-worker update, bump `CACHE` in `sw.js` (e.g. `genai-prep-v2`).

## Deploy on Vercel

1. Import the repo (`Suhail-Ahm/gen-ai`), branch `main`.
2. **Framework Preset:** `Other`. Leave Build Command and Output Directory empty.
3. **Root Directory:** `./` — click **Deploy**.

No environment variables needed. Everything runs client-side.

## Local preview

Service workers need a server (not `file://`):

```bash
npx serve .
```
