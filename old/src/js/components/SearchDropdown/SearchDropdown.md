## Simple SearchDropdown

    const list = [{ label: 'first', value: 'fr' }, { label: 'second', value: 'sc' }, { label: 'third', value: 'th' }, { label: 'second first', value: 'sf' }, { label: 'third again', value: 'ta' }];

    const initialState = {
      list
    };

    function searchBoxChange(value) {
      const newList = list.filter(e => e.label.includes(value));

      setState({ list: newList });
    }

    function onOptionClick(value) {
      console.log(value, ' clicked');
    }

    (
      <SearchDropdown
        name="simple-example-dropdown"
        results={state.list}
        onSearchChange={searchBoxChange}
        onDropdownChange={onOptionClick}
      />
    )

## Simple SearchDropdown with empty results list

    const list = [];

    const initialState = {
      list
    };

    (
      <SearchDropdown name="empty-result-dropdown" results={state.list} />
    )

## Simple SearchDropdown with custom search icon

    const list = [];

    const initialState = {
      list
    };

    (
      <SearchDropdown name="empty-result-dropdown" results={state.list} searchIcon={<i className="sc-icon-down-arrow search-dropdown--icon " />} />
    )

## SearchDropdown with allowDynamicOptions

    const list = [{ label: 'first', value: 'fr' }, { label: 'second', value: 'sc' }, { label: 'third', value: 'th' }, { label: 'second first', value: 'sf' }, { label: 'third again', value: 'ta' }];

    const initialState = {
      list,
      searchValue: ''
    };

    function searchBoxChange(event) {
      setState({
        searchValue: event.target.value
      });
    }

    function onOptionClick({value, label}) {
      console.log(value, ' clicked');

      setState({
        list: [...state.list, { value, label }]
      });
    }

    (
      <SearchDropdown
        name="simple-example-dropdown"
        results={state.list}
        onSearchChange={searchBoxChange}
        onDropdownChange={onOptionClick}
        allowDynamicOptions
        searchValue={state.searchValue}
      />
    )
