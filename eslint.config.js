import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
]);

/**
 * ESLint configuration for this project.
 *
 * - Applies ESLint’s recommended JavaScript rules
 * - Targets all JavaScript files in the project
 * - Configured for a Node.js runtime (enables globals like `process`)
 *
 * This uses ESLint’s flat config format (ESLint v9+).
 */
