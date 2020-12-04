const {dest, src, watch, parallel} = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//Relie mon scss à mon css
function sassToCss(){
    return src('./sass/import.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream()); //Pour la browser
}

//Mise à jour des changements
function watcher(done){
    watch('./sass/', sassToCss)
    browserSync.reload();
    done();
}

function browser() {
    browserSync.init({
        server: {
            baseDir:"./"
        }
    })
    watch("*html").on('change', browserSync.reload);
}

module.exports = {
    sassToCss,
    watcher,
    browser: parallel(browser, watcher)
}