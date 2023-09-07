import React from 'react';
import { shallow, mount } from 'enzyme';

import Point from './Point';

describe('<Point />', () => {
  const pointClass = 'point';
  let pointCords;

  beforeEach(() => {
    pointCords = {
      x: 10,
      y: 10
    };
  });

  it('should render Point element', () => {
    const point = shallow(<Point point={pointCords} />);

    const $point = point.find(`.${pointClass}`);

    expect(point).toBePresent();
    expect($point).toBePresent();
    expect($point).toHaveStyle('left', 10);
    expect($point).toHaveStyle('bottom', 10);
    expect(point.find(`.${pointClass}__handler`)).toBePresent();
  });

  it('should have additional class if isSelected prop is passed', () => {
    const point = mount(<Point point={pointCords} isSelected />);

    const pointContainer = point.find(`.${pointClass}`);

    expect(pointContainer).toHaveClassName(`.${pointClass}--onTop`);
  });

  it('should fire callback on mouseDown event', () => {
    const onMouseDownSpy = jest.fn();
    const point = shallow(<Point point={pointCords} onMouseDown={onMouseDownSpy} />);

    expect(onMouseDownSpy).not.toHaveBeenCalled();

    point.find(`.${pointClass}__handler`).simulate('mousedown');

    expect(onMouseDownSpy).toHaveBeenCalled();
  });
});
