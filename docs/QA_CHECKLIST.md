QA checklist:
- Codespaces: npm run build:all produces apps/client/dist and apps/console/dist
- First run: legal acceptance required; if not accepted app exits
- If accepted: registration saved and creator notified via tlk.io (puppeteer)
- Loan/return IPC operations work
- Importers read Excel and CSV
- Llama3 hook returns placeholder unless API key configured
