import React from 'react';
import PropTypes from 'prop-types';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../../../utils/dataTestElementPropUtils';

const TEXT_ANCHOR = 'middle';

function Label({
  id,
  name,
  percentage,
  labelOffsetData,
  offsets: { offsetX, offsetY },
  onRemove,
  pathColor,
  processedPercentages,
  isLabelInsideSector,
  coords,
  fontSize,
  isWideEnough,
  nameShouldBeHidden,
  ...restProps
}) {
  const { x, y } = coords;

  const verticalOffset = !isLabelInsideSector && isWideEnough && !nameShouldBeHidden ? 0 : offsetY;

  const correctedY = y + verticalOffset;

  const CIRCLE_CORRECTION = isLabelInsideSector ? -4 : -3;

  const BUTTON_BACKGROUND_COLOR = '#fff';
  const OUTER_BUTTON_COLOR = '#0290d7';

  const FONT_SIZE_VERTICAL_CORRECTION_RATIO = 0.4;
  const bendPointerCorrection =
    !isLabelInsideSector && labelOffsetData.useBendPointer ? fontSize * FONT_SIZE_VERTICAL_CORRECTION_RATIO : 0;

  const onItemRemove = e => {
    e.stopPropagation();

    return onRemove(id, percentage * 100);
  };

  return (
    <g>
      <circle
        cx={x + offsetX}
        cy={correctedY + CIRCLE_CORRECTION + bendPointerCorrection}
        r={isLabelInsideSector ? '7' : '6'}
        fill={BUTTON_BACKGROUND_COLOR}
        stroke={isLabelInsideSector ? null : OUTER_BUTTON_COLOR}
        strokeWidth="1"
        onClick={onItemRemove}
        className="removeButton"
        {...getDataTestElementProps(restProps)}
      />
      <text
        x={x + offsetX}
        y={correctedY + bendPointerCorrection}
        fontSize={isLabelInsideSector ? 10 : 8}
        fill={isLabelInsideSector ? pathColor : OUTER_BUTTON_COLOR}
        textAnchor={TEXT_ANCHOR}
        className="removeButton"
        onClick={onItemRemove}
        {...getDataTestElementProps(restProps)}
      >
        {name}
        {processedPercentages}
      </text>
    </g>
  );
}

Label.propTypes = {
  /**
   * Percentage for Label to display
   */
  percentage: PropTypes.number,
  /**
   * Text for Label
   */
  processedPercentages: PropTypes.string,

  /**
   * FontSize for Label
   */
  name: PropTypes.string,

  onRemove: PropTypes.func,
  id: PropTypes.string,
  labelOffsetData: PropTypes.shape({
    labelOffset: PropTypes.shape({
      innerLabelOffset: PropTypes.number,
      outerLabelOffset: PropTypes.number
    }).isRequired,
    maxSectorAngle: PropTypes.number.isRequired,
    outerLabelColor: PropTypes.string.isRequired
  }).isRequired,
  pathColor: PropTypes.string.isRequired,
  isLabelInsideSector: PropTypes.bool.isRequired,
  coords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  fontSize: PropTypes.number.isRequired,
  offsets: PropTypes.shape({
    offsetX: PropTypes.number,
    offsetY: PropTypes.number
  }).isRequired,
  isWideEnough: PropTypes.bool.isRequired,
  nameShouldBeHidden: PropTypes.bool.isRequired,
  ...dataTestElementPropTypes
};

Label.defaultProps = {
  percentageShift: 0,
  percentage: 0,
  centerShift: 0,
  processedPercentages: '',
  name: '',
  offsetY: 0,
  onRemove: () => true,
  id: ''
};

export default Label;
