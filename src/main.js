import "./style.css";

// Weather data comes from our own Node API (/api/*), which proxies Open-Meteo.
const WMO = {
  0: ["Clear", "☀️", "clear"], 1: ["Mostly clear", "🌤️", "clear"], 2: ["Partly cloudy", "⛅", "cloudy"], 3: ["Overcast", "☁️", "cloudy"],
  45: ["Fog", "🌫️", "cloudy"], 48: ["Fog", "🌫️", "cloudy"],
  51: ["Light drizzle", "🌦️", "rain"], 53: ["Drizzle", "🌦️", "rain"], 55: ["Heavy drizzle", "🌧️", "rain"],
  61: ["Light rain", "🌧️", "rain"], 63: ["Rain", "🌧️", "rain"], 65: ["Heavy rain", "🌧️", "rain"],
  71: ["Light snow", "🌨️", "snow"], 73: ["Snow", "❄️", "snow"], 75: ["Heavy snow", "❄️", "snow"],
  80: ["Showers", "🌦️", "rain"], 81: ["Showers", "🌧️", "rain"], 82: ["Heavy showers", "🌧️", "rain"],
  95: ["Thunderstorm", "⛈️", "storm"], 96: ["Thunderstorm", "⛈️", "storm"], 99: ["Thunderstorm", "⛈️", "storm"],
};

const $ = (id) => document.getElementById(id);
let unit = "c";
let data = null;
let city = { name: "Cape Town", country: "South Africa", lat: -33.92, lon: 18.42 };

const conv = (t) => Math.round(unit === "c" ? t : (t * 9) / 5 + 32);

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error("Request failed");
  return r.json();
}

async function load() {
  $("place").textContent = city.name + (city.country ? ", " + city.country : "");
  try {
    data = await getJSON(`/api/weather?lat=${city.lat}&lon=${city.lon}`);
    render();
  } catch {
    $("cond").textContent = "Couldn't load the forecast. Check your connection and try again.";
  }
}

function render() {
  const c = data.current;
  const w = WMO[c.weather_code] || ["Unknown", "🌡️", "cloudy"];

  $("temp").textContent = conv(c.temperature_2m);
  $("unit").textContent = "°" + unit.toUpperCase();
  $("cond").textContent = w[0];
  $("ico").textContent = w[1];
  $("hum").textContent = c.relative_humidity_2m + "%";
  $("wind").textContent =
    Math.round(unit === "c" ? c.wind_speed_10m : c.wind_speed_10m * 0.621) + (unit === "c" ? " km/h" : " mph");
  $("feel").textContent = conv(c.apparent_temperature) + "°";
  $("when").textContent = new Date(c.time).toLocaleString([], { weekday: "long", hour: "numeric", minute: "2-digit" });
  document.body.dataset.sky = w[2] === "clear" ? (c.is_day ? "clear-day" : "clear-night") : w[2];

  const h = data.hourly;
  const i = Math.max(0, h.time.findIndex((t) => t >= c.time.slice(0, 13)));
  $("hours").innerHTML = h.time
    .slice(i, i + 24)
    .map((t, k) => {
      const icon = (WMO[h.weather_code[i + k]] || ["", "🌡️"])[1];
      const label = k ? new Date(t).toLocaleTimeString([], { hour: "numeric" }) : "Now";
      return `<div class="grid min-w-[62px] flex-none gap-1.5 px-1 py-1.5 text-center">
        <span class="text-sm text-white/70">${label}</span><span>${icon}</span><span>${conv(h.temperature_2m[i + k])}°</span></div>`;
    })
    .join("");

  const d = data.daily;
  $("days").innerHTML = d.time
    .slice(1)
    .map((t, k) => {
      const j = k + 1;
      const x = WMO[d.weather_code[j]] || ["", "🌡️"];
      const name = new Date(t + "T12:00").toLocaleDateString([], { weekday: "long" });
      return `<div class="grid grid-cols-[1fr_2rem_auto] items-center gap-3 border-b border-white/30 py-3.5 last:border-0">
        <span>${name}</span><span aria-label="${x[0]}">${x[1]}</span>
        <span>${conv(d.temperature_2m_max[j])}°<span class="ml-2.5 text-white/70">${conv(d.temperature_2m_min[j])}°</span></span></div>`;
    })
    .join("");
}

$("search").addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = $("q").value.trim();
  if (!q) return;
  try {
    const g = await getJSON(`/api/geocode?name=${encodeURIComponent(q)}`);
    if (!g.results) {
      $("cond").textContent = `No city found for "${q}". Try another spelling.`;
      return;
    }
    const r = g.results[0];
    city = { name: r.name, country: r.country || "", lat: r.latitude, lon: r.longitude };
    $("q").value = "";
    load();
  } catch {
    $("cond").textContent = "Search failed. Try again.";
  }
});

for (const u of ["c", "f"]) {
  $(u).addEventListener("click", () => {
    unit = u;
    $("c").setAttribute("aria-pressed", u === "c");
    $("f").setAttribute("aria-pressed", u === "f");
    if (data) render();
  });
}

load();
