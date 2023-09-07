import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import withBackdrop from './withBackdrop';

jest.useFakeTimers();

describe('withBackdrop HoC', () => {
  describe('general functionality', () => {
    const div = () => <div />;

    div.propTypes = {};

    it('should not render a component if no observed property provided', () => {
      const DivWithBackdrop = withBackdrop(div);
      const component = mount(<DivWithBackdrop />);

      expect(component.html()).toEqual(null);
    });

    it('should render <div /> with backdrop', () => {
      const DivWithBackdrop = withBackdrop(div, 'isOpen');
      const component = mount(<DivWithBackdrop isOpen />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('onClose functionality', () => {
    const div = props => {
      setTimeout(() => props.onClose(), 0);

      return <div />;
    };

    div.propTypes = {
      onClose: PropTypes.func.isRequired
    };

    const onClose = jest.fn();

    const DivWithBackdrop = withBackdrop(div, 'isOpen');
    const component = mount(<DivWithBackdrop isOpen onClose={onClose} />);

    it('should not call onClose callback', () => {
      expect(onClose).not.toHaveBeenCalled();
    });

    describe('on close', () => {
      beforeAll(() => jest.runAllTimers());

      it('should hide element', () => {
        expect(component.html()).toEqual(null);
      });

      it('should call onClose callback', () => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });
});
