import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import Dropdown from '../Dropdown/Dropdown';
import DropdownOption from '../Dropdown/DropdownOption';
import AutocompleteInput from './AutocompleteInput';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

import './Autocomplete.less';

const BASE_CLASS = 'autocomplete';

class Autocomplete extends React.Component {
  state = {
    options: []
  };

  componentDidMount() {
    this.setPropsOptions(this.props.options);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.options, nextProps.options)) {
      this.setPropsOptions(nextProps.options);
    }
  }

  onChange = value => {
    this.props.onChange(value);
    this.showFilteredOptions(value);
  };

  setPropsOptions = options => {
    this.setState({
      options
    });
  };

  getFilteredOptions = value =>
    this.props.options
      .filter(option => option.label.toLowerCase().startsWith(value.toLowerCase()))
      .map(({ label, value: optionValue }) => ({ label, value: optionValue }));

  get options() {
    return this.state.options.length
      ? this.state.options.map(({ label, value }) => (
          <DropdownOption
            key={`${value}-${label}`}
            label={label}
            value={value}
            selected={value === this.selectedOption}
          />
        ))
      : [];
  }

  get expanded() {
    return this.state.options.length ? this.props.isExpanded : false;
  }

  get selectedOption() {
    const selectedOption = this.state.options.find(option => option.value === this.props.value);

    return selectedOption ? selectedOption.value : null;
  }

  showFilteredOptions = value => {
    this.setState({
      options: this.getFilteredOptions(value)
    });
  };

  showAllOptions = () => {
    this.setState({
      options: this.props.options
    });
  };

  handleOptionChange = option => this.onChange(option.value);

  render() {
    const { placeholder, lettersLeftCount, value, maxLength, hasError, disabled, children, className } = this.props;
    const finalClassName = classNames(BASE_CLASS, className);

    return (
      <div className={finalClassName}>
        <Dropdown
          name={name}
          onChange={this.handleOptionChange}
          value={value}
          button={
            <AutocompleteInput
              onChange={this.onChange}
              lettersLeftCount={lettersLeftCount}
              value={value}
              isExpanded={this.expanded}
              showAllOptions={this.showAllOptions}
              showFilteredOptions={this.showFilteredOptions}
              maxLength={maxLength}
              hasError={hasError}
              disabled={disabled}
              placeholder={placeholder}
              {...getDataTestElementProps(this.props)}
              id={`${name}-input`}
            >
              {children}
            </AutocompleteInput>
          }
        >
          {this.options.length ? this.options : null}
        </Dropdown>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  /**
   * Input value
   */
  value: PropTypes.string,

  /**
   * Array of options that will be used to show suggestions
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),

  /**
   * Is input disabled
   */
  disabled: PropTypes.bool,

  /**
   * Function that will be called when input value changes
   */
  onChange: PropTypes.func,

  /**
   * If autocomplete has characters limits this prop needs to be passed to Input component
   */
  lettersLeftCount: PropTypes.number,

  /**
   * Is options list expanded
   */
  isExpanded: PropTypes.bool,

  /**
   * Defines maximum characters length
   */
  maxLength: PropTypes.number,

  /**
   * Flag if input has errors for styling
   */
  hasError: PropTypes.bool,

  /**
   * Errors list
   */
  children: PropTypes.node,

  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  ...dataTestElementPropTypes
};

Autocomplete.defaultProps = {
  value: '',
  options: [],
  disabled: false,
  onChange: value => value,
  lettersLeftCount: null,
  isExpanded: false,
  maxLength: null,
  hasError: false,
  children: null,
  placeholder: null,
  className: ''
};

export default Autocomplete;
