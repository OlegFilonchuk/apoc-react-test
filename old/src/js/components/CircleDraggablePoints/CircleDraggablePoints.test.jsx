import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { mount } from 'enzyme';

import CircleDraggablePoints from './CircleDraggablePoints';

const points = [
  {
    name: 'name1',
    percentage: 0
  },
  {
    name: 'name2',
    percentage: 0.5
  }
];

const center = {
  x: 50,
  y: 50
};
const radius = 50;
const width = 100;
const height = 100;

describe('<CircleDraggablePoints />', () => {
  const mountDraggablePoints = onUpdateSpy =>
    mount(
      <CircleDraggablePoints
        points={points}
        update={onUpdateSpy}
        center={center}
        radius={radius}
        width={width}
        height={height}
      />
    );

  it('should have proper structure', () => {
    const component = mountDraggablePoints(jest.fn());

    expect(component.html()).toMatchSnapshot();
  });

  describe('mouse movement', () => {
    const clickElement = element =>
      element.simulate('mousedown', {
        clientX: 0,
        clientY: 0
      });

    const moveMouse = (x, y) => {
      const body = window.document.body;
      const mouseMove = new CustomEvent('mousemove');

      mouseMove.clientX = x;
      mouseMove.clientY = y;

      body.dispatchEvent(mouseMove);
    };

    const updateSpy = jest.fn();

    const pointsComponents = mountDraggablePoints(updateSpy).find('.point__handler');

    const constructExpectedPoints = pointsPercentages => {
      const expectedPoints = cloneDeep(points);

      pointsPercentages.forEach((percentage, index) => {
        expectedPoints[index].percentage = percentage;
      });

      return expectedPoints;
    };

    const interactWithPoint = (point, mouseMoveX, mouseMoveY) => {
      clickElement(point);
      moveMouse(mouseMoveX, mouseMoveY);
    };

    afterEach(() => updateSpy.mockClear());

    it('should update first point percentage on mouse move', () => {
      const expectedPoints = constructExpectedPoints([0.148, 0.5]);

      const point = pointsComponents.first();

      interactWithPoint(point, 35, 24);

      expect(updateSpy).toHaveBeenCalledWith(expectedPoints);
    });

    it('should update second point percentage on mouse move', () => {
      const expectedPoints = constructExpectedPoints([0.148, 0.383]);

      const point = pointsComponents.last();

      interactWithPoint(point, 45, 14);

      expect(updateSpy).toHaveBeenCalledWith(expectedPoints);
    });
  });
});
