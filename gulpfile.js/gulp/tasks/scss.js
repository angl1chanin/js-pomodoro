const { src, dest } = require('gulp');

// Configuration
const path = require('../config/path.js');
const app = require('../config/app.js');

// Plugins
const size = require('gulp-size');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const stripCssComments = require('gulp-strip-css-comments');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const shorthand = require('gulp-shorthand');
const webpCss = require('gulp-webp-css');

// SCSS handle
const scss = () => {
  return src(path.scss.src, { sourcemaps: app.isDev })
    .pipe(sass())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(size({ title: 'SCSS before compression' }))
    .pipe(stripCssComments())
    .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(size({ title: 'SCSS after compression' }))
    .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }));
};

module.exports = scss;