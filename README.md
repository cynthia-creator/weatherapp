# Weather app (Vite + Tailwind CSS + Node.js)

Requires Node 18+.

    npm install
    npm run dev      # Vite (front end) + Express (API) together
    npm run build    # production build into dist/
    npm start        # Express serves dist/ and the API on http://localhost:3000

## Structure
- `src/`        front end (Tailwind, vanilla JS)
- `api/`        `weather.js` and `geocode.js` handlers (proxy Open-Meteo, no API key)
- `server/`     Express server that mounts the handlers and serves `dist/`

## Deploy
- Vercel: Vite preset, build `npm run build`, output `dist`. Files in `api/` become serverless functions automatically; `server/` is only used locally or on a Node host.
- Any Node host (Render, Railway, a VPS): `npm install && npm run build`, then `npm start`.
