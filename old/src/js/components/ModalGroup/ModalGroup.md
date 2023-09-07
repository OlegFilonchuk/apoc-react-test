Purpose of this component is to be used together with [Modal](#modal).

## Example
    const initialState = {
        openModalNames: []
    };

    function openModal(name) {
      const openModalNames = state.openModalNames || [];

      if (openModalNames.includes(name)) {
        return;
      }

      openModalNames.push(name)

      setState({openModalNames});
    }

    function closeModal(name) {
      const openModalNames = state.openModalNames || [];

      if (openModalNames.includes(name)) {
        openModalNames.splice(openModalNames.indexOf(name), 1);
      }

      setState({openModalNames});
    }

    (
    <div>
      <Button className="sc-btn-default" onClick={ openModal.bind(null, 'first_modal') }>Open Modal Dialog</Button>
      <ModalGroup openedModalNames={state.openModalNames}>
        <Modal
          name="first_modal"
          header="Modal Dialog"
          footer={
            <Button onClick={ closeModal.bind(null, 'first_modal') } className="sc-btn-default">
              Close
            </Button>
          }
        >
          Hello World from fist modal!
          A bit larger than you'd expect
          Maybe just to show it's still visible when second is opened
          <Button className="sc-btn-default" onClick={ openModal.bind(null, 'second_modal') } >
            Open Second Modal
          </Button>
        </Modal>
        <Modal
          name="second_modal"
          header="Modal Dialog"
          footer={
            <Button onClick={ closeModal.bind(null, 'second_modal') } className="sc-btn-default">
              Close
            </Button>
          }
        >
          <p>Hello World from second modal!</p>
        </Modal>
      </ModalGroup>
    </div>
    )
