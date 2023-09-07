import React from 'react';
import { mount } from 'enzyme';

import AutocompleteInput from './AutocompleteInput';

const defaultProps = {
  onClick: () => null
};

describe('<AutocompleteInput />', () => {
  const mountAutocompleteInput = (props = {}, mountFn = mount) =>
    mountFn(<AutocompleteInput {...defaultProps} {...props} />);

  it('should render AutocompletInput component', () => {
    const autocompleteInput = mountAutocompleteInput();

    expect(autocompleteInput).toMatchSnapshot();
  });

  it('should render disabled autocomplete input component', () => {
    const disabledInput = mountAutocompleteInput({
      disabled: true
    });

    expect(disabledInput).toMatchSnapshot();
  });

  /**
   * Input actions
   */
  it('should allow to click on enabled input', () => {
    const fakeClick = jest.fn();

    const autocompleteInput = mountAutocompleteInput({
      disabled: false,
      onClick: fakeClick
    });

    autocompleteInput.find('input').simulate('click');

    expect(fakeClick).toHaveBeenCalled();
  });

  it('should not allow to click on disabled input', () => {
    const fakeClick = jest.fn();

    const autocompleteInput = mountAutocompleteInput({
      disabled: true,
      onClick: fakeClick
    });

    autocompleteInput.find('input').simulate('click');

    expect(fakeClick).not.toHaveBeenCalled();
  });

  it('should call showFilteredOptions with value on input click', () => {
    const fakeShowFilteredOptions = jest.fn();
    const fakeValue = 'fakeValue';

    const autocompleteInput = mountAutocompleteInput({
      showFilteredOptions: fakeShowFilteredOptions,
      value: fakeValue
    });

    autocompleteInput.find('input').simulate('click');

    expect(fakeShowFilteredOptions).toHaveBeenCalledWith(fakeValue);
  });

  /**
   * Button actions
   */
  it('should allow to click on enabled button', () => {
    const fakeClick = jest.fn();

    const autocompleteInput = mountAutocompleteInput({
      disabled: false,
      onClick: fakeClick
    });

    autocompleteInput.find('button').simulate('click');

    expect(fakeClick).toHaveBeenCalled();
  });

  it('should not allow to click on disabled button', () => {
    const fakeClick = jest.fn();

    const autocompleteInput = mountAutocompleteInput({
      disabled: true,
      onClick: fakeClick
    });

    autocompleteInput.find('button').simulate('click');

    expect(fakeClick).not.toHaveBeenCalled();
  });

  it('should call showAllOptions on button click', () => {
    const fakeShowAllOptions = jest.fn();

    const autocompleteInput = mountAutocompleteInput({
      showAllOptions: fakeShowAllOptions
    });

    autocompleteInput.find('button').simulate('click');

    expect(fakeShowAllOptions).toHaveBeenCalled();
  });

  /**
   * onChange
   */
  it('should call onChange callback with proper value', () => {
    const fakeOnChange = jest.fn();
    const fakeValue = 'fakeValue';
    const fakeEvent = {
      target: {
        value: fakeValue
      }
    };

    const autocompleteInput = mountAutocompleteInput({
      onChange: fakeOnChange
    });

    autocompleteInput.instance().handleChange(fakeEvent);

    expect(fakeOnChange).toHaveBeenCalledWith(fakeValue);
  });
});
