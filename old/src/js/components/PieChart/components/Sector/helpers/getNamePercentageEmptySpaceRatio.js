// Ratio responsible for setting empty space length between percentages label and other labels
export default ({ name, maxNameLengths }) => {
  const SHORT_NAME_LENGTH_RATIO = 7.2;
  const LONG_NAME_LENGTH_RATIO = 5.8;
  const SLICED_NAME_LENGTH_RATIO = 5.3;

  if (name.length <= maxNameLengths.outer) {
    return name.length < 10 ? SHORT_NAME_LENGTH_RATIO : LONG_NAME_LENGTH_RATIO;
  }

  return SLICED_NAME_LENGTH_RATIO;
};
