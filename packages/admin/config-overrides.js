const path = require('path');

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const { override, babelInclude } = require('customize-cra');

module.exports = function (config, env) {
  config = Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve('src'),
        path.resolve('../shared'),
        path.resolve('../ui')
      ])
    )(config, env)
  );

  config.resolve = {
    plugins: config.resolve.plugins.filter(
      plugin => !(plugin instanceof ModuleScopePlugin)
    ),
    symlinks: true,
    alias: {
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
