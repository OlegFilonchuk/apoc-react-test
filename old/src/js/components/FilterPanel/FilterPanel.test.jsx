import React from 'react';
import { mount } from 'enzyme';

import mockedFilter from './mockedFilter.json';

import FilterPanel from './FilterPanel';

const mockTitle = mockedFilter.title;
const mockId = mockedFilter.id;

describe('<FilterPanel />', () => {
  const onChange = jest.fn();
  const onCollapseStateChange = jest.fn();

  const mountElement = options =>
    mount(
      <FilterPanel
        options={options}
        title={mockTitle}
        onChange={onChange}
        onCollapseStateChange={onCollapseStateChange}
        id={mockId}
      />
    );

  describe('default behavior', () => {
    const options = [{ id: 'test', label: 'test', name: 'test' }];

    let filter;

    beforeEach(() => {
      filter = mountElement(options);
    });

    it('should render FilterPanel component', () => {
      expect(filter).toMatchSnapshot();
    });

    it('should render FilterPanel component with whole panel not clickable/collapsable', () => {
      expect(filter.find('.panel__wrapper--collapsed').length).toEqual(0);

      filter.find('.sc-panel-heading').simulate('click');

      expect(filter.find('.panel__wrapper--collapsed').length).toEqual(0);
    });
  });

  describe('checked parameter', () => {
    const options = [
      {
        label: 'test',
        name: 'test',
        id: '1',
        checked: true
      },
      {
        label: 'test2',
        id: '2',
        name: 'test2'
      }
    ];

    const filter = mountElement(options);

    const testOptionCheckedStatus = (optionIndex, expectedIsChecked) => {
      const input = filter.find('.square-checkbox-square input').at(optionIndex);
      const isChecked = !!input.getElement().props.checked;

      expect(isChecked).toEqual(expectedIsChecked);
    };

    it('should be checked', () => {
      const optionIndex = 0;
      const expectedIsChecked = true;

      testOptionCheckedStatus(optionIndex, expectedIsChecked);
    });

    it('should not be checked', () => {
      const optionIndex = 1;
      const expectedIsChecked = false;

      testOptionCheckedStatus(optionIndex, expectedIsChecked);
    });
  });
});
