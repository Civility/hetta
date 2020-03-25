'use strict'
const gulp = require( 'gulp');

const serve = require( './gulp/tasks/serve');


const taskImgmin = require( './gulp/tasks/image');
const taskPug = require( './gulp/tasks/pug');
const taskSass = require( './gulp/tasks/scss');
const taskScript = require( './gulp/tasks/script');

const taskfonts = require( './gulp/tasks/fonts');
const taskFavicon = require( './gulp/tasks/favicons');
const taskCopy = require( './gulp/tasks/copy');
const taskValidator = require( './gulp/tasks/validator');
const taskClean = require( './gulp/tasks/clean');

const dev = gulp.parallel(taskFavicon, taskImgmin, taskPug,  taskScript, taskSass, taskfonts, taskCopy, taskValidator)

const build = gulp.series(taskClean, dev)
module.exports.build = build

module.exports.pug = taskPug
module.exports.css = taskSass
module.exports.js = taskScript
module.exports.start = gulp.series(build, serve);