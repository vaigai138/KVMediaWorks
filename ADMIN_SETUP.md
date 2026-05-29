# KV Media Works — Admin Panel Setup

A WordPress-style admin panel for editing **SEO meta tags** and **uploading/editing blog
posts**, with **zero database**. It uses a *Git-as-CMS* pattern: a single Vercel serverless
function (`api/admin.js`) reads/writes content files to this GitHub repo via the GitHub API.
Every save is a git commit → Vercel auto-redeploys → the change is live in ~60 seconds.

## How it works

```
Admin UI (/admin)  ──fetch──▶  /api/admin (Vercel function)  ──GitHub API──▶  this repo
                                                                                  │
Public site  ◀──static fetch── /content/*.json  ◀──Vercel redeploy on commit ────┘
```

- **Blogs:** `public/content/blog-index.json` (listing) + `public/content/blogs/<slug>.json` (each post). Images go to `public/blog-images/`.
- **SEO meta:** `public/content/page-meta.json` — per-route overrides that win over the built-in defaults in `src/components/SEO.jsx`.
- **Credentials:** `content/admin-credentials.json` (username + bcrypt hash). This is **outside** `public/`, so it is never served to visitors.
- The public site reads the static JSON directly (no API call), so it stays fast.

## One-time deployment (Vercel)

1. **Push this repo to GitHub** (if not already).
2. **Create a GitHub Personal Access Token** with **Contents: Read and write** permission on this repo
   (Fine-grained token → Repository access → this repo → Repository permissions → Contents: Read and write).
3. **Import the repo into Vercel** (New Project → import). Framework preset: **Vite**. Build is automatic (`npm run build`, output `dist`).
4. **Add these Environment Variables** in Vercel (Project → Settings → Environment Variables):

   | Name | Value |
   |------|-------|
   | `GITHUB_TOKEN` | the PAT from step 2 |
   | `GITHUB_REPO` | `owner/repo` (e.g. `vaigai/KVMediaWorks`) |
   | `GITHUB_BRANCH` | `main` |
   | `JWT_SECRET` | a long random string (e.g. `openssl rand -hex 32`) |
   | `ADMIN_USERNAME` | fallback username (only used if the credentials file is missing) |
   | `ADMIN_PASSWORD` | fallback password (only used if the credentials file is missing) |

5. **Point the domain** `kvmediaworks.me` at Vercel (Project → Settings → Domains).
6. Deploy.

## First login

- Go to `https://kvmediaworks.me/admin/login`
- Default credentials (from the seeded `content/admin-credentials.json`):
  - **Username:** `admin`
  - **Password:** `KVmedia@2026`
- **Immediately go to Settings and change the password.**

## Admin routes

| Route | Purpose |
|-------|---------|
| `/admin/login` | Sign in |
| `/admin` | All posts (list / edit / delete) |
| `/admin/new` | Create a post (TipTap rich-text editor) |
| `/admin/edit/:slug` | Edit a post |
| `/admin/seo` | Edit per-page SEO meta tags |
| `/admin/settings` | Change username / password |

## Local development

- `npm run dev` runs the front-end only — the `/api/admin` function will **not** run under plain Vite.
- To test the API locally, install the Vercel CLI and run `vercel dev` (it serves both the SPA and the serverless function). You still need the env vars above (use a `.env` / `vercel env pull`).

## Notes & caveats

- **Social link previews:** meta tags are injected client-side (react-helmet-async). Google renders JS so search is fine, but raw social crawlers (WhatsApp/Facebook/LinkedIn) read the static `index.html` defaults. For per-page social previews, add prerendering/SSR later.
- **GitHub API rate limits:** plenty for normal editing; this isn't built for high-frequency writes.
- `scripts/migrate-content.mjs` was a one-time seeding script (already run). Safe to keep or delete.
- The old hardcoded `src/utils/blogsData.js` is no longer imported by the app (content now lives in `public/content/`). Kept only as a reference for the migration script.
