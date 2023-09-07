### Should overflow left edge
And switch popover placement to the opposite. (Play with the size of the window if necessary)

    const POPOVER_PLACEMENTS = require('./../Popover/PopoverPlacements').default;
    
    (
      <div>
        <div style={{border: '1px solid black', padding: 4, width: 200,height: 200}}>
          <DynamicPopover maxWidth={600} initialPlacement={POPOVER_PLACEMENTS.TOP_RIGHT}>
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
          </DynamicPopover>
        </div>         
      </div>
    )


### Should overflow right edge
And switch popover placement to the opposite. (Play with the size of the window if necessary)

    const POPOVER_PLACEMENTS = require('./../Popover/PopoverPlacements').default;

    (
      <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
        <div style={{border: '1px solid black', padding: 4, width: 200,height: 200}}>
          <DynamicPopover maxWidth={600} initialPlacement={POPOVER_PLACEMENTS.TOP_LEFT}>
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
          </DynamicPopover>
        </div>         
      </div>
    )  

### Probably won't overflow the right edge
Because of short width of the tooltip

    const POPOVER_PLACEMENTS = require('./../Popover/PopoverPlacements').default;

    (
      <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
        <div style={{border: '1px solid black', padding: 4, width: 200,height: 200}}>
          <DynamicPopover maxWidth={600} initialPlacement={POPOVER_PLACEMENTS.TOP_LEFT}>
            Nunquam
          </DynamicPopover>
        </div>         
      </div>
    )
    
### Max width is not necessary

    const POPOVER_PLACEMENTS = require('./../Popover/PopoverPlacements').default;

    (
      <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
        <div style={{border: '1px solid black', padding: 4, width: 200,height: 200}}>
          <DynamicPopover initialPlacement={POPOVER_PLACEMENTS.TOP_LEFT}>
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
          </DynamicPopover>
        </div>         
      </div>
    )

### Dynamic width of the tooltip
Despite of having `maxWidth=600px` the actual width of the tooltip is calculated so it fits the content just right.

    const POPOVER_PLACEMENTS = require('./../Popover/PopoverPlacements').default;

    (
      <div>
        <div style={{border: '1px solid black', padding: 4, width: 200,height: 200}}>
          <DynamicPopover maxWidth={600} initialPlacement={POPOVER_PLACEMENTS.TOP_LEFT}>
            Nunquam Nunquam Nunquam  Nunquam 
          </DynamicPopover>
        </div>         
      </div>
    )
    
### Dynamic width of the tooltip, still limited by CSS
Dynamically calculated width cannot be smaller then `minWidth` 

    const POPOVER_PLACEMENTS = require('./../Popover/PopoverPlacements').default;

    (
      <div>
        <div style={{border: '1px solid black', padding: 4, width: 200,height: 200}}>
          <DynamicPopover maxWidth={600} initialPlacement={POPOVER_PLACEMENTS.TOP_LEFT}>
            x
          </DynamicPopover>
        </div>         
      </div>
    )
    
### Case not implemented - when tooltip fits neither of sides
In order to avoid this case, a reasonable maxWidth should be chosen.

    const POPOVER_PLACEMENTS = require('./../Popover/PopoverPlacements').default;

    (
      <div>
        <div style={{border: '1px solid black', padding: 4, width: 200,height: 200}}>
          <DynamicPopover maxWidth={3000} initialPlacement={POPOVER_PLACEMENTS.TOP_LEFT}>
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
            Nunquam aperto sensorem. Cum verpa resistere, omnes cursuses magicae talis, primus impositioes.
          </DynamicPopover>
        </div>         
      </div>
    )
