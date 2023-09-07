### Example

    function onMultiselectChange(filterState) {
      const multiSelectValue = Array.from(filterState).map( (nameAndIsChecked, index) => {
        const name = nameAndIsChecked[0];
        const isChecked = nameAndIsChecked[1];
        return (
          <span key={index}>
            {name} : {isChecked.toString()} : {name}
            <br/>
          </span>
        )
      });

      setState({multiSelectValue});
    }

    function onCheckboxChange(e) {
      setState({checkboxValue : `${e.target.name}-${e.target.checked}`});
    }

    <div>
      <p>Multiselect</p>
      <Multiselect
        onChange={onMultiselectChange}
      >
        <Checkbox
          label={'Why does the cloud whine?'}
          defaultChecked
          onChange={onCheckboxChange}
        />
        <Checkbox
          label={'Well, yer not fighting me without a life!'}
          defaultChecked={false}
        />
        <Checkbox
          label={'Where is the golden girl?'}
          defaultChecked
          disabled
        />
        <Checkbox
          label={'How coal-black. You crush like a cloud.'}
          defaultChecked={false}
          disabled
        />
      </Multiselect>
      <p>Multiselect onChange result:</p>
      <p style={{fontSize : '0.8em'}}>{state.multiSelectValue}</p>
      <p>First checkbox onChange result:</p>
      <p style={{fontSize : '0.8em'}}>{state.checkboxValue}</p>
    </div>


### Example with bi-directional data flow

    const initialState = {
      isFirstChecked: false,
      isSecondChecked: false,
      booleanValue: false
    }

    function onMultiselectChange(mapKeysValues){
      setState({
        isFirstChecked: mapKeysValues.get('first'),
        isSecondChecked: mapKeysValues.get('second')
      })
    }

    function toggleFirstCheckbox(){
      setState({
        isFirstChecked: !state.isFirstChecked,
      })
    }

    function toggleSecondCheckbox(){
      setState({
        isSecondChecked: !state.isSecondChecked,
      })
    }

    function toggleBooleanValue(){
      setState({
        booleanValue: !state.booleanValue,
      })
    }

    <div>
      <Multiselect onChange={onMultiselectChange}>
        <Checkbox
          label={'Why does the cloud whine?'}
          name="first"
          checked={state.isFirstChecked}
        />
        <Checkbox
          label={'Well, yer not fighting me without a life!'}
          name="second"
          checked={state.isSecondChecked}
        />
       </Multiselect>
       <p>
         Is first checked: {String(state.isFirstChecked)}
       </p>
       <p>
         Is second checked: {String(state.isSecondChecked)}
       </p>
       <button onClick={toggleFirstCheckbox}>Toggle first checkbox</button>
       <button onClick={toggleSecondCheckbox}>Toggle second checkbox</button>
    </div>
    
### Example without horizontal lines between checkboxes

 

    <Multiselect onChange={()=>null} noVerticalLines>
      <Checkbox
        label={'Why does the cloud whine?'}
        name="first"
        checked={false}
      />
      <Checkbox
        label={'Well, yer not fighting me without a life!'}
        name="second"
        checked={true}
      />
      <Checkbox
        label={'The klingon resists nuclear flux like an apocalyptic particle!'}
        name="second"
        checked={true}
      />
     </Multiselect>       
