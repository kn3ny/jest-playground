module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      "prettier",
      "prettier/@typescript-eslint",
    ],
    "parserOptions": {
        "ecmaVersion": 2019,
    },
    "env": {
        "node": true
    },
  };