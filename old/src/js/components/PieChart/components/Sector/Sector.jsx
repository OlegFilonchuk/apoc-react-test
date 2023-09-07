import React from 'react';
import PropTypes from 'prop-types';
import Path from './Path';
import Label from './Label';
import RemoveButton from './RemoveButton';
import Pointer from './Pointer';

import getElementCoordinates from './helpers/getElementCoordinates';
import percentageToAngle from './helpers/getPercentageToAngle';
import getDataTestElementName from './helpers/getDataTestElementName';
import getCustomizedName from './helpers/getCustomizedName';
import getNamePercentageEmptySpaceRatio from './helpers/getNamePercentageEmptySpaceRatio';
import shouldHideName from './helpers/shouldHideName';
import getOffsetX from './helpers/getOffsetX';
import getOffsetY from './helpers/getOffsetY';
import { getDataTestElementProps } from '../../../../utils/dataTestElementPropUtils';

let idForHighlight = '';

function Sector({
  percentageShift,
  percentage,
  centerShift,
  color,
  highlight,
  fontSize,
  name,
  labels,
  id,
  onRemove,
  labelOffsetData,
  numberOfElements,
  onSectorEnter,
  onSectorLeave,
  hoveredSectorIdForHighlight,
  customSectorIdForHighlight,
  backgroundColor,
  size,
  maxNameLengths,
  useCoveringFix,
  piechartPadding,
  hasWarn,
  box
}) {
  // Label coordinates
  const { x, y } = getElementCoordinates(percentageShift, percentage, centerShift, labelOffsetData);

  // Processed percentages
  const processedPercentage = Math.round(percentage * 10000) / 100;

  // Percentages label strings
  const processedLabel = `\r\n${processedPercentage}%`;

  // Checks if label is inside a sector
  const isLabelInsideSector = percentageToAngle(percentage) > labelOffsetData.maxSectorAngle;

  // Checks, on which horizontal side of PieChart sector has center
  const sectorHorizontalSide = x < centerShift < 0.5 ? 'right' : 'left';

  const horizontalSideRatio = sectorHorizontalSide === 'right' ? 1 : -1;

  // Checks, on which vertical side of PieChart sector has center
  // eslint-disable-next-line
  const sectorVerticalSide = y - centerShift > 0 ? 'top' : 'bottom';

  const verticalSideRatio = sectorVerticalSide === 'top' ? 1 : -1;

  // Outer label / inner label font size ratio
  const INNER_OUTER_FONT_SIZE_RATIO = 0.9;

  // Check which fontSize should label use
  const customizedFontSize = isLabelInsideSector ? fontSize : fontSize * INNER_OUTER_FONT_SIZE_RATIO;

  const pieChartRadius = size / 2;

  // Ratio which manages pointer horizontal line length, due to x position (x === centerShift => 1, x === centerShift - radius => 0)
  const horizontalLineLengthRatio = 1 - Math.abs(Math.abs((pieChartRadius - x - centerShift) / pieChartRadius) - 1);

  // Ratio which sets initial pointer horizontal length
  const horizontalLinePiechartSizeRatio = 1 / 12;

  // Horizontal line final length
  const horizontalLineLength = size * horizontalLinePiechartSizeRatio * horizontalSideRatio * horizontalLineLengthRatio;

  // If is not wide enough, then value is shown in a box
  const isWideEnough = percentage > box.wideEnoughIfGreaterThan / 100;

  // Sets each label X offset, in the case when we want to set bend pointer
  const SPACINGS = {
    WIDE_ENOUGH: {
      RM_BASE: 7,
      RM_NAME: 15
    },
    NOT_WIDE_ENOUGH: {
      RM: 6,
      NAME: 6,
      PERC: 6
    }
  };

  // Length between percentages and remove button, when label is outer and wide enough
  const percentagesOffsetFromRmBtn =
    (SPACINGS.WIDE_ENOUGH.RM_NAME +
      getCustomizedName({ name, maxNameLengths, isLabelInsideSector }).length *
        getNamePercentageEmptySpaceRatio({ name, maxNameLengths })) *
    horizontalSideRatio;

  // Calculate additional x offset
  const offsetX = ({ labelType, nameShouldBeHidden }) =>
    getOffsetX({
      labelType,
      nameShouldBeHidden,
      labelOffsetData,
      isLabelInsideSector,
      isWideEnough,
      horizontalLineLength,
      percentagesOffsetFromRmBtn,
      SPACINGS,
      horizontalSideRatio,
      percentage,
      name
    });

  // Check if should hide name when label is cropped by edges
  const nameShouldBeHidden = shouldHideName({
    x,
    centerShift,
    pieChartRadius,
    piechartPadding,
    isLabelInsideSector,
    labelOffsetData,
    percentagesOffsetFromRmBtn,
    offsetX: offsetX({ labelType: 'removeButton', nameShouldBeHidden: false })
  });

  const coverLineMaxLength = pieChartRadius / 15;

  const coverFix =
    useCoveringFix && !isLabelInsideSector && labelOffsetData.useBendPointer
      ? coverLineMaxLength * verticalSideRatio * horizontalLineLengthRatio * 1.5
      : 0;

  const getYWithCoverFix = () => y + coverFix;

  const pathComponent = (
    <Path
      percentageShift={percentageShift}
      percentage={percentage}
      centerShift={centerShift}
      numberOfElements={numberOfElements}
      color={color}
      highlight={highlight}
      hasWarn={hasWarn}
    />
  );

  const percentagesComponent = (
    <Label
      coords={{ x, y: getYWithCoverFix() }}
      percentage={percentage}
      processedPercentages={processedLabel}
      fontSize={customizedFontSize}
      offsets={{
        offsetY:
          labels.percentage.offsetY +
          getOffsetY({ labelType: 'percentages', isWideEnough, nameShouldBeHidden, offsets: box.label.offset }),
        offsetX: offsetX({ labelType: 'percentages', nameShouldBeHidden, isWideEnough })
      }}
      labelOffsetData={labelOffsetData}
      isLabelInsideSector={isLabelInsideSector}
      side={sectorHorizontalSide}
      isWideEnough={isWideEnough}
      nameShouldBeHidden={nameShouldBeHidden}
    />
  );

  const sliceNameIfInBox = mnl =>
    !isWideEnough || nameShouldBeHidden
      ? {
          ...mnl,
          outer: maxNameLengths.outerBox
        }
      : maxNameLengths;

  const nameComponent = (
    <Label
      coords={{ x, y: getYWithCoverFix() }}
      percentage={percentage}
      name={getCustomizedName({ name, maxNameLengths: sliceNameIfInBox(maxNameLengths), isLabelInsideSector })}
      fontSize={customizedFontSize}
      offsets={{
        offsetY:
          labels.name.offsetY +
          getOffsetY({ labelType: 'name', isWideEnough, nameShouldBeHidden, offsets: box.label.offset }),
        offsetX: offsetX({ labelType: 'name', nameShouldBeHidden })
      }}
      labelOffsetData={labelOffsetData}
      isLabelInsideSector={isLabelInsideSector}
      side={sectorHorizontalSide}
      isWideEnough={isWideEnough}
      nameShouldBeHidden={nameShouldBeHidden}
    />
  );

  const deleteSectorComponent = (
    <RemoveButton
      coords={{ x, y: getYWithCoverFix() }}
      percentage={percentage}
      name="&#10006;"
      offsets={{
        offsetY:
          labels.removeButton.offsetY +
          getOffsetY({ labelType: 'removeButton', isWideEnough, nameShouldBeHidden, offsets: box.label.offset }),
        offsetX: offsetX({ labelType: 'removeButton', nameShouldBeHidden })
      }}
      id={id}
      onRemove={onRemove}
      {...getDataTestElementProps(
        name ? `${getDataTestElementName(name)}PiechartRemoveButton` : `${id}PiechartRemoveButton`
      )}
      labelOffsetData={labelOffsetData}
      pathColor={color}
      isLabelInsideSector={isLabelInsideSector}
      backgroundColor={backgroundColor}
      fontSize={customizedFontSize}
      isWideEnough={isWideEnough}
      nameShouldBeHidden={nameShouldBeHidden}
    />
  );

  const pointer = (
    <Pointer
      centerShift={centerShift}
      percentageShift={percentageShift}
      percentage={percentage}
      labelOffsetData={labelOffsetData}
      color={color}
      highlight={highlight}
      size={size}
      horizontalSideRatio={horizontalSideRatio}
      horizontalLineLengthRatio={horizontalLineLengthRatio}
      coords={{ x, y: getYWithCoverFix() }}
      horizontalLinePiechartSizeRatio={horizontalLinePiechartSizeRatio}
    />
  );

  const rectangular = (
    <rect
      x={
        x +
        offsetX({ labelType: 'removeButton', nameShouldBeHidden, isWideEnough }) +
        (sectorHorizontalSide === 'left' ? -box.width : 0)
      }
      y={getYWithCoverFix() + box.offset.y}
      height={box.height}
      width={box.width}
      style={{
        fillOpacity: 0,
        strokeWidth: 1,
        stroke: 'rgb(187, 187, 187)'
      }}
    />
  );

  idForHighlight = customSectorIdForHighlight || hoveredSectorIdForHighlight;

  const shouldHighlight = idForHighlight === id;

  const shouldShow = (isWideEnough && !nameShouldBeHidden) || shouldHighlight;

  const showRemoveButton = labels.removeButton.show && shouldShow;
  const showName = labels.name.show && shouldShow;
  const showPercentages = labels.percentage.show && shouldShow;
  const showPointer = percentage * 360 < labelOffsetData.maxSectorAngle && shouldShow;

  return (
    <g
      onMouseOver={() => onSectorEnter(id)}
      onMouseLeave={() => onSectorLeave()}
      filter={shouldHighlight ? 'url(#highlight)' : ''}
    >
      {pathComponent}
      {(!isWideEnough || nameShouldBeHidden) && shouldShow ? rectangular : null}
      {showPointer ? pointer : null}
      {showRemoveButton ? deleteSectorComponent : null}
      {showName ? nameComponent : null}
      {showPercentages ? percentagesComponent : null}
    </g>
  );
}

Sector.propTypes = {
  /**
   * Percentage for Sector to rotate
   */
  percentageShift: PropTypes.number,

  /**
   * Percentage for Sector to display
   */
  percentage: PropTypes.number,

  /**
   * Center of svg container (same for x, y)
   */
  centerShift: PropTypes.number,

  /**
   * Color of Sector fill
   */
  color: PropTypes.string,

  /**
   * Font size for Sector labels
   */
  fontSize: PropTypes.number,

  /**
   * Is the sector highlighted
   */
  highlight: PropTypes.bool,

  /**
   * Label content
   */
  name: PropTypes.string,

  /**
   * Single label visibility / positioning (needed if there is more than 1 label, to not overlap each other)
   */
  labels: PropTypes.shape({
    percentage: PropTypes.shape({
      show: PropTypes.bool,
      offsetY: PropTypes.number
    }),
    name: PropTypes.shape({
      show: PropTypes.bool,
      offsetY: PropTypes.number
    }),
    removeButton: PropTypes.shape({
      show: PropTypes.bool,
      offsetY: PropTypes.number
    })
  }),

  /**
   * Element id
   */
  id: PropTypes.string,

  /**
   * Removing sector callback
   */
  onRemove: PropTypes.func,

  /**
   * Labels container offset data:
   *
   */
  labelOffsetData: PropTypes.shape({
    maxSectorAngle: PropTypes.number,
    outerLabelColor: PropTypes.string,
    labelOffset: PropTypes.shape({
      innerLabelOffset: PropTypes.number,
      outerLabelOffset: PropTypes.number
    })
  }).isRequired,
  numberOfElements: PropTypes.number.isRequired,
  onSectorEnter: PropTypes.func,
  onSectorLeave: PropTypes.func,
  hoveredSectorIdForHighlight: PropTypes.string,
  customSectorIdForHighlight: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  maxNameLengths: PropTypes.shape({
    inner: PropTypes.number,
    outer: PropTypes.outer
  }).isRequired,
  useCoveringFix: PropTypes.bool.isRequired,
  piechartPadding: PropTypes.number.isRequired,
  hasWarn: PropTypes.bool,
  box: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.shape({
      y: PropTypes.number
    }),
    label: PropTypes.shape({
      offset: PropTypes.shape({
        name: PropTypes.shape({
          y: PropTypes.number
        }),
        percentages: PropTypes.shape({
          y: PropTypes.number
        }),
        removeButton: PropTypes.shape({
          y: PropTypes.number
        })
      })
    })
  })
};

Sector.defaultProps = {
  percentageShift: 0,
  percentage: 0.5,
  centerShift: 0,
  color: 'white',
  label: '',
  fontSize: 16,
  highlight: false,
  name: '',
  labels: {
    percentage: {
      show: true,
      offsetY: 0
    },
    name: {
      show: false,
      offsetY: 15
    },
    removeButton: {
      show: false,
      offsetY: -15
    }
  },
  id: '',
  onRemove: () => true,
  onSectorEnter: () => true,
  onSectorLeave: () => true,
  hoveredSectorIdForHighlight: '',
  customSectorIdForHighlight: '',
  hasWarn: false,
  box: {
    wideEnoughIfGreaterThan: 0,
    width: 0,
    height: 0,
    offset: {
      y: 0
    },
    label: {
      offset: {
        name: {
          y: 0
        },
        percentages: {
          y: 0
        },
        removeButton: {
          y: 0
        }
      }
    }
  }
};

export default Sector;
