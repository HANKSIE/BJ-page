const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");

module.exports = {
  devtool: "eval",

  entry: ["./js/index.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },

  devServer: {
    publicPath: "/dist/",
    hot: true,
    port: 3000,
    inline: true,
    compress: true,
    openPage: "./dist/master.html",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new HtmlWebpackPlugin({
      template: "./pages/templates/master.html",
      filename: "master.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
          ],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        // 把 sass-loader 放在首要處理 (第一步)
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer],
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  optimization: {
    minimize: true,
  },
};
