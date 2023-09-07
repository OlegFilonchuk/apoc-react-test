## Player Duration

# Player Duration with valid and invalid callbacks

      const initialDuration = 8733;
      const maxDuration = 86400;

      const initialState = {
        message: '',
        duration: initialDuration,
        inputDuration: initialDuration,
        maxDuration: maxDuration,
        intervals: [
         600,
         1200,
         1800,
         3600,
         86400
        ]
      };

      const onDurationChange = (event) => {
        setState({ inputDuration: Number(event.target.value) });
      };

      const onDurationInputLeave = () => {
        setState({ duration: state.inputDuration });
      };

      const onPlayerDurationValid = (inputDuration) => {
        setState({
          duration: inputDuration,
          inputDuration,
          message: `I was updated with the valid value: ${inputDuration}`
        });
      };

      const onPlayerInvalid = () => {
        setState({
          message: 'I was updated but the value is invalid'
        });
      };

      (
        <div>
          <label>Set value from here:</label>
          
          <input
            type="number"
            onBlur={onDurationInputLeave}
            onChange={onDurationChange}
            value={state.inputDuration}
          />
          
          <PlayerDuration
            duration={state.duration}
            onValid={onPlayerDurationValid}
            onInvalid={onPlayerInvalid}
            maxDuration={state.maxDuration}
            intervals={state.intervals}
          />
          
          <div>{state.message}</div>
        </div>
      )

# Extended Player Duration with hidden toggle duration button and valid and invalid callbacks

      const initialDuration = 888888;

      const initialState = {
        message: '',
        duration: initialDuration,
        inputDuration: initialDuration,
      };

      const onDurationChange = (event) => {
        setState({ inputDuration: Number(event.target.value) });
      };

      const onDurationInputLeave = () => {
        setState({ duration: state.inputDuration });
      };

      const onPlayerDurationValid = (inputDuration) => {
        setState({
          duration: inputDuration,
          inputDuration,
          message: `I was updated with the valid value: ${inputDuration}`
        });
      };

      const onPlayerInvalid = () => {
        setState({
          message: 'I was updated but the value is invalid'
        });
      };

      (
        <div>
          <label>Set value from here:</label>
          
          <input
            type="number"
            onBlur={onDurationInputLeave}
            onChange={onDurationChange}
            value={state.inputDuration}
          />
          
          <PlayerDuration
            duration={state.duration}
            onValid={onPlayerDurationValid}
            onInvalid={onPlayerInvalid}
            isToggleDurationVisible={false}
            isPlayerDurationExtend={true}
          />
          
          <div>{state.message}</div>
        </div>
      )