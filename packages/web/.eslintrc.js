module.exports = {
  extends: ['next', 'plugin:prettier/recommended'],
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
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    'react/react-in-jsx-scope': 'off',
    eqeqeq: ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }]
  }
};
