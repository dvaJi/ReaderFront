const config = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        alias: {
          '^@readerfront/(.+)': '../\\1'
        }
      }
    ]
  ]
};

module.exports = config;
