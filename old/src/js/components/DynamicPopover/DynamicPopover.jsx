import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import Popover from './../Popover/Popover';
import PopoverPlacements, { POPOVER_PLACEMENTS_OPPOSITE } from './../Popover/PopoverPlacements';
import overflowsEdge from './overflowsEdge';
import calcTooltipWidth from './calcTooltipWidth';

export default class DynamicPopover extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    maxWidth: PropTypes.number,
    initialPlacement: PropTypes.oneOf(Object.values(PopoverPlacements)),
    ...omit(Popover.propTypes, 'placement'),
    /**
     * Any custom class names
     */
    className: PropTypes.string
  };

  static defaultProps = {
    maxWidth: undefined,
    initialPlacement: Popover.defaultProps.placement,
    popoverStyles: {},
    onVisibilityChange: () => null,
    className: ''
  };

  constructor(props) {
    super(props);

    const width = calcTooltipWidth(props.maxWidth);

    this.state = {
      popoverStyles: {
        ...this.props.popoverStyles,
        width,
        maxWidth: width
      },
      placement: this.props.initialPlacement
    };
  }

  /**
   * @param {onVisibilityChangeParams} [data]
   */
  onVisibilityChange = data => {
    if (data.isVisible) {
      const stateUpdater = this.stateUpdaterToAvoidViewportOverflow(data);

      this.setState(stateUpdater);
    }

    this.props.onVisibilityChange(data);
  };

  /**
   * @private
   * @param {onVisibilityChangeParams} [data]
   */
  stateUpdaterToAvoidViewportOverflow(data) {
    const { tooltipX, contentWidth, tooltipWidth, contentParentWidth } = data;
    const newWidth = calcTooltipWidth(this.props.maxWidth, tooltipWidth, contentWidth, contentParentWidth);

    const overflowsCurrentEdge = overflowsEdge(tooltipX, newWidth, this.state.placement);

    const placement = overflowsCurrentEdge ? POPOVER_PLACEMENTS_OPPOSITE[this.state.placement] : this.state.placement;

    return prevState => ({
      popoverStyles: {
        ...prevState.popoverStyles,
        width: newWidth,
        maxWidth: newWidth
      },
      placement
    });
  }

  render() {
    const propsToPassFurther = omit(
      this.props,
      'maxWidth',
      'popoverStyles',
      'initialPlacement',
      'placement',
      'onVisibilityChange'
    );

    return (
      <Popover
        className={this.props.className}
        onVisibilityChange={this.onVisibilityChange}
        popoverStyles={this.state.popoverStyles}
        placement={this.state.placement}
        {...propsToPassFurther}
      />
    );
  }
}
