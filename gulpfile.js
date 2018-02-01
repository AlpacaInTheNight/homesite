var gulp			= require('gulp');
//var ts				= require('gulp-typescript');
var sourcemaps		= require('gulp-sourcemaps');
var uglify			= require('gulp-uglify');
//var babel			= require('gulp-babel');
var plumber			= require('gulp-plumber');
var less			= require('gulp-less');
var cleanCSS		= require('gulp-clean-css');
//var gutil			= require("gulp-util");

var source			= require('vinyl-source-stream');
var browserify		= require('browserify');
var tsify			= require('tsify');
var buffer			= require('vinyl-buffer');

var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

const ES_TARGET_VERSION = "esnext";

gulp.task('scripts', function () {

	return browserify({
		basedir: '.',
		debug: true,
		entries: ['src/index.tsx'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify, {
		"target": ES_TARGET_VERSION,
		"module": "commonjs",
		"moduleResolution": "node",
		"isolatedModules": false,
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true,
		"declaration": false,
		"noImplicitAny": true,
		"noImplicitUseStrict": false,
		"removeComments": true,
		"noLib": false,
		"preserveConstEnums": true,
		"suppressImplicitAnyIndexErrors": true,
		"strictNullChecks": true
	})
	/*.transform('babelify', { //not sure what that is for. additional polyfilling?
		presets: ['es2015'],
		extensions: ['.ts']
	})*/
	.bundle().on('error', function(error) {
		console.log("----------------------------------------");
		console.log(error.message);
		console.log("----------------------------------------");
	})
	.pipe(source('bundle.js'))
	.pipe(buffer())
	//.pipe(sourcemaps.write('.')) //writes map into bundle.js
	//.pipe(uglify())
	.pipe(gulp.dest("dist"));

});

gulp.task('less', function () {
	return gulp.src('src/less/main.less')
	.pipe(plumber(function (error) {
		console.log("----------------------------------------");
		console.log(error.message);
		console.log("----------------------------------------");
		this.emit('end');
	}))
	.pipe(sourcemaps.init())
	.pipe(less({
		paths: ['src/less/'],
		plugins: [autoprefix]
	}))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts', 'less'], function () {

	gulp.watch(['src/**/*.ts', 'src/**/*.tsx'], ['scripts'])
	.on('change', function(event) {})
	.on('error', function swallowError (error) {
		console.log(error.toString())
		this.emit('end');
	});

	gulp.watch('src/**/*.less', ['less']);

});