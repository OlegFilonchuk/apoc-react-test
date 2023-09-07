## Example of table sorting
It uses [Table](#table) and [TableHeadRow](#tableheadrow)

    function onSort(sortOrder, sortField) {
        setState({ sortOrder, sortField });
    }

    function getSortOrder(sortField) {
      return state.sortField === sortField ? state.sortOrder : ''
    }

    const initialState = {
      sortField: '',
      sortOrder: ''
    };

    (
      <Table>
        <TableHeadRow>
          <TableHeadCell sortOrder={getSortOrder('id-1')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-1')}>Title</TableHeadCell>
          <TableHeadCell sortOrder={getSortOrder('id-2')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-2')}>Title</TableHeadCell>
          <TableHeadCell sortOrder={getSortOrder('id-3')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-3')}>Title</TableHeadCell>
        </TableHeadRow>
        <tbody>
          <tr>
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </tr>
          <tr>
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </tr>
          <tr>
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </tr>
        </tbody>
      </Table>
    )

## Example of table sorting with default sort value
It uses [Table](#table) and [TableHeadRow](#tableheadrow)

    function onSort(sortOrder, sortField) {
        setState({ sortOrder, sortField });
    }

    function getSortOrder(sortField) {
      return state.sortField === sortField ? state.sortOrder : ''
    }

    const initialState = {
        sortField: 'id-2',
        sortOrder: 'asc'
      };

    (
      <Table>
        <TableHeadRow>
          <TableHeadCell sortOrder={getSortOrder('id-1')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-1')}>Title</TableHeadCell>
          <TableHeadCell sortOrder={getSortOrder('id-2')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-2')}>Title</TableHeadCell>
          <TableHeadCell sortOrder={getSortOrder('id-3')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-3')}>Title</TableHeadCell>
        </TableHeadRow>
        <tbody>
          <tr>
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </tr>
          <tr>
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </tr>
          <tr>
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </tr>
        </tbody>
      </Table>
    )

## Example of table with different aligned headers and content
It uses [Table](#table), [TableCell](#tablecell), [TableHeadRow](#tableheadrow) and [TableHeadCell](#tableheadcell)

    function onSort(sortOrder, sortField) {
        setState({ sortOrder, sortField });
    }

    function getSortOrder(sortField) {
      return state.sortField === sortField ? state.sortOrder : ''
    }

    const initialState = {
      sortField: '',
      sortOrder: ''
    };

    (
      <Table>
        <TableHeadRow>
          <TableHeadCell textContent sortOrder={getSortOrder('id-1')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-1')}>Text Content</TableHeadCell>
          <TableHeadCell iconOrGraphicalContent sortOrder={getSortOrder('id-2')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-2')}>Icon Content</TableHeadCell>
          <TableHeadCell numericContent sortOrder={getSortOrder('id-3')} sortable onSort={(newSortOrder) => onSort(newSortOrder, 'id-3')}>Numeric Content</TableHeadCell>
        </TableHeadRow>
        <tbody>
          <tr>
            <TableCell>Short text content</TableCell>
            <TableCell><span className="sc-icon-check sc-success" /></TableCell>
            <TableCell>$12.34</TableCell>
          </tr>
          <tr>
            <TableCell>Little longer text content</TableCell>
            <TableCell><span className="sc-grade-c sc-icon-triangle-warning" /></TableCell>
            <TableCell>$123.45</TableCell>
          </tr>
          <tr>
            <TableCell>Content</TableCell>
            <TableCell><span className="sc-icon-check sc-success" /></TableCell>
            <TableCell>$1234.56</TableCell>
          </tr>
        </tbody>
      </Table>
    )
