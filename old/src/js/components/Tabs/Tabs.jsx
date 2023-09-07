import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Panel from './TabsPanel';

import './Tabs.less';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';

class Tabs extends React.Component {
  static getDataTestElementName(title) {
    return title
      .split(' ')
      .map(item => `${item[0].toUpperCase()}${item.slice(1)}`)
      .join('');
  }
  componentWillMount() {
    this.setState({
      tabActive: this.props.tabActive
    });
  }

  componentDidMount() {
    const index = this.state.tabActive;
    const $selectedPanel = this['tab-panel'];
    const $selectedMenu = this[`tab-menu-${index}`];

    if (this.props.onMount) {
      this.props.onMount(index, $selectedPanel, $selectedMenu);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tabActive && newProps.tabActive !== this.props.tabActive) {
      this.setState({ tabActive: newProps.tabActive });
    }
  }

  onCurrentPanelRef = node => {
    this['tab-panel'] = node;
  };

  setActive(index) {
    const onAfterChange = this.props.onAfterChange;
    const onBeforeChange = this.props.onBeforeChange;
    const $selectedPanel = this['tab-panel'];
    const $selectedTabMenu = this[`tab-menu-${index}`];

    if (onBeforeChange) {
      const cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);

      if (cancel === false) {
        return false;
      }
    }

    this.setState({ tabActive: index }, () => {
      if (onAfterChange) {
        onAfterChange(index, $selectedPanel, $selectedTabMenu);
      }
    });

    return true;
  }

  getMenuItems() {
    const { children } = this.props;

    if (!children) {
      throw new Error('Tabs must contain at least one Tabs.Panel');
    }

    let newChildren;

    if (!Array.isArray(children)) {
      newChildren = [children];
    } else {
      newChildren = [...children];
    }

    const $menuItems = newChildren
      .map($panel => (typeof $panel === 'function' ? $panel() : $panel))
      .filter($panel => $panel)
      .map(($panel, index) => {
        const title = $panel.props.title;
        const iconTab = $panel.props.iconTab ? <i className={`${$panel.props.iconTab} icon-tab`} /> : null;
        const optionalLabel = $panel.props.optionalLabel ? <span className="optional-tab">(Optional)</span> : null;
        const classes = classNames('tabs-menu-item', {
          'tabs-menu-item-with-icon': $panel.props.iconTab,
          'is-active': this.state.tabActive === index + 1,
          'is-disabled': $panel.props.disabled
        });

        return (
          /* eslint react/no-array-index-key: 0 */
          <li
            ref={c => {
              this[`tab-menu-${index + 1}`] = c;
            }}
            key={index}
            className={classes}
          >
            {iconTab}
            <a
              onClick={() => {
                if (!$panel.props.disabled) {
                  this.setActive(index + 1);
                }
              }}
              {...getDataTestElementProps(Tabs.getDataTestElementName(title))}
            >
              {title}
              {optionalLabel}
            </a>
          </li>
        );
      });

    return (
      <nav className="tabs-navigation">
        <ul className="tabs-menu">{$menuItems}</ul>
      </nav>
    );
  }

  getCssHiddenPanels() {
    return React.Children.map(this.props.children, (child, index) => {
      const isCurrent = index === this.state.tabActive - 1;
      const panelClassName = classNames('tab-panel', !isCurrent && 'sc-hide');

      return (
        <article ref={isCurrent ? this.onCurrentPanelRef : undefined} className={panelClassName}>
          {child}
        </article>
      );
    });
  }

  getSelectedPanel() {
    const index = this.state.tabActive - 1;
    const $panel = Array.isArray(this.props.children) ? this.props.children[index] : this.props.children;

    return (
      <article
        ref={c => {
          this['tab-panel'] = c;
        }}
        className="tab-panel"
      >
        {$panel}
      </article>
    );
  }

  render() {
    return (
      <div className={`tabs ${this.props.className}`}>
        {this.getMenuItems()}
        {this.props.useCssSwitching ? this.getCssHiddenPanels() : this.getSelectedPanel()}
      </div>
    );
  }
}

Tabs.Panel = Panel;

Tabs.propTypes = {
  /**
   * Any custom class names
   */
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),

  /**
   * Which tab should be active by default
   */
  tabActive: PropTypes.number,

  /**
   * Custom callback to be run on mount with signature:
   * `activeTabIndex, selectedPanelReference, selectedMenuReference`
   */
  onMount: PropTypes.func,

  /**
   * Custom ballback to be run before tab change
   */
  onBeforeChange: PropTypes.func,

  /**
   * Custom callback to be run after tab change
   */
  onAfterChange: PropTypes.func,

  /**
   * Should the invisible tabs be rendered and hidden with css only
   */
  useCssSwitching: PropTypes.bool,

  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired
};

Tabs.defaultProps = {
  tabActive: 1,
  className: '',
  onMount: () => true,
  onBeforeChange: () => true,
  onAfterChange: () => true,
  useCssSwitching: false
};

export default Tabs;
