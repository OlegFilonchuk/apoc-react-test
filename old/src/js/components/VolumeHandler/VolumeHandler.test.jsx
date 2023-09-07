import React from 'react';
import { mount } from 'enzyme';

import VolumeHandler from './VolumeHandler';

describe('<VolumeHandler />', () => {
  it('should render volume handler component', () => {
    // arrange
    const volume = 100;
    const max = 200;
    const onChange = jest.fn();

    // act
    const component = mount(<VolumeHandler onChange={onChange} value={volume} max={max} />);

    // assert
    expect(component).toBeTruthy();
  });

  it('should attach on move event to document body', () => {
    // arrange
    const volume = 100;
    const max = 200;
    const onChange = jest.fn();

    spyOn(window.document, 'addEventListener');

    mount(<VolumeHandler onChange={onChange} value={volume} max={max} />);

    // assert
    expect(window.document.addEventListener).toHaveBeenCalledTimes(2);
  });
});
