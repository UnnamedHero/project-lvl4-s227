// const webpack = require('webpack');
const mode = process.env.NODE_ENV || 'development';
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevMode = mode === 'development';
module.exports = {
  mode,
  devtool: isDevMode ? 'cheap-module-source-map' : 'none',
  entry: {
    vendor: ['babel-polyfill', './src/index.js'],
    application: ['./app/index.js'],
  },
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    isDevMode ? new WebpackBundleAnalyzer() : {},
  // new webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  //   'window.jQuery': 'jquery',
  // }),
  ],
};
