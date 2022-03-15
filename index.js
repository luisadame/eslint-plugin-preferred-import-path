'use strict';

const rules = {
  'preferred-import-path': require('./lib/rules/preferred-import-path'),
};

module.exports = {
  rules,
  configs: {
    recommended: {
      plugins: ['preferred-import-path'],
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    all: {
      plugins: ['preferred-import-path'],
      parserOptions: {
        ecmaVersion: 6,
      },
      rules,
    },
  },
};
