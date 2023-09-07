import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ToggleButton.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export const TOGGLE_BUTTON_SIZES = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
  extraSmall: 'xs'
};

const ToggleButton = ({
  isOn,
  isDisabled,
  labelOn,
  labelOff,
  toggleSize,
  onSwitch,
  toggleId,
  buttonType,
  className,
  isLightTheme,
  ...restProps
}) => {
  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    onSwitch(!isOn);
  };

  const toggleClasses = classNames(
    'toggle-button',
    toggleSize,
    {
      'is-on': isOn,
      'is-off': !isOn,
      'is-disabled': isDisabled,
      'is-light-theme': isLightTheme
    },
    className
  );

  const switcherClassses = classNames('items-tumbler', {
    on: isOn,
    off: !isOn
  });

  return (
    <div id={toggleId} className={toggleClasses} onClick={handleClick}>
      <div className={switcherClassses}>
        <div className="label" title={labelOn}>
          {labelOn}
        </div>
        <button type={buttonType} className="big-toggle__inner-circle" {...getDataTestElementProps(restProps)} />
        <div className="label" title={labelOff}>
          {labelOff}
        </div>
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  /**
   * Specifies whether toggle should be on. Default - true.
   */
  isOn: PropTypes.bool,

  /**
   * Specifies whether toggle should be disabled. Default - false.
   */
  isDisabled: PropTypes.bool,

  /**
   * Callback function on change toggle state.
   */
  onSwitch: PropTypes.func,

  /**
   * Specifies custom label for "on" state. Default - "on".
   */
  labelOn: PropTypes.string,

  /**
   * Specifies custom label for "off" state. Default - "off".
   */
  labelOff: PropTypes.string,

  /**
   * Specifies the size of a toggle button. Default - lg.
   * Available values: lg | md | sm
   */
  toggleSize: PropTypes.oneOf([
    TOGGLE_BUTTON_SIZES.large,
    TOGGLE_BUTTON_SIZES.medium,
    TOGGLE_BUTTON_SIZES.small,
    TOGGLE_BUTTON_SIZES.extraSmall
  ]),

  /**
   * Specifies "id" attribute for ToggleButton component.
   */
  toggleId: PropTypes.string,

  /**
   * Button type
   */
  buttonType: PropTypes.string,

  /**
   * CSS classes of container
   */
  className: PropTypes.string,

  /**
   * Sets 'Light theme toggle button style' prop needed by testers.
   */
  isLightTheme: PropTypes.bool,
  ...dataTestElementPropTypes
};

ToggleButton.defaultProps = {
  className: null,
  isOn: true,
  isDisabled: false,
  labelOn: 'on',
  labelOff: 'off',
  toggleSize: TOGGLE_BUTTON_SIZES.large,
  toggleId: null,
  errorMessage: null,
  buttonType: 'button',
  onSwitch: () => true,
  isLightTheme: false
};

export default ToggleButton;
