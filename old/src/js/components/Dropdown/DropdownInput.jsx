import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export default class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;

    this.setState({ value }, () => this.props.onChange(value));
  }

  render() {
    const { className, onClick, isExpanded, inputType, placeholder } = this.props;
    const expanded = !(this.root !== document.activeElement && isExpanded);

    return (
      <input
        ref={ref => {
          this.root = ref;
        }}
        className={`sc-btn ${className}`}
        type={inputType}
        onClick={e => onClick(e, expanded)}
        onChange={this.handleChange}
        onKeyDown={this.props.onKeyDown}
        value={this.state.value}
        placeholder={placeholder}
        {...getDataTestElementProps(this.props)}
      />
    );
  }
}

DropdownInput.propTypes = {
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  isExpanded: PropTypes.bool,
  className: PropTypes.string,
  inputType: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  ...dataTestElementPropTypes
};

DropdownInput.defaultProps = {
  className: 'sc-btn-default',
  value: '',
  isExpanded: false,
  inputType: 'input',
  onKeyDown: () => true,
  onClick: () => true,
  onChange: () => true,
  placeholder: ''
};
