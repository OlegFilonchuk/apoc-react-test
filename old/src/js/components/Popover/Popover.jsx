import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import POPOVER_PLACEMENTS from './PopoverPlacements';
import POPOVER_OPEN_TRIGGER from './PopoverOpenTrigger';
import POPOVER_TYPES from './PopoverTypes';

import './Popover.less';

const placementToCssClassMap = {
  [POPOVER_PLACEMENTS.LEFT_TOP]: 'lt',
  [POPOVER_PLACEMENTS.RIGHT_TOP]: 'rt',
  [POPOVER_PLACEMENTS.TOP_RIGHT]: 'tr',
  [POPOVER_PLACEMENTS.TOP_LEFT]: 'tl',
  [POPOVER_PLACEMENTS.BOTTOM_RIGHT]: 'br',
  [POPOVER_PLACEMENTS.BOTTOM_LEFT]: 'bl',
  [POPOVER_PLACEMENTS.TOP_MIDDLE]: 'tm',
  [POPOVER_PLACEMENTS.RIGHT_MIDDLE]: 'rm',
  [POPOVER_PLACEMENTS.LEFT_MIDDLE]: 'lm',
  [POPOVER_PLACEMENTS.BOTTOM_MIDDLE]: 'bm'
};

const openTriggerToEventsNames = {
  [POPOVER_OPEN_TRIGGER.MOUSE_OVER]: {
    open: 'onMouseOver',
    close: 'onMouseLeave'
  },
  [POPOVER_OPEN_TRIGGER.MOUSE_CLICK]: {
    open: 'onClick',
    close: 'onMouseLeave'
  }
};

const POPOVER_TYPE_TO_CLASS = {
  [POPOVER_TYPES.WARNING]: 'sc-qtip-chameleon-warning',
  [POPOVER_TYPES.ERROR]: 'sc-qtip-chameleon-error',
  [POPOVER_TYPES.DEFAULT]: 'qtip-chameleon-default'
};

const getCursorPositionFromEvent = event => ({ top: event.clientY, left: event.clientX });
const isBottomPlacementSet = placement =>
  placement === POPOVER_PLACEMENTS.BOTTOM_LEFT || placement === POPOVER_PLACEMENTS.BOTTOM_RIGHT;

const shouldApplyFollowCursorPosition = (placement, followCursorPosition) =>
  isBottomPlacementSet(placement) && followCursorPosition;

const DISTANCE_FROM_CURSOR_TO_POPOVER = 15; // px
const MOUSEMOVE_EVENT = 'mousemove';
const CLICK_EVENT = 'click';

class Popover extends React.Component {
  static onQtipClick(e) {
    e.stopPropagation();
  }

  static getButtonBehaviourForManualMode() {
    return {};
  }

  constructor(props) {
    super(props);
    this.timerToShowPopover = null;
    this.timerToHidePopover = null;
    this.state = {
      isVisible: this.props.isVisible || false
    };

    this.showPopover = this.showPopover.bind(this);
    this.hidePopover = this.hidePopover.bind(this);
    this.qtipOnMouseOver = this.qtipOnMouseOver.bind(this);
    this.hideAfterDelay = this.hideAfterDelay.bind(this);
    this.getButtonBehaviourForBackdropMode = this.getButtonBehaviourForBackdropMode.bind(this);
    this.getButtonBehaviourForMouseTriggers = this.getButtonBehaviourForMouseTriggers.bind(this);
    this.onPopoverClick = this.onPopoverClick.bind(this);
    this.onOutSidePopoverClick = this.onOutSidePopoverClick.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  componentDidMount() {
    if (!(this.isInBackdropMode() || this.isInManualMode())) {
      return;
    }

    document.addEventListener(CLICK_EVENT, this.onOutSidePopoverClick);
  }

  componentWillReceiveProps(nextProps) {
    const isVisible = nextProps.isVisible;

    if (isVisible !== undefined) {
      this.setVisibility(isVisible);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isVisible !== this.state.isVisible) {
      this.props.onVisibilityChange({
        isVisible: this.state.isVisible,
        tooltipWidth: this.qtip.getBoundingClientRect().width,
        tooltipX: this.qtip.getBoundingClientRect().x,
        contentWidth: this.qtipContent.getBoundingClientRect().width,
        contentParentWidth: this.qtipContentContainerRef.getBoundingClientRect().width
      });
    }
  }

  componentWillUnmount() {
    if (!(this.isInBackdropMode() || this.isInManualMode())) {
      return;
    }

    document.removeEventListener(CLICK_EVENT, this.onOutSidePopoverClick);
  }

  onOutSidePopoverClick(e) {
    if (this.isInBackdropMode()) {
      if (!this.isVisible()) {
        return;
      }

      const isInside = this.node ? this.node.contains(e.target) : true;

      if (!isInside) {
        this.setState({ isVisible: false }, this.props.onOutsidePopoverClick);
      }
    } else {
      const isInside = this.node ? this.node.contains(e.target) : true;

      if (!isInside) {
        this.props.onOutsidePopoverClick();
      }
    }
  }

  onPopoverClick() {
    this.props.onPopoverClick();
  }

  getButtonBehaviour(openTrigger) {
    const behaviours = {
      [POPOVER_OPEN_TRIGGER.MANUAL]: Popover.getButtonBehaviourForManualMode,
      [POPOVER_OPEN_TRIGGER.CLICK_OUTSIDE]: this.getButtonBehaviourForBackdropMode,
      [POPOVER_OPEN_TRIGGER.MOUSE_OVER]: this.getButtonBehaviourForMouseTriggers,
      [POPOVER_OPEN_TRIGGER.MOUSE_CLICK]: this.getButtonBehaviourForMouseTriggers
    };

    const getBehaviourFn = behaviours[openTrigger];

    return getBehaviourFn(openTrigger);
  }

  getButtonBehaviourForBackdropMode() {
    return {
      onClick: this.toggleVisibility
    };
  }

  /* eslint no-unused-vars: 0 */
  getButtonBehaviourForMouseTriggers(openTrigger) {
    const eventNames = openTriggerToEventsNames[openTrigger];
    const { open, close } = eventNames;

    return {
      [open]: this.showPopover,
      [close]: this.hideAfterDelay
    };
  }

  /**
   * @return {*}
   */
  getTooltipBehaviour() {
    if (this.isInManualMode() || this.isInBackdropMode()) {
      return {};
    }

    return {
      onMouseOver: this.qtipOnMouseOver,
      onMouseLeave: this.hidePopover
    };
  }

  getPlacement() {
    return placementToCssClassMap[this.props.placement];
  }

  setVisibility(isVisible) {
    this.setState({
      isVisible: !!isVisible
    });
  }

  setQtipRef = ref => {
    this.qtip = ref;
  };

  setQtipContentRef = ref => {
    this.qtipContent = ref;
  };

  setQtipContentContainerRef = ref => {
    this.qtipContentContainerRef = ref;
  };

  get displayStyle() {
    return this.isVisible() && !this.props.hidePopup ? 'block' : 'none';
  }

  /** @type {?HTMLElement} */
  qtipContent = undefined;

  /** @type {?HTMLElement} */
  qtip = undefined;

  /** @type {?HTMLElement} */
  qtipContentContainerRef = undefined;

  isInManualMode() {
    return this.props.openTrigger === POPOVER_OPEN_TRIGGER.MANUAL;
  }

  isInBackdropMode() {
    return this.props.openTrigger === POPOVER_OPEN_TRIGGER.CLICK_OUTSIDE;
  }

  isVisible() {
    return this.state.isVisible;
  }

  removeMouseMoveEventListener() {
    this.titleComponent.removeEventListener(MOUSEMOVE_EVENT, this.mouseMoveHandler);
  }

  addMouseMoveEventListener() {
    this.titleComponent.addEventListener(MOUSEMOVE_EVENT, this.mouseMoveHandler);
  }

  hideAfterDelay() {
    this.clearTimerToShowPopover();

    if (this.timerToHidePopover) {
      return;
    }

    this.timerToHidePopover = setTimeout(() => {
      this.hidePopover();
    }, this.props.hideAfterDelayOf);
  }

  toggleVisibility() {
    this.setVisibility(!this.isVisible());
  }

  openPopover() {
    const isVisible = true;

    this.setVisibility(isVisible);
  }

  clearTimerToShowPopover() {
    clearTimeout(this.timerToShowPopover);

    this.timerToShowPopover = null;
  }

  closePopover() {
    const isVisible = false;

    this.setVisibility(isVisible);
  }

  openPopoverAfterDelay() {
    this.timerToShowPopover = setTimeout(() => {
      if (!this.timerToShowPopover) {
        return;
      }

      this.openPopover();
    }, this.props.showAfterDelayOf);
  }

  mouseMoveHandler(event) {
    const mousePosition = getCursorPositionFromEvent(event);

    this.qtip.style.top = `${mousePosition.top - DISTANCE_FROM_CURSOR_TO_POPOVER}px`;
    this.qtip.style.left = `${mousePosition.left}px`;
  }

  hidePopover() {
    if (!this.props.isAllowed) {
      return;
    }

    const { placement, followCursorPosition } = this.props;

    if (shouldApplyFollowCursorPosition(placement, followCursorPosition)) {
      this.removeMouseMoveEventListener();
    }

    this.clearTimerToShowPopover();
    this.closePopover();

    this.props.onClose();
  }

  showPopover() {
    if (this.isInManualMode() || !this.props.isAllowed) {
      return;
    }

    const { placement, followCursorPosition, showAfterDelayOf } = this.props;

    if (shouldApplyFollowCursorPosition(placement, followCursorPosition)) {
      this.addMouseMoveEventListener();
    }

    if (showAfterDelayOf) {
      this.openPopoverAfterDelay();
    } else {
      this.openPopover();
    }

    this.timerToHidePopover = null;
  }

  qtipOnMouseOver() {
    clearTimeout(this.timerToHidePopover);
  }

  render() {
    const {
      popoverStyles,
      isDisabled,
      isClosable,
      openTrigger,
      removeChildrenFromDOMWhenHidden,
      className,
      tooltipClassName,
      header,
      children,
      title,
      style
    } = this.props;

    let qTipStyles = { display: this.displayStyle };

    if (popoverStyles) {
      qTipStyles = { ...qTipStyles, ...popoverStyles };
    }

    const tooltipPlacement = this.getPlacement();

    const qtipClasses = classNames(
      'qtip',
      'qtip-chameleon',
      POPOVER_TYPE_TO_CLASS[this.props.type],
      'qtip-shadow',
      `qtip-pos-${tooltipPlacement}`,
      'qtip-focus',
      {
        'qtip-disabled': isDisabled,
        'qtip-is-closable': isClosable,
        'position-fixed': this.props.followCursorPosition,
        'qtip-without-arrow': this.props.hideArrow
      },
      tooltipClassName
    );

    const CloseButton = isClosable ? (
      <a onClick={this.hidePopover} className="qtip-close qtip-icon">
        <span className="ui-icon ui-icon-close">×</span>
      </a>
    ) : null;

    const openCloseBehaviourButton = this.getButtonBehaviour(openTrigger);
    const openCloseBehaviourToolTip = this.getTooltipBehaviour(openTrigger);

    const popoverClasses = `tooltip-container ${className}`;
    const shouldRenderChildren = !removeChildrenFromDOMWhenHidden || this.isVisible();
    const popoverTitleClasses = classNames('popover-title', {
      'popover-title--visible': this.isVisible()
    });

    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={popoverClasses}
        onClick={this.onPopoverClick}
        style={style}
      >
        <div
          className={popoverTitleClasses}
          {...openCloseBehaviourButton}
          ref={titleComponent => {
            this.titleComponent = titleComponent;
          }}
        >
          {title}
        </div>

        <div className={qtipClasses} style={qTipStyles} {...openCloseBehaviourToolTip} ref={this.setQtipRef}>
          <div onClick={Popover.onQtipClick} className="qtip-content">
            <div className="visible" ref={this.setQtipContentContainerRef}>
              <header>
                {header}
                {CloseButton}
              </header>
              <div className="tooltip-body" ref={this.setQtipContentRef}>
                {shouldRenderChildren ? children : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Popover.propTypes = {
  /**
   * Specifies Header part of the popover. If not specified then popover
   * will not have header.
   */
  header: PropTypes.node,

  /**
   * Specified manual trigger to show/hide popover
   */
  isVisible: PropTypes.bool,

  /**
   * Specified whether popover should be visible or not
   */
  isAllowed: PropTypes.bool,

  /**
   * Specifies whether popover should be shown in disabled state or not
   */
  isDisabled: PropTypes.bool,

  /**
   * Specifies whether component should have close button
   */
  isClosable: PropTypes.bool,

  /**
   * Should contain items to be placed inside of a popover body
   */
  children: PropTypes.node,
  /**
   * This function will be called when close button is clicked
   */
  onClose: PropTypes.func,
  /**
   * This function will be called popover element will be clicked
   */
  onPopoverClick: PropTypes.func,
  /**
   * This function will be called when click happens outside of the popover
   */
  onOutsidePopoverClick: PropTypes.func,

  /**
   * This function will be called click outside of popover element
   */
  placement: PropTypes.oneOf(Object.keys(POPOVER_PLACEMENTS).map(placement => POPOVER_PLACEMENTS[placement])),

  /**
   * CAN BE APPLIED ONLY FOR POPOVER WITH PLACEMENT OF `BOTTOM_LEFT` AND `BOTTOM_RIGHT`.
   * Base position where Popover will appear. When `true` .
   * If `true` - Popover will follow mouse cursor.
   * If `false` - it will appear at the center of the title component.
   * Default - false.
   */
  followCursorPosition: PropTypes.bool,

  /**
   * Defines event on `title` element. When triggered it opens the popover. All possible values of
   * `POPOVER_OPEN_TRIGGER`.
   */
  openTrigger: PropTypes.oneOf([
    POPOVER_OPEN_TRIGGER.MOUSE_CLICK,
    POPOVER_OPEN_TRIGGER.MOUSE_OVER,
    POPOVER_OPEN_TRIGGER.MANUAL,
    POPOVER_OPEN_TRIGGER.CLICK_OUTSIDE
  ]),

  /**
   * Config object to override styles for popover body. The format of the prop should match
   * the [style prop](https://facebook.github.io/react/docs/dom-elements.html#style).
   */
  popoverStyles: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /**
   * Expects time in milliseconds
   * After this time popover will be hidden if there was no onMouseOver event
   */
  hideAfterDelayOf: PropTypes.number,

  /**
   * Time in milliseconds after which Popover will become visible.
   * Default - 0.
   */
  showAfterDelayOf: PropTypes.number,

  /**
   * CSS classes of container.
   */
  className: PropTypes.string,

  /**
   * CSS classes of tooltip
   */
  tooltipClassName: PropTypes.string,

  /**
   * When `true`, and `Popover` is hidden children are removed from DOM. On show they are rendered from scratch.
   */
  removeChildrenFromDOMWhenHidden: PropTypes.bool,

  /**
   * This is entry point for the component.
   * If set as String - will be rendered as a simple text string.
   * If set as React.Component - will be rendered as correct React.Component
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Triggered after visibility is changed during ComponentDidUpdate of the Popover life cycle.
   * @typedef {{isVisible: boolean, tooltipWidth: number, tooltipX: number, contentWidth: number, contentParentWidth: number}} onVisibilityChangeParams
   * @type {function(onVisibilityChangeParams):void}
   */
  onVisibilityChange: PropTypes.func,
  // eslint-disable-next-line
  style: PropTypes.object,

  /**
   * When hidePopup is `true`, pop-up is hidden
   */
  hidePopup: PropTypes.bool,

  /**
   * When hideArrow is `true`, arrow from tooltip is hidden
   */
  hideArrow: PropTypes.bool,

  /**
   * Appropriate styles are applied depending on whether a type is set
   */
  type: PropTypes.oneOf([POPOVER_TYPES.WARNING, POPOVER_TYPES.ERROR, POPOVER_TYPES.DEFAULT])
};

Popover.defaultProps = {
  className: '',
  tooltipClassName: '',
  children: null,
  header: null,
  isVisible: undefined,
  isAllowed: true,
  isClosable: false,
  isDisabled: false,
  placement: POPOVER_PLACEMENTS.LEFT_TOP,
  openTrigger: POPOVER_OPEN_TRIGGER.MOUSE_OVER,
  popoverStyles: null,
  followCursorPosition: false,
  hideAfterDelayOf: 500,
  showAfterDelayOf: 0,
  removeChildrenFromDOMWhenHidden: false,
  title: 'Hover to see a tooltip',
  onPopoverClick: () => true,
  onOutsidePopoverClick: () => true,
  onClose: () => true,
  onVisibilityChange: () => true,
  hidePopup: false,
  hideArrow: false,
  type: POPOVER_TYPES.DEFAULT
};

export default Popover;
