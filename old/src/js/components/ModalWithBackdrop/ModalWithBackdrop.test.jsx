import React from 'react';
import { shallow, mount } from 'enzyme';

import ModalWithBackdrop from './ModalWithBackdrop';

describe('<ModalWithBackdrop />', () => {
  describe('ModalWithBackdrop render', () => {
    it('should render ModalWithBackdrop', () => {
      const modal = (
        <ModalWithBackdrop header="" footer={<span>test</span>}>
          Hello World from fist modal!
        </ModalWithBackdrop>
      );

      const modalDialog = shallow(modal);

      expect(modalDialog).toMatchSnapshot();
    });

    it('should call onOutsideModalClick() callback when user clicked outside modal dialog', () => {
      // arrange
      const onOutsideModalClick = jest.fn();

      // act
      const component = mount(<ModalWithBackdrop isOpen onOutsideModalClick={onOutsideModalClick} />);

      component.find('.backdrop').simulate('click');
      expect(onOutsideModalClick).toBeCalled();
    });
  });
});
