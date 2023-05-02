module.exports = {
  extends: ['./'],
  ignorePatterns: '!**/*',
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'lib',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'lib',
            style: 'kebab-case',
          },
        ],
      },
    },
  ],
};
