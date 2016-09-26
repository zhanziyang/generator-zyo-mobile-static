/* global process */
var gulp         = require("gulp");
var sass         = require("gulp-sass");
var concat       = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var browserSync  = require("browser-sync").create();
var reload       = browserSync.reload;
var notifier     = require("node-notifier");
var gnotify      = require("gulp-notify");
var imagemin     = require("gulp-imagemin");
var pngquant     = require("imagemin-pngquant");
var plumber      = require("gulp-plumber");
var glob         = require("glob");

var src_dir        = "src/";
var dist_dir       = "dist/";

var sass_file_src  = src_dir + "sass/**/*.scss";
var sass_file_dest = dist_dir + "css";

function imgMinify(globStr) {
  glob(globStr, {}, function (err, paths) {

    paths.forEach(function(path) {
      var distPath = path.replace(/src/, "dist");
      distPath = distPath.slice(0, distPath.lastIndexOf("/"));
      gulp.src(path)
      .pipe(plumber())
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }, {
          cleanupIDs: false
        }],
        use: [pngquant()]
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(distPath));
    });

  });
}

gulp.task("imgmin", function () {
  var argv = process.argv[process.argv.indexOf("--option") + 1];
  var path = src_dir + "images/" + argv;
  imgMinify(path);
});

gulp.task("sass", function () {
  var compiled = gulp.src(sass_file_src)
    .pipe(sass().on("error", function (err) {
      notifier.notify("Sass error!");
      sass.logError.call(this, err);
    }))
    .pipe(autoprefixer({ browser: ["> 0%"], cascade: true }));

  return compiled.pipe(concat("style.css"))
    .pipe(gulp.dest(sass_file_dest))
    .pipe(reload({stream: true}))
    .pipe(gnotify("Sass compiled!"));
  
});

gulp.task("watch", function() {
  gulp.watch(dist_dir + "**/*.!(css)", function() {
    reload();
  });
  gulp.watch(sass_file_src, ["sass"]);
  
});

gulp.task("server", ["watch"], function () {
  return browserSync.init({
    server: {
      baseDir: "dist",
      index:   "index.html"
    }
  });
});

gulp.task("default", ["server"]);