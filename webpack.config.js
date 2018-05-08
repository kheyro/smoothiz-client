const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const EslintFormatterPretty = require('eslint-formatter-pretty');

const ASSET_PATH = process.env.ASSET_PATH || './build/';

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new ExtractTextPlugin('styles.css'),
  new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        formatter: EslintFormatterPretty,
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    // chunks: ['app'],
    inject: 'body'
  }),
];

if (dev) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './webpack-report.html',
      openAnalyzer: false,
    })
  );
}

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'none' : 'source-map',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    // publicPath: ASSET_PATH,
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
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
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
