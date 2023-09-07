## Examples

### Simple usage of the **LoadSpecificationChart** component.

    const points = [{
        x: 100,
        y: 0
    }, {
        x: 120,
        y: 100
    }, {
        x: 150,
        y: 100
    }, {
        x: 180,
        y: 0
    }];

    (
    <div>
        <LoadSpecificationChart width={200} height={100} points={points}/>
    </div>
    )


### Adding projections.

    const points = [{
        x: 100,
        y: 0
    }, {
        x: 120,
        y: 100
    }, {
        x: 150,
        y: 100
    }, {
        x: 180,
        y: 0
    }];

    (
    <div>
        <LoadSpecificationChart width={200} height={100} points={points} drawProjections/>
    </div>
    )

### Changing the viewport.
Points values are the same as in example above but we change the `maxX` and `maxY` properties so the chart seems smaller.

    const points = [{
        x: 100,
        y: 0
    }, {
        x: 120,
        y: 100
    }, {
        x: 150,
        y: 100
    }, {
        x: 180,
        y: 0
    }];

    (
    <div>
        <LoadSpecificationChart points={points} maxX={1000} maxY={500} width={200} height={100}/>
    </div>
    )

