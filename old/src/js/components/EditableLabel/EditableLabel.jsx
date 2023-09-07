import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from './components/Input';

import './EditableLabel.less';

const EDITABLE_LABEL_CLASS = 'editable-label';

function EditableLabel(props) {
  const { className, inEditMode, children, hasError } = props;

  const wrapperClassName = classNames(EDITABLE_LABEL_CLASS, className, {
    [`${EDITABLE_LABEL_CLASS}--edit`]: inEditMode,
    [`${EDITABLE_LABEL_CLASS}--error`]: hasError
  });

  const inputElement = inEditMode ? <Input {...props} /> : null;

  return (
    <div className={wrapperClassName}>
      <label onClick={props.onClick}>{children}</label>
      {inputElement}
    </div>
  );
}

EditableLabel.propTypes = {
  /**
   * Custom class name for editable element
   */
  className: PropTypes.string,

  /**
   * Label text
   */
  children: PropTypes.string.isRequired,

  /**
   * Is the component in edit mode
   */
  inEditMode: PropTypes.bool,

  /**
   * If element is in error mode
   */
  hasError: PropTypes.bool,

  /**
   * Fired when user clicks on label
   */
  onClick: PropTypes.func
};

EditableLabel.defaultProps = {
  className: '',
  readOnly: false,
  inEditMode: false,
  hasError: false,
  maxLength: 140,
  onClick: () => true
};

export default EditableLabel;
