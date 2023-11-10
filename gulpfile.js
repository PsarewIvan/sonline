var http = require('http');
var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
const pug = require('gulp-pug');
var prettify = require('gulp-prettify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
const reload = browserSync.reload;


gulp.task('scripts', function() {
    return gulp.src(['source/assets/js/**/*.js'])
       // .pipe(concat('js.js'))
        .pipe(gulp.dest('htdocs/f/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('styles', function() {
    return gulp.src(['source/assets/styles/*.styl'])
        .pipe(stylus())
        .pipe(cleanCSS())
        .on('error', console.log)
        .pipe(gulp.dest('htdocs/f/css/'))
        .pipe(reload({stream: true}));
});

gulp.task('pug', function() {
    return gulp.src("source/pug/*.pug")
        .pipe(pug())
        .pipe(prettify())
        .on('error', console.log)
        .pipe(gulp.dest('htdocs/html/'));
});

gulp.task('images', function() {
    return gulp.src("source/assets/images/**")
        .on('error', console.log)
        .pipe(gulp.dest('htdocs/f/i/'));
});

gulp.task('fonts', function(){
    return gulp.src("source/assets/fonts/**/*")
        .on('error', console.log)
        .pipe(gulp.dest("htdocs/f/fonts"));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: './htdocs'
    });
});

// Requires gulp >=v3.5.0
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('source/assets/js/**', ['scripts', reload]);
    gulp.watch('source/assets/styles/**', ['styles', reload]);
    gulp.watch('source/pug/**', ['pug', reload]);
});

gulp.task('default', ['scripts', 'styles', 'pug', 'images', 'fonts', 'watch', 'browser-sync'], function() {
    gulp.watch('source/assets/js/**', ['scripts']);
    gulp.watch('source/assets/styles/**', ['styles']);
    gulp.watch('source/pug/**', ['pug']);
    gulp.watch('source/assets/images/**', ['images']);
});
