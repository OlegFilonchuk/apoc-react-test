import percentageToAngle from './getPercentageToAngle';
import getRadianAngle from './getRadianAngle';

const LABEL_SHIFT_KOEF = 0.5;

const getCenterCoordinates = centerShift => {
  const result = { x: centerShift, y: centerShift };

  return result;
};

const getCoordinatesForCustomPercentage = (
  percentageShift,
  percentage,
  centerShift,
  { labelOffset: { outerLabelOffset, innerLabelOffset }, maxSectorAngle }
) => {
  const localShift = centerShift * LABEL_SHIFT_KOEF;
  const sectorRotation = percentageToAngle(percentageShift);
  const sectorAngle = percentageToAngle(percentage);
  const labelAngle = -90 + sectorAngle / 2 + sectorRotation;
  const radianAngle = getRadianAngle(labelAngle);

  const labelPositioningOffset = sectorAngle < maxSectorAngle ? outerLabelOffset : innerLabelOffset;

  const y = centerShift + (localShift + parseFloat(labelPositioningOffset)) * Math.sin(radianAngle);
  const x = centerShift + (localShift + parseFloat(labelPositioningOffset)) * Math.cos(radianAngle);

  return { x, y };
};

export default (percentageShift, percentage, centerShift, labelOffsetData) => {
  let result;

  if (percentage === 1) {
    result = getCenterCoordinates(centerShift);
  } else {
    result = getCoordinatesForCustomPercentage(percentageShift, percentage, centerShift, labelOffsetData);
  }

  return result;
};
