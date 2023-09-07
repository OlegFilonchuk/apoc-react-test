import React from 'react';
import PropTypes from 'prop-types';

import pascalCase from '../../utils/pascalCase';
import IconButtonPresets from './IconButtonPresets';
import IconButtonFactory from './IconButtonFactory';

function IconButton(props) {
  return <IconButton.Default {...props} />;
}
IconButton.Default = IconButtonFactory({ icon: 'check', preset: 'Default' });

IconButton.propTypes = {
  /**
   * *Additional* classes for the button
   */
  className: PropTypes.string,
  /**
   * Is the button disabled
   */
  disabled: PropTypes.bool,
  /**
   * Use compact layout
   */
  compact: PropTypes.bool,
  /**
   * onClick callback
   */
  onClick: PropTypes.func
};

IconButton.defaultProps = {
  className: '',
  disabled: false,
  compact: false,
  onClick: () => true
};

Object.keys(IconButtonPresets).forEach(preset => {
  IconButton[pascalCase(preset)] = IconButtonFactory({ ...IconButtonPresets[preset], preset });
});

export default IconButton;
