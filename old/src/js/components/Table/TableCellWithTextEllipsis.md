### Example of table with td with overflow content
It uses [TableHeadRow](#tableheadrow) and [TableCellWithTextEllipsis](#TableCellWithTextEllipsis)

    const initialState = { 
      text: 'Lorem ipsum. Almost truncated. Almost truncated. Almost truncatee truncatee truncteee'
    };
    
    const onChange = e => setState({text:e.target.value});
   
    
    (
      <div>     
        <br/>      
        <Table isRowsStriped>
          <TableHeadRow>
            <th>Max pages</th>
            <th>Text</th>
          </TableHeadRow>
          <tbody>            
            <tr>              
              <td width="500px">Next cell into right is ellipsed after 2 lines</td>
              <TableCellWithTextEllipsis key={state.step} width="250px" maxLines={2}>
                {state.text}
              </TableCellWithTextEllipsis>
            </tr>                                                
            <tr>              
              <td width="500px">Next cell into right is ellipsed after 1 line</td>
              <TableCellWithTextEllipsis key={state.step} width="250px" maxLines={1}>
                {state.text}
              </TableCellWithTextEllipsis>
            </tr>
            <tr>              
              <td width="500px">Next cell into right is ellipsed after 3 lines</td>
              <TableCellWithTextEllipsis key={state.step} width="250px" maxLines={3}>
                {state.text}
              </TableCellWithTextEllipsis>
            </tr>           
          </tbody>
        </Table>
        <div>
          <p><b>Edit text in cells</b></p>
          <textarea cols="50" rows="3" onChange={onChange} value={state.text}/>
        </div>
      </div>
    )
    
### Comparision of usage `td` + [MultilineEllipsisPopover](#multilineellipsispopover)

    (
          <div>     
            <br/>      
            <Table isRowsStriped>
              <TableHeadRow>
                <th>Max pages</th>
                <th>Text</th>
              </TableHeadRow>
              <tbody>            
                <tr>              
                  <td width="500px">1 line with `TableCellWithTextEllipsis`</td>
                  <TableCellWithTextEllipsis key={state.step} width="250px" maxLines={1}>
                    Shipmates sing from courages like evil fishs. Gar, fine sea. go to haiti.
                  </TableCellWithTextEllipsis>
                </tr>                                                
                <tr>              
                  <td width="500px">1 line with `td` + `MultilineEllipsisPopover`</td>
                  <td key={state.step} width="250px">
                    <MultilineEllipsisPopover maxLines={1}>
                      Shipmates sing from courages like evil fishs. Gar, fine sea. go to haiti.
                    </MultilineEllipsisPopover>
                  </td>
                </tr>                           
              </tbody>
            </Table>          
          </div>
        )
