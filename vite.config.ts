import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/vima-restaurant/",
  server: {
    port: 5173
  }
});
