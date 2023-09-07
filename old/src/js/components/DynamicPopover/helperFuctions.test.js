import PopoverPlacements from '../Popover/PopoverPlacements';
import overflowsEdge from './overflowsEdge';
import calcTooltipWidth from './calcTooltipWidth';

describe('overflowsEdge', () => {
  describe('left edge placement', () => {
    describe('x bigger than 0', () => {
      it('returns 0', () => {
        const overflow = overflowsEdge(10, 10, PopoverPlacements.RIGHT_TOP);

        expect(overflow).toBe(0);
      });
    });
    describe('x smaller than by 10 pixels', () => {
      it('returns 10', () => {
        const overflow = overflowsEdge(-10, 10, PopoverPlacements.RIGHT_TOP);

        expect(overflow).toBe(10);
      });
    });
  });

  describe('left edge placement', () => {
    let originalBody;
    const bodyOffsetWidth = 100;

    beforeAll(() => {
      originalBody = document.body;

      Object.defineProperty(document, 'body', {
        value: {
          offsetWidth: bodyOffsetWidth
        }
      });

      expect(document.body.offsetWidth).toBe(bodyOffsetWidth);
    });

    afterAll(() => {
      Object.defineProperty(document, 'body', {
        value: originalBody
      });

      expect(document.body.offsetWidth).toBe(0);
    });

    describe('x+width bigger than document.body.offsetWidth by 10 pixels', () => {
      it('returns 10', () => {
        const overflow = overflowsEdge(90, 20, PopoverPlacements.LEFT_TOP);

        expect(overflow).toBe(10);
      });
    });
    describe('x+width smaller than document.body.offsetWidth', () => {
      it('returns 0', () => {
        const overflow = overflowsEdge(90, 5, PopoverPlacements.LEFT_TOP);

        expect(overflow).toBe(0);
      });
    });
  });
});

describe('calcTooltipWidth', () => {
  describe('maxWidth is not set', () => {
    describe('the rest of arguments are not set', () => {
      it('returns undefined', () => {
        const width = calcTooltipWidth();

        expect(width).toBe(undefined);
      });
    });

    describe('the rest of arguments are set', () => {
      describe('content parent width equals to content width', () => {
        it('returns unmodified width', () => {
          const width = calcTooltipWidth(undefined, 100, 80, 80);

          expect(width).toBe(100);
        });
      });
      describe('content parent width equals is bigger than content width', () => {
        it('returns modified width by difference between content parent width and content width', () => {
          const contentWidth = 40;
          const contentParentWidth = 80;
          const tooltipWidth = 100;
          const differenceBetweenContentWidthAndItsParent = contentParentWidth - contentWidth;
          const finalWidth = calcTooltipWidth(undefined, tooltipWidth, contentWidth, contentParentWidth);

          expect(finalWidth).toBe(tooltipWidth - differenceBetweenContentWidthAndItsParent);
        });
      });
    });
  });

  describe('maxWidth set', () => {
    describe('the rest of arguments are not set', () => {
      it('returns maxWidth value', () => {
        const maxWidth = 250;
        const width = calcTooltipWidth(maxWidth);

        expect(width).toBe(maxWidth);
      });
    });

    describe('the rest of arguments are set', () => {
      describe('tooltipWidth is not bigger than maxWidth', () => {
        describe('content parent width equals to content width', () => {
          it('returns unmodified width', () => {
            const width = calcTooltipWidth(250, 100, 80, 80);

            expect(width).toBe(100);
          });
        });
        describe('content parent width equals is bigger than content width', () => {
          it('returns modified width by difference between content parent width and content width', () => {
            const contentWidth = 40;
            const contentParentWidth = 80;
            const tooltipWidth = 100;
            const differenceBetweenContentWidthAndItsParent = contentParentWidth - contentWidth;
            const finalWidth = calcTooltipWidth(250, tooltipWidth, contentWidth, contentParentWidth);

            expect(finalWidth).toBe(tooltipWidth - differenceBetweenContentWidthAndItsParent);
          });
        });
      });

      describe('tooltipWidth is bigger than maxWidth', () => {
        it('returns unmodified width', () => {
          const width = calcTooltipWidth(250, 300, 280, 280);

          expect(width).toBe(250);
        });
      });
    });
  });
  describe('contentWidth is bigger than contentParentWidth ', () => {
    it('returns the contentParentWidth - the smaller one', () => {
      expect(calcTooltipWidth(undefined, 250, 100, 80)).toBe(80);
    });
  });
});
