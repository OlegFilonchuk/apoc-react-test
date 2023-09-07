import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button/Button';

import './IconButton.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

const iconButtonBaseClass = 'icon-button';
const buttonClassPrefix = 'sc-btn-';
const iconClassPrefix = 'sc-icon-';
const defaultButton = 'primary-outline';

function IconButtonFactory({ icon, button = defaultButton, noBorder, preset = '' }) {
  // precalc as much as we can
  const factoryIconClasses = `${iconClassPrefix}${icon}`;
  const factoryButtonClasses = classNames(
    `${buttonClassPrefix}${button}`,
    noBorder && `${iconButtonBaseClass}--no-border`,
    !!preset && `${iconButtonBaseClass}--${preset.toLowerCase()}`,
    iconButtonBaseClass
  );

  const IconButton = ({ className, disabled, compact, onClick, ...restProps }) => {
    const buttonClasses = classNames(factoryButtonClasses, compact && `${iconButtonBaseClass}--compact`, className);

    return (
      <Button className={buttonClasses} onClick={onClick} disabled={disabled} {...getDataTestElementProps(restProps)}>
        <span className={factoryIconClasses} />
      </Button>
    );
  };

  IconButton.propTypes = {
    /**
     * *Addional* classes for the button
     */
    className: PropTypes.string,
    /**
     * Is the button disabled
     */
    disabled: PropTypes.bool,
    /**
     * Use compact layout
     */
    compact: PropTypes.bool,
    /**
     * onClick callback
     */
    onClick: PropTypes.func,
    ...dataTestElementPropTypes
  };

  IconButton.defaultProps = {
    className: '',
    disabled: false,
    compact: false,
    onClick: () => true
  };

  return IconButton;
}
export default IconButtonFactory;
