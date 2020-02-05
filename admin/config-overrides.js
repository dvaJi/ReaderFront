const path = require('path');

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
  const scopePluginIndex = config.resolve.plugins.findIndex(
    ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
  );

  config.resolve = {
    plugins: config.resolve.plugins.filter(
      plugin => !(plugin instanceof ModuleScopePlugin)
    ),
    symlinks: true,
    alias: {
      '@shared': path.resolve(__dirname, './shared/'),
      auth: path.resolve(__dirname, 'src', 'auth'),
      common: path.resolve(__dirname, 'src', 'common'),
      blog: path.resolve(__dirname, 'src', 'blog'),
      chapters: path.resolve(__dirname, 'src', 'chapters'),
      works: path.resolve(__dirname, 'src', 'works'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      state: path.resolve(__dirname, 'src', 'state'),
      themes: path.resolve(__dirname, 'src', 'themes')
    }
  };

  return config;
};
