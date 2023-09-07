## Basic label

Simple usage of the **Label** component:

    (
      <div>
        <Label>Simple value</Label>
      </div>
    )

## Required field label
Example of using required label along with input

    (
      <form className="sc-form sc-horizontal">
        <div className="sc-group">
          <Label className="sc-col-sm-4" required>I am required</Label>
          <Input className="sc-col-sm-7" />
        </div>
      </form>
    )

## Auto spreading native React component properties over component

You can add ie. `onClick` to component, even if it's not listed in props

    const callbackFn = () => {
      console.log('Label clicked');
    };

    (
      <div>
        <Label onClick={callbackFn}>Clickable label</Label>
      </div>
    )


## Label with children elements

You can pass elements as `<label>` children, so they will be wrapped by label tag.

    const callbackFn = () => {
      console.log('Label clicked');
    };

    (
      <div>
        <Label htmlFor="simple-button">
          Label for button
          <Button onClick={callbackFn} id="simple-button">Simple button</Button>
        </Label>
      </div>
    )
