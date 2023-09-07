import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Z_INDEX } from './configuration';

import './Modal.less';

export default function Modal(props) {
  const dialogClass = classNames('sc-dialog', 'sc-animate', {
    'sc-on': props.isOpen
  });

  return (
    <div className="modal-dialog">
      <div className={dialogClass} style={{ zIndex: props.zIndex }}>
        <div className={`sc-dialog-box ${props.className}`}>
          <div className="sc-dialog-content">
            <div className="sc-dialog-header">
              <h3 className="sc-dialog-title">{props.header}</h3>
            </div>
            <div className="sc-dialog-body">{props.children}</div>
            <div className="sc-dialog-footer">{props.footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  /**
   * Modal name for multistacking
   */
  name: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */

  /**
   * isOpen determines if modal is opened
   */
  isOpen: PropTypes.bool,

  /**
   * Header content of modal header
   */
  header: PropTypes.node,

  /**
   * Footer content of modal footer
   */
  footer: PropTypes.node,

  /**
   * ClassName size/appearance modifier class
   */
  className: PropTypes.string,

  /**
   * Children modal body content
   */
  children: PropTypes.node,

  /**
   * Modal z-index
   */
  zIndex: PropTypes.number
};

Modal.defaultProps = {
  isOpen: false,
  zIndex: Z_INDEX,
  children: '',
  className: '',
  header: '',
  footer: '',
  name: ''
};
