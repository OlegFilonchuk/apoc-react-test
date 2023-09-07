import React from 'react';
import PropTypes from 'prop-types';

import { markAsTableHeadRow } from './Table';

export default function TableHeadRow({ children, className }) {
  return (
    <thead className={className}>
      <tr>{children}</tr>
    </thead>
  );
}

markAsTableHeadRow(TableHeadRow);

TableHeadRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

TableHeadRow.defaultProps = {
  className: ''
};
