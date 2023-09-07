# Basic example of handling clicking on label

    const onClick = () => {
      setState({ inEditMode: true });
    }

    const onSubmit = () => {};
    const onCanceled = () => {};

    (
      <EditableLabel onClick={onClick} inEditMode={state.inEditMode} onSubmit={onSubmit} onCanceled={onCanceled}>
        Hello there
      </EditableLabel>
    )

# Example of using onSubmit and onCanceled callbacks

    const initialState = {
      value: 'Initial Value'
    };

    const onClick = () => {
      setState({ inEditMode: true });
    };

    const onSubmit = newValue => {
      console.log(`I was updated to ${newValue}`);

      setState({ value: newValue, inEditMode: false });
    };

    const onCanceled = newValue => {
      console.log(`I was about to be changed to ${newValue} but user canceled`);

      setState({ inEditMode: false });
    };

    (
      <EditableLabel onClick={onClick} inEditMode={state.inEditMode} onSubmit={onSubmit} onCanceled={onCanceled}>
        {state.value}
      </EditableLabel>
    )


# Examples of changing props from outside
    const onSubmit = () => true;
    const onCanceled = () => true;

    const initialState  = {
      inEditMode: false,
      counter: 0,
      value: 'Counter: 0'
    };

    const toggleEditMode = () => {
      const { inEditMode } = state;

      setState({ inEditMode: !inEditMode })
    };

    const increment = () => {
      const { counter } = state;
      const newCounter = counter + 1;
      const newValue = `Counter: ${newCounter}`;

      setState({ counter: newCounter, value: newValue });
    };

    const disable = () => {
      setState({ readOnly: true });
    };

    const enable = () => {
      setState({ readOnly: false });
    };

    const addError = () => {
      setState({ hasError: true });
    };

    (
      <div>
        <button onClick={toggleEditMode}>Toggle Edit</button>
        <button onClick={increment}>Increment</button>
        <button onClick={disable}>Disable</button>
        <button onClick={enable}>Enable</button>
        <button onClick={addError}>Add error class</button>
        <EditableLabel onSubmit={onSubmit} onCanceled={onCanceled} inEditMode={state.inEditMode} readOnly={state.readOnly} hasError={state.hasError}>
          { state.value }
        </EditableLabel>
      </div>
    )

# Example of sync validation
It will not submit empty value and '42'

    const initialState = {
      lastValidValue: 'Initial Value',
      value: 'Initial Value',
      hasError: false,
      errorMsg: ''
    };

    const onClick = () => {
      setState({ inEditMode: true });
    };

    const onSubmit = (value) => {
      if (value === state.lastValidValue) {
        console.log('Nothing has changed no validation needed');
        setState({ inEditMode: false });

        return;
      }

      if (value === '') {
        setState({ value, hasError: true, errorMsg: 'Should not be empty' });

        return;
      }

      if (value === '42') {
        setState({ value, hasError: true, errorMsg: 'Should not be equal to 42' });

        return;
      }

      setState({ value, lastValidValue: value,  hasError: false, inEditMode: false });
    };

    const onCanceled = () => {
      setState({ value: state.lastValidValue, inEditMode: false, hasError: false });
    };

    const renderError = () => state.hasError ? <span>{state.errorMsg}</span> : null;

    (
      <div>
        <EditableLabel onClick={onClick} inEditMode={state.inEditMode} onSubmit={onSubmit} onCanceled={onCanceled}>
         {state.value}
        </EditableLabel>
        { renderError() }
      </div>
    )

# Example of async validation
It will not submit empty value and '42'

    const initialState = {
      lastValidValue: 'Initial Value',
      value: 'Initial Value',
      hasError: false,
      errorMsg: ''
    };

    const onClick = () => {
      setState({ inEditMode: true });
    };

    const validate = (value) => {
      if (value === state.lastValidValue) {
        setState({ inEditMode: false, hasError: false, readOnly: false });

        return;
      }

      setTimeout(() => {
        let errorMsg;

        if (value === '') {
         errorMsg = 'Should not be empty';
        } else if (value === '42') {
         errorMsg = 'Should not be equal to 42';
        } else {
          setState({ value , lastValidValue: value, hasError: false, errorMsg, readOnly: false, inEditMode: false });

          return;
        }

        setState({ value , hasError: true, errorMsg, readOnly: false, inEditMode: true });

      }, 2000);
    }

    const onSubmit = value => {
      setState({ readOnly: true });
      validate(value);
    };

    const onCanceled = () => {
      setState({ value: state.lastValidValue, inEditMode: false, hasError: false });
    };

    const renderError = () => state.hasError ? <span>{state.errorMsg}</span> : null;

    (
      <div>
        <EditableLabel onClick={onClick} inEditMode={state.inEditMode} onSubmit={onSubmit} onCanceled={onCanceled} readOnly={state.readOnly}>
         {state.value}
        </EditableLabel>
        { renderError() }
      </div>
    )
