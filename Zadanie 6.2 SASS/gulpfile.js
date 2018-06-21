const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Test message
gulp.task('test', () => console.log('Test message ...'));

// Copy HTML files
gulp.task('copyHtml', () => gulp.src('src/*.html').pipe(gulp.dest('dist')));

// Compile Sass
gulp.task('sass', () => gulp.src('src/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('style.css'))
  .pipe(gulp.dest('dist'))
);

// Watch task
gulp.task('watch', () => {
  gulp.watch('src/*.html', ['copyHtml']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

// Default action
gulp.task('default', ['watch']);
