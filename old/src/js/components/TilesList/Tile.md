## Tile is a single item for TilesList

Complex component

```
const protocolsList = [
    'Adobe',
    'Skype',
    'IMAP',
    'Jabber'
  ];
  
(
  <div style={{ overflow: "hidden" }}>
    <Tile
      title="Imported Scenarious"
      link="#Tile"
      amount={protocolsList.length}
      footerItems={protocolsList}
    />
  </div>
)
```

Simple component

```
(
  <div style={{ overflow: "hidden" }}>
    <Tile
      title="Imported Scenarious"
      link="#TilesList"
    />
  </div>
)
```
