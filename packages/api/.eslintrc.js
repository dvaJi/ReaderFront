module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ],
    eqeqeq: ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }]
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  }
};
