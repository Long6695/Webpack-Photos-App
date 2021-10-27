const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  entry: {
    index: './src/assets/js/index.js',

    login: './src/assets/js/login.js',

    register: './src/assets/js/register.js',

    api: './src/assets/js/api.js',

    addphoto: './src/assets/js/addphoto.js',

    validate: './src/assets/js/validate.js',

    detailphoto: './src/assets/js/detailphoto.js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: './src/register.html',
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      filename: 'addphoto.html',
      template: './src/addphoto.html',
      chunks: ['addphoto'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detailphoto.html',
      template: './src/detailphoto.html',
      chunks: ['detailphoto'],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: './dist',
    hot: true,
    compress: true,
    port: 9000,
  },
}
