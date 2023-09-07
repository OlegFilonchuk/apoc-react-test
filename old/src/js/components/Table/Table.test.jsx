import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Table from './Table';
import TableHeadRow from './TableHeadRow';
import { CONTEXT_ID } from './withTableContext';

const tableBody = (
  <tbody>
    <tr>
      <td>Content 1</td>
      <td>Content 2</td>
      <td>Content 3</td>
    </tr>
  </tbody>
);

const mountTable = ({ props = {}, mountMethod = mount, content = [] }) =>
  mountMethod(
    <Table {...props}>
      <TableHeadRow>
        <th>Title 1</th>
        <th>Title 2</th>
        <th>Title 3</th>
      </TableHeadRow>
      {content}
    </Table>
  );

describe('<Table />', () => {
  describe('should match snapshot', () => {
    it('with data', () => {
      expect(
        toJson(
          mountTable({
            content: tableBody,
            mountMethod: shallow
          })
        )
      ).toMatchSnapshot();
    });

    it('without data', () => {
      expect(toJson(mountTable({ mountMethod: shallow }))).toMatchSnapshot();
    });
  });

  describe('`emptyTableMessage` is ', () => {
    it("disable when table doesn't has any tr", () => {
      const table = mountTable({ content: tableBody });
      const emptyTableMessage = table.find('.empty-table-container');

      expect(emptyTableMessage.length).toBe(0);
    });

    it("available, `emptyTableMessage` shouldn't be rendered", () => {
      const table = mountTable({});
      const emptyTableMessage = table.find('.empty-table-container');

      expect(emptyTableMessage.length).toBe(1);
    });
  });

  describe('correctly set `className`', () => {
    let table;

    beforeEach(() => {
      table = mountTable({
        content: tableBody
      });
    });

    it('without passing `className`', () => {
      const element = table.find('.table-component');

      expect(element.length).toBe(1);
      expect(element).toHaveProp('className', 'sc-table table-component');
    });

    it('with passing `className`', () => {
      const element = table.find('.table-component');

      expect(element.length).toBe(1);
      table.setProps({ className: 'some-extra-class' });
      expect(element.getDOMNode().className).toContain('some-extra-class');
    });
  });

  describe('correctly set `emptyTableMessage`', () => {
    let table;

    beforeEach(() => {
      table = mountTable({
        props: { hasData: false }
      });
    });

    it('without passing `emptyTableMessage`', () => {
      const element = table.find('.empty-table-container div');

      expect(element).toHaveText('');
    });

    it('with passing `emptyTableMessage`', () => {
      const element = table.find('.empty-table-container div');
      const someText = 'Some text';

      table.setProps({ emptyTableMessage: someText });
      expect(element).toHaveText(someText);
    });
  });

  it('calculate colspan correctly', () => {
    const table = mountTable({
      props: { hasData: false }
    });
    const expectedColSpanValue = 3;
    const element = table.find('.empty-table-container td');

    expect(element.props().colSpan).toBe(expectedColSpanValue);
  });

  describe('with isRowStripped=true and three rows', () => {
    const createTableBodyWithThreeRows = key => (
      <tbody key={key}>
        <tr>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    );

    describe('and three rows', () => {
      let table = null;

      beforeAll(() => {
        table = mountTable({
          props: { isRowsStriped: true },
          content: [createTableBodyWithThreeRows(1)]
        });
      });

      it('renders rows differently stripped', () => {
        const trs = table.find('tbody tr');

        expect(trs).toHaveLength(3);
        expect(trs.at(0)).toHaveClassName('table-component-with-striped-rows__row--even');
        expect(trs.at(1)).toHaveClassName('table-component-with-striped-rows__row--odd');
        expect(trs.at(2)).toHaveClassName('table-component-with-striped-rows__row--even');
      });
    });

    describe('and three rows in each of two tbody', () => {
      let table = null;

      beforeAll(() => {
        table = mountTable({
          props: { isRowsStriped: true },
          content: [createTableBodyWithThreeRows(1), createTableBodyWithThreeRows(2)]
        });
      });

      it('renders rows differently stripped, separately for each tbody', () => {
        const trs = table.find('tbody tr');

        expect(trs).toHaveLength(6);
        expect(trs.at(0)).toHaveClassName('table-component-with-striped-rows__row--even');
        expect(trs.at(1)).toHaveClassName('table-component-with-striped-rows__row--odd');
        expect(trs.at(2)).toHaveClassName('table-component-with-striped-rows__row--even');
        // for each tbody even/odd are calculated from scratch, that's why one even is after another in this case
        expect(trs.at(3)).toHaveClassName('table-component-with-striped-rows__row--even');
        expect(trs.at(4)).toHaveClassName('table-component-with-striped-rows__row--odd');
        expect(trs.at(5)).toHaveClassName('table-component-with-striped-rows__row--even');
      });
    });
  });

  describe('context', () => {
    describe('registerColumn ', () => {
      let table;
      let tableContext;

      beforeAll(() => {
        table = mountTable({
          content: tableBody,
          mountMethod: shallow
        });
        tableContext = table.instance().getChildContext()[CONTEXT_ID];
      });

      describe('starting with zero columns', () => {
        describe('few columns registered, one by one', () => {
          const columns = [
            { id: 'a', contentTypes: {} },
            { id: 'c', contentTypes: {} },
            { id: 'b', contentTypes: {} }
          ];

          beforeAll(() => {
            columns.forEach((x, k) => tableContext.registerColumn(x.id, k, x.contentTypes));
          });

          it('should save their content types in appropriate order', () => {
            expect(tableContext.getColumnContentTypes(0)).toBe(columns[0].contentTypes);
            expect(tableContext.getColumnContentTypes(1)).toBe(columns[1].contentTypes);
            expect(tableContext.getColumnContentTypes(2)).toBe(columns[2].contentTypes);
          });

          describe('few column registered later in the middle of array', () => {
            const nextColumns = [
              { id: 'f', contentTypes: {} },
              { id: 'h', contentTypes: {} }
            ];

            beforeAll(() => {
              tableContext.registerColumn(nextColumns[0].id, 1, nextColumns[0].contentTypes);
              tableContext.registerColumn(nextColumns[1].id, 3, nextColumns[1].contentTypes);
            });

            it('should save their content types in appropriate order', () => {
              expect(tableContext.getColumnContentTypes(0)).toBe(columns[0].contentTypes);
              expect(tableContext.getColumnContentTypes(1)).toBe(nextColumns[0].contentTypes);
              expect(tableContext.getColumnContentTypes(2)).toBe(columns[1].contentTypes);
              expect(tableContext.getColumnContentTypes(3)).toBe(nextColumns[1].contentTypes);
              expect(tableContext.getColumnContentTypes(4)).toBe(columns[2].contentTypes);
            });
          });
        });
      });
    });
  });
});
