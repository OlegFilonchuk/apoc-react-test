## FilterPopover examples

    const { makeSomeFilters } = require('../FilterPanel/FilterPanelExamplesTools');
    const labelTextStyle = {
        display: 'inline-block',
        width: '15em'
    };

    <div>
         <div>
            <span style={labelTextStyle}>with some filters: </span>
            <FilterPopover>
                {makeSomeFilters()}
            </FilterPopover>
        </div>
        <div>
            <span style={labelTextStyle}>with some collapsible filters:  </span>
            <FilterPopover>
                {makeSomeFilters(true)}
            </FilterPopover>
        </div>
        <div>
            <span style={labelTextStyle}>horizontal non-callapsible: </span>
            <FilterPopover horizontal>
                {makeSomeFilters()}
            </FilterPopover>
        </div>
         <div>
            <span style={labelTextStyle}>custom icon (title): </span>
            <FilterPopover title={<IconButton.Flag />}>
                {makeSomeFilters()}
            </FilterPopover>
        </div>
    </div>
        
