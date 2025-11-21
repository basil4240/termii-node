import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // Apply all recommended TypeScript rules first
  ...tseslint.configs.recommended,

  {
    // Ignore all files in 'dist/' directory and jest.config.cjs
    ignores: ['dist/**/*', 'jest.config.cjs'],
  },

  {
    // Apply specific settings and overrides to TS files
    files: ['src/**/*.ts', 'examples/**/*.ts'], // Exclude tests from main strictness
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      // Temporarily turn off stricter rules for now to get linting clean
      '@typescript-eslint/no-explicit-any': 'error', // Keep error for source code
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-useless-escape': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // Override for test files: allow 'any' for testing flexibility
  {
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow any in test files
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // Explicitly define Jest globals for test files
      },
    },
  },

  // Ensure Prettier is always last to override all formatting rules
  eslintPluginPrettierRecommended,
];
