const path = require('path');

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/',
        proxy: {
          '/api': {
            target: "http://localhost:3000",
            secure: false,
            changeOrigin: true
          }
        }
    }
}