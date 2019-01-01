const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './public'),
  },
  resolve: {
    extensions: ['.js','.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.join(__dirname, '/client'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react','@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '/client'),
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'},
        ],
      },
    ],
  },
};