import React from 'react';
import PropTypes from 'prop-types';
import { getPathSettings } from './Math';

const CLOSE_TO_ONE = 0.9999999;

const BASIC_STROKE_WIDTH = 1;
const WARN_STROKE_WIDTH = 3;

const BASIC_STROKE_COLOR = '#FFFFFF';
const WARN_STROKE_COLOR = '#D31326';

const getStroke = {
  width: (numberOfElements, hasWarn) => {
    if (hasWarn) {
      return `${WARN_STROKE_WIDTH}px`;
    } else if (numberOfElements > 1) {
      return `${BASIC_STROKE_WIDTH}px`;
    }

    return `0px`;
  },
  color: hasWarn => {
    if (hasWarn) {
      return WARN_STROKE_COLOR;
    }

    return BASIC_STROKE_COLOR;
  }
};

function Path({ percentageShift, centerShift, percentage, color, highlight, numberOfElements, hasWarn }) {
  // full arc (360 deg) will draw nothing (equivalent to 0 deg) hence hack of replacing 1 with 0.9999999
  const adjustedPercentage = percentage === 1 ? CLOSE_TO_ONE : percentage;
  const { fill, d, transform } = getPathSettings(percentageShift, adjustedPercentage, centerShift, color);

  const pathComponent = <path fill={fill} d={d} />;

  return (
    <g
      transform={transform}
      filter={highlight ? 'url(#highlight)' : ''}
      stroke={getStroke.color(hasWarn)}
      strokeWidth={getStroke.width(numberOfElements, hasWarn)}
    >
      {pathComponent}
    </g>
  );
}

Path.propTypes = {
  /**
   * Percentage for Path to rotate
   */
  percentageShift: PropTypes.number,

  /**
   * Percentage for Path to display
   */
  percentage: PropTypes.number.isRequired,

  /**
   * Center of svg container (same for x, y)
   */
  centerShift: PropTypes.number,

  /**
   * Color of Path fill
   */
  color: PropTypes.string,

  /**
   * Is the path highlighted
   */
  highlight: PropTypes.bool,

  /**
   * Numbers of all sectors in PieChart
   */
  numberOfElements: PropTypes.number.isRequired,

  /**
   * True, if mix has got not recommended properties
   */
  hasWarn: PropTypes.bool
};

Path.defaultProps = {
  highlight: false,
  percentageShift: 0,
  centerShift: 0,
  color: 'red',
  hasWarn: false
};

export default Path;
