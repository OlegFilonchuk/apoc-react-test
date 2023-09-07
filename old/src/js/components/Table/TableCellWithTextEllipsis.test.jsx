import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import TableCellWithTextEllipsis from './TableCellWithTextEllipsis';
import { defaultCellTableProps, CONTEXT_ID } from './withTableContext';

const mountCell = ({ children, ...restOfProps }) =>
  mount(<TableCellWithTextEllipsis {...restOfProps}>{children || 'Hello world'}</TableCellWithTextEllipsis>, {
    attachTo: document.createElement('tr'),
    context: {
      [CONTEXT_ID]: defaultCellTableProps
    }
  });

/* eslint-disable global-require, no-return-assign */
describe('<TableCellWithTextEllipsis />', () => {
  describe('is not ellipsed', () => {
    let element;

    beforeEach(() => (element = mountCell({})));

    it('matches snapshot', () => {
      expect(mountToJson(element)).toMatchSnapshot();
    });
  });

  describe('with className prop set', () => {
    let element;

    beforeEach(() => (element = mountCell({ className: 'some-extra-class' })));
    it('correctly set `className`', () => {
      const td = element.find('td');

      expect(td).toHaveClassName('some-extra-class');
    });
  });

  describe('with with prop set', () => {
    let element;

    beforeEach(() => (element = mountCell({ width: '100px' })));
    it('correctly set `className`', () => {
      const td = element.find('td');

      expect(td).toHaveStyle('width', '100px');
      expect(td).toHaveStyle('maxWidth', '100px');
    });
  });
});
/* eslint-enable global-require, no-return-assign */
