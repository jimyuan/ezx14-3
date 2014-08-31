(function (gulp, gulpLoadPlugins) {
  'use strict';

  var $ = gulpLoadPlugins({ pattern: '*', lazy: true }),
    _ = { app: 'app', dist: 'app/dist' };

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
    .pipe($.jsonlint()).pipe($.jsonlint.reporter())
    .pipe($.notify({
      message: '<%= options.date %> ✓ jsonlint: <%= file.relative %>',
      templateOptions: {
        date: new Date()
      }
    }));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ coffeelint
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('coffeelint', function() {
  //   return gulp.src([
  //     _.app + '/scripts/**/*.coffee',
  //     '!' + _.app + '/scripts/vendor/**/*.coffee'
  //   ])
  //   .pipe($.plumber())
  //   .pipe($.coffeelint())
  //   .pipe($.coffeelint.reporter())
  //   .pipe($.notify({
  //     message: '<%= options.date %> ✓ coffeelint: <%= file.relative %>',
  //     templateOptions: {
  //       date: new Date()
  //     }
  //   }));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ jshint
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jshint', function() {
    return gulp.src([
      'gulpfile.js',
      _.app + '/js/**/*.js'
    ])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe($.notify({
      message: '<%= options.date %> ✓ jshint: <%= file.relative %>',
      templateOptions: {
        date: new Date()
      }
    }));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ mocha
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('mocha', function() {
  //   return gulp.src('test/*.js').pipe($.plumber())
  //   .pipe($.mocha({ reporter: 'list' }));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ coffee
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('coffees', ['coffeelint'], function() {
  //   return gulp.src([
  //     _.app + '/scripts/**/*.coffee',
  //     '!' + _.app + '/scripts/vendor/**/*.coffee'
  //   ])
  //   .pipe($.plumber())
  //   .pipe($.coffee({ bare: true }).on('error', $.util.log))
  //   .pipe(gulp.dest(_.app + '/scripts'))
  //   .pipe($.size()).pipe($.notify({
  //     message: '<%= options.date %> ✓ scripts: <%= file.relative %>',
  //     templateOptions: {
  //       date: new Date()
  //     }
  //   }));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ requirejs
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('requirejs', ['coffees', 'jshint'], function() {
  //   $.requirejs({
  //     baseUrl: _.app + '/scripts',
  //     optimize: 'none',
  //     include: ['requirejs', 'config'],
  //     mainConfigFile: _.app + '/scripts/config.js',
  //     out: 'body.js',
  //     preserveLicenseComments: true,
  //     useStrict: true,
  //     wrap: true
  //   })
  //   .pipe($.plumber()).pipe(gulp.dest(_.dist + '/scripts')).pipe($.size())
  //   .pipe($.notify({
  //     message: '<%= options.date %> ✓ requirejs: <%= file.relative %>',
  //     templateOptions: {
  //       date: new Date()
  //     }
  //   }));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ minify scripts
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('scripts',  function() {
  //   var js = $.filter('**/*.js');
  //   return gulp.src([_.app + '/*.html'])
  //   .pipe($.useref.assets())
  //   .pipe(js)
  //   .pipe($.uglify())
  //   .pipe(js.restore())
  //   .pipe($.useref.restore())
  //   .pipe($.useref())
  //   .pipe(gulp.dest(_.dist))
  //   .pipe($.size())
  //   .pipe($.notify({
  //     message: '<%= options.date %> ✓ scripts: <%= file.relative %>',
  //     templateOptions: {
  //       date: new Date()
  //     }
  //   }));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ sass2css
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('sass', function(){
    return gulp.src(_.app + '/sass/docs.scss')
    .pipe($.plumber())
    //.pipe($.sass())
    .pipe($.compass({
      config_file: _.app + "/config.rb",
      css: _.app + '/css',
      sass: _.app + '/sass',
      image: _.app + '/img'
    }))
    .pipe(gulp.dest(_.app + '/css'))
    .pipe($.size())
    .pipe($.notify({
      message: '<%= options.date %> ✓ scripts: <%= file.relative %>',
      templateOptions: {
        date: new Date()
      }
    }));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ minify styles
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('styles', function() {
  //   return gulp.src(_.app + '/css/*.css')
  //     .pipe($.sass())
    // .pipe($.rubySass({
    //   loadPath: [_.app + '/scripts/vendor'],
    //   require: ['sass-css-importer'], // @require https://github.com/chriseppstein/sass-css-importer
    //   style: 'expanded',
    //   compass: false, // @deprecated only work's with sass (3.2.18) or earlier
    //   noCache: false
    // }).on('error', $.util.log))
  //   .pipe($.autoprefixer('last 1 version', '> 1%', 'ie 8'))
  //   .pipe(gulp.dest(_.app + '/css'))
  //   .pipe($.size())
  //   .pipe($.notify({
  //     message: '<%= options.date %> ✓ styles: <%= file.relative %>',
  //     templateOptions: {
  //       date: new Date()
  //     }
  //   }));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ svg
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('svg', function() {
  //   return gulp.src([
  //     _.app + '/images/**/*.svg',
  //     _.app + '/styles/**/*.svg'
  //   ])
  //   .pipe($.plumber())
  //   .pipe($.svgmin([{ removeDoctype: false }, { removeComments: false }]))
  //   .pipe(gulp.dest(_.dist + '/images')).pipe($.size()).pipe($.notify({
  //     message: '<%= options.date %> ✓ svg: <%= file.relative %>',
  //     templateOptions: {
  //       date: new Date()
  //     }
  //   }));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ images
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('images', function() {
    gulp.src(_.app + '/*.{png,jpg,jpeg,gif,ico}').pipe(gulp.dest(_.dist));
    return gulp.src([
      _.app + '/img/**/*.{png,jpg,jpeg,gif,ico}'
    ]).pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))).pipe(gulp.dest(_.dist + '/img')).pipe($.size()).pipe($.notify({
      message: '<%= options.date %> ✓ images: <%= file.relative %>',
      templateOptions: {
        date: new Date()
      }
    }));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ minify css & js
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('html', ['sass'], function() {
    var js = $.filter('**/*.js'), css = $.filter('**/*.css');
    gulp.src(_.app + '/*.txt').pipe(gulp.dest(_.dist));
    gulp.src(_.app + '/views/*.html').pipe(gulp.dest(_.dist + '/views/'));
    gulp.src(_.app + '/fonts/ratchions.*').pipe(gulp.dest(_.dist + '/fonts/'));
    return gulp.src([_.app + '/*.html'])
    .pipe($.useref.assets())
    .pipe(js)
    // .pipe($.uglify())
    .pipe(js.restore())
    .pipe(css)
    .pipe($.minifyCss())
    .pipe(css.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest(_.dist))
    .pipe($.size())
    .pipe($.notify({
      message: '<%= options.date %> ✓ html: <%= file.relative %>',
      templateOptions: {
        date: new Date()
      }
    }));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ bower (Inject Bower components)
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // gulp.task('wiredep', function() {
  //   gulp.src(_.app + '/css/*.{sass,scss}')
    // .pipe($.wiredep.stream({
    //   directory: _.app + '/scripts/vendor',
    //   ignorePath: _.app + '/scripts/vendor/'
    // }))
    // .pipe(gulp.dest(_.app + '/css'));
    // gulp.src(_.app + '/*.html')
    // .pipe($.wiredep.stream({
    //   directory: _.app + '/scripts/vendor',
    //   ignorePath: _.app + '/'
    // }))
    // .pipe(gulp.dest(_.app));
  // });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ connect
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//  gulp.task('connect', $.connect.server({
//    root: [_.app],
//    livereload: true
//  }));

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ server
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//  gulp.task('server', ['connect', 'sass'], function() {
//    gulp.start('localhost');
//  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ watch
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('watch', ['browser-sync'], function() {
    // Watch for changes in `app` dir
    $.watch({ glob: [
      _.app + '/views/**/*.html',
      _.app + '/sass/**/*.{sass,scss,css}',
      _.app + '/css/**/*.css',
      _.app + '/js/**/*.js',
      _.app + '/images/**/*.{png,jpg,jpeg,gif,ico}'
    ] }, function(files) {
      return files.pipe($.browserSync.reload({stream:true, once: true}));
    });

//    Watch style files
    $.watch({ glob: [_.app + '/sass/**/*.{sass,scss}'] }, function() {
          gulp.start('sass');
      });
  });


  gulp.task('browser-sync', function() {
    $.browserSync.init(null, {
        proxy: "127.0.0.1:8002"
    });
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ clean
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('clean', [], function() {
    var stream = gulp.src([
      _.dist + '*'
    ], { read: false });
    return stream.pipe($.rimraf());
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ environ
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('localhost', function() {
    $.shelljs.exec('open http://localhost:8002/2014ugc');
  });
  gulp.task('prod', function() {
    $.shelljs.exec('open https://www.npmjs.org/package/generator-gulp-requirejs');
  });
  gulp.task('dev', function() {
    $.shelljs.exec('open http://www.npmjs.org/package/generator-gulp-requirejs');
  });
  gulp.task('hml', function() {
    $.shelljs.exec('open https://www.npmjs.org/package/generator-gulp-requirejs');
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ alias
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('test', ['jsonlint', 'jshint']);
  gulp.task('build', ['clean','test', 'html', 'images']);

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ✓ default
  //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('default', ['clean'], function() {
    gulp.start('build');
  });

}(require('gulp'), require('gulp-load-plugins')));