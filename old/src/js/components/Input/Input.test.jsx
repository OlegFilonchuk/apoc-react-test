import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Input from './Input';

describe('<Input />', () => {
  const renderInput = (props = {}, mountFn = shallow) => mountFn(<Input {...props} />);

  describe('snapshot tests', () => {
    it('should render default Input', () => {
      const input = renderInput();

      expect(toJson(input)).toMatchSnapshot();
    });

    it('should render Input with custom className', () => {
      const input = renderInput({ className: 'Some class name' });

      expect(toJson(input)).toMatchSnapshot();
    });

    it('should render Input with error', () => {
      const input = renderInput({ hasError: true });

      expect(toJson(input)).toMatchSnapshot();
    });
  });
});
