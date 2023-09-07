import invert from 'lodash/invert';

const POPOVER_PLACEMENTS = {
  LEFT_TOP: 'leftTop',
  RIGHT_TOP: 'rightTop',
  TOP_RIGHT: 'topRight',
  TOP_LEFT: 'topLeft',
  BOTTOM_RIGHT: 'bottomRight',
  BOTTOM_LEFT: 'bottomLeft',
  TOP_MIDDLE: 'topMiddle',
  RIGHT_MIDDLE: 'rightMiddle',
  LEFT_MIDDLE: 'leftMiddle',
  BOTTOM_MIDDLE: 'bottomMiddle'
};

const oppositePlacementsPartial = {
  [POPOVER_PLACEMENTS.BOTTOM_RIGHT]: POPOVER_PLACEMENTS.BOTTOM_LEFT,
  [POPOVER_PLACEMENTS.TOP_RIGHT]: POPOVER_PLACEMENTS.TOP_LEFT,
  [POPOVER_PLACEMENTS.TOP_MIDDLE]: POPOVER_PLACEMENTS.BOTTOM_MIDDLE,
  [POPOVER_PLACEMENTS.RIGHT_MIDDLE]: POPOVER_PLACEMENTS.LEFT_MIDDLE
};

export const POPOVER_PLACEMENTS_OPPOSITE = {
  ...oppositePlacementsPartial,
  ...invert(oppositePlacementsPartial)
};

Object.freeze(POPOVER_PLACEMENTS);

export default POPOVER_PLACEMENTS;
