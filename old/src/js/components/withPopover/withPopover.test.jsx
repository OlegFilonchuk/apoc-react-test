import React from 'react';
import { mount } from 'enzyme';

import withPopover from './withPopover';

describe('withPopover HoC', () => {
  describe('render component', () => {
    const div = () => <div />;

    div.displayName = 'div';

    it('should render Popover with <div>', () => {
      const DivWithPopover = withPopover(div);
      const component = mount(<DivWithPopover tooltip="Did you know that..." />);

      expect(component).toMatchSnapshot();
    });
  });
});
