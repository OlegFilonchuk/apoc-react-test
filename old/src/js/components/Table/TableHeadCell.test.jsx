import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TableHeadCell, { TABLE_SORT_ORDER } from './TableHeadCell';
import { defaultContentTypes } from './withTableContext';

const tr = document.createElement('tr');

const mountCell = (props = {}) =>
  mount(<TableHeadCell.WrappedComponent {...props}>Title</TableHeadCell.WrappedComponent>, {
    attachTo: tr
  });

describe('<TableHeadCell />', () => {
  const tableProps = {
    registerColumn: jest.fn(),
    unregisterColumn: jest.fn(),
    getColumnContentTypes: jest.fn()
  };

  describe('should match snapshot ', () => {
    it('with passing `width`', () => {
      expect(toJson(mountCell({ width: '100px' }))).toMatchSnapshot();
    });

    it('without passing `width`', () => {
      expect(toJson(mountCell())).toMatchSnapshot();
    });

    it('with sorting', () => {
      expect(toJson(mountCell({ sortable: true }))).toMatchSnapshot();
    });
  });

  describe('set `className` for icon correctly when `sortOrder` is', () => {
    it(TABLE_SORT_ORDER.NONE, () => {
      const cell = mountCell({ sortable: true, sortOrder: TABLE_SORT_ORDER.NONE });

      expect(cell.find('.th-sorting-icon')).toHaveClassName('sc-icon-dropdown-arrow');
    });

    it(TABLE_SORT_ORDER.ASC, () => {
      const cell = mountCell({ sortable: true, sortOrder: TABLE_SORT_ORDER.ASC });

      expect(cell.find('.th-sorting-icon')).toHaveClassName('sc-icon-up-arrow');
    });

    it(TABLE_SORT_ORDER.DESC, () => {
      const cell = mountCell({ sortable: true, sortOrder: TABLE_SORT_ORDER.DESC });

      expect(cell.find('.th-sorting-icon')).toHaveClassName('sc-icon-down-arrow');
    });
  });

  it('correctly set `className`', () => {
    const cell = mountCell({ className: 'some-extra-class' });
    const element = cell.find('th');

    expect(element).toHaveClassName('some-extra-class');
  });

  it('correctly set `width`', () => {
    const cell = mountCell({ width: '100px' });
    const element = cell.find('th');

    expect(element).toHaveStyle('width', '100px');
    expect(element).toHaveStyle('maxWidth', '100px');
  });

  it('`onSort` works correctly', () => {
    let sortOrder = TABLE_SORT_ORDER.NONE;

    function onSort(newSortOrder) {
      sortOrder = newSortOrder;
    }

    const cell = mountCell({ sortable: true, sortOrder, onSort });

    cell.simulate('click');
    expect(sortOrder).toEqual(TABLE_SORT_ORDER.ASC);
    cell.setProps({ sortOrder });
    cell.simulate('click');
    expect(sortOrder).toEqual(TABLE_SORT_ORDER.DESC);
    cell.setProps({ sortOrder });
    cell.simulate('click');
    expect(sortOrder).toEqual(TABLE_SORT_ORDER.NONE);
  });

  describe('without contentTypes set', () => {
    let theCell;

    beforeAll(() => {
      tableProps.registerColumn.mockClear();
      theCell = mountCell({ tableProps });
    });
    describe('onComponentDidMount', () => {
      it('calls the tableProps.registerColumn', () => {
        expect(theCell.props({}).tableProps).toBe(tableProps);
        expect(tableProps.registerColumn).toHaveBeenCalledWith(theCell.instance().uuid, 0, defaultContentTypes);
      });
    });
  });

  describe('with contentTypes set', () => {
    let theCell;

    beforeAll(() => {
      tableProps.registerColumn.mockClear();
      theCell = mountCell({ tableProps, textContent: true });
    });
    describe('onComponentDidMount', () => {
      it('calls the tableProps.registerColumn', () => {
        expect(theCell.props({}).tableProps).toBe(tableProps);
        expect(tableProps.registerColumn).toHaveBeenCalledWith(theCell.instance().uuid, 0, {
          dateContent: false,
          iconOrGraphicalContent: false,
          textContent: true,
          numericContent: false
        });
      });
    });
  });
});
