var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var del = require('del');
var path = require('path');
var sequence = require('gulp-sequence');

const distFolder = 'dist';
const webFolder = 'web';

gulp.task('build', ['scripts', 'styles', 'markup', 'icons', 'assets']);
gulp.task('release', sequence('clean', 'build'));

gulp.task('clean', function () {
    return del(distFolder);
});

gulp.task('scripts', function () {
    return gulp.src(path.join(webFolder, '**/*.ts'))
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: false,
            out: 'app.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distFolder));
});

gulp.task('styles', function () {
    return gulp.src(path.join(webFolder, '**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distFolder))
});

gulp.task('markup', function () {
    return gulp.src(path.join(webFolder, '**/*.html'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('icons', function () {
    return gulp.src(path.join(webFolder, '**/*.ico'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('assets', function () {
    return gulp.src(path.join(webFolder, '**/*.jpg'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('watch', ['build'], function () {
    gulp.watch([path.join(webFolder, '**/*.ts')], ['scripts']);
    gulp.watch([path.join(webFolder, '**/*.scss')], ['styles']);
    gulp.watch([path.join(webFolder, '**/*.html')], ['markup']);
    gulp.watch([path.join(webFolder, '**/*.ico')], ['icons']);
    gulp.watch([path.join(webFolder, '**/*.jpg')], ['assets']);
});

gulp.task('default', ['release']);