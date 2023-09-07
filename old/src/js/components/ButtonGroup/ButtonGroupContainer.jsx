import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from '../ButtonGroup/ButtonGroup';
import numberInRange from '../../utils/validation/numberInRange';
/**
 * Button Group component
 */
class ButtonGroupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.selectedIndex
    };

    this.onChildSelected = this.onChildSelected.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex
      });
    }
  }

  onChildSelected(child, index) {
    this.setState({ selectedIndex: index });
    this.onChange(child.props.value);
  }

  onChange(value) {
    this.props.onChange(value);
  }

  get selectedIndex() {
    return this.props.useOnlyPropsSelectedIndex ? this.props.selectedIndex : this.state.selectedIndex;
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child, index) => {
      const isSelected = index === this.selectedIndex;

      return React.cloneElement(child, {
        isSelected,
        className: 'sc-btn-primary-outline',
        onClick: (...args) => {
          if (child.props.onClick) {
            child.props.onClick(...args);
          }
          this.onChildSelected(child, index, ...args);
        }
      });
    });

    return <ButtonGroup className={this.props.className}>{childrenWithProps}</ButtonGroup>;
  }
}

ButtonGroupContainer.propTypes = {
  /**
   * It will be called when one of the options is clicked
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Children `<Button/>` elements
   */
  children: PropTypes.node.isRequired,

  /**
   * Index of selected Button. By default nothing is selected (-1).
   * Should be between -1 and number of children.
   */
  selectedIndex: function selectedIndex(props, propName, componentName) {
    const min = -1;
    const max = props.children.length - 1;
    const numberInRangeValidation = numberInRange(min, max);

    return numberInRangeValidation(props, propName, componentName);
  },

  /**
   * Component class name
   */
  className: PropTypes.string,

  /**
   * If set to true - only selectedIndex provided by props will be used
   */
  useOnlyPropsSelectedIndex: PropTypes.bool
};

ButtonGroupContainer.defaultProps = {
  selectedIndex: -1,
  className: '',
  useOnlyPropsSelectedIndex: false
};

export default ButtonGroupContainer;
