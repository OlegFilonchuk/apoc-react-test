import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Fieldset from './Fieldset';
import Label from '../Label/Label';
import Input from '../Input/Input';
import ToggleButton from '../ToggleButton/ToggleButton';

describe('<Fieldset />', () => {
  const mountFieldset = (props = {}) =>
    shallow(
      <Fieldset {...props}>
        <Label>Some Label</Label>
        <Input />
      </Fieldset>
    );

  it('should render default Fieldset', () => {
    const fieldsetComponent = mountFieldset();

    expect(toJson(fieldsetComponent)).toMatchSnapshot();
  });

  it('should overwrite default classes for wrapper', () => {
    const customWrapperClasses = {
      labelWrapperClassName: 'sc-col-sm-2',
      inputWrapperClassName: 'sc-col-sm-5'
    };
    const fieldsetComponent = mountFieldset(customWrapperClasses);

    expect(toJson(fieldsetComponent)).toMatchSnapshot();
  });

  it('should render Fieldset with no label', () => {
    const fieldsetComponent = mountFieldset({ hideLabel: true });

    expect(toJson(fieldsetComponent)).toMatchSnapshot();
  });

  it('should render nested Fieldsets with ToggleButton', () => {
    const fieldsetComponent = shallow(
      <Fieldset>
        <Label>Toggle</Label>
        <ToggleButton toggleId="uniqueId" />
        <Fieldset>
          <Label>Proxy</Label>
          <Input />
        </Fieldset>
        <Fieldset>
          <Label>Proxy</Label>
          <Input />
        </Fieldset>
      </Fieldset>
    );

    expect(toJson(fieldsetComponent)).toMatchSnapshot();
  });
});
