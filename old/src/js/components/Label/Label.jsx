import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Label.less';

function Label(props) {
  const labelClasses = classNames('sc-label', props.className, {
    'sc-required': props.required
  });

  const { children, ...rest } = props;

  return (
    <label {...rest} className={labelClasses}>
      {children}
    </label>
  );
}

Label.propTypes = {
  /**
   * If input should be required. It will add asterisk symbol next to label
   */
  required: PropTypes.bool,

  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Text value of component and possible elements which `<label>` tag will wrap
   */
  children: PropTypes.node.isRequired
};

Label.defaultProps = {
  children: '',
  className: '',
  required: false
};

export default Label;
