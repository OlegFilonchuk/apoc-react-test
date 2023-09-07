# Development

_Note: all commands start from the root project folder_

## Requirements

Install NodeJS and Yarn. Currently we are supporting **Node 8.x** and **Yarn 1.5.1**.

NVM is also recommended way of handling multiple versions of Node.
[NVM Reference](https://github.com/creationix/nvm).

## Cloning

Before starting working with the code, first you need to clone the GIT repository:

```sh
git clone git@github.com:mudynamics/apoc-react.git
```

After this operation you will have source code of the project.

## Installing Dependencies

Before you install dependencies make sure that you are using correct version of node:

```bash
nvm use
```

You may have to install the specific version of node, if it's not present already on your machine. 
 
```bash
nvm install 
```

To install `apoc-react` dependencies open terminal in root of the cloned project and enter:

```sh
yarn install
```

## Running

To run `apoc-react` in development mode:

```sh
yarn start
```

## Testing
We are using **[Jest](https://facebook.github.io/jest/)** framework for providing Unit and Integration Tests.
Each component should contain Unit Tests. You should run Unit Tests to check if a Library works fine and you did not
introduced any regressions.

To run Jest open terminal and enter:

```sh
yarn test
```

You can also get information about code coverage:

```sh
yarn test-coverage
```

This command will generate the reports for the Code Coverage under the `coverage` directory.

# Definition of Done

When you are adding a new Component you should check if:

 - Directory and files are created according to both Code and Naming Conventions
 - Your code is tested by adding Unit and Integration Tests
 - Your changes in the code are passing the Static Analysis check by the [ESlint](http://eslint.org/)
 - You did not introduced any regression `yarn test`
 - Application can be builded and bundled and there are no errors `yarn build`

# Directory structures

## High level of current tree explanation

```md
apoc-react/
  ├─ dist/ // Distribution (bundled) version of Library. Contains both *.css and *.js packages
  │   ├─ apoc-react.css
  │   └─ apoc-react.js
  ├─ docs/ // Source code for the additional documentation
  ├─ guide/ // Distribution (bundled) version of the Library documentation
  ├─ jest/ // Configuration and helpers used by a Jest test runner
  ├─ node_modules/ // NPM dependencies
  └─ src/ // Source code for the Components Library
      └─ js/
          └─ components/
              ├─ Button/
              │   ├─ Button.jsx // Component definition and logic
              |   ├─ Button.less // Component specific styles
              |   └─ Button.md // Component documentation
              ├─ ...
              └─ index.js // Contains all modules exposed by the Apoc Library
 ```

## React Component directory structure


Single tag component:

```md
ComponentExample/
    ├── ComponentExample.js
    ├── ComponentExample.test.js
    └── ComponentExample.less
 ```

For multi tag component:

```md
ComponentParentExample/
    ├── ComponentParentExample.js
    ├── ComponentParentExample.test.js
    ├── ComponentChildExample.js
    ├── ComponentChildExample.test.js
    └── ComponentChildExample.less
 ```


## Component naming convention

### Directory name

**Directory name** should be written using camel case, starting with a capital letter

example `PlayerButton`, `MyAwesomeButton`

### File name
Components **file names** should be written using camel case, starting with a capital letter and contains `.jsx` extension

example `PlayerButton.jsx`, `MyAwesomeButton.jsx`

### Styles
**Less styles** should be named same as a component and contain `.less` extension

example `PlayerButton.less`, `MyAwesomeButton.less`

### Tests
Both **unit and integration tests** should be named same as a component and contains `.test` suffix with `.jsx` extension

example `PlayerButton.test.jsx`, `MyAwesomeButton.test.jsx`


## Documentation

### Framework
The [react-styleguidist](https://github.com/sapegin/react-styleguidist) framework is used for providing documentation and examples for every component.

### What is necessary to write a complete documentation?

1. Description in comment to the component class or function, e.g.:

```html
/**
 * Just a wrapper for Reacts `input[type="checbkox"]`. All props not mentioned here are passed to `input`.
 */
export default class Checkbox extends React.Component {}
```

2. Every `prop` should have its entry in `propTypes`, e.g.:

```html
Checkbox.propTypes = {
  /**
   * Whether checkbox is disabled or not
   */
  disabled: React.PropTypes.bool,
}
```

3. Each `prop` that is not required (via `isRequired`) should have default value declared inside of defaultProps, e.g:

```html
Checkbox.defaultProps = {
  disabled: false
};
```

4. Markdown file e.g. `ComponentExample.md` should be placed inside of the components directory, e.g. :

```md
ComponentExample/
    ├── ComponentExample.js
    ├── ComponentExample.test.js
    ├── ComponentExample.md    <---- That's the file
    └── ComponentExample.less
 ```

5. The `md` files should consist of examples and additional description if necessary, e.g.:

```md
## Checkbox true identity
Checkbox is just a ninja `input[type="checkbox"]` wrapped by ninjutsu html and css.

## Examples

### Checked by default

    <div>
      <Checkbox label="Lorem ipsum" defaultChecked/>
    </div>

### Another example

...

```

Possibilities of documentation in md files, how to mix `js` with `jsx`, how to use `React`s state, and lots of other stuff can be found on
[styleguidist documentation](https://github.com/sapegin/react-styleguidist/blob/master/docs/GettingStarted.md#documenting-components).

**Note:** a single line break between the text and the code example.

### Dos and Don'ts while documenting the code

1. **Do** single line break between a text and code example, e.g.

```md
### Checked by default

    <div>
      <Checkbox label="Lorem ipsum" defaultChecked/>
    </div>
```

2. **Do** mention relation between other components using links to this documentation page - ```[Checkbox](#Checkbox)```  -, e.g.:

```html
Multiselect.propTypes = {
  /**
   * Set of [Checkbox](#Checkbox) components. Each has overwritten following props:
   * `fullWidth=true` and `labelPosition=labelPositions.left`
   */
  children: React.PropTypes.node
};
```

3. **Do** use inline code syntax highlighting while mentioning syntax terms of programming languages and similar, in both
*js comments* and *documentation markdown*. E.g.:

```html
Checkbox.propTypes = {
  /**
   * It's passed to `input` element. Used also to create an `id` attribute of input
   * and `for` of label in order to connect those two.
   */
  name: React.PropTypes.string
};
```

```md
### Label position to the left
Position can be changed using `labelPosition` prop. All possible
values are stored in `labelPositions` map. It can be important in following
way:
```

```md
Following are examples of Checkbox react component, which is in fact
a wrapper of html element:

    <input type="checkbox"/>

with no changes in functionality comparing to original `input`.
All non Checkbox specific props passed to `Checkbox` are passed to `input`
```

4. **Do** describe in js comments arguments and their types of functions props, e.g.:

```html
Multiselect.propTypes = {
  /**
   *  Is called whenever one of [Checkbox](#Checkbox)es changes its state.
   *
   *  Function takes one argument and it's `{Map<String,boolean>}`, where
   *  key is a name of a [Checkbox](#Checkbox) and value is whether it's checked or not
   */
  onChange: React.PropTypes.func
}
```

5. **Don't** use a JsDoc syntax inside JS comments of neither components `class`/`function` nor `propTypes`.
They are redundant and they don't bring any value, as WebStorm can understand `propTypes` and
generate auto completion based on them. JsDoc syntax also look bad on
documentation's page generated by `react-styleguidist`. E.g.:

```html
SomeComponent.propTypes = {
   /**
   * @type {String} classes to inherit
   */
  className: React.PropTypes.string,
  /**
   * @type {Function} classes to inherit
   */
  onChange: React.PropTypes.string,
}
```
