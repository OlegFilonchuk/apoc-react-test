import React, { Component } from 'react';
import { uniq, isObject } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input/Input';

export default class CommaSeparatedInput extends Component {
  static formatStringList = stringList => {
    const target = stringList.map((item, i) => {
      const str = String(item);
      const isFirst = i === 0;

      if (isFirst || str.startsWith(' ')) {
        return str;
      }

      return ` ${str}`;
    });

    return target.join(',');
  };

  static prepareInitialValue = initValue =>
    initValue === 'string' ? initValue : CommaSeparatedInput.formatStringList(initValue);

  static isStringTruthy = str => !!str.trim();

  static removeGaps = str => str.replace(/\s/g, '');

  constructor(props) {
    super(props);

    this.state = {
      lastPressedKey: '',
      viewValue: CommaSeparatedInput.prepareInitialValue(this.props.value)
    };
  }

  componentWillReceiveProps(nextProps) {
    /* Value of CommaSeparatedInput can also be changed by another WF input.
      Update like that also comes in an object with property "forced",
      and value to replace, f.e.:
      {
        forced: true,
        value: 'value, from, force, update'
      }
    */

    const forceUpdated = isObject(nextProps.value) && nextProps.value.forced;

    if (forceUpdated) {
      const forcedValue = nextProps.value.value;

      const value = nextProps.value.join ? `${this.state.viewValue}, ${forcedValue}` : forcedValue;

      this.onBlur({
        target: {
          value: String(value)
        }
      });
    }
  }

  onChange = ({ target: { value } }) => {
    this.setViewValue(value);

    this.props.onChange(
      value
        .split(',')
        .filter(CommaSeparatedInput.isStringTruthy)
        .map(word => word.trim())
    );
  };

  onBlur = ({ target: { value } }) => {
    const trimmedValues = uniq(
      value
        .trim()
        .split(',')
        .filter(CommaSeparatedInput.isStringTruthy)
        .map(CommaSeparatedInput.removeGaps)
    );

    this.props.onChange(trimmedValues);

    this.setState(prevState => ({
      ...prevState,
      viewValue: CommaSeparatedInput.formatStringList(trimmedValues)
    }));
  };

  get inputClass() {
    return classNames(this.props.className, {
      error: this.props.hasError
    });
  }

  get errors() {
    return this.props.children ? <div className="errors">{this.props.children}</div> : null;
  }

  setViewValue = viewValue =>
    this.setState(prevState => ({
      ...prevState,
      viewValue
    }));

  saveLastPressedKey = ({ key }) => this.setState(prevState => ({ ...prevState, lastPressedKey: key }));

  render() {
    return (
      <div className="input-wrapper">
        <Input
          onKeyDown={this.saveLastPressedKey}
          className={this.inputClass}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={this.state.viewValue}
        />
        {this.errors}
      </div>
    );
  }
}

CommaSeparatedInput.propTypes = {
  /**
   * Input value
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ]),

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Flag if input has errors for styling
   */
  hasError: PropTypes.bool,

  /**
   * Errors list
   */
  children: PropTypes.node,

  /**
   * Function that will be called when input value changes
   */
  onChange: PropTypes.func
};

CommaSeparatedInput.defaultProps = {
  value: [],
  className: '',
  hasError: false,
  children: null,
  onChange: value => value
};
