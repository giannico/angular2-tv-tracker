////////////////////////////////////////////////////////////////////////////////////////////////////
//// This configuration file is used by webpack to generate "DLL" files for our application
//// vendor files. This allows us to generate our vendor files on-demand, only when the application
//// dependencies change (which is fairly infrequently). The motivation of this separation is:
////
//// * Long term caching - The output is generated with content-hashes to promote browser caching
////
//// * Development experience - By creating these builds only when the vendor dependencies actually
////   change, the application rebuild speed should improve significantly.
////
//// This is a more performant alternative to the webpack CommonChunksPlugin.
////////////////////////////////////////////////////////////////////////////////////////////////////

var path = require('path');
var webpack = require('webpack');

// required webpack plugins
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var IgnorePlugin = webpack.IgnorePlugin;
var autoprefixer = require('autoprefixer');

// the dll file exposes functions for retrieving the list of imported libraries that we want to
// include in our generated DLL files
var dll = require('./dll.js');

////////////////////

module.exports = getWebpackConfig(getOptions(process.env));

function getOptions(environment) {
  var nodeEnv = environment.NODE_ENV || 'dev'; // build or dev (default)
  var isDevMode = nodeEnv === 'dev';
  var isBuildMode = nodeEnv === 'build';

  return {
    nodeEnv: nodeEnv,
    isDevMode: isDevMode,
    isBuildMode: isBuildMode
  };
}

////////////////////

function getWebpackConfig(options) {
  console.log('Starting build of DLLs with options', options);

  // create an empty webpack configuration object that we will eventually return
  var config = {};

  // since this is going to be run very frequently we'll choose the "best" sourcemap option
  config.devtool = 'source-map';

  // add webpack debug messages
  config.debug = options.isDevMode;

  // files to be built, two DLLs in this case - polyfills and vendor
  config.entry = {
    polyfills: dll.polyfills(),
    vendor: dll.vendor()
  };

  // output path and naming for the generated DLLs, using hashing for long-term caching
  config.output = {
    path: root('dist'),
    filename: 'js/[name].[chunkhash].dll.js',
    library: '[name]_[hash]'
  };

  // register the types of files that webpack will resolve/load
  config.resolve = {
    root: root(),
    extensions: ['', '.ts', '.js', '.json', '.css', '.html']
  };

  ////////////////////////////////////////
  //// Loaders
  ////////////////////////////////////////

  config.module = {
    loaders: [
      // register TypeScript and angular2-template-loader for inlining component templates/styles
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // file-loader reads imported fonts/images and copys and tags them with a hash
      // TODO: revisit this output when app has actual images (dont put images in fonts?)
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]?'
      },

      // support for *.json files.
      {test: /\.json$/, loader: 'json'},

      // extract content of application css files, apply vendor prefixes, generate a sourcemap
      // Angular2 inline css files are excluded
      // TODO: revisit this in the context of angular2 component styling, may not even be needed
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },

      //////////////////////////////////////////////////////////////////////////////////////////////
      //// angular2-template-loader prerequisites
      ////
      //// To be able to use the template loader you must have loaders registered, which can
      //// handle .html and .css files. The following loaders are for inlining Angular2
      //// component stylesheets and templates.
      //////////////////////////////////////////////////////////////////////////////////////////////
      {
        test: /\.css$/,
        include: root('src', 'app'),
        loader: 'raw!postcss' // vendor prefixes are also applied during this process
      },

      {
        test: /\.html$/,
        include: root('src', 'app'),
        loader: 'raw'
      }
    ],
    postLoaders: []
  };

  ////////////////////////////////////////
  //// Plugins
  ////////////////////////////////////////

  config.plugins = [
    // only emit files if there are no errors
    new webpack.NoErrorsPlugin(),

    // ignores all of the moment locale files, which are not required by the application
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // define the output name/path of the generated dll files
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: root('dist', '[name].manifest.json')
    }),

    // create a manifest of all dll assets created by this webpack config
    new AssetsPlugin({
      path: root('dist'),
      filename: 'webpack-dll-assets.json',
      prettyPrint: true
    }),

    // register the ExtractTextPlugin to define the name of the extracted css file
    // see loader above for more details
    new ExtractTextPlugin('css/[name].[contenthash].css'),

    // always minify the DLL files, in order to use the production files during development
    // sourcemaps will be generated to assist with debugging
    new webpack.optimize.UglifyJsPlugin({mangle: { keep_fnames: true }})
  ];

  ////////////////////////////////////////
  //// Plugin Configuration
  ////////////////////////////////////////

  // register the configuration for the browser autoprefixing
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  return config;
}

////////////////////////////////////////
//// Helpers
////////////////////////////////////////

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
