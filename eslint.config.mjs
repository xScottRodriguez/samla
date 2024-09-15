import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importHelpers from 'eslint-plugin-import-helpers'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'import-helpers': importHelpers,
      prettier: prettierPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Add JS recommended rules directly
      ...tseslint.configs.recommended.rules, // Add TypeScript recommended rules directly

      'prettier/prettier': 'error', // Enforce Prettier errors
      'spacing-in-parens': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^@shared\\//',
            'module',
            '/^@\\//',
            '/^@root\\//',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]', // If you want to enforce the I prefix for interfaces
            match: true,
          },
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'object-curly-spacing': ['error', 'always'],
      'no-lone-blocks': 'error',
      'no-else-return': 'error',
      'no-return-assign': ['error', 'always'],
      'space-before-blocks': 'error',
      curly: ['error', 'multi'],
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-unused-vars': 'off',
    },
  },
]
