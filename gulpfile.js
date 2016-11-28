var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var del = require('del');


gulp.task('browserify', function () {
  var bundler = browserify({
    entries: './src/js/main.js',
    transform: [reactify],
    debug: true
  })

  return bundler.bundle()
    .pipe(source('bundle.js')) //get a vinyl-source-stream
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', console.error.bind(console))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})


gulp.task('copy', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});


gulp.task('open', ['connect'], function () {
  gulp.src(__filename)
    .pipe(open({ uri: 'http://localhost:8000' }));
});

gulp.task('connect', function () {
  connect.server({
    root: ['dist'],
    port: 8000,
    base: 'http://localhost',
    livereload: true
  });
});

gulp.task('clean:bundle', function () {
  return del([
    './dist/js/*'
  ]);
});

gulp.task('default', ['clean:bundle','browserify', 'copy',  'open']);
