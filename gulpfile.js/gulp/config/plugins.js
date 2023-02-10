const app = require('./app');

module.exports = {
  htmlmin: {
    collapseWhitespace: app.isProd,
  },

  imagemin: {
    verbose: true,
  }
};