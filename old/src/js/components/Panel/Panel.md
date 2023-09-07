## Necessary sub components are
* [PanelHeader](#panelheader)
* [PanelUtils](#panelutils)
* [PanelMenu](#panelmenu)

# Panel

Simple usage of the **Panel** component:

    (
    <div>
        <Panel>
          <PanelHeader>
            <h3>Panel Title</h3>
          </PanelHeader>
          Panel Content goes here
        </Panel>
    </div>
    )

## Panel with menus

        (
        <div>
            <Panel>
              <PanelHeader>
                <PanelMenu>
                  <button type="button" className="sc-btn sc-btn-sm sc-btn-primary-outline">Button</button>
                </PanelMenu>
                <h3>Panel title</h3>
              </PanelHeader>
              Panel Content goes here
            </Panel>
        </div>
        )

## Panel with utils

        (
        <div>
            <Panel>
              <PanelHeader>
                <PanelUtils>
                  <button type="button" className="sc-btn sc-btn-sm sc-btn-primary-outline sc-btn-util">
                    <span className="sc-icon-filter"></span>
                  </button>
                </PanelUtils>
                <h3>Panel Title</h3>
              </PanelHeader>
              Panel Content goes here
            </Panel>
        </div>
        )

## Panel with modifier class

    const modifierClass = 'sc-panel-dark';

        (
        <div>
            <Panel modifierClass={modifierClass}>
              <PanelHeader>
                <h3>Panel title</h3>
              </PanelHeader>
              Panel Content goes here
            </Panel>
        </div>
        )
