const { src, dest }  = require( 'gulp');
const path = require( './../config.json');
const imagemin = require( 'gulp-imagemin');
const plumber = require( 'gulp-plumber');

module.exports = function taskImgmin() {
  return src(path.src.img)
  .pipe(plumber())
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 85, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo({ plugins: [{removeViewBox: true},{cleanupIDs: false} ]})
  ])
  )
  .pipe(dest(path.dest.img));
}