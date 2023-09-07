import React from 'react';
import { mount } from 'enzyme';

import Button from '../Button/Button';

const defaultProps = {
  onClick: () => null
};

describe('<Button />', () => {
  const mountButtonGroup = (children, props = {}, mountFn = mount) =>
    mountFn(
      <Button {...defaultProps} {...props}>
        {children}
      </Button>
    );

  it('should render Button component', () => {
    const button = mountButtonGroup('Foo Bar Button');

    expect(button).toMatchSnapshot();
  });

  it('should render disabled button ', () => {
    const buttonGroup = mountButtonGroup("I'm disabled button", {
      disabled: true
    });

    expect(buttonGroup).toMatchSnapshot();
  });

  it('should allow to click on enabled button ', () => {
    const fakeClick = jest.fn();

    const buttonGroup = mountButtonGroup('Click me!', {
      disabled: false,
      onClick: fakeClick
    });

    buttonGroup.find('button').simulate('click');

    expect(fakeClick).toHaveBeenCalled();
  });

  it('should not allow to click on disabled button ', () => {
    const fakeClick = jest.fn();

    const buttonGroup = mountButtonGroup("Can't touch this!", {
      disabled: true,
      onClick: fakeClick
    });

    buttonGroup.find('button').simulate('click');

    expect(fakeClick).not.toHaveBeenCalled();
  });
});
