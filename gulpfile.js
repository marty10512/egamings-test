const
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    pug = require("gulp-pug"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,

    dist = "dist",
    src = "src";

gulp.task('serve', function() {

    browserSync.init({
        server: "./"+dist
    });

    gulp.watch(src+"/css/**/*.scss", gulp.series('sass'));
    gulp.watch(src+"/html/**/*.pug", gulp.series('pug'));
});

gulp.task('sass', function() {
    return gulp.src(src+"/css/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src(src+"/html/**/*.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
})

gulp.task('default', gulp.series("sass", "pug", "serve"));