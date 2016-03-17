var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require("path");

module.exports = {
    entry: [
      'webpack-dev-server/client?http://127.0.0.1:8080',
      'webpack/hot/only-dev-server',
      './index.jsx'
    ],
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: '/public/',
      filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'jsx-loader?insertPragma=React.DOM&harmony']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
}
