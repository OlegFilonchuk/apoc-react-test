import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';

import haveChildrenPropsChanged from '../../utils/haveChildrenPropsChanged';

import CollapseHeader, { iconPositions } from './CollapseHeader';

import './Collapse.less';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';

const initialHeight = -1; // before height being calculated

class Collapse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: this.props.isCollapsed,
      height: initialHeight
    };
  }

  componentWillReceiveProps(props) {
    if (props.isCollapsed !== this.props.isCollapsed) {
      this.setState(prevState => ({
        ...prevState,
        isCollapsed: props.isCollapsed
      }));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.disableShouldComponentUpdate) {
      return true;
    }

    const { height, isCollapsed } = this.state;

    return (
      nextState.isCollapsed !== isCollapsed ||
      nextState.height !== height ||
      haveChildrenPropsChanged(nextProps.children, this.props.children) ||
      haveChildrenPropsChanged(nextProps.customContent, this.props.customContent) ||
      nextProps.title !== this.props.title
    );
  }

  onHeightReady = dimensions => {
    const { height } = dimensions.offset;

    if (height > 0 && height !== this.state.height) {
      this.setState(prevState => ({ ...prevState, height }));
    }
  };

  get countSelectedItems() {
    const { children } = this.props.children.props;

    if (children.some(item => item.props.checked) && this.props.displayCounter) {
      return children
        .filter(item => item.props.checked)
        .map(item => item.props.label.props.labelCount)
        .reduce((acc, curr) => acc + curr);
    }

    return null;
  }

  get showCounter() {
    return this.props.displayCounter ? this.countSelectedItems : null;
  }

  get maxHeight() {
    return this.state.isCollapsed ? 0 : this.state.height;
  }

  get finalClassName() {
    return classNames('sc-panel collapse', this.props.className);
  }

  get panelWrapperClass() {
    return classNames('panel__wrapper', {
      'panel__wrapper--collapsed': this.state.isCollapsed,
      'panel__wrapper--expanded': !this.state.isCollapsed
    });
  }

  toggleCollapse = () => {
    if (this.props.isControlled) {
      this.props.onToggled(!this.props.isCollapsed);
    } else {
      const isCollapsed = !this.state.isCollapsed;

      this.setState(
        prevState => ({ ...prevState, isCollapsed }),
        () => this.props.onToggled(isCollapsed)
      );
    }
  };

  render() {
    const {
      children,
      title,
      isClickDisabled,
      isPanelButton,
      iconPosition,
      iconStyles,
      id,
      customContent,
      displayCounter,
      isControlled,
      isCollapsed
    } = this.props;

    const styles = { maxHeight: this.maxHeight };

    return (
      <div className={this.finalClassName}>
        <CollapseHeader
          title={title}
          isClickDisabled={isClickDisabled}
          isCollapsed={!isControlled ? this.state.isCollapsed : isCollapsed}
          isPanelButton={isPanelButton}
          iconPosition={iconPosition}
          iconStyles={iconStyles}
          onClick={this.toggleCollapse}
          customContent={customContent}
          {...getDataTestElementProps(`${id}CollapseHeader`)}
          displayCounter={displayCounter}
          countSelectedItems={this.showCounter}
        />

        <div className={this.panelWrapperClass} style={styles}>
          <Measure offset onResize={this.onHeightReady}>
            {({ measureRef }) => (
              <div ref={measureRef} className="sc-panel-body">
                {children}
              </div>
            )}
          </Measure>
        </div>
      </div>
    );
  }
}

Collapse.propTypes = {
  /**
   * Is controlled from outside
   */
  isControlled: PropTypes.bool,
  /**
   * Collapse head title
   */
  title: PropTypes.node.isRequired,

  /**
   * Is collapse closed (true default)
   */
  isCollapsed: PropTypes.bool,

  /**
   * Is whole panel clickable (true default)
   */
  isPanelButton: PropTypes.bool,

  /**
   * Icon position default (right)
   */
  iconPosition: PropTypes.oneOf([iconPositions.left, iconPositions.right, iconPositions.none]),

  /**
   * Icon styles for expanded and collapsed state. By default it's caret.
   */
  iconStyles: PropTypes.shape({
    expanded: PropTypes.string,
    collapsed: PropTypes.string
  }),

  /**
   * Function that triggers on panel click
   */
  onToggled: PropTypes.func,

  /**
   * Children content of the collapse element
   */
  children: PropTypes.node,

  /**
   * Ignores click
   */
  isClickDisabled: PropTypes.bool,

  /**
   * Needed for data-test-element
   */
  id: PropTypes.string,

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
   * Skip should component update lifecycle method
   */
  disableShouldComponentUpdate: PropTypes.bool
};

Collapse.defaultProps = {
  isControlled: false,
  isPanelButton: false,
  iconPosition: iconPositions.left,
  isCollapsed: true,
  iconStyles: {
    expanded: 'sc-icon-caret-up',
    collapsed: 'sc-icon-caret-down'
  },
  onToggled: () => null,
  isClickDisabled: false,
  id: '',
  customContent: null,
  className: '',
  children: null,
  displayCounter: false,
  disableShouldComponentUpdate: false
};

export default Collapse;
export { iconPositions };
