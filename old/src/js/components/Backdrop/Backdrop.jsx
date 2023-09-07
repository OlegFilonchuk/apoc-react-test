import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Backdrop.less';

export const DEFAULT_BACKDROP_ZINDEX = 15500;

export default class Backdrop extends Component {
  componentDidMount() {
    document.dispatchEvent(new CustomEvent('backdropMounted'));
  }

  componentDidUpdate() {
    document.dispatchEvent(new CustomEvent('backdropUpdated'));
  }

  componentWillUnmount() {
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('backdropUnmounted'));
    }, 0);
  }

  render() {
    const { isVisible, zIndex, className, onClick } = this.props;
    const backdropClasses = classNames('backdrop', className, {
      'backdrop--visible': isVisible
    });

    return <div className={backdropClasses} style={{ zIndex }} onClick={onClick} />;
  }
}

Backdrop.propTypes = {
  /**
   * Backdrop z-index
   */
  zIndex: PropTypes.number,

  /**
   * Is backdrop visible
   */
  isVisible: PropTypes.bool,

  /**
   * Will be fired on backdrop click
   */
  onClick: PropTypes.func,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

Backdrop.defaultProps = {
  zIndex: DEFAULT_BACKDROP_ZINDEX,
  isVisible: false,
  onClick: () => true,
  className: ''
};
