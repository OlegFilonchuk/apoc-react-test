import React from 'react';
import PropTypes from 'prop-types';

import { KEY_CODES } from '../../../utils/constants';

function Input({ children, maxLength, readOnly, onSubmit, onCanceled, onChange, onFocus, alreadyFocused, value }) {
  const setFocus = node => {
    if (node && !alreadyFocused) {
      node.focus();
      node.select();
    }
  };

  const onKeyUp = e => {
    if (e.keyCode === KEY_CODES.ENTER) {
      onSubmit(e.target.value);
    } else if (e.keyCode === KEY_CODES.ESCAPE) {
      onCanceled(e.target.value);
    }
  };

  const onBlur = e => {
    onSubmit(e.target.value);
  };

  const onInputChange = e => {
    onChange(e.target.value);
  };

  const onInputFocus = e => {
    onFocus(e.target.value);
  };

  return (
    <input
      ref={setFocus}
      type="text"
      defaultValue={children}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      readOnly={readOnly}
      maxLength={maxLength}
      onChange={onInputChange}
      onFocus={onInputFocus}
      value={value}
    />
  );
}

Input.propTypes = {
  /**
   * Label text
   */
  children: PropTypes.string.isRequired,

  /**
   * Maximum allowed characters for input value
   */
  maxLength: PropTypes.number,

  /**
   * If input should be blocked from editing
   */
  readOnly: PropTypes.bool,

  /**
   * Fired when new value is submitted (via enter key or blur). Good place to run some validation.
   * It will pass current input value.
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * Fired when user cancels editing.
   */
  onCanceled: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  alreadyFocused: PropTypes.bool,
  value: PropTypes.string.isRequired
};

Input.defaultProps = {
  maxLength: 0,
  readOnly: false,
  onChange: () => true,
  onFocus: () => true,
  alreadyFocused: false
};

export default Input;
