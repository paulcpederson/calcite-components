![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Calcite Components

Shared Web Components for Esri's Calcite design framework.

Documentation for each component can be found within that component's directory in a generated `readme.md` file. This file will cover all the events and attributes each component uses.

The current lineup of components is:

- [alerts](src/components/calcite-alerts/)
- [button](src/components/calcite-button/)
- [loader](src/components/calcite-loader/)
- [modal](src/components/calcite-modal/)
- [progress](src/components/calcite-progress/)
- [radio-group](src/components/calcite-radio-group/)
- [slider](src/components/calcite-slider/)
- [switch](src/components/calcite-switch/)
- [tabs](src/components/calcite-tabs/)

## Installation

```
npm install --save @esri/calcite-components
```

### Script tag

Calcite components can be loaded via two `<script>` tags in the head of your HTML document:

```html
<script type="module" src="https://unpkg.com/@esri/calcite-components@1.0.0-beta.2/dist/calcite/calcite.esm.js"></script>
<script nomodule="" src="https://unpkg.com/@esri/calcite-components@1.0.0-beta.2/dist/calcite/calcite.js"></script>
```

Browsers that support modules will load the first, while older browsers will load the second, bundled version.

Once these script tags are added, components can be used just like any other HTML element. Only components that are actually used will be loaded.

### Webpack

If you already have a webpack build for your project, you can use [@stencil/webpack](https://github.com/ionic-team/stencil-webpack) to add calcite-components to your bundle.

After installing calcite-components, install the plugin as a dev dependency:

```
npm install --save-dev @stencil/webpack
```

Then import and call the plugin in `webpack.config.js`:

```
const stencil = require('@stencil/webpack');
module.exports = {
  ...
  plugins: [
    new stencil.StencilPlugin()
  ]
}
```

Lastly, add the import in your main bundle js (or ts) file:

```
import '@esri/calcite-components/dist/calcite.js';
```

This will add the initial stencil loader to your bundle, and copy over the actual component code to the output directory you've configured for Webpack. Components will still be lazy-loaded as they are needed. *Note:* you must use the `.js` file path for the Webpack plugin to work correctly, even if your bundle file is a TypeScript file.

## TypeScript

Stencil provides a full set of typings for all the components in this repo. To make TypeScript aware of these components, just import the library:

```
import '@esri/calcite-components';
```

This will provide autocomplete of component names/properties, as well as additional HTML element types:

```
// created elements will implicitly have the correct type already
const loader = document.createElement('calcite-loader');
document.body.appendChild(loader);
loader.isActive = true;

// you can also explicitly type an element using the generated types
// the type name will always be formatted like HTML{CamelCaseComponentName}Element
const loader = document.querySelector('.my-loader-element') as HTMLCalciteLoaderElement;
loader.isActive = true;
```

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for an overview of contribution guidelines.

## License

Apache 2.0. For a full copy of the license, see the [LICENSE](./LICENSE) file.