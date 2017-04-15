var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    "faker", "lodash", "react", "react-dom", "react-input-range",
    "react-redux", "react-router", "redux", "redux-form", "redux-thunk"
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
      rules: [
          {
              use: 'babel-loader',
              test: /\.js$/,
              exclude: /node_modules/  //transpiling modules would be a waste of resources
          },
          {
            use: ['style-loader', 'css-loader'],
            test: /\.css$/
          }
      ]
  },
  plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']  //if there are any common modules, stick them in vendor file!
            }),
            new HtmlWebpackPlugin({ // used to make script injections and output index.html to dist folder
                template: 'src/index.html'
            }),            
            new webpack.DefinePlugin({  //used to define window scoped variables within bundle.js
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
  ]
};