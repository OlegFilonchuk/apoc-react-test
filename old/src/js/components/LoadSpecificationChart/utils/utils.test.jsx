import { getRelativePoint, createPath } from './utils';
import defaultPoints from './points';

describe('getRelativePoint', () => {
  let points;
  const width = 100;
  const height = 100;
  const maxX = 200;
  const maxY = 200;
  const padding = 5;

  beforeAll(() => {
    points = defaultPoints;
  });

  it('should calculate relative point for various possibilities', () => {
    points.forEach(point => {
      const received = getRelativePoint({ point: point.before, width, height, maxX, maxY, padding });

      expect(received).toEqual(point.expected);
    });
  });
});

describe('createPath', () => {
  let points;
  const width = 100;
  const height = 100;
  const maxX = width;
  const maxY = height;

  beforeAll(() => {
    points = [
      {
        x: 100,
        y: 0
      },
      {
        x: 120,
        y: 100
      },
      {
        x: 150,
        y: 100
      },
      {
        x: 180,
        y: 0
      }
    ];
  });

  it('should create path for basic case without ending point', () => {
    const startingPoint = getRelativePoint({ point: { x: 0, y: 0 }, width, height, maxX, maxY });
    const received = createPath({ points, startingPoint, endingPoint: null, width, height, maxX, maxY }).trim();

    const expected = 'M 0 100 L 100 100 L 120 0 L 150 0 L 180 100';

    expect(received).toEqual(expected);
  });

  it('should create path for basic case with ending point', () => {
    const startingPoint = getRelativePoint({ point: { x: 0, y: 0 }, width, height, maxX, maxY });
    const endingPoint = getRelativePoint({ point: { x: 200, y: 0 }, width, height, maxX, maxY });
    const received = createPath({ points, startingPoint, endingPoint, width, height, maxX, maxY }).trim();

    const expected = 'M 0 100 L 100 100 L 120 0 L 150 0 L 180 100 L 200 100';

    expect(received).toEqual(expected);
  });
});
