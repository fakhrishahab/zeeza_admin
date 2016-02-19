var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	minify_css = require('gulp-minify-css');

var defaultTasks = [
	'assets',
	'html',
	'script',
	'style_sass',
	'style'
]

gulp.task('assets', function(){
	return gulp.src('./dev/assets/**/*.*')
	.pipe(gulp.dest('public/assets'))
})

gulp.task('html', function(){
	return gulp.src('./dev/**/*.html')
	.pipe(gulp.dest('public'))
})

gulp.task('script', function(){
	return gulp.src('./dev/script/**/*.*')
	// .pipe(uglify())
	.pipe(gulp.dest('public/script'))
})

gulp.task('style_sass', function(){
	return gulp.src('./dev/style/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sass.sync().on('Error', sass.logError))
		.pipe(gulp.dest('public/./style'))
})

gulp.task('style', function(){
	return gulp.src('./dev/style/*.css')
		.pipe(minify_css())
		.pipe(gulp.dest('public/style'))
})

gulp.task('del', function(cb){
	del(defaultTasks, cb)
})

gulp.task('watch', function(){
	gulp.watch('./dev/**/*.*', ['assets', 'html', 'script', 'style_sass','style'])
})

gulp.task('default', ['del'])
gulp.task('zeeza_admin', defaultTasks)
gulp.start()