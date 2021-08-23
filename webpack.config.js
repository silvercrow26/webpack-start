//Archivo de configuracion de webpack
//npm i -D html-loader html-webpack-plugin
//Mueve el archivo html al dist y el segundo incrusta el bunddle en el index.

//es una manera que tiene node para cargar archivos de otros paquetes.
const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
 
    mode: 'development',
    output: {
        clean: true,
        filename: 'main.js'
    },
    module: {
        rules:[
            
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            
                {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    sources: false,
                },
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]', //Evita img hasheasdas
                      },
                  },
                ],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' },
            ],
        }),

        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            // chunkFilename: "[id].[contenthash].css",
            ignoreOrder: false
        }),
    ]
}

