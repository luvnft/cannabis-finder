import { FlatCompat } from '@eslint/eslintrc'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Standard Next.js and Prettier configurations
  ...compat.extends('next/core-web-vitals', 'prettier'),

  // Base rules for all JavaScript and TypeScript files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**'],
    rules: {
      // Enforce consistent import order (turned off since we use prettier-plugin-sort-imports)
      'import/order': 'off',
      // Basic rules
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // TypeScript-specific configuration with type checking
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Turn off base rule to avoid conflicts
      'no-unused-vars': 'off',

      // Enable TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/await-thenable': 'warn',

      // Additional recommended TypeScript rules for improved code quality
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
    },
  },

  // Next.js specific configuration for app directory
  {
    files: ['src/app/**/*.ts', 'src/app/**/*.tsx'],
    rules: {
      // Rules specific to Next.js App Router
      'import/no-default-export': 'off',
    },
  },

  // Component patterns
  {
    files: ['src/components/**/*.tsx'],
    rules: {
      // Rules for component files
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/display-name': 'off',
    },
  },
]

export default eslintConfig
