import PopoverPlacements from '../Popover/PopoverPlacements';

const leftEdgePlacements = [PopoverPlacements.RIGHT_TOP, PopoverPlacements.TOP_RIGHT, PopoverPlacements.BOTTOM_RIGHT];

/**
 * @param {number} x
 * @param {number} width
 * @param {string} placement
 * @return {number} by how many pixels edge is overflowed. 0 means the content does not overflow the edge
 */
export default function overflowsEdge(x, width, placement) {
  const checkLeftEdge = leftEdgePlacements.includes(placement);

  if (checkLeftEdge) {
    return Math.abs(Math.min(0, x));
  }

  return Math.abs(Math.min(0, document.body.offsetWidth - x - width));
}
