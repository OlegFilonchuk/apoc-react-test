## Basic SelectableOptionsList usage

    const initialState = {
      options: ['Test1', 'Test2', 'Test3'],
      optionsAdded: []
    };


    const onOptionAdd = (addedOption) => {
      setState({
        ...state,
        optionsAdded: [...state.optionsAdded, addedOption]
      });
    };

    const onOptionRemove = (optionForRemove) => {
      setState({
        ...state,
        optionsAdded: [...state.optionsAdded].filter(option => option !== optionForRemove)
      });
    };

    (
      <SelectableOptionsList
        wrapperClassName="select-table-items-list"
        options={state.options}
        optionsAdded={state.optionsAdded}
        defaultCountMessage="Tests Added"
        plural="Tests"
        placeholder="Search Tests"
        required
        onOptionAdd={onOptionAdd}
        onOptionRemove={onOptionRemove}
        countMessage={{
          single: 'Test Added',
          plural: 'Tests Added'
        }}
      />
    )

## SelectableOptionsList with extended layout

    const initialState = {
      options: ['Test1', 'Test2', 'Test3', 'Test4'],
      optionsAdded: []
    };


    const onOptionAdd = (addedOption) => {
      setState({
        ...state,
        optionsAdded: [...state.optionsAdded, addedOption]
      });
    };

    const onOptionRemove = (optionForRemove) => {
      setState({
        ...state,
        optionsAdded: [...state.optionsAdded].filter(option => option !== optionForRemove)
      });
    };

    (
      <SelectableOptionsList
        wrapperClassName="extended-labels-enabled"
        options={state.options}
        optionsAdded={state.optionsAdded}
        defaultCountMessage="Tests Added"
        plural="Tests"
        placeholder="Search Supported Options"
        rightModuleListItemButtonClass="sc-icon-circle-remove-btn"
        onOptionAdd={onOptionAdd}
        onOptionRemove={onOptionRemove}
        messageForSelectedOptions="Selected Options"
        messageForAvailableOptions="Available Options"
        rightModuleEmptyMessage="Select Supported Options"
        requiredOnSelected
        countMessage={{
          single: 'Test Added',
          plural: 'Tests Added'
        }}
      />
    )
