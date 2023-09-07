import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export default function DropdownOptionLink({
  href,
  label,
  onClick,
  className,
  icon: iconClassName,
  disabled,
  ...restProps
}) {
  const icon = <span className={`${iconClassName} icon`} />;

  const liClassName = classNames('dropdown-option-link', className, {
    disabled
  });

  const onOptionClick = e => {
    if (!disabled) {
      onClick(e);
    }
  };

  return (
    <li className={liClassName}>
      <a
        href={href}
        onClick={onOptionClick}
        {...getDataTestElementProps(restProps)}
        className={`${iconClassName ? 'with-icon' : ''}`}
        disabled
      >
        {icon}
        {label}
      </a>
    </li>
  );
}

DropdownOptionLink.propTypes = {
  /**
   * Sets the `href` attribute on `a` (anchor) element
   */
  href: PropTypes.string,

  /**
   * Sets displayed text
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,

  /**
   * Sets onClick event callback on `a` (anchor) element
   */
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  ...dataTestElementPropTypes
};

DropdownOptionLink.defaultProps = {
  href: undefined,
  label: '',
  onClick: () => true,
  className: '',
  icon: '',
  disabled: false
};
