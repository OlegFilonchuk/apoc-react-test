import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Fieldset.less';

function Fieldset(props) {
  const { children, labelWrapperClassName, inputWrapperClassName, className, hideLabel, ...rest } = props;
  const fieldsetClasses = classNames('fieldset sc-row sc-row-no-gutter', className, {
    'no-border': hideLabel
  });
  const [label, input, ...otherFieldsets] = children;

  const labelWrapper = hideLabel ? null : <div className={labelWrapperClassName}>{label}</div>;

  return (
    <fieldset {...rest} className={fieldsetClasses}>
      {labelWrapper}
      <div className={inputWrapperClassName}>
        {input}
        {otherFieldsets}
      </div>
    </fieldset>
  );
}

Fieldset.propTypes = {
  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Text value of component and possible elements which `<fieldset>` tag will wrap
   */
  children: PropTypes.node.isRequired,

  /**
   * Classes for Label wrapper.
   */
  labelWrapperClassName: PropTypes.string,

  /**
   * Classes for Input wrapper.
   */
  inputWrapperClassName: PropTypes.string,

  /**
   * If fieldset should not include label. Default false (shows label).
   */
  hideLabel: PropTypes.bool
};

Fieldset.defaultProps = {
  labelWrapperClassName: 'sc-col-sm-3',
  inputWrapperClassName: 'sc-col-sm-9',
  children: '',
  className: '',
  hideLabel: false
};

export default Fieldset;
