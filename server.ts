import express from "express";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const app = express();

async function createServer() {
    if (!isProd) {
        // ✅ Dev: use Vite in middleware mode for SSR
        const { createServer: createViteServer } = await import("vite");
        const vite = await createViteServer({
            root: path.resolve(__dirname),
            server: { middlewareMode: true },
            appType: "custom",
        });

        app.use(vite.middlewares);

        app.use("*all", async (req, res) => {
            try {
                const url = req.originalUrl;
                const { render } = await vite.ssrLoadModule("/src/entry-server.ts");
                const result = await render(url);

                // ✅ Allow result to provide metadata (fallback to defaults)
                const title = result.head?.title || "Vanilla TS SSR";
                const favicon = result.head?.favicon || "/ts.webp";

                let html = `
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${title}</title>
                    <link rel="icon" href="${favicon}" />
                    <link rel="manifest" href="/site.webmanifest" />
                  </head>
                  <body>
                    <div id="app">${result.body}</div>
                    <script type="module" src="/src/entry-client.ts"></script>
                  </body>
                </html>`;

                html = await vite.transformIndexHtml(url, html);
                res.status(200).set({ "Content-Type": "text/html" }).end(html);
            } catch (e) {
                vite.ssrFixStacktrace(e as Error);
                console.error(e as Error);
                res.status(500).end((e as Error).message);
            }
        });
    } else {
        // ✅ Prod: serve built client assets
        const clientDist = path.resolve(__dirname, "./dist/client");
        app.use(express.static(clientDist));

        const serverBundle = await import(
            pathToFileURL(path.resolve(__dirname, "./dist/server/entry-server.js")).href
        );

        let manifest: any = {};
        try {
            const manifestPath = path.resolve(clientDist, ".vite/manifest.json");
            manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
        } catch {
            console.warn("⚠️ No manifest.json found, CSS/JS may not load.");
        }

        app.use("*all", async (req, res) => {
            try {
                const url = req.originalUrl;
                const result = await serverBundle.render(url);

                // ✅ Allow result to provide metadata
                const title = result.head?.title || "Vanilla TS SSR";
                const favicon = result.head?.favicon || "/ts.webp";

                const entry = manifest["src/entry-client.ts"];
                const cssFiles = entry?.css || [];

                const html = `
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${title}</title>
                    <link rel="icon" href="${favicon}" />
                    <link rel="manifest" href="/site.webmanifest" />
                    ${cssFiles.map((f: string) => `<link rel="stylesheet" href="/${f}">`).join("\n")}
                  </head>
                  <body>
                    <div id="app">${result.body}</div>
                    ${entry ? `<script type="module" src="/${entry.file}"></script>` : ""}
                  </body>
                </html>`;

                res.status(200).set({ "Content-Type": "text/html" }).end(html);
            } catch (e: any) {
                console.error(e);
                res.status(500).end(e.message);
            }
        });
    }

    return { app };
}

createServer().then(({ app: serverApp }) => {
    const port = Number(process.env.PORT || 5173);
    serverApp.listen(port, () => {
        console.log(`✅ SSR server running at http://localhost:${port}`);
    });
});
