import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import TableBodyWithExpandRows from './TableBodyWithExpandRows';
import TableRowWithExpandContent from './TableRowWithExpandContent';

const mountBody = ({ mountMethod = mount, props = {} }) =>
  mountMethod(
    <TableBodyWithExpandRows {...props}>
      <TableRowWithExpandContent isExpanded={false} id="id-1" expandContent="Hello world">
        <td>Content</td>
      </TableRowWithExpandContent>
      <TableRowWithExpandContent isExpanded={false} id="id-2" expandContent="Hello world">
        <td>Content</td>
      </TableRowWithExpandContent>
    </TableBodyWithExpandRows>,
    {
      attachTo: document.createElement('table')
    }
  );

describe('<TableBodyWithExpandRows />', () => {
  describe('should match snapshot when row ', () => {
    it('is not expanded', () => {
      expect(toJson(mountBody({ mountMethod: shallow }))).toMatchSnapshot();
    });

    it('is expanded', () => {
      expect(toJson(mountBody({ mountMethod: shallow, props: { defaultExpandedRowId: 'id-1' } }))).toMatchSnapshot();
    });
  });

  describe('correctly set `className`', () => {
    let body;

    beforeEach(() => {
      body = mountBody({});
    });

    it('without passing `className`', () => {
      const element = body.find('.table-body-with-expand-content');

      expect(element.length).toBe(1);
      expect(element).toHaveProp('className', 'table-body-with-expand-content');
    });

    it('with passing `className`', () => {
      expect(body.setProps({ className: 'some-extra-class' })).toHaveClassName('some-extra-class');
    });
  });

  describe('if `defaultExpandedRowId` props', () => {
    it('was passed content should be expanded', () => {
      const body = mountBody({ props: { defaultExpandedRowId: 'id-1' } });
      const elements = body.find('.expandable-table-row-trigger');

      expect(elements.at(0)).toHaveClassName('expandable-table-row-trigger expandable-table-row-trigger--expanded');
      expect(body.find('tr.expandable-table-row-trigger--expanded').length).toBe(1);
      expect(body.find('tr.expandable-table-row-content').length).toBe(1);
    });

    it("wasn't passed content shouldn't be expanded", () => {
      const body = mountBody({});

      expect(body.find('.expandable-table-row-trigger--expanded').length).toBe(0);
      expect(body.find('.expandable-table-row-content').length).toBe(0);
    });
  });

  it('expand row on expand button click', () => {
    const body = mountBody({});
    const button = body.find('.expand-btn').at(0);

    button.simulate('click');

    expect(body.find('tr.expandable-table-row-trigger--expanded').length).toBe(1);
    expect(body.find('.expandable-table-row-content').length).toBe(1);
  });

  describe('when children is not a standard td', () => {
    let CustomTD;
    let errorConsole;
    let mountedElement;

    beforeAll(() => {
      errorConsole = spyOn(console, 'error');
      CustomTD = () => <td>I am a Custom TD</td>;

      mountedElement = mount(
        <TableBodyWithExpandRows defaultExpandedRowId="test">
          <TableRowWithExpandContent isExpanded id="test" expandContent="Hello world">
            <CustomTD />
            <CustomTD />
            <CustomTD />
          </TableRowWithExpandContent>
        </TableBodyWithExpandRows>,
        {
          attachTo: document.createElement('table')
        }
      );
    });

    it('matches snapshot', () => {
      expect(toJson(mountedElement)).toMatchSnapshot();
    });

    it('TD for expanded content has proper colSpan value', () => {
      const tdFromExpandedContent = mountedElement.find('.expandable-table-row-content > td');

      expect(tdFromExpandedContent).toBePresent();
      expect(tdFromExpandedContent.prop('colSpan')).toEqual(3);
    });

    it('prints no errors', () => {
      expect(errorConsole).not.toHaveBeenCalled();
    });
  });

  describe('when children is not a standard td and false values', () => {
    let CustomTD;
    let errorConsole;
    let mountedElement;

    beforeAll(() => {
      errorConsole = spyOn(console, 'error');
      CustomTD = () => <td>I am a Custom TD</td>;

      mountedElement = mount(
        <TableBodyWithExpandRows defaultExpandedRowId="test">
          <TableRowWithExpandContent isExpanded id="test" expandContent="Hello world">
            <CustomTD />
            <CustomTD />
            {false}
            <CustomTD />
            {false && <CustomTD />}
          </TableRowWithExpandContent>
        </TableBodyWithExpandRows>,
        {
          attachTo: document.createElement('table')
        }
      );
    });

    it('matches snapshot', () => {
      expect(toJson(mountedElement)).toMatchSnapshot();
    });

    it('TD for expanded content has proper colSpan value 3, ignoring Boolean values elements', () => {
      const tdFromExpandedContent = mountedElement.find('.expandable-table-row-content > td');

      expect(tdFromExpandedContent).toBePresent();
      expect(tdFromExpandedContent.prop('colSpan')).toEqual(3);
    });

    it('prints no errors', () => {
      expect(errorConsole).not.toHaveBeenCalled();
    });
  });
});
