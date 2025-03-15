import js from '@eslint/js'
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// /** @type {import('eslint').Linter.Config} */
// export default [
//   {
//     files: ["**/*.{js,mjs,cjs,ts}"],
//     languageOptions: { globals: globals.browser },
//     ...pluginJs.configs.recommended,
//     ...tseslint.config({
//       parserOptions: {
//         project: "./tsconfig.json", // Adjust the path to your tsconfig.json if necessary
//       },
//     }),
//   },
// ];
export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules/*',
      'vitest.setup.ts',
      '**.spec.ts',
      '**.test.ts'
    ]
  },

  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.strict,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname
    },
    plugins: {
      'js': pluginJs,
      'typescript-eslint': tseslint,
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  eslintPluginPrettierRecommended
)
