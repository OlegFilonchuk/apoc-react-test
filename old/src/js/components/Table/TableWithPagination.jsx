import React from 'react';
import PropTypes from 'prop-types';

import Table from '../Table/Table';
import withPagination from '../withPagination/withPagination';

const TableWithPaginationComponent = withPagination(Table);

const TableWithPagination = props => <TableWithPaginationComponent {...props} />;

TableWithPagination.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  paginationProps: PropTypes.object,
  ...Table.propTypes,
  ...TableWithPagination.propTypes
};

TableWithPagination.defaultProps = {
  paginationProps: {}
};

export default TableWithPagination;
