const config = {
  presets: ['@babel/preset-env'],
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
