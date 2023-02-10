const { src, dest } = require('gulp');

// Configuration
const path = require('../config/path.js');
const app = require('../config/app.js');

// Plugins
const size = require('gulp-size');
const terser = require('gulp-terser');

// JS handle
const js = () => {
  return src(path.js.src, { sourcemaps: app.isDev })
    .pipe(size({ title: 'JavaScript before compression' }))
    .pipe(terser())
    .pipe(size({ title: 'JavaScript after compression' }))
    .pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
};

module.exports = js;