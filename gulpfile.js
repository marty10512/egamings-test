const
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    pug = require("gulp-pug"),
    browserSync = require("browser-sync").create(),
    rimraf = require("rimraf"),

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
    return gulp.src(src+"/css/main.scss")
        .pipe(sass())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src(src+"/html/index.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src(src+'/images/**/*')
        .pipe(gulp.dest(dist+'/images/'));
});

gulp.task('remove-dist', (done) => {
    rimraf.sync(dist);
    done();
})

gulp.task('default', gulp.series("remove-dist", "sass", "pug", "images", "serve"));