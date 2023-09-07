This component has same properties set as [`<Modal/>`](http://localhost:1234/#Modal).
The difference is that it has a [`<Backdrop/>`](http://localhost:1234/#Backdrop) attached

    function openModal() {
      setState({isOpen: true})
    }

    function closeModal() {
      setState({isOpen: false})
    }

    (
    <div>
      <Button className="sc-btn-default" onClick={openModal}>Open Modal Dialog</Button>
      <ModalWithBackdrop onOutsideModalClick={closeModal} isOpen={state.isOpen} header="Modal Dialog" footer={<Button className="sc-btn-default" onClick={closeModal}>Close</Button>}>
        Hello World!
      </ModalWithBackdrop>
    </div>
    )