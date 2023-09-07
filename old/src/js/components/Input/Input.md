# Basic example
    (
      <Input placeholder="Please provide name" />
    )

# Password field example
    (
      <Input placeholder="Please provide name" type="password" />
    )
# Input with error
    (
      <Input hasError placeholder="Provide valid name" />
    )
# Uncontrolled component example
If you want to use Input as [uncontrolled component](https://facebook.github.io/react/docs/uncontrolled-components.html) you can provide `defaultValue` prop to set the initial value

    (
      <Input defaultValue="Some default value" />
    )

# Controlled component example
If you want to use Input as [Controlled component](https://facebook.github.io/react/docs/forms.html) you have to handle logic by yourself

    const initialState = {
      value: 'Initial Value'
    };

    const onChange = (event) => {
      const value = event.target.value;

      setState({ value });
      console.log('I have been change to: ', value);
    };

    (
      <Input value={state.value} onChange={onChange} />
    )
