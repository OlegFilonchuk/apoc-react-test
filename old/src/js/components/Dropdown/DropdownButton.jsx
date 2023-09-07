import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export default function DropdownButton({
  children,
  className,
  onClick,
  isExpanded,
  id,
  onKeyDown,
  buttonType,
  ...restProps
}) {
  return (
    <Button
      className={`sc-btn sc-btn-dropdown sc-btn-primary-outline ${className}`}
      type={buttonType}
      aria-haspopup="true"
      aria-expanded={isExpanded}
      onClick={e => onClick(e)}
      id={id}
      onKeyDown={onKeyDown}
      {...getDataTestElementProps(restProps, dataTestElementValue => dataTestElementValue || id)}
      {...restProps}
    >
      <span className="sc-btn-dropdown-text">{children}</span>
      <span className="sc-icon-down-arrow" />
    </Button>
  );
}

DropdownButton.propTypes = {
  /**
   * Text or element inside of a button
   */
  children: PropTypes.node,

  /**
   * Optional callback. Needed by [Dropdown](#dropdown) but custom callback can be set here without any conflict.
   */
  onClick: PropTypes.func,

  /**
   * Optional callback. Needed by [Dropdown](#dropdown) but custom callback can be set here without any conflict.
   */
  onKeyDown: PropTypes.func,

  /**
   * Controls aria-expanded attribute of a button. Optional. Needed by [Dropdown](#dropdown).
   */
  isExpanded: PropTypes.bool,

  /**
   * Sets `id` attribute of a `button`. Useful to match it with a `label`'s `for` attribute to enhance UX.
   */
  id: PropTypes.string,

  /**
   * Css classes of button.
   */
  className: PropTypes.string,

  /**
   * Button type
   */
  buttonType: PropTypes.string,

  ...dataTestElementPropTypes
};

DropdownButton.defaultProps = {
  className: 'sc-btn-default',
  id: '',
  children: undefined,
  isExpanded: false,
  buttonType: 'button',
  onClick: () => true,
  onKeyDown: () => true
};
