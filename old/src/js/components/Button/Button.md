## Basic button

Simple usage of the **Button** component:

    const callbackFn = () => {
        document.getElementById('clicked').textContent = 'I was clicked!';
    };

    (
      <div>
        <Button className="sc-btn-default" onClick={ callbackFn }>Push Me</Button>
        <div id="clicked">
            Please click button!
        </div>
      </div>
    )

## Disabled button

Rendering Button with a disables state

    <Button onClick={() => true} disabled={true}>You can't click me</Button>

## Colors

Button component can support different colors:

    const onClick = (text) => {
      console.log(`${text} clicked!`);
    };

    (
      <div>
        <p>
          <Button onClick={() => { onClick('Button normal'); }}>Button Normal</Button>
        </p>
        <p>
          <Button onClick={() => { onClick('Button Primary'); }}  className="sc-btn-primary">Button Primary</Button>
        </p>
        <p>
          <Button onClick={() => { onClick('Primary Outline'); }}  className="sc-btn-primary-outline">Button Primary Outline</Button>
        </p>
        <p>
          <Button onClick={() => { onClick('Button Warning'); }}  className="sc-btn-warning">Button Warning</Button>
        </p>
        <p>
          <Button onClick={() => { onClick('Button Error'); }}  className="sc-btn-error">Button Error</Button>
        </p>
        <p>
          <Button onClick={() => { onClick('Error Outline'); }}  className="sc-btn-error-outline">Button Error Outline</Button>
        </p>
        <p>
          <Button onClick={() => { onClick('Button Success'); }}  className="sc-btn-success">
            <i className="sc-icon-download" /> Button Success
          </Button>
        </p>
        <p>
          <Button isLinkView onClick={() => { onClick('Link Button'); }}  className="sc-primary">
            <i className="sc-icon-file" /> Link Button
          </Button>
        </p>
      </div>
    )
