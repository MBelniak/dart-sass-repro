# dart-sass-repro

In the 'main' branch is a reproduction using node-sass.
In the 'with-dart-sass' there's a reproduction using dart-sass.

## How to reproduce?

src/App.jsx imports css/styles.scss file. This file imports ./colors.scss. If the env variable CSSDIRNAME is set to 'red-color', the imported 'colors.scss' should be taken from `css/red-color` instead.

```
// install dependencies
yarn
// build with blue color
yarn build
// Go to dist/app.js, find 'color: blue' and 'font-size: 50px in eval of "./src/css/styles.scss"

// build with red color
yarn build-red-color
// Go to dist/app.js, find 'color: red' and 'font-size: 10px' in eval of "./src/css/styles.scss"
```
