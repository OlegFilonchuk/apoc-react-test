import React from 'react';
import PropTypes from 'prop-types';

import './List.less';

function List(props) {
  const { children, className, ...rest } = props;

  return (
    <ul {...rest} className={`apoc-list ${className}`}>
      {children}
    </ul>
  );
}

List.propTypes = {
  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,

  /**
   * Text value of component and possible elements which `<label>` tag will wrap
   */
  children: PropTypes.node.isRequired
};

List.defaultProps = {
  className: ''
};

export default List;
