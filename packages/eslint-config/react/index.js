module.exports = {
  extends: [
    '../',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'off',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
