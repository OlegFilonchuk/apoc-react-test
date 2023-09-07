import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../Input/Input';
import PaginationButton from './PaginationButton';

import './Pagination.less';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';

// eslint rules is turned off to keep consistent with chameleon
/* eslint react/jsx-no-bind: 'off', radix: 'off' */

class Pagination extends React.Component {
  static isValidPage = /^\d+$/;

  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.currentPage,
      gotoPageValid: true
    };
  }

  componentWillReceiveProps(props) {
    if (props.currentPage !== this.state.currentPage) {
      this.setState({ currentPage: props.currentPage });
    }
  }

  onChange = page => {
    if (page < 1) {
      this.changePage(1);

      return;
    }

    if (page > this.totalPages) {
      this.changePage(this.totalPages);

      return;
    }

    this.changePage(page);
  };

  get totalPages() {
    return Math.ceil(this.props.totalItems / this.props.itemsPerPage);
  }

  get maximumPaginationSize() {
    if (this.props.maximumPaginationSize * this.props.itemsPerPage > this.props.totalItems) {
      return this.totalPages;
    }

    return this.props.maximumPaginationSize;
  }

  get gotoPageClassNames() {
    return classnames('page', 'gotoPage__container', { invalid: !this.state.gotoPageValid });
  }

  get isTotalPagesExceeded() {
    return this.totalPages > this.props.pagesLimit;
  }

  get shouldShowGoToPage() {
    return this.props.showGotoPage || (this.props.showTooltips && this.isTotalPagesExceeded);
  }

  get gotoPageComponent() {
    return this.shouldShowGoToPage ? (
      <li className={this.gotoPageClassNames}>
        Go to page
        <Input type="text" onKeyUp={this.handleGotoPage} {...getDataTestElementProps('goToPageInput')} />
      </li>
    ) : null;
  }

  setGotoPageValidity = flag => {
    this.setState(prevState => ({ ...prevState, gotoPageValid: flag }));
  };

  handleGotoPage = event => {
    /**
     * If value is empty string, ensure to cleanup validity as it is only UI related.
     * Don't need to worry about empty string as `onChange` method have built in guard for page number value.
     */
    if (event.target.value === '') {
      this.setGotoPageValidity(true);
    } else if (Pagination.isValidPage.test(event.target.value)) {
      const page = Number(event.target.value);

      /**
       * If page number value is in fact valid number, check if it fits 0 - `totalPages` range
       */
      const pageFitRange = page > 0 && page <= this.totalPages;

      /**
       * Inform UI that value is valid and handle change if enter was hit
       */
      this.setGotoPageValidity(pageFitRange);

      if (pageFitRange && event.key === 'Enter') {
        this.onChange(page);
      }
    } else {
      /**
       * If value is not empty but it's not number, mark page as invalid
       */
      this.setGotoPageValidity(false);
    }
  };

  changePage = currentPage => {
    this.setState({
      currentPage
    });

    this.props.onChange(currentPage);
  };

  initPages() {
    const maxMidNeighbours = this.calculateMaxMiddleNeighbours();
    let stepsBack = this.calculateBeforeSteps(maxMidNeighbours);
    const stepsFront = this.calculateAfterSteps(stepsBack);

    if (stepsBack + stepsFront !== this.maximumPaginationSize) {
      stepsBack = this.maximumPaginationSize - stepsFront;
    }

    const backElements = this.initElementsBeforeCurrentPage(stepsBack);
    const frontElements = this.initElementsAfterCurrentPage(stepsFront);

    return [...backElements, ...frontElements];
  }

  initElementsBeforeCurrentPage(stepsBack) {
    const backElements = [];
    const hiddenPages = [];

    for (let i = 1; i <= stepsBack; i += 1) {
      const currentStep = this.state.currentPage - i;
      let paginationButton;
      const isOnPageTwo = currentStep !== 2;
      const isSecondLast = i + 1 === stepsBack;

      if (isSecondLast && isOnPageTwo) {
        /**
         * When `showTooltips` is true, count hidden pages in breadcrumbs and add them to tooltip
         */
        if (!this.props.showTooltips) {
          paginationButton = this.addPageElement(false, currentStep, true);
          backElements.unshift(paginationButton);
          paginationButton = this.addPageElement(1, 1);
          backElements.unshift(paginationButton);
          break;
        } else {
          for (let j = 2; j <= currentStep; j += 1) {
            paginationButton = this.addPageElement(j, j);
            hiddenPages.push(paginationButton);
          }

          paginationButton = this.addPageElement(false, currentStep, true, false, hiddenPages);
          backElements.unshift(paginationButton);
          paginationButton = this.addPageElement(1, 1);
          backElements.unshift(paginationButton);
          break;
        }
      } else {
        paginationButton = this.addPageElement(currentStep, currentStep);
      }

      backElements.unshift(paginationButton);
    }

    return backElements;
  }

  initElementsAfterCurrentPage(stepsFront) {
    const frontSteps = [];
    const hiddenPages = [];

    for (let i = 1; i <= stepsFront; i += 1) {
      const currentStep = this.state.currentPage + (i - 1);
      let paginationButton;
      const isCurrentPage = i === 1;
      const isSecondLast = i + 1 === stepsFront;
      const isSecondLastPage = currentStep !== this.totalPages - 1;

      if (isCurrentPage) {
        paginationButton = this.addPageElement(this.state.currentPage, this.state.currentPage, false, true);
      } else if (isSecondLast && isSecondLastPage) {
        /**
         * When `showTooltips` is true, count hidden pages in breadcrumbs and add them to tooltip
         */
        if (!this.props.showTooltips) {
          paginationButton = this.addPageElement(null, currentStep, true);
          frontSteps.push(paginationButton);
          paginationButton = this.addPageElement(this.totalPages, this.totalPages);
          frontSteps.push(paginationButton);
          break;
        } else {
          for (let j = currentStep; j <= this.totalPages - 1; j += 1) {
            paginationButton = this.addPageElement(j, j);
            hiddenPages.push(paginationButton);
          }

          paginationButton = this.addPageElement(null, currentStep, true, false, hiddenPages);
          frontSteps.push(paginationButton);
          paginationButton = this.addPageElement(this.totalPages, this.totalPages);
          frontSteps.push(paginationButton);
          break;
        }
      } else {
        paginationButton = this.addPageElement(currentStep, currentStep);
      }

      frontSteps.push(paginationButton);
    }

    return frontSteps;
  }

  calculateMaxMiddleNeighbours(staticElements = 4) {
    return Math.floor((this.maximumPaginationSize - staticElements) / 2);
  }

  calculateBeforeSteps(maxMidNeighbours) {
    let steps;

    if (this.state.currentPage - maxMidNeighbours - 2 >= 1) {
      steps = maxMidNeighbours + 2;
    } else {
      steps = this.state.currentPage - 1;
    }

    return steps;
  }

  calculateAfterSteps(stepsBack) {
    let stepsFront = this.maximumPaginationSize - stepsBack;

    if (stepsFront + stepsBack > this.totalPages) {
      stepsFront = this.totalPages - stepsBack;
    }

    if (this.state.currentPage + stepsFront > this.totalPages) {
      stepsFront = this.totalPages - this.state.currentPage + 1;
    }

    return stepsFront;
  }

  addPageElement(label, key, isBreadcrumbs = false, currentPage = false, hiddenPages = []) {
    const { NumberWrapper, showTooltips, getCustomLabel } = this.props;

    const customLabel = getCustomLabel ? getCustomLabel(label) : label;

    const Button = (
      <PaginationButton
        onClick={this.onChange}
        isBreadcrumbs={isBreadcrumbs}
        key={key}
        currentPage={currentPage}
        label={label}
        customLabel={customLabel}
        showTooltips={showTooltips}
        hiddenPages={hiddenPages}
        isTotalPagesExceeded={this.isTotalPagesExceeded}
      />
    );

    if (NumberWrapper) {
      return (
        <NumberWrapper
          handleChange={this.onChange}
          isBreadcrumbs={isBreadcrumbs}
          key={key}
          currentPage={currentPage}
          pageNumber={label}
          customLabel={customLabel}
          showTooltips={showTooltips}
          hiddenPages={hiddenPages}
          isTotalPagesExceeded={this.isTotalPagesExceeded}
          Button={Button}
        />
      );
    }

    return Button;
  }

  initLeftCaret = () => {
    let caret;

    if (this.state.currentPage === 1) {
      caret = (
        <li className="page prev-page">
          <span className="page-label current-page sc-icon-caret-left" />
        </li>
      );
    } else {
      caret = (
        <li className="page next-page">
          <a
            className="page-label sc-icon-caret-left"
            onClick={this.onChange.bind(this, this.state.currentPage - 1)}
            {...getDataTestElementProps('previousPageButton')}
          >
            &nbsp;
          </a>
        </li>
      );
    }

    return caret;
  };

  initRightCaret = () => {
    let caret;

    if (this.state.currentPage === this.totalPages) {
      caret = (
        <li className="page prev-page">
          <span className="page-label current-page sc-icon-caret-right" />
        </li>
      );
    } else {
      caret = (
        <li className="page next-page">
          <a
            className="page-label sc-icon-caret-right"
            onClick={this.onChange.bind(this, this.state.currentPage + 1)}
            {...getDataTestElementProps('nextPageButton')}
          >
            &nbsp;
          </a>
        </li>
      );
    }

    return caret;
  };

  render() {
    const pagination = this.initPages();
    const leftCaret = this.initLeftCaret();
    const rightCaret = this.initRightCaret();
    const [showTotal, totalItems] = [this.props.showTotalLabel, this.totalPages];
    const totalItemsSpan = showTotal ? <span className="total-label">{totalItems} Items</span> : null;
    const finalClassName = classnames('pagination-wrapper', this.props.className);

    return (
      <div className={finalClassName}>
        {totalItemsSpan}
        <ul className="pagination-list">
          {leftCaret}
          {pagination}
          {rightCaret}
          {this.gotoPageComponent}
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  /**
   * CurrentPage currentPage number
   */
  currentPage: PropTypes.number.isRequired,

  /**
   * How many items per page
   */
  itemsPerPage: PropTypes.number.isRequired,

  /**
   * Total number of items
   */
  totalItems: PropTypes.number,

  /**
   * Should total label be showed
   */
  showTotalLabel: PropTypes.bool,

  /**
   * Number of elements in pagination
   */
  maximumPaginationSize: PropTypes.number,

  /**
   * Function to be used to write label
   */
  getCustomLabel: PropTypes.func,

  /**
   * Action to be performed on page change
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Show the `goto page` input
   */

  showGotoPage: PropTypes.bool,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * When `showTooltips` is true, display tooltips with pages links
   */
  showTooltips: PropTypes.bool,

  /**
   * Max number of pages to show in the tooltip.
   * Overflowing the tooltip (with too many pages) will cause visual issues so it's up to the dev to style it appropriately
   */

  pagesLimit: PropTypes.number,
  /**
   * Custom component provided to wrap page number component
   */
  NumberWrapper: PropTypes.node
};

Pagination.defaultProps = {
  totalItems: 0,
  showTotalLabel: false,
  maximumPaginationSize: 7,
  showGotoPage: false,
  className: '',
  showTooltips: false,
  getCustomLabel: null,
  pagesLimit: 20,
  NumberWrapper: null
};

export default Pagination;
