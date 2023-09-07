import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ContextButton extends Component {
  static propTypes = {
    buttonType: PropTypes.string,

    /**
     * List of class names separated by space. Will be added to the button.
     */
    className: PropTypes.string,
    classNames: PropTypes.string,

    /**
     * a ref to be called onbutton element
     * required by ContextMenu
     */
    domRef: PropTypes.func,

    /**
     * Function that will be triggered on button click (if specified).
     * It will be called with 2 parameters:
     * 1) the usual event object
     * 2) DOMRect object with position and size of the button icon
     */
    onClick: PropTypes.func,

    /**
     * Function that will be called when mouse leaves button.
     */
    onMouseLeave: PropTypes.func,

    /**
     * Function that will be called when mouse hovers button.
     */
    onMouseOver: PropTypes.func
  };

  static defaultProps = {
    buttonType: 'button',
    className: '',
    classNames: '',
    domRef: () => true,
    onClick: () => true,
    onMouseLeave: () => true,
    onMouseOver: () => true
  };

  onButtonClick = event => {
    const { onClick } = this.props;

    const dimensions = this.buttonIcon.getBoundingClientRect();

    onClick(event, dimensions);
  };

  onButtonMouseOver = event => {
    const { onMouseOver } = this.props;

    event.stopPropagation();

    onMouseOver(event);
  };

  render() {
    const { domRef, classNames, className, onMouseLeave, buttonType, ...rest } = this.props;

    const buttonClasses = classnames('context-menu__button', className, classNames);

    return (
      <button
        ref={domRef}
        {...rest}
        className={buttonClasses}
        onClick={this.onButtonClick}
        onMouseLeave={onMouseLeave}
        onMouseOver={this.onButtonMouseOver}
        type={buttonType}
      >
        <span
          className="sc-icon-hamburger-menu"
          ref={node => {
            this.buttonIcon = node;
          }}
        />
      </button>
    );
  }
}
