const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const TEM_PATH = path.resolve(ROOT_PATH, 'app/templates');
const JS_PATH = path.resolve(ROOT_PATH, 'app/js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(JS_PATH, 'reader.ts'),
        lib: ['babel-polyfill', 'zeptov12-webpack', 'vue'],
    },
    output: {
        path: BUILD_PATH,
        // filename: '[name]-[hash].js'
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            include: JS_PATH
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=10240'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
        new HtmlWebpackPlugin({
            template: path.resolve(TEM_PATH, 'reader.html'),
            chunks: ['lib', 'app']
        }),
        new ExtractTextPlugin('styles.css'),
        // 压缩混淆
        // new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
