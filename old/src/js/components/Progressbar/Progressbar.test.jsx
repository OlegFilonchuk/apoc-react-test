import React from 'react';
import { mount } from 'enzyme';

import Progressbar from './Progressbar';

describe('<Progressbar />', () => {
  it('renders Progressbar component', () => {
    // arrange
    const percentage = 20;

    // act
    const component = mount(<Progressbar percentage={percentage} />);

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.sc-progress').length).toEqual(1);
  });

  it('renders Progressbar component with title inside', () => {
    // arrange
    const percentage = 20;
    const expectedText = `${percentage}%`;

    // act
    const component = mount(<Progressbar percentage={percentage} titleSettings={{ inside: true }} />);

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.sc-progress').length).toEqual(1);
    expect(component.find('.sc-progress-bar').text()).toEqual(expectedText);
  });

  it('renders Progressbar component with title outside', () => {
    // arrange
    const percentage = 20;
    const expectedText = `${percentage}%`;

    // act
    const component = mount(<Progressbar percentage={percentage} titleSettings={{ outside: true }} />);

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.sc-progress').length).toEqual(1);
    expect(component.find('.sa-progress-title-sync').length).toEqual(1);
    expect(component.find('.sa-progress-title-sync').text()).toEqual(expectedText);
  });

  it('should limit the width of Progressbar to 100 even when percentage value is higher', () => {
    // arrange
    const percentage = 250;
    const expectedWidth = '100%';

    spyOn(console, 'error');

    // act
    const component = mount(<Progressbar percentage={percentage} titleSettings={{ inside: true }} />);

    // assert
    expect(console.error).toBeCalled(); // eslint-disable-line no-console
    expect(component).toBeTruthy();
    expect(component.find('.sc-progress-bar').props().style.width).toEqual(expectedWidth);
  });
});
