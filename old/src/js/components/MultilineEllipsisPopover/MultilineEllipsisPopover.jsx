import React from 'react';
import PropTypes from 'prop-types';

import MultilineEllipsis from './../MultilineEllipsis/MultilineEllipsis';
import POPOVER_PLACEMENTS from '../Popover/PopoverPlacements';
import POPOVER_OPEN_TRIGGER from '../Popover/PopoverOpenTrigger';
import DynamicPopover from '../DynamicPopover/DynamicPopover';

import './MultilineEllipsisPopover.less';

const MAX_LINES = 3;
const DEFAULT_HIDE_AFTER_DELAY_OF = 0;

/**
 * Uses `MultilineEllipsis` to determine whether to show `DynamicPopover` or not
 */
class MultilineEllipsisPopover extends React.PureComponent {
  static propTypes = {
    /**
     * @param {function} obj.ellipsisRef a ref function necessary to be passed via `ref` prop
     * @param {Boolean} obj.ellipsed `true` or `false` whether ellipsed is visible or not
     */
    children: PropTypes.node.isRequired,

    /**
     * Expects time in milliseconds
     * After this time popover will be hidden if there was no onMouseOver event
     */
    hideAfterDelayOf: PropTypes.number,

    /**
     * Cell's max height
     */
    maxLines: PropTypes.number,

    /**
     * Width necessary for DynamicPopover maxWidth prop
     */
    popoverMaxWidth: PropTypes.number,

    /**
     * This function will be called click outside of popover element
     */
    placement: PropTypes.oneOf(Object.keys(POPOVER_PLACEMENTS).map(placement => POPOVER_PLACEMENTS[placement]))
  };

  static defaultProps = {
    maxLines: MAX_LINES,
    hideAfterDelayOf: DEFAULT_HIDE_AFTER_DELAY_OF,
    placement: POPOVER_PLACEMENTS.TOP_LEFT,
    popoverMaxWidth: undefined
  };

  render() {
    return (
      <MultilineEllipsis maxLines={this.props.maxLines}>
        {({ ellipsisRef, ellipsed }) => [
          !ellipsed && (
            <div key="truncated" ref={ellipsisRef}>
              {this.props.children}
            </div>
          ),
          ellipsed && (
            <DynamicPopover
              maxWidth={this.props.popoverMaxWidth}
              key="not-truncated"
              className={'multiline-ellipsis-popover'}
              initialPlacement={this.props.placement}
              hideAfterDelayOf={this.props.hideAfterDelayOf}
              openTrigger={POPOVER_OPEN_TRIGGER.MOUSE_OVER}
              title={<div ref={ellipsisRef}>{this.props.children}</div>}
            >
              {this.props.children}
            </DynamicPopover>
          )
        ]}
      </MultilineEllipsis>
    );
  }
}

export default MultilineEllipsisPopover;
