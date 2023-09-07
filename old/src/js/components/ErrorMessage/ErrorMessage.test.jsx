import React from 'react';
import { mount } from 'enzyme';

import ErrorMessage from './ErrorMessage';

const mountAlert = (content, props = {}, mountMethod = mount) =>
  mountMethod(<ErrorMessage {...props}>{content}</ErrorMessage>);

describe('<ErrorMessage>', () => {
  it('should fire onClose event when clicking on close button', () => {
    const content = 'Test Message';
    const errorMessage = mountAlert(content, mount);

    expect(errorMessage).toMatchSnapshot();
  });
});
