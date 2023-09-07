import React from 'react';
import PropTypes from 'prop-types';

export default function TableRow({ children, className }) {
  return <tr className={className}>{children}</tr>;
}

TableRow.propTypes = {
  /**
   * Row's content
   */
  children: PropTypes.node,

  /**
   * List of custom classes added to component
   */
  className: PropTypes.string
};

TableRow.defaultProps = {
  children: null,
  className: ''
};
