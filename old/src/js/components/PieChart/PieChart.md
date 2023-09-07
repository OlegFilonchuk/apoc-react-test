## Pie chart
    const pieChartSize = 230;
    const pieChartFontSize = 12;
    const pieChartNothingSelectedText = 'Some default text';
    const pieChartNothingSelectedTextFontSize = 15;
    const pieChartNothingSelectedTextFontColor = 'black';
    const pieChartSectorsInfo = [
      {
        percentage: 0.45,
        label: '45%',
        color: '#61C0BF',
        id: 'point1'
      },
      {
        percentage: 0.21,
        label: '21%',
        color: '#DA507A',
        id: 'point2'
      },
      {
        percentage: 0.11,
        label: '11%',
        color: '#BB3D49',
        id: 'point3'
      },
      {
        percentage: 0.23,
        label: '23%',
        color: '#DB4547',
        id: 'point4'
      }
    ];

    <PieChart
      data={pieChartSectorsInfo}
      size={pieChartSize}
      fontSize={pieChartFontSize}

      nothingSelectedText={pieChartNothingSelectedText}
      nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
      nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
     />

## Pie chart - editable
This component is intended to be used as controlled component - set the props (`data`, `percentageShift`) in onChange.
Basis usage:

    const pieChart = {
      percentageShift: 0,
      data: [
        {
          percentage: 0.25,
          label: 'Label 1 (%%)',
          color: '#61C0BF',
          id: 'point1'
        },
        {
          percentage: 0.25,
          label: 'Label 2 (%%)',
          color: '#DA507A',
          id: 'point2'
        },
        {
          percentage: 0.25,
          label: 'Label 3 (%%)',
          color: '#BB3D49',
          id: 'point3'
        },
        {
          percentage: 0.25,
          label: 'Label 4 (%%)',
          color: '#DB4547',
          id: 'point4'
        }
      ]
    }

    initialState = {
      pieChart
    };

    const onPieChartChange = (newState) => setState({ pieChart: newState });
    const resetState = () => setState({ pieChart });

    <div>
      <button onClick={resetState}>reset</button>
      <PieChart
        editable
        data={state.pieChart.data}
        size={400}
        fontSize={12}
        percentageShift={state.pieChart.percentageShift}
        onChange={onPieChartChange}
      />
    </div>


## PieChart - editable with rounding of the drag percentage
Look at CODE for more examples.

    const pieChartSize = 200;
    const pieChartFontSize = 12;
    const pieChartNothingSelectedText = 'Some default text';
    const pieChartNothingSelectedTextFontSize = 15;
    const pieChartNothingSelectedTextFontColor = 'black';
    const pieChartSectorsInfo = [
      {
        percentage: 0.25,
        label: 'Label 1 (%%)',
        color: '#61C0BF',
        id: 'point1'
      },
      {
        percentage: 0.25,
        label: 'Label 2 (%%)',
        color: '#DA507A',
        id: 'point2'
      },
      {
        percentage: 0.25,
        label: 'Label 3 (%%)',
        color: '#BB3D49',
        id: 'point3'
      },
      {
        percentage: 0.25,
        label: 'Label 4 (%%)',
        color: '#DB4547',
        id: 'point4'
      }
    ];
    const onChangeMax50 = (newState, stateKey) => {  // constraint to a max 50%
      const success = newState.data.every(sector => sector.percentage <= 0.5);

      if (success) {
        setState({
          [stateKey]: newState,
          total: calcTotal(newState.data)
        });
      }
    };

    const calcTotal = data => data.reduce((acc, sector) => acc += sector.percentage * 100, 0);

    const onChangeMinOne = (newState, stateKey) => {  // constraint to a min half percent
      const success = newState.data.every(sector => sector.percentage > 0.01);

      if (success) {
        setState({
          [stateKey]: newState,
          total: calcTotal(newState.data)
        });
      };
    };

    const onPercentageAdjust = percentage => Math.ceil(percentage * 100)/100;   // round to 1 percent

    const randomColor = () => (
      `rgb(
        ${Math.round(Math.random()*255)},
        ${Math.round(Math.random()*255)},
        ${Math.round(Math.random()*255)}
      )`
    );

    const randomizeSlices = (stateKey) => {
      const sliceCount = 3 + Math.round(Math.random()*5);
      const data = [];

      for(let i = 0; i < sliceCount; i++) {
        data.push({
          id: `slice#${i}`,
          label: `slice #${i} (%%)`,
          percentage: 1/sliceCount,
          color: randomColor()
        })
      }

      setState({[stateKey]: {data}});
    };

    initialState = {
      editable: true,
      chart1: {
        data: pieChartSectorsInfo,
        percentageShift: 0
      },
      chart2: {
        data: pieChartSectorsInfo,
        percentageShift: 0
      },
      total: 100
    };

    <div>
      <button key="editmode" onClick={() => setState({editable: !state.editable})}>toggle edit</button><br />
      <button key="randomize" onClick={() => {
        randomizeSlices('chart1');
        randomizeSlices('chart2')
      }}>randomize</button><br />
      <div>total: {state.total}%</div>
      <PieChart
        key="chart1"
        editable={state.editable}
        data={state.chart1.data}
        size={pieChartSize}
        fontSize={pieChartFontSize}
        percentageShift={state.chart1.percentageShift}
        onChange={(newState) => onChangeMax50(newState, 'chart1')}
        onPercentageAdjust={onPercentageAdjust}

        nothingSelectedText={pieChartNothingSelectedText}
        nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
        nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
      />
      <PieChart
        key="chart2"
        editable={state.editable}
        data={state.chart2.data}
        size={pieChartSize}
        fontSize={pieChartFontSize}
        percentageShift={state.chart2.percentageShift}
        onChange={(newState) => onChangeMinOne(newState, 'chart2')}
        onPercentageAdjust={onPercentageAdjust}

        nothingSelectedText={pieChartNothingSelectedText}
        nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
        nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
      />
      <div>
        <PieChart
        key="chart3"
          data={state.chart2.data}
          size={pieChartSize}
          fontSize={pieChartFontSize}
          percentageShift={state.chart2.percentageShift}

          nothingSelectedText={pieChartNothingSelectedText}
          nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
          nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
        />
      </div>
    </div>

## Rotated Pie chart
    const pieChartSize = 230;
    const pieChartFontSize = 12;
    const pieChartNothingSelectedText = 'Some default text';
    const pieChartNothingSelectedTextFontSize = 15;
    const pieChartNothingSelectedTextFontColor = 'black';
    const pieChartSectorsInfo = [
      {
        percentage: 0.45,
        label: '45%',
        color: '#61C0BF',
        id: 'point1'
      },
      {
        percentage: 0.21,
        label: '21%',
        color: '#DA507A',
        id: 'point2'
      },
      {
        percentage: 0.11,
        label: '11%',
        color: '#BB3D49',
        id: 'point3'
      },
      {
        percentage: 0.23,
        label: '23%',
        color: '#DB4547',
        id: 'point4'
      }
    ];
    const percentageShift = 0.2;

    <PieChart
      data={pieChartSectorsInfo}
      size={pieChartSize}
      fontSize={pieChartFontSize}
      percentageShift={percentageShift}
      nothingSelectedText={pieChartNothingSelectedText}
      nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
      nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
     />

## Pie chart with no data
    const pieChartSize = 230;
    const pieChartFontSize = 12;
    const pieChartNothingSelectedText = 'Some default text';
    const pieChartNothingSelectedTextFontSize = 15;
    const pieChartNothingSelectedTextFontColor = 'black';
    const pieChartSectorsInfo = [];

    <PieChart
      data={pieChartSectorsInfo}
      size={pieChartSize}
      fontSize={pieChartFontSize}

      nothingSelectedText={pieChartNothingSelectedText}
      nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
      nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
     />

## Pie chart with single pie
    const pieChartSize = 230;
    const pieChartFontSize = 12;
    const pieChartNothingSelectedText = 'Some default text';
    const pieChartNothingSelectedTextFontSize = 15;
    const pieChartNothingSelectedTextFontColor = 'black';
    const pieChartSectorsInfo = [
      {
        percentage: 0.8,
        label: '80%',
        color: '#61C0BF',
        id: 'slice1'
      }];

    <PieChart
      data={pieChartSectorsInfo}
      size={pieChartSize}
      fontSize={pieChartFontSize}

      nothingSelectedText={pieChartNothingSelectedText}
      nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
      nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
     />

## Pie chart with **100%** single pie
    const pieChartSize = 230;
    const pieChartFontSize = 12;
    const pieChartNothingSelectedText = 'Some default text';
    const pieChartNothingSelectedTextFontSize = 15;
    const pieChartNothingSelectedTextFontColor = 'black';
    const pieChartSectorsInfo = [
      {
        percentage: 1,
        label: 'pink (100%)',
        color: 'pink',
        id: 'slice1'
      }];

    <PieChart
      data={pieChartSectorsInfo}
      size={pieChartSize}
      fontSize={pieChartFontSize}

      nothingSelectedText={pieChartNothingSelectedText}
      nothingSelectedTextFontSize={pieChartNothingSelectedTextFontSize}
      nothingSelectedTextFontColor={pieChartNothingSelectedTextFontColor}
     />


## Pie chart - with extra labels
  There is ability to use name, percentage and clickable delete labels. There is just a need to pass configurable `labels` object.
  Basis usage:

    const pieChart = {
      percentageShift: 0,
      data: [
        {
          name: 'Pie1',
          percentage: 0.25,
          label: 'Label 1 (%%)',
          color: '#61C0BF',
          id: 'firstItem'
        },
        {
          name: 'Pie2',
          percentage: 0.25,
          label: 'Label 2 (%%)',
          color: '#DA507A',
          id: 'secondItem'
        },
        {
          name: 'Pie3',
          percentage: 0.25,
          label: 'Label 3 (%%)',
          color: '#BB3D49',
          id: 'thirdItem'
        },
        {
          name: 'Pie4',
          percentage: 0.25,
          label: 'Label 4 (%%)',
          color: '#DB4547',
          id: 'fourthItem'
        }
      ]
    }

    initialState = {
      pieChart
    };

    const onPieChartChange = (newState) => setState({ pieChart: newState });
    const resetState = () => setState({ pieChart });

    <div>
      <button onClick={resetState}>reset</button>
      <PieChart
        editable
        data={state.pieChart.data}
        size={400}
        fontSize={12}
        percentageShift={state.pieChart.percentageShift}
        onChange={onPieChartChange}
        labels={{
            percentage: {
              show: true,
              offsetY: 15
            },
            name: {
              show: true,
              offsetY: 0
            },
            removeButton: {
              show: true,
              offsetY: -15
            }
        }}
        onRemove={(id, percentage) => console.log(`Removing ${id} with ${percentage} percentages...`)}
      />
    </div>

## Pie chart - with dynamically translating labels (without bend pointer)
  If you would like to translate labels outside of Piechart, it is possible to do by passing maxSectorAngle and piechartOffset props.
  `maxSectorAngle` sets an angle, which should be an egde between inner and outer labels. `piechartOffset` is a difference between inner and outer label positioning.

  In normal usage, piechart has width similar to it's wrapper. That might be the case, that outer labels won't be visible in most places.
  Use `piechartPadding` prop to fix that. It will also automatically center your PieChart.

  Basic usage:

    const pieChart = {
      percentageShift: 0,
      data: [
        {
          percentage: 0.25,
          label: 'Label 1 (%%)',
          color: '#61C0BF',
          id: 'firstItem'
        },
        {
          percentage: 0.25,
          label: 'Label 2 (%%)',
          color: '#DA507A',
          id: 'secondItem'
        },
        {
          percentage: 0.25,
          label: 'Label 3 (%%)',
          color: '#BB3D49',
          id: 'thirdItem'
        },
        {
          percentage: 0.25,
          label: 'Label 4 (%%)',
          color: '#DB4547',
          id: 'fourthItem'
        }
      ]
    }

    initialState = {
      pieChart
    };

    const onPieChartChange = (newState) => setState({ pieChart: newState });
    const resetState = () => setState({ pieChart });
    const innerLabelOffset = 50;
    const outerLabelOffset = 110;
    const maxSectorAngle = 21.8;
    const outerLabelColor = '#000000';
    const useHighlight = false;
    const piechartPadding = 50;

    <div>
      <button onClick={resetState}>reset</button>
      <PieChart
        editable
        data={state.pieChart.data}
        size={400}
        fontSize={12}
        percentageShift={state.pieChart.percentageShift}
        onChange={onPieChartChange}
        labelOffset={{
          innerLabelOffset: innerLabelOffset,
          outerLabelOffset: outerLabelOffset
        }}
        maxSectorAngle={maxSectorAngle}
        outerLabelColor={outerLabelColor}
        useHighlight={useHighlight}
        piechartPadding={piechartPadding}
      />
    </div>

## Pie chart - with dynamically translating labels (with bend pointer)
  If you would like to make a pointer bend, just use `bendConnector` prop and pass some translate data, to show `PieChart` how does the labels should behave like (due to semicircle changes).

  Basic usage:

    const pieChart = {
      percentageShift: 0,
      data: [
        {
          percentage: 0.25,
          label: 'Label 1 (%%)',
          color: '#61C0BF',
          id: 'firstItem'
        },
        {
          percentage: 0.25,
          label: 'Label 2 (%%)',
          color: '#DA507A',
          id: 'secondItem'
        },
        {
          percentage: 0.25,
          label: 'Label 3 (%%)',
          color: '#BB3D49',
          id: 'thirdItem'
        },
        {
          percentage: 0.25,
          label: 'Label 4 (%%)',
          color: '#DB4547',
          id: 'fourthItem'
        }
      ]
    }

    initialState = {
      pieChart
    };

    const onPieChartChange = (newState) => setState({ pieChart: newState });
    const resetState = () => setState({ pieChart });
    const innerLabelOffset = 50;
    const outerLabelOffset = 110;
    const maxSectorAngle = 21.8;
    const outerLabelColor = '#000000';
    const useHighlight = false;
    const piechartPadding = 70;
    const bendConnector={
      use: true,
      labelsHorizontalAligns: {
        rightSemicircle: {
          percentages: 45,
        },
        leftSemicircle: {
          percentages: -45,
        }
      },
      labelsVerticalAlignCorrection: 5
    };

    <div>
      <button onClick={resetState}>reset</button>
      <PieChart
        editable
        data={state.pieChart.data}
        size={400}
        fontSize={12}
        percentageShift={state.pieChart.percentageShift}
        onChange={onPieChartChange}
        labelOffset={{
          innerLabelOffset: innerLabelOffset,
          outerLabelOffset: outerLabelOffset
        }}
        maxSectorAngle={maxSectorAngle}
        outerLabelColor={outerLabelColor}
        useHighlight={useHighlight}
        piechartPadding={piechartPadding}
        bendConnector={bendConnector}
      />
    </div>




