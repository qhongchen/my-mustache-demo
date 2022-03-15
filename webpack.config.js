const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: false,
    port: 3000,
    publicPath: '/xuni/',
  },
}
