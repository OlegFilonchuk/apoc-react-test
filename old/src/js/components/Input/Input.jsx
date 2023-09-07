import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { KEY_CODES } from '../../utils/constants';

import './Input.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

const TYPE_PASSWORD = 'password';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentVisible: false
    };
  }

  onEyeClick = () => this.setState({ contentVisible: !this.state.contentVisible });

  get passwordIconClassNames() {
    return classNames('input-field__password-eye sc-icon-pw-show-ctr', {
      'input-field__password-eye__visible': this.state.contentVisible,
      'input-field__password-eye__hidden': !this.state.contentVisible
    });
  }

  render() {
    const { className, hasError, type, onInputRef, lettersLeftCount, submitOnEnter, suffix, ...rest } = this.props;

    const extendedClassName = classNames('sc-form-ele input-field', className, { error: hasError });
    let currentInputType = type;

    if (type === TYPE_PASSWORD && this.state.contentVisible) {
      currentInputType = 'text';
    }

    const isWithCharactersLimit = lettersLeftCount !== Infinity;

    const isWithSuffix = suffix !== '';

    const baseInputClassNames = classNames(extendedClassName, {
      'with-characters-limit-input': isWithCharactersLimit,
      'extra-password-padding': this.props.type === 'password'
    });

    const disableEnterSubmit = e => {
      if (!submitOnEnter && e.keyCode === KEY_CODES.ENTER) {
        e.preventDefault();
      } else {
        this.props.onKeyDown(e);
      }
    };

    const propsObj = {
      ...rest,
      className: baseInputClassNames,
      type: currentInputType,
      ref: onInputRef,
      ...getDataTestElementProps(this.props),
      onKeyDown: disableEnterSubmit
    };
    const baseInput = <input {...propsObj} />;

    if (type === TYPE_PASSWORD) {
      return (
        <span className="input-field-wrapper">
          {baseInput}
          <span className={this.passwordIconClassNames} onClick={this.onEyeClick} />
        </span>
      );
    }

    if (isWithCharactersLimit) {
      return (
        <span className="input-field-wrapper">
          {baseInput}
          <div className="input-field__char-limit-counter">
            <div className="input-field__char-limit-counter__text">{lettersLeftCount}</div>
          </div>
        </span>
      );
    }

    if (isWithSuffix) {
      return (
        <span className="input-suffix-wrapper">
          {baseInput}
          <div className="input-field-suffix">
            <div className="">{suffix}</div>
          </div>
        </span>
      );
    }

    return baseInput;
  }
}

Input.propTypes = {
  /**
   * If Input should render in error mode
   */
  hasError: PropTypes.bool,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Input type
   */
  type: PropTypes.string,

  /**
   * Callback to run with raw input reference as argument
   */
  onInputRef: PropTypes.func,

  /**
   * If is not default value (Infinity), then Input should also display letters limit
   *
   */
  lettersLeftCount: PropTypes.number,
  onKeyDown: PropTypes.func,
  submitOnEnter: PropTypes.bool,

  /**
   * Suffix string
   */
  suffix: PropTypes.string,
  ...dataTestElementPropTypes
};

Input.defaultProps = {
  hasError: false,
  className: '',
  type: 'text',
  onInputRef: element => element,
  lettersLeftCount: Infinity,
  onKeyDown: () => true,
  submitOnEnter: false,
  suffix: ''
};

export default Input;
