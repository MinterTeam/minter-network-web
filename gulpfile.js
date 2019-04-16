// common
const gulp = require('gulp');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const log = require('fancy-log');
const beeper = require('beeper');
// templates
const nunjucks = require('gulp-nunjucks-render');
const cacheBust = require('gulp-cache-bust');
const data = require('gulp-data');
const decache = require('decache');
const envConfig = require('dotenv').config();
const footerLinksData = require('minter-footer-links');
// js
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const named = require('vinyl-named');
// css
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const postcssNormalize = require('postcss-normalize');
const postcssRtl = require('postcss-rtl');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
// images
const del = require('del');
const path = require('path');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
//const pngquant = require('imagemin-pngquant');


let paths = {
    src: {
        less: 'less/*.less',
        js: 'js/*.js',
        img: ['img/**/*.{png,jpg,gif,svg}'],
        templatesDir: ['templates/'],
        templatesFiles: ['templates/**/*.njk', '!templates/layouts/**/*.njk', '!templates/partials/**/*.njk'],
    },
    dest: {
        css: 'public/css/',
        js: 'public/js',
        img: 'public/img/',
        html: 'public/',
    },
    watch: {
        less: 'less/**/*.less',
        js: 'js/**/*.js',
        templates: ['templates/**/*.njk', 'lang/*.js'],
    },
    cache: {
        tmpDir: 'tmp/',
        cacheDirName: 'gulp-cache',
    },
};


// LESS
gulp.task('less:ltr', function () {
    return gulp.src(paths.src.less)
        .pipe(plumber({errorHandler: onError}))
        .pipe(less())
        .pipe(postcss([
            autoprefixer({cascade: false}),
            postcssNormalize({forceImport: true}),
        ]))
        .pipe(cleanCss({
            level: {
                1: {},
                2: {
                    removeUnusedAtRules: true,
                },
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('less:rtl', function () {
    return gulp.src(paths.src.less)
        .pipe(plumber({errorHandler: onError}))
        .pipe(less())
        .pipe(postcss([
            autoprefixer({cascade: false}),
            postcssNormalize({forceImport: true}),
            postcssRtl({onlyDirection: 'rtl'}),
        ]))
        .pipe(cleanCss({
            level: {
                1: {},
                2: {
                    removeUnusedAtRules: true,
                },
            }
        }))
        .pipe(rename({
            suffix: '.rtl.min'
        }))
        .pipe(gulp.dest(paths.dest.css));
});
gulp.task('less', gulp.parallel('less:ltr', 'less:rtl'));


// JS
gulp.task('js', function() {
    return gulp.src(paths.src.js)
        .pipe(plumber({errorHandler: onError}))
        .pipe(named())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dest.js));
});


// TEMPLATES
gulp.task('templates:en', makeTemplatesTask('en'));
gulp.task('templates:ru', makeTemplatesTask('ru'));
gulp.task('templates:cn', makeTemplatesTask('cn'));
gulp.task('templates:jp', makeTemplatesTask('jp'));
gulp.task('templates:kr', makeTemplatesTask('kr'));
gulp.task('templates:sa', makeTemplatesTask('sa'));
gulp.task('templates:de', makeTemplatesTask('de'));
gulp.task('templates:fr', makeTemplatesTask('fr'));
gulp.task('templates:es', makeTemplatesTask('es'));
gulp.task('templates', gulp.parallel('templates:en', 'templates:ru', 'templates:cn', 'templates:jp', 'templates:kr', 'templates:sa', 'templates:de', 'templates:fr', 'templates:es'));
/**
 * @param {string} locale
 */
function makeTemplatesTask(locale) {
    return function () {
        const I18nExtension = require("nunjucks-i18n")(nunjucks.nunjucks);
        const manageEnvironment = function(env) {
            env.addExtension('I18nExtension', new I18nExtension({
                env,
                translations: getTranslations(locale),
            }));
        };
        const localesPath = './lang/locales';
        decache(localesPath);
        const locales = require(localesPath);

        return gulp.src(paths.src.templatesFiles)
            .pipe(plumber({errorHandler: onError}))
            .pipe(data(function getDataForFile(file) {
                const locationPath = file.relative.replace(/index\.njk$/, '').replace(/\.njk$/, '').replace(/\\/g, '/');
                return {
                    __filePath__: file.relative,
                    __locationPath__: locationPath ?  '/' + locationPath : '',
                };
            }))
            .pipe(nunjucks({
                path: paths.src.templatesDir,
                ext: '.html',
                data: {
                    __locale__: locale,
                    __locales__: locales,
                    __env__: envConfig.error ? {} : envConfig.parsed,
                    __footer__: footerLinksData,
                },
                manageEnv: manageEnvironment,
            }))
            .pipe(locale === 'en' ? gulp.dest(paths.dest.html) : gulp.dest(paths.dest.html + '/' +  locale));
    }
}

function getTranslations(locale) {
    let translations = {};
    if (locale === 'en') {
        translations[locale] = {}
    } else {
        const langPath = `./lang/${locale}.js`;
        decache(langPath);
        translations[locale] = require(langPath);
    }

    return translations;
}


// CACHE BUST
gulp.task('cache-bust', function() {
    return gulp.src(paths.dest.html + '**/*.html')
        .pipe(cacheBust())
        .pipe(gulp.dest(paths.dest.html))
});



// IMG
gulp.task('imagemin', function () {
    return gulp.src(paths.src.img)
        .pipe(plumber({errorHandler: onError}))
        .pipe(cache(
            imagemin([
                imagemin.gifsicle({interlaced: true}),
                mozjpeg({quality: 90}),
                imagemin.jpegtran({progressive: true}),
                //pngquant(),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({plugins: [{removeViewBox: false}]})
            ], {
                verbose: true
            }), {
                fileCache: new cache.Cache(paths.cache),
                name: 'default',
            }))
        .pipe(gulp.dest(paths.dest.img));
});
gulp.task('imagemin:clean-dest', function(cb) {
    del.sync(paths.dest.img);
    cb();
});
gulp.task('imagemin:clean-cache', function(cb) {
    del.sync([
        paths.cache.tmpDir + '/' + paths.cache.cacheDirName + '/default',
    ]);
    cb();
});
gulp.task('imagemin:clean', gulp.parallel('imagemin:clean-dest', 'imagemin:clean-cache'));



// Полная сборка без вотча
gulp.task('once', gulp.series(gulp.parallel('less', 'js', 'templates', 'imagemin'), 'cache-bust'));
// Полная сборка с вотчем
gulp.task('default', gulp.series(
    'once',
    function watch() {
        gulp.watch(paths.watch.less, gulp.series('less', 'cache-bust'));
        gulp.watch(paths.watch.js, gulp.series('js', 'cache-bust'));
        gulp.watch(paths.watch.templates, gulp.series('templates', 'cache-bust'));
        gulp.watch(paths.src.img, gulp.task('imagemin'))
            .on('unlink', function(filePath) {
                del(paths.dest.img + path.basename(filePath));
            })
            .on('unlinkDir', function(dirPath) {
                del(paths.dest.img + path.basename(dirPath));
            });
    }
));




// Ошибки
let onError = function(error) {
    log([
        (error.name + ' in ' + error.plugin).bold.red,
        '',
        error.message,
        ''
    ].join('\n'));
    beeper();
    this.emit('end');
};


