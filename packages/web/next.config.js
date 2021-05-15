require('dotenv').config();
var withPlugins = require('next-compose-plugins');
var withOffline = require('next-offline');
var join = require('path').join;

var withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

var withTM = require('next-transpile-modules')([
  '@readerfront/shared',
  '@readerfront/ui',
  '@formatjs/icu-messageformat-parser',
  '@formatjs/intl-relativetimeformat',
  '@formatjs/intl-utils',
  'react-intl',
  'intl-format-cache',
  'intl-messageformat'
]);

var nextConfig = {
  webpack(config, option) {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      static: join(__dirname, 'src', 'static'),
      utils: join(__dirname, 'src', 'utils'),
      '@hooks': join(__dirname, 'src', 'hooks'),
      '@pages': join(__dirname, 'src', 'pages'),
      lib: join(__dirname, 'src', 'lib'),
      '@components': join(__dirname, 'src', 'components')
    });
    return config;
  },
  env: {
    REACT_APP_APP_URL: process.env.REACT_APP_APP_URL,
    REACT_APP_READER_PATH: process.env.REACT_APP_READER_PATH,
    REACT_APP_APP_PATH: process.env.REACT_APP_APP_PATH,
    REACT_APP_APP_TITLE: process.env.REACT_APP_APP_TITLE,
    REACT_APP_DISQUS_SHORTNAME: process.env.REACT_APP_DISQUS_SHORTNAME,
    REACT_APP_GA_ID: process.env.REACT_APP_GA_ID,
    REACT_APP_DISCORD_URL: process.env.REACT_APP_DISCORD_URL,
    REACT_APP_DISCORD_ID: process.env.REACT_APP_DISCORD_ID,
    REACT_APP_PATREON_URL: process.env.REACT_APP_PATREON_URL,
    REACT_APP_ANONYMIZER_DOWNLOADS: process.env.REACT_APP_ANONYMIZER_DOWNLOADS,
    REACT_APP_CDNS: process.env.REACT_APP_CDNS,
    REACT_APP_LANGUAGES: process.env.REACT_APP_LANGUAGES,
    REACT_APP_S3_ENDPOINT: process.env.REACT_APP_S3_ENDPOINT,
    GENERATE_SOURCEMAP: process.env.GENERATE_SOURCEMAP
  },
  future: {
    webpack5: true
  }
};

module.exports = withPlugins(
  [withBundleAnalyzer, withOffline, withTM],
  nextConfig
);
