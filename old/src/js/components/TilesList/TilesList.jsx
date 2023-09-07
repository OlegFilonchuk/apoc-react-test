import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TilesList.less';

export default function TilesList({ children, className }) {
  const finalClassName = classNames('tiles-list', className);

  return <div className={finalClassName}>{children}</div>;
}

TilesList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

TilesList.defaultProps = {
  children: [],
  className: ''
};
