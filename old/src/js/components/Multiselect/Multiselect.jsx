import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import haveChildrenPropsChanged from '../../utils/haveChildrenPropsChanged';
import Checkbox, { labelPositions } from '../Checkbox/Checkbox';

import './Multiselect.less';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';

class Multiselect extends React.Component {
  shouldComponentUpdate(nextProps) {
    return haveChildrenPropsChanged(this.props.children, nextProps.children);
  }

  get className() {
    return classNames('multiselect', this.props.className, {
      'multiselect--no-vertical-lines': this.props.noVerticalLines
    });
  }

  get renderChildren() {
    this.checkboxesState = new Map();

    return React.Children.map(this.props.children, child => this.createControlledCheckbox(child));
  }

  callOnChange(e) {
    this.checkboxesState.set(e.target.name, e.target.checked);
    this.props.onChange(this.checkboxesState);
  }

  itemClassName = child =>
    classNames('multiselect__row', {
      'multiselect__row--disabled': child.props.disabled
    });

  createControlledCheckbox(child) {
    if (child.type !== Checkbox) {
      throw new Error('All elements needs to be instance of <Checkbox/>');
    }

    const { fullWidth, labelPosition } = this.props;

    const props = {
      ...child.props,
      name: child.props.name || `checkbox-${this.checkboxesState.size}`,
      fullWidth,
      labelPosition,
      ...getDataTestElementProps(`${child.props.name.replace(/\s/g, '')}Checkbox`),
      onChange: (...args) => {
        if (child.props.onChange) {
          child.props.onChange(...args);
        }

        this.callOnChange(...args);
      }
    };

    const isChecked = child.props.checked || child.props.defaultChecked || false;

    const newCheckbox = React.cloneElement(child, props);

    this.checkboxesState.set(props.name, isChecked);

    return (
      <li className={this.itemClassName(child)}>
        <div className="li-content">{newCheckbox}</div>
      </li>
    );
  }

  render() {
    return <ul className={this.className}>{this.renderChildren}</ul>;
  }
}

Multiselect.propTypes = {
  /**
   *  Is called whenever one of [Checkboxes](#checkbox) changes its state.
   *
   *  Function takes one argument that is a `{Map<String,boolean>}`, where
   *  key is a name of a [Checkbox](#checkbox) and value is whether it's checked or not
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Set of [Checkbox](#checkbox) components. Each component overwrites following props:
   * `fullWidth=this.props.fullWidth` and `labelPosition=this.props.labelPosition`
   */
  children: PropTypes.node.isRequired,

  /**
   * Sets the label position of the checkboxes
   */
  labelPosition: PropTypes.oneOf([labelPositions.left, labelPositions.right]),

  /**
   * Turns off vertival lines between checkboxes
   */
  noVerticalLines: PropTypes.bool,

  /**
   * Use full width for the checkboxes
   */
  fullWidth: PropTypes.bool,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

Multiselect.defaultProps = {
  labelPosition: labelPositions.left,
  noVerticalLines: false,
  fullWidth: true,
  className: ''
};

export default Multiselect;
