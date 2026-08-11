import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local agent worktrees + generated tooling artifacts. `npm run lint` runs
    // bare `eslint`, which recurses the whole tree; without these it lints the
    // full checkouts under .claude/worktrees and reports thousands of phantom
    // errors. None of these are reviewable source. (Mirror in .gitignore.)
    ".claude/**",
    ".seo-god/**",
    "dist/**",
    "seo-god.json",
  ]),
]);

export default eslintConfig;
