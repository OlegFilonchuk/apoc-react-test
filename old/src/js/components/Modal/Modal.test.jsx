import React from 'react';
import { shallow } from 'enzyme';

import Modal from './Modal';

const mountModal = (header, content, footer, isOpen, mountFn = shallow) =>
  mountFn(
    <Modal header={header} isOpen={isOpen} footer={footer}>
      {content}
    </Modal>
  );

describe('<Modal />', () => {
  it('should set closed modal', () => {
    // arrange
    const header = 'Foo title';
    const content = <p>Bar</p>;
    const footer = (
      <div>
        <button>Test</button>
      </div>
    );
    const isOpen = false;

    // act
    const component = mountModal(header, content, footer, isOpen);

    // assert
    expect(component).toMatchSnapshot();
  });

  it('should set opened modal', () => {
    // arrange
    const header = 'Foo title';
    const content = <p>Bar</p>;
    const footer = (
      <div>
        <button>Test</button>
      </div>
    );
    const isOpen = true;

    // act
    const component = mountModal(header, content, footer, isOpen);

    // assert
    expect(component).toMatchSnapshot();
  });

  it('should allow to open modal from parent component', () => {
    // arrange
    const isOpen = false;

    // act
    const component = mountModal(undefined, undefined, undefined, isOpen);

    const firstResultNodes = component.find('.sc-on');

    // assert
    expect(firstResultNodes.length).toBeFalsy();
    component.setProps({ isOpen: true });

    const secondResultNodes = component.find('.sc-on');

    expect(secondResultNodes.length).toBeTruthy();
  });
});
