module.exports = {
  extends: ['plugin:prettier/recommended', 'react-app'],
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
        trailingComma: 'none'
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
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  }
};
