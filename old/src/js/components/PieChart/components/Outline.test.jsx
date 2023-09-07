import React from 'react';
import { mount } from 'enzyme';

import Outline from './Outline';

describe('PieChart.Outline', () => {
  const toEqual = (value1, value2) => {
    expect(value1).toEqual(value2);
  };

  const OUTLINE_COLOR = 'lightGrey';
  const OUTLINE_STROKE_WIDTH = 1;
  const OUTLINE_FILL_NONE = 'none';

  const size = 123;

  let circle;

  const mountElement = () => mount(<Outline size={size} />).find('circle');

  beforeEach(() => {
    circle = mountElement();
  });

  describe('general properties', () => {
    it('should render single "circle" element', () => toEqual(circle.length, 1));
    it('should have proper "stroke"', () => toEqual(circle.props().stroke, OUTLINE_COLOR));
    it('should have proper "strokeWidth"', () => toEqual(circle.props().strokeWidth, OUTLINE_STROKE_WIDTH));
    it('should have proper "strokeFill"', () => toEqual(circle.props().fill, OUTLINE_FILL_NONE));
  });

  describe('position', () => {
    const localSize = size - OUTLINE_STROKE_WIDTH;

    it('should center circle element', () => {
      const centerShift = localSize / 2 + OUTLINE_STROKE_WIDTH / 2;

      const expectedX = centerShift;
      const expectedY = centerShift;

      toEqual(circle.props().cx, expectedX);
      toEqual(circle.props().cy, expectedY);
    });

    it('should draw a circle of half local size radius plus 2', () => {
      const expectedRadius = localSize / 2 + 2;

      toEqual(circle.props().r, expectedRadius);
    });
  });
});
