import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // "/" for a user site (wmalikkh.github.io) or a custom domain.
  // For a project repo (wmalikkh.github.io/portfolio) set: base: "/portfolio/",
  base: process.env.VITE_BASE || "/",
  build: { outDir: "dist", assetsDir: "assets" },
});
