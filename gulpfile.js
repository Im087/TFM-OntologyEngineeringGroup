const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const livereload = require("gulp-livereload");
const connect = require("gulp-connect");
const connectPHP = require("gulp-connect-php");
const browserSync = require("browser-sync");
const open = require("open");
const fileinclude = require("gulp-file-include");

gulp.task("js", function() {
  return gulp.src("./src/js/*.js")
    .pipe(concat("oeg.js"))
    .pipe(gulp.dest("./dist/js/"))
    .pipe(uglify())
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("./dist/js/"))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("css", function() {
  return gulp.src("./src/css/*.css")
    .pipe(concat("oeg.css"))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(cleanCss({compatibility:"ie8"}))
    .pipe(rename({suffix:".min"}))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("html", function () {
  return gulp.src("./src/**/*.html")
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("php", function() {
  return gulp.src("./src/server/**/*.php")
    .pipe(gulp.dest("./dist/server/"))
    .pipe(browserSync.reload({stream:true}));
})

gulp.task("watch", function() {
  //livereload.listen();
  gulp.watch("./src/js/*.js", ["js"]);
  gulp.watch("./src/css/*.css", ["css"]);
  gulp.watch("./src/**/*.html", ["html"]);
  gulp.watch("./src/server/**/*.php", ["php"]);
});

/*
gulp.task("server", function() {
  connect.server({
    root:"dist",
    livereload:true,
    port: 10086
  });
});
*/

gulp.task("browserSync",function(){
  browserSync.init({
    proxy:"127.0.0.1:10086",
    port:10086,
    //watch:true,
    //startPath: "index.html",
    //open: "external"
  });
});

/*
gulp.task("browserSync",function(){
var options={
proxy:"127.0.0.1:10086"
//port:10086,
//watch:true,
//startPath: "index.html",
//open: "external",
};
 browserSync.init(options);
});
*/

gulp.task("server", function() {
  connectPHP.server({
    base:"dist",
    //open:true,
    bin:"C:/wamp64/bin/php/php5.6.40/php.exe",
    ini:"C:/wamp64/bin/php/php5.6.40/php.ini",
    port:10086
  });
});

//open("http://localhost:10086/");

gulp.task("default", ["html", "css", "js", "php", "server", "browserSync", "watch"]);
