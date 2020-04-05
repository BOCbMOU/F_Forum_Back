module.exports = {
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',

    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-identical-functions': 'off',

    'node/no-unpublished-import': [
      'error',
      {
        allowModules: ['jest', 'jsonfile', 'superagent-mock'],
      },
    ],
  },
};
