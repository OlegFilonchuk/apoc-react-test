import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Checkbox.less';
import { getDataTestElementProps, dataTestElementPropTypes } from '../../utils/dataTestElementPropUtils';

export const labelPositions = {
  left: 'left',
  right: 'right'
};

let globalCheckboxIndex = 0;

/**
 * Checkbox Component
 */
export default class Checkbox extends React.Component {
  componentWillMount() {
    globalCheckboxIndex += 1;
    this.id = `checkbox-gid-${globalCheckboxIndex}`;
  }

  render() {
    const {
      label,
      labelPosition,
      fullWidth,
      disabled,
      name,
      isOnlyCheckboxClickable,
      showHint,
      className,
      tooltip,
      ...props
    } = this.props;

    const id = name || this.id;

    const classes = classNames('square-checkbox', className, {
      'square-checkbox--clickable': !isOnlyCheckboxClickable,
      'square-checkbox-full-width': fullWidth,
      'square-checkbox-disabled': disabled
    });

    const labelTitle = showHint ? tooltip : null;

    const squareElement = (
      <label className="square-checkbox-square">
        <input
          type="checkbox"
          {...props}
          id={id}
          name={name}
          disabled={disabled}
          ref={ref => {
            this.input = ref;
          }}
          {...getDataTestElementProps(this.props)}
        />
        <span />
      </label>
    );

    const forElementId = !isOnlyCheckboxClickable ? id : '';
    const labelClasses = classNames('square-checkbox__label', {
      'square-checkbox__label--clickable': !isOnlyCheckboxClickable
    });
    const labelElement = (
      <label htmlFor={forElementId} className={labelClasses} title={labelTitle}>
        {label}
      </label>
    );

    const isLabelLeftPosition = labelPosition === labelPositions.left;
    const [firstItem, secondItem] = isLabelLeftPosition ? [labelElement, squareElement] : [squareElement, labelElement];

    return (
      <div className={classes}>
        {firstItem}
        {secondItem}
      </div>
    );
  }
}

Checkbox.propTypes = {
  /**
   * An additional class name that can be added to checkbox label for
   * extending it's functionality
   */
  className: PropTypes.string,

  /**
   * If set to yes label and checkbox fits the opposite edges of its container,
   * otherwise are positioned like two inline elements next to each other
   */
  fullWidth: PropTypes.bool,

  /**
   * Determines whether label should be positioned left from checkbox or right
   */
  labelPosition: PropTypes.oneOf([labelPositions.left, labelPositions.right]),

  /**
   * A flag to show title hint on hover
   */
  showHint: PropTypes.bool,

  /**
   * Label text or element.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,

  /**
   * This value will be shown as a hint on mouse over
   */
  tooltip: PropTypes.string,

  /**
   * Whether checkbox is disabled or not
   */
  disabled: PropTypes.bool,

  /**
   * It's passed to `input` element. Used also to create an `id` attribute of input
   * and `for` of label in order to connect those two.
   */
  name: PropTypes.string,

  /**
   * If is set to true label will not be clickable
   */
  isOnlyCheckboxClickable: PropTypes.bool,

  /**
   * Is the checkbox checked
   */
  checked: PropTypes.bool,
  ...dataTestElementPropTypes
};

Checkbox.defaultProps = {
  className: '',
  tooltip: '',
  name: '',
  disabled: false,
  fullWidth: false,
  showHint: false,
  isOnlyCheckboxClickable: false,
  labelPosition: labelPositions.right,
  checked: false
};
