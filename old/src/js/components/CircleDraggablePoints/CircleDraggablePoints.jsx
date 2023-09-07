import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DraggablePoints from '../DraggablePoints/DraggablePoints';

const halfPi = Math.PI / 2;
const doublePi = Math.PI * 2;

const round = number => Math.floor(number * 1000) / 1000;

const getPointPercentage = (oldPoints, updatedPoints, draggedPointId, center) => {
  const { x, y } = updatedPoints[draggedPointId];
  const dx = x - center.x;
  const dy = y - center.y;

  const shiftX = dx < 0 ? Math.PI : 0;
  const angle = shiftX + halfPi - Math.atan(dy / dx);

  const percentage = round(angle / doublePi);

  return percentage;
};

class CircleDraggablePoints extends Component {
  constructor(props) {
    super(props);

    this.pointsToPositions = this.pointsToPositions.bind(this);
    this.percentageToPosition = this.percentageToPosition.bind(this);
    this.onDraggablePointsUpdate = this.onDraggablePointsUpdate.bind(this);
  }

  onDraggablePointsUpdate(newPoints, draggedPointId) {
    const recalculatedPercentage = getPointPercentage(this.props.points, newPoints, draggedPointId, this.props.center);
    const points = this.props.points.slice();

    points[draggedPointId].percentage = recalculatedPercentage;

    this.props.update(points);
  }

  pointsToPositions(points) {
    return points.map(point => {
      const { name, percentage } = point;
      const { x, y } = this.percentageToPosition(percentage);

      return { name, x, y };
    });
  }

  percentageToPosition(percentage) {
    const { center, radius } = this.props;

    const angle = halfPi - doublePi * percentage;

    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    return { x, y };
  }

  render() {
    const points = this.pointsToPositions(this.props.points);

    return (
      <DraggablePoints
        points={points}
        update={this.onDraggablePointsUpdate}
        width={this.props.width}
        height={this.props.height}
        className={this.props.className}
      />
    );
  }
}

CircleDraggablePoints.propTypes = {
  /**
   * Center coordinates of circle
   * coordinates are calculated from left-bottom corner of container
   */
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,

  /**
   * Radius of the circle
   */
  radius: PropTypes.number.isRequired,

  /**
   * Points percentages and names to display
   */
  points: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      percentage: PropTypes.number
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

CircleDraggablePoints.defaultProps = {
  className: ''
};

export default CircleDraggablePoints;
