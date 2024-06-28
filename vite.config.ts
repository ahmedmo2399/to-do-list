import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "i18next-browser-languagedetector":
        "i18next-browser-languagedetector/dist/cjs/i18nextBrowserLanguageDetector.js",
    },
  },
});
