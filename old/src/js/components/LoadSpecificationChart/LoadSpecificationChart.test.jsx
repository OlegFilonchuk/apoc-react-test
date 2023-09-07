import React from 'react';
import { shallow } from 'enzyme';

import LoadSpecificationChart from './LoadSpecificationChart';

describe('<LoadSpecificationChart />', () => {
  let points;

  beforeEach(() => {
    points = [
      {
        x: 100,
        y: 0
      },
      {
        x: 120,
        y: 100
      },
      {
        x: 150,
        y: 100
      },
      {
        x: 180,
        y: 0
      }
    ];
  });

  it('should render chart element without projections', () => {
    const chart = shallow(<LoadSpecificationChart points={points} width={200} height={100} />);
    const svg = chart.find('svg');
    const fillPath = svg.find('.fillPath');
    const strokePath = svg.find('.strokePath');
    const projections = svg.find('.projection');

    expect(chart).toBePresent();
    expect(svg).toBePresent();
    expect(fillPath).toBePresent();
    expect(strokePath).toBePresent();
    expect(projections.length).toEqual(0);
  });

  it('should render chart element with projections', () => {
    const chart = shallow(<LoadSpecificationChart points={points} width={200} height={100} drawProjections />);
    const projections = chart.find('.projection');

    expect(projections.length).toEqual(2);
  });
});
