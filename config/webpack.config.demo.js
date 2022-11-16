

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-3-webpack-plugin");

const publicPath = paths.servedPath;

const shouldUseRelativeAssetPaths = publicPath === './';

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const publicUrl = '.';

const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}


const cssFilename = 'css/index.css';


const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? 
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};


  const SRC_DIR = path.resolve(__dirname,"src");

  const DIST_DIR = path.resolve(__dirname,"dist");

module.exports = {

  
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    moduleIds: 'named',
  },



  bail: true,

  devtool: shouldUseSourceMap ? 'source-map' : false,

  entry: [paths.appDemoIndexJs],
  output: {
  
    path: paths.appDemoBuild,
    filename: 'src/demo/index.js',
    libraryTarget: 'umd'
  },
  devServer: {
    inline: false,
    contentBase: "./dist", 
},
  resolve: {

    modules: ['node_modules', paths.appNodeModules].concat(

      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),

    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {

      'react-native': 'react-native-web'
    },
    plugins: [
    
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
 

      {
        test: /\.js?$/,

        exclude: {
          and: [/node_modules/], 
          not: [

            /unfetch/,
            /d3-array|d3-scale/,
            /@hapi[\\/]joi-date/,
          ]
        },
        use:{
          loader:'babel-loader',

          options: {
            presets: [
              "react", "es2016", "stage-2",
              "@babel/preset-react",
            ['@babel/preset-env', { targets: "defaults" }]
          ],
            
          plugins: [
            ['@babel/plugin-proposal-decorators', { 'legacy': true } ],
            '@babel/plugin-proposal-class-properties',
            ["@babel/plugin-transform-runtime", {
              "corejs": 2
          }]
          
          ]
        }
        },
        
        include: SRC_DIR,
        // loaders: "babel-loader",

      }


 
     

    ]
  },

  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
},  


  plugins: [



    ["styled-components", { "ssr": true }],

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),

    new UglifyJsPlugin({
      uglifyOptions: {
      warnings: false,
      ie8: false,
      output: {
      comments: false
      }
      }
      }),


        new InterpolateHtmlPlugin(env.raw),

    new webpack.DefinePlugin(env.stringified),


    new ExtractTextPlugin({
      filename: cssFilename
    }),


    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      { from: `${paths.appPublic}/favicon.ico`, to: paths.appDemoBuild },
      { from: `${paths.appPublic}/manifest.json`, to: paths.appDemoBuild }
    ])
  ],
 
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
