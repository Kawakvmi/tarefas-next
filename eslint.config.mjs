import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/coverage/**",
      "**/node_modules/**",
      "**/.vercel/**"
    ]
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
      "react-hooks": reactHooks
    },
    settings: { react: { version: "detect" } },
    rules: {
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];
