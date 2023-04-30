module.exports = {
  extends: [
    'turbo',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/template/process-inline-templates',
  ],
  plugins: ['react', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
  },
};
