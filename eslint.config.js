const rnConfig = require('@react-native/eslint-config/flat');

module.exports = [
  ...rnConfig,
  {
    ignores: [
      'node_modules/',
      'android/',
      'ios/',
      'vendor/',
      'coverage/',
      // Project uses TypeScript; Flow plugin in RN preset chokes on plain .js
      // (config files + RN entry which must stay .js for the Gradle plugin).
      '*.config.js',
      'eslint.config.js',
      '.prettierrc.js',
      'index.js',
    ],
  },
];
