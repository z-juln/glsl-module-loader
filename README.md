[glslify](https://github.com/glslify/glslify) / [glslify-loader](https://github.com/glslify/glslify-loader) 也挺香, 就是目前不能对导入的变量名进行重命名, 也不能导出/导入多个变量, 有时候模块内的变量名也不会转为带hash的模块名


<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# glsl-module-loader

**DEPREACTED for v5**: please consider migrating to [`asset modules`](https://webpack.js.org/guides/asset-modules/).

A loader for webpack that allows importing files as a String.

## Getting Started

To begin, you'll need to install `glsl-module-loader`:

```console
$ npm install glsl-module-loader --save-dev
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
        use: 'glsl-module-loader',
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

|            Name             |    Type     | Default | Description            |
| :-------------------------: | :---------: | :-----: | :--------------------- |
| **[`esModule`](#esmodule)** | `{Boolean}` | `true`  | Uses ES modules syntax |

### `esModule`

Type: `Boolean`
Default: `true`

By default, `glsl-module-loader` generates JS modules that use the ES modules syntax.
There are some cases in which using ES modules is beneficial, like in the case of [module concatenation](https://webpack.js.org/plugins/module-concatenation-plugin/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/).

You can enable a CommonJS module syntax using:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.glsl$/i,
        use: [
          {
            loader: 'glsl-module-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
```

## Examples

### Inline

```js
import glsl from 'glsl-module-loader!./file.glsl';
```

Beware, if you already define loader(s) for extension(s) in `webpack.config.js` you should use:

```js
import glsl from '!!glsl-module!./file.glsl'; // Adding `!!` to a request will disable all loaders specified in the configuration
```
