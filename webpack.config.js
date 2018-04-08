var path = require('path')
const PATHS = {
  js: path.join(__dirname, 'views'),
  build: path.join(__dirname, 'build')
}

module.exports = {
   entry: ["babel-polyfill",'./src/app.js'],
  output: {
    path: './',
    filename: 'public/build/bundle.min.js',
  },
  module:{
    noParse: /node_modules\/roving-index\/index.js/,
    loaders:[
      {
        text: /\.(es6|js|jsx)$/,
        exclude: /node_modules|public/,
        loader: "babel",
        query: {
          "presets": ["react", "es2015"]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader',
      },
    ]
  },

  resolve :{
    extensions : ['','.js','.jsx'],
    alias: {
           'jquery' : "jquery/src/jquery",
       }
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true
  }
}