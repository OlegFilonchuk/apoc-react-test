With this container you're responsible for implementing all the logic, for example for passing `isSelected` prop to the `Buttons` that should be selected.
If you want to have a fully working component check [ButtonGroupContainer](#buttongroupcontainer)

## Basic Example

    const isDisabled = true;
    const isLicenseMissing = true;

    const callbackFn = () => {
      console.log('Button clicked');
    };

    (<div>
        <ButtonGroup>
          <Button onClick={callbackFn} className='sc-btn-primary-outline'>Option 1</Button>
          <Button onClick={callbackFn} className='sc-btn-primary-outline' isSelected value="id">Option 2</Button>
          <Button onClick={callbackFn} className='sc-btn-primary-outline' disabled={isDisabled}>Option 3</Button>
          <Button onClick={callbackFn} className='sc-btn-primary-outline' disabled={isLicenseMissing} isLicenseMissing={true}>Option 4</Button>
        </ButtonGroup>
    </div>)

## You can have more Buttons selected

    const callbackFn = () => {
      console.log('Button clicked');
    };

    (<div>
        <ButtonGroup>
          <Button onClick={callbackFn} className='sc-btn-primary-outline' isSelected>Um</Button>
          <Button onClick={callbackFn} className='sc-btn-primary-outline'>Like</Button>
          <Button onClick={callbackFn} className='sc-btn-primary-outline' isSelected>Whatever</Button>
        </ButtonGroup>
    </div>)
