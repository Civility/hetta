const { src, dest }  = require( 'gulp');
const path = require( './../config.json');

module.exports = function taskValidator() {
    return src(path.src.validator)
    // .on('data', function(file){
    //     console.log({
    //         path: file.path,
    //         cwd: file.cwd,
    //         base: file.base,
    //         relative: file.relative,
    //         dirname: file.dirname,
    //         stem: file.stem,
    //         extname: file.extname
    //     });
    // })
    // .pipe(dest(path.dest.script))
    .pipe(dest(function(file){
        return file.relative == 'messages_ru.js' ? 'dest/js/localization/' : 'dest/js/';
    }))
    
}