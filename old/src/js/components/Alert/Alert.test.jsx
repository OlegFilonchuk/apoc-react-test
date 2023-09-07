import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Alert from './Alert';

const mountAlert = (props = {}, mountMethod = shallow) => mountMethod(<Alert {...props}>Text</Alert>);

describe('<Alert>', () => {
  it('should render opened <Alert>', () => {
    expect(toJson(mountAlert())).toMatchSnapshot();
  });

  it('should render closed <Alert>', () => {
    expect(toJson(mountAlert({ isOpen: false }, mount))).toMatchSnapshot();
  });

  it('should render non closable <Alert>', () => {
    expect(toJson(mountAlert({ isClosable: false }))).toMatchSnapshot();
  });

  it('should fire onClose event when clicking on close button', () => {
    const onClose = jest.fn();
    const alert = mountAlert({ onClose }, mount);

    alert.find('button.sc-close').simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('should fire onClose event after 3 seconds timeout by default', () => {
    // Enables cheats
    jest.useFakeTimers();

    // Our callback to be called
    const onClose = jest.fn();

    // Render
    mountAlert({ onClose }, mount);

    // At this point in time, the callback should not have been called yet
    expect(onClose).not.toBeCalled();

    // Fast forward
    jest.runAllTimers();

    expect(onClose).toHaveBeenCalled();
  });
});
