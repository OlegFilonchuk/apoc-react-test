import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default function ContextOptionReactLink({ to, children, icon: iconClassName, isDisabled }) {
  const BASE_CLASS = 'context-option-link';
  const icon = iconClassName ? <span className={`icon ${iconClassName}`} /> : null;
  const classes = classNames({
    'with-icon': !!iconClassName,
    [`${BASE_CLASS}--disabled`]: isDisabled
  });

  return (
    <li>
      <Link to={to} className={classes}>
        {children}
        {icon}
      </Link>
    </li>
  );
}

ContextOptionReactLink.propTypes = {
  /**
   * Sets the `to` attribute on `Link` element
   */
  to: PropTypes.string.isRequired,

  /**
   * Sets displayed text
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /**
   * Icon className
   */
  icon: PropTypes.string,

  /**
   * Ignored options are grayed-out and disabled
   */
  isDisabled: PropTypes.bool
};

ContextOptionReactLink.defaultProps = {
  target: '_self',
  onClick: () => true,
  href: '#',
  icon: '',
  isDisabled: false
};
