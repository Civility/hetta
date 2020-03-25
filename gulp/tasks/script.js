const { src, dest }  = require('gulp');
const path = require ('./../config.json');
const babel = require ( 'gulp-babel');
const uglify = require('gulp-uglify'); //минификация и оптимизация javascript
const terser = require ( 'gulp-terser'); //минификация и оптимизация javascript

const concat = require ( 'gulp-concat'); // делает из путей 1 фаил, по порядку
const plumber = require ( 'gulp-plumber'); //перехватывать ошибки
const cache = require('gulp-cached');
const remember = require('gulp-remember');

module.exports = function taskScript() {
    return src(path.src.script)
    .pipe(plumber())
    // .pipe(cache('taskScript'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(terser())
    .pipe(uglify())
    .pipe(remember('taskScript')) 
    .pipe(concat('scripts.js'))
    .pipe(dest(path.dest.script))
}

			// "./node_modules/@popperjs/core/dist/umd/popper.min.js",
			// "./node_modules/bootstrap/js/src/util.js",
			// "./node_modules/bootstrap/js/src/button.js",
			// "./node_modules/bootstrap/js/src/collapse.js",
			// "./node_modules/bootstrap/js/src/dropdown.js",
			// "./node_modules/bootstrap/js/src/modal.js",
			// "./node_modules/bootstrap/js/src/scrollspy.js",
			// "./node_modules/bootstrap/js/src/tab.js",
			// "./node_modules/bootstrap/js/src/tooltip.js",
			// "./node_modules/bootstrap/js/src/popover.js",