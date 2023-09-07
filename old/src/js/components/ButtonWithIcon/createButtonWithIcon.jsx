import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ButtonWithIcon.less';

function createButtonWithIcon(Button) {
  function ButtonWithIcon({ className, iconClassName, children, adjustLineHeight, ...props }) {
    const finalClassName = classNames('button-with-icon', className);
    const finalIconClassName = classNames('button-with-icon__icon', iconClassName);
    const adjustLineHeightInPixels = adjustLineHeight ? `${adjustLineHeight} px` : adjustLineHeight;

    return (
      <Button {...props} className={finalClassName} style={{ lineHeight: adjustLineHeightInPixels }}>
        <i className={finalIconClassName} style={{ height: adjustLineHeightInPixels }} />
        {children && <span className={'button-with-icon__text'}>{children}</span>}
      </Button>
    );
  }

  ButtonWithIcon.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    iconClassName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    /**
     * This should equal to total height if an icon in pixels, to best vertical center alignment
     */
    adjustLineHeight: PropTypes.number
  };

  ButtonWithIcon.defaultProps = {
    adjustLineHeight: undefined,
    children: undefined,
    className: '',
    onClick: () => false
  };

  return ButtonWithIcon;
}

export default createButtonWithIcon;
