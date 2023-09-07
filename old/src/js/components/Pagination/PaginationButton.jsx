import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Popover from '../Popover/Popover';
import POPOVER_PLACEMENTS from '../Popover/PopoverPlacements';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';

class PaginationButton extends React.Component {
  onLabelClick = () => {
    this.props.onClick(this.props.label);
  };

  get pageBreak() {
    const { showTooltips, isTotalPagesExceeded, hiddenPages } = this.props;

    return showTooltips && !isTotalPagesExceeded ? (
      <Popover placement={POPOVER_PLACEMENTS.TOP_MIDDLE} title={<li className="page page-break arrow">…</li>}>
        {hiddenPages}
      </Popover>
    ) : (
      <li className="page page-break">…</li>
    );
  }

  get classNameList() {
    return classNames('page', {
      'first-page': this.props.isFirstPage
    });
  }

  get Label() {
    const { currentPage, label, customLabel } = this.props;

    return currentPage ? (
      <span className="page-label current-page">{customLabel || label}</span>
    ) : (
      <a className="page-label" onClick={this.onLabelClick} {...getDataTestElementProps(`pageButton-${label}`)}>
        {customLabel || label}
      </a>
    );
  }

  get paginationItem() {
    return this.props.isBreadcrumbs ? this.pageBreak : <li className={this.classNameList}>{this.Label}</li>;
  }

  render() {
    return this.paginationItem;
  }
}

PaginationButton.propTypes = {
  /**
   * Function executed on button click
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Label for pagination button (can be falsy)
   */
  label: PropTypes.node,

  /**
   * Custom label for pagination button (can be falsy)
   */
  customLabel: PropTypes.node,

  /**
   * Is button a first page
   */
  isFirstPage: PropTypes.bool,

  /**
   * Is button a current page
   */
  currentPage: PropTypes.bool,

  /**
   * Is button a delimiter
   */
  isBreadcrumbs: PropTypes.bool,

  /**
   * When `showTooltips` is true, display tooltips with pages links
   */
  showTooltips: PropTypes.bool,

  /**
   * `hiddenPages` are contain with pages hidden in breadcrumbs. This is use only when `showTooltips` is true
   */
  hiddenPages: PropTypes.arrayOf(PropTypes.element),

  /**
   * `isTotalPagesExceeded` check if total pages limit is exceeded
   */
  isTotalPagesExceeded: PropTypes.bool
};

PaginationButton.defaultProps = {
  label: '',
  customLabel: '',
  isFirstPage: false,
  currentPage: false,
  isBreadcrumbs: false,
  showTooltips: false,
  hiddenPages: [],
  isTotalPagesExceeded: false
};

export default PaginationButton;
