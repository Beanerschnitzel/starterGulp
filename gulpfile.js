'use strict'
// Require Gulp
var gulp = require('gulp');
// Require the gulp-sass plugin
var sass = require('gulp-sass');
// Require autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// Require Sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// Require browser-sync
var browserSync = require('browser-sync').create();
// Require pug
var pug = require('gulp-pug');


gulp.task('default', ['browserSync', 'sass', 'puglify'], function() {
    gulp.watch('style/scss/**/*.scss', ['sass']);
    gulp.watch('pug/**/*.pug', ['puglify']);
    gulp.watch('pug/**/*.pug', browserSync.reload);
    gulp.watch('**/*.html', browserSync.reload);
    gulp.watch('**/*.js', browserSync.reload);
    // ... Other watchers
});

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
})

gulp.task('sass', function() {
    gulp.src('style/scss/**/*.scss') // Gets the styles.scss file
        .pipe(sourcemaps.init()) // Initialize sourcemap plugin
        .pipe(sass()) // Passes it through a gulp-sass task
        .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
        .pipe(sourcemaps.write()) // Writing sourcemaps
        .pipe(gulp.dest('style/css')) // Outputs it in the css folder
        // Reloading the stream
        .pipe(browserSync.reload({
            stream: true
        }));
});

//pug tasks

gulp.task('puglify', function() {
    gulp.src('pug/**/*.pug')
        .pipe(pug({
            // Your options in here.
            pretty: true
        }))
        .pipe(gulp.dest('./')); // tell gulp our output folder
});
