import React from 'react';
import { mount } from 'enzyme';

import Timeline from './Timeline';

describe('<Timeline />', () => {
  /**
   * should render volume handler component
   * should divide duration on correct amount of time periods
   */
  it('should render timeline component', () => {
    // arrange
    const duration = 100;

    // act
    const component = mount(<Timeline duration={duration} />);

    // assert
    expect(component).toBeTruthy();
  });

  it('should divide duration into correct amount of time periods', () => {
    // arrange
    const duration = 1001;
    const periods = 12;
    const chartWidth = 300;

    // act
    const component = mount(<Timeline duration={duration} chartWidth={chartWidth} periods={periods} />);

    const receivedPeriods = component.find('.timeline__label').length - 1;

    // assert
    expect(receivedPeriods).toEqual(periods);
  });

  it('should show labels for point', () => {
    // arrange
    const duration = 1001;
    const chartWidth = 300;
    const points = {
      delay: 0,
      rampup: 60,
      rampdown: 400,
      downtime: 600
    };

    const expectedPointLabels = Object.keys(points).length;

    // act
    const component = mount(<Timeline duration={duration} chartWidth={chartWidth} points={points} />);

    const receivedPointLabels = component.find('.timeline__point').length;

    // assert
    expect(receivedPointLabels).toEqual(expectedPointLabels);
  });
});
