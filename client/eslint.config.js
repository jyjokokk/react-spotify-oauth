import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import jsxa11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import prettierConfig from 'eslint-config-prettier'

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
      tseslint.configs.strict,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactDom.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: [
          './tsconfig.node.json',
          './tsconfig.app.json',
          './tsconfig.json'
        ],
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'jsx-a11y': jsxa11y
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true
        })
      ],
      'import/resolver': {
        typescript: true,
        node: true
      }
    },
    overrides: [
      {
        files: ['**/*.spec.ts', '**/*.test.ts'],
        rules: {
          'no-console': 'off',
          '@typescript-eslint/no-unused-vars': 'off'
        }
      }
    ],
    rules: {
      ...prettierConfig.rules,
      ...tseslint.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      semi: ['error', 'always'],
      'prettier/prettier': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  },
  reactHooks.configs['recommended-latest'],
  eslintPluginPrettierRecommended
)
