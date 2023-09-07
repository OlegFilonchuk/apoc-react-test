import PropTypes from 'prop-types';

export const CONTENT_TYPES = {
  date: 'dateContent',
  iconOrGraphical: 'iconOrGraphicalContent',
  text: 'textContent',
  numeric: 'numericContent'
};

export const isContentTypePassed = props => Object.keys(CONTENT_TYPES).some(typeKey => props[CONTENT_TYPES[typeKey]]);

export function validateProps(props, propName, ...args) {
  const boolError = PropTypes.bool(props, propName, ...args);

  if (boolError) {
    return boolError;
  }

  if (props[propName]) {
    const othersType = Object.values(CONTENT_TYPES).filter(type => type !== propName && props[type]);
    const areOtherTypeTrue = othersType.length > 0;

    if (areOtherTypeTrue) {
      const separator = ' ,';
      const othersTypeString = othersType.join(separator);

      return new Error(
        `Only one content type can be passed. Prop ${propName} cannot be true if ${othersTypeString} ${
          othersType.length === 1 ? 'is' : 'are'
        } true`
      );
    }

    return null;
  }

  return null;
}
