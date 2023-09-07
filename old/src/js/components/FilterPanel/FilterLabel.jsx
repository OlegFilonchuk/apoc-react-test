import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FilterLabel.less';

export default function FilterLabel({ label, labelIcon, labelCount, className }) {
  const finalClassName = classNames('label-item', className);

  const labelItemIcon = labelIcon ? (
    <span className="label-item__icon">
      <i className={labelIcon} />
    </span>
  ) : null;

  return (
    <div className={finalClassName}>
      {labelItemIcon}
      <div className="label-item__name">{label}</div>
      {labelCount !== null && <div className="label-item__number">({labelCount})</div>}
    </div>
  );
}

FilterLabel.propTypes = {
  /**
   * Label for filter item
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Icon for filter item
   */
  labelIcon: PropTypes.string,

  /**
   * Label for filter item
   */
  labelCount: PropTypes.node,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

FilterLabel.defaultProps = {
  label: '',
  labelIcon: '',
  labelCount: null,
  className: ''
};
