import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ButtonGroup.less';

const ButtonGroup = ({ children, className }) => (
  <div className="panel-group">
    <div className={classNames('sc-btn-switch', className)}>{children}</div>
  </div>
);

ButtonGroup.propTypes = {
  /**
   * Children `<Button/>` elements
   */
  children: PropTypes.node.isRequired,

  /**
   *  Any custom class names
   */
  className: PropTypes.string
};

ButtonGroup.defaultProps = {
  className: ''
};

export default ButtonGroup;
