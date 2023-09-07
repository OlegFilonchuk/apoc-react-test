import React from 'react';
import { mount } from 'enzyme';
import InputFieldWithPopover from './InputFieldWithPopover';

describe('<InputFieldWithPopover />', () => {
  it('should render component', () => {
    const component = mount(<InputFieldWithPopover tooltip="Foo Bar tip" placeholder="What's up?" />);

    expect(component).toMatchSnapshot();
  });
});
