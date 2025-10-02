import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { TSFilebasedRouter } from "@devwareng/vanilla-ts";
import { checker } from "vite-plugin-checker"

export default defineConfig(({ command }) => {
    const isBuild = command === "build";
    const isNode = typeof process !== "undefined" && process.versions?.node;

    return {
        plugins: [
            tailwindcss(),
            checker({ typescript: true }),
            ...(isNode ? [TSFilebasedRouter()] : []), // ✅ only add router in Node
        ],
        resolve: {
            alias: { "@": path.resolve(__dirname, "src") },
        },
        build: {
            manifest: true, // ✅ always generate manifest.json
            outDir: isBuild ? "dist/client" : ".vite", // ✅ prod → dist/client, dev → .vite
            emptyOutDir: true,
            rollupOptions: {
                input: path.resolve(__dirname, "src/entry-client.ts"),
                external: [
                    "fs",
                    "fs/promises",
                    "os",
                    "stream",
                    "events",
                    "node:path",
                    "node:fs/promises",
                    "node:stream",
                    "path",
                ],
            },
        },
        ssr: {
            noExternal: ["@devwareng/vanilla-ts"], // ✅ keep bundled for server
        },

    };
});
