import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Point from './Point';
import getMouse from '../../utils/getMouse';

import './DraggablePoints.less';

const NULL_DRAGGABLE_POINT_ID = null;

const reduceByLimits = (value, highestValue) => {
  const outOfBoundsLow = value < 0;
  const outOfBoundsHigh = value > highestValue;
  let result = value;

  if (outOfBoundsLow) {
    result = 0;
  } else if (outOfBoundsHigh) {
    result = highestValue;
  }

  return result;
};

const valueWithOffsetAndLimits = (value, offset, limit) => {
  const adjustedValue = value - offset;

  return reduceByLimits(adjustedValue, limit);
};

const getNewPointsArray = points => points.slice();

class DraggablePoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draggedPointId: NULL_DRAGGABLE_POINT_ID,
      offset: {
        x: 0,
        y: 0
      }
    };

    this.onDrag = this.onDrag.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.getPointComponent = this.getPointComponent.bind(this);
    this.initWrapper = this.initWrapper.bind(this);
  }

  componentDidMount() {
    this.maxX = this.wrapper.offsetWidth;
    this.maxY = this.wrapper.offsetHeight;
  }

  onMouseDown(event, point) {
    const draggedPointId = this.props.points.indexOf(point);
    const offset = this.getMouseDownPointOffset(event, point);

    this.setState({ draggedPointId, offset });
    this.addEventListeners();
  }

  onMouseUp() {
    const draggedPointId = NULL_DRAGGABLE_POINT_ID;

    this.setState({ draggedPointId });
    this.removeEventListeners();
  }

  onDrag(event) {
    const x = getMouse(event, this.wrapper).x;
    const y = this.props.height - getMouse(event, this.wrapper).y;

    this.updatePointToCoordinates(x, y);
  }

  getMouseDownPointOffset(event, point) {
    const mouse = getMouse(event, this.wrapper);
    const x = mouse.x - point.x;
    const y = -(mouse.y - (this.props.height - point.y));

    return { x, y };
  }

  getPointComponent(point, index) {
    return <Point key={index} point={point} onMouseDown={e => this.onMouseDown(e, point)} />;
  }

  initWrapper(wrapper) {
    this.wrapper = wrapper;
  }

  removeEventListeners() {
    document.body.removeEventListener('mousemove', this.onDrag);
    document.body.removeEventListener('mouseup', this.onMouseUp);
  }

  addEventListeners() {
    document.body.addEventListener('mousemove', this.onDrag);
    document.body.addEventListener('mouseup', this.onMouseUp);
  }

  updatePointToCoordinates(mouseX, mouseY) {
    const draggedPointId = this.state.draggedPointId;
    const offset = this.state.offset;

    const x = valueWithOffsetAndLimits(mouseX, offset.x, this.props.width);
    const y = valueWithOffsetAndLimits(mouseY, offset.y, this.props.height);

    const newPoints = getNewPointsArray(this.props.points);
    const draggedPoint = newPoints[draggedPointId];

    draggedPoint.x = x;
    draggedPoint.y = y;

    this.props.update(newPoints, draggedPointId);
  }

  render() {
    const points = this.props.points.map(this.getPointComponent);

    return (
      <div ref={this.initWrapper} className={classNames('draggable-points', this.props.className)}>
        {points}
      </div>
    );
  }
}

DraggablePoints.propTypes = {
  /**
   * Array of points describing the shape of chart.
   * Each point is an object with x and y coordinates and a name that will be displayed on hover.
   *
   *
   * Coordinates will be translated into top and left style properties.
   *
   */
  points: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number
    })
  ).isRequired,

  /**
   * Callback when points coordinates change. Passes new points array as an argument.
   */
  update: PropTypes.func.isRequired,

  /**
   * Width of container element
   */
  width: PropTypes.number.isRequired,

  /**
   * Height of container element
   */
  height: PropTypes.number.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

DraggablePoints.defaultProps = {
  update: () => true,
  className: ''
};

export default DraggablePoints;
