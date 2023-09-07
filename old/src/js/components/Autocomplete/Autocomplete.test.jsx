import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Autocomplete from './Autocomplete';
import AutocompleteInput from './AutocompleteInput';

const defaultProps = { name: 'TestAutocomplete' };

const fakeOptions = [
  { label: 'test', value: 'test' },
  { label: 'test2', value: 'test2' }
];

const mountAutocomplete = (props = {}, mountMethod = mount) =>
  mountMethod(<Autocomplete {...defaultProps} {...props} />);

describe('<Autocomplete>', () => {
  it('should render <Autocomplete>', () => {
    expect(toJson(mountAutocomplete({ options: fakeOptions }))).toMatchSnapshot();
  });

  it('should render <Autocomplete> with empty options', () => {
    const options = [];

    expect(toJson(mountAutocomplete({ options }))).toMatchSnapshot();
  });

  it('should render <Autocomplete> with characters limit', () => {
    const fakeLettersLeftCount = 100;

    expect(toJson(mountAutocomplete({ lettersLeftCount: fakeLettersLeftCount }))).toMatchSnapshot();
  });

  it('should render disabled <Autocomplete>', () => {
    expect(toJson(mountAutocomplete({ disabled: true }))).toMatchSnapshot();
  });

  it('should open suggestions list on input click', () => {
    const autocomplete = mountAutocomplete({ options: fakeOptions });

    expect(autocomplete.find('.sc-open').length).toEqual(0);

    autocomplete
      .find(AutocompleteInput)
      .find('input')
      .simulate('click');

    expect(autocomplete.find('.sc-open').length).toEqual(1);
  });

  it('should open suggestions list on button click', () => {
    const autocomplete = mountAutocomplete({ options: fakeOptions });

    expect(autocomplete.find('.sc-open').length).toEqual(0);

    autocomplete
      .find(AutocompleteInput)
      .find('button')
      .simulate('click');

    expect(autocomplete.find('.sc-open').length).toEqual(1);
  });
});
