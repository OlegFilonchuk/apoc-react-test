import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

const mountElement = ({ children, ...restOfProps }, Component) =>
  mount(<Component {...restOfProps}>{children || (() => null)}</Component>);

const lineHeight = 10;

window.getComputedStyle = () => ({ 'line-height': lineHeight });

/* eslint-disable no-return-assign */
describe('<MultilineEllipsisPopover />', () => {
  describe('when is ellipsed', () => {
    let element;

    beforeAll(() => {
      jest.resetModules();
      jest.doMock('./../MultilineEllipsis/MultilineEllipsis', () => ({ children }) =>
        children({ ellipsisRef: () => null, ellipsed: true })
      );
      /* eslint-disable global-require */
      const TableCellWithTextEllipsis = require('./MultilineEllipsisPopover').default;
      /* eslint-enable global-require */

      element = mountElement({ children: 'xxx' }, TableCellWithTextEllipsis);
    });

    it('renders content wrapper in Popover', () => {
      const popover = element.find('Popover');

      expect(popover).toBePresent();
      expect(popover).toHaveText('xxxxxx'); // double children because that's how popover renders its content
    });

    it('matches snapshot', () => {
      expect(mountToJson(element)).toMatchSnapshot();
    });
  });

  describe('when not ellipsed', () => {
    let TableCellWithTextEllipsis;

    beforeAll(() => {
      jest.resetModules();
      jest.doMock('./../MultilineEllipsis/MultilineEllipsis', () => ({ children }) =>
        children({ ellipsisRef: () => null, ellipsed: false })
      );
      /* eslint-disable global-require */
      TableCellWithTextEllipsis = require('./MultilineEllipsisPopover').default;
      /* eslint-enable global-require */
    });
    describe('with no extra props', () => {
      let element;

      beforeEach(() => (element = mountElement({ children: 'xxx' }, TableCellWithTextEllipsis)));
      it('renders content without Popover wrapper', () => {
        const popover = element.find('Popover');

        expect(popover).not.toBePresent();
        expect(element).toHaveText('xxx');
      });

      it('matches snapshot', () => {
        expect(mountToJson(element)).toMatchSnapshot();
      });
    });
  });
});
