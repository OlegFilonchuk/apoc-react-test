import React from 'react';
import PropTypes from 'prop-types';

import createButtonWithIcon from './createButtonWithIcon';
import Button from '../Button/Button';

const ButtonWithIconComponent = createButtonWithIcon(Button);

const ButtonWithIcon = props => <ButtonWithIconComponent {...props} />;

ButtonWithIcon.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  adjustLineHeight: PropTypes.number,
  ...Button.propTypes
};

ButtonWithIcon.defaultProps = {
  adjustLineHeight: undefined
};

export default ButtonWithIcon;
