'use strict'

/*
 * Lifted from gulp-sass example
 */
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const src = {
  'html': 'src/',
  'scss': 'src/sass',
  'dist': 'src/dist'
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: src.html
    });

    gulp.watch(src.scss + '/*.sass', ['sass']);
    gulp.watch(src.html + '/*.html').on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp
        .src(src.scss + '/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.dist))
        .pipe(reload({ stream: true }));
});

gulp.task('default', ['serve']);
