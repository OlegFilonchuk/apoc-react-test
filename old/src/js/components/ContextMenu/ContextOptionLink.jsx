import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ContextOptionLink({
  href,
  children,
  onClick,
  target,
  icon: iconClassName,
  className,
  isDisabled
}) {
  const BASE_CLASS = 'context-option-link';
  const icon = iconClassName ? <span className={`icon ${iconClassName}`} /> : null;
  const classes = classNames(BASE_CLASS, {
    'with-icon': !!iconClassName,
    [`${BASE_CLASS}--disabled`]: isDisabled
  });

  return (
    <li className={className}>
      <a href={href} onClick={e => onClick(e)} target={target} className={classes}>
        {children}
        {icon}
      </a>
    </li>
  );
}

ContextOptionLink.propTypes = {
  /**
   * Sets the `href` attribute on `a` (anchor) element
   */
  href: PropTypes.string.isRequired,

  /**
   * Sets displayed text
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /**
   * Sets onClick event callback on `a` (anchor) element
   */
  onClick: PropTypes.func,

  /**
   * Target attribute for the link. Defaults to _self
   */
  target: PropTypes.string,

  /**
   * Icon className
   */
  icon: PropTypes.string,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Ignored options are grayed-out and disabled
   */
  isDisabled: PropTypes.bool
};

ContextOptionLink.defaultProps = {
  target: '_self',
  onClick: () => true,
  href: '#',
  icon: '',
  className: '',
  isDisabled: false
};
