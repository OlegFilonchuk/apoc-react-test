import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { upperFirst } from 'lodash';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

import './Button.less';

const noop = () => null;

function Button(props) {
  const { className, isSelected, isLinkView, disabled, id, name, type, children, onClick, title, value } = props;

  const buttonClass = classNames('sc-btn', className, {
    'sc-on': isSelected,
    'sc-disabled': disabled,
    'link-view': isLinkView
  });

  const clickHandler = disabled ? noop : onClick;

  const processDataTestElement = dataTestElementValue =>
    `${dataTestElementValue}${value && typeof value === 'string' ? '-' : ''}${
      value && typeof value === 'string' ? upperFirst(value) : ''
    }`;

  return (
    <button
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={clickHandler}
      title={title}
      {...getDataTestElementProps(props, processDataTestElement)}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  /**
   * Button id
   */
  id: PropTypes.string,

  /**
   * Is button disabled
   */
  disabled: PropTypes.bool,

  /**
   * Button name
   */
  name: PropTypes.string,

  /**
   * Button type
   */
  type: PropTypes.string,

  /**
   * Is button selected
   */
  isSelected: PropTypes.bool,

  /**
   * Is button looks like link
   */
  isLinkView: PropTypes.bool,

  /**
   * Is called when button is clicked
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Inherited classes. For more details check Buttons section in Chameleon.
   * Defaults to 'sc-btn-default'.
   */
  className: PropTypes.string,

  /**
   * Button content
   */
  children: PropTypes.node.isRequired,

  /* eslint-disable react/no-unused-prop-types */
  /**
   * Button value that is used in ButtonGroup component
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /* eslint-enable react/no-unused-prop-types */

  title: PropTypes.string,

  ...dataTestElementPropTypes
};

Button.defaultProps = {
  id: '',
  name: '',
  type: 'button',
  disabled: false,
  isSelected: false,
  isLinkView: false,
  value: null,
  className: 'sc-btn-default',
  'data-test-element': '',
  title: ''
};

export default Button;
