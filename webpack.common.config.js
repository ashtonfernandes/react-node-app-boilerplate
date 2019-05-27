const webpack = require('webpack');
const path = require('path');

const SRC = path.resolve('src');

const COMMON_LOADERS = [
    {
        test: /\.(\?[a-z0-9]+)?$/,
        include: SRC,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
            minimize: true
          }
        }]
    },
    
]

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "public"), // string
      // the target directory for all output files
      publicPath: '/',
      filename: "bundle.[hash].js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    optimization: {
      splitChunks: { 
        cacheGroups: {
          // figure out how to do lazy loading for this
          vendor: { // put the dependencies in a separate bundle, vendor.bundle.js. Increases re-build performance and optimizes clients browser cache in production, since it includes a lot of modules that will not change
            chunks: "initial",
            test: path.resolve(__dirname, "node_modules"),
            // wepack will name the file: "vendor~main.<generated hash>.js"
            filename: "[name].[chunkhash].js", // added hash to file name so you could check between builds whether or not the bundle has actually been updated. In dev mode, if you change the dependencies then bundle will update - if dependencies have not changed, then bundle will not change and used the cached one. In prod mode, if you change the dependencies and then change your source code to use/not use the new/old dependency, then the vendor bundle and main js bundle will update.
            enforce: true
          }
        }
      }
    },
    module: {
        rules: COMMON_LOADERS
    }
}