# Example

      const initialState = {
        points: [{
            name: 'Start-up',
            x: 100,
            y: 50
        }, {
            name: 'Ramp-up',
            x: 120,
            y: 150
        }, {
            name: 'Ramp-down',
            x: 150,
            y: 150
        }, {
            name: 'Shut-down',
            x: 180,
            y: 50
        }]
      };

      const update = (points) => {
        setState({points});
      }
      
      const width = 500;
      const height = 200;
      
      const style = {
        position: 'relative',
        backgroundColor: '#eee',
        width: width,
        height: height,
      };

      (
        <div style={style}>
          <DraggablePoints points={state.points} update={update} width={width} height={height}/>
        </div>
      )
