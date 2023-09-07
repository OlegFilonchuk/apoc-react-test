export default ({ labelType, isWideEnough, nameShouldBeHidden, offsets }) => {
  if (!isWideEnough || nameShouldBeHidden) {
    if (labelType === 'percentages') {
      return offsets.percentages.y;
    } else if (labelType === 'name') {
      return offsets.name.y;
    } else if (labelType === 'removeButton') {
      return offsets.removeButton.y;
    }
  }

  return 0;
};
