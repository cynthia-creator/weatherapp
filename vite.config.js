import { defineConfig } from "vite";

// In dev, forward /api calls to the Node server.
export default defineConfig({
  server: { proxy: { "/api": "http://localhost:3000" } },
});
