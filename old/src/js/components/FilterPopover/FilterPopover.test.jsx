import React from 'react';
import { mount } from 'enzyme';

import FilterPopover from './FilterPopover';
import Popover from '../Popover/Popover';
import IconButton from '../IconButton/IconButton';

const mockContent = <span>some component</span>;

describe('<FilterPopover />', () => {
  it('should render Popover component', () => {
    const component = mount(<FilterPopover>{mockContent}</FilterPopover>);

    expect(component.find(Popover)).toMatchSnapshot();
  });

  describe('with cusom title', () => {
    it('should have its custom title', () => {
      const component = mount(<FilterPopover title={<IconButton.Info />}>{mockContent}</FilterPopover>);

      expect(component.find(IconButton.Filter).exists()).toEqual(false);
      expect(component.find(IconButton.Info).exists()).toEqual(true);
    });
  });
});
