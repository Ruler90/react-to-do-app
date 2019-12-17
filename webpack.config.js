const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "prodBundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    host: '192.168.0.66',
    port: 3000,
    publicPath: "http://localhost:3000/dist/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};