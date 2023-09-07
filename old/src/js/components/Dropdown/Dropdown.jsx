import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import './Dropdown.less';
import DropdownOptionLink from './DropdownOptionLink';
import DropdownOption from './DropdownOption';

const keyCodeToIndexModifier = {
  13: 0, // key enter
  38: -1, // key arrow up
  40: 1 // key arrow down
};

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentOption: {},
      useButtonText: true,
      search: ''
    };

    const children = React.Children.toArray(this.props.children);

    if (children) {
      this.setSelectedOption(children);
    }

    this.closeOnOutsideClick = this.closeOnOutsideClick.bind(this);
  }

  componentWillMount() {
    window.document.addEventListener('click', this.closeOnOutsideClick);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.children || nextProps.children.length === 0) {
      return;
    }

    const selectedOption = nextProps.children.find(option => option.props.selected);
    const defaultSelectedOption = nextProps.children[0];
    const useButtonText = !selectedOption && nextProps.recomputeUseButton ? true : this.state.useButtonText;

    this.setState(prevState => ({
      ...prevState,
      currentOption: (selectedOption || defaultSelectedOption).props,
      useButtonText
    }));
  }

  componentWillUnmount() {
    window.document.removeEventListener('click', this.closeOnOutsideClick);
  }

  onChange = () => {
    if (this.props.button.props.inputType === 'input' && !this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  };

  getOptions() {
    const filtered = this.props.filterable ? this.dropdownOptions : this.props.children;

    return React.Children.map(filtered, child => React.cloneElement(child, this.getChildProps(child)));
  }

  get anyOptionSelected() {
    return Array.isArray(this.props.children) && this.props.children.some(child => child.props.selected);
  }

  get shouldUseTextOnButton() {
    return (
      !this.anyOptionSelected &&
      ((this.state.useButtonText && this.props.button.props.children) || this.optionType !== DropdownOption)
    );
  }

  get buttonText() {
    if (this.shouldUseTextOnButton) {
      return this.props.button.props.children;
    }

    return this.state.currentOption.label;
  }

  getButton() {
    return React.cloneElement(this.props.button, {
      onClick: (...args) => {
        if (this.props.button.props.onClick) {
          this.props.button.props.onClick(...args);
        }

        this.toggle(...args);
      },
      onKeyDown: (...args) => {
        if (this.props.button.props.onKeyDown) {
          this.props.button.props.onKeyDown(...args);
        }
        this.changeCurrentOptionOnKeyPressed(...args);
      },
      onChange: (...args) => {
        if (this.props.button.props.onChange) {
          this.props.button.props.onChange(...args);
        }
        this.onChange(...args);
      },
      isExpanded: this.state.isOpen,
      children: this.props.button.props.inputType === 'searchDropdown' ? undefined : this.buttonText
    });
  }

  /**
   * @param currentOption {DropdownOptionProps}
   */
  setCurrentOption(currentOption) {
    if (currentOption) {
      this.setState(prevState => ({ ...prevState, currentOption, useButtonText: false }));
    }
  }

  setSelectedOption(children) {
    if (!children[0]) {
      return;
    }

    this.optionType = children[0].type;
    if (this.optionType === DropdownOption) {
      const selectedOption = children.find(option => option.props.selected);

      this.state.currentOption = selectedOption ? selectedOption.props : children[0].props;
      this.state.useButtonText = !selectedOption;
    }
  }

  get filteredList() {
    const search = this.state.search.toLowerCase();

    return this.props.children.filter(
      item => typeof item.props.label !== 'string' || item.props.label.toLowerCase().includes(search)
    );
  }

  get dropdownOptions() {
    const result = this.filteredList;

    return result.length === 0 ? [<DropdownOption value="empty" label={this.props.emptyMessage} disabled />] : result;
  }

  get suffix() {
    const {
      withSuffix: { suffixWrapperClassName, suffix }
    } = this.props;

    return suffix ? <div className={suffixWrapperClassName}>{suffix}</div> : null;
  }

  getChildProps(child) {
    if (this.optionType === DropdownOptionLink) {
      return {
        onClick: (...args) => {
          if (child.props.onClick) {
            child.props.onClick(...args);
          }
          if (child.type === this.optionType && !child.props.disabled) {
            this.close();
          }
        }
      };
    }

    // DropdownOption
    return {
      onClick: (...args) => {
        if (child.props.onClick) {
          child.props.onClick(...args);
        }
        this.setState(prevState => ({ ...prevState, search: '' }));
        this.close();

        if (!isUndefined(child.props.value)) {
          this.setCurrentOption(child.props);
          this.props.onChange(child.props);
        }
      },
      selected: this.state.currentOption.value === child.props.value,
      name: this.props.name
    };
  }

  changeCurrentOptionOnKeyPressed(e) {
    if (!this.state.isOpen || !this.props.useSubmitOnEnter) {
      return;
    }

    const indexModifier = keyCodeToIndexModifier[e.keyCode];

    if (indexModifier === undefined) {
      return;
    }
    e.preventDefault();

    /**
     * @type {DropdownOptionProps[]}
     */
    const options = React.Children.map(this.props.children, child => child.props) || [];
    const optionProps = options.filter(childProps => !childProps.disabled);
    const currentIndex = optionProps.findIndex(option => option.value === this.state.currentOption.value);
    const newIndex = Math.min(Math.max(currentIndex + indexModifier, 0), optionProps.length - 1);

    this.setCurrentOption(optionProps[newIndex]);
    this.submitOnEnterPress(e);
  }

  closeOnOutsideClick(e) {
    if (!this.state.isOpen) {
      return;
    }

    if (this.root === e.target || !this.root.contains(e.target)) {
      this.close();
    }
  }

  submitOnEnterPress = event => {
    if (
      this.props.useSubmitOnEnter &&
      event.key === 'Enter' &&
      React.Children.toArray(this.props.children).length > 0
    ) {
      this.props.onChange(this.state.currentOption);
      this.close();
    }
  };

  toggle(e, isOpen) {
    const toggleState = isOpen !== undefined ? isOpen : !this.state.isOpen;

    this.setState(prevState => ({ ...prevState, isOpen: toggleState, search: '' }));
  }

  close() {
    this.setState(prevState => ({ ...prevState, isOpen: false }));
  }

  handleSearchInput = e => {
    const search = e.target.value;

    this.setState(prevState => ({ ...prevState, search }));
  };

  render() {
    const {
      className,
      fullWidth,
      filterable,
      button: {
        props: { id }
      }
    } = this.props;

    const mainDivClassName = classNames(
      'sc-dropdown',
      {
        'sc-open': this.state.isOpen,
        'sc-dropdown--fullwidth': fullWidth
      },
      className
    );

    return (
      /* eslint-disable no-return-assign */
      <div className={mainDivClassName} ref={ref => (this.root = ref)}>
        {this.getButton()}
        <ul className="sc-dropdown-menus" aria-labelledby={id}>
          {filterable ? (
            <div className="dropdown-filter">
              <input className="dropdown-filter__input" value={this.state.search} onChange={this.handleSearchInput} />
              <i className="sc-icon-magnifier dropdown-filter__icon" />
            </div>
          ) : null}
          {this.getOptions()}
        </ul>
        {this.suffix}
      </div>
      /* eslint-enable no-return-assign */
    );
  }
}

Dropdown.propTypes = {
  /**
   * Called only when [DropdownOption](#dropdownoption) are used. First argument are props of selected
   * [DropdownOption](#dropdownoption).
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Button to toggle the dropdown. Should be instance of [DropdownButton](#dropdownbutton) or any other component
   * that shares same props API.
   */
  button: PropTypes.element.isRequired,

  /**
   * Necessary only when [DropdownOption](#dropdownoption) is used. Sets a name every option's `input`.
   */
  name: (props, ...args) => {
    const stringError = PropTypes.string(props, ...args);

    if (stringError) {
      return stringError;
    }

    if (!props.children) {
      return null;
    }

    if (!props.name) {
      const children = React.Children.toArray(props.children);
      const optionType = children[0].type;

      if (optionType === DropdownOption) {
        return new Error('Prop `name` cannot be empty if options are of <DropdownOption> type');
      }
    }

    return null;
  },

  /**
   * Css classes of container.
   */
  className: PropTypes.string,

  /**
   * Render the dropdown full width
   */
  fullWidth: PropTypes.bool,

  /**
   * Enable/disable submit on enter press
   */
  useSubmitOnEnter: PropTypes.bool,

  /**
   * Allows to filter [DropdownOption](#dropdownoption) options using given phrase
   */
  filterable: PropTypes.bool,

  /**
   * Content of empty filter results message
   */
  emptyMessage: PropTypes.string,

  /**
   * Defines options of dropdown. Only [DropdownOption](#dropdownoption) or [DropdownOptionLink](#dropdownoptionlink)
   * can be used. [DropdownOption](#dropdownoption) non-strings labels are always visible while filtering.
   */
  children: props => {
    if (!props.children) {
      return null;
    }

    const children = React.Children.toArray(props.children);
    const optionType = children[0].type;
    const hasFirstChildCorrectType = optionType === DropdownOptionLink || optionType === DropdownOption;

    if (!hasFirstChildCorrectType) {
      return new Error(`
        All <Dropdown/> children must be instances of either one <DropdownOptionLink/> or <DropdownOption/>
    `);
    }

    if (optionType === DropdownOption) {
      const uniqueValueProps = children
        .map(child => child.props.value)
        .filter((childValue, i, childrenValues) => childrenValues.indexOf(childValue) === i);

      if (uniqueValueProps.length !== children.length) {
        return new Error('<DropdownOption>s do not have unique values');
      }
    }

    if (props.filterable && optionType === DropdownOption) {
      if (children.some(child => !!child.props.label.type)) {
        return new Error('<DropdownOption>s non-strings labels are always visible while filtering');
      }
    }

    return children.reduce(error => {
      if (error) {
        return error;
      }

      return null;
    }, null);
  },

  /**
   * Allows to set up suffix near dropdown
   */
  withSuffix: PropTypes.shape({
    suffix: PropTypes.string,
    suffixWrapperClassName: PropTypes.string
  }),

  /**
   * Indicate to recompute `useButtonText` value once props will change or maintain internal value only
   */
  recomputeUseButton: PropTypes.bool
};

Dropdown.defaultProps = {
  name: '',
  className: '',
  filterable: false,
  recomputeUseButton: false,
  emptyMessage: 'No Filtered Data',
  children: [],
  fullWidth: false,
  withSuffix: {},
  useSubmitOnEnter: false
};
