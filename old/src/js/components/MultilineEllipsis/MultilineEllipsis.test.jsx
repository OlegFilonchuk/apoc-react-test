import React from 'react';
import { mount } from 'enzyme';

import MultilineEllipsis from './MultilineEllipsis';

const mountElement = ({ children, ...restOfProps }) =>
  mount(<MultilineEllipsis {...restOfProps}>{children || (() => null)}</MultilineEllipsis>, {
    attachTo: document.createElement('tr')
  });

const lineHeight = 10;

window.getComputedStyle = () => ({ 'line-height': lineHeight });

describe('<MultilineEllipsis />', () => {
  describe('method - shouldBeTruncated', () => {
    describe('when maxLines is 1', () => {
      let element;

      beforeAll(() => {
        element = mountElement({ maxLines: 1 });
      });

      describe('clientHeight is higher then scrollHeight', () => {
        const clientHeight = 51;
        const scrollHeight = 50;

        it('returns false', () =>
          expect(
            element.instance().shouldBeEllipsed({
              clientHeight,
              scrollHeight
            })
          ).toBe(false));
      });
      describe('clientHeight is lower then scrollHeight by maxLines', () => {
        const clientHeight = 50;
        const scrollHeight = 51;

        it('returns true', () =>
          expect(
            element.instance().shouldBeEllipsed({
              clientHeight,
              scrollHeight
            })
          ).toBe(true));
      });
      describe('clientHeight is lower then scrollHeight by more than maxLines', () => {
        const clientHeight = 50;
        const scrollHeight = 52;

        it('returns true', () =>
          expect(
            element.instance().shouldBeEllipsed({
              clientHeight,
              scrollHeight
            })
          ).toBe(true));
      });
      describe('clientHeight equals to scrollHeight', () => {
        const clientHeight = 50;
        const scrollHeight = 50;

        it('returns false', () =>
          expect(
            element.instance().shouldBeEllipsed({
              clientHeight,
              scrollHeight
            })
          ).toBe(false));
      });
    });
    describe('method - shouldBeTruncated', () => {
      describe('when maxLines is 3', () => {
        let element;

        beforeAll(() => {
          element = mountElement({ maxLines: 3 });
        });

        describe('clientHeight is higher then scrollHeight by less than maxLine', () => {
          const clientHeight = 52;
          const scrollHeight = 50;

          it('returns false', () =>
            expect(
              element.instance().shouldBeEllipsed({
                clientHeight,
                scrollHeight
              })
            ).toBe(false));
        });

        describe('clientHeight is higher then scrollHeight by axLine', () => {
          const clientHeight = 53;
          const scrollHeight = 50;

          it('returns true', () =>
            expect(
              element.instance().shouldBeEllipsed({
                clientHeight,
                scrollHeight
              })
            ).toBe(false));
        });
      });
    });
  });

  describe('method - getMaxHeight', () => {
    describe('when maxLines is 1', () => {
      let element;

      beforeAll(() => {
        element = mountElement({ maxLines: 1 });
      });

      it('returns 1 * lineHeight', () => {
        expect(element.instance().getMaxHeight()).toEqual(lineHeight);
      });
    });
    describe('when maxLines is 2', () => {
      let element;

      beforeAll(() => {
        element = mountElement({ maxLines: 2 });
      });

      it('returns 2* lineHeight', () => {
        expect(element.instance().getMaxHeight()).toEqual(lineHeight * 2);
      });
    });
    describe('when maxLines is 15', () => {
      let element;

      beforeAll(() => {
        element = mountElement({ maxLines: 15 });
      });

      it('returns 15* lineHeight', () => {
        expect(element.instance().getMaxHeight()).toEqual(lineHeight * 15);
      });
    });
  });
});
