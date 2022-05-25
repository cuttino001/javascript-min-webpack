const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("./plugins/fileList");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.[contenthash][8].js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // vendor 是我们第三方类库的公共代码的名称
          test: /react|angluar|lodash/, // 直接使用 test 来做路径匹配
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)/,
        exclude: /node_modules/,
        resource: [path.resolve(__dirname, "./src/")],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.md/,
        exclude: /node_modules/,
        resource: [path.resolve(__dirname, "./md/")],
        use: ["./loaders/markdown.js"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html", // 配置文件模板
    }),
    new FileListPlugin(),
  ],
  devServer: {
    open: true,
    hot: true,
    // static: {
    //   // static: ['assets']
    //   directory: path.join(__dirname, "dist"),
    // },
  },
};
