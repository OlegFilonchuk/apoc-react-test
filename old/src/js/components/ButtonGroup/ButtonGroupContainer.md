## Basic group

    const isDisabled = true;
    const isLicenseMissing = true;
    const value = { id: 'freoifaeorf' };

    function callbackFn(value) {
        const text = JSON.stringify(value)
        document.getElementById('button-group-demo-2').textContent = `You have clicked on option with value "${text}"`;
    }

    function onClick() {
      console.log('Button from ButtonGroupContainer clicked');
    }

    (<div>
        <ButtonGroupContainer onChange={callbackFn} selectedIndex={0}>
          <Button onClick={onClick} value={value}>Option 1</Button>
          <Button onClick={onClick} value="id">Option 2</Button>
          <Button onClick={onClick} disabled={isDisabled}>Option 3</Button>
          <Button onClick={onClick} disabled={isLicenseMissing} isLicenseMissing={true}>Option 4</Button>
        </ButtonGroupContainer>

        <p id="button-group-demo-2">
            Please click button!
        </p>
    </div>)

## Change selected button from the outside

    initialState = {
      index: 0
    }

    function log(option) {
        setState({ index: +option.value })

    }

    function isSelected(i) {
      return state.index === i;
    }

    function changeSelected(e) {
      if (e.target.value) {
        setState({ index: +e.target.value })
      }
    }

    const fakeHandler = () => true;

    (<div>
        <label>Change selected option index for the dropdown below</label>
        <select style={{display:'block', marginBottom:'10px'}} value={state.index} onChange={changeSelected} >
          <option value="0">Option 0</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <ButtonGroupContainer
          selectedIndex={state.index}
          onChange={fakeHandler}
        >
          <Button onClick={fakeHandler} value="someValue">Option 0</Button>
          <Button onClick={fakeHandler} value="id">Option 1</Button>
          <Button onClick={fakeHandler}>Option 2</Button>
          <Button onClick={fakeHandler}>Option 3</Button>
        </ButtonGroupContainer>
    </div>)
