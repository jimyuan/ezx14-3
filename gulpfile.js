(function (gulp, gulpLoadPlugins) {
  'use strict';

  var $ = gulpLoadPlugins({ pattern: '*', lazy: true }),
      _ = { 
        app: 'app', 
        dist:'app/dist',
        img: 'app/img',
        sass:'app/sass',
        css: 'app/css',
        js:  'app/js',
        views:'app/views'
      };

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ jsonlint
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jsonlint', function() {
    return gulp.src([
      'package.json',
      'bower.json',
      '.bowerrc',
      '.jshintrc',
      '.jscs.json'
    ])
    .pipe($.plumber())
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ jshint
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jshint', function() {
    return gulp.src([
      'gulpfile.js',
      _.js + '/**/*.js'
    ])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ sass2css
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('sass', function(){
    return gulp.src(_.sass + '/**/*.scss').pipe($.rubySass({
      style: 'expanded',
      compass: true,
      noCache: false,
      lineNumber:true
    }).on('error', $.util.log))
    .pipe($.plumber())
    .pipe(gulp.dest(_.css))
    .pipe($.size());
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ minify svg files
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('svg', function() {
    return gulp.src([
      _.img + '/**/*.svg',
      _.css + '/**/*.svg'
    ])
    .pipe($.plumber())
    .pipe($.svgmin([{ removeDoctype: false }, { removeComments: false }]))
    .pipe(gulp.dest(_.dist + '/img'))
    .pipe($.size());
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ minify images
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('images', function() {
    gulp.src(_.app + '/*.{png,jpg,jpeg,gif,ico}').pipe(gulp.dest(_.dist));
    return gulp.src([
      _.img + '/**/*.{png,jpg,jpeg,gif,ico}'
    ])
    .pipe($.plumber())
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(_.dist + '/img'))
    .pipe($.size());
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ join & minify css & js
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('html', ['sass'], function() {
    gulp.start('copy');
    var js = $.filter('**/*.js'), css = $.filter('**/*.css');
    return gulp.src([_.app + '/*.html'])
    .pipe($.plumber())
    .pipe($.useref.assets())
    .pipe(js)
    .pipe($.uglify())
    .pipe(js.restore())
    .pipe(css)
    .pipe($.minifyCss({keepSpecialComments:0}))
    .pipe(css.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest(_.dist))
    .pipe($.size());
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ copy static files to dist files
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('copy', function(){
    gulp.src(_.app + '/*.txt').pipe(gulp.dest(_.dist));
    gulp.src(_.views + '/*.html').pipe(gulp.dest(_.dist + '/views/'));
    gulp.src(_.app + '/bower_components/ratchet/fonts/*.*').pipe(gulp.dest(_.dist + '/fonts/'));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ connect
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('connect', $.connect.server({
    root: [_.app],
    livereload: true,
    port: 9000
  }));

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ server
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 gulp.task('server', ['connect', 'sass'], function() {
   gulp.start('localhost');
 });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ watch
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('watch', ['server'], function() {
    // Watch for changes in `app` dir
    $.watch({ glob: [
      _.app + '/**/*.{html,txt}',
      _.views + '/**/*.html',
      _.sass + '/**/*.scss',
      _.css + '/**/*.css',
      _.js + '/**/*.js',
      _.img + '/**/*.{png,jpg,jpeg,gif,ico}'
    ]}, function(files) {
      return files.pipe($.plumber()).pipe($.connect.reload());
    });

    // Watch style files
    $.watch({ glob: [_.sass + '/**/*.{sass,scss}'] }, function() {
      gulp.start('sass');
    });

    // Watch image files
    $.watch({ glob: [_.img + '/**/*.{png,jpg,jpeg,gif,ico}'] }, function() {
      gulp.start('images');
    });
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ clean dist folder
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('clean', function() {
    var stream = gulp.src([
      _.dist + '*'
    ], { read: false });
    return stream.pipe($.rimraf());
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ environ
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('localhost', function() {
    $.shelljs.exec('open http://localhost:9000/d.html');
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ alias
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('test', ['jsonlint', 'jshint']);
  gulp.task('build', ['test', 'clean', 'html', 'images', 'svg']);

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ default
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('default', ['clean'], function() {
    gulp.start('build');
  });

}(require('gulp'), require('gulp-load-plugins')));