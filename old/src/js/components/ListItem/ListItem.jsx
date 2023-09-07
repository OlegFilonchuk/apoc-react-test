import React from 'react';
import PropTypes from 'prop-types';

import './ListItem.less';

class ListItem extends React.Component {
  getRemoveButton() {
    if (this.props.isRemovable) {
      return <span onClick={e => this.props.onRemove(e, this)} className="remove-button" />;
    }

    return null;
  }

  render() {
    const { children, className } = this.props;
    const removeButton = this.getRemoveButton();

    return (
      <li className={`list-item ${className}`}>
        {children}
        {removeButton}
      </li>
    );
  }
}

ListItem.propTypes = {
  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Has remove button
   */
  isRemovable: PropTypes.bool.isRequired,

  /**
   * Triggers on remove button click
   */
  onRemove: PropTypes.func,

  /**
   * Text value of component and possible elements which `<label>` tag will wrap
   */
  children: PropTypes.node.isRequired
};

ListItem.defaultProps = {
  children: '',
  className: '',
  isRemovable: false,
  onRemove: () => true
};

export default ListItem;
