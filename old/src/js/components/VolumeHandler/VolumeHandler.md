## Volume handler

Example of VolumeHandler component:

    const initialState = { volume: 200 };
    const onChange = (volume) => {
      setState({volume});
    };

    <VolumeHandler value={state.volume} max={1000} onChange={onChange}/>

## Volume handler with label

Example of VolumeHandler component with VolumeLabel:

    const initialState = { volume: 100 };

    const onChange = (volume) => {
      setState({volume});
    };

    const valueChanged = (value) => {
      const volume = Number(value);

      setState({volume});
    };

    <VolumeHandler value={state.volume} max={1000} onChange={onChange}>
      <VolumeLabel value={state.volume} max={1000} onValueChanged={valueChanged}/>
    </VolumeHandler>

Example of VolumeHandler component with VolumeLabel with persistent units:

        const initialState = { volume: 100 };

        const onChange = (volume) => {
          setState({volume});
        };

        const valueChanged = (value) => {
          const volume = Number(value);

          setState({volume});
        };

        <VolumeHandler value={state.volume} max={40000} onChange={onChange}>
          <VolumeLabel value={state.volume} max={40000} onValueChanged={valueChanged} showUnitsOnEdit={true} />
        </VolumeHandler>
