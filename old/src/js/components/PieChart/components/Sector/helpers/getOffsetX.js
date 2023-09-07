const parsePerc = percentage => {
  if (!percentage) {
    return 0;
  }
  const percString = (percentage * 100).toString().length;

  return Math.abs(19 - percString * 1.7);
};

const parseName = name => {
  if (!name) {
    return 0;
  } else if (name.length > 10) {
    return 0;
  }

  return Math.abs(19 - name.length * 1.8);
};

export default ({
  labelType,
  labelOffsetData,
  isLabelInsideSector,
  isWideEnough,
  horizontalLineLength,
  percentagesOffsetFromRmBtn,
  SPACINGS,
  horizontalSideRatio,
  nameShouldBeHidden,
  percentage,
  name
}) => {
  if (labelOffsetData.useBendPointer) {
    if (!isLabelInsideSector) {
      if (isWideEnough && !nameShouldBeHidden) {
        if (labelType === 'percentages') {
          return horizontalLineLength + percentagesOffsetFromRmBtn;
        } else if (labelType === 'name') {
          return horizontalLineLength + SPACINGS.WIDE_ENOUGH.RM_NAME * horizontalSideRatio;
        } else if (labelType === 'removeButton') {
          return horizontalLineLength + SPACINGS.WIDE_ENOUGH.RM_BASE * horizontalSideRatio;
        }

        return 0;
      } else if (!isWideEnough || nameShouldBeHidden) {
        if (labelType === 'percentages') {
          return horizontalLineLength + parsePerc(percentage) * horizontalSideRatio;
        } else if (labelType === 'name') {
          return horizontalLineLength + parseName(name) * horizontalSideRatio;
        } else if (labelType === 'removeButton') {
          return horizontalLineLength;
        }
      }
    }

    return 0;
  }

  return 0;
};
