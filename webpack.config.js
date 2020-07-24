const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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

    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["@babel/preset-env"],
                },
            },
        ],
    },

    optimization: {
        minimize: true
    }
};