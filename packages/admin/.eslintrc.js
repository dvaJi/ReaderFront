module.exports = {
  extends: ['plugin:prettier/recommended', 'react-app'],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
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
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  }
};
