const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/assets/javascripts');
const APP_DIR = path.resolve(__dirname, 'src/realtime-weather-app');

const config = {
  entry: {
    RealtimeWeatherApp: APP_DIR + '/index.jsx'
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },

  module : {
    rules : [
      {
        test : /\.jsx?$/,
        include : APP_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['@babel/preset-env']
          }
        }
      }
    ]
  },
  
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
};

module.exports = config;