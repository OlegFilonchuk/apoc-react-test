# Basic example
A configuration must be provided with the fields information (label, suffix, enable state, value and column) and the enable state of the main toggle.

  ```
  const config = {
    enabled: true,
    fields: {
      SimUsersBorn:  { id:'SimUsersBorn', label: 'SimUsers Born', suffix: "SimUsers", enabled: false, value: 4000, column: 1 },
      SimUsersBirthRate:  {id:'SimUsersBirthRate', label: 'SimUsers Birth Rate', suffix: "SimUsers/Sec", enabled: true, value: 4000, column: 1 },
      OpenConnections:  {id:'OpenConnections', label: 'Open Connections', suffix: "Connections", enabled: true, value: 4,  column: 2 }
    }
  };

  const onValueChanged = (field, value) => {
    return console.log("F:" + field + "   v:" + value);
  };

  (
    <LoadConstraintPanel config={config} onValueChanged={onValueChanged}/>
  )
  ```
