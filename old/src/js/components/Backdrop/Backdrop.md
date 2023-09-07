## Basic Backdrop
      function backdropAutoClose() {
        setState({
            isVisible: !state.isVisible
          }, () => {
            setTimeout(() => {
              setState({
                isVisible: false
              });
            }, 1000);
          })
      }
      (
      <div>
          <Button className="sc-btn-default" onClick={backdropAutoClose}>Open Backdrop</Button>
          <Backdrop isVisible={state.isVisible}/>
      </div>
      )
