'use-strict';

var path = require('path');

var nodeModulesPath = path.join(__dirname, 'node_modules');
var srcPath = path.join(__dirname, 'src/js');

module.exports = {
	// App options.
	_uglifyConfig: {
		mangle: true,
		enclose: true,
		compress: {
			warnings: false,
			dead_code: true,
			drop_debugger: true,
			drop_console: true
		}
	},
	_defineConfig: {
		API_HOST: JSON.stringify('http://localhost:8000')
	},

	// Webpack options.
	context: __dirname,
	target: 'web',
	entry: {
		app: path.join(srcPath, 'main.js'),
		dependencies: [
			// Vendor libraries
		]
	},
	resolve: {
		root: __dirname,
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel-loader?stage=0', exclude: [ nodeModulesPath ] }
		]
	}
};
