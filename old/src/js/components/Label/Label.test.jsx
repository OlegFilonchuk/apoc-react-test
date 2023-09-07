import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Label from './Label';

const mountLabel = (props = {}, mountMethod = shallow) => mountMethod(<Label {...props}>Text</Label>);

describe('<Label>', () => {
  it('should render <Label>', () => {
    expect(toJson(mountLabel())).toMatchSnapshot();
  });

  it('should render required <Label>', () => {
    expect(toJson(mountLabel({ required: true }))).toMatchSnapshot();
  });

  it('should fire onClick event when clicking on label', () => {
    const onClick = jest.fn();
    const label = mountLabel({ onClick }, mount);

    label.find('label').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
