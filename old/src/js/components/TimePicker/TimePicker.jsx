import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import DropdownOption from '../Dropdown/DropdownOption';
import DropdownButton from '../Dropdown/DropdownButton';
import { DAYTIME } from '../../utils/constants';
import { parseTime } from './helpers';

import './TimePicker.less';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeValue: props.timeValue,
      pmSelected: props.pmSelected,
      parsedTime: {
        hours: parseTime(props.timeValue).timeValue.hours,
        minutes: parseTime(props.timeValue).timeValue.minutes
      },
      error: false
    };
  }
  componentDidUpdate = prevProps => {
    if (prevProps.timeValue !== this.props.timeValue || prevProps.pmSelected !== this.props.pmSelected) {
      this.setState({
        timeValue: this.props.timeValue,
        pmSelected: this.props.pmSelected,
        parsedTime: {
          hours: parseTime(this.props.timeValue).timeValue.hours,
          minutes: parseTime(this.props.timeValue).timeValue.minutes
        }
      });
    }
  };

  get timePickerClassName() {
    return classNames('time-picker', this.props.className);
  }

  get errorMessage() {
    return this.state.error ? <div className="sc-error">Invalid time</div> : null;
  }

  get dropdown() {
    return (
      <Dropdown name="ampm" onChange={this.handleAMPMDropdownChange} button={<DropdownButton>AM</DropdownButton>}>
        <DropdownOption value={DAYTIME.AM} label={DAYTIME.AM} selected={!this.state.pmSelected} />
        <DropdownOption value={DAYTIME.PM} label={DAYTIME.PM} selected={this.state.pmSelected} />
      </Dropdown>
    );
  }

  handleTimeInputChange = e => {
    const value = e.target.value;
    const {
      timeValue: { hours, minutes },
      error
    } = parseTime(value);

    this.setState(
      {
        timeValue: value,
        parsedTime: {
          hours,
          minutes
        },
        error
      },
      () => {
        const { timeValue, parsedTime, pmSelected } = this.state;

        return this.props.onChange(timeValue, parsedTime, error, pmSelected);
      }
    );
  };

  handleAMPMDropdownChange = ({ value }) => {
    this.setState(
      {
        pmSelected: value === 'PM'
      },
      () => {
        const { timeValue, parsedTime, error, pmSelected } = this.state;

        return this.props.onChange(timeValue, parsedTime, error, pmSelected);
      }
    );
  };

  render() {
    return (
      <div className={classNames(this.timePickerClass, this.props.className)}>
        <div className="row">
          <div className="col-6">
            <Input value={this.state.timeValue} onChange={this.handleTimeInputChange} />
          </div>
          <div className="col-3">{this.dropdown}</div>
        </div>
        {this.errorMessage}
      </div>
    );
  }
}

TimePicker.propTypes = {
  /**
   * custom class
   */
  className: PropTypes.string,
  /**
   * Value of the time input
   */
  timeValue: PropTypes.string,
  /**
   * Daytime. If PM `pmSelected: true` if AM `pmSelected: false`
   */
  pmSelected: PropTypes.bool,
  /**
   * Function invoked every time the input changes.
   *
   * Function takes one argument that is an object containing the
   * timeValue and pmSelected fields changed inside TimePicker
   */
  onChange: PropTypes.func.isRequired
};

TimePicker.defaultProps = {
  className: '',
  timeValue: '10:00',
  pmSelected: false
};

export default TimePicker;
