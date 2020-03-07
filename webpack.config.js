const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.jsx",
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
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js"
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    host: 'localhost',
    port: 3000,
    publicPath: "http://localhost:3000/dist/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};