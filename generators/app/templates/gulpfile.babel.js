import gulp from 'gulp'
import browserSync from 'browser-sync'
import stylus from 'gulp-stylus'
import axis from 'axis'
import postcss from 'gulp-postcss'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'
import sourcemaps from 'gulp-sourcemaps'
import watch from 'gulp-watch'
import batch from 'gulp-batch'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import del from 'del'
import rename from 'gulp-rename'
import filter from 'gulp-filter'
import path from 'path'

const reload = browserSync.reload

const onError = function (err) {
  notify.onError({
    title: 'Gulp error in ' + err.plugin,
    message: err.toString()
  })(err)
}

gulp.task('clean-css-dest', () => {
  return del('./dist/css')
})

gulp.task('style', ['clean-css-dest'], () => {
  watch('./src/css/**/*.styl', { ignoreInitial: false }, batch(() => {
    return gulp
      .src('./src/css/*.styl')
      .pipe(plumber({ errorHandler: onError }))
      .pipe(sourcemaps.init())
      .pipe(stylus({
        // warn: true,
        use: [axis()],
        import: [
          path.resolve(__dirname, './src/css/utils/*')
        ]
      }))
      .pipe(postcss([cssnext({
        browsers: [
          'last 3 version',
          '> 1%',
          'android >= 4.1',
          'ios >= 6',
          'ie >= 10',
          'chrome >= 34',
          'opera >= 12.1',
          'ff >= 38',
          'and_uc >= 10',
          'ie_mob >= 10'
        ]
      })]))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('./dist/css'))
      .pipe(reload({ stream: true }))
      .pipe(filter('**/*.css'))
      .pipe(postcss([cssnano()]))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/css/min'))
  })).on('error', onError)
})

gulp.task('server', ['style'], () => {
  const localServer = require('./localserver')

  localServer.listen(8000)

  browserSync.init({
    files: './dist',
    proxy: {
      target: 'http://localhost:8000',
      ws: false // websocket
    },
    serveStatic: ['./dist'],
    port: 3000,
    watchOptions: {
      ignored: '*.map'
    }
  })
})

gulp.task('default', ['server'])
