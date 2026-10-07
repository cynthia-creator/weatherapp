export default async function handler(req, res) {
  const name = String(req.query.name || "").trim();
  if (!name) return res.status(400).json({ error: "name is required" });
  try {
    const r = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`
    );
    if (!r.ok) throw new Error("upstream " + r.status);
    res.setHeader("Cache-Control", "s-maxage=86400");
    res.status(200).json(await r.json());
  } catch {
    res.status(502).json({ error: "Geocoding service unavailable" });
  }
}
