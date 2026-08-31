import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// A separate client-only build; the existing Sites/Worker build stays intact.
export default defineConfig({
  base: "/next-week-funeral/",
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  build: { outDir: "pages-dist", emptyOutDir: true, sourcemap: false },
});
