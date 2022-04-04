module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
  },
};
