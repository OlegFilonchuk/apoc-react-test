### Example

    const initialState = { 
      text: 'Why does the wench fall? The swashbuckling sea swiftly burns the scallywag. The gibbet loves with hunger, crush the bikini atoll before it dies'
    };
    
    const onChange = e => setState({text:e.target.value});  
        
    <div>
      <div style={{display: 'flex', flexOrder: 'column', justifyContent: 'space-around'}}>
        <div style={{backgroundColor: 'white'}}>
          <b>Single line</b>
          <MultilineEllipsis maxLines={1}>
            {({ellipsisRef})=><span ref={ellipsisRef} style={{width: 100}}>
              Lorem ipsumsssad
            </span>
            }
          </MultilineEllipsis>
        </div>
        <div style={{backgroundColor: 'white'}}>
          <b>Three lines</b>
          <MultilineEllipsis maxLines={3}>
            {({ellipsisRef})=><span ref={ellipsisRef} style={{width: 100}}>
              Why does the wench fall? The swashbuckling sea swiftly burns the scallywag.
              The gibbet loves with hunger, crush the bikini atoll before it dies.
            </span>
            }
          </MultilineEllipsis>
        </div>
        <div style={{backgroundColor: 'white'}}>
          <b>Ten lines</b>
          <MultilineEllipsis maxLines={10}>
            {({ellipsisRef})=><span ref={ellipsisRef} style={{width: 100}}>
              Why does the wench fall? The swashbuckling sea swiftly burns the scallywag.
              The gibbet loves with hunger, crush the bikini atoll before it dies.
            </span>
            }
          </MultilineEllipsis>
        </div>
      </div>
      <div style={{display: 'flex', flexOrder: 'column', justifyContent: 'space-around'}}>
        <div style={{backgroundColor: 'white'}}>
          <b>Ten lines and colored if ellipsed</b>
          <MultilineEllipsis maxLines={10}>
            {({ellipsisRef, ellipsed})=> <span 
              ref={ellipsisRef} 
              style={{width: 100, color: ellipsed? 'red': 'black'}}
            >
              {state.text}
            </span>
            }
          </MultilineEllipsis>
        </div>
        <div>
          <div><b>Edit text for column in the left</b></div>
          <textarea cols="50" rows="3" onChange={onChange} value={state.text}/>
        </div>
      </div>
    </div>

