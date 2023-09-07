## Basic Description component

Simple usage of the **Desciption** component:

    const initialState = {
      value: 'Description text here'
    };

    const onChange = e => {
      setState({ value: e.target.value })
    };

    (
      <div>
        <Description onChange={onChange} value={state.value} />
      </div>
    )

Wrapped **Desciption** with static width parent and custom maxLength

    const initialState = {
      value: 'some'
    };

    const onChange = e => {
      setState({ value: e.target.value })
    };

    (
      <div style={{width: '150px'}}>
        <Description
          maxLength={16}
          onChange={onChange}
          value={state.value}
        />
      </div>
    )

**Desciption** with placeholder:

    const onChange = e => {
      setState({ value: e.target.value })
    };

    (
      <div>
        <Description
          placeholder="Enter your description here"
          onChange={onChange}
          value={state.value}
        />
      </div>
    )
