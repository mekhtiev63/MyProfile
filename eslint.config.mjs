import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Agent/skill tooling — not part of the site runtime
    ".agents/**",
    ".cursor/**",
    "scripts/**",
  ]),
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Dual-mode + spine sync from URL/DOM — intentional mount effects
      "react-hooks/set-state-in-effect": "off",
      // Static export; plain <img> + srcset/WebP is deliberate
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
