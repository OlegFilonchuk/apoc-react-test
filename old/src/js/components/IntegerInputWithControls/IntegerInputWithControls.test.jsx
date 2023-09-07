import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import IntegerInputWithControls from './IntegerInputWithControls';

describe('<IntegerInputWithControls />', () => {
  const renderInput = (props = {}, mountFn = shallow) => mountFn(<IntegerInputWithControls {...props} />);

  describe('in snapshot tests', () => {
    it('should render correctly without props', () => {
      const input = renderInput();

      expect(toJson(input)).toMatchSnapshot();
    });

    it('should render Input with custom className', () => {
      const input = renderInput({ wrapperClassName: 'some-class-name' });

      expect(toJson(input)).toMatchSnapshot();
    });

    it('should render Input with custom value', () => {
      const input = renderInput({ value: '1' });

      expect(toJson(input)).toMatchSnapshot();
    });

    it('should render label with value passed as child node', () => {
      const input = shallow(<IntegerInputWithControls>Very fancy label</IntegerInputWithControls>);

      expect(toJson(input)).toMatchSnapshot();
    });
  });

  describe('in logic tests', () => {
    it('should render with disabled minus button but enabled plus button by default', () => {
      const input = renderInput();

      expect(input.state().isZero).toBeTruthy();
    });

    it('should correctly handle normal addition and subtraction via buttons', () => {
      const input = renderInput({ value: '1' }, mount);

      expect(input.state().isZero).toBeFalsy();
      input
        .find('button')
        .last()
        .simulate('click');
      expect(input.state().isZero).toBeTruthy();
      input
        .find('button')
        .first()
        .simulate('click');
      expect(input.state().isZero).toBeFalsy();
    });

    it('should correctly handle manual input of different values', () => {
      const input = renderInput({}, mount);

      expect(input.state().isZero).toBeTruthy();

      input.find('input').simulate('change', { target: { value: '123' } });
      expect(input.state().isZero).toBeFalsy();

      input.find('input').simulate('change', { target: { value: '' } });
      expect(input.state().isZero).toBeTruthy();

      input.find('input').simulate('change', { target: { value: 'adsf' } });
      expect(input.state().isZero).toBeTruthy();
    });
  });
});
