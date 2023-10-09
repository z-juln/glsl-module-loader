<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# glsl-module-loader

A loader for webpack that allows parse glsl what is contain `#include <./utils.glsl>`.

- `#include <./utils.glsl>`
- `#include <./utils>`
- `#include <glsl-noise/simplex/3d>`
- `#include <glsl-noise/simplex/3d.glsl>`

## Getting Started

To begin, you'll need to install `glsl-module-loader`:

```console
$ npm install glsl-module-loader raw-loader -D
```

or

```console
$ yarn add glsl-module-loader raw-loader -D
```

Then add the loader to your `webpack` config. For example:

**file.js**

```js
import glsl from './file.glsl';
```

**webpack.config.js**

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader',
          'glsl-module-loader',
        ],
      },
    ],
  },
};
```

you also can use `glsl-module-loader` with [`glslify-loader`](https://github.com/glslify/glslify-loader):

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader',
          'glslify-loader',
          'glsl-module-loader',
        ],
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Examples

### project

- [glsl-module-loader-example](https://github.com/z-juln/glsl-module-loader-example)

### Inline

```js
import glsl from 'glsl-module-loader!./utils.glsl';
```
