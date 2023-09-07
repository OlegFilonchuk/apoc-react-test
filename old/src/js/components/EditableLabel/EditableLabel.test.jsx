import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';

import EditableLabel from './EditableLabel';
import { setInputValue, simulateEvent, findInput } from './test-helpers';

describe('<EditableLabel />', () => {
  const initialProps = {
    onSubmit: jest.fn(),
    onCanceled: jest.fn()
  };
  const initalValue = 'some initial value';
  const mountEditableLabel = (props = {}, mountFn = mount) =>
    mountFn(
      <EditableLabel {...initialProps} {...props}>
        {initalValue}
      </EditableLabel>
    );
  const newValue = 'some new value';

  describe('should render correct structure', () => {
    it('default', () => {
      const editableLabel = mountEditableLabel({}, shallow);

      expect(editableLabel).toMatchSnapshot();
    });

    it('with additional class name passed as props', () => {
      const className = 'custom-class';
      const editableLabel = mountEditableLabel({ className }, shallow);

      expect(editableLabel).toHaveClassName(className);
    });

    it('in edit mode', () => {
      const editableLabel = mountEditableLabel({ inEditMode: true }, shallow);

      expect(editableLabel).toMatchSnapshot();
    });

    it('read only', () => {
      const editableLabel = mountEditableLabel({ readOnly: true }, shallow);

      expect(editableLabel).toMatchSnapshot();
    });

    it('with error', () => {
      const editableLabel = mountEditableLabel({ hasError: true }, shallow);

      expect(editableLabel).toMatchSnapshot();
    });
  });

  describe('onClick', () => {
    it('should fire onClick event when clicking on label', () => {
      const onClick = jest.fn();
      const editableLabel = mountEditableLabel({ onClick });
      const label = editableLabel.find('label');

      simulateEvent(label, 'click');

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('onSubmit simple check', () => {
    it('should fire onSubmit callback after entering value and confirming with enter', () => {
      const onSubmit = jest.fn();
      const editableLabel = mountEditableLabel({ inEditMode: true, onSubmit });
      const input = findInput(editableLabel).getDOMNode();

      input.value = newValue;

      ReactTestUtils.Simulate.keyUp(input, { key: 'Enter', keyCode: 13, which: 13 });

      expect(onSubmit).toHaveBeenCalledWith(newValue);
    });

    it('should fire onSubmit callback after entering value and confirming with blur', () => {
      const onSubmit = jest.fn();
      const editableLabel = mountEditableLabel({ inEditMode: true, onSubmit });
      const input = findInput(editableLabel).getDOMNode();

      input.value = newValue;

      ReactTestUtils.Simulate.blur(input);

      expect(onSubmit).toHaveBeenCalledWith(newValue);
    });

    it('should not fire onSubmit callback after entering value and canceling with escape', () => {
      const onSubmit = jest.fn();
      const editableLabel = mountEditableLabel({ inEditMode: true, onSubmit });
      const input = findInput(editableLabel);

      setInputValue(input, newValue);

      simulateEvent(input, 'keyup', 'Escape');

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('onCanceled', () => {
    it('should fire onCanceled callback after entering value and canceling', () => {
      // given
      const onCanceled = jest.fn();
      const editableLabel = mountEditableLabel({ inEditMode: true, onCanceled });
      const input = findInput(editableLabel);

      // when
      setInputValue(input, newValue);
      simulateEvent(input, 'keyup', 'Escape');

      // then
      expect(onCanceled).toHaveBeenCalled();
    });

    it('should not fire onCanceled callback after entering value and confirming', () => {
      // given
      const onCanceled = jest.fn();
      const editableLabel = mountEditableLabel({ inEditMode: true, onCanceled });
      const input = findInput(editableLabel);

      // when
      setInputValue(input, newValue);
      simulateEvent(input, 'keyup', 'Enter');

      // then
      expect(onCanceled).not.toHaveBeenCalled();
    });
  });
});
