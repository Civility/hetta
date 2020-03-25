const { src, dest }  = require( 'gulp');
const path = require( './../config.json');
const plumber = require( 'gulp-plumber'); //перехватывать ошибки
const sass = require( 'gulp-sass');
const concat = require ( 'gulp-concat');
const autoprefixer = require( 'gulp-autoprefixer');
const cleanCSS = require( 'gulp-clean-css'); //минификация стилей
const csso = require( 'gulp-csso'); //сокращает стили
const uncss  = require('gulp-uncss'); // удаление не нужных стилей
const cache = require('gulp-cached');
const remember = require('gulp-remember');

module.exports = function taskSass() {
    return src(path.src.scss)
    .pipe(plumber())
    // .pipe(cache('scss'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    // .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(uncss({
      html: [path.baseDir+'*.html'],
      ignore: [/\w\.in/,
        "./src/scss/page/**/*.scss", "./scss/page/**/*.scss",
        ".fade",
        ".collapse",
        ".collapsing",
        /(#|\.)navbar(\-[a-zA-Z]+)?/,
        /(#|\.)carousel(\-[a-zA-Z]+)?/,
        /(#|\.)slider(\-[a-zA-Z]+)?/,
        /(#|\.)dropdown(\-[a-zA-Z]+)?/,
        /(#|\.)card(\-[a-zA-Z]+)?/,
        /(#|\.)col(\-[a-zA-Z]+)?/,
        /(#|\.)invalid(\-[a-zA-Z]+)?/,
        /(#|\.)tooltip(\-[a-zA-Z]+)?/,
        /(#|\.)form(\-[a-zA-Z]+)?/,
        /(#|\.)alert(\-[a-zA-Z]+)?/,
        /(#|\.)img(\-[a-zA-Z]+)?/,
        /(#|\.)scroll(\-[a-zA-Z]+)?/,
        /(#|\.)modal(\-[a-zA-Z]+)?/,
        /(#|\.)(open)/,
        ".modal",
        ".modal-lg",
        ".modal.fade.in",
        ".modal-dialog",
        ".modal-document",
        ".modal-scrollbar-measure",
        ".modal-backdrop.fade",
        ".modal-backdrop.in",
        ".modal.fade.modal-dialog",
        ".modal.in.modal-dialog",
        ".modal-open",
        ".show",   
        ".active",
        ".result",
        ".form-text",
        ".visible",
        ".success",
        /^\.invisible/,
      ],
			// ignoreSheets : [/fonts.googleapis/],
      // stylesheets  : ['dest/css/dist/css/bootstrap.css', 'src/public/css/main.css'],
    }))
    .pipe(autoprefixer({cascade: false}))
    .pipe(csso({ debug: true }))
    .pipe(cleanCSS({
        debug: true,
        compatibility: '*'
      }))
    .pipe(remember('scss')) 
    .pipe(concat('main.css'))
    .pipe(dest(path.dest.scss))
}