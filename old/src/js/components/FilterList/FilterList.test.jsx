import React from 'react';
import { mount } from 'enzyme';

import FilterList from './FilterList';

const defaultOptions = [
  { name: 'Business Systems', value: 'value1' },
  { name: 'iPhone', value: 'value2' },
  { name: 'Imported Scenarios', value: 'value3' },
  { name: 'Social Networking', value: 'value4' }
];

describe('<FilterList />', () => {
  it('should render <FilterList />', () => {
    const component = mount(<FilterList options={defaultOptions} />);

    expect(component).toMatchSnapshot();
  });

  describe('when remove is clicked should call onChange', () => {
    const onChange = jest.fn();
    const component = mount(<FilterList options={defaultOptions} onChange={onChange} />);
    const itemToRemove = 2;

    component
      .find('button')
      .at(itemToRemove)
      .simulate('click');

    it('atleast once', () => {
      expect(onChange).toBeCalled();
    });

    it('with the right argument', () => {
      expect(onChange).toBeCalledWith(
        [...defaultOptions].filter(option => option.value.name !== defaultOptions[itemToRemove].value.name)
      );
    });
  });

  describe('when remove all is clicked should call onChange', () => {
    const onChange = jest.fn();
    const component = mount(<FilterList options={defaultOptions} onChange={onChange} />);

    component.find('.filterlist__remove-all button').simulate('click');

    it('atleast once', () => {
      expect(onChange).toBeCalled();
    });

    it('with empty array', () => {
      expect(onChange).toBeCalledWith([]);
    });
  });
});
