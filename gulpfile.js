var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("build", function () {
  return gulp.src("src/js/*.js")
      .pipe(babel())
      .pipe(uglify())
      .pipe(rename({
          extname: '.min.js'
      }))
      .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', gulp.series('build'))
});

//デフォルトタスク
gulp.task("default",
  gulp.series(
    'build'
  )
);