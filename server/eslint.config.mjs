import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintImportPlugin from 'eslint-plugin-import'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules/*',
      'vitest.setup.ts',
      '**.spec.ts',
      '**.test.ts',
      'eslint.config.mjs',
      'jest.config.js'
    ]
  },
  eslintImportPlugin.flatConfigs.recommended,
  eslintImportPlugin.flatConfigs.typescript,
  eslintPluginPrettierRecommended,

  {
    extends: [
      tseslint.configs.recommended,
      // tseslint.configs.strict,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    ignores: [
      'dist',
      'node_modules/*',
      'vitest.setup.ts',
      '**.spec.ts',
      '**.test.ts',
      'eslint.config.mjs',
      'jest.config.js'
    ],
    plugins: {
      js: pluginJs,
      'typescript-eslint': tseslint
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-unresolved': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off'
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    }
  }
)
