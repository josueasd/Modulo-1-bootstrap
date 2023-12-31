'use strict'

const browserSync = require('browser-sync');
const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatmap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin');

gulp.task('sass', function () {
    gulp.src('./css/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});


gulp.task('sass:watch', function () {
    gulp.watch('./css/*.sass', ['sass'])
});

gulp.task('browser-sync', function () {
    var files = ['./*.html', './css/*.css', 'img/*.{png,gif,jpg}', './js/*.js']
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.start('sass:watch')
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copyfonts', function () {
    gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf, woff, eof, svg, eot, otf}*')
        .pipe(gulp.dest('.dist/fonts'));
});

gulp.task('imagemin', function () {
    return gulp.src('./imagenes/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('.dist/fimagenes'));
});

gulp.task('usemin', function () {
    return gulp.src('./html/*')
        .pipe(flatmap(function (stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function () { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    nlinejs: [uglify()],
                    nlinecss: [cleanCss(), 'concat']
                }))
        }))
        .pipe(gulp.dest('.dist/'));
});

gulp.task('build', 'clean', function () {
    gulp.start('copyfonts', 'imagemin', 'usemin')
});

