# webpack-es6-configs
Webpack ES6 Config files.

## Build folder structure
```
build
│   index.html
│   stats.json    
└───assets
    ├───js
    │   │   app.js
    │   │   dependencies.js
    │   └───maps
    │        │ app.map
    │        │ dependencies.map
    └───css
        │   styles.css
```

## Dependencies
- Webpack
- Path
- Lodash' object assign
- Babel-Loader
- Html-Webpack-Plugin
- Compression-Webpack-Plugin
- Stats-Webpack-Plugin

## Gulp watch task
```js
var devConfig = require('./webpack.dev.config');

gulp.task('webpack:build-dev', function(callback) {
	var compiler = webpack(devConfig);
	compiler.watch({
		aggregateTimeout: 0
	}, function(error, stats) {
		if (error) {
			return console.log(error);
		}
		console.log('Webpack Recompiled: ' + (stats.endTime - stats.startTime) + 'ms');
		browserSync.reload();
	});
	callback();
});
```
