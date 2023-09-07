import React from 'react';
import { mount } from 'enzyme';

import ToggleButtonWithPopover from './ToggleButtonWithPopover';

describe('<ToggleButtonWithPopover />', () => {
  it('should render component', () => {
    const component = mount(<ToggleButtonWithPopover tooltip="Foo Bar tip" placeholder="What's up?" />);

    expect(component).toMatchSnapshot();
  });
});
