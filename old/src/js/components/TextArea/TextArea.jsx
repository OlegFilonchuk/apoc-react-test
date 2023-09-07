import React from 'react';
import PropTypes from 'prop-types';

import './TextArea.less';

function TextArea({ className, ...props }) {
  return <textarea {...props} className={`text-area sc-form-ele ${className}`} />;
}

TextArea.propTypes = {
  /**
   * Additional class names
   */
  className: PropTypes.string
};

TextArea.defaultProps = {
  className: ''
};

export default TextArea;
