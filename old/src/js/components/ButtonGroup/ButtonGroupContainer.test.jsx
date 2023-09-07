import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ButtonGroupContainer from './ButtonGroupContainer';
import Button from '../Button/Button';

describe('<ButtonGroupContainer />', () => {
  let onGroupButtonClick;
  const buttonValue = { id: 'test' };
  const onClick = () => true;

  const defaultButtons = [
    <Button onClick={onClick} key={0} value={buttonValue}>
      Option 1
    </Button>,
    <Button onClick={onClick} key={1} value="id">
      Option 2
    </Button>,
    <Button onClick={onClick} key={2} disabled>
      Option 3
    </Button>,
    <Button onClick={onClick} key={3} disabled>
      Option 4
    </Button>
  ];

  beforeEach(() => {
    onGroupButtonClick = jest.fn();
  });

  const mountButtonGroupContainer = (props = {}, buttons = defaultButtons) =>
    mount(
      <ButtonGroupContainer onChange={onGroupButtonClick} {...props}>
        {buttons}
      </ButtonGroupContainer>
    );

  it('should render ButtonGroupContainer component with no Button selected by default', () => {
    const buttonGroupContainer = mountButtonGroupContainer();

    const selectedIndex = buttonGroupContainer.state('selectedIndex');

    expect(selectedIndex).toEqual(-1);

    expect(toJson(buttonGroupContainer)).toMatchSnapshot();
  });

  it('should render ButtonGroupContainer component with 1st Button selected', () => {
    const buttonGroupContainer = mountButtonGroupContainer({ selectedIndex: 0 });

    const selectedIndex = buttonGroupContainer.state('selectedIndex');

    expect(selectedIndex).toEqual(0);

    expect(toJson(buttonGroupContainer)).toMatchSnapshot();
  });

  it('should change selected Button when changed through props', () => {
    const buttonGroupContainer = mountButtonGroupContainer({ selectedIndex: 0 });

    buttonGroupContainer.setProps({ selectedIndex: 1 });

    const selectedIndex = buttonGroupContainer.state('selectedIndex');

    expect(selectedIndex).toEqual(1);

    expect(toJson(buttonGroupContainer)).toMatchSnapshot();
  });

  it('should change selected Button when clicked', () => {
    const buttonGroupContainer = mountButtonGroupContainer({ selectedIndex: 0 });

    buttonGroupContainer
      .find(Button)
      .at(1)
      .simulate('click');

    const selectedIndex = buttonGroupContainer.state('selectedIndex');

    expect(selectedIndex).toEqual(1);
    expect(toJson(buttonGroupContainer)).toMatchSnapshot();
  });

  it('should call onChange callback on button click', () => {
    const buttonGroupContainer = mountButtonGroupContainer();

    buttonGroupContainer
      .find(Button)
      .at(0)
      .simulate('click');

    expect(onGroupButtonClick).toBeCalled();
  });

  it('should pass button value to onChange callback', () => {
    const buttonGroupContainer = mountButtonGroupContainer();

    buttonGroupContainer
      .find(Button)
      .at(0)
      .simulate('click');

    expect(onGroupButtonClick).toBeCalledWith(buttonValue);
  });
});
