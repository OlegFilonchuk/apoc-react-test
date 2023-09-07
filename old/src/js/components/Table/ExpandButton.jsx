import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ExpandButton({ onExpand, isExpanded, type }) {
  const iconClassName = classNames({
    'sc-icon-right-arrow': !isExpanded,
    'sc-icon-down-arrow': isExpanded
  });

  return (
    <button onClick={onExpand} className="expand-btn" type={type}>
      <span className={iconClassName} />
    </button>
  );
}

ExpandButton.propTypes = {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
   */
  type: PropTypes.string,

  /**
   * It will be called if expand button is clicked
   */
  onExpand: PropTypes.func,

  /**
   * Show if row was expanded
   */
  isExpanded: PropTypes.bool.isRequired
};

ExpandButton.defaultProps = {
  type: 'button',
  className: '',
  onExpand: () => null
};
