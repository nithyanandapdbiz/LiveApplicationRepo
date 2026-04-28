# Automation POC — Landing Page

A minimal single-page React landing site, built as a **proof of concept** to demonstrate end-to-end automation capability (CI/CD, deployment, observability).

The intent is **not** to ship a real product — it's to give the automation pipeline something real to build, deploy, and monitor.

---

## Stack

- **React 18** (single-file component)
- **Vite** for dev server + build
- **Plain CSS** (no framework, no preprocessor) — fonts via Google Fonts

No backend. No database. Pure static output after `npm run build`.

---

## Project Structure

```
automation-poc/
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI: build + deploy to GitHub Pages
├── index.html              # Vite entry
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx            # React bootstrap
    ├── App.jsx             # The landing page (single-file component)
    └── styles.css
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
# install dependencies
npm install

# start dev server (opens http://localhost:3000)
npm run dev

# create production build (output: ./dist)
npm run build

# preview production build locally
npm run preview
```

---

## CI / CD Pipeline

This repo includes a GitHub Actions workflow at **`.github/workflows/deploy.yml`** that:

1. Triggers on every push to `main` (also runnable manually from the Actions tab)
2. Installs dependencies with `npm ci`
3. Builds the production bundle (`npm run build`)
4. Deploys the `dist/` folder to **GitHub Pages**

### One-time setup on GitHub

After pushing the repo, enable Pages so the workflow has a target:

1. Go to **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. Push to `main` (or click **Run workflow** in the Actions tab) — the site goes live at:

```
https://<your-username>.github.io/<repo-name>/
```

### How it works

- The workflow injects `VITE_BASE_PATH=/<repo-name>/` at build time so all asset paths resolve correctly under the Pages subpath.
- Locally, `vite.config.js` falls back to `/`, so `npm run dev` keeps working as normal.
- The `build` and `deploy` jobs are split — easy to extend later with a `test` or `lint` job in between.

### Pipeline status

Once pushed, you can add a status badge to the top of this README:

```markdown
![Deploy](https://github.com/<user>/<repo>/actions/workflows/deploy.yml/badge.svg)
```

---

## Pushing to Git

If you haven't initialized a repo yet:

```bash
git init
git add .
git commit -m "chore: initial commit — automation POC landing page"

# create a repo on GitHub/GitLab/Bitbucket, then:
git remote add origin <YOUR_REMOTE_URL>
git branch -M main
git push -u origin main
```

For subsequent pushes:

```bash
git add .
git commit -m "feat: <your message>"
git push
```

---

## What This POC Demonstrates

The page itself is intentionally simple. The value is in everything **around** it — the pipeline that takes this code from `git push` to a live URL without manual steps.

Hooking this up to your automation stack typically means:

1. A CI job that runs `npm install` + `npm run build` on every push
2. An artifact (the `dist/` folder) published to your hosting target (S3, Netlify, Vercel, GitHub Pages, etc.)
3. A deployment step that promotes the artifact to the live environment
4. Optional: smoke tests, lighthouse checks, or notifications on success/failure

---

## License

Internal POC — no license attached. Adjust as appropriate for your organization.
