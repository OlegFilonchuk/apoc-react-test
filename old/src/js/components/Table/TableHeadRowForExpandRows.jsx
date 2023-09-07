import React from 'react';
import PropTypes from 'prop-types';

import TableHeadRow from './TableHeadRow';
import { markAsTableHeadRow } from './Table';

import './TableHeadRowForExpandRows.less';

export default function TableHeadRowForExpandRows({ className, ...restOfProps }) {
  const finalClassName = `table-head-row-for-expand-rows ${className}`;

  return <TableHeadRow {...restOfProps} className={finalClassName} />;
}

markAsTableHeadRow(TableHeadRowForExpandRows);

TableHeadRowForExpandRows.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

TableHeadRowForExpandRows.defaultProps = {
  className: ''
};
