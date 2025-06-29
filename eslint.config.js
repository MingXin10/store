import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintPluginPrettierRecommended,
  {
    'plugins': {
      'simple-import-sort': simpleImportSort
    },
    'rules': {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^react', '^@?\\w'], ['^\\.']]
        }
      ]
    }
  },
  {
    plugins: {
      import: eslintPluginImport
    },
    rules: {
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true
        }
      ]
    }
  },
  {
    plugins: {
      react: eslintPluginReact
    },
    rules: {
      'react/prop-types': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          reservedFirst: true
        }
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never'
        }
      ]
    }
  },
  {
    rules: {
      'object-shorthand': 'error',
      'curly': ['error', 'multi-line', 'consistent'],
      'dot-notation': [
        'error',
        {
          allowPattern: '^[a-z0-9]+(_[a-z0-9]+)+$'
        }
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'quote-props': ['error', 'consistent'],
      '@typescript-eslint/no-unused-vars': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'class',
            'function',
            'const',
            'let',
            'return',
            'if',
            'switch',
            'for',
            'while',
            'export'
          ]
        },
        {
          blankLine: 'always',
          prev: [
            'class',
            'function',
            'const',
            'let',
            'return',
            'if',
            'switch',
            'for',
            'while',
            'directive'
          ],
          next: '*'
        },
        {
          blankLine: 'any',
          prev: 'directive',
          next: 'directive'
        }
      ]
    }
  },
  {
    'ignores': ['**/build']
  }
]

export default eslintConfig
