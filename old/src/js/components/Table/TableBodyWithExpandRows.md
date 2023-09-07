## Necessary sub component is
* [TableRowWithExpandContent](#tablerowwithexpandcontent)

## Example of table with expand row
It uses [TableHeadRowForExpandRows](#tableheadrowforexpandrows), [TableBodyWithExpandRows](#tablebodywithexpandrows) and [TableRowWithExpandContent](#tablerowwithexpandcontent)

    (
      <Table>
        <TableHeadRowForExpandRows>
          <th>Title</th>
          <th>Title</th>
          <th>Title</th>
        </TableHeadRowForExpandRows>
        <TableBodyWithExpandRows>
          <TableRowWithExpandContent id="id-1" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent id="id-2" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent id="id-3" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
        </TableBodyWithExpandRows>
      </Table>
    )

## Example of table with expanded row by default
It uses [TableHeadRowForExpandRows](#tableheadrowforexpandedrows), [TableBodyWithExpandRows](#tablebodywithexpandrows) and [TableRowWithExpandContent](#tablerowwithexpandcontent)

    (
      <Table>
        <TableHeadRowForExpandRows>
          <th>Title</th>
          <th>Title</th>
          <th>Title</th>
        </TableHeadRowForExpandRows>
        <TableBodyWithExpandRows defaultExpandedRowId="id-2">
          <TableRowWithExpandContent id="id-1" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent id="id-2" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent id="id-3" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
        </TableBodyWithExpandRows>
      </Table>
    )
    
    
## Example of table with clickable rows
It uses [TableHeadRowForExpandRows](#tableheadrowforexpandedrows), [TableBodyWithExpandRows](#tablebodywithexpandrows) and [TableRowWithExpandContent](#tablerowwithexpandcontent)
        
    (
      <Table isRowsStriped>
        <TableHeadRowForExpandRows>
          <th width="20%">Title</th>
          <th width="20%">Title</th>
          <th>Title</th>
        </TableHeadRowForExpandRows>
        <TableBodyWithExpandRows expandOnClick>
          <TableRowWithExpandContent
              id="id-1"
              expandContent="hello world"
          >
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent
              id="id-2"
              expandContent="hello world"
          >
            <td>Content</td>
            <td>Content</td>
            <TableCellWithTextEllipsis>No ellipsis should be turned on</TableCellWithTextEllipsis>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent
              id="id-3"
              expandContent="hello world"
          >
            <TableCellWithTextEllipsis>This content should have some ellipis on!</TableCellWithTextEllipsis>
            <td>Content</td>
            <TableCellWithTextEllipsis>
            This content should have some ellipis on!This content should have some ellipis on!This content should have some ellipis on!
            This content should have some ellipis on!This content should have some ellipis on!This content should have some ellipis on!
            This content should have some ellipis on!This content should have some ellipis on!This content should have some ellipis on!
            This content should have some ellipis on!This content should have some ellipis on!This content should have some ellipis on!
            </TableCellWithTextEllipsis>
          </TableRowWithExpandContent>
        </TableBodyWithExpandRows>
      </Table>
    )

## Example of table with clickable rows - buttons blocks row expansion 
It uses [TableHeadRowForExpandRows](#tableheadrowforexpandedrows), [TableBodyWithExpandRows](#tablebodywithexpandrows) and [TableRowWithExpandContent](#tablerowwithexpandcontent)

    onClick = ()=> null;        
    (
      <Table isRowsStriped>
        <TableHeadRowForExpandRows>
          <th width="20%">Title</th>
          <th width="20%">Title</th>
          <th>Title</th>
          <th>Actions</th>
        </TableHeadRowForExpandRows>
        <TableBodyWithExpandRows expandOnClick>
          <TableRowWithExpandContent
              id="id-1"
              expandContent="hello world"
          >
            <td>Content</td>
            <td><a href="https://google.com" target="_blank" referrerPolicy="no-referrer">Clicking on me won't expands row</a></td>
            <td><button>Clicking on me wont expand row</button></td>
            <td>
              <ContextMenu>
                <ContextOptionLink onClick={() => { onClick('ContextOptionLink clicked!'); }}>Edit</ContextOptionLink>
                <ContextOption onClick={() => { onClick('ContextOption "Rename" clicked!'); }}>Rename</ContextOption>
              </ContextMenu>
            </td>
          </TableRowWithExpandContent>        
        </TableBodyWithExpandRows>
      </Table>
    )

## Example of table with multiple expand rows 
It uses [TableHeadRowForExpandRows](#tableheadrowforexpandrows), [TableBodyWithExpandRows](#tablebodywithexpandrows) and [TableRowWithExpandContent](#tablerowwithexpandcontent)

    (
      <Table>
        <TableHeadRowForExpandRows>
          <th>Title</th>
          <th>Title</th>
          <th>Title</th>
        </TableHeadRowForExpandRows>
        <TableBodyWithExpandRows allowMultipleExpanded>
          <TableRowWithExpandContent id="id-1" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent id="id-2" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
          <TableRowWithExpandContent id="id-3" expandContent="hello world">
            <td>Content</td>
            <td>Content</td>
            <td>Content</td>
          </TableRowWithExpandContent>
        </TableBodyWithExpandRows>
      </Table>
    )