import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TestQueueDropdownOptionLabel from './TestQueueDropdownOptionLabel';

describe('<TestQueueDropdownOption>', () => {
  it('renders normal', () => {
    const wrapper = shallow(<TestQueueDropdownOptionLabel color={'blue'} text={'some text'} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
