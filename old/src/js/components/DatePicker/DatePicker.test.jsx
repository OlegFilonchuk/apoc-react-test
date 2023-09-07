import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment';
import DatePicker from './DatePicker';

describe('<DatePicker>', () => {
  const mountDatePicker = (props, mountFn = mount) => mountFn(<DatePicker {...props} />);

  it('should render DatePicker component', () => {
    const props = {
      value: moment.utc('2017-04-29')
    };
    const component = mountDatePicker(props);

    expect(toJson(component)).toMatchSnapshot();
  });
});
