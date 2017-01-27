var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/assets/javascripts');
var APP_DIR = path.resolve(__dirname, 'src/realtime-weather-app');

var config = {
  entry: {
    RealtimeWeatherApp: APP_DIR + '/index.jsx'
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },

  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.json$/, 
        loader: 'json-loader'
      }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = config;