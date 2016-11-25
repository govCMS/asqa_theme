var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

function handleError(error) {
  console.log(error);
}

gulp.task('sass', function() {

  gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    // minimise CSS
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp
    .watch('sass/**/*.scss', ['sass'])
});

gulp.task('default', ['sass', 'watch']);
