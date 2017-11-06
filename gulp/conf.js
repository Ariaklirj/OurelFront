/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');
var path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  gulpNgConfig = require('gulp-ng-config');
/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/\/bootstrap\.js$/, /\/bootstrap\.css/],
  directory: 'bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};


gulp.task('config', function () {
  gutil.log(gutil.colors.yellow('[ Enviroment => staging ]'));
  // console.log('[enviroment => staging]');
  gulp.src(path.join(conf.paths.src, '../config/config.json'))
    .pipe(gulpNgConfig('frontend.config', {
      environment: 'staging'
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')))
});

gulp.task('config:build', function () {
  gutil.log(gutil.colors.red('********************************'));
  gutil.log(gutil.colors.red('* [ Enviroment => production ] *'));
  gutil.log(gutil.colors.red('********************************'));
  // console.log('[enviroment => production]');
  gulp.src(path.join(conf.paths.src, '../config/config.json'))
    .pipe(gulpNgConfig('frontend.config', {
      environment: 'production'
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')))
});
