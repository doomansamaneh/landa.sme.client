import { defineConfig } from "vite";

export default defineConfig({
  server: {
    hmr: { overlay: true },
  },
  optimizeDeps: {
    include: ["quasar/wrappers"],
  },
});
