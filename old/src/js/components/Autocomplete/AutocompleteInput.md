Purpose of this component is to be used together with Autocomplete.

## Standalone example

    <AutocompleteInput
      onChange={() => { console.log('Value changed') }}
      onClick={() => { console.log('Input clicked') }}
      value="some value"
      isExpanded={false}
    />
