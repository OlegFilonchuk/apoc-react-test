import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../Pagination/Pagination';

const getFromNumber = (currentPage, itemsPerPage) => (currentPage - 1) * itemsPerPage + 1;
const getToNumber = (currentPage, itemsPerPage, totalItems) => {
  const to = (currentPage - 1) * itemsPerPage + itemsPerPage;

  return to > totalItems ? totalItems : to;
};

const withPagination = Component => {
  const DecoratedComponent = ({ paginationProps, wrapperClassName, ...props }) => {
    const isPaginationVisible = Object.keys(paginationProps).length !== 0;
    let pagination = null;

    if (isPaginationVisible) {
      const from = getFromNumber(paginationProps.currentPage, paginationProps.itemsPerPage);
      const to = getToNumber(paginationProps.currentPage, paginationProps.itemsPerPage, paginationProps.totalItems);
      const fromTo = from === to ? from : `${from}-${to}`;

      const infoLabel = `${fromTo} of ${paginationProps.totalItems} found`;

      pagination = (
        <div className="withPagination__wrapper">
          <div className="withPagination__infoLabelWrapper">
            {props.slots.infoLabelBefore}
            <span>{infoLabel}</span>
            {props.slots.infoLabelAfter}
          </div>
          <Pagination {...paginationProps} />
        </div>
      );
    }

    return (
      <div className={wrapperClassName}>
        {pagination}
        <Component {...props} />
      </div>
    );
  };

  DecoratedComponent.propTypes = {
    /* eslint-disable react/forbid-prop-types */
    paginationProps: PropTypes.object,
    slots: PropTypes.shape({
      infoLabelBefore: PropTypes.node,
      infoLabelAfter: PropTypes.node
    }),
    wrapperClassName: PropTypes.string
  };

  DecoratedComponent.defaultProps = {
    paginationProps: {},
    slots: {
      infoLabelBefore: null,
      infoLabelAfter: null
    },
    wrapperClassName: ''
  };

  DecoratedComponent.displayName = `${Component.displayName}WithPagination`;

  return DecoratedComponent;
};

export default withPagination;
