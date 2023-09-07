## Necessary sub components are
* [ContextOption](#contextoption)
* [ContextOptionLink](#contextoptionlink)
* [ContextButton](#contextbutton)

## Example of context menu with link options
It uses [ContextOptionLink](#contextoptionlink) and [ContextButton](#contextbutton)

    function onClick(text) {
      console.log(text);
    }

    (
      <div style={{textAlign: 'right'}} title="Title which shouldn't be visible on hover">
        <ContextMenu title="elo">
          <ContextOptionLink
            key="a001"
            onClick={() => { onClick('ContextOptionLink clicked!'); }}
            href="#!projects"
          >Edit</ContextOptionLink>
          <ContextOptionLink
            key="a002"
            isDisabled
            onClick={() => { onClick('ContextOptionLink clicked!'); }}
            href="#!projects"
          >Disabled Edit</ContextOptionLink>
          <ContextOptionLink
            key="a003"
            icon="sc-icon-pencil"
            onClick={() => { onClick('ContextOptionLink with icon clicked!'); }}
            href="#!projects"
          >With icon</ContextOptionLink>
          <ContextOption key="a004" onClick={() => { onClick('ContextOption "Rename" clicked!'); }}>Rename</ContextOption>
          <ContextOption key="a005" onClick={() => { onClick('ContextOption "Duplicate" clicked!'); }}>Duplicate</ContextOption>
          <ContextOption key="a006" onClick={() => { onClick('ContextOption "Delete" clicked!'); }}>Delete</ContextOption>
        </ContextMenu>
      </div>
    )



## Example of context menu with dynamic actions list
    class DynamicContextMenuOptionsExample extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          value: '',
          options: ['first option']
        }

        this.addOption = this.addOption.bind(this)
        this.removeLastOption = this.removeLastOption.bind(this)
        this.handleChange = this.handleChange.bind(this)
      }

      addOption(e) {
        e.preventDefault();
        this.setState(oldState => ({
            options: [...oldState.options, oldState.value],
            value: '',
        }))
      }

      removeLastOption(e) {
        e.preventDefault();

        if (!this.state.options.length) {
          return;
        }

        this.setState(oldState => {
          const copiedOptions = [...oldState.options]
          copiedOptions.splice(copiedOptions.length - 1, 1)

          return {
            options: copiedOptions
          }
        })
      }

      handleChange(e) {
        const value = e.currentTarget.value

        this.setState({
          value
        })
      }

      render() {
        return <div>
          <div style={{textAlign: 'right'}} title="Title which shouldn't be visible on hover">
            <ContextMenu>
              {this.state.options.map((option, i) => <ContextOption
                key={`a00${i}`}
                onClick={() => console.log(`Context Option ${option} clicked!`)}
              >{option}</ContextOption>)}
            </ContextMenu>
          </div>
          <h3>Edit options list:</h3>
          <div>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <button onClick={this.addOption}>add option</button>
            <button onClick={this.removeLastOption}>remove last option</button>
          </div>
          <ul>
            {this.state.options.map((option, i) => <li key={`option00${i}`}>{option}</li>)}
          </ul>
        </div>
      }
    }

    (
      <DynamicContextMenuOptionsExample />
    )



## Example of context menu with link options in Modal
There was a bug of rending Context Menu inside of Modal. This example is to present that the bug was fixed.
It uses [ContextOptionLink](#contextoptionlink) and [ContextButton](#contextbutton)

    const initialState = {isModalOpen: false};

    function toggleModal(){
      setState({isModalOpen: !state.isModalOpen});
    }

    (
      <div>
        <Button onClick={toggleModal}>Toggle Modal</Button>
        <Modal isOpen={state.isModalOpen}>
          <div style={{textAlign: 'right'}} title="Title which shouldn't be visible on hover">
            <ContextMenu>
              <ContextOptionLink isDisabled onClick={()=>null}>Edit</ContextOptionLink>
              <ContextOption onClick={()=>console.log('rename')}>Rename</ContextOption>
              <ContextOption onClick={()=>console.log('duplicate')}>Duplicate</ContextOption>
              <ContextOption onClick={()=>console.log('delete')}>Delete</ContextOption>
            </ContextMenu>
          </div>
        </Modal>
      </div>
    )

