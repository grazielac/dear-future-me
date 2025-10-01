import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        read: resolve(__dirname, "read/index.html"),
        write: resolve(__dirname, "write/index.html"),
      },
    },
  },
});
