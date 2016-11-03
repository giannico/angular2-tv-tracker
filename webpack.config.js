var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var DllReferencePlugin = webpack.DllReferencePlugin;
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

var autoprefixer = require('autoprefixer');

// the dll file exposes functions for retrieving the list of imported libraries that we want to
// include in our generated DLL files
var dll = require('./dll.js');

////////////////////

// TODO - Awesome TypeScript Loader
// look at tsconfig.json
// look at aliases below
// look at corejs imports
// look at tslint integration
// lock dependencies
// check cross-platform
// convert webpack config to TS?

module.exports = getWebpackConfig(getOptions(process.env));

function getOptions(environment) {
  var nodeEnv = environment.NODE_ENV || 'dev'; // build or dev (default)
  var isDevMode = nodeEnv === 'dev';
  var isBuildMode = nodeEnv === 'build';

  return {
    nodeEnv: nodeEnv,
    port: 8080,
    isDevMode: isDevMode,
    isBuildMode: isBuildMode
  };
}

////////////////////

function getWebpackConfig(options) {
  // validate application DLLs exists, they should be in place before this application build
  // takes place
  validateDLLManifest();

  var webpackDllAssets = require('./dist/webpack-dll-assets.json');

  // create an empty webpack configuration object that we will tack all configuration onto
  var config = {};

  // generate cheaper (faster) source maps while we're in the process of developing
  if (options.isBuildMode) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  // add webpack debug messages
  config.debug = options.isDevMode;

  // files to be built, one "main" output bundle in this case
  // the application requires that the polyfills DLL be loaded first, so the list of all
  // applocation polyfills are included before the actual application file
  config.entry = {
    // order matters here, polyfills have to run first
    main: [].concat(dll.polyfills(), './src/main.ts')
  };

  // output path and naming for the generated application file, using hashing for long-term caching
  config.output = {
    path: root('dist'),
    publicPath: '',
    filename: 'js/[name].[hash].js'
  };

  // register the types of files that webpack will resolve/load
  config.resolve = {
    root: root(),
    // only discover files that have those extensions
    extensions: ['', '.ts', '.js', '.json', '.css', '.html'],
    alias: {
      'app': 'src/app',
      'common': 'src/common'
    }
  };

  ////////////////////////////////////////
  //// Loaders
  ////////////////////////////////////////

  config.module = {
    loaders: [
      // register TypeScript and angular2-template-loader for inlining component templates/styles
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // file-loader reads imported fonts/images and copys and tags them with a hash
      // TODO: revisit this output when app has actual images (dont put images in fonts?)
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]?'
      },

      // support for *.json files.
      { test: /\.json$/, loader: 'json' },

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
        loader: 'raw', exclude: root('src', 'public')
      }
    ]
    // postLoaders: [
    //   // run tslint on the application files after each rebuild
    //   {
    //     test: /\.ts$/,
    //     loader: 'tslint'
    //   }
    // ]
  };

  config.plugins = [
    // only emit outputs if there are no errors
    new webpack.NoErrorsPlugin(),

    // register the ExtractTextPlugin to define the name of the extracted css file
    // see loader above for more details
    new ExtractTextPlugin('css/[name].[contenthash].css'),

    // create a manifest of all application assets created by webpack for the "main" entry
    new AssetsPlugin({
      path: root('dist'),
      filename: 'webpack-main-assets.json',
      prettyPrint: true
    }),

    // registers the polyfills/vendor DLLs that have been generated from webpack.dll.config.js
    new DllReferencePlugin({
      context: root(),
      manifest: require('./dist/vendor.manifest.json'),
    }),
    new DllReferencePlugin({
      context: root(),
      manifest: require('./dist/polyfills.manifest.json'),
    }),

    // register the files from the DLL manifest, to be added to index.html as script/style tags
    new AddAssetHtmlPlugin([
      {
        filepath: root('dist', webpackDllAssets.vendor.css),
        includeSourcemap: false,
        publicPath: 'css',
        outputPath: 'css',
        typeOfAsset: 'css'
      },
      {
        filepath: root('dist', webpackDllAssets.polyfills.js),
        includeSourcemap: false,
        publicPath: 'js',
        outputPath: 'js',
        typeOfAsset: 'js'
      },
      {
        filepath: root('dist', webpackDllAssets.vendor.js),
        includeSourcemap: false,
        publicPath: 'js',
        outputPath: 'js',
        typeOfAsset: 'js'
      }
    ]),

    // inject the generated/registered scripts/css files into the index file (main and DLLs)
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    }),

    // always minify the application code, in order to catch any minification issues during
    // development. Sourcemaps will be generated to assist with debugging
    new webpack.optimize.UglifyJsPlugin({ mangle: { keep_fnames: true } }),

    // copy app application assets that exist in the application public folder
    new CopyWebpackPlugin([{
      from: root('src/public')
    }])
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

  config.tslint = {
    emitErrors: false,
    failOnHint: false
  };

  config.devServer = {
    // serve files from both /src/public and dist folder
    contentBase: ['./dist'],
    historyApiFallback: true,
    quiet: true,
    port: options.port,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}

////////////////////////////////////////
//// Helpers
////////////////////////////////////////

function validateDLLManifest() {
  var path = root('dist', 'webpack-dll-assets.json');
  // throws an error if the path doesn't exist
  fs.accessSync(path);
}

// Helper functions for forming paths from the root folder
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
