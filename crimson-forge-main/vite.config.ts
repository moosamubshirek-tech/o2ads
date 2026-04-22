import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      ssr: true,
      rollupOptions: {
        output: {
          entryFileNames: "server/[name].js",
        },
      },
    },
  },
  cloudflare: false,
});