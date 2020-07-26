const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');


module.exports = {

    devtool: 'eval',

    entry: [
        './js/index.js',
    ],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
    },

    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/plugin-proposal-class-properties"],
                },
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer]
                        }
                    },
                ],
            },
        ],
    },

    optimization: {
        minimize: true
    }
};