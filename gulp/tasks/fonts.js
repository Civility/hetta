const { src, dest }  = require( 'gulp');
const path = require( './../config.json');

module.exports = function taskfonts() {
    return src(path.src.fonts)
	.pipe(dest(path.dest.fonts))
}