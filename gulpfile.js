let gulp = require("gulp");
let babel = require('gulp-babel');
let sass = require("gulp-sass");
let browserSync = require('browser-sync').create();
let runSequence = require('run-sequence');
let del = require('del');

gulp.task('sass', function(){
    return gulp.src('app/css/styles.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task("watch", ['browserSync', 'sass', 'babel'], function () {
    gulp.watch('app/css/styles.scss', ['sass']);
    gulp.watch('app/*.div', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
    gulp.watch('app/index.html', browserSync.reload);
});

gulp.task('browserSync', function(){
    browserSync.init({
        server:{
            baseDir: 'app'
        }
    })
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task("clean:dist", function(){
    return del.sync('dist');
});

gulp.task('babel', () =>
    gulp.src('app/js/index.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js/babel'))
);

gulp.task('build', function (callback){
    runSequence('clean:dist', ['sass', 'fonts', 'babel'], callback);
} );



gulp.task('default', function(callback){
    runSequence(['sass','browserSync', 'watch'], callback)
})