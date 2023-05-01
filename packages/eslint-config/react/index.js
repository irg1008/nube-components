module.exports = {
  extends: [
    require.resolve('../'),
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
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
