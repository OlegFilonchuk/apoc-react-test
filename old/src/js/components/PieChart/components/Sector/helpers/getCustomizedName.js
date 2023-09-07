// Get label name due to the length restrictions

export default ({ name, maxNameLengths, isLabelInsideSector }) => {
  if (isLabelInsideSector && name.length > maxNameLengths.inner) {
    return `${name.slice(0, maxNameLengths.inner)}...`;
  } else if (!isLabelInsideSector && name.length > maxNameLengths.outer) {
    return `${name.slice(0, maxNameLengths.outer)}...`;
  }

  return name;
};
