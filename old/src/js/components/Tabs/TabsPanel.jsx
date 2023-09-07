import React from 'react';
import PropTypes from 'prop-types';

const TabsPanel = props => <div className={props.className}>{props.children}</div>;

TabsPanel.propTypes = {
  /**
   * Can be either simple text or link
   */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

TabsPanel.defaultProps = {
  className: ''
};

export default TabsPanel;
