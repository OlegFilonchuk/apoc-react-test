import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import SearchDropdown from './SearchDropdown';
import Dropdown from '../Dropdown/Dropdown';
import DropdownInput from '../Dropdown/DropdownInput';

const defaultProps = { name: 'TestDropdown' };
const list = [
  { label: 'first', value: 'fr' },
  { label: 'second', value: 'sc' },
  { label: 'third', value: 'th' },
  { label: 'second first', value: 'sf' },
  { label: 'third again', value: 'ta' }
];

const mountSearchDropdown = (props = {}, mountMethod = mount) =>
  mountMethod(<SearchDropdown {...defaultProps} {...props} />);

describe('<SearchDropdown>', () => {
  it('should render <SearchDropdown>', () => {
    expect(toJson(mountSearchDropdown({ results: list }))).toMatchSnapshot();
  });

  it('should render <SearchDropdown> with empty options', () => {
    expect(toJson(mountSearchDropdown({ results: [] }))).toMatchSnapshot();
  });

  it('should open dropdown on input click', () => {
    const searchDropdown = mountSearchDropdown({ results: list });

    expect(searchDropdown.find(Dropdown).find('.sc-open').length).toEqual(0);

    searchDropdown
      .find(DropdownInput)
      .find('input')
      .simulate('click');

    expect(searchDropdown.find(Dropdown).find('.sc-open').length).toEqual(1);
  });

  it('should call onDropdownChange when the Enter button is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mountSearchDropdown({ results: list, useSubmitOnEnter: true, onDropdownChange: onChange });

    expect(onChange).not.toHaveBeenCalled();

    wrapper
      .find(DropdownInput)
      .find('input')
      .simulate('click')
      .simulate('keyDown', { preventDefault: () => {}, keyCode: 13, key: 'Enter' }); // enter

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
