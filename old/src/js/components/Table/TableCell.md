## Example of table with TableCell
It uses [TableHeadRow](#tableheadrow) and [Table](#table)

    (
      <Table>
        <TableHeadRow>
          <th>Title</th>
          <th>Title</th>
          <th>Title</th>
        </TableHeadRow>
        <tbody>
          <tr>
            <TableCell>Content</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Content</TableCell>
          </tr>
          <tr>
            <TableCell>Content</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Content</TableCell>
          </tr>
          <tr>
            <TableCell>Content</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Content</TableCell>
          </tr>
        </tbody>
      </Table>
    )

## Example of table with TableCell with alignment by content type
It uses [TableHeadRow](#tableheadrow), [Table](#table) and [InlineEllipsis](#inlineellipsis)

    (
      <Table>
        <TableHeadRow>
          <TableHeadCell textContent>textContent Title</TableHeadCell>
          <TableHeadCell iconOrGraphicalContent> iconOrGraphicalContent Title</TableHeadCell>
          <TableHeadCell numericContent>numericContent Title</TableHeadCell>
        </TableHeadRow>
        <tbody>
          <tr>
            <TableCell>Simple text</TableCell>
            <TableCell><span className="sc-icon-file" /></TableCell>
            <TableCell>123.43</TableCell>
          </tr>
          <tr>
            <TableCell>Different text</TableCell>
            <TableCell>
              <InlineEllipsis width="150px">
                <span className="sc-icon-check sc-success" /> Completed
              </InlineEllipsis>
            </TableCell>
            <TableCell>-23.23 </TableCell>
          </tr>
          <tr>
            <TableCell>Another one</TableCell>
            <TableCell>
              <InlineEllipsis width="150px">
                <span className="sc-grade-c sc-icon-triangle-warning" /> Needs configurations
              </InlineEllipsis>
            </TableCell>
            <TableCell>$34</TableCell>
          </tr>
        </tbody>
      </Table>
    )
