const path = require('path');

const env = process.env.NODE_ENV;

module.exports = {
  entry: './lib/index.js',
  mode: env,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: "tableOfThings",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
