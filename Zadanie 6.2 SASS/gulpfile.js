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

// Compile Sass & Stream
gulp.task('sass-stream', () => gulp.src('src/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('style.css'))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream())
);

// Watch task
gulp.task('watch', ['copyHtml', 'sass'], () => {
  gulp.watch('src/*.html', ['copyHtml']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

// Serve & watch task
gulp.task('serve', ['copyHtml', 'sass'], () => {
  browserSync.init({
    server: './dist'
  });
  gulp.watch('src/scss/**/*.scss', ['sass-stream']);
  gulp.watch('src/*.html', ['copyHtml']).on('change', browserSync.reload);
  }
);

// Default action
gulp.task('default', ['serve']);
