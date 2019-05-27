const merge = require('webpack-merge'); // merge with webpack.common.config.js's settings
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackAutoInject = require("webpack-auto-inject-version");
const common = require('./webpack.common.config.js');

const SRC = path.resolve("src");

const PROD_LOADERS = [{
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader" // resolves css import statements
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [{
                loader: "url-loader",
                options: {
                    limit: 100000,
                    minimize: true
                }
            }
        ]
    },
    {
        test: /\.png$/, // literally around for one flag image from ./node_modules/semantic-ui-css/themes/default/assets/images/flags.png 1:0. Leaving here assuming you'll take more .png's from semantic UI
        use: [{
                loader: "url-loader",
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings and inlines within code. This saves requests to the server to fetch the images, therefore improving performance. For larger images, size of applciation outweights advantage of saving server trips
                    name: '[hash][name].[ext]',
                    outputPath: "images/"
                },

            }
        ]
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
            }
        ]

    }

]

module.exports = merge(common, {
    mode: 'production', // NODE_ENV="production" isn't sufficient for webpack, must specify this way for webpack or flag in command
    devtool: 'source-map', // inline-source-map is expensive, use quicker source map for prod
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ // minify js bundle
          parallel: true // run processes in parallel to speed up build
        }),
        new OptimizeCSSAssetsPlugin({}), // minify and minimize the CSS
      ]
    },
    plugins: [
        new CleanWebpackPlugin(['public/*.*']),
        new HtmlWebpackPlugin({
            title: "React Boilerplate",
            template: "index.ejs"
        }),
        new webpack.HashedModuleIdsPlugin(), // to bundles that haven't actually changed from being rebuilt. Webpack will rename module.id's based on resolving order during a build.
        new MiniCssExtractPlugin({ // bundle css separately in prod to avoid flashes of unstyled content, as this will bundle the css in parallel with the js bundling
            filename: "[name].[chunkhash].css", // chunkhash only fetches the file if any updates have been made. Also put hash there for cache busting - you can look to see if the hash of the file has changed to see whether or not webpack updated the build for your file
            chunkFilename: "[id].css"
          }),
        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true
            },
            componentsOptions: {
                AutoIncreaseVersion: {
                    runInWatchMode: false // it will increase version with every build!
                }
            }
        })
    ],
    module: {
        rules: PROD_LOADERS
    }
});