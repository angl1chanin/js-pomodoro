const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Configuration
const path = require('./gulp/config/path.js');
const app = require('./gulp/config/app');

// Tasks
const html = require('./gulp/tasks/html');
const scss = require('./gulp/tasks/scss');
const js = require('./gulp/tasks/js');
const img = require('./gulp/tasks/img');

// Browser sync
const server = () => {
  browserSync.init({
    browser: 'firefox',
    server: {
      baseDir: path.root,
    },
  });
};

// Watching
const watcher = () => {
  watch(path.html.watch, html).on('all', browserSync.reload);
  watch(path.scss.watch, scss).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
  watch(path.img.watch, img).on('all', browserSync.reload);
};

const build = series(parallel(html, scss, js, img));

const dev = series(build, parallel(watcher, server));

// Tasks
exports.html = html;
exports.watch = watcher;
exports.scss = scss;
exports.img = img;

// Assemble
exports.default = app.isProd ? build : dev;
