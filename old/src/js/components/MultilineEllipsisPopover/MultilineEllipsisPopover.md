### Example

    const initialState = { 
      text: 'Why does the wench fall? The swashbuckling sea swiftly burns the scallywag. The gibbet loves with hunger, crush the bikini atoll before it dies'
    };
    
    const onChange = e => setState({text:e.target.value});  
        
    <div>
      <div style={{display: 'flex', flexOrder: 'column', justifyContent: 'space-around'}}>
        <div>
          <b>Single line</b>
          <div style={{width: 200, backgroundColor: 'white'}}>
            <MultilineEllipsisPopover maxLines={1}>
                Lorem ipsum bla bla bla as das asd asd as sa a a
            </MultilineEllipsisPopover>
          </div>
        </div>
        <div>
          <b>Triple line</b>
          <div style={{width: 200, backgroundColor: 'white'}}>
            <MultilineEllipsisPopover maxLines={3}>
                Lorem ipsum bla bla bla as das asd asd as sa a a
                Lorem ipsum bla bla bla as das asd asd as sa a a
            </MultilineEllipsisPopover>
          </div>
        </div>      
      </div>
      <div style={{display: 'flex', flexOrder: 'column', justifyContent: 'space-around', marginTop: 20}}>
        <div>
          <b>Ten lines</b>
          <div style={{width: 100, backgroundColor: 'white'}}>
            <MultilineEllipsisPopover maxLines={10}>
                {state.text}
            </MultilineEllipsisPopover>
          </div>
        </div>
        <div>
          <div><b>Edit text for column in the left</b></div>
          <textarea cols="50" rows="3" onChange={onChange} value={state.text}/>
        </div>
      </div>
    </div>
