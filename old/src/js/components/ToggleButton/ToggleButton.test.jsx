import React from 'react';
import { mount } from 'enzyme';

import ToggleButton from './ToggleButton';

describe('<ToggleButton />', () => {
  it('should have class "is-on" by default', () => {
    const toggle = mount(<ToggleButton />);

    expect(toggle.props().isOn).toBeTruthy();
    expect(toggle.find('.toggle-button')).toHaveClassName('is-on');
  });

  it('should have class "is-off" when passing false to isOn prop', () => {
    const toggle = mount(<ToggleButton isOn={false} />);

    expect(toggle.props().isOn).toBeFalsy();
    expect(toggle.find('.toggle-button')).toHaveClassName('is-off');
  });

  it('should be enabled by default', () => {
    const toggle = mount(<ToggleButton />);

    expect(toggle.props().isDisabled).toBeFalsy();
    expect(toggle.find('.toggle-button')).not.toHaveClassName('is-disabled');
  });

  it('should have disabled class when isDisabled', () => {
    const toggle = mount(<ToggleButton isDisabled />);

    expect(toggle.props().isDisabled).toBeTruthy();
    expect(toggle.find('.toggle-button')).toHaveClassName('is-disabled');
  });

  it('should not change state when is disabled', () => {
    const toggle = mount(<ToggleButton isDisabled />);

    expect(toggle.props().isDisabled).toBeTruthy();
    expect(toggle.props().isOn).toBeTruthy();

    toggle.find('button').simulate('click');

    expect(toggle.props().isDisabled).toBeTruthy();
    expect(toggle.props().isOn).toBeTruthy();
  });

  it('should call onSwitch() callback on state change', () => {
    const onSwitch = jest.fn();

    const toggle = mount(<ToggleButton isDisabled={false} onSwitch={onSwitch} />);

    toggle.find('.big-toggle__inner-circle').simulate('click');

    expect(onSwitch).toHaveBeenCalledTimes(1);
  });

  it('should not call onSwitch() callback on state change when toggle is disabled', () => {
    const onSwitch = jest.fn();

    const toggle = mount(<ToggleButton onSwitch={onSwitch} isDisabled />);

    toggle.find('.big-toggle__inner-circle').simulate('click');

    expect(onSwitch).toHaveBeenCalledTimes(0);
  });
});
