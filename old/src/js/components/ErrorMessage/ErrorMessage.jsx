import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ErrorMessage.less';

function ErrorMessage({ isVisible, children, className }) {
  if (isVisible) {
    const finalClassName = classNames('error-message', className);

    return (
      <div className={finalClassName}>
        <span className="error-message--icon">
          <i className="sc-icon-triangle-warning" />
        </span>
        <span className="error-message--text">{children}</span>
      </div>
    );
  }

  return null;
}

ErrorMessage.propTypes = {
  /**
   * Whether alert should be opened or closed by default
   */
  isVisible: PropTypes.bool,

  /**
   * Can be either simple text or link
   */
  children: PropTypes.node.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

ErrorMessage.defaultProps = {
  isVisible: false,
  children: '',
  className: ''
};

export default ErrorMessage;
