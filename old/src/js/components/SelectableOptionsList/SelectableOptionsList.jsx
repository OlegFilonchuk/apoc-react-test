import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../Input/Input';
import POPOVER_OPEN_TRIGGER from '../Popover/PopoverOpenTrigger';
import Popover from '../Popover/Popover';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';
import { HIDDEN_POPOVER_INDEX } from './consts';

import './SelectableOptionsList.less';

export default class SelectableOptionsList extends Component {
  static getDataTestElementName = (option = '') =>
    `${option}`
      .split(' ')
      .map(opt => (opt ? `${opt[0].toUpperCase()}${opt.slice(1)}` : ''))
      .join('');

  state = {
    filter: '',
    mouseCoordinates: {
      clientY: 0
    },
    hoveredSide: 'left'
  };

  onFilterChange(condition) {
    this.setState(prevState => ({
      ...prevState,
      filter: condition
    }));
  }

  onOptionAdd = option => {
    this.props.onOptionAdd(option);
    this.hidePopover();
  };

  onAllOptionsAdd = () => {
    if (!this.areAllOptionsAdded) {
      this.props.onAllOptionsAdd(this.props.options);
      this.hidePopover();
    }
  };

  onOptionRemove = option => {
    this.props.onOptionRemove(option);
    this.hidePopover();
  };

  onAllOptionsRemove = () => {
    if (this.props.optionsAdded.length) {
      this.props.onAllOptionsRemove();
      this.hidePopover();
    }
  };

  get areAllOptionsAdded() {
    return this.props.optionsAdded.length === this.props.options.length;
  }

  get leftModuleListItemButtonClass() {
    return classnames('left-list-item-button', this.props.leftModuleListItemButtonClass);
  }

  get rightModuleListItemButtonClass() {
    return classnames('right-list-item-button', this.props.rightModuleListItemButtonClass);
  }

  get leftModuleOptions() {
    const allOptions = [...this.props.options];
    const addedOptions = [...this.props.optionsAdded];

    return allOptions
      .filter(option => !addedOptions.includes(option))
      .filter(optionForAdd => `${optionForAdd}`.toUpperCase().includes(this.state.filter.toUpperCase()))
      .map((option, index) => {
        const mouseEnter = () => {
          this.setState({
            ...this.state,
            visiblePopOver: index,
            option
          });
        };

        return (
          <li className="list-option" key={option} onMouseEnter={mouseEnter} onMouseLeave={this.hidePopover}>
            {this.getOptionName(option)}
            <div
              className={this.leftModuleListItemButtonClass}
              onClick={() => this.onOptionAdd(option)}
              {...getDataTestElementProps(`${SelectableOptionsList.getDataTestElementName(option)}AddButton`)}
            />
          </li>
        );
      });
  }

  getPopOverComponent(title, visible, onClose) {
    if (this.props.withPopOver && this.props.popOverDetails.length) {
      const details = this.props.popOverDetails.find(item => item.find(detail => detail.value === title));

      if (!details) return;

      const {
        x: { left, right },
        y
      } = this.props.popoverCorrection;

      // eslint-disable-next-line consistent-return
      return (
        <Popover
          showAfterDelayOf={500}
          title={''}
          isVisible={visible}
          onClose={onClose}
          openTrigger={POPOVER_OPEN_TRIGGER.MANUAL}
          style={{
            top: this.state.mouseCoordinates.clientY + y,
            left: this.state.hoveredSide === 'left' ? left : right,
            position: 'absolute'
          }}
        >
          <div className={'popover__container'}>
            {details.map(({ name, value }) => (
              <div className="row" key={name}>
                <div className="column">
                  <span>{name}</span>
                </div>
                <div className="column">
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </div>
        </Popover>
      );
    }
  }

  setLeftHoveredSide = () => {
    this.setState(prevState => ({
      ...prevState,
      hoveredSide: 'left'
    }));
  };

  setRightHoveredSide = () => {
    this.setState(prevState => ({
      ...prevState,
      hoveredSide: 'right'
    }));
  };

  get isAddAllButtonDisabled() {
    return classnames({
      disabled: this.areAllOptionsAdded
    });
  }

  get addAllButtonClassNames() {
    return classnames(`head-button-all-container ${this.isAddAllButtonDisabled}`);
  }

  get addAllButtonLabelClassNames() {
    return classnames(`head-button-all-label ${this.isAddAllButtonDisabled}`);
  }

  get addAllButton() {
    return this.props.addAddAllButton ? (
      <div className={this.addAllButtonClassNames}>
        <div
          className={this.leftModuleListItemButtonClass}
          onClick={this.onAllOptionsAdd}
          {...getDataTestElementProps('addAllButton')}
        />
        <div className={this.addAllButtonLabelClassNames}>Add all</div>
      </div>
    ) : null;
  }

  get isRemoveAllButtonDisabled() {
    return classnames({
      disabled: !this.props.optionsAdded.length
    });
  }

  get removeAllButtonClassNames() {
    return classnames(`head-button-all-container ${this.isRemoveAllButtonDisabled}`);
  }

  get removeAllButtonLabelClassNames() {
    return classnames(`head-button-all-label ${this.isRemoveAllButtonDisabled}`);
  }

  get removeAllButton() {
    return this.props.addRemoveAllButton ? (
      <div className={this.removeAllButtonClassNames}>
        <div
          className={this.rightModuleListItemButtonClass}
          onClick={this.onAllOptionsRemove}
          {...getDataTestElementProps('removeAllButton')}
        />
        <div className={this.removeAllButtonLabelClassNames}>Remove all</div>
      </div>
    ) : null;
  }

  get availableOptionsMessage() {
    return this.props.messageForAvailableOptions.length ? (
      <div className="head elements-added-message">
        <div>{this.props.messageForAvailableOptions}</div>
        {this.addAllButton}
      </div>
    ) : null;
  }

  get rightModuleEmptyMessage() {
    return this.props.rightModuleEmptyMessage.length ? (
      <div className="right-module-empty-message">{this.props.rightModuleEmptyMessage}</div>
    ) : null;
  }

  get leftModule() {
    const allOptions = [...this.props.options];
    const addedOptions = [...this.props.optionsAdded];

    const leftTableClassNames = classnames('search-input', {
      'selectable-options-required': this.props.required
    });

    return this.shouldDisplayTable(addedOptions) ? (
      <div className="left-module" onMouseOver={this.setLeftHoveredSide}>
        <div>
          <div className="head search-input">
            <div className={leftTableClassNames}>
              <Input
                className="search-input__input"
                onChange={input => this.onFilterChange(input.target.value)}
                placeholder={this.props.placeholder}
                {...getDataTestElementProps('selectableOptionsListFilterInput')}
                value={this.state.filter}
              />
              <i className="search-input__icon sc-icon-search-ctr" />
            </div>
          </div>
          {this.availableOptionsMessage}
          <ul className="list">{this.leftModuleOptions}</ul>
        </div>
      </div>
    ) : (
      <div className="left-module">
        <div className="empty-files-for-add">
          <b>
            {`${
              allOptions.length === addedOptions.length
                ? `All ${this.props.plural}`
                : `Maximum number of ${this.props.plural}`
            }`}
            <hr />
          </b>
          <div>
            {allOptions.length === addedOptions.length
              ? `All ${this.props.plural} have been added.`
              : `Maximum number of ${this.props.plural} (${addedOptions.length}) have been added.`}
          </div>
        </div>
      </div>
    );
  }

  get popover() {
    return this.getPopOverComponent(
      this.state.option,
      this.state.visiblePopOver !== HIDDEN_POPOVER_INDEX,
      this.hidePopover
    );
  }

  setMouseCoordinates = ({ clientY }) => {
    this.setState(prevState => ({
      ...prevState,
      mouseCoordinates: {
        ...prevState.mouseCoordinates,
        clientY
      }
    }));
  };

  get optionClassName() {
    return classnames('list-option__name', {
      'list-option__name--truncated': this.props.truncateOptionNames
    });
  }

  getOptionName = option => {
    const title = this.props.suffix ? `${option} ${this.props.suffix}` : option;
    const props = this.props.truncateOptionNames
      ? {
          className: this.optionClassName,
          title
        }
      : {
          className: this.optionClassName
        };

    return <div {...props}>{title}</div>;
  };

  get optionsCountMessageForRightModule() {
    const addedOptions = [...this.props.optionsAdded];

    return `${addedOptions.length} ${
      addedOptions.length === 1 ? this.props.countMessage.single : this.props.countMessage.plural
    }`;
  }

  get choosenCountMessageForRightModule() {
    return this.props.messageForSelectedOptions.length
      ? this.props.messageForSelectedOptions
      : this.optionsCountMessageForRightModule;
  }

  get rightModuleOptions() {
    const allOptions = [...this.props.options];

    return [...this.props.optionsAdded]
      .filter(option => allOptions.includes(option))
      .sort(this.props.sortCallback)
      .map((option, index) => {
        const mouseEnter = () => {
          this.setState({
            ...this.state,
            visiblePopOver: index,
            option
          });
        };

        return (
          <li className="list-option" key={option} onMouseEnter={mouseEnter} onMouseLeave={this.hidePopover}>
            {this.getOptionName(option)}
            <span
              className={this.rightModuleListItemButtonClass}
              onClick={() => this.onOptionRemove(option)}
              {...getDataTestElementProps(`${SelectableOptionsList.getDataTestElementName(option)}AddButton`)}
            />
          </li>
        );
      });
  }

  get containerInternalsForRightModule() {
    return this.rightModuleOptions.length ? this.rightModuleOptions : this.rightModuleEmptyMessage;
  }

  get tableLabelClassnamesForRightModule() {
    return classnames('head elements-added-message', {
      required: this.props.requiredOnSelected
    });
  }

  get rightModule() {
    return (
      <div className="right-module" onMouseOver={this.setRightHoveredSide}>
        <div className={this.tableLabelClassnamesForRightModule}>
          {this.choosenCountMessageForRightModule}
          {this.removeAllButton}
        </div>
        <ul className="list">{this.containerInternalsForRightModule}</ul>
      </div>
    );
  }

  get backArrow() {
    return this.props.addBackArrow ? <span className="sc-icon-double-arrow reverse-arrow" /> : null;
  }

  hidePopover = () => {
    this.setState({
      ...this.state,
      visiblePopOver: HIDDEN_POPOVER_INDEX
    });
  };

  shouldDisplayTable = addedOptions => {
    if (this.props.showLeftPanelIfEmpty) {
      return true;
    } else if (addedOptions.length >= this.props.maxLength) {
      return false;
    } else if (addedOptions.length === this.props.options.length) {
      return false;
    }

    return true;
  };

  render() {
    return (
      <div className={this.props.wrapperClassName}>
        <div className="selectable-options-list" onMouseMove={this.setMouseCoordinates}>
          {this.leftModule}
          <div className="center-module">
            <span className="sc-icon-double-arrow" />
            {this.backArrow}
          </div>
          {this.rightModule}
        </div>
        {this.popover}
      </div>
    );
  }
}

SelectableOptionsList.propTypes = {
  countMessage: PropTypes.shape({
    single: PropTypes.string,
    plural: PropTypes.string
  }),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  optionsAdded: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxLength: PropTypes.number,
  plural: PropTypes.string,
  placeholder: PropTypes.string,
  rightModuleEmptyMessage: PropTypes.string,
  leftModuleListItemButtonClass: PropTypes.string,
  rightModuleListItemButtonClass: PropTypes.string,
  messageForAvailableOptions: PropTypes.string,
  messageForSelectedOptions: PropTypes.string,
  wrapperClassName: PropTypes.string,
  required: PropTypes.bool,
  requiredOnSelected: PropTypes.bool,
  onOptionAdd: PropTypes.func.isRequired,
  onOptionRemove: PropTypes.func.isRequired,
  showLeftPanelIfEmpty: PropTypes.bool,
  withPopOver: PropTypes.bool,
  popOverDetails: PropTypes.arrayOf(PropTypes.object),
  popoverCorrection: PropTypes.shape({
    x: PropTypes.shape({
      left: PropTypes.number,
      right: PropTypes.number
    }),
    y: PropTypes.number
  }),
  suffix: PropTypes.string,
  addBackArrow: PropTypes.bool,
  onAllOptionsAdd: PropTypes.func,
  onAllOptionsRemove: PropTypes.func,
  sortCallback: PropTypes.func,
  addAddAllButton: PropTypes.bool,
  addRemoveAllButton: PropTypes.bool,
  truncateOptionNames: PropTypes.bool
};

SelectableOptionsList.defaultProps = {
  countMessage: {
    single: 'Option Added',
    plural: 'Options Added'
  },
  maxLength: Infinity,
  plural: 'Options',
  placeholder: '',
  rightModuleEmptyMessage: '',
  leftModuleListItemButtonClass: 'sc-icon-circle-plus-btn',
  rightModuleListItemButtonClass: 'sc-icon-xmark-ctr',
  messageForAvailableOptions: '',
  messageForSelectedOptions: '',
  wrapperClassName: '',
  required: false,
  requiredOnSelected: false,
  showLeftPanelIfEmpty: false,
  withPopOver: false,
  popOverDetails: [],
  popoverCorrection: {
    x: {
      left: 0,
      right: 0
    },
    y: 0
  },
  suffix: '',
  addBackArrow: false,
  addAddAllButton: false,
  addRemoveAllButton: false,
  onAllOptionsAdd: () => {},
  onAllOptionsRemove: () => {},
  sortCallback: (a, b) => a - b,
  truncateOptionNames: false
};
