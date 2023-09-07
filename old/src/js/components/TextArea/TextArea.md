## TextArea examples

Simple usage of the **TextArea** component:

    (
      <div>
        <TextArea />
      </div>
    )

**TextArea** with default value (uncontrolled):

    (
      <div>
        <TextArea defaultValue="some default value"/>
      </div>
    )

**TextArea** with placeholder:

    (
      <div>
        <TextArea placeholder="Enter your description here"/>
      </div>
    )

**TextArea** as controlled component:

    const initialState = {
      value: 'TextArea text here'
    };

    const onChange = e => {
      setState({ value: e.target.value })
    };

    (
      <div>
        <TextArea
          onChange={onChange}
          value={state.value}
        />
      </div>
    )
