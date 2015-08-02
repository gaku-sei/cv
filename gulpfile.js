var fs = require('fs');
var util = require('util');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var pdf = require('gulp-html2pdf');

var stylesheets = [__dirname + '/bower_components/bootstrap/dist/css/bootstrap.css', __dirname + '/style.css'];

gulp.task('jade', function() {
  var locals = util._extend(JSON.parse(fs.readFileSync('locals.json', 'utf-8')), {
    stylesheets: stylesheets
  });

  return gulp.src('index.jade')
    .pipe(jade({locals: locals}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch(['index.jade', 'locals.json'], ['jade']);
});

gulp.task('pdf', ['jade'], function() {
  return gulp.src('index.html')
    .pipe(pdf())
    .on('error', gutil.log)
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['jade', 'watch']);
