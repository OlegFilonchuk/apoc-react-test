const TARGET = process.env.npm_lifecycle_event;
let env = 'development';

switch (TARGET) {
  case 'build':
  case 'publish':
  case 'prepublish':
  case 'build-prod':
    env = 'production';
    break;

  case 'start':
  case 'ios':
  case 'android':
  case 'dev':
  default:
    env = 'development';
}

module.exports = env;
