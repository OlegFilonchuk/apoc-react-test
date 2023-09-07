import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Collapse from '../Collapse/Collapse';
import Checkbox from '../Checkbox/Checkbox';
import Multiselect from '../Multiselect/Multiselect';

import { PropTypeOption, updateOptions, collapseIconStyles } from './FilterPanelCommon';

/* eslint-disable react/no-unused-prop-types */
export default class FilterPanelCollapse extends Component {
  componentWillMount() {
    updateOptions(this);
  }

  componentWillUpdate(nextProps) {
    updateOptions(this, nextProps);
  }

  render() {
    const { id, title, collapsed, onCollapseStateChange, className, displayCounter } = this.props;

    return (
      <Collapse
        className={className}
        title={title}
        isCollapsed={collapsed}
        onToggled={isCollapsed => onCollapseStateChange(id, isCollapsed)}
        iconStyles={collapseIconStyles}
        isPanelButton
        displayCounter={displayCounter}
      >
        {this.options}
      </Collapse>
    );
  }
}

FilterPanelCollapse.propTypes = {
  /**
   * Options container this component will render - no need to change for now
   *  - defaults to `Multiselect`
   */
  OptionsContainer: PropTypes.func,

  /**
   * Single option component - no need to change for now
   *  - defaults to `Checkbox`
   */
  OptionComponent: PropTypes.func,

  /**
   * id of the filter
   */
  id: PropTypes.string.isRequired,

  /**
   * Title of the panel
   */
  title: PropTypes.node.isRequired,

  /**
   * Is filter collapsed
   */
  collapsed: PropTypes.bool,

  /**
   * Options for the filter
   */
  options: PropTypes.arrayOf(PropTypeOption).isRequired,

  /**
   * callback when filtering options have changed
   */
  onChange: PropTypes.func,

  /**
   * Function that will run when filter collapse is changed
   */
  onCollapseStateChange: PropTypes.func,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * If true, show counter for selected items
   */
  displayCounter: PropTypes.bool
};

FilterPanelCollapse.defaultProps = {
  OptionsContainer: Multiselect,
  OptionComponent: Checkbox,
  collapsed: false,
  onChange: () => true,
  onCollapseStateChange: () => true,
  className: '',
  displayCounter: false
};
