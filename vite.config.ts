import { defineConfig, loadEnv, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

const OUTPUT_DIR = "dist";

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const define = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [
      `import.meta.env.${key}`,
      JSON.stringify(value),
    ]),
  );

  const plugins = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      server: { entry: "server" },
    }),
    ...(command === "build"
      ? [
          nitro(
            process.env["VERCEL"]
              ? { preset: "vercel" }
              : {
                  preset: "cloudflare-module",
                  output: {
                    dir: OUTPUT_DIR,
                    serverDir: `${OUTPUT_DIR}/server`,
                    publicDir: `${OUTPUT_DIR}/client`,
                  },
                  cloudflare: { nodeCompat: true, deployConfig: true },
                },
          ),
        ]
      : []),
    react(),
  ];

  return {
    define,
    plugins,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      hmr: { overlay: false },
      watch: {
        ignored: [
          "**/.workspace/**",
          "**/.tanstack/tmp/**",
          "**/node_modules/**",
        ],
      },
    },
  };
});
