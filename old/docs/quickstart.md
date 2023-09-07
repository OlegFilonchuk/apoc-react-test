# Requirements

**Apoc React** is a **Components Library** project based on the **[React](https://facebook.github.io/react/)** library.

Before using it, in your application you should install both **[React](https://facebook.github.io/react/)** and **[Webpack](https://webpack.github.io/)**.
It's recommended to use **NPM** for the purpose of installing those dependencies.

# Installing

**Apoc Library** is using a **Private NPM registry**.

## Private Registry
In order to install the library in your application first you need to create a `.npmrc` file inside root of your application directory.
It will allow the NPM to communicate with a **Private NPM registry**.

You can do it using terminal command:

```sh
echo '@spirent:registry = "http://10.131.177.18:4873/"' > .npmrc
```

## Install library

Next you should be able to install the **Apoc React** library and use it as a dependency.

Open terminal and enter **NPM** package manager command:

```sh
npm install mudynamics/apoc-react@v1.2.0 --save
```

## Checking current version
**Apoc React** library is exposing the `APOC_REACT` global variable that lets you check used version.


### Development mode
When you are working in the `development` mode, inside the Browser DevTools console, you should be able to see the information about used version:

```md
Apoc-React: X.Y.Z-build (a0b1c2d)
```

 - `X.Y.Z` is a package version ex. `1.3.1`
 - `build` is the compilation number from our Continuous Integration system (Jenkins) ex. `432`
 - `a0b1c2d` is the [GIT commit hash](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) (short SHA1). ex. `687b02b`

   The hash is using the hexadecimal values only. It will allow you to go to the project [GitHub project page](https://github.com/mudynamics/apoc-react/commit/a0b1c2d) and check the commit history log.

### Production Mode
In `production` mode you will not see the debug information in the console. Instead you can still access the global `APOC_REACT` variable.

The value of this variable is an object that contains three properties:

```html
{
  "VERSION": "X.Y.Z-build",
  "APOC_GIT_SHA1": "a0b1c2d",
  "APOC_GIT_URL": "https://github.com/mudynamics/apoc-react/commit/a0b1c2d"
}
```

# Importing CSS
The **Apoc React** library is exposing the **CSS styles**. You should include them in your application.
For now you can do it using [Webpack CSS loader](https://github.com/webpack/css-loader) and by including the CSS code in main JavaScript file (ex.`index.jsx`) of your application:

```html
import "apoc-react/dist/apoc-react.css";
```

# Chameleon
Apoc library is depending also on the [Chameleon](https://github.com/mudynamics/chameleon/) CSS library. Chameleon is a CSS bootstrap library.
For the more information you can go directly to the [GitHub](https://github.com/mudynamics/chameleon/) account.

In order to install **Chameleon** open terminal and enter **NPM** package manager command:

```sh
npm install mudynamics/chameleon@master_dist --save
```

You should include the **Chameleon** CSS files in your application in the same way as **Apoc-React**:

```html
import "chameleon/dist/css/chameleon.min.css";
import "chameleon/dist/css/chameleon.qtip.css";
```

# Example Webpack config

For a quick start you can use this example **Webpack** configuration:

```html
module.exports = {
  entry: './src/index.js',
  output: {
    path: './',
    filename: 'dist/index.js'
  },
  devServer: {
    inline: true,
    port: 9090
  },

  devtool: 'inline-source-map',

  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
      }
    ]
  }
};
```
