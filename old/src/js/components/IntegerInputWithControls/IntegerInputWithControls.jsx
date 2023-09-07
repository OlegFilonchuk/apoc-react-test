import React from 'react';
import PropTypes from 'prop-types';
import { isFinite } from 'lodash';
import classnames from 'classnames';

import Input from '../Input/Input';
import Label from '../Label/Label';
import Button from '../Button/Button';

import './IntegerInputWithControls.less';

class IntegerInputWithControls extends React.Component {
  static checkIfZero = val => Number(val) === 0;

  static isValidPositiveInteger = val => val % 1 === 0 && isFinite(Number(val)) && Number(val) >= 0;

  constructor(props) {
    super(props);

    this.state = {
      isZero: IntegerInputWithControls.checkIfZero(props.value),
      value: props.value
    };
  }

  onChange = e => {
    const {
      target: { value }
    } = e;

    if (IntegerInputWithControls.isValidPositiveInteger(value)) {
      this.setState({
        isZero: IntegerInputWithControls.checkIfZero(value),
        value
      });

      this.props.onValueChange({ key: this.props.label, value });
    }
  };

  get wrapperClassName() {
    return classnames('integer-input-with-controls', this.props.wrapperClassName);
  }

  get labelText() {
    return this.props.children && this.props.children.length ? this.props.children : this.props.label;
  }

  get inputProps() {
    return { ...this.props, children: null };
  }

  addition = () => {
    this.genericButtonClick(Number(this.state.value) + 1);
  };

  subtraction = () => {
    this.genericButtonClick(Number(this.state.value) - 1);
  };

  genericButtonClick = value => {
    this.setState({
      isZero: IntegerInputWithControls.checkIfZero(value),
      value: `${value}`
    });

    this.props.onValueChange({ key: this.props.label, value });
  };

  render() {
    const { value, isZero } = this.state;

    return (
      <div className={this.wrapperClassName}>
        <Label htmlFor={this.props.label}>{this.labelText}</Label>
        <Button className="sc-btn-primary-outline icon-button" onClick={this.addition}>
          <span className="sc-icon-plus" />
        </Button>
        <Button disabled={isZero} className="sc-btn-primary-outline icon-button" onClick={this.subtraction}>
          <span className="sc-icon-solid-square" />
        </Button>
        <Input {...this.inputProps} id={this.props.label} onChange={this.onChange} value={value} />
      </div>
    );
  }
}

IntegerInputWithControls.propTypes = {
  /**
   * Any custom class names for wrapper
   */
  wrapperClassName: PropTypes.string,

  /**
   * Input value
   */
  value: PropTypes.string,

  /**
   * Label value that will also be used as id for base input
   */
  label: PropTypes.string,

  /**
   * onValueChange should be passed to this component
   */
  onValueChange: PropTypes.func,

  /**
   * children can be passed to act like a label of input
   */
  children: PropTypes.node
};

IntegerInputWithControls.defaultProps = {
  wrapperClassName: '',
  value: '0',
  label: 'Label',
  children: null,
  onValueChange: () => {}
};

export default IntegerInputWithControls;
