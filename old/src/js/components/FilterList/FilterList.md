The component is intended to be used as controlled component. It does not keep its own state.

## FilterList static example

    const options = [
      {name: 'Business Systems', value: 'value1'},
      {name: 'iPhone', value: 'value2'},
      {name: 'Imported Scenarios', value: 'value3'},
      {name: 'Social Networking', value: 'value4'}
    ];

    <div>
        Filtering by: <FilterList options={options} />
    </div>

## FilterList editable example

    const options = [
      {name: 'Business Systems', value: 'value1'},
      {name: 'iPhone', value: 'value2'},
      {name: 'Imported Scenarios', value: 'value3'},
      {name: 'Social Networking', value: 'value4'}
    ];
    const resetOptions = () => {
      setState({options: [...options]});
    };
    const onChange = (options) => {
      setState({options: [...options]})
    };
    initialState = {options: [...options]};

    <div>
        <Button onClick={resetOptions} className="sc-btn-primary">restore options</Button><br /><br />
        Filtering by: <FilterList options={state.options} onChange={onChange} />
    </div>