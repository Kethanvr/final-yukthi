# InstaScan MVP

A Next.js prototype for exploring product scans against sample profiles. The app includes profile selection, scan history, category-specific result screens, and a chat-style interface.

This checkout uses mock product data and simulated analysis. It is a UI prototype, not a medical or product-safety service. Do not use its results to make health, medicine, allergy, or purchasing decisions.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The available scripts also include `npm run build`, `npm start`, and `npm run lint`.

## Project layout

- `app/` — App Router pages
- `components/` — shared UI and scan components
- `lib/context/` — app state
- `lib/mockData/` — sample profiles, products, chat, and scan results
- `lib/utils/` — prototype analysis helpers

State and sample data are intended for local prototyping; this repository does not provide a production data service.
