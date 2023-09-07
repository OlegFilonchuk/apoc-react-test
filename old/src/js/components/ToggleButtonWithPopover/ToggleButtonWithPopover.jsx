import React from 'react';
import PropTypes from 'prop-types';

import ToggleButton from '../ToggleButton/ToggleButton';
import withPopover from '../withPopover/withPopover';

const ToggleButtonComponent = withPopover(ToggleButton);

const ToggleButtonWithPopover = props => <ToggleButtonComponent {...props} />;

ToggleButtonWithPopover.propTypes = {
  tooltip: PropTypes.node.isRequired,
  ...ToggleButton.propTypes,
  ...ToggleButtonComponent.propTypes
};

export default ToggleButtonWithPopover;
