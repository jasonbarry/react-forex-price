const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [path.join(__dirname, 'src/WorldPrice.jsx')],
  output: {
    library: 'react-world-price',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'react-world-price.js'
  },
  externals: {
    react: 'React',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
