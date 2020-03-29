module.exports = {
  env: {
    browser: true,
    es6: true,
    es2017: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:node/recommended',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'optimize-regex',
    'sonarjs',
    'promise',
    'prettier',
  ],
  rules: {},
};
