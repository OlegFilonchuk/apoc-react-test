import React from 'react';
import { mount } from 'enzyme';

import CollapseHeader, { iconPositions } from './CollapseHeader';

const initialProps = {
  title: 'Foo Bar Panel',
  isCollapsed: true,
  isPanelButton: false,
  iconPosition: iconPositions.left,
  iconStyles: {
    expanded: 'foo-expanded-class-name',
    collapsed: 'bar-collapsed-class-name'
  },
  isClickDisabled: false,
  onClick: jest.fn(),
  'data-test-element': 'collapseHeaderDataTestElement'
};

const mountComponent = (props = {}, mountFn = mount) => mountFn(<CollapseHeader {...initialProps} {...props} />);

describe(`<${CollapseHeader.name}>`, () => {
  it('should render collapsed component with Foo title', () => {
    const component = mountComponent({
      title: 'Foo Panel Title',
      isCollapsed: true
    });

    expect(component).toMatchSnapshot();
  });

  it('should render expanded component with Bar title', () => {
    const component = mountComponent({
      title: 'Bar Panel Title',
      isCollapsed: false
    });

    expect(component).toMatchSnapshot();
  });

  it('should render icon on left', () => {
    const component = mountComponent({
      iconPosition: iconPositions.left
    });

    expect(component).toMatchSnapshot();
  });

  it('should render icon on right', () => {
    const component = mountComponent({
      iconPosition: iconPositions.right
    });

    expect(component).toMatchSnapshot();
  });

  it('should trigger click callback only when clicking on the icon', () => {
    // given
    const clickFn = jest.fn();
    const component = mountComponent({
      iconPosition: iconPositions.right,
      onClick: clickFn
    });

    const $icon = component.find('.sc-collapse-icon');
    const $title = component.find('.sc-panel-title');

    // when
    $icon.simulate('click');
    $title.simulate('click');

    // then
    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  it('should trigger click callback when clicking either on the icon or title', () => {
    // given
    const clickFn = jest.fn();
    const component = mountComponent({
      iconPosition: iconPositions.right,
      onClick: clickFn,
      isPanelButton: true
    });

    const $icon = component.find('.sc-collapse-icon');
    const $title = component.find('.sc-panel-title');

    // when
    $icon.simulate('click');
    $title.simulate('click');

    // then
    expect(clickFn).toHaveBeenCalledTimes(2);
  });

  it('should not trigger click callback when handler is disabled', () => {
    // given
    const clickFn = jest.fn();
    const component = mountComponent({
      iconPosition: iconPositions.right,
      onClick: clickFn,
      isPanelButton: true,
      isClickDisabled: true
    });

    const $icon = component.find('.sc-collapse-icon');
    const $title = component.find('.sc-panel-title');

    // when
    $icon.simulate('click');
    $title.simulate('click');

    // then
    expect(clickFn).not.toHaveBeenCalled();
  });
});
