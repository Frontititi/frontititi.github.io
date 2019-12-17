'use strict';

module.exports = function(gulp) {
  let bootstrap     = require('bootstrap-styl'),
      changed       = require('gulp-changed'),
      concat        = require('gulp-concat'),
      cssnano       = require('gulp-cssnano'),
      postcss       = require('gulp-postcss'),
      stylus        = require('gulp-stylus'),
      lost          = require('lost'),
      pxtorem       = require('postcss-pxtorem'),
      autoprefixer  = require('autoprefixer'),
      rupture       = require('rupture'),
      mqpacker      = require('css-mqpacker'),
      plumber       = require('gulp-plumber');

  let tasks = {
    stylus: function (sources, destinyDir, output, customVars) {
      return function() {
        let config = {
          'include css': true,
          'use': [rupture()],
          define: customVars || {}
        };
        return gulp.src(sources)
          .pipe(plumber({errorHandler: error}))
          .pipe(stylus(config))
          .pipe(postcss([
            lost(),
            pxtorem(),
            mqpacker(),
            autoprefixer({
              browsers: ['last 2 versions', 'Android >= 4', 'IE >= 9']
            })
          ]))
          .pipe(concat(output))
          .pipe(cssnano({ zindex: false }))
          .pipe(gulp.dest(destinyDir));
      }
    },

    bootstrap: function (sources, destinyDir) {
      let config = {
        use: [bootstrap()]
      };
      return function() {
        return gulp.src(sources)
          .pipe(plumber({errorHandler: error}))
          .pipe(stylus(config))
          .pipe(gulp.dest(destinyDir));
      }
    },


    vendors: function (source, destinyDir, minify) {
      return function() {
        return gulp.src(source)
          .pipe(plumber({errorHandler: error}))
          .pipe(changed(destinyDir))
          .pipe(concat('vendors.min.css'))
          .pipe(cssnano({ zindex: false }))
          .pipe(gulp.dest(destinyDir));
      }
    },

    css: function (sources, destinyDir) {
      return function() {
        return gulp.src(sources)
          .pipe(plumber({errorHandler: error}))
          .pipe(changed('assets/stylus/'))
          .pipe(cssnano())
          .pipe(concat('app.min.css'))
          .pipe(gulp.dest(destinyDir));
      }
    }
  };


  return tasks;
};
