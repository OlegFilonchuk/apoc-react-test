## Default MD ToggleButton

  ```
  const initialState = {
    isOn: true,
    isDisabled: false
  };

  const changeState = () => {
    setState({
      isOn: !state.isOn
    });

    document.getElementById('toggleButtonConsole').innerText = `Now I\'m ${!state.isOn ? 'ON': 'OFF'}`;
  };

  const toggleDisabledState = () => {
    setState({
      isDisabled: !state.isDisabled
    });
  };

  (
  <div>
    <div style={{ display: 'flex' }}>
      <ToggleButton
        isOn={state.isOn}
        isDisabled={state.isDisabled}
        onSwitch={changeState}
        errorMessage="Example error message"
      />

      <button
        onClick={changeState}
        style={{ marginLeft: '10px' }}
      >
        Change Toggle State
      </button>

      <div style={{ padding: '9px 0', marginLeft: '10px' }}>
        <input
          type="checkbox"
          onChange={toggleDisabledState}
        />

        <label style={{ marginLeft: '5px' }}>isDisabled</label>
      </div>
    </div>

    <div id="toggleButtonConsole"></div>
  </div>
  )
  ```

## Sizes

  ```
  const initialState = {
    toggleLgIsOn: true,
    toggleMdIsOn: true,
    toggleSmIsOn: true,
    toggleXsIsOn: true
  }

  const handleChangeLg = () => {
    setState({
      toggleLgIsOn: !state.toggleLgIsOn
    });
  };

  const handleChangeMd = () => {
    setState({
      toggleMdIsOn: !state.toggleMdIsOn
    });
  };

  const handleChangeSm = () => {
    setState({
      toggleSmIsOn: !state.toggleSmIsOn
    });
  };

  const handleChangeXs = () => {
    setState({
      toggleXsIsOn: !state.toggleXsIsOn
    });
  };

  (
    <div>
      <div>
        <h3>LG</h3>
        <ToggleButton
          toggleSize="lg"
          isOn={state.toggleLgIsOn}
          onSwitch={handleChangeLg}
        />
      </div>

      <div>
        <h3>MD</h3>
        <ToggleButton
          toggleSize="md"
          isOn={state.toggleMdIsOn}
          onSwitch={handleChangeMd}
        />
      </div>

      <div>
        <h3>SM</h3>
        <ToggleButton
          toggleSize="sm"
          isOn={state.toggleSmIsOn}
          onSwitch={handleChangeSm}
        />
      </div>

      <div>
        <h3>XS</h3>
        <ToggleButton
          toggleSize="xs"
          isOn={state.toggleXsIsOn}
          onSwitch={handleChangeXs}
        />
      </div>
    </div>
  )
  ```
