import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import filter from 'lodash/filter';

import Input from '../Input/Input';
import Fieldset from '../Fieldset/Fieldset';
import Label from '../Label/Label';
import ToggleButton from '../ToggleButton/ToggleButton';

import './LoadConstraintPanel.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

class LoadConstraintPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentVisible: false,
      enabled: false
    };
  }

  render() {
    const { className, config, onValueChanged, ...rest } = this.props;

    const extendedClassName = classNames(className);

    const propsObj = {
      ...rest,
      config,
      className: extendedClassName,
      ...getDataTestElementProps(rest)
    };

    const fields = config.fields;

    const firstColumn = filter(fields, f => f.column === 1);
    const secondColumn = filter(fields, f => f.column === 2);

    const items = firstColumn.map((column, index) => {
      const toggleIdColumn = `${column.id}Enabled`;

      if (index < secondColumn.length) {
        const toggleIdSecondColumn = `${secondColumn[index].id}Enabled`;

        return (
          <tr>
            <td>
              <Fieldset
                className="without-border"
                labelWrapperClassName="sc-col-sm-5"
                inputWrapperClassName="sc-col-sm-5"
              >
                <Label>{column.label}</Label>
                <ToggleButton
                  toggleSize="xs"
                  className="sc-col-sm-5"
                  isOn={column.enabled}
                  onSwitch={e => onValueChanged(toggleIdColumn, e)}
                />
                <Input
                  className="input-field-small"
                  suffix={column.suffix}
                  defaultValue={column.value}
                  onChange={e => onValueChanged(column.id, e.target.value)}
                />
              </Fieldset>
            </td>
            <td>
              <Fieldset
                className="without-border"
                labelWrapperClassName="sc-col-sm-5"
                inputWrapperClassName="sc-col-sm-5"
              >
                <Label>{secondColumn[index].label}</Label>
                <ToggleButton
                  toggleSize="xs"
                  className="sc-col-sm-5"
                  isOn={secondColumn[index].enabled}
                  onSwitch={e => onValueChanged(toggleIdSecondColumn, e)}
                />
                <Input
                  className="input-field-small"
                  suffix={secondColumn[index].suffix}
                  defaultValue={secondColumn[index].value}
                  onChange={e => onValueChanged(secondColumn[index].id, e.target.value)}
                />
              </Fieldset>
            </td>
          </tr>
        );
      }

      return (
        <tr>
          <td>
            <Fieldset
              className="without-border"
              labelWrapperClassName="sc-col-sm-5"
              inputWrapperClassName="sc-col-sm-5"
            >
              <Label>{column.label}</Label>
              <ToggleButton
                toggleSize="xs"
                className="sc-col-sm-5"
                isOn={column.enabled}
                onSwitch={e => onValueChanged(toggleIdColumn, e)}
              />
              <Input
                className="input-field-small"
                suffix={column.suffix}
                defaultValue={column.value}
                onChange={e => onValueChanged(column.id, e.target.value)}
              />
            </Fieldset>
          </td>
          <td />
        </tr>
      );
    });

    const panel = (
      <Fieldset {...propsObj}>
        <Label>Max Load Constraints</Label>
        <ToggleButton toggleSize="xs" isOn={propsObj.config.enabled} onSwitch={e => onValueChanged('enabled', e)} />
        <table>{items}</table>
      </Fieldset>
    );

    return panel;
  }
}

LoadConstraintPanel.propTypes = {
  /**
   * Any custom class names
   */
  className: PropTypes.string,

  config: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired
  }).isRequired,

  onValueChanged: PropTypes.func,
  ...dataTestElementPropTypes
};

LoadConstraintPanel.defaultProps = {
  className: 'load-constraint-panel',
  onValueChanged: (field, value) => value
};

export default LoadConstraintPanel;
