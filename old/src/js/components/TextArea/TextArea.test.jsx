import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TextArea from './TextArea';

describe('<TextArea>', () => {
  const mountTextArea = (props, mountFn = mount) => mountFn(<TextArea {...props} />);

  it('should render TextArea component', () => {
    const props = { defaultValue: 'test' };

    const component = mountTextArea(props, shallow);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should add placeholder to TextArea', () => {
    const props = { defaultValue: 'test', placeholder: 'placeholder' };

    const component = mountTextArea(props, shallow);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should run onBlur callback when TextArea is changed', () => {
    const onBlur = jest.fn();

    const props = {
      onBlur,
      defaultValue: 'test'
    };

    const expectedValue = 'test2';

    const component = mountTextArea(props);

    component.find('textarea').simulate('blur', {
      target: {
        value: expectedValue
      }
    });

    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          value: expectedValue
        }
      })
    );
  });

  it('should run onChange callback when TextArea is changed', () => {
    const onChange = jest.fn();

    const props = {
      onChange,
      defaultValue: 'test'
    };
    const expectedValue = 'test2';

    const component = mountTextArea(props);

    component.find('textarea').simulate('change', {
      target: {
        value: expectedValue
      }
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          value: expectedValue
        }
      })
    );
  });

  it('should update content when receive props', () => {
    const onBlur = jest.fn();

    const props = {
      onBlur,
      defaultValue: 'test'
    };

    const expectedValue = 'test2';
    const component = mountTextArea(props);

    expect(component.find('textarea').text()).toEqual('test');

    component.setProps({ defaultValue: expectedValue });

    expect(component.find('textarea').text()).toEqual(expectedValue);
  });
});
