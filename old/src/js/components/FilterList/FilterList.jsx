import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import './FilterList.less';

export default class FilterList extends React.Component {
  static BASE_CLASS = 'filterlist';

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  get buildOptions() {
    return this.props.options.map(({ name, value }) => (
      <li key={name} className={`${FilterList.BASE_CLASS}__option`}>
        <span>{name}</span>
        <button
          className={`${FilterList.BASE_CLASS}__option-remove sc-icon-filled-circle-close sc-txt-primary`}
          onClick={() => this.remove(value)}
        />
      </li>
    ));
  }

  get finalClassName() {
    return classNames(FilterList.BASE_CLASS, this.props.className);
  }

  remove = value => {
    this.props.onFilterRemove(value);
    this.props.onChange(this.props.options.filter(option => option.value.name !== value.name));
  };

  removeAll = () => {
    this.props.onChange([]);
    this.props.onClearAll();
  };

  render() {
    return (
      <ul className={this.finalClassName}>
        {this.buildOptions}
        <li className={`${FilterList.BASE_CLASS}__remove-all`}>
          <button onClick={this.removeAll} className="sc-txt-primary">
            Clear All
          </button>
        </li>
      </ul>
    );
  }
}

FilterList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    })
  ),
  onChange: PropTypes.func,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * For backward compatibility we are leaving `onChange`
   * but it has major drawback: giving you only list of items which left after change.
   *
   * Callbacks above are giving more granular control and they are REPLACEMENT for `onChange`
   */
  onClearAll: PropTypes.func,
  onFilterRemove: PropTypes.func
};

FilterList.defaultProps = {
  options: [],
  onChange: () => true,
  onClearAll: () => true,
  onFilterRemove: () => true,
  className: ''
};
