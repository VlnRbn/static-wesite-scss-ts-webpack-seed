const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const config = require("./website.config");

const entry = {};
const htmlWebpackEntries = [];
for (const page of config) {
  entry[page.entryName] = page.entryPath;

  htmlWebpackEntries.push(
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: page.template,
      filename: page.filename,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  );
}

module.exports = {
  entry: {
    ...entry
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    ...htmlWebpackEntries,
    new WebpackMd5Hash()
  ],
  devServer: {
    port: 3000
  }
};
