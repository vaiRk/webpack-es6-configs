'use-strict';

var webpack = require('webpack');
var path = require('path');
var assign = require('lodash/object/assign');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var buildPath = path.join(__dirname, 'build');
var htmlPath = path.join(__dirname, 'src', 'index.html');

var baseConfig = require('./webpack.base.config.js');

module.exports = assign({}, baseConfig, {
	devtool: 'source-map',
	debug: true,
	output: {
		path: buildPath,
		publicPath: '/',
		sourceMapFilename: 'assets/js/maps/[name].map',
		filename: 'assets/js/[name].js',
		chunkFileName: 'assets/js/[name].js',
		libraryTarget: undefined
	},
	plugins: [
		new webpack.PrefetchPlugin(/* React */),
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'dependencies',
			filename: 'assets/js/[name].js?[chunkhash]'
		}),
		new webpack.DefinePlugin(assign({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}, baseConfig._defineConfig)),
		new HtmlWebpackPlugin({
			template: htmlPath,
			inject: 'body'
		}),
		new webpack.NoErrorsPlugin()
	]
});
