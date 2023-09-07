import React from 'react';
import { mount } from 'enzyme';

import PieChart from './PieChart';

const DEFAULT_HANDLE_SIZE = 8;

describe('PieChart', () => {
  const toEqual = (value1, value2) => {
    expect(value1).toEqual(value2);
  };

  let pieChart;

  describe('"nothingSelectedLabel"', () => {
    describe('"nothingSelectedLabel" presence', () => {
      const size = 123;

      const mountElement = data => {
        const element = mount(<PieChart data={data} size={size} />);

        return {
          sectors: element.find('Sector'),
          nothingSelectedLabel: element.find('NothingSelectedLabel')
        };
      };

      const testSectorsAndNothingSelectedLabelPresence = (data, isSectorPresent, isNothingSelectedLabelPresent) => {
        const expectedSectorsCount = isSectorPresent ? 1 : 0;
        const expectedNothingSelectedLabelLength = isNothingSelectedLabelPresent ? 1 : 0;

        pieChart = mountElement(data, size);

        toEqual(pieChart.sectors.length, expectedSectorsCount);
        toEqual(pieChart.nothingSelectedLabel.length, expectedNothingSelectedLabelLength);
      };

      it('should display "nothingSelectedLabel" and no "sectors" for empty data', () => {
        const expectedSectorPresence = false;
        const expectedNothingSelectedLabelPresence = true;
        const data = [];

        testSectorsAndNothingSelectedLabelPresence(data, expectedSectorPresence, expectedNothingSelectedLabelPresence);
      });

      it('should display single "sector" and not "nothingSelectedLabel"', () => {
        const expectedSectorPresence = true;
        const expectedNothingSelectedLabelPresence = false;
        const sector = {
          percentage: 123,
          color: 'some.color.value',
          id: 'somekey',
          label: ''
        };
        const data = [sector];

        testSectorsAndNothingSelectedLabelPresence(data, expectedSectorPresence, expectedNothingSelectedLabelPresence);
      });
    });

    describe('"nothingSelectedLabel" properties', () => {
      const size = 123;
      const data = [];

      const nothingSelectedText = 'some.label.text';
      const nothingSelectedTextFontColor = 'some.label.color';
      const nothingSelectedTextFontSize = 123;

      let label;

      const mountElement = () =>
        mount(
          <PieChart
            data={data}
            size={size}
            nothingSelectedText={nothingSelectedText}
            nothingSelectedTextFontColor={nothingSelectedTextFontColor}
            nothingSelectedTextFontSize={nothingSelectedTextFontSize}
          />
        ).find('NothingSelectedLabel');

      beforeEach(() => {
        label = mountElement();
      });

      it('should have proper "size"', () => toEqual(label.props().size + DEFAULT_HANDLE_SIZE * 2, size));

      it('should have proper "nothingSelectedText"', () => toEqual(label.props().text, nothingSelectedText));

      it('should have proper "nothingSelectedTextFontColor"', () =>
        toEqual(label.props().fontColor, nothingSelectedTextFontColor));

      it('should have proper "nothingSelectedTextFontSize"', () =>
        toEqual(label.props().fontSize, nothingSelectedTextFontSize));
    });
  });

  describe('"sector"', () => {
    const size = 123;

    const color = 'some.color.value';
    const label = 'some.text.label';
    const fontSize = 123;

    const getData = count => {
      const percentage = +(1 / count).toFixed(1);

      return Array(count)
        .fill({})
        .map(() => {
          const sectorInfo = {
            percentage,
            label,
            color,
            id: `key${Math.random()}`
          };

          return sectorInfo;
        });
    };

    const mountElement = data => mount(<PieChart data={data} size={size} fontSize={fontSize} />).find('Sector');

    it('should display same amount of sectors as described in data', () => {
      const expectedSectorsCount = 10;
      const data = getData(expectedSectorsCount);

      const sectors = mountElement(data);

      toEqual(sectors.length, expectedSectorsCount);
    });

    it('should build sectors with proper data passed', () => {
      const expectedSectorsCount = 10;
      const expectedPercentage = 1 / expectedSectorsCount;
      const expectedCenterShift = size / 2 - DEFAULT_HANDLE_SIZE;

      const data = getData(expectedSectorsCount);

      const sectors = mountElement(data);

      sectors.forEach(sector => {
        const props = sector.props();

        expect(props.percentage).toEqual(expectedPercentage);
        expect(props.percentageShift).toEqual(jasmine.any(Number));
        expect(props.centerShift).toEqual(expectedCenterShift);
        expect(props.color).toEqual(color);
        expect(props.label).toEqual(label);
        expect(props.fontSize).toEqual(fontSize);
      });
    });
  });

  describe('"percentageShift"', () => {
    const getRotationFromString = rotationString => +rotationString.slice(7).split(',')[0];

    const size = 123;
    const data = [
      {
        color: 'red',
        percentage: 0.75,
        id: 'red',
        label: ''
      }
    ];

    const mountPieChart = (props = {}) => mount(<PieChart data={data} size={size} {...props} />);

    const getRotation = percentageShift => {
      pieChart = mountPieChart(percentageShift);
      const rotationString = pieChart
        .find('path')
        .parent()
        .find('g')
        .prop('transform');
      const rotationValue = getRotationFromString(rotationString);

      return rotationValue;
    };

    it('should render unshifted pieChart by default', () => {
      const rotation = getRotation();

      toEqual(rotation, 0);
    });

    it('should render shifted pieChart', () => {
      const percentageShift = 0.25;
      const rotation = getRotation({ percentageShift });

      toEqual(rotation, 90);
    });
  });
});
