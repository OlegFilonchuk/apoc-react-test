import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

import { KEY_CODES } from '../../utils/constants';

import './VolumeLabel.less';

const BPS_SYMBOLS = { B: 'bps', kB: 'Kbps', MB: 'Mbps', GB: 'Gbps', TB: 'Tbps' };
const UNITS = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbp'];
const MULTIPLIER_VALUE = 1000;

export default class VolumeLabel extends React.Component {
  static convertBps(bps) {
    if (isNaN(bps)) {
      throw new Error(`Expected number to passed, instead got ${bps}`);
    }
    const converted = filesize(bps, { symbols: BPS_SYMBOLS, output: 'object', base: 10, round: 2 });

    return {
      number: converted.value.toFixed(2),
      unit: converted.symbol
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      value: this.props.value,
      inputValue: ''
    };

    this.editValue = this.editValue.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.valueChanged = this.valueChanged.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  onBlur(e) {
    const value = this.getValue(e.target.dataset.unit);

    this.setState({ edit: false, value, inputValue: '' }, this.props.onValueChanged.bind(null, value));
  }

  getValue(unit) {
    const exponent = UNITS.indexOf(unit);

    /* eslint no-restricted-properties: 0 */
    const multiplier = Math.pow(MULTIPLIER_VALUE, exponent);
    const newValue = Number(this.state.inputValue) * multiplier;

    if (isNaN(newValue)) {
      return this.state.value;
    }
    if (this.props.max && this.props.max < newValue) {
      return this.props.max;
    }
    if (this.props.min > newValue) {
      return this.props.min;
    }

    return newValue;
  }

  /* eslint-disable jsx-a11y/no-autofocus */
  getContentWrapper() {
    const { number, unit } = VolumeLabel.convertBps(this.state.value);

    if (this.state.edit) {
      if (this.props.showUnitsOnEdit) {
        return (
          <div className="show-units">
            <input
              type="text"
              value={this.state.inputValue}
              onBlur={this.onBlur}
              onChange={this.valueChanged}
              onKeyPress={this.keyPressed}
              data-unit={unit}
              className="slider-label__number"
              autoFocus
            />
            <span>{unit}</span>
          </div>
        );
      }

      return (
        <input
          type="text"
          value={this.state.inputValue}
          onBlur={this.onBlur}
          onChange={this.valueChanged}
          onKeyPress={this.keyPressed}
          data-unit={unit}
          className="slider-label__number"
          autoFocus
        />
      );
    }

    return (
      <div>
        <span onClick={this.editValue} className="slider-label__number">
          {number}
        </span>
        &nbsp;{unit}
      </div>
    );
  }
  /* eslint-enable jsx-a11y/no-autofocus */

  editValue() {
    const { number } = VolumeLabel.convertBps(this.state.value);

    this.setState({ edit: true, inputValue: number });
  }

  valueChanged(e) {
    const inputValue = e.target.value;

    if (isNaN(inputValue)) {
      return;
    }

    this.setState({ inputValue });
  }

  keyPressed(e) {
    const key = e.keyCode || e.which;

    if (key === KEY_CODES.ENTER) {
      this.onBlur(e);
    }
  }

  render() {
    const contentWrapper = this.getContentWrapper();

    return <div className="slider-label">{contentWrapper}</div>;
  }
}

VolumeLabel.propTypes = {
  /**
   * Current volume value
   */
  value: PropTypes.number.isRequired,

  /**
   * Maximum volume value
   */
  max: PropTypes.number.isRequired,

  /**
   * Minimum volume value
   */
  min: PropTypes.number,

  /**
   * Function that triggers on input leave
   */
  onValueChanged: PropTypes.func,

  /**
   * Flag for showing units while inputing new value
   */
  showUnitsOnEdit: PropTypes.bool
};

VolumeLabel.defaultProps = {
  min: 0,
  onValueChanged: () => true,
  showUnitsOnEdit: false
};
