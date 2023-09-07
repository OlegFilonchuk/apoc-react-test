import React from 'react';
import { mount } from 'enzyme';

import Label from './Label';
import getElementCoordinates from './helpers/getElementCoordinates';

describe('PieChart.Sector.Label', () => {
  const toEqual = (value1, value2) => {
    expect(value1).toEqual(value2);
  };

  let text;

  const labelOffsetData = {
    labelOffset: {
      innerLabelOffset: 0,
      outerLabelOffset: 0
    },
    maxSectorAngle: 0,
    outerLabelColor: '#000000',
    bendConnector: {
      use: true,
      labelsHorizontalAligns: {
        rightSemicircle: {
          name: 22,
          percentages: 44,
          removeButton: 66
        },
        leftSemicircle: {
          name: 66,
          percentages: 44,
          removeButton: 22
        }
      },
      labelsVerticalAlignCorrection: 0
    }
  };

  const offsets = {
    offsetY: 0,
    offsetX: 15
  };

  describe('text child', () => {
    const fontSize = 123;
    const label = 'some.label';
    const FONT_COLOR = '#000000';
    const TEXT_ANCHOR = 'middle';

    const mountElement = () =>
      mount(
        <Label
          coords={{
            x: 10,
            y: 10
          }}
          fontSize={fontSize}
          label={label}
          labelOffsetData={labelOffsetData}
          offsets={offsets}
        />
      ).find('text');

    beforeEach(() => {
      text = mountElement();
    });

    it('should render single "text" element', () => toEqual(text.length, 1));
    it('should have proper "fontSize"', () => toEqual(text.props().fontSize, fontSize));
    it('should have proper "fill"', () => toEqual(text.props().fill, FONT_COLOR));
    it('should have proper "textAnchor"', () => toEqual(text.props().textAnchor, TEXT_ANCHOR));
  });

  describe('position', () => {
    const LABEL_SHIFT_KOEF = 0.5;
    const centerShift = 100;
    const labelShift = centerShift * LABEL_SHIFT_KOEF;
    const xVal = 50;
    const yVal = 50;
    const customizedFontSize = 20;
    const isLabelInsideSector = true;

    const mountElement = (percentage, percentageShift) =>
      mount(
        <Label
          percentageShift={percentageShift}
          centerShift={centerShift}
          coords={{ x: xVal, y: yVal }}
          percentage={percentage}
          fontSize={customizedFontSize}
          offsets={{
            offsetY: 10,
            offsetX: 10
          }}
          labelOffsetData={labelOffsetData}
          isLabelInsideSector={isLabelInsideSector}
        />
      ).find('text');

    const textCoordinatesShouldEqual = (expectedCoordinates, percentageShift, percentage) => {
      const { x, y } = getElementCoordinates(percentageShift, percentage, centerShift, labelOffsetData);

      toEqual(x, expectedCoordinates.x);
      toEqual(y, expectedCoordinates.y);
    };

    const expectCoordinatesFor = (expectedCoordinates, percentage, percentageShift) => {
      text = mountElement(percentage, percentageShift);

      textCoordinatesShouldEqual(expectedCoordinates, percentageShift, percentage);
    };

    it('should be at starting position for 0% chart pie', () => {
      const percentage = 0;
      const percentageShift = 0;
      const expectedCoordinates = {
        x: centerShift,
        y: labelShift
      };

      expectCoordinatesFor(expectedCoordinates, percentage, percentageShift);
    });

    it('should be 90 degrees right for 50% chart pie', () => {
      const percentage = 0.5;
      const percentageShift = 0;
      const expectedCoordinates = {
        x: centerShift + labelShift,
        y: centerShift
      };

      expectCoordinatesFor(expectedCoordinates, percentage, percentageShift);
    });

    it('should be 90 degrees left for 0% chart pie with 50% shift', () => {
      const percentage = 0.5;
      const percentageShift = 0.5;
      const expectedCoordinates = {
        x: centerShift - labelShift,
        y: centerShift
      };

      expectCoordinatesFor(expectedCoordinates, percentage, percentageShift);
    });

    it('snapshot test', () => {
      const percentage = 0.23;
      const percentageShift = 0.123;
      const expectedCoordinates = {
        x: 149.8579450130307,
        y: 96.23365972360337
      };

      expectCoordinatesFor(expectedCoordinates, percentage, percentageShift);
    });
  });
});
