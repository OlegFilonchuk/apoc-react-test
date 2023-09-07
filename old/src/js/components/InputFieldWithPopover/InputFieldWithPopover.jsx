import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../Input/Input';
import withPopover from '../withPopover/withPopover';

const InputFieldWithPopoverComponent = withPopover(InputField);

const InputFieldWithPopover = props => <InputFieldWithPopoverComponent {...props} />;

InputFieldWithPopover.propTypes = {
  tooltip: PropTypes.node.isRequired,
  ...InputField.propTypes,
  ...InputFieldWithPopover.propTypes
};

export default InputFieldWithPopover;
