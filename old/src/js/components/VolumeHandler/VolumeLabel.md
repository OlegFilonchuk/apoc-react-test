## Volume label

Example of VolumeLabel component:

    const initialState = { volume: 100 };

    const valueChanged = (value) => {
      const volume = Number(value);

      setState({volume});
    };

    <VolumeLabel value={state.volume} max={1000} onValueChanged={valueChanged} />
