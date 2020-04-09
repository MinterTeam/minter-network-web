// register env before other imports @see https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import-
import 'dotenv/config';
import dotenv from 'dotenv';
// const nodeExternals = require('webpack-node-externals');

const envConfig = dotenv.config();

import langRu from './lang/ru';
import {BASE_TITLE, BASE_DESCRIPTION, BASE_TITLE_END} from "./assets/variables";

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: BASE_TITLE + BASE_TITLE_END,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: BASE_DESCRIPTION },
            { hid: 'og-title', name: 'og:title', content: BASE_TITLE },
            { hid: 'og-description', name: 'og:description', content: BASE_DESCRIPTION },
            { hid: 'og-image', name: 'og:image', content: '/social-share.png?v2' },
        ],
        link: [
            { rel: 'icon', href: '/favicon.png' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        ],
    },
    css: [
        './static/css/style.min.css',
    ],
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#cf5c2c' },
    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'is-active',
        middleware: [
            // 'profile',
            // 'auth',
            // 'language',
        ],
    },
    plugins: [
        { src: '~/plugins/click-blur.js', ssr: false },
        // { src: '~/plugins/persistedState.js', ssr: false },
        // { src: '~/plugins/track.js', ssr: false },
        { src: '~/plugins/seo-gtm.js', ssr: false },
        // '~/plugins/translate.js',
        // '~/plugins/get-locale-path.js',
    ],
    env: envConfig.error ? {} : envConfig.parsed,
    modules: [
        ['@nuxt/press'],
        // ['nuxt-i18n', {
        //     locales: [
        //         {
        //             code: 'en',
        //             iso: 'en',
        //             name: 'English',
        //         },
        //         {
        //             code: 'ru',
        //             iso: 'ru',
        //             name: 'Russian',
        //         },
        //     ],
        //     defaultLocale: 'en',
        //     strategy: 'prefix_except_default',
        //     rootRedirect: null,
        //     vueI18n: {
        //         fallbackLocale: 'en',
        //         messages: {
        //             ru: langRu,
        //             en: {},
        //         },
        //     },
        //     // seo: false,
        //     detectBrowserLanguage: false,
        // }],
    ],
    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,
        optimizeCSS: false,
        postcss: false,
        // optimization: {
        //     splitChunks: {
        //         name: true
        //     }
        // },
        watch: [
            // './.env',
            './api/',
            `./lang/`,
        ],
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev, isClient, isServer }) {
            // if (isDev && isClient) {
            //     config.module.rules.push({
            //         enforce: 'pre',
            //         test: /\.(js|vue)$/,
            //         loader: 'eslint-loader',
            //         exclude: /(node_modules)/,
            //     });
            // }
            /*
            ** process some node_modules through webpack in server build
            */
            // if (isServer) {
            //     config.externals = [
            //         nodeExternals({
            //             whitelist: [/^date-fns\/esm/],
            //         }),
            //     ];
            // }
        },
        transpile: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^lodash-es/, /^@material/],
    },
};
