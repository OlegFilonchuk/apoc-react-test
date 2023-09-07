import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';

const getTopZIndex = (currentElementIndex, openedModalNames, zIndex) =>
  zIndex + openedModalNames.length + currentElementIndex;

export default function ModalGroup(props) {
  const getModals = () => {
    const { openedModalNames, zIndex } = props;

    return React.Children.toArray(props.children).map((modal, index) => {
      const zIndexForElement = getTopZIndex(index, openedModalNames, zIndex);
      const key = modal.props.name + zIndex;
      const isOpen = openedModalNames.includes(modal.props.name);

      return React.cloneElement(modal, {
        key,
        isOpen,
        zIndex: zIndexForElement
      });
    });
  };

  const { openedModalNames, zIndex, className } = props;

  const openModalsCount = openedModalNames.length;
  const isBackdropVisible = !!openModalsCount;
  const backdropPosition = openModalsCount - 1;

  const backdropZIndex = getTopZIndex(backdropPosition, openedModalNames, zIndex);
  const modals = getModals();

  return (
    <div className={className}>
      <Backdrop zIndex={backdropZIndex} isVisible={isBackdropVisible} />
      {modals}
    </div>
  );
}

ModalGroup.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  /**
   * Default z-index for modals and backdrop
   */
  zIndex: PropTypes.number,

  /**
   * Children `<Modal/>` elements
   */
  children: PropTypes.node.isRequired,
  /* eslint-enable react/no-unused-prop-types */

  /**
   * Array of opened modal names
   */
  openedModalNames: PropTypes.arrayOf(PropTypes.string),

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

ModalGroup.defaultProps = {
  zIndex: 15500,
  openedModalNames: [],
  className: ''
};
