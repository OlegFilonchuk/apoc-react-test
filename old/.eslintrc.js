module.exports = {
  parser: "babel-eslint",
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    jasmine: true,
    jest: true
  },
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120
      }
    ],
    'react/require-extension': 'off',
    'react/no-unused-prop-types': ['error', { skipShapeProps: true }],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true
      }
    ],
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'space-before-function-paren': 'off',
    'react/jsx-space-before-closing': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-debugger': ['error'],
    'no-alert': ['error'],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': ['error']
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  formatter: require('eslint-friendly-formatter')
};
