## TilesList

```
  const protocolsList = [
    'Adobe',
    'Sharepoint',
    'MySQL',
    'Skype',
    'IMAP',
    'Jabber'
  ];
  
  const shortList = [
    'MySQL',
    'Skype'
  ];

  (
  <TilesList>
    <Tile
      title="First Pack"
      link="#testLink"
      amount={protocolsList.length}
      footerItems={protocolsList}
    />
    
    <Tile
      title="Second Pack"
      link="#testLink"
      amount={shortList.length}
      footerItems={shortList}
    />
    
    <Tile
      title="Another item"
      link="#testLink"
      amount={protocolsList.length}
      footerItems={protocolsList}
    />
    
    <Tile
      title="Nex Row Pack"
      link="#testLink"
      amount={protocolsList.length}
    />

    <Tile
      title="No Protocols Pack"
      link="#testLink"
    />
  </TilesList>
  )
```
