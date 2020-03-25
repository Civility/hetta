const { src, dest }  = require( 'gulp');
const path = require( './../config.json');

module.exports = function taskCopy() {
    return src(path.src.copy,{ dot: true })
    // .on('data', function(file){
    //     console.log({
    //         path: file.path,
    //         cwd: file.cwd,
    //         base: file.base,
    //         dirname: file.dirname,
    //         relative: file.relative,
    //         stem: file.stem,
    //         extname: file.extname
    //     });
    // })
    .pipe(dest(function(file){
        return file.extname == '.php' ? (path.dest.copy) : (path.baseDir);
    }))
}
