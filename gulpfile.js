var gulp=require('gulp');

var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('images', () => {
    return gulp.src('/img/**/*.+(png|jpg|gif|svg')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('/dist/img'))
});