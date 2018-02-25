const path = require('path')

module.exports = {
  mode: 'production',
  entry: [path.join(__dirname, 'src/WorldPrice.jsx')],
  output: {
    library: 'WorldPrice',
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
