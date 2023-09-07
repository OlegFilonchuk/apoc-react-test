### Note

    (
      <div>
        <code>Tabs</code> component is based on
        <a href="https://github.com/i-a-n/react-simpletabs-alt" target="blank"> react-simpletabs-alt </a>
      </div>
    )

## Example

    const Remarkable = require('remarkable')
    const md = new Remarkable();

    const initialState = {
      title: 'A dynamic header!',
      text: 'Some dynamic *content* __here__!',
    };

    const updateTitle = (e) => {
      setState({ title: e.target.value });
    };

    const updateText = (e) => {
      setState({ text: e.target.value });
    };

    const rawMarkup = () => {
      return { __html: md.render(state.text) };
    };

    const handleSelect = (selectedIndex) => {
      setState({ selectedIndex });
    };

    (
      <div>
        <Tabs
          tabActive={state.selectedIndex}
          onAfterChange={handleSelect}
        >
          <Tabs.Panel title={state.title}>
            <h4>Lorem ipsum</h4>
            <div dangerouslySetInnerHTML={rawMarkup()} />
          </Tabs.Panel>
          <Tabs.Panel title="Tab #2">
            <p>Content #2 here</p>
          </Tabs.Panel>
          <Tabs.Panel title="Tab #3">
            <p>Content #3 here</p>
          </Tabs.Panel>
        </Tabs>

        {/*Components providing extra information about usage:*/}

        <br/>

        <div style={{fontSize: '0.75em'}}>
          <p>Currenly selected tab index: {state.selectedIndex}</p>
          <p>
            <label htmlFor="">
              <span>Title of first header:</span>
              <input
                onChange={updateTitle}
                defaultValue={state.title}
              />
            </label>
          </p>
          <p>
            <label>
              Content of first header:
              <textarea
                onChange={updateText}
                ref="textarea"
                defaultValue={state.text}
              />
            </label>
          </p>
        </div>
      </div>
    )

## Example with additional icon and subtitle
    const handleSelect = (selectedIndex) => {
      setState({ selectedIndex });
    };

    (
      <div>
        <Tabs
          tabActive={state.selectedIndex}
          onAfterChange={handleSelect}
        >
          <Tabs.Panel iconTab="sc-icon-test-security-mix" title="Tab with icon">
             <p>Content #1 here</p>
          </Tabs.Panel>
          <Tabs.Panel optionalTab={true} title="Tab with optional subtitle">
            <p>Content #2 here</p>
          </Tabs.Panel>
          <Tabs.Panel iconTab="sc-icon-test-security-mix" optionalTab={true} title="Tab with icon and subtitle">
            <p>Content #3 here</p>
          </Tabs.Panel>
        </Tabs>
      </div>
    )
