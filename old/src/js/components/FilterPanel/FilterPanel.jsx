import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from '../Panel/Panel';
import PanelHeader from '../Panel/PanelHeader';
import Checkbox from '../Checkbox/Checkbox';
import Multiselect from '../Multiselect/Multiselect';

import { PropTypeOption, updateOptions } from './FilterPanelCommon';

/* eslint-disable react/no-unused-prop-types */
export default class FilterPanel extends Component {
  componentWillMount() {
    updateOptions(this);
  }

  componentWillUpdate(nextProps) {
    updateOptions(this, nextProps);
  }

  render() {
    const { title, className } = this.props;

    return (
      <Panel modifierClass={className}>
        <PanelHeader>
          <h3>{title}</h3>
        </PanelHeader>
        {this.options}
      </Panel>
    );
  }
}

FilterPanel.propTypes = {
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
   * Title of the panel
   */
  title: PropTypes.node.isRequired,

  /**
   * Options for the filter
   */
  options: PropTypes.arrayOf(PropTypeOption).isRequired,

  /**
   * callback when filtering options have changed
   */
  onChange: PropTypes.func,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

FilterPanel.defaultProps = {
  OptionsContainer: Multiselect,
  OptionComponent: Checkbox,
  onChange: () => true,
  className: ''
};
