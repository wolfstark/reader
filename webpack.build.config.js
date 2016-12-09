const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
// const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const TEM_PATH = path.resolve(ROOT_PATH, 'app/templates');
const JS_PATH = path.resolve(ROOT_PATH, 'app/js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(JS_PATH, 'reader.js'),
        lib: ['babel-polyfill', 'zeptov12-webpack', 'vue']
    },
    output: {
        path: BUILD_PATH,
        // filename: '[name]-[hash].js'
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: JS_PATH,
            loader: 'babel',
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=10240'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib-[hash].js'),
        new HtmlWebpackPlugin({
            template: path.resolve(TEM_PATH, 'reader.html'),
            chunks: ['lib', 'app']
        }),
        new ExtractTextPlugin('styles-[hash].css'),
        //压缩混淆
        // new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
