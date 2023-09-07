import getRadianAngle from './helpers/getRadianAngle';
import percentageToAngle from './helpers/getPercentageToAngle';

const FIFTY_PERCENT = 0.5;

export const calculatePathPoints = (percentage, radius) => {
  const sectorAngle = percentageToAngle(percentage);
  const angleInRadian = getRadianAngle(sectorAngle);

  const secondPointX = radius + radius * Math.sin(angleInRadian);
  const secondPointY = radius - radius * Math.cos(angleInRadian);

  return {
    secondPointX,
    secondPointY
  };
};

export const getPathSettings = (percentageShift, percentage, radius, color) => {
  const coords = calculatePathPoints(percentage, radius);
  const direction = percentage > FIFTY_PERCENT ? 1 : 0;
  const rotateAngle = percentageToAngle(percentageShift);

  const { secondPointX: X, secondPointY: Y } = coords;

  const moveTo = `M${radius}, 0`;
  const arch = `A${radius}, ${radius} 0 ${direction}, 1 ${X}, ${Y}`;
  const lineTo = `L${radius}, ${radius}`;
  const closer = 'z';

  const d = `${moveTo} ${arch} ${lineTo} ${closer}`;

  const transform = `rotate(${rotateAngle},${radius},${radius})`;
  const fill = color;

  return { d, transform, fill, coords: { X, Y } };
};

export const getRotate = (percentageShift, radius) => {
  const rotateAngle = percentageToAngle(percentageShift);

  return `rotate(${rotateAngle},${radius},${radius})`;
};

/*
Adjusts coordination system based on the point location
*/

const getSectorShift = (x, y) => {
  const isXpositive = x >= 0;
  const isYpositive = y >= 0;

  if (isXpositive && !isYpositive) {
    return 0.5;
  }

  if (isXpositive && isYpositive) {
    return -0.5;
  }

  if (!isXpositive && isYpositive) {
    return 1.5;
  }

  // !isXpositive && !isYpositive
  return -1.5;
};

/*
Calculates angle between y axis (center will be cx,cy) and the mouse coords (x,y)
return value is between 0 and 2*PI
*/
export const getPointAngle = (x, y, cx, cy) => {
  const dx = x - cx;
  const dy = y - cy;

  const angle = Math.abs(Math.PI * getSectorShift(dx, dy) - Math.atan(Math.abs(dy / dx)));

  return angle;
};

export const roundTo = (number, decimalPlaces) => Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;
