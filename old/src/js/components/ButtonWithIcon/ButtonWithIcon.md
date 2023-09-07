## Example of ButtonWithIcon

Simple button example:

    (
      <ButtonWithIcon iconClassName="sc-icon-circle-remove-btn">I'm a remove button</ButtonWithIcon>
    )
    
Chameleon buttons example:
    
    (
      <div>
        <ButtonWithIcon className="sc-btn sc-btn-success" iconClassName="sc-icon-download">I'm a success button</ButtonWithIcon>
        <br />
        <ButtonWithIcon className="sc-btn sc-btn-primary" iconClassName="sc-icon-disk">I'm a save button</ButtonWithIcon>
        <br />
        <ButtonWithIcon className="sc-btn sc-btn-error-outline" iconClassName="sc-icon-trash-closed">I'm a delete button</ButtonWithIcon>
        <br />
        <ButtonWithIcon isLinkView iconClassName="sc-icon-replay">I'm a delete button</ButtonWithIcon>
      </div>
      
    )    
    
Custom button example:

    const createButtonWithIcon = require('./createButtonWithIcon').default;
    const DropdownButtonWithIconComponent = createButtonWithIcon(DropdownButton);
    const DropdownButtonWithIcon = props => <DropdownButtonWithIconComponent {...props} />;
    
    (
      <div>
        <label>Dropdown button with icon</label>
        <Dropdown onChange={() => false} button={<DropdownButtonWithIcon iconClassName="sc-icon-user-management">John D.</DropdownButtonWithIcon>}>
          <DropdownOptionLink href="#first-link" label="Sign out" />
        </Dropdown>
      </div>
      
    )
