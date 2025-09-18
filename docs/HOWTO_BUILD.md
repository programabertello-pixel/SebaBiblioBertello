# How to build (Codespaces / Actions / Local)

## Option A — GitHub Codespaces (quick)
1. Push this repo to GitHub (create new repo and `git push`). 
2. In GitHub UI: Code → Codespaces → Create codespace on main.
3. In Codespace terminal run:
   ```bash
   npm ci
   npm run build:all
   ```
4. Download `apps/client/dist/SebaBiblio.exe` and `apps/console/dist/ConsolaCreador.exe` from the Codespace file explorer.

## Option B — GitHub Actions (automatic)
1. Push to `main`. The workflow `.github/workflows/build.yml` runs on push or manual dispatch.
2. After job completes, download artifacts from Actions → Run → Artifacts.

## Option C — Local Windows build
1. Install Node LTS (https://nodejs.org/), Visual C++ Build Tools if native modules fail.
2. Open PowerShell in repo root.
3. Run `.uild.bat` (this will run `npm ci` and electron-builder).
4. Find results in `apps/client/dist/` and `apps/console/dist/`.

---
Security notes: do not distribute the Console exe publicly. The client will notify the creator only when operator accepts terms at first run.
