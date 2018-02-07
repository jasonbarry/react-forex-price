const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [path.join(__dirname, 'src/Entry.jsx')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
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
