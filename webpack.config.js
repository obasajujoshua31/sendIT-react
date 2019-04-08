const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenvWebpack = require("dotenv-webpack");

module.exports = {
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  entry: ["babel-polyfill", "./src/index.js"],

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$|.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|jpeg|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "/"),
    port: 8080,
    historyApiFallback: true,
    compress: true
  },
  plugins: [
    new dotenvWebpack(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
