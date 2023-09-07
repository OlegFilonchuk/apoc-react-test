## Example
Purpose of this component is to be used together with [Dropdown](#dropdown).

    function callbackFn() {
      console.log('Dropdown state changed');
    }

     <Dropdown onChange={callbackFn} name={'test'} button={<DropdownButton/>}>
        <DropdownOption
          label={<TestQueueDropdownOptionLabel color={'red'} text={'Alpha'}/>}
          value={'alpha'}
        />
        <DropdownOption
          label={<TestQueueDropdownOptionLabel color={'blue'} text={'Beta'}/>}
          value={'beta'}
        />
        <DropdownOption
          label={<TestQueueDropdownOptionLabel color={'green'} text={'Charlie'}/>}
          value={'charlie'}
          isDisabled
        />
        <DropdownOption
          label={<TestQueueDropdownOptionLabel color={'yellow'} text={'Delta'}/>}
          value={'detla'}
          isSelected
        />
      </Dropdown>
