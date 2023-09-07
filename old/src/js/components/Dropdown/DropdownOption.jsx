import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export default function DropdownOption({
  label,
  name,
  selected,
  value,
  onClick,
  disabled,
  className,
  showPopupOnHover,
  icon: iconClassName,
  ...restProps
}) {
  const classes = classNames({
    'sc-focus': selected,
    'dropdown-option-disabled': disabled,
    'with-icon': iconClassName
  });

  const icon = <span className={`${iconClassName} icon`} />;
  const title = showPopupOnHover ? label : undefined;

  return (
    <li className={`dropdown-option ${className}`}>
      <label className={classes} title={title}>
        {icon}
        {label}
        <input
          type="radio"
          role="menu"
          name={name}
          value={value}
          defaultChecked={selected}
          readOnly="readOnly"
          onClick={onClick}
          disabled={disabled}
          {...getDataTestElementProps(restProps, testElementValue => testElementValue || `option-${value}`)}
        />
      </label>
    </li>
  );
}

/**
 * @typedef {{label: string, name: string, value: string, isChecked: boolean, onClick: Function}} DropdownOptionProps
 */
DropdownOption.propTypes = {
  /**
   * Text or element to be displayed
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,

  /**
   * Sets `input`s `name` attribute. It's not required since [Dropdown](#dropdown)'s prop `name` should do it.
   */
  name: PropTypes.string,

  /**
   * Sets `value` attribute to `input`.
   */
  value: PropTypes.string.isRequired,

  /**
   * Controls css class of a `label` element
   */
  selected: PropTypes.bool,

  /**
   * Ignored options are grayed-out and disabled
   */
  disabled: PropTypes.bool,

  /**
   * Sets onClick on `input` element
   */
  onClick: PropTypes.func,

  icon: PropTypes.string,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Flag to defined should popup be shown on hover or not
   */
  showPopupOnHover: PropTypes.bool,

  ...dataTestElementPropTypes
};

DropdownOption.defaultProps = {
  name: '',
  disabled: false,
  selected: false,
  onClick: () => true,
  icon: '',
  className: '',
  showPopupOnHover: false
};
