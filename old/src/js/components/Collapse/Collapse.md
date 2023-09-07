## Collapse

# Basic Collapse

      const title = 'Title';
      const callbackFn = () => {
        console.log('Collapse toggled');
      };

      (
        <Collapse title={title} onToggled={callbackFn}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Collapse>
      )

# Collapse with right caret opened by default

      const title = 'Title';
      const isCollapsed = false;
      const iconPositions = require('./Collapse.jsx').iconPositions;
      const callbackFn = () => {
        console.log('Collapse toggled');
      };

      (
        <Collapse title={title} isCollapsed={isCollapsed} iconPosition={iconPositions.right} onToggled={callbackFn}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Collapse>
      )

# Collapse with clickable panel onToggle event

      const title = 'Title';
      const isPanelButton = true;
      const callbackFn = () => {
        console.log ('Toggle clicked');
      };

      (
        <Collapse title={title} isPanelButton={isPanelButton} onToggled={callbackFn}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Collapse>
      )

 # Collapse with custom icons

      const title = 'Title';
      const isCollapsed = false;

      const iconStyles = {
        expanded: 'sc-icon-right-arrow',
        collapsed: 'sc-icon-down-arrow',
      };

      const callbackFn = () => {
        console.log('Collapse toggled');
      };

      (
        <Collapse title={title} isCollapsed={isCollapsed} iconStyles={iconStyles} onToggled={callbackFn}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Collapse>
      )

# Collapse controlled only externally

      const iconPositions = require('./Collapse.jsx').iconPositions;
      const initialState = {
        isOpen: false
      };

      (
        <div>
          <p><button onClick={()=>setState({isOpen:!state.isOpen})}>Toglle Collapse</button></p>
          <Collapse
            title={(
              <span>Some header</span>
            )}
            iconPosition={iconPositions.none}
            isCollapsed={!state.isOpen}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Collapse>
        </div>
      )

# Collapse with custom content

      const title = 'Title';
      const iconPositions = require('./Collapse.jsx').iconPositions;
      const callbackFn = () => {
        console.log('Collapse toggled');
      };

      (
        <Collapse
          title={title}
          onToggled={callbackFn}
          customContent={
            <React.Fragment>
              <Button onClick={() => true} disabled={true}>Disabled button</Button>
              <Button onClick={() => console.log('Button clicked!')}>Enabled button</Button>
            </React.Fragment>
          }
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Collapse>
      )
# Collapse with custom content aligned to left

      const title = 'Title';
      const iconPositions = require('./Collapse.jsx').iconPositions;
      const callbackFn = () => {
        console.log('Collapse toggled');
      };

      (
        <Collapse
          title={title}
          onToggled={callbackFn}
          iconPosition={iconPositions.right}
          customContent={
            <div style={{marginRight: 'auto'}}>
              <Button onClick={() => true} disabled={true}>Disabled button</Button>
              <Button onClick={() => true} disabled={true}>Disabled button</Button>
            </div>
          }
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Collapse>
      )
