import React from 'react';
import { mount } from 'enzyme';

import CollapseGroup from './CollapseGroup';
import Collapse from './Collapse';

describe('<CollapseGroup />', () => {
  const collapseIconClass = '.sc-collapse-icon';

  const dummyContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

  it('should render CollapseGroup component', () => {
    // arrange
    const firstCollapse = <Collapse title="Title1">{dummyContent}</Collapse>;
    const secondCollapse = <Collapse title="Title2">{dummyContent}</Collapse>;

    // act
    const component = mount(
      <CollapseGroup>
        {firstCollapse}
        {secondCollapse}
      </CollapseGroup>
    );

    // assert
    expect(component).toMatchSnapshot();
  });

  it('should call onToggled when toggling panel', () => {
    // given
    const onToggled = jest.fn();

    const component = mount(
      <CollapseGroup onToggled={onToggled}>
        <Collapse title="Title1">{dummyContent}</Collapse>
        <Collapse title="Title2">{dummyContent}</Collapse>
      </CollapseGroup>
    );

    // when
    component
      .find(Collapse)
      .at(1)
      .find(collapseIconClass)
      .simulate('click');

    // assert
    expect(onToggled).toHaveBeenCalled();
  });

  it('should expand only one Collapse in CollapseGroup component', () => {
    // arrange, act
    const component = mount(
      <CollapseGroup>
        <Collapse title="Title1">{dummyContent}</Collapse>
        <Collapse isCollapsed={false} title="Title2">
          {dummyContent}
        </Collapse>
      </CollapseGroup>
    );

    // assert
    expect(component).toMatchSnapshot();

    const firstCollapse = component.find(Collapse).at(0);
    const secondCollapse = component.find(Collapse).at(1);

    firstCollapse.find(collapseIconClass).simulate('click');
    expect(component).toMatchSnapshot();

    // click on second collapse
    secondCollapse.find(collapseIconClass).simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should allow to open multiple Collapse components', () => {
    // arrange
    const component = mount(
      <CollapseGroup allowMultipleOpened>
        <Collapse isCollapsed={false} title="Title1">
          {dummyContent}
        </Collapse>
        <Collapse title="Title2">{dummyContent}</Collapse>
        <Collapse isCollapsed={false} title="Title3">
          {dummyContent}
        </Collapse>
      </CollapseGroup>
    );

    // assert
    expect(component).toMatchSnapshot();

    const secondCollapse = component.find(Collapse).at(1);

    secondCollapse.find(collapseIconClass).simulate('click');
    expect(component).toMatchSnapshot();
  });
});
