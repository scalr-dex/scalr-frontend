import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'node:url'
import { fixupPluginRules } from '@eslint/compat'
import eslintImport from 'eslint-plugin-import'
import globals from 'globals'
import js from '@eslint/js'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import path from 'node:path'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tsParser from '@typescript-eslint/parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/postcss.config.cts',
      '**/vite.config.ts',
      '**/tailwind.config.js',
      '**/lib/*',
      '**/public/scripts/*',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    ignores: ['postcss.config.cts', 'vite.config.ts', 'tailwind.config.js'],
    plugins: {
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': typescriptEslint,
      prettier,
      import: fixupPluginRules(eslintImport),
      'no-relative-import-paths': noRelativeImportPaths,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: globals.node,
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: { project: './tsconfig.json' },
    },

    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: false },
      ],

      '@typescript-eslint/no-floating-promises': 'error',
      'require-await': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          tabWidth: 2,
          semi: false,
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
      'import/prefer-default-export': 'error',
    },
  },
]
