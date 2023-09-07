import React from 'react';
import PropTypes from 'prop-types';

const OUTLINE_COLOR = 'lightGrey';
const OUTLINE_STROKE_WIDTH = 1;
const OUTLINE_FILL_NONE = 'none';

const OUTLINE_COLOR_WARN = 'red';
const OUTLINE_STROKE_WIDTH_WARN = 2;

function Outline(props) {
  const localSize = props.size - OUTLINE_STROKE_WIDTH;
  const centerShift = localSize / 2 + OUTLINE_STROKE_WIDTH / 2;
  const radius = localSize / 2 + 2;

  return (
    <circle
      cx={centerShift}
      cy={centerShift}
      r={radius}
      stroke={props.outlineWarning ? OUTLINE_COLOR_WARN : OUTLINE_COLOR}
      strokeWidth={props.outlineWarning ? OUTLINE_STROKE_WIDTH_WARN : OUTLINE_STROKE_WIDTH}
      fill={OUTLINE_FILL_NONE}
    />
  );
}

Outline.propTypes = {
  /*
   * an svg container size.
   * component is going to use this value to place label in the middle of container.
   */
  size: PropTypes.number.isRequired,
  outlineWarning: PropTypes.bool
};

Outline.defaultProps = {
  outlineWarning: false
};

export default Outline;
