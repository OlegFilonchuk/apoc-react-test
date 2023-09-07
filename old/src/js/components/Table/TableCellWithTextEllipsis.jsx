import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCell from './TableCell';
import ExpandButton from './ExpandButton';
import MultilineEllipsisPopover from '../MultilineEllipsisPopover/MultilineEllipsisPopover';
import POPOVER_PLACEMENTS from '../Popover/PopoverPlacements';

import './TableCellWithTextEllipsis.less';

/* eslint-disable */

const baseClassName = 'td-cell-with-text-ellipsis';

export default class TableCellWithTextEllipsis extends React.PureComponent {
  render() {
    const { children, className, hideAfterDelayOf, maxLines, popoverMaxWidth, ...restOfProps } = this.props;
    const arrayOfChildren = React.Children.toArray(children);
    const content = arrayOfChildren.filter(child => child.type !== ExpandButton);
    const expandButton = arrayOfChildren.find(child => child.type === ExpandButton);

    return (
      <TableCell {...restOfProps} className={classNames(className, baseClassName)}>
        {expandButton}
        <MultilineEllipsisPopover
          maxLines={maxLines}
          popoverMaxWidth={popoverMaxWidth}
          hideAfterDelayOf={hideAfterDelayOf}
        >
          {content}
        </MultilineEllipsisPopover>
      </TableCell>
    );
  }
}

TableCellWithTextEllipsis.propTypes = {
  /**
   * TableCell's propTypes
   */
  ...TableCell.propTypes,
  /**
   * Cell's max height
   */
  maxLines: PropTypes.number,

  /**
   * This function will be called click outside of popover element
   */
  placement: PropTypes.oneOf(Object.keys(POPOVER_PLACEMENTS).map(placement => POPOVER_PLACEMENTS[placement])),
  /**
   * Expects time in milliseconds
   * After this time popover will be hidden if there was no onMouseOver event
   */
  hideAfterDelayOf: PropTypes.number,
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

  /**
   *  popoverMaxWidth
   */
  popoverMaxWidth: PropTypes.number
};

TableCellWithTextEllipsis.defaultProps = {
  children: null,
  className: '',
  width: '',
  hideAfterDelayOf: 0,
  maxLines: 3,
  placement: POPOVER_PLACEMENTS.TOP_LEFT,
  popoverMaxWidth: undefined
};
