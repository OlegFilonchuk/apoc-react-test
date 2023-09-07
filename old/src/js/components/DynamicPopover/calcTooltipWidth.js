/**
 * @param {?number} maxWidth
 * @param {?number} width
 * @param {?number} contentWidth
 * @param {?number} contentParentWidth
 * @return {number}
 */
export default function calcTooltipWidth(
  maxWidth = undefined,
  width = undefined,
  contentWidth = undefined,
  contentParentWidth = undefined
) {
  if (!width && !contentWidth && !contentParentWidth) {
    return maxWidth;
  }

  const isMaxWidthSet = maxWidth != null;

  const horizontalOversize = contentParentWidth - contentWidth;

  if (horizontalOversize < 0) {
    return isMaxWidthSet ? Math.min(contentParentWidth, maxWidth) : contentParentWidth;
  }

  if (horizontalOversize === 0) {
    return isMaxWidthSet ? Math.min(maxWidth, width) : width;
  }
  const newWidth = width - horizontalOversize;

  return isMaxWidthSet ? Math.min(maxWidth, newWidth) : newWidth;
}
