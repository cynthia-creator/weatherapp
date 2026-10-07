// Works as a Vercel serverless function AND is mounted by the Express server.
export default async function handler(req, res) {
  const { lat, lon } = req.query;
  if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) {
    return res.status(400).json({ error: "lat and lon are required numbers" });
  }
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day` +
    `&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=auto&forecast_days=6`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error("upstream " + r.status);
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(await r.json());
  } catch {
    res.status(502).json({ error: "Weather service unavailable" });
  }
}
