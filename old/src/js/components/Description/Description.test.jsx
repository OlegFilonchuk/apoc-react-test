import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Description from './Description';

describe('<Description>', () => {
  const mountDescription = (props, mountFn = mount) => mountFn(<Description {...props} />);

  it('should render Description component', () => {
    const props = {
      value: 'test'
    };

    const component = mountDescription(props, shallow);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should add placeholder to description', () => {
    const props = { value: 'test', placeholder: 'placeholder' };

    const component = mountDescription(props, shallow);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should run onBlur callback when Description is changed', () => {
    const onBlur = jest.fn();

    const props = {
      onBlur,
      value: 'test'
    };

    const expectedValue = 'test2';

    const component = mountDescription(props);

    component.find('textarea').simulate('blur', {
      target: {
        value: expectedValue
      }
    });

    expect(onBlur.mock.calls[0][0].target.value).toBe(expectedValue);
  });

  it('should run onChange callback when Description is changed', () => {
    const onChange = jest.fn();

    const props = {
      onChange,
      value: 'test'
    };
    const expectedValue = 'test2';

    const component = mountDescription(props);

    component.find('textarea').simulate('change', {
      target: {
        value: expectedValue
      }
    });

    expect(onChange.mock.calls[0][0].target.value).toBe(expectedValue);
  });
});
