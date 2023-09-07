import React from 'react';
import { mount } from 'enzyme';

import VolumeLabel from './VolumeLabel';

describe('<VolumeLabel />', () => {
  it('should render volume label component', () => {
    // arrange
    const volume = 100;

    // act
    const component = mount(<VolumeLabel max={1000} value={volume} />);

    // assert
    expect(component).toBeTruthy();
  });

  it('should render input on volume label double click', () => {
    // arrange
    const volume = 100;
    const expectedInput = '<input type="text" value="100.00" data-unit="bps" class="slider-label__number">';
    const component = mount(<VolumeLabel max={1000} value={volume} />);
    const span = component.find('.slider-label__number');

    // act
    span.simulate('click');
    const actualInput = component.find('.slider-label__number').html();

    // assert
    expect(actualInput).toEqual(expectedInput);
  });

  it('should fire onValueChanged on input blur', () => {
    // arrange
    const volume = 100;
    const onChange = jest.fn();
    const component = mount(<VolumeLabel max={1000} value={volume} onValueChanged={onChange} />);

    component.setState({ edit: true });

    // act
    component.find('.slider-label__number').simulate('blur', {
      target: {
        value: 10,
        dataset: { unit: 'kbps' }
      }
    });

    // assert
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
