const path = require('path')

module.exports = {
  mode: 'production',
  entry: [path.join(__dirname, 'src/Price.jsx')],
  output: {
    library: 'Price',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  externals: {
    react: 'react',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ]
  },
}
