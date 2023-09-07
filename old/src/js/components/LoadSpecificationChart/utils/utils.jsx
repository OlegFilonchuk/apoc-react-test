import React from 'react';

const getRelativePoint = config => {
  const { point, width, height, maxX, maxY, padding = 0 } = config;
  const relativeX = (point.x * width) / maxX + padding;
  const relativeY = height - (point.y * height) / maxY + padding;

  return {
    x: relativeX,
    y: relativeY
  };
};

const createPath = config => {
  const { points, startingPoint, endingPoint = null, width, height, maxX, maxY, padding = 0 } = config;
  let path = `M ${startingPoint.x} ${startingPoint.y} `;

  path += points.reduce((total, curr) => {
    const currPoint = getRelativePoint({ point: curr, width, height, maxX, maxY, padding });

    return `${total}L ${currPoint.x} ${currPoint.y} `;
  }, '');

  if (endingPoint) {
    path += `L ${endingPoint.x} ${endingPoint.y}`;
  }

  return path;
};

const drawLine = (start, end) => `M ${start.x} ${start.y} L ${end.x} ${end.y} `;

const createProjections = config => {
  const { points, width, height, maxX, maxY, totalHeight, padding } = config;

  return points
    .filter(p => p.y > 0)
    .map((p, i) => {
      const relativePoint = getRelativePoint({ point: p, width, height, maxX, maxY });
      const startingPoint = {
        x: relativePoint.x + padding,
        y: relativePoint.y
      };
      const endingPoint = {
        x: relativePoint.x + padding,
        y: totalHeight
      };
      const path = drawLine(startingPoint, endingPoint);

      /* eslint react/no-array-index-key: 0 */
      return <path key={i} className="projection" d={path} />;
    });
};

export { getRelativePoint, createPath, createProjections };
