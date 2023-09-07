import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelMenu = props => <div className={classNames('sc-panel-menus', props.className)}>{props.children}</div>;

PanelMenu.propTypes = {
  /**
   * Panel menu elements
   */
  children: PropTypes.node.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

PanelMenu.defaultProps = {
  className: ''
};

export default PanelMenu;
