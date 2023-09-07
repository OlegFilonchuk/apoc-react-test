import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ListItem from './ListItem';

const mountListItem = (children, props = {}, mountMethod = shallow) =>
  mountMethod(<ListItem {...props}>{children}</ListItem>);

describe('<ListItem>', () => {
  it('should render <ListItem>', () => {
    expect(toJson(mountListItem())).toMatchSnapshot();
  });

  it('should fire onClick event when clicking on label', () => {
    const onRemove = jest.fn();
    const listItem = mountListItem('test', { isRemovable: true, onRemove }, mount);

    listItem.find('.remove-button').simulate('click');

    expect(onRemove).toHaveBeenCalled();
  });
});
