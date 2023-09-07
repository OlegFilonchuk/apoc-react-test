import React from 'react';
import { mount } from 'enzyme';

import DraggablePoints from './DraggablePoints';
import Point from './Point';

describe('<DraggablePoints />', () => {
  const getRandomNumber = range => Math.floor(Math.random() * range * 100) / 100;

  const getPoints = () =>
    new Array(4).fill({}).map(() => ({
      x: getRandomNumber(100),
      y: getRandomNumber(100)
    }));

  const width = 100;
  const height = 100;

  describe('general functionality', () => {
    const onUpdateSpy = jest.fn();
    const mountedDraggablePoints = points =>
      mount(<DraggablePoints points={points} update={onUpdateSpy} width={width} height={height} />);

    it('should render DraggablePoints element', () => {
      const points = getPoints();
      const draggablePoints = mountedDraggablePoints(points);

      expect(draggablePoints).toBePresent();
    });

    it('should render 4 children', () => {
      const points = getPoints();
      const draggablePoints = mountedDraggablePoints(points);

      const expectedPointsCount = points.length;
      const resultPointsCount = draggablePoints.find(Point).length;

      expect(resultPointsCount).toEqual(expectedPointsCount);
    });
  });

  describe('mouse interaction', () => {
    const onUpdateSpy = jest.fn();
    const points = getPoints();

    const clickOnFirstPoint = draggablePoints =>
      draggablePoints
        .find(Point)
        .first()
        .find('.point__handler')
        .simulate('mousedown');

    const mountDraggablePoints = () =>
      mount(<DraggablePoints points={points} update={onUpdateSpy} width={width} height={height} />);

    beforeEach(() => onUpdateSpy.mockClear());

    it('should not fire update callback if no interaction happened', () => {
      mountDraggablePoints();

      expect(onUpdateSpy).not.toHaveBeenCalled();
    });

    it('should not fire update callback after mouseClick only', () => {
      const draggablePoints = mountDraggablePoints();

      clickOnFirstPoint(draggablePoints);

      expect(onUpdateSpy).not.toHaveBeenCalled();
    });

    it('should fire update callback after dragging one of the points', () => {
      const body = window.document.body;
      const mouseMove = new Event('mousemove');
      const draggablePoints = mountDraggablePoints();

      clickOnFirstPoint(draggablePoints);
      body.dispatchEvent(mouseMove);

      expect(onUpdateSpy).toHaveBeenCalled();
    });
  });
});
