import React from 'react';
import { mount } from 'enzyme';

import NothingSelectedLabel from './NothingSelectedLabel';

describe('PieChart.NothingSelectedLabel', () => {
  const toEqual = (value1, value2) => {
    expect(value1).toEqual(value2);
  };

  const size = 123;
  const fontSize = 123;
  const text = 'some.text';
  const fontColor = 'white';
  const TEXT_ANCHOR = 'middle';

  let textElement;

  const mountElement = () =>
    mount(<NothingSelectedLabel size={size} text={text} fontColor={fontColor} fontSize={fontSize} />).find('text');

  beforeEach(() => {
    textElement = mountElement();
  });

  it('should render single "text" element', () => toEqual(textElement.length, 1));
  it('should have proper "text"', () => toEqual(textElement.text(), text));
  it('should have proper "fontSize"', () => toEqual(textElement.props().fontSize, fontSize));
  it('should have proper "fill"', () => toEqual(textElement.props().fill, fontColor));
  it('should have proper "textAnchor"', () => toEqual(textElement.props().textAnchor, TEXT_ANCHOR));

  it('should be placed in the center of parent', () => {
    const expectedX = size / 2;
    const expectedY = size / 2;

    toEqual(textElement.props().x, expectedX);
    toEqual(textElement.props().y, expectedY);
  });
});
