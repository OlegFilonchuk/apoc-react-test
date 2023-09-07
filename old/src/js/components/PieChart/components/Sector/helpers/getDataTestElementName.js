import capitalize from 'lodash/capitalize';

export default profileName =>
  profileName
    .split(' ')
    .filter(value => !!value)
    .map(capitalize)
    .join(' ');
