## Collapse Group

Simple collapse group aka. accordion.

    const firstTitle = 'Title';
    const secondTitle = 'Title2';
    const callbackFn = () => {
      console.log('Collapse toggled');
    };

    (
        <CollapseGroup>
            <Collapse onToggled={callbackFn} title={firstTitle} >
                First collapse body
            </Collapse>
            <Collapse onToggled={callbackFn} isCollapsed={false} title={secondTitle}>
                Second collapse body
            </Collapse>
        </CollapseGroup>
    )

### Allow opening multiple collapse elements

    const firstCollapse = 'First';
    const secondCollapse = 'Second';
    const thirdCollapse = 'Third';
    
    (
        <CollapseGroup allowMultipleOpened>
            <Collapse isCollapsed={false} title={firstCollapse} >
                First collapse body
            </Collapse>
            
            <Collapse title={secondCollapse}>
                Second collapse body
            </Collapse>
                        
            <Collapse isCollapsed={false} title={thirdCollapse}>
                Third collapse body
            </Collapse>
        </CollapseGroup>
    )
