import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export const iconPositions = {
  left: 'left',
  right: 'right',
  none: 'none'
};

const rightIconTemplate = options => (
  <div className="sc-panel-utils">
    <span onClick={options.onClick} className={options.iconClass} />
  </div>
);

const leftIconTemplate = options => <span onClick={options.onClick} className={options.iconClass} />;

const onCustomContentClick = e => e.stopPropagation();

const CollapseHeader = ({
  iconStyles,
  iconPosition,
  isPanelButton,
  isClickDisabled,
  isCollapsed,
  onClick,
  title,
  customContent,
  className,
  displayCounter,
  countSelectedItems,
  ...restProps
}) => {
  const iconCollapsedClass = iconStyles.collapsed;
  const iconExpandedClass = iconStyles.expanded;

  const finalClassName = classNames('sc-panel-title', className);
  const iconClass = classNames('sc-collapse-icon sc-fonticon', {
    [iconCollapsedClass]: isCollapsed,
    [iconExpandedClass]: !isCollapsed
  });

  const headClick = isPanelButton && !isClickDisabled ? onClick : null;
  const iconClick = !isPanelButton && !isClickDisabled ? onClick : null;
  const headRole = isPanelButton ? 'button' : null;

  const leftIcon =
    iconPosition === iconPositions.left
      ? leftIconTemplate({
          iconClass,
          onClick: iconClick
        })
      : null;
  const rightIcon =
    iconPosition === iconPositions.right
      ? rightIconTemplate({
          iconClass,
          onClick: iconClick
        })
      : null;

  const collapseCustomContent = customContent ? (
    <div onClick={onCustomContentClick} className="collapse__custom-content">
      {customContent}
    </div>
  ) : null;
  const counterSection =
    displayCounter && countSelectedItems ? <h3 className="collapse__counter">({countSelectedItems})</h3> : null;

  return (
    <div onClick={headClick} role={headRole} className="sc-panel-heading" {...getDataTestElementProps(restProps)}>
      <div className={finalClassName}>
        {leftIcon}
        <h3>{title}</h3>
        {counterSection}
      </div>
      {collapseCustomContent}
      {rightIcon}
    </div>
  );
};

CollapseHeader.propTypes = {
  /**
   * Collapse head title
   */
  title: PropTypes.node.isRequired,

  /**
   * Is collapse closed (true default)
   */
  isCollapsed: PropTypes.bool.isRequired,

  /**
   * Is whole panel clickable (true default)
   */
  isPanelButton: PropTypes.bool.isRequired,

  /**
   * Icon position default (right)
   */
  iconPosition: PropTypes.oneOf([iconPositions.left, iconPositions.right, iconPositions.none]).isRequired,

  /**
   * Icon styles for expanded and collapsed state. By default it's caret.
   */
  iconStyles: PropTypes.shape({
    expanded: PropTypes.string,
    collapsed: PropTypes.string
  }).isRequired,

  /**
   * Ignores click
   */
  isClickDisabled: PropTypes.bool.isRequired,

  /**
   * What should a
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Children for additional collapse content if needed
   */
  customContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * If true, show counter for selected items
   */
  displayCounter: PropTypes.bool,

  /**
   * Number of selected items
   */
  countSelectedItems: PropTypes.number,

  ...dataTestElementPropTypes
};

CollapseHeader.defaultProps = {
  customContent: undefined,
  className: '',
  displayCounter: false,
  countSelectedItems: null
};

export default CollapseHeader;
