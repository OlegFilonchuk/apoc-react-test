import React from 'react';
import { mount } from 'enzyme';

import ButtonGroup from './ButtonGroup';
import Button from '../Button/Button';

describe('<ButtonGroup />', () => {
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

  const mountButtonGroup = (buttons = defaultButtons) => mount(<ButtonGroup>{buttons}</ButtonGroup>);

  it('should render ButtonGroup component', () => {
    const buttonGroup = mountButtonGroup();

    expect(buttonGroup).toMatchSnapshot();
  });

  it('should render disabled button if disabled is passed', () => {
    const buttonGroup = mountButtonGroup();

    expect(buttonGroup).toMatchSnapshot();
  });
});
