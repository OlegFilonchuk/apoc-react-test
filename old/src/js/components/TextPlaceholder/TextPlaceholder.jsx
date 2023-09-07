import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TextPlaceholder.less';

const TextPlaceholder = ({ text, className }) => <div className={classNames('pure-text', className)}>{text}</div>;

export default TextPlaceholder;

TextPlaceholder.propTypes = {
  text: PropTypes.string.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};
TextPlaceholder.defaultProps = {
  className: ''
};
