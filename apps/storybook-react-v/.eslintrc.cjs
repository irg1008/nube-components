module.exports = {
  extends: ['custom', 'plugin:react-hooks/recommended'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  env: { browser: true, es2020: true },
};
