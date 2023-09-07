import React from 'react';
import PropTypes from 'prop-types';

import './Placeholder.less';

const getCloseIcon = (isClosable, onClose) =>
  isClosable ? <span className="sc-icon-circle-remove-btn placeholder__close-icon" onClick={onClose} /> : null;

const Placeholder = props => {
  const { className, children, onClose, isClosable } = props;
  const closeIcon = getCloseIcon(isClosable, onClose);

  return (
    <div className={`placeholder ${className}`}>
      {closeIcon}
      <div className="placeholder__content">{children}</div>
    </div>
  );
};

Placeholder.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isClosable: PropTypes.bool,
  onClose: PropTypes.func
};

Placeholder.defaultProps = {
  children: null,
  className: '',
  isClosable: false,
  onClose: () => true
};

export default Placeholder;
