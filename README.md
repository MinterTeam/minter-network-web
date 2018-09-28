## Official Minter Network website [minter.network](https://minter.network)


### Build

All sources build to the `./public/` directory.

Production
```
npm run production
or
gulp once
```
Development with watch
```
npm run start
or
gulp
```


### Tempaltes

[Nunjucks](https://mozilla.github.io/nunjucks/) (syntax like twig or jinja) templates build from `templates/*.njk` to the `public`.


### Styles

Build from `less/*.less` to the `public/css/`. It's using [less](http://lesscss.org/) preprocessor and [Autoprefixer](https://github.com/postcss/autoprefixer).


### Image minification

Images build from `img/**/*.{png, jpg, gif, svg}` to the `public/img/` by [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin). To improve build time minified images are cached in the `tmp/gulp-cache/` directory.


### Asset version

[gulp-cache-bust](https://github.com/furzeface/gulp-cache-bust) parse pages in the `public` directory and add hash from content to style and script links.


### Browser support

Autoprefixer and Babel get browser list from package.json: field [browserslist](https://github.com/ai/browserslist). 

For now it is: ["> 0.5%, last 2 versions"](http://browserl.ist/?q=%3E+0.1%25%2C+last+2+versions%2C+Firefox+ESR).
