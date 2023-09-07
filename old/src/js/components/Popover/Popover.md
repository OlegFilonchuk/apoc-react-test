## Popover with Simple Text Title and default placement

  ```
  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <Popover
      isClosable
      title="Simple text title"
      header={(<h2>Editor header</h2>)}
    >
      <ul>
        <li>item 1</li>
        <li>item 2</li>
      </ul>
    </Popover>
  </div>
  )
  ```

## Popover with `React.Element` as a title

  ```
  const Button = () => (<button>Hover me</button>);

  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <h2></h2>

    <div>
      <Popover
        title={<Button />}
        isClosable
      >
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  </div>
  )
  ```

## Popover with manual control by props `openTrigger` and `isVisible`

  ```
  const POPOVER_OPEN_TRIGGER = require('./PopoverOpenTrigger').default;

  const initialState = {
    isShown: false
  };

  const showHidePopover = () => {
    setState({
      isShown: !state.isShown
    });
  };

  const onClosePopover = () => {
    setState({
      isShown: false
    });
  };

  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <button onClick={showHidePopover}>Click to toggle Popover element</button>
    <br/><br/>
    <div>
      <Popover
        title="Popover target element"
        isVisible={state.isShown}
        onClose={onClosePopover}
        openTrigger={POPOVER_OPEN_TRIGGER.MANUAL}
        isClosable
      >
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  </div>
  )
  ```

## Popover with `React.Element` as a title. Mouse click opens Popover.

  ```
  const POPOVER_OPEN_TRIGGER = require('./PopoverOpenTrigger').default;
  const Button = () => (<button>Click me</button>);

  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <h2></h2>

    <div>
      <Popover
        title={<Button />}
        isClosable
        openTrigger={POPOVER_OPEN_TRIGGER.MOUSE_CLICK}
      >
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  </div>
  )
  ```

  ## Popover without arrow

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Popover placement={POPOVER_PLACEMENTS.LEFT_TOP} hideArrow>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  )
  ```

## Placement with arrow at LEFT-TOP corner

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Popover placement={POPOVER_PLACEMENTS.LEFT_TOP}>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  )
  ```


## Placement with arrow at RIGHT-TOP corner

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Popover placement={POPOVER_PLACEMENTS.RIGHT_TOP}>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  )
  ```


## Placement with arrow at TOP-RIGHT corner

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Popover placement={POPOVER_PLACEMENTS.TOP_RIGHT}>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  )
  ```


## Placement with arrow at TOP-LEFT corner

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Popover placement={POPOVER_PLACEMENTS.TOP_LEFT}>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  )
  ```



## Placement with arrow at BOTTOM-RIGHT corner

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Popover placement={POPOVER_PLACEMENTS.BOTTOM_RIGHT}>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  )
  ```



## Placement with arrow at BOTTOM-LEFT corner

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <Popover
          placement={POPOVER_PLACEMENTS.BOTTOM_LEFT}
        >
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Popover>
    </div>
  )
  ```

## Placement with arrow at TOP_MIDDLE

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <Popover
          placement={POPOVER_PLACEMENTS.TOP_MIDDLE}
        >
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Popover>
    </div>
  )
  ```

## Placement with arrow at RIGHT_MIDDLE

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <Popover
          placement={POPOVER_PLACEMENTS.RIGHT_MIDDLE}
        >
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Popover>
    </div>
  )
  ```

## Placement with arrow at LEFT_MIDDLE

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <Popover
          placement={POPOVER_PLACEMENTS.LEFT_MIDDLE}
        >
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Popover>
    </div>
  )
  ```

## Placement with arrow at BOTTOM_MIDDLE

  ```
  const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <Popover
          placement={POPOVER_PLACEMENTS.BOTTOM_MIDDLE}
        >
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Popover>
    </div>
  )
  ```

## Popover with arrow following mouse cursor position

```
const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <Popover
          placement={POPOVER_PLACEMENTS.BOTTOM_LEFT}
          followCursorPosition={true}
        >
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Popover>
    </div>
  )
```

## Popover with delayed opening

```
const POPOVER_PLACEMENTS = require('./PopoverPlacements').default;

  (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <Popover
          placement={POPOVER_PLACEMENTS.BOTTOM_LEFT}
          followCursorPosition={true}
          showAfterDelayOf={2000}
        >
          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>
        </Popover>
    </div>
  )
```

## Popover with manual control by props `openTrigger`, `isVisible`

  ```
  const POPOVER_OPEN_TRIGGER = require('./PopoverOpenTrigger').default;

  const initialState = {
    isShown: false
  };

  const showPopover = () => {
    setState({
      isShown: !state.isShown
    });
  };

  const onClosePopover = () => {
    setState({
      isShown: false
    });
  };

  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <div>
      <Popover
        title="Click to toggle Popover element"
        isVisible={state.isShown}
        openTrigger={POPOVER_OPEN_TRIGGER.MANUAL}
        onPopoverClick={showPopover}
        onClose={onClosePopover}
        isClosable
      >
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  </div>
  )
  ```

  ## Popover with click control by props `openTrigger`, `isVisible` and closed on outside click

  ```
  const POPOVER_OPEN_TRIGGER = require('./PopoverOpenTrigger').default;

  const initialState = {
    isShown: false
  };

  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <div>
      <Popover
        title="Click to toggle Popover element"
        isVisible={state.isShown}
        openTrigger={POPOVER_OPEN_TRIGGER.CLICK_OUTSIDE}
        isClosable
      >
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </Popover>
    </div>
  </div>
  )
  ```

  ## Popover with `type` set to `error`

  ```
  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <Popover
      isClosable
      title="Simple text title"
      type="error"
      header={(<h2>Editor header</h2>)}
    >
      <ul>
        <li>item 1</li>
        <li>item 2</li>
      </ul>
    </Popover>
  </div>
  )
  ```

  ## Popover with `type` set to `warning`

  ```
  (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <Popover
      isClosable
      title="Simple text title"
      type="warning"
      header={(<h2>Editor header</h2>)}
    >
      <ul>
        <li>item 1</li>
        <li>item 2</li>
      </ul>
    </Popover>
  </div>
  )
  ```
