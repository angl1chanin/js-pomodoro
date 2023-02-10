const pathSrc = './src';
const pathDest = './dist';

module.exports = {
    root: pathDest,

    html: {
        src: pathSrc + '/html/*.html',
        watch: pathSrc + '/html/**/*.html',
        dest: pathDest
    },

    scss: {
        src: pathSrc + '/scss/*.{scss,sass,css}',
        watch: pathSrc + '/scss/**/*.{scss,sass,css}',
        dest: pathDest + '/css'
    },

    js: {
        src: pathSrc + '/js/*.js',
        watch: pathSrc + '/js/**/*.js',
        dest: pathDest + '/js'
    },

    img: {
        src: pathSrc + '/img/*.{png,jpg,jpeg,gif,svg}',
        watch: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
        dest: pathDest + '/img'
    }
}