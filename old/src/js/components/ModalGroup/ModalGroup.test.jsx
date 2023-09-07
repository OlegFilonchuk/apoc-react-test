import React from 'react';
import { shallow } from 'enzyme';

import ModalGroup from './ModalGroup';
import Modal from '../Modal/Modal';

describe('<ModalGroup />', () => {
  const mountModalGroup = (modals, modalsOpen = [], mountFn = shallow) =>
    mountFn(<ModalGroup openedModalNames={modalsOpen}>{modals}</ModalGroup>);

  describe('Modal group render', () => {
    it('should render ModalGroup with one modal', () => {
      const modal = (
        <Modal name="first_modal" header="" footer={<span>test</span>}>
          Hello World from fist modal!
        </Modal>
      );

      const modalGroup = mountModalGroup(modal);

      expect(modalGroup).toMatchSnapshot();
    });

    it('should render ModalGroup with multiple modals', () => {
      const modals = [
        <Modal name="first_modal" key={0} header="" footer={<span>test</span>}>
          Hello World from fist modal!
        </Modal>,
        <Modal name="second_modal" key={1} header="" footer={<span>test2</span>}>
          Hello World from fist modal!
        </Modal>
      ];

      const modalGroup = mountModalGroup(modals);

      expect(modalGroup).toMatchSnapshot();
    });

    it('should render ModalGroup with open modal if modal Id is in multistackModals', () => {
      const openedNames = ['first_modal'];
      const modals = [
        <Modal name="first_modal" key={0} header="" footer={<span>test</span>}>
          Hello World from fist modal!
        </Modal>,
        <Modal name="second_modal" key={1} header="" footer={<span>test2</span>}>
          Hello World from fist modal!
        </Modal>
      ];

      const modalGroup = mountModalGroup(modals, openedNames);

      expect(modalGroup).toMatchSnapshot();
    });
  });
});
