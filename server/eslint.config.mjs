import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintImportPlugin from 'eslint-plugin-import'
import eslintJestPlugin from 'eslint-plugin-jest'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules/*',
      'vitest.setup.ts',
      '**.spec.ts',
      '**.test.ts',
      'eslint.config.mjs',
      'jest.config.js',
      'coverage/*'
    ]
  },
  eslintImportPlugin.flatConfigs.recommended,
  eslintImportPlugin.flatConfigs.typescript,
  eslintPluginPrettierRecommended,

  {
    extends: [
      tseslint.configs.recommended,
      tseslint.configs.strict,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked
    ],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      },
      globals: eslintJestPlugin.environments.globals.globals
    },
    ignores: [
      'dist',
      'node_modules',
      'node_modules/**/*',
      'vitest.setup.ts',
      '**.spec.ts',
      '**.test.ts',
      'eslint.config.mjs',
      'jest.config.js'
    ],
    plugins: {
      jest: eslintJestPlugin,
      js: pluginJs,
      'typescript-eslint': tseslint
    },
    rules: {
      'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
      'import/no-unresolved': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'warn',
      'jest/no-disabled-tests': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn'
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
