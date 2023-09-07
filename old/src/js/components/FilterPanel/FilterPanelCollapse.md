## Vertical example (default)

    const { makeSomeFilters } = require('./FilterPanelExamplesTools');

    <FilterPopover>
        {makeSomeFilters(true)}
    </FilterPopover>

## Horizontal example

    const { makeSomeFilters } = require('./FilterPanelExamplesTools');
    
    <FilterPopover horizontal>
        {makeSomeFilters(true)}
    </FilterPopover>
