import React from 'react';
import PropTypes from 'prop-types';

const Pointer = ({
  centerShift,
  color,
  labelOffsetData: { useBendPointer },
  highlight,
  size,
  horizontalSideRatio,
  horizontalLineLengthRatio,
  coords: { x, y },
  horizontalLinePiechartSizeRatio
}) => {
  const mainLine = (
    <line
      x1={`${centerShift}`}
      y1={`${centerShift}`}
      x2={`${x}`}
      y2={`${y}`}
      strokeWidth="1"
      stroke={`${color}`}
      filter={highlight ? 'url(#highlight)' : ''}
    />
  );

  const horizontalLineLength = size * horizontalLinePiechartSizeRatio * horizontalSideRatio * horizontalLineLengthRatio;

  const horizontalLine = (
    <line x1={`${x}`} y1={`${y}`} x2={`${x + horizontalLineLength}`} y2={`${y}`} strokeWidth="1" stroke={`${color}`} />
  );

  return (
    <g>
      {mainLine}
      {useBendPointer ? horizontalLine : null}
    </g>
  );
};

export default Pointer;

Pointer.propTypes = {
  coords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  horizontalLineLengthRatio: PropTypes.number.isRequired,
  centerShift: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  labelOffsetData: PropTypes.shape({
    labelOffset: PropTypes.shape({
      outerLabelOffset: PropTypes.number
    }),
    pointerCorrection: PropTypes.number
  }).isRequired,
  highlight: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  horizontalSideRatio: PropTypes.number.isRequired,
  horizontalLinePiechartSizeRatio: PropTypes.number.isRequired
};
