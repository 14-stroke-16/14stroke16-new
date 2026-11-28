import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" produces relative asset paths so the built bundle works when
// served from Contentful's hosted-app origin.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist" },
});
