import React from 'react';
import PropTypes from 'prop-types';
import { getDataTestElementProps } from '../../../../utils/dataTestElementPropUtils';

const DEFAULT_FONT_COLOR = 'white';

function Label({
  percentage,
  labelOffsetData,
  isLabelInsideSector,
  offsets: { offsetX, offsetY },
  onRemove,
  id,
  fontSize,
  processedPercentages,
  name,
  coords,
  side,
  isWideEnough,
  nameShouldBeHidden,
  ...restProps
}) {
  const { x, y } = coords;

  const getTextAnchor = () => {
    if (isLabelInsideSector || !labelOffsetData.useBendPointer) {
      return 'middle';
    } else if (side === 'right') {
      return 'start';
    }

    return 'end';
  };

  const fontColor = isLabelInsideSector ? DEFAULT_FONT_COLOR : labelOffsetData.outerLabelColor;

  const verticalOffset =
    !isLabelInsideSector && isWideEnough && !nameShouldBeHidden && labelOffsetData.useBendPointer ? 0 : offsetY;

  const bc = !isLabelInsideSector && labelOffsetData.useBendPointer ? fontSize * 0.4 : 0;

  const correctedY = y + verticalOffset + bc;

  return (
    <text
      x={x + offsetX}
      y={correctedY}
      fontSize={fontSize}
      fill={fontColor}
      textAnchor={getTextAnchor()}
      onClick={() => onRemove(id, percentage * 100)}
      {...getDataTestElementProps(restProps)}
    >
      {name}
      {processedPercentages}
    </text>
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
  fontSize: PropTypes.number,
  name: PropTypes.string,
  onRemove: PropTypes.func,
  id: PropTypes.string,
  labelOffsetData: PropTypes.shape({
    labelOffset: PropTypes.shape({
      innerLabelOffset: PropTypes.number,
      outerLabelOffset: PropTypes.number
    }),
    maxSectorAngle: PropTypes.number.isRequired,
    outerLabelColor: PropTypes.string.isRequired
  }).isRequired,
  isLabelInsideSector: PropTypes.bool.isRequired,
  coords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  offsets: PropTypes.shape({
    offsetX: PropTypes.number,
    offsetY: PropTypes.number
  }).isRequired,
  side: PropTypes.string.isRequired,
  isWideEnough: PropTypes.bool.isRequired,
  nameShouldBeHidden: PropTypes.bool.isRequired
};

Label.defaultProps = {
  percentageShift: 0,
  percentage: 0,
  processedPercentages: '',
  fontSize: 16,
  name: '',
  offsetY: 0,
  isRemoveButtonComponent: false,
  onRemove: () => true,
  id: ''
};

export default Label;
