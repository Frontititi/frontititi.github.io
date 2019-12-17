'use strict';

let styles  = require('./tasks/styles')(gulp);

gulp.task('stylus:app', ['bootstrap'], styles.stylus(
    '_assets/stylus/app.styl',
    '_assets/css',
    'app.css'
  )
);
gulp.task('bootstrap',
  styles.bootstrap(
    '_assets/stylus/bootstrap.blz.styl',
    '_assets/css'
  )
);

gulp.task('stylus', ['stylus:app']);
gulp.task('css', ['stylus'], styles.css('_assets/css/app.css', 'dist/assets/css/'));
gulp.task('default', ['css']);