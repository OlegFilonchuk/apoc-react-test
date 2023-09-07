## Chameleon input\[type="checkbox"\]
This is example of checkbox which is just static html and css from Chameleon.

    <div className="sc-checkbox">
      <label>
        <input type="checkbox"/>
        Check me out
      </label>
    </div>

## Checkbox
Following are examples of Checkbox react component, which is in fact
a wrapper of html element:

```html
<input type="checkbox"/>
```

with no changes in functionality comparing to original `input`.
All non-Checkbox specific props passed to `Checkbox` are passed to `input`.

### Label position

By default, label position is to the right

    <div>
      <Checkbox label="Lorem ipsum"/>
    </div>

### Label position to the left
Position can be changed using `labelPosition` prop. All possible
values are stored in `labelPositions` map. It can be imported in following
way:

```html
import Checkbox, {labelPositions} from 'apoc-react/Checkbox';

```

    const labelPositions = require('./Checkbox').labelPositions;

    <Checkbox label="Lorem ipsum" labelPosition={labelPositions.left}/>

### Disabled

    <div>
      <Checkbox label="Lorem ipsum" disabled/>
    </div>

### Full width

    <div>
      <Checkbox label="Lorem ipsum" fullWidth/>
    </div>

### Checked by default

    <div>
      <Checkbox label="Lorem ipsum" defaultChecked/>
    </div>

### Passing additional attributes
Specific to `input` element

    const onCheckboxChange = e => {
      setState({
        checkboxValue: `${e.target.name}:${e.target.value}`,
        checkboxChecked: `${e.target.checked}`
      });
    };

    (
      <div>
        <p>Current value is: {state.checkboxValue}</p>
        <p>Is checked: {state.checkboxChecked}</p>
        <Checkbox name={'foo'} onChange={onCheckboxChange} label={'Click me!'} value="IamSelected" />
      </div>
    )

### Passing element as a title
The `title` prop can accept element instead of string,

    <div>
      <Checkbox
        label={(
          <span>
            <b>Strong title</b>{'\u00A0'}
            <i>italic part</i>{'\u00A0'}
            <u>part with underline</u>
          </span>
        )}
      />
    </div>

### Bi-directional flow of checked state. Changing state from the outside of Checkbox component.
The `title` prop can accept element instead of string,

    const initialState = { isChecked : false }

    function toggleCheckbox(){
      setState({isChecked: !state.isChecked});
    };

    function onCheckboxChange(e){
      setState({isChecked: e.target.checked});
    };

    (
      <div>
        <Checkbox
          label="This is checkbox"
          checked={state.isChecked}
          onChange={onCheckboxChange}
        />
        <br/>
        <p><span>Is checked?: {String(state.isChecked)}</span></p>
        <br/>
        <button onClick={toggleCheckbox}>Toggle checkbox</button>
      </div>
    )

### With title hint
    <div>
      <Checkbox label="Lorem ipsum" showHint={true} tooltip="some example hint" />
    </div>

### Only checkbox clickable example

By default, label position is to the right

    <div>
      <Checkbox label="Lorem ipsum" isOnlyCheckboxClickable/>
    </div>
