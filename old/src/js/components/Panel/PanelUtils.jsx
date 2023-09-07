import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelUtils = props => <div className={classNames('sc-panel-utils', props.className)}>{props.children}</div>;

PanelUtils.propTypes = {
  /**
   * Panel utils elements
   */
  children: PropTypes.node.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

PanelUtils.defaultProps = {
  className: ''
};

export default PanelUtils;
