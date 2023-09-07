import camelCase from 'lodash/camelCase';

export default function pascalCase(string) {
  return string[0].toUpperCase() + camelCase(string.slice(1));
}
