// import getOffsetX from './getOffsetX';

export default ({
  x,
  centerShift,
  pieChartRadius,
  piechartPadding,
  isLabelInsideSector,
  labelOffsetData,
  percentagesOffsetFromRmBtn,
  offsetX
}) => {
  // Remove button x position
  const removeButtonHorizontalPosition = x + offsetX;

  // Remove Button position from center of PieChart
  const removeButtonXFromCenter = Math.abs(removeButtonHorizontalPosition - centerShift);

  // Length between remove button and percentages label
  const removeButtonPercentagesLength = Math.abs(percentagesOffsetFromRmBtn);

  const HIDE_CORRECTION = 25;

  // Percentages x position
  const percentagesX = removeButtonXFromCenter + removeButtonPercentagesLength + HIDE_CORRECTION;

  // Edge of a PieChart
  const pieChartEdge = pieChartRadius + piechartPadding;

  return !isLabelInsideSector && labelOffsetData.useBendPointer && percentagesX > pieChartEdge;
};
