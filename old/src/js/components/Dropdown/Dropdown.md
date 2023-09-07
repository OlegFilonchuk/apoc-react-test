## Necessary sub components are
* [DropdownOption](#dropdownoption)
* [DropdownOptionLink](#dropdownoptionlink)
* [DropdownButton](#dropdownbutton)

## Example of dropdown with link options. Works as _Link Menu_ from Chameleon
It uses [DropdownOptionLink](#dropdownoptionlink) and [DropdownButton](#dropdownbutton)

    function alertMe(e) {
      e.preventDefault(); //prevents from navigating away from this page
      console.log(e.target);
      const linkElement = e.target.closest('a');
      const href = linkElement.href;

      console.log(`You have clicked an option! Href attribute is: ${href}`) ;
    };

    function callbackFn() {
      console.log('Dropdown state changed');
    }

    (
      <div>
        <label>Label not connected with dropdown.</label>
        <Dropdown onChange={callbackFn} button={<DropdownButton>asdasd</DropdownButton>}>
          <DropdownOptionLink href="#first-link" label="adasas" onClick={alertMe}/>
          <DropdownOptionLink href="#second-link" label={<span><i>Second</i>&nbsp;<b>option</b></span>} onClick={alertMe}/>
          <DropdownOptionLink href="#third-link" label="Third option" onClick={alertMe}/>
        </Dropdown>
      </div>
    )

## Example of dropdown with full width rendering
It uses [DropdownOptionLink](#dropdownoptionlink) and [DropdownButton](#dropdownbutton)


    <div style={{width: '500px'}}>
      <Dropdown name="some_name" onChange={() => true} button={<DropdownButton>Select an option</DropdownButton>} fullWidth>
        <DropdownOption value="walnut-cake" label="Try chopping."/>
        <DropdownOption value="futility" label="To some, a lover is a futility for realizing."/>
        <DropdownOption value="cheescake" label="Try crushing onion."/>
        <DropdownOption value="dente-platter" label="For a salted al dente platter, add some milk and curry."/>
      </Dropdown>
    </div>

## Example of searchable dropdown with full width rendering
It uses [DropdownOptionLink](#dropdownoptionlink) and [DropdownButton](#dropdownbutton)


    <div style={{width: '500px'}}>
      <Dropdown name="some_name" onChange={() => true} filterable button={<DropdownButton>Select an option</DropdownButton>} fullWidth>
        <DropdownOption value="walnut-cake" label="Try chopping."/>
        <DropdownOption value="futility" label="To some, a lover is a futility for realizing."/>
        <DropdownOption value="cheescake" label="Try crushing onion."/>
        <DropdownOption value="dente-platter" label="For a salted al dente platter, add some milk and curry."/>
      </Dropdown>
    </div>


## Example of dropdown that works as a _Select Menu_ from Chameleon
It uses [DropdownOption](#dropdownoption) and [DropdownButton](#dropdownbutton)

    function setValueOfSecondDropdown(valueOfSecondDropdown) {
        setState({ valueOfSecondDropdown });
    }

    <div>
      <p style={{fontSize: '0.8em'}}>Current value of example dropdown is: {JSON.stringify(state.valueOfSecondDropdown)}</p>
      <label htmlFor="dropdown12331">Clickable label</label>
      <Dropdown
        button={<DropdownButton id="dropdown12331"/>}
        onChange={setValueOfSecondDropdown}
        name="some_name"
      >
        <DropdownOption value="walnut-cake" label="Try chopping walnut cake enameled with mint sauce."/>
        <DropdownOption value="futility" label="To some, a lover is a futility for realizing."/>
        <DropdownOption value="cheescake" label="Try crushing onion cheesecake decorateed with BBQ sauce."/>
        <DropdownOption value="dente-platter" label="For a salted al dente platter, add some milk and curry."/>
      </Dropdown>
    </div>

## Example how to update DropdownButton label when Dropdown children prop was changed
It uses [DropdownOption](#dropdownoption) and [DropdownButton](#dropdownbutton)

    function changeChildren() {
      setState({
        index: state.index ? 0 : 1
      });
    }

    function callbackFn() {
      console.log('Dropdown state changed');
    }

    const initialState = {
      index: 0
    };

    (
      <div>
        <p style={{fontSize: '0.8em'}}>To update children list needs to change <code>key</code></p>
        <Button className="sc-btn-default" onClick={changeChildren}>Change list</Button>
        <Dropdown
          onChange={callbackFn}
          key={state.index}
          button={<DropdownButton id="dropdown12331"/>}
          name="some_name"
        >
          {[
            [
              <DropdownOption key="value-1" value="walnut-cake" label="List 1. Value 1"/>,
              <DropdownOption key="value-2" value="futility" label="List 1. Value 2"/>,
              <DropdownOption key="value-3" value="cheescake" label="List 1. Value 3"/>,
              <DropdownOption key="value-4" value="dente-platter" label="List 1. Value 4"/>
            ],[
              <DropdownOption key="value-1" value="walnut-cake" label="List 2. Value 1"/>,
              <DropdownOption key="value-2" value="futility" label="List 2. Value 2"/>,
              <DropdownOption key="value-3" value="cheescake" label="List 2. Value 3"/>,
              <DropdownOption key="value-4" value="dente-platter" label="List 2. Value 4"/>
            ]
           ][state.index]}
        </Dropdown>
      </div>
    )

## Change selected option from the outside

    initialState = {
      index: 1
    }

    function log(option) {
        setState({ index: +option.value })

    }

    function selected(i) {
      return state.index === i;
    }

    function changeSelected(e) {
      if (e.target.value) {
        setState({ index: +e.target.value })
      }
    }

    <div>
      <label>Change selected option index for the dropdown below</label>
      <select style={{display:'block', marginBottom:'10px'}} value={state.index} onChange={changeSelected} >
        <option value="0">Option 0</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      <Dropdown
        button={<DropdownButton />}
        onChange={log}
        name="some_name"
      >
        <DropdownOption value="0" label="Option 0" selected={selected(0)}/>
        <DropdownOption value="1" label="Option 1" selected={selected(1)}/>
        <DropdownOption value="2" label="Option 2" selected={selected(2)}/>
        <DropdownOption value="3" label="Option 3" selected={selected(3)}/>
      </Dropdown>
    </div>

