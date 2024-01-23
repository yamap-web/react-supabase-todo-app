const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { GenerateSW } = require("workbox-webpack-plugin");
// const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const env = require("dotenv").config().parsed;

module.exports = {
  mode: "development",
  entry: {
    main: __dirname + "/src/main.tsx",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    modules: [__dirname + "/node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
    }),
    env !== undefined
      ? new webpack.DefinePlugin({
          "process.env": JSON.stringify(process.env),
        })
      : new webpack.DefinePlugin({
          "process.env.REACT_PUBLIC_SUPABASE_URL": JSON.stringify(
            process.env.REACT_PUBLIC_SUPABASE_URL
          ),
          "process.env.REACT_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(
            process.env.REACT_PUBLIC_SUPABASE_ANON_KEY
          ),
        }),
    new GenerateSW({
      swDest: __dirname + "/dist" + "/service-worker.js",
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: "index.html",
          handler: "NetworkFirst",
        },
      ],
    }),
    // new WebpackPwaManifest({
    //   short_name: 'short name', // ホーム画面のラベルに表示される名称
    //   name: 'app full name', // appの名前
    //   display: 'standalone', // standaloneにするとブラウザのUI要素が削除されてアプリっぽくなる
    //   start_url: 'index.html', // 開始時に起動するページ
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
        },
      ],
    }),
    // webpackでもpublicフォルダの中身をdistにコピーする必要がある
  ],
  devServer: {
    static: {
      directory: __dirname + "/dist",
    },
    port: 8080,
  },
};
