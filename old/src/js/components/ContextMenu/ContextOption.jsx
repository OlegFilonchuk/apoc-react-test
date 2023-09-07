import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export default function ContextOption({ children, onClick, isDisabled, icon: iconClassName, className, ...restProps }) {
  const classes = classNames(className, {
    'dropdown-option-disabled': isDisabled,
    'with-icon': !!iconClassName
  });

  const icon = iconClassName ? <span className={`icon ${iconClassName}`} /> : null;

  return (
    <li className={className}>
      <Button
        isLinkView
        className={classes}
        {...getDataTestElementProps(restProps)}
        onClick={e => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        {icon}
      </Button>
    </li>
  );
}

/**
 * @typedef {{label: string, name: string, value: string, isChecked: boolean, onClick: Function}} DropdownOptionProps
 */
ContextOption.propTypes = {
  /**
   * Text or element to be displayed
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,

  /**
   * Ignored options are grayed-out and disabled
   */
  isDisabled: PropTypes.bool,

  /**
   * Sets onClick on `input` element
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Icon className
   */
  icon: PropTypes.string,

  /**
   * Any custom class names
   */
  className: PropTypes.string,
  ...dataTestElementPropTypes
};

ContextOption.defaultProps = {
  isDisabled: false,
  icon: '',
  className: ''
};
