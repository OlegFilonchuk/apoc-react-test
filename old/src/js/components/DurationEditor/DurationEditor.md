# Example

    const initialState = {
      point: { name: 'lonely point', x: 50, y: 15 },
      showInput: false
    };

    const show = () => {
      setState({showInput: true})
    };

    const hide = () => {
      setState({showInput: false})
    };

    (
      <div style={{position:'relative',height:100 + 'px' }}>
        <button onClick={show}>Show</button>
        <button onClick={hide}>Hide</button>
        <DurationEditor point={state.point} showInput={state.showInput}/>
      </div>
    )

# Example with callback

    const initialState = {
      point: { name: 'you can move me', x: 50, y: 15 },
      showInput: true
    };

    const show = () => {
      setState({showInput: true})
    };

    const onInputChange = seconds => {
      const newPoint = Object.assign(state.point, {x: seconds})
      setState({point: newPoint});
    };

    (
      <div style={{position:'relative',height:100 + 'px' }}>
        <button onClick={show}>Show</button>
        <span>Value in seconds: {state.point.x}</span>
        <DurationEditor point={state.point} showInput={state.showInput} onInputChange={onInputChange}/>
      </div>
    )
