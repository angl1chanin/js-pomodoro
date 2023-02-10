const { src, dest } = require('gulp');

// Configuration
const path = require('../config/path.js');
const plugins = require('../config/plugins.js');

// Plugins
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const webpHtml = require('gulp-webp-html');

// HTML handle
const html = () => {
  return src(path.html.src)
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(size({ title: 'HTML before compression' }))
    .pipe(htmlmin(plugins.htmlmin))
    .pipe(size({ title: 'HTML after compression' }))
    .pipe(dest(path.html.dest));
};

module.exports = html;