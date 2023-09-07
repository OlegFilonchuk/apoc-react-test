import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withTableContext, tableContextPropTypes, defaultCellTableProps } from './withTableContext';

class TableCell extends React.Component {
  setRef = ref => {
    this.ref = ref;
    this.forceUpdate();
  };

  get childIndex() {
    if (!this.ref) {
      return null;
    }

    return Array.from(this.ref.parentElement.children).indexOf(this.ref);
  }

  /**
   * @return {CellContentTypes}
   */
  get contentTypes() {
    return this.props.tableProps.getColumnContentTypes(this.childIndex);
  }

  render() {
    const { children, className, width, tableProps, ...restOfProps } = this.props;
    const style = width
      ? {
          width,
          maxWidth: width
        }
      : {};

    const contentTypes = this.contentTypes;
    const finalClassName = classNames(className, {
      'sc-left-align': contentTypes.textContent,
      'sc-right-align': contentTypes.numericContent,
      'sc-center-align':
        contentTypes.iconOrGraphicalContent || contentTypes.dateContent || !contentTypes.isContentTypePassed
    });

    return (
      <td {...restOfProps} style={style} className={finalClassName} ref={this.setRef}>
        {children}
      </td>
    );
  }
}

TableCell.propTypes = {
  /**
   * Cell's content
   */
  children: PropTypes.node,

  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Cell's width
   */
  width: PropTypes.string,

  tableProps: tableContextPropTypes
};

TableCell.defaultProps = {
  children: null,
  className: '',
  width: '',
  tableProps: defaultCellTableProps
};

const TableCellWithContext = withTableContext(TableCell);

export default TableCellWithContext;
