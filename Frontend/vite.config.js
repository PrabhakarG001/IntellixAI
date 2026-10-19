import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { firebaseBuildConfiguration } from "./src/services/firebaseBuildConfig.js";

export default defineConfig({
  plugins: [react(), tailwindcss(), firebaseBuildConfiguration()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
