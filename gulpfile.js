var gulp=require('gulp');

var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var responsive = require('gulp-responsive');

gulp.task('compress-images', () => {
    return gulp.src('img/*.jpg')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive:true,
            optimization:7
        })))
        .pipe(gulp.dest('./dist/compressedImg'))
});
// gulp.task('images', function () {
//     return gulp.src('img/*.jpg')
//         .pipe(imagemin({
//             progressive: true

//         }))
//         .pipe(gulp.dest('dist'));
// });

 
gulp.task('default', function () {
  return gulp.src('img/*.{png,jpg}')
    .pipe(responsive({
      'background-*.jpg': {
        width: 700,
        quality: 50
      },
      'cover.png': {
        width: '50%',
        // convert to jpeg format
        format: 'jpeg',
        rename: 'cover.jpg'
      },
      // produce multiple images from one source
      'logo.png': [
        {
          width: 200
        },{
          width: 200 * 2,
          rename: 'logo@2x.png'
        }
      ]
    }))
    .pipe(gulp.dest('dist/img'));
});