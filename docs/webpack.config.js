const path = require('path')

module.exports = {
  mode: 'production',
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
  }
}
