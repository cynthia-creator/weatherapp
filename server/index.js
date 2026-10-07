import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import weather from "../api/weather.js";
import geocode from "../api/geocode.js";

const app = express();
const PORT = process.env.PORT || 3000;
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "../dist");

app.get("/api/weather", weather);
app.get("/api/geocode", geocode);

// Serves the built front end in production (after `npm run build`).
app.use(express.static(dist));
app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));

app.listen(PORT, () => console.log(`Weather app on http://localhost:${PORT}`));
