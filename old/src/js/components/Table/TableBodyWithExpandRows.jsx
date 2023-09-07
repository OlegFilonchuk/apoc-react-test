import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEqual } from 'lodash';

import './TableBodyWithExpandRows.less';

/* eslint-disable no-shadow */
export default class TableBodyWithExpandRows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedRowId: props.defaultExpandedRowId,
      expandedChildren: (props.isControlled && props.expandedChildren) || []
    };
  }

  componentWillReceiveProps(nextProps) {
    const child = React.Children.toArray(nextProps.children).find(child => child.props.isExpanded);

    if (child && child.props.id !== this.state.expandedRowId) {
      this.setState({ expandedRowId: child.props.id });
    }

    if (this.props.isControlled && !isEqual(nextProps.expandedChildren, this.props.expandedChildren)) {
      this.setState({ expandedChildren: nextProps.expandedChildren });
    }
  }

  /**
   * It should be child's prop id
   * @param {string} id
   */
  onExpand = id => {
    const { expandedRowId, expandedChildren } = this.state;
    const { allowMultipleExpanded } = this.props;

    if (!allowMultipleExpanded) {
      this.setState({ expandedRowId: expandedRowId === id ? null : id });
    }

    const child = React.Children.toArray(this.props.children).find(child => child.props.id === id);

    if (child.props.onExpand && !allowMultipleExpanded) {
      child.props.onExpand(child.props.id);
    } else if (allowMultipleExpanded && !expandedChildren.includes(child.props.id)) {
      this.setState({
        expandedChildren: [...expandedChildren, child.props.id]
      });
    } else if (allowMultipleExpanded && expandedChildren.includes(child.props.id)) {
      this.setState({
        expandedChildren: expandedChildren.filter(childId => childId !== child.props.id)
      });
    }
    if (this.props.isControlled) {
      this.props.onExpand(id);
    }
  };

  get tableBodyChildren() {
    return React.Children.map(this.props.children, child => {
      const cells = React.Children.toArray(child.props.children);
      const colSpan = this.props.customColspan ? this.props.customColspan : React.Children.count(cells);

      return [
        React.cloneElement(child, {
          className: this.getChildClassNames(child.props.id, child.props.className),
          onExpand: this.onExpand,
          isExpanded: this.isChildExpanded(child.props.id),
          expandOnClick: this.props.expandOnClick
        }),
        this.isChildExpanded(child.props.id) && (
          <tr className="expandable-table-row-content">
            <td colSpan={colSpan}>{child.props.expandContent}</td>
          </tr>
        )
      ];
    });
  }

  get classNames() {
    return classNames('table-body-with-expand-content', this.props.className);
  }

  getChildClassNames = (childId, childClassName) =>
    classNames('expandable-table-row-trigger', childClassName, {
      'expandable-table-row-trigger--expanded': this.isChildExpanded(childId)
    });

  isChildExpanded = childId =>
    !this.props.allowMultipleExpanded
      ? this.state.expandedRowId === childId
      : this.state.expandedChildren.includes(childId);

  render() {
    return this.props.customWrapper ? (
      this.props.customWrapper(props => (
        <tbody {...props} ref={props.innerRef} className={this.classNames}>
          {this.tableBodyChildren}
        </tbody>
      ))
    ) : (
      <tbody className={this.classNames}>{this.tableBodyChildren}</tbody>
    );
  }
}

TableBodyWithExpandRows.propTypes = {
  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Array of <tr> elements
   */
  children: PropTypes.node,

  /**
   * TableRowWithExpandContent's id which should be expanded by default
   */
  defaultExpandedRowId: PropTypes.string,

  /**
   * If true a whole row will be clickable
   */
  expandOnClick: PropTypes.bool,

  /**
   * If true, rows don't be collapsed automatically
   */
  allowMultipleExpanded: PropTypes.bool,

  /**
   * Possibility to set custom number of colspan
   */
  customColspan: PropTypes.number,

  /**
   * Custom wrapper for table children. By default, table component and dependant expects particular children types
   * as they are operating on them. This props allow to add custom wrapper around them AFTER they are modified.
   */
  customWrapper: PropTypes.func,

  /**
   * Allow to controll collapse/expadned state from outside of component
   */
  isControlled: PropTypes.bool,
  /**
   * Function which allow to change outside collapse/expanded state. It gets id of clicked element.
   */
  onExpand: PropTypes.func,
  /**
   * String with id of element which is currently expanded (this should be passed only if isControlled is true and allowMultipleExpandedState is false)
   */
  expandedRowId: PropTypes.string,
  /**
   * Array of currently expanded elements ids in table (this should be passed only if isControlled and allowMultipleExpandedState are true)
   */
  expandedChildren: PropTypes.arrayOf(PropTypes.string)
};

TableBodyWithExpandRows.defaultProps = {
  defaultExpandedRowId: null,
  className: '',
  children: [],
  expandOnClick: false,
  allowMultipleExpanded: false,
  customColspan: null,
  customWrapper: null,
  isControlled: false,
  onExpand: () => {},
  expandedRowId: '',
  expandedChildren: []
};
