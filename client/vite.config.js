import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        read: resolve(__dirname, "about/index.html"),
        write: resolve(__dirname, "about/index.html"),
      },
    },
  },
});
