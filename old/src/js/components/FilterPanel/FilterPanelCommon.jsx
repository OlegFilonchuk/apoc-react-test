import React from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'lodash/isEqual';

import FilterLabel from './FilterLabel';

import './FilterPanel.less';

const TRIM_LABEL_WHEN_NEEDED_CLASS_NAME = 'filter__label--truncate';

export const collapseIconStyles = {
  expanded: 'sc-icon-down-arrow',
  collapsed: 'sc-icon-right-arrow'
};

export const PropTypeOption = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.node,
  labelCount: PropTypes.node,
  tooltip: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
});

export const getOptions = (OptionComponent, options) =>
  options.map(({ id, name, label, labelIcon, labelCount, tooltip, disabled, checked }) => (
    <OptionComponent
      key={id}
      label={<FilterLabel label={label} labelIcon={labelIcon} labelCount={labelCount} />}
      tooltip={tooltip}
      name={name || id}
      checked={checked}
      selected={checked}
      disabled={disabled}
      className={TRIM_LABEL_WHEN_NEEDED_CLASS_NAME}
      showHint
    />
  ));

export const shouldOptionsUpdate = (nextProps, props) =>
  !nextProps || !props || !deepEqual(nextProps.options, props.options);

export const updateOptions = (component, nextProps) => {
  if (shouldOptionsUpdate(nextProps, component.props)) {
    const { OptionsContainer, OptionComponent, onChange, options } = nextProps || component.props;

    // eslint-disable-next-line no-param-reassign
    component.options = <OptionsContainer onChange={onChange}>{getOptions(OptionComponent, options)}</OptionsContainer>;
  }
};
