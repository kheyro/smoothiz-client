const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const EslintFormatterPretty = require('eslint-formatter-pretty');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'error',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          formatter: EslintFormatterPretty,
        },
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './webpack-report.html',
      openAnalyzer: false,
    }),
  ],
});
