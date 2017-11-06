
var gulp = require('gulp'),
  awspublish = require('gulp-awspublish'),
  gutil = require('gulp-util'),
  conf = require('./conf'),
  path = require('path'),
  fileExists = require('file-exists'),
  run = require('gulp-sequence');
const  del = require('del');

var argv = require('yargs').argv;
var enviroment = (!argv.env) ? 'staging' : argv.env;


var localConfig = {
  buildSrc: './build/**/*',
  getAwsConf: function (environment) {
    var conf = require('../config/config.json');
    if (!conf[environment]) {
      throw 'No aws conf for env: ' + environment;
    }
    return {keys: conf[environment].EnvironmentConfig.deploy};
  }
};


gulp.task('cleanMinify',function () {
  if(enviroment=='staging'){
    if(fileExists('.awspublish.api.com')){
      del.sync(['dist/', '.awspublish.api.com']);
    }
  }else if(enviroment=='production'){
    if(fileExists('.awspublish.api.com')){
      del.sync(['dist/', '.awspublish.api.com']);
    }
  }
});

gulp.task('configuration',function () {
  // console.log('### enviroment => ' + enviroment + ' ###');
  if(enviroment=='staging'){
    run('config')();
  }else if(enviroment=='production'){
    run('config:build')();
  }
});

gulp.task('deploy',['cleanMinify','configuration','build'], function () {
  console.log('Deploy task disable.');
  // var awsConf = localConfig.getAwsConf(enviroment);
  // var publisher = awspublish.create(awsConf.keys);
  // return gulp.src(path.join(conf.paths.dist, '/**/*'))
  //   .pipe(awspublish.gzip({ext: ''}))
  //   .pipe(publisher.publish())
  //   .pipe(publisher.cache())
  //   .pipe(publisher.sync())
  //   .pipe(awspublish.reporter());
});
