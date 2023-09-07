import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { calculatePathPoints, getPointAngle } from './Sector/Math';

import './Dragpoint.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../../utils/dataTestElementPropUtils';

const STROKE_WIDTH = 2;

class Dragpoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      hover: false
    };

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onDragStart(event) {
    const coords = calculatePathPoints(this.props.percentage, this.props.radius);

    event.stopPropagation();
    event.preventDefault();
    this.props.onChangeStart();

    this.setState({
      dragging: true,
      startPoint: {
        adjustX: event.pageX - coords.secondPointX,
        adjustY: event.pageY - coords.secondPointY
      }
    });
    document.addEventListener('mouseup', this.onDragEnd, true);
    document.addEventListener('mousemove', this.onDrag, true);

    document.body.classList.add('--dragging');
  }

  onDrag(event) {
    if (this.state.dragging) {
      event.preventDefault();
      event.stopPropagation();

      const offsetX = event.pageX - this.state.startPoint.adjustX;
      const offsetY = event.pageY - this.state.startPoint.adjustY;
      const centerPoint = this.props.radius + this.props.pointRadius;

      this.props.onChange(getPointAngle(offsetX, offsetY, centerPoint, centerPoint));
    }
  }

  onDragEnd() {
    document.removeEventListener('mousemove', this.onDrag, true);
    document.removeEventListener('mouseup', this.onDragEnd, true);

    this.setState({ dragging: false, hover: false });

    this.props.onChangeEnd();

    document.body.classList.remove('--dragging');
  }

  onMouseEnter() {
    this.setState({ hover: true });

    this.props.onMouseEnter();
  }

  onMouseLeave() {
    this.setState({ hover: this.state.dragging });

    if (!this.state.dragging) {
      this.props.onMouseLeave();
    }
  }

  render() {
    const { radius, percentage, pointRadius } = this.props;
    const coords = calculatePathPoints(percentage, radius);
    const fill = this.state.hover ? 'black' : 'lightGrey';

    return (
      <circle
        className="dragpoint"
        cx={coords.secondPointX}
        cy={coords.secondPointY}
        r={pointRadius - STROKE_WIDTH}
        stroke="gray"
        strokeWidth={STROKE_WIDTH}
        fill={fill}
        onMouseDownCapture={this.onDragStart}
        onMouseUpCapture={this.onDragEnd}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        {...getDataTestElementProps(this.props)}
      />
    );
  }
}

Dragpoint.propTypes = {
  /**
   * Inner radius(radius - handles radius) of the piechart
   */
  radius: PropTypes.number.isRequired,

  /**
   * Percentage "where" the handle (Dragpoint) will be drawn
   */
  percentage: PropTypes.number.isRequired,

  /**
   * Radius/size of the handle (Dragpoint)
   */
  pointRadius: PropTypes.number,

  /**
   * Callback fired when the drag of the point have started: no args
   */
  onChangeStart: PropTypes.func,

  /**
   * Callback fired on every mouse move one arg: angle of the mouse
   */
  onChange: PropTypes.func,

  /**
   * Callback fired when the mouse is hovering the dragpoint
   */
  onMouseEnter: PropTypes.func,

  /**
   * Callback fired when the mouse stopped hovering the dragpoint
   */
  onMouseLeave: PropTypes.func,
  onChangeEnd: PropTypes.func.isRequired,
  ...dataTestElementPropTypes
};

Dragpoint.defaultProps = {
  pointRadius: 8,
  onMouseEnter: () => true,
  onMouseLeave: () => true,
  onChangeStart: () => true,
  onChange: () => true
};

export default Dragpoint;
