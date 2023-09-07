# Example
        
      const radius = 100;
      const initialState = {
        points: [
          {
            name: '',
            percentage: 0
          },
          {
            name: '',
            percentage: 0.25
          },
          {
            name: '',
            percentage: 0.7
          }
        ]
      }
      
      const center = {
        x: 250,
        y: 100
      }

      const update = (points) => {
        setState({points});
      };
      
      const containerStyle = {
        position: 'relative',
        backgroundColor: '#eee',
        width: 500,
        height: 200
      };

      const circleSyle = {
        position: 'absolute',
        top: containerStyle.height - center.y - radius,
        left: center.x - radius,
        width: radius * 2,
        height: radius * 2,
        WebkitBorderRadius: radius,
        MozBorderRadius: radius,
        border: '1px solid black'
      };

      (
        <div style={containerStyle}>
          <CircleDraggablePoints 
            points={state.points} 
            radius={radius} 
            center={center} 
            update={update}
            width={containerStyle.width}
            height={containerStyle.height}
          />
          <div style={circleSyle}></div>
        </div>
      )
