import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input/Input';

import './AutocompleteInput.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

const BASE_CLASS = 'autocomplete-input';

export default class AutocompleteInput extends Component {
  onInputClick = e => {
    this.props.onClick(e, this.expandedValue);
    this.props.showFilteredOptions(this.props.value);
  };

  onButtonClick = e => {
    if (!this.props.disabled) {
      this.props.onClick(e, this.expandedValue);
      this.props.showAllOptions();
    }
  };

  onInputRef = ref => {
    this.root = ref;
  };

  get expandedValue() {
    return !(this.root !== document.activeElement && this.props.isExpanded);
  }

  get errors() {
    return this.props.children ? <div className="errors">{this.props.children}</div> : null;
  }

  get wrapperClass() {
    return classNames({
      disabled: this.props.disabled,
      [BASE_CLASS]: true,
      'input-wrapper': true,
      error: this.props.hasError
    });
  }

  get arrowClass() {
    return this.expandedValue ? 'sc-icon-down-arrow' : 'sc-icon-up-arrow';
  }

  handleChange = e => this.props.onChange(e.target.value);

  render() {
    const { placeholder, lettersLeftCount, value, maxLength, hasError, disabled } = this.props;

    return (
      <div className={this.wrapperClass}>
        <div className={`${BASE_CLASS}__wrapper`}>
          <Input
            onInputRef={this.onInputRef}
            onClick={this.onInputClick}
            onChange={this.handleChange}
            value={value}
            placeholder={placeholder}
            lettersLeftCount={lettersLeftCount}
            maxLength={maxLength}
            hasError={hasError}
            disabled={disabled}
            {...getDataTestElementProps(this.props)}
          />
        </div>
        <button className={`${BASE_CLASS}__button`} onClick={this.onButtonClick}>
          <span className={this.arrowClass} />
        </button>
        {this.errors}
      </div>
    );
  }
}

AutocompleteInput.propTypes = {
  /**
   * Input value
   */
  value: PropTypes.string,

  /**
   * Is options list expanded
   */
  isExpanded: PropTypes.bool,

  /**
   * onClick callback that is called to show/hide suggestions
   */
  onClick: PropTypes.func,

  /**
   * onChange callback
   */
  onChange: PropTypes.func,

  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,

  /**
   * If input is with characters limit this prop need to be passed to Input component
   */
  lettersLeftCount: PropTypes.number,

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
   * Callback to filter results based on input value
   */
  showFilteredOptions: PropTypes.func,

  /**
   * Callback to show all suggestions
   */
  showAllOptions: PropTypes.func,

  /**
   * Is input disabled
   */
  disabled: PropTypes.bool,

  ...dataTestElementPropTypes
};

AutocompleteInput.defaultProps = {
  value: '',
  isExpanded: false,
  onClick: () => true,
  onChange: () => true,
  placeholder: '',
  lettersLeftCount: null,
  maxLength: null,
  hasError: false,
  children: null,
  showFilteredOptions: () => true,
  showAllOptions: () => true,
  disabled: false
};
