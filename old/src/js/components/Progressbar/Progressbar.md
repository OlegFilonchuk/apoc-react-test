## Basic Example

    (
        <Progressbar percentage={25}/>
    )


## With outside label

    (
        <Progressbar percentage={25} titleSettings={{outside: true}}/>
    )

## With inside label

    (
        <Progressbar percentage={25} titleSettings={{inside: true}}/>
    )

## With both labels

    (
        <Progressbar percentage={25} titleSettings={{inside: true, outside: true}}/>
    )

## With dynamic colors

Progress bar can have additional classes based on the value current percentage value.
In the example below there will be one of 4 classes added based on the percentage that changes randomly.
You can also inspect the progress-bar to see that the class is applied.

0-25 - very-low

25-50 - low

50-75 - high

75-100 - very-high

    const initialState = {
      percentage: 25
    };

    const color = {
      dynamic: true,
      range: [
        {
          min: 0,
          max: 25,
          className: 'very-low'
        },
        {
          min: 25,
          max: 50,
          className: 'low'
        },
        {
          min: 50,
          max: 75,
          className: 'high'
        },
        {
          min: 75,
          max: 100,
          className: 'very-high'
        }
      ]
    };



    const changePercentage = () => {
      setState({ percentage: Math.floor(Math.random()* 100) }, () => {
        const progressBarClasses = document.querySelector('#progress-bar-example .sc-progress-bar').classList;
        const newClass = progressBarClasses[0];
        const currentClassSpan = document.querySelector('#progress-bar-example > span').innerHTML = `Current class: ${newClass}`;
      });
    };


    (
      <div id="progress-bar-example">
        <button onClick={changePercentage}>Change percentage</button>
        <Progressbar percentage={state.percentage} color={color} titleSettings={{inside: true, outside: true}}/>
        <span></span>
      </div>
    )
