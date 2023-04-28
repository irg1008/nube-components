module.exports = {
  extends: [
    require.resolve('./index.cjs'),
    'plugin:storybook/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
