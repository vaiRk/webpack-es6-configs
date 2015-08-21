'use-strict';

var webpack = require('webpack');
var path = require('path');
var assign = require('lodash/object/assign');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var buildPath = path.join(__dirname, 'build');
var htmlPath = path.join(__dirname, 'src', 'index.html');

var baseConfig = require('./webpack.base.config.js');

module.exports = assign({}, baseConfig, {
	debug: false,
	bail: true,
	output: {
		path: buildPath,
		publicPath: '/',
		sourceMapFilename: 'assets/js/maps/[name].map',
		filename: 'assets/js/[name].js?[chunkhash]',
		chunkFileName: 'assets/js/[name].js?[chunkhash]',
		libraryTarget: undefined
	},
	plugins: [
		new webpack.PrefetchPlugin(/* React */),
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'dependencies',
			filename: 'assets/js/[name].js?[chunkhash]'
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(baseConfig._uglifyConfig),
		new webpack.DefinePlugin(assign({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}, baseConfig._defineConfig)),
		new HtmlWebpackPlugin({
			path: buildPath,
			template: htmlPath,
			inject: 'body',
			minify: true
		}),
		new CompressionPlugin({
			asset: '{file}.gz',
			algorithm: 'gzip',
			regExp: /\.js$|\.html$/
		}),
		new webpack.NoErrorsPlugin(),
		new StatsPlugin('stats.json', { chunkModules: true })
	]
});
