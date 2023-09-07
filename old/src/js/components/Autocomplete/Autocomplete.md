## Simple Autocomplete

    const options = [
      { label: 'first', value: 'first' },
      { label: 'second', value: 'second' },
      { label: 'third', value: 'third' }
    ];

    const value = "third";

    const initialState = {
      options,
      value
    };

    function autocompleteChange(value) {
      setState({ value });
    }

    (
      <Autocomplete
        name="simple-example-autocomplete"
        options={state.options}
        value={state.value}
        onChange={autocompleteChange}
      />
    )

## Simple Autocomplete with empty options list
    const options = [];

    const initialState = {
      options
    };

    (
      <Autocomplete name="empty-result-dropdown" options={state.list} />
    )
