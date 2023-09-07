import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TestQueueDropdownOptionLabel.less';

export default function TestQueueDropdownOptionLabel(props) {
  const finalClassName = classNames('test-queue-dropdown-option-label', props.className);

  return (
    <span className={finalClassName}>
      <span className="sc-icon-solid-square" style={{ color: props.color }} />
      <span className="option-text">{props.text}</span>
    </span>
  );
}

TestQueueDropdownOptionLabel.propTypes = {
  /**
   * Text of option
   */
  text: PropTypes.string.isRequired,

  /**
   * Color of square's background
   */
  color: PropTypes.string.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

TestQueueDropdownOptionLabel.defaultProps = {
  className: ''
};
