import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableBodyWithExpandRows from './TableBodyWithExpandRows';
import { CONTEXT_ID, tableContextPropTypes, defaultContentTypes } from './withTableContext';

import './Table.less';

const tableHeadRowsList = [];

/**
 * @param Component
 */
export function markAsTableHeadRow(Component) {
  tableHeadRowsList.push(Component);
}

/**
 * @param element
 * @return {boolean}
 */
function isElementMarkedAsTableHead(element) {
  return tableHeadRowsList.includes(element.type);
}

/**
 * @param element
 * @return {boolean}
 */
function isElementMarkedAsTableBody(element) {
  return element.type === 'tbody' || element.type === TableBodyWithExpandRows;
}

export default class Table extends React.Component {
  // @todo: Never used, Should it be removed?
  static tableChildContextTypes = {
    [CONTEXT_ID]: tableContextPropTypes
  };
  // These two static member should stay like that until
  // https://github.com/reactjs/react-docgen/issues/317 is resolved
  static childContextTypes = Table.tableChildContextTypes;

  // @todo: Never used, Should it be removed?
  getChildContext = () => ({
    [CONTEXT_ID]: {
      registerColumn: (uuid, index, columnContentType) => {
        this.uuidToContentTypes.set(uuid, columnContentType);
        if (this.orderOfUuids[index]) {
          this.orderOfUuids.splice(index, 0, uuid);
        } else {
          this.orderOfUuids[index] = uuid;
        }
      },
      unregisterColumn: uuid => {
        const index = this.orderOfUuids.indexOf(uuid);

        this.uuidToContentTypes.delete(uuid);
        this.orderOfUuids.splice(index, 1);
      },
      getColumnContentTypes: index => {
        if (index == null) {
          return defaultContentTypes;
        }
        const uuid = this.orderOfUuids[index];
        const value = this.uuidToContentTypes.get(uuid);

        return value || defaultContentTypes;
      }
    }
  });

  // eslint-disable-next-line
  uuidToContentTypes = new Map();

  /** @type {{}[]} */
  orderOfUuids = [];

  get tableClassName() {
    return classNames('sc-table table-component', this.props.className, {
      'table-component-with-striped-rows': this.props.isRowsStriped
    });
  }

  get childrenArray() {
    return React.Children.toArray(this.props.children);
  }

  get tableHead() {
    return this.childrenArray.find(isElementMarkedAsTableHead);
  }

  get hasData() {
    return this.childrenArray.filter(isElementMarkedAsTableBody).some(tbody => Boolean(tbody.props.children));
  }

  getChildClassName = (row, index) =>
    classNames(row.props.className, {
      'table-component-with-striped-rows__row--odd': this.props.isRowsStriped && index % 2,
      'table-component-with-striped-rows__row--even': this.props.isRowsStriped && !(index % 2)
    });

  get colSpan() {
    return this.tableHead ? React.Children.count(this.tableHead.props.children) : 1;
  }

  getTableBodyChildren = children =>
    React.Children.map(children, (row, index) =>
      React.cloneElement(row, {
        className: this.getChildClassName(row, index)
      })
    );

  get tableBody() {
    return this.hasData ? (
      this.childrenArray.filter(isElementMarkedAsTableBody).map(tbody =>
        React.cloneElement(tbody, {
          children: this.getTableBodyChildren(tbody.props.children)
        })
      )
    ) : (
      <tfoot className="empty-table-container">
        <tr>
          <td colSpan={this.colSpan}>
            <div>{this.props.emptyTableMessage}</div>
          </td>
        </tr>
      </tfoot>
    );
  }

  render() {
    return (
      <table className={this.tableClassName}>
        {this.tableHead}
        {this.tableBody}
      </table>
    );
  }
}

Table.propTypes = {
  /**
   * If table should to show empty table message
   */
  isRowsStriped: PropTypes.bool,

  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * message which will be shown if table doesn't has content
   */
  emptyTableMessage: PropTypes.string,

  /**
   * table content
   */
  children: PropTypes.node.isRequired
};

Table.defaultProps = {
  isRowsStriped: false,
  emptyTableMessage: '',
  className: ''
};
