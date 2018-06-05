const path = require('path');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(['build']),
  new FriendlyErrorsWebpackPlugin(),
  new ExtractTextPlugin('styles.css'),
  new FaviconsWebpackPlugin({
    logo: './public/favicon.png',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: false,
    },
  }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    // chunks: ['app'],
    inject: 'body',
  }),
];

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
                modules: false,
                importLoaders: 1,
                // localIdentName: '[name]-[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
    ],
  },
  plugins,
};
