import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CollapseGroup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collapsedMap: new Map()
    };

    React.Children.map(this.props.children, (collapse, key) => {
      this.state.collapsedMap.set(key, collapse.props.isCollapsed);
    });

    this.onChildToggled = this.onChildToggled.bind(this);
  }

  onChildToggled(collapseKey, isCollapsed) {
    const values = [...this.state.collapsedMap.keys()]
      .filter(key => key !== collapseKey)
      .map(key => {
        const wasCollapsed = this.isCollapsed(key);
        const isCurrentItemCollapsed = this.allowOpeningMultiple() || isCollapsed ? wasCollapsed : true;

        return [key, isCurrentItemCollapsed];
      });

    values.push([collapseKey, isCollapsed]);

    this.setState(
      () => ({
        collapsedMap: new Map(values)
      }),
      () => this.props.onToggled(collapseKey, isCollapsed)
    );
  }

  allowOpeningMultiple() {
    return this.props.allowMultipleOpened;
  }

  isCollapsed(collapse) {
    return this.state.collapsedMap.get(collapse);
  }

  render() {
    const finalClassName = classNames('sc-panel-group', this.props.className);
    const children = React.Children.map(this.props.children, (collapse, key) =>
      React.cloneElement(collapse, {
        isCollapsed: this.isCollapsed(key),

        onToggled: isCollapsed => {
          collapse.props.onToggled(isCollapsed);

          this.onChildToggled(key, isCollapsed);
        }
      })
    );

    return <div className={finalClassName}>{children}</div>;
  }
}

CollapseGroup.propTypes = {
  /**
   * Children `<Collapse />` elements
   */
  children: PropTypes.node.isRequired,

  /**
   * Allow opening multiple `<Collapse>` element at the same time
   */
  allowMultipleOpened: PropTypes.bool,

  /**
   * Function that is triggered when each of panels is toggled
   */
  onToggled: PropTypes.func,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

CollapseGroup.defaultProps = {
  allowMultipleOpened: false,
  onToggled: () => null,
  className: ''
};

export default CollapseGroup;
