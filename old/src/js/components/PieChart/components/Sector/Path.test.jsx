import React from 'react';
import { mount } from 'enzyme';

import Path from './Path';

describe('PieChart.Sector.Path', () => {
  const centerShift = 100;

  const toEqual = (value1, value2) => {
    expect(value1).toEqual(value2);
  };

  const buildPathSettings = (C, X, Y, inverseDirection = 0) => {
    const moveTo = `M${C}, 0`;
    const arch = `A${C}, ${C} 0 ${inverseDirection}, 1 ${X}, ${Y}`;
    const lineTo = `L${C}, ${C}`;
    const closer = 'z';

    return `${moveTo} ${arch} ${lineTo} ${closer}`;
  };

  const buildRotation = (C, R) => `rotate(${R},${C},${C})`;

  it('should have proper fill color', () => {
    const color = 'some.color.value';

    const path = mount(<Path color={color} percentage={0.1} />).find('path');

    toEqual(path.props().fill, color);
  });

  describe('drawing path', () => {
    const testBuildedPath = (percentage, expectedX, expectedY) => {
      const expectedPathSettings = buildPathSettings(centerShift, expectedX, expectedY);

      const path = mount(<Path percentage={percentage} centerShift={centerShift} />).find('path');

      toEqual(path.props().d, expectedPathSettings);
    };

    const testRotation = (percentageShift, expectedR) => {
      const expectedRotation = buildRotation(centerShift, expectedR);

      const path = mount(<Path percentageShift={percentageShift} centerShift={centerShift} percentage={0.1} />).find(
        'g'
      );

      toEqual(path.props().transform, expectedRotation);
    };

    describe('path settings', () => {
      it('should build sector with 0 cover', () => {
        const percentage = 0;

        const expectedX = centerShift;
        const expectedY = 0;

        testBuildedPath(percentage, expectedX, expectedY);
      });

      it('should build sector with half chart cover', () => {
        const percentage = 0.5;

        const expectedX = 100.00000000000001;
        const expectedY = 200;

        testBuildedPath(percentage, expectedX, expectedY);
      });

      it('should build sector with quarter chart cover', () => {
        const percentage = 0.25;

        const expectedX = centerShift * 2;
        const expectedY = centerShift;

        testBuildedPath(percentage, expectedX, expectedY);
      });

      it('shapshot test', () => {
        const percentage = 0.123;

        const expectedX = 169.81654189934727;
        const expectedY = 28.406351697816874;

        testBuildedPath(percentage, expectedX, expectedY);
      });
    });

    describe('rotation', () => {
      it('should build sector with 0 rotation', () => {
        const percentageShift = 0;
        const expectedRotation = 0;

        testRotation(percentageShift, expectedRotation);
      });

      it('should build sector with quarter rotation', () => {
        const percentageShift = 0.25;
        const expectedRotation = 90;

        testRotation(percentageShift, expectedRotation);
      });

      it('should build sector with half rotation', () => {
        const percentageShift = 0.5;
        const expectedRotation = 180;

        testRotation(percentageShift, expectedRotation);
      });

      it('should build sector with half and quarter rotation', () => {
        const percentageShift = 0.75;
        const expectedRotation = 270;

        testRotation(percentageShift, expectedRotation);
      });

      it('snapshot test', () => {
        const percentageShift = 0.123;
        const expectedRotation = 44.28;

        testRotation(percentageShift, expectedRotation);
      });
    });
  });

  describe('should have two sectors', () => {
    const pathToProps = path => path.props();
    const getPathsProps = (percentage, percentageShift) =>
      mount(<Path percentage={percentage} percentageShift={percentageShift} centerShift={centerShift} />)
        .find('path')
        .map(pathToProps);
    const getGsProps = (percentage, percentageShift) =>
      mount(<Path percentage={percentage} percentageShift={percentageShift} centerShift={centerShift} />)
        .find('g')
        .map(pathToProps);

    const testRotationAndPathsValue = (percentage, percentageShift, expectedCoordinates, expectedRotations) => {
      const pathsProps = getPathsProps(percentage, percentageShift);
      const gsProps = getGsProps(percentage, percentageShift);

      pathsProps.forEach((pathProps, index) => {
        const rotation = gsProps[index].transform;
        const pathSettings = pathProps.d;

        const expectedPathSettings = buildPathSettings(
          centerShift,
          expectedCoordinates[index].X,
          expectedCoordinates[index].Y,
          expectedCoordinates[index].inverseDirection
        );
        const expectedRotation = buildRotation(centerShift, expectedRotations[index]);

        toEqual(pathSettings, expectedPathSettings);
        toEqual(rotation, expectedRotation);
      });
    };

    it('each covering a half of pie chart', () => {
      const percentage = 1;
      const percentageShift = 0;
      const expectedCoordinates = [
        {
          X: 99.99993716814693,
          Y: 1.9738877199415583e-11,
          inverseDirection: 1
        },
        {
          X: 99.99993716814693,
          Y: 1.9738877199415583e-11,
          inverseDirection: 1
        }
      ];

      const expectedRotations = [0, 180];

      testRotationAndPathsValue(percentage, percentageShift, expectedCoordinates, expectedRotations);
    });

    it('second covering a chart quarter', () => {
      const percentage = 0.75;
      const percentageShift = 0;
      const expectedCoordinates = [
        {
          X: 0,
          Y: 100.00000000000001,
          inverseDirection: 1
        },
        {
          X: centerShift,
          Y: centerShift * 2
        }
      ];

      const expectedRotations = [0, 180];

      testRotationAndPathsValue(percentage, percentageShift, expectedCoordinates, expectedRotations);
    });

    it('snapshot test', () => {
      const percentage = 0.563;
      const percentageShift = 0;
      const expectedCoordinates = [
        {
          X: 61.44160077226037,
          Y: 192.2672739870115,
          inverseDirection: 1
        },
        {
          X: 138.5583992277396,
          Y: 7.732726012988425
        }
      ];

      const expectedRotations = [0, 180];

      testRotationAndPathsValue(percentage, percentageShift, expectedCoordinates, expectedRotations);
    });
  });
});
