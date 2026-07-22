# gen-ai

Interview-prep resources for a software engineer moving into an applied Gen AI role.
Static site — no build step, deploys on Vercel with the **Other** preset.

## Structure

```
├── index.html      # landing page  →  /
├── roadmap.html    # interactive roadmap  →  /roadmap
├── prep.html       # study guide  →  /prep
└── vercel.json     # cleanUrls: true (serves .html without the extension)
```

## Deploy on Vercel

1. Import the repo (`Suhail-Ahm/gen-ai`), branch `main`.
2. **Framework Preset:** `Other`.
3. Leave **Build Command** and **Output Directory** empty — Vercel serves the files as-is.
4. **Root Directory:** `./`
5. Click **Deploy**.

No environment variables are needed. Everything runs client-side.

## Local preview

Just open `index.html` in a browser, or run any static server:

```bash
npx serve .
```
