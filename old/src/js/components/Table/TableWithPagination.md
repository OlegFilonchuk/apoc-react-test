## Example of table with pagination

    const paginationProps = {
      key: 'pagination',
      currentPage: 16,
      itemsPerPage: 5,
      totalItems: 82,
      onChange: () => {
        // update table row data
      }
    };

    const tableProps = {
      emptyTableMessage: 'No rows in table',
      isRowsStriped: true,
      children: [],
      paginationProps: paginationProps
    };

    (
       <TableWithPagination {...tableProps} />
    )
