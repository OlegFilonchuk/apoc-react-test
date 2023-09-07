import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dropdown from '../Dropdown/Dropdown';
import DropdownOption from '../Dropdown/DropdownOption';
import DropdownInput from '../Dropdown/DropdownInput';

import './SearchDropdown.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

class SearchDropdown extends React.Component {
  get filteredDropdownOptions() {
    const arrayOfOptionValues = Array.from(this.props.results)
      .filter(({ value }) => value && value.startsWith(this.props.searchValue))
      .includes(this.props.searchValue);

    const resultsArray = arrayOfOptionValues.length
      ? arrayOfOptionValues
      : [{ value: this.props.searchValue, label: this.props.searchValue }];

    return resultsArray.map(this.constructDropdownOption);
  }

  get dropdownOptions() {
    const { allowDynamicOptions, searchValue, results } = this.props;

    if (allowDynamicOptions) {
      return searchValue ? this.filteredDropdownOptions : Array.from(results).map(this.constructDropdownOption);
    }

    return results.length ? results.map(({ label, value }) => this.constructDropdownOption({ label, value })) : null;
  }

  get resultsDropdownButton() {
    const { placeholder, onSearchChange, allowDynamicOptions, searchValue } = this.props;

    return allowDynamicOptions ? (
      <input
        className="sc-btn search-box"
        onChange={onSearchChange}
        value={searchValue}
        {...getDataTestElementProps(this.props)}
        inputType={'searchDropdown'}
        placeholder={placeholder}
      />
    ) : (
      <DropdownInput
        className="sc-btn-default search-box"
        placeholder={placeholder}
        onChange={onSearchChange}
        {...getDataTestElementProps(this.props)}
      />
    );
  }

  get resultsDropdown() {
    const { name, onDropdownChange, useSubmitOnEnter } = this.props;

    return (
      <Dropdown
        name={name}
        onChange={onDropdownChange}
        useSubmitOnEnter={useSubmitOnEnter}
        button={this.resultsDropdownButton}
      >
        {this.dropdownOptions}
      </Dropdown>
    );
  }

  get searchIcon() {
    return this.props.allowDynamicOptions ? (
      <div className="search-dropdown__icon">
        <i className="sc-icon-caret-down" />
      </div>
    ) : (
      this.props.searchIcon
    );
  }

  get className() {
    return classNames('search-dropdown', this.props.className);
  }

  constructDropdownOption = ({ label, value }) => (
    <DropdownOption key={`${value}-${label}`} label={label} value={value} selected={value === this.props.searchValue} />
  );

  render() {
    return (
      <div className={this.className}>
        {this.resultsDropdown}
        {this.searchIcon}
      </div>
    );
  }
}

SearchDropdown.propTypes = {
  /**
   * Necessary only when [DropdownOption](#dropdownoption) is used. Sets a name every option's `input`.
   */
  name: PropTypes.string.isRequired,

  /**
   * An additional class name
   */
  className: PropTypes.string,

  /**
   * placeholder for dropdown input
   */
  placeholder: PropTypes.string,

  /**
   * onSearchChange handler. Process the search value.
   */
  onSearchChange: PropTypes.func,

  /**
   * results are values visible as dropdown options
   */
  results: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),

  /**
   * onDropdownChange handler. Process the dropdown options.
   */
  onDropdownChange: PropTypes.func,

  /**
   * searchIcon is visible icon next to input search
   */
  searchIcon: PropTypes.element,

  /**
   * Enable/disable submit on enter press
   */
  useSubmitOnEnter: PropTypes.bool,

  /**
   * allowDynamicOptions - additional props which allows to add custom values to results (dropdown options)
   */
  allowDynamicOptions: PropTypes.bool,

  /**
   * searchValue - custom value which can be add to results (dropdown options)
   */
  searchValue: PropTypes.string,
  ...dataTestElementPropTypes
};

SearchDropdown.defaultProps = {
  className: '',
  placeholder: 'Search for country',
  onDropdownChange: () => true,
  onSearchChange: () => true,
  results: [],
  searchIcon: <i className="sc-icon-magnifier search-dropdown--icon" />,
  useSubmitOnEnter: false,
  allowDynamicOptions: false,
  searchValue: ''
};

export default SearchDropdown;
