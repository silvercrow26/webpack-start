const HtmlWebpack    = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin     = require("copy-webpack-plugin");
const MinifyPlugin            = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    
    mode: "production",
    entry: './src/index.js',

    output: {
        clean: true,
        filename: 'main.[contenthash].js',

    },
    devServer: {
        https: {

          passphrase: 'WDS',

        },
      },

    module: {

        rules: [  
                  
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    sources: false,
                },
            },

            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/img/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimizer: [
            new CssMinimizer(),
            new Terser(),
            new OptimizeCssAssetsPlugin()
        ]
    },

    plugins: [
        new HtmlWebpack({

            ilename: './index.html',
            template: './src/index.html'
        }),
        
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),

    ]
}

