const { src, dest }  = require( 'gulp');
const path = require( './../config.json');
const pug = require( 'gulp-pug');
const htmlValidator = require( 'gulp-w3c-html-validator');
const plumber = require( 'gulp-plumber');
// const cache = require('gulp-cached');
const remember = require('gulp-remember');

module.exports = function taskPug() {
    return src(path.src.pug)
    // .pipe(cache('pug'))
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(htmlValidator.reporter())
    .pipe(remember('pug')) 
    .pipe(dest(path.dest.pug))
}