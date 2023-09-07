Allow to render [`<ToggleButton>`](#togglebutton) together with [`<Popover>`](#popover) component. Thanks to that you can present user
tooltips when he is hovering cursor above the input field.

You can pass all of the [`<ToggleButton>` props](#togglebutton) to the `<ToggleButtonWithPopover>` component. 

# Example

  ```
  const initialState = {
    isOn: true,
    isDisabled: false
  };

  const changeState = () => {
    setState({
      isOn: !state.isOn
    });

    document.getElementById('toggleButtonWithPopoverConsole').innerText = `Now I'm ${!state.isOn ? 'ON': 'OFF'}`;
  };
      
  (
    <div>
      <ToggleButtonWithPopover
        tooltip="Some nice and helpfull text for the user" 
        isOn={state.isOn}
        onSwitch={changeState}
      />
      <div id="toggleButtonWithPopoverConsole"></div>
    </div>
  )
  ```
