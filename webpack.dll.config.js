// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var autoprefixer = require('autoprefixer');
var AssetsPlugin = require('assets-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var dll = require('./src/dll.js');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isProd) {
    config.devtool = 'source-map';
  } else {
    // config.devtool = 'eval-source-map';
  }

  // add debug messages
  config.debug = !isProd;

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    polyfills: dll.polyfills(),
    vendor: dll.vendor()
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {
    path: root('dist'),
    filename: 'js/[name].js',
    library: '[name]_lib'
  };

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    root: root(),
    // only discover files that have those extensions
    extensions: ['', '.ts', '.js', '.json', '.css', '.html']
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=fonts/[name].[ext]?'
      },

      // Support for *.json files.
      {test: /\.json$/, loader: 'json'},

      // Support for CSS as raw text
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, include: root('src', 'app'), loader: 'raw!postcss'},

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {test: /\.html$/, loader: 'raw',  exclude: root('src', 'public')}
    ],
    postLoaders: []
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new AssetsPlugin({
      path: root('dist'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),

    new webpack.DllPlugin({
      name: '[name]_lib',
      path: root('dist', '[name].manifest.json')
    }),

    // Extract css files
    new ExtractTextPlugin('css/[name].css'),

    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // minify output
    // new webpack.optimize.UglifyJsPlugin({mangle: { keep_fnames: true }})
  ];

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
