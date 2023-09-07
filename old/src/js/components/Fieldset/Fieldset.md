## Simple Fieldset

    (
      <div className="sc-form sc-horizontal">
        <Fieldset>
          <Label required>Name</Label>
          <Input placeholder="You must provide name" />
        </Fieldset>
      </div>
    )

## Nested Fieldsets

    (
      <div className="sc-form sc-horizontal">
        <Fieldset>
          <Label required>Name</Label>
          <Input placeholder="You must provide name" />
        </Fieldset>
        <Fieldset>
          <Label className="for-description">Description</Label>
          <Description placeholder="You must provide description" />
        </Fieldset>
        <Fieldset>
          <Label>Toggle</Label>
          <ToggleButton toggleSize="md" />
          <Fieldset>
            <Label>Proxy</Label>
            <Input className="sc-input-width-sm" />
          </Fieldset>
          <Fieldset>
            <Label>Proxy</Label>
            <Input className="sc-input-width-md" />
          </Fieldset>
          <Fieldset>
            <Label>Proxy</Label>
            <Input className="sc-input-width-sm" />
          </Fieldset>
          <Fieldset>
            <Label>Proxy</Label>
            <Input className="sc-input-width-md" />
          </Fieldset>
        </Fieldset>
        <Fieldset>
          <Label>Toggle</Label>
          <ButtonGroup>
            <Button onClick={() => true} className='sc-btn-primary-outline' isSelected>Um</Button>
            <Button onClick={() => true} className='sc-btn-primary-outline'>Like</Button>
            <Button onClick={() => true} className='sc-btn-primary-outline' isSelected>Whatever</Button>
          </ButtonGroup>
          <Fieldset>
            <Label>Proxy</Label>
            <Input className="sc-input-width-sm" />
          </Fieldset>
          <Fieldset>
            <Label>Proxy</Label>
            <Input className="sc-input-width-md" />
          </Fieldset>
        </Fieldset>
      </div>
    )

## Overwriting default grid classes

    (
      <div className="sc-form sc-horizontal">
        <Fieldset labelWrapperClassName="sc-col-sm-1" inputWrapperClassName="sc-col-sm-5">
          <Label required>Name</Label>
          <Input placeholder="You must provide name" />
        </Fieldset>
      </div>
    )

## Hide label example

    (
      <div className="sc-form sc-horizontal">
        <Fieldset>
          <Label required>Name</Label>
          <Input placeholder="You must provide name" />
        </Fieldset>
        <Fieldset>
          <Label className="for-description">Description</Label>
          <Description placeholder="You must provide description" />
        </Fieldset>
        <Fieldset>
          <Label>Toggle</Label>
          <ToggleButton toggleSize="md" />
          <Fieldset hideLabel>
            <Label>Some label</Label>
            <ButtonGroup>
              <Button onClick={() => true} className='sc-btn-primary-outline' isSelected>Um</Button>
              <Button onClick={() => true} className='sc-btn-primary-outline'>Like</Button>
              <Button onClick={() => true} className='sc-btn-primary-outline' isSelected>Whatever</Button>
            </ButtonGroup>
            <Fieldset>
              <Label>Proxy</Label>
              <Input className="sc-input-width-sm" />
            </Fieldset>
            <Fieldset>
              <Label>Proxy</Label>
              <Input className="sc-input-width-md" />
            </Fieldset>
          </Fieldset>
        </Fieldset>
      </div>
    )

