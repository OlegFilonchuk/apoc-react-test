import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import POPOVER_OPEN_TRIGGER from '../Popover/PopoverOpenTrigger';
import POPOVER_PLACEMENTS from '../Popover/PopoverPlacements';
import Popover from '../Popover/Popover';
import IconButton from '../IconButton/IconButton';

import './FilterPopover.less';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';

const baseClass = 'filter-popover';

export default class FilterPopover extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFilterOpen: false
    };

    this.closePopover = this.closePopover.bind(this);
    this.togglePopoverState = this.togglePopoverState.bind(this);
  }

  closePopover() {
    this.setState(() => ({ isFilterOpen: false }));
  }

  togglePopoverState() {
    this.setState((state, props) => ({ isFilterOpen: props.disabled ? false : !state.isFilterOpen }));
  }

  render() {
    const { isFilterOpen } = this.state;
    const { className, horizontal, disabled, ...restProps } = this.props;
    const finalClassName = classNames(
      className,
      baseClass,
      horizontal ? `${baseClass}--horizontal` : `${baseClass}--vertical`,
      disabled && `${baseClass}--disabled`
    );

    return (
      <Popover
        {...restProps}
        isVisible={isFilterOpen}
        className={finalClassName}
        onPopoverClick={this.togglePopoverState}
        onOutsidePopoverClick={this.closePopover}
      />
    );
  }
}

FilterPopover.propTypes = {
  ...Popover.propTypes,
  /**
   * Use horizontal layout
   */
  horizontal: PropTypes.bool,

  /**
   * Render a disabled FilterPopover
   */
  disabled: PropTypes.bool
};

FilterPopover.defaultProps = {
  title: <IconButton.Filter {...getDataTestElementProps('testDataTestElement')} />,
  horizontal: false,
  placement: POPOVER_PLACEMENTS.LEFT_TOP,
  openTrigger: POPOVER_OPEN_TRIGGER.MANUAL,
  disabled: false
};
