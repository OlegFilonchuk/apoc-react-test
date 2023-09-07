import React from 'react';
import PropTypes from 'prop-types';

import { getRelativePoint, createPath, createProjections } from './utils/utils';

import './LoadSpecificationChart.less';

const LoadSpecificationChart = props => {
  const { points, width, height, lineWidth, className } = props;
  const padding = lineWidth / 2;
  const totalWidth = width + lineWidth;
  const maxX = props.maxX || width;
  const totalHeight = height + lineWidth;
  const maxY = props.maxY || props.height;

  const baseConfig = { points, width, height, maxX, maxY, padding };

  const fillPathStartingPoint = getRelativePoint({ ...baseConfig, point: points[0], height: height + padding });
  const fillPathConfig = { ...baseConfig, startingPoint: fillPathStartingPoint, height: height + padding };
  const fillPath = createPath(fillPathConfig);

  const strokePathStartingPoint = getRelativePoint({ ...baseConfig, point: { x: 0, y: 0 } });
  const strokePathEndingPoint = getRelativePoint({ ...baseConfig, point: { x: width, y: 0 } });
  const strokePathConfig = {
    ...baseConfig,
    startingPoint: strokePathStartingPoint,
    endingPoint: strokePathEndingPoint
  };
  const strokePath = createPath(strokePathConfig);

  const projections = props.drawProjections ? createProjections({ ...baseConfig, totalHeight }) : [];

  return (
    <svg className={className} width={totalWidth} height={totalHeight}>
      <path className="fillPath" d={fillPath} />
      <path className="strokePath" d={strokePath} strokeWidth={lineWidth} />
      {projections}
    </svg>
  );
};

LoadSpecificationChart.propTypes = {
  /**
   * Maximum value for x coordinates. By default will use width.
   */

  maxX: PropTypes.number,

  /**
   * Maximum value for y coordinates. By default will use height.
   */

  maxY: PropTypes.number,

  /**
   * Array of points describing the shape of chart.
   * Each point is an object with x and y coordinates.
   *
   *
   * Point (0,0) is the bottom-left corner, Point (width, height) is the top-right corner.
   *
   */

  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  ).isRequired,

  /**
   * Line width of chart.
   */

  lineWidth: PropTypes.number,

  /**
   * Flag indicating if dashed lines (projections) should be drawn for points above the x-axis.
   */

  drawProjections: PropTypes.bool,

  /**
   * Width of the chart
   */
  width: PropTypes.number.isRequired,

  /**
   * Height of the chart
   */
  height: PropTypes.number.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

LoadSpecificationChart.defaultProps = {
  lineWidth: 2,
  drawProjections: false,
  maxX: 0,
  maxY: 0,
  className: ''
};

export default LoadSpecificationChart;
