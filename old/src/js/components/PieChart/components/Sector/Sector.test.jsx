import React from 'react';
import { mount } from 'enzyme';

import Sector from './Sector';

describe('PieChart.Sector', () => {
  const toEqual = (value1, value2) => {
    expect(value1).toEqual(value2);
  };

  const percentage = 0.123;
  const percentageShift = 0;
  const centerShift = 123;
  const color = 'some.color.value';
  const label = 'some.label.value';
  const fontSize = 72;
  const labelOffset = 0;
  const maxSectorAngle = 0;
  const labelOffsetColor = '#000000';
  const onSectorEnter = () => true;
  const onSectorLeave = () => true;
  const hoveredSectorId = '';
  const sectorIdForHighlight = '';
  const draggingInProgress = true;
  const backgroundColor = '#fff';
  const maxNameLengths = {
    inner: 5,
    outer: 5
  };
  const bendConnector = {
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
  };

  let sector;

  const mountElement = () => {
    const element = mount(
      <Sector
        percentage={percentage}
        centerShift={centerShift}
        color={color}
        label={label}
        fontSize={fontSize}
        labelOffsetData={{
          labelOffset,
          maxSectorAngle,
          labelOffsetColor,
          bendConnector
        }}
        onSectorEnter={onSectorEnter}
        onSectorLeave={onSectorLeave}
        hoveredSectorIdForHighlight={hoveredSectorId}
        customSectorIdForHighlight={sectorIdForHighlight}
        draggingInProgress={draggingInProgress}
        backgroundColor={backgroundColor}
        maxNameLengths={maxNameLengths}
        offsets={{
          offsetX: 10,
          offsetY: 20
        }}
      />
    );

    return {
      path: element.find('Path'),
      label: element.find('Label')
    };
  };

  beforeEach(() => {
    sector = mountElement();
  });

  it('should render single "path" element', () => toEqual(sector.path.length, 1));
  it('should render single "label" element', () => toEqual(sector.label.length, 1));

  describe('path properties', () => {
    it('should have proper "percentage"', () => toEqual(sector.path.props().percentage, percentage));
    it('should have proper "percentageShift"', () => toEqual(sector.path.props().percentageShift, percentageShift));
    it('should have proper "centerShift"', () => toEqual(sector.path.props().centerShift, centerShift));
    it('should have proper "color"', () => toEqual(sector.path.props().color, color));
  });

  describe('label properties', () => {
    it('should have proper "percentage"', () => toEqual(sector.label.props().percentage, percentage));
    it('should have proper "fontSize"', () => toEqual(sector.label.props().fontSize, fontSize));
  });
});
