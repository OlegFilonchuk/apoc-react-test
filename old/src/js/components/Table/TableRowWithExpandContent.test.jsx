import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TableRowWithExpandContent from './TableRowWithExpandContent';

const mountRow = ({ mountMethod = mount, props = {} }) =>
  mountMethod(
    <TableRowWithExpandContent {...props}>
      <td>Some other content</td>
      <td>
        <button id="clickable-content">Content</button>
        <a id="clickable-content2">Content2</a>
      </td>
      <td>
        <span id="not-clickable-content">Content</span>
      </td>
    </TableRowWithExpandContent>,
    {
      attachTo: document.createElement('tbody')
    }
  );

describe('<TableRowWithExpandContent />', () => {
  it('should match snapshot', () => {
    expect(toJson(mountRow({ mountMethod: shallow, props: { id: 'foo', isExpanded: false } }))).toMatchSnapshot();
  });

  it('correctly set `className`', () => {
    const cell = mountRow({ props: { className: 'some-extra-class', id: 'foo', isExpanded: false } });
    const element = cell.find('tr');

    expect(element).toHaveClassName('some-extra-class');
  });

  describe('expandOnClick', () => {
    let cell;
    const onExpandCallback = jest.fn();

    beforeAll(() => {
      cell = mountRow({
        props: {
          className: 'some-extra-class',
          id: 'foo',
          isExpanded: false,
          expandOnClick: true,
          onExpand: onExpandCallback
        }
      });
    });

    beforeEach(() => onExpandCallback.mockReset());

    describe('clicked on non-clickable element', () => {
      it('expands a row', () => {
        cell.find('#not-clickable-content').simulate('click');
        expect(onExpandCallback).toHaveBeenCalled();
      });
    });

    describe('clicked button', () => {
      it('does not expands a row', () => {
        cell.find('button#clickable-content').simulate('click');
        expect(onExpandCallback).not.toHaveBeenCalled();
      });
    });

    describe('clicked internal "expand button"', () => {
      it('does not expands a row', () => {
        cell.find('button.expand-btn').simulate('click');
        expect(onExpandCallback).toHaveBeenCalled();
      });
    });

    describe('clicked link', () => {
      it('does not expands a row', () => {
        cell.find('a#clickable-content2').simulate('click');
        expect(onExpandCallback).not.toHaveBeenCalled();
      });
    });
  });
});
