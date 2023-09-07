import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';

import { validateProps, isContentTypePassed } from './TableHelpers';
import { withTableContext, tableContextPropTypes, defaultCellTableProps } from './withTableContext';

import './TableHeadCell.less';

export const TABLE_SORT_ORDER = {
  NONE: '',
  ASC: 'asc',
  DESC: 'desc'
};

const SORT_QUEUE = {
  [TABLE_SORT_ORDER.NONE]: TABLE_SORT_ORDER.ASC,
  [TABLE_SORT_ORDER.ASC]: TABLE_SORT_ORDER.DESC,
  [TABLE_SORT_ORDER.DESC]: TABLE_SORT_ORDER.NONE
};

class TableHeadCell extends React.Component {
  componentDidMount() {
    this.uuid = uuid();

    this.props.tableProps.registerColumn(this.uuid, this.childIndex, {
      dateContent: this.props.dateContent,
      iconOrGraphicalContent: this.props.iconOrGraphicalContent,
      textContent: this.props.textContent,
      numericContent: this.props.numericContent
    });
  }

  componentWillUnmount() {
    this.props.tableProps.unregisterColumn(this.uuid);
  }

  onClick = () => {
    if (!this.props.sortable) {
      return null;
    }
    const newSortOrder = SORT_QUEUE[this.props.sortOrder];

    return this.props.onSort(newSortOrder);
  };

  setRef = ref => {
    this.ref = ref;
    this.forceUpdate();
  };

  get childIndex() {
    return Array.from(this.ref.parentElement.children).indexOf(this.ref);
  }

  render() {
    const {
      sortable,
      sortOrder,
      onSort,
      className,
      children,
      width,
      textContent,
      numericContent,
      iconOrGraphicalContent,
      dateContent,
      tableProps,
      ...props
    } = this.props;

    const thClassName = classNames(className, {
      'table-head-cell-with-sorting': sortable,
      'sc-left-align': textContent,
      'sc-right-align': numericContent,
      'sc-center-align': iconOrGraphicalContent || dateContent || !isContentTypePassed
    });
    const iconClassName = classNames('th-sorting-icon', className, {
      'sc-icon-dropdown-arrow': sortOrder === TABLE_SORT_ORDER.NONE,
      'sc-icon-up-arrow': sortOrder === TABLE_SORT_ORDER.ASC,
      'sc-icon-down-arrow': sortOrder === TABLE_SORT_ORDER.DESC
    });
    const style = width
      ? {
          width,
          maxWidth: width
        }
      : {};

    return (
      <th className={thClassName} onClick={this.onClick} style={style} {...props} ref={this.setRef}>
        {sortable && <span className={iconClassName} />}
        {children}
      </th>
    );
  }
}

TableHeadCell.propTypes = {
  /**
   * Cell's content
   */
  children: PropTypes.node,

  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Show if cell has possibility to sort
   */
  sortable: PropTypes.bool,

  /**
   * It called when cell is clicked
   */
  onSort: PropTypes.func,

  /**
   * Current order for sorting table cell
   */
  sortOrder: PropTypes.string,

  /**
   * Cell's width
   */
  width: PropTypes.string,

  /**
   * shows if cell's content is dates with consistent character count
   */
  dateContent: validateProps,

  /**
   * shows if cell's content is icons or other individual Graphical elements with no Label Accompaniment
   */
  iconOrGraphicalContent: validateProps,

  /**
   * shows if cell's content is text strings
   */
  textContent: validateProps,

  /**
   * shows if cell's content is numeric values with inconsistent character counts (e.g. money, file sizes, byte sizes etc.)
   */
  numericContent: validateProps,

  tableProps: tableContextPropTypes
};

TableHeadCell.defaultProps = {
  sortable: false,
  sortOrder: '',
  className: '',
  children: null,
  onSort: () => null,
  width: '',
  dateContent: false,
  iconOrGraphicalContent: false,
  textContent: false,
  numericContent: false,
  tableProps: defaultCellTableProps
};

const TableHeadWithContext = withTableContext(TableHeadCell);

export default TableHeadWithContext;
