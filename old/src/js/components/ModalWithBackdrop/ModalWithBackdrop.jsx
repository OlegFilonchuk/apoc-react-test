import React from 'react';
import PropTypes from 'prop-types';

import withBackdrop from '../withBackdrop/withBackdrop';
import Modal from '../Modal/Modal';

const ExtendedModal = withBackdrop(Modal, 'isOpen');

const ModalWithBackdrop = props => <ExtendedModal {...props} backdrop={{ onClick: props.onOutsideModalClick }} />;

ModalWithBackdrop.propTypes = {
  onOutsideModalClick: PropTypes.func
};

ModalWithBackdrop.defaultProps = {
  onOutsideModalClick: () => true
};

export default ModalWithBackdrop;
