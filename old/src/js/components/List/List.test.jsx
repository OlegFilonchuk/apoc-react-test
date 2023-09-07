import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import List from './List';

const defaultChildren = [<li key="1">test</li>, <li key="2">test</li>, <li key="3">test</li>];

const mountList = (children = defaultChildren, props = {}, mountMethod = shallow) =>
  mountMethod(<List {...props}>{children}</List>);

describe('<List />', () => {
  it('should render <List />', () => {
    expect(toJson(mountList())).toMatchSnapshot();
  });
});
