## Basic Alert

Simple usage of the **Alert** component:

    (
      <div>
        <Alert closeTimeout={0}>You have an alert!</Alert>
      </div>
    )

## Types & Colors

Alert component can support different types / colors:

    (
      <div>
        <Alert closeTimeout={0} type="success">
          <span className="sc-icon-check" />
          You have a success alert!
        </Alert>

        <Alert closeTimeout={0} type="warning">You have a warning alert!</Alert>

        <Alert closeTimeout={0} type="error">
          <span className="sc-icon-triangle-warning" />You have an error alert!
        </Alert>
      </div>
    )

## Closing timeout

Alert component will close by default in 3 seconds.
Pass `0` if you don't want to close it automatically.

    const initialState = {
      isVisible: false
    };

    const onClickFn = () => {
      setState({ isVisible: true });
    };

    (
      <div>
        <Button onClick={onClickFn}>Click to show auto-closing alert</Button>
        {state.isVisible ? <Alert>I'll be closed in 3 seconds.</Alert> : null}
      </div>
    )

## onClose callback

An `onClose` callback will be called after component will close, programatically or automatically.

    const initialState = {
      isVisible: false
    };

    const onClickFn = () => {
      setState({ isVisible: true });
    };

    const onCloseFn = () => { console.log('Alert closed') };

    (
      <div>
        <Button onClick={onClickFn}>Click to show auto-closing alert</Button>
        {
          state.isVisible ?
            <Alert onClose={onCloseFn} closeTimeout={10} type="success">Alert will close after 10 seconds</Alert> : null
        }
        <Alert onClose={onCloseFn} closeTimeout={0} type="success">Close me with `x` on right!</Alert>
      </div>
    )

## Non-closable alert

    (
      <div>
        <Alert closeTimeout={0} isClosable={false}>You can't close me.</Alert>
      </div>
    )

## Alert closed by default

    const initialState = {
      isOpen: false
    };

    const onClickFn = () => {
      setState({ isOpen: !state.isOpen });
    };

    (
      <div>
        <Button onClick={onClickFn}>Show/hide `Alert`</Button>
        <Alert isOpen={state.isOpen} closeTimeout={0} isClosable={false}>You can close me programatically.</Alert>
      </div>
    )

## Normal `Alert` with `withBackdrop` HoC
    const withBackdrop = require('../withBackdrop/withBackdrop').default;
    const AlertWithBackdrop = withBackdrop(Alert, 'isOpen');

    const initialState = {
      isOpen: false
    };

    const onClickFn = () => {
      setState({ isOpen: true });
    };

    const closeAlert = () => {
      setState({ isOpen: false });
    };

    const onCloseFn = () => {
      console.log('Alert closed')
    };

    (
      <div>
        <Button onClick={onClickFn}>Click to show auto-closing alert</Button>
        <AlertWithBackdrop
          isOpen={state.isOpen}
          backdrop={{ onClick: closeAlert }}
          onClose={onCloseFn}
          closeTimeout={0}
          type="success"
        >
          AlertWithBackdrop with backdrop
        </AlertWithBackdrop>
      </div>
    )
