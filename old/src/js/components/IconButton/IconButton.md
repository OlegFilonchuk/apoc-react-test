## `IconButton` component to be used at several places:

In this [invision mock](https://spirent.invisionapp.com/d/main#/console/5599625/207639286/preview) at the right panel top navigation.
ex:

    <div>
        <div>
            <IconButton.Plus compact />
            <IconButton.Reset compact disabled />
            <IconButton.Undo compact disabled />
        </div><br />
        <div>
            <IconButton.Plus compact />
            <IconButton.Reset compact />
            <IconButton.Undo compact />
        </div>
    </div>

..or as filter button in the left panel in the mock..

    <IconButton.Filter />

It can be used as next/prev arrows in [this mock](https://spirent.invisionapp.com/d/main#/console/5599625/125780688/preview) too. ex:

    const flexButton = {flex: '0 1', width: '64px'};

    <div style={{display: 'flex', height: '300px', alignItems: 'center'}}>
        <div style={flexButton}><IconButton.Prev /></div>
        <div style={{flex: 1, textAlign: 'center'}}>..some content</div>
        <div style={flexButton}><IconButton.Next /></div>
    </div>

## Some icon button examples - check out the code for more info

    <div>
        <IconButton.Default />
        <IconButton.Edit />
        <IconButton.Error />
        <IconButton.Filter />
        <IconButton.Flag />
        <IconButton.Info />
        <IconButton.Next />
        <IconButton.Plus />
        <IconButton.Prev />
        <IconButton.Reset />
        <IconButton.Undo />
        <IconButton.Upload />
        <IconButton.Xmark />
    </div>

## Default `IconButton`

    <IconButton />
