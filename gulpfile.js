// var http = require('http');
// var gulp = require('gulp');
// var concat = require('gulp-concat');
// var stylus = require('gulp-stylus');
// const pug = require('gulp-pug');
// var prettify = require('gulp-prettify');
// var cleanCSS = require('gulp-clean-css');
// var browserSync = require('browser-sync');
// const reload = browserSync.reload;

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const prettify = require('gulp-prettify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function libs() {
    return gulp
        .src(['source/assets/libs/**/*'])
        .pipe(gulp.dest('htdocs/f/libs/'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp
        .src(['source/assets/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('htdocs/f/js/'))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp
        .src(['source/assets/styles/*.styl'])
        .pipe(stylus())
        .pipe(cleanCSS())
        .on('error', console.log)
        .pipe(gulp.dest('htdocs/f/css/'))
        .pipe(browserSync.stream());
}

function compilePug() {
    return gulp
        .src('source/pug/*.pug')
        .pipe(pug())
        .pipe(prettify())
        .on('error', console.log)
        .pipe(gulp.dest('htdocs/'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp
        .src('source/assets/images/**')
        .on('error', console.log)
        .pipe(gulp.dest('htdocs/f/i/'));
}

function fonts() {
    return gulp
        .src('source/assets/fonts/**/*')
        .on('error', console.log)
        .pipe(gulp.dest('htdocs/f/fonts'));
}

function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: './htdocs',
        },
    });
    cb();
}

function watchFiles() {
    gulp.watch('source/assets/libs/**', libs);
    gulp.watch('source/assets/js/**', scripts);
    gulp.watch('source/assets/styles/**', styles);
    gulp.watch('source/pug/**', compilePug);
    gulp.watch('source/assets/images/**', images);
    gulp.watch('source/assets/fonts/**', fonts);
}

exports.libs = libs;
exports.scripts = scripts;
exports.styles = styles;
exports.pug = compilePug;
exports.images = images;
exports.fonts = fonts;
exports.watch = gulp.parallel(watchFiles, browserSyncServe);

exports.default = gulp.series(
    gulp.parallel(libs, scripts, styles, compilePug, images, fonts),
    gulp.parallel(watchFiles, browserSyncServe)
);
