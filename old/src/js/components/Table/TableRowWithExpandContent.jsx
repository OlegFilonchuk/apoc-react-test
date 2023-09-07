import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCellWithTextEllipsis from './TableCellWithTextEllipsis';
import ExpandButton from './ExpandButton';

import './TableRowWithExpandContent.less';

const emptyFn = () => null;

const clickableTags = ['BUTTON', 'A'];

function isClickableElementClicked(target, stopAtTagName) {
  let currentTarget = target;

  while (currentTarget.tagName !== stopAtTagName) {
    if (clickableTags.includes(currentTarget.tagName) && !currentTarget.classList.contains('expand-btn')) {
      return true;
    }

    currentTarget = currentTarget.parentNode;
  }

  return false;
}

export default class TableRowWithExpandContent extends React.Component {
  onExpand = e => {
    const target = e.nativeEvent.target;

    if (isClickableElementClicked(target, 'TR')) {
      return;
    }

    this.props.onExpand(this.props.id);
  };

  get expandBtn() {
    return (
      <ExpandButton onExpand={this.props.expandOnClick ? emptyFn : this.onExpand} isExpanded={this.props.isExpanded} />
    );
  }

  getCellForExpandedRow = cell => {
    const { children, className, ...rest } = cell.props;

    return this.props.isExpanded && cell.type === TableCellWithTextEllipsis ? (
      <td className={classNames('table-cell-with-expand-btn', className)} {...rest}>
        {this.expandBtn}
        {children}
      </td>
    ) : (
      React.cloneElement(cell, {
        className: classNames('table-cell-with-expand-btn', cell.props.className),
        children: React.Children.map(cell.props.children, element => [this.expandBtn, element])
      })
    );
  };

  get finalClassName() {
    return classNames(this.props.className, {
      'table-row-with-expand-content__clickable': this.props.expandOnClick
    });
  }

  getFinalContent = ({ columnWithButton, content, additionalProps = {} }) => (
    <tr
      {...additionalProps}
      className={this.finalClassName}
      onClickCapture={this.props.expandOnClick ? this.onExpand : emptyFn}
    >
      {columnWithButton}
      {content}
    </tr>
  );

  render() {
    const [firstColumn, ...restColumns] = React.Children.toArray(this.props.children);
    const columnWithButton = this.getCellForExpandedRow(firstColumn);
    const columns = [...restColumns];
    const content = React.Children.map(React.Children.toArray(columns), child =>
      this.props.isExpanded && child.type === TableCellWithTextEllipsis ? <td {...child.props} /> : child
    );

    return this.props.customWrapper
      ? this.props.customWrapper(props =>
          this.getFinalContent({
            columnWithButton,
            content,
            additionalProps: {
              ...props,
              ref: props.innerRef
            }
          })
        )
      : this.getFinalContent({ columnWithButton, content });
  }
}

TableRowWithExpandContent.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  /**
   * TableRowWithExpandContent's id
   */
  id: PropTypes.string.isRequired,

  /**
   * It will be called if expand button is clicked
   */
  onExpand: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */

  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Array of table's cells
   */
  children: PropTypes.node.isRequired,

  /**
   * Show if row was expanded - used only by TableBodyWithExpandRows component internally
   */
  isExpanded: PropTypes.bool,

  /**
   * if true it triggers onExpand prop - used only by TableBodyWithExpandRows component internally
   */
  expandOnClick: PropTypes.bool,

  /**
   * Custom wrapper for table children. By default, table component and dependant expects particular children types
   * as they are operating on them. This props allow to add custom wrapper around them AFTER they are modified.
   */
  customWrapper: PropTypes.func
};

TableRowWithExpandContent.defaultProps = {
  className: '',
  onClick: null,
  isExpanded: false,
  expandOnClick: false,
  onExpand: () => null,
  customWrapper: null
};
