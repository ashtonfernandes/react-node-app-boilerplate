const webpack = require('webpack');
const merge = require('webpack-merge'); // merge with webpack.common.config.js's settings
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const common = require('./webpack.common.config.js');

const SRC = path.resolve("src");
const PORT = 3000;
const PROXY_STRING = 'http://localhost:8080';

const DEV_LOADERS = [{
    test: /\.(js|jsx)$/,
    loader: "babel-loader",
    exclude: /node_modules/,
    query: {
      cacheDirectory: true
    }
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"] // style loader does not cache or bundle the CSS separately, it injects the css into the js. Leaving separate bundling for css out for dev mode as if it caches and bundles separately, hot module replacement is lost
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: "url-loader",
    options: {
      limit: 100000,
      minimize: true
    }
  },
  {
    test: /\.png$/, // literally around for one flag image from ./node_modules/semantic-ui-css/themes/default/assets/images/flags.png 1:0. Leaving here assuming you'll take more .png's from semantic UI
    use: [{
      loader: "url-loader",
      options: {
        limit: 8000, // Convert images < 8kb to base64 strings and inlines within code. This saves requests to the server to fetch the images, therefore improving performance. For larger images, size of applciation outweights advantage of saving server trips
        name: '[hash][name].[ext]',
        outputPath: "images/"
      }
    }]
  },
  {
    test: /\.(jpe?g|gif)$/,
    include: SRC,
    use: [{
      loader: "url-loader",
      options: {
        limit: 8000,
        name: '[hash][name].[ext]',
        outputPath: "images/"
      }
    }]

  }
]

module.exports = merge(common, {
  mode: 'development', // NODE_ENV="production" isn't sufficient for webpack, must specify this way for webpack or flag in command
  // devtool: "inline-source-map", // seems to cause javascript heap out of memory problem?
  devtool: "inline-cheap-module-source-map",
  devServer: {
    port: PORT,
    historyApiFallback: true, // if error 404, fall back to /index.html. Also needed for webpack-dev-server to work with react-router
    proxy: { // fetch backend requests from port 3000
      '/api': {
        target: PROXY_STRING,
        secure: false
      }
    }
  },
  plugins: [
    // webpack-dev-server does not create build files on disk, only in memory. So no need to clean out local build directory with CleanWebpacPlugin here
    new HtmlWebpackPlugin({
      title: "React Boilerplate",
      template: "index.ejs"
    })
  ],
  module: {
    rules: DEV_LOADERS
  }
});