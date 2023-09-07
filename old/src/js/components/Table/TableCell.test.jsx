import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TableCell from './TableCell';
import { defaultContentTypes } from './withTableContext';

const mountCell = ({ mountMethod = mount, props = {} }) =>
  mountMethod(<TableCell.WrappedComponent {...props}>Hello world</TableCell.WrappedComponent>, {
    attachTo: document.createElement('tr')
  });

describe('<TableCell />', () => {
  describe('should match snapshot ', () => {
    it('with passing `width`', () => {
      expect(toJson(mountCell({ mountMethod: shallow, props: { width: '100px' } }))).toMatchSnapshot();
    });

    it('without passing `width`', () => {
      expect(toJson(mountCell({ mountMethod: shallow }))).toMatchSnapshot();
    });
  });

  it('correctly set `className`', () => {
    const cell = mountCell({ props: { className: 'some-extra-class' } });
    const element = cell.find('td');

    expect(element).toHaveClassName('some-extra-class');
  });

  it('correctly set `width`', () => {
    const cell = mountCell({ props: { width: '100px' } });
    const element = cell.find('td');

    expect(element).toHaveStyle('width', '100px');
    expect(element).toHaveStyle('maxWidth', '100px');
  });

  describe('tableProps.getColumnContentTypes', () => {
    let tableProps;

    beforeEach(() => {
      tableProps = {
        getColumnContentTypes: jest.fn(),
        registerColumn: jest.fn(),
        unregisterColumn: jest.fn()
      };
      tableProps.getColumnContentTypes.mockReturnValue(defaultContentTypes);
    });

    describe('TableCell has no siblings', () => {
      let cell;

      beforeEach(() => {
        cell = mountCell({ props: { tableProps } });
      });
      it('is called with 0 - index of parents children node', () => {
        expect(cell.instance().props.tableProps.getColumnContentTypes).toHaveBeenCalledWith(0);
      });
    });

    describe('TableCell is the first of parents children', () => {
      let cell;

      beforeEach(() => {
        const tr = document.createElement('tr');

        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));

        cell = mount(<TableCell.WrappedComponent tableProps={tableProps}>Hello world</TableCell.WrappedComponent>, {
          attachTo: tr
        });
      });

      it('is called with 0 - index of parents children node', () => {
        expect(cell.instance().props.tableProps.getColumnContentTypes).toHaveBeenCalledWith(0);
      });
    });

    describe('TableCell becomes third child after initial render', () => {
      let cell;

      beforeEach(() => {
        const tr = document.createElement('tr');

        cell = mount(<TableCell.WrappedComponent tableProps={tableProps}>Hello world</TableCell.WrappedComponent>, {
          attachTo: tr
        });

        const tableCellTd = tr.childNodes[0];

        tr.insertBefore(document.createElement('td'), tableCellTd);
        tr.insertBefore(document.createElement('td'), tableCellTd);
      });

      it('is called with arugment 2 - most current child index', () => {
        cell.setProps({ width: '100px' });
        expect(cell.instance().props.tableProps.getColumnContentTypes).toHaveBeenLastCalledWith(2);
      });
    });
  });
});
