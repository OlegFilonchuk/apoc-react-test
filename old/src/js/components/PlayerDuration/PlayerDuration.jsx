import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { durationToSeconds } from '../../utils/timeUtils';
import { isInputInvalid, checkIfInputValueExceeded } from '../../utils/timeInputUtils';
import { TIME_UNITS, TIME_IN_SECONDS } from '../../utils/constants';

import './PlayerDuration.less';

// TODO: Add click event handler to hide duration list when user will click outside of the duration element

class PlayerDuration extends React.Component {
  static getHHMMSSTime(timeInSeconds, isDayInputVisible, isWeekInputVisible) {
    const weeks = Math.floor(timeInSeconds / TIME_IN_SECONDS.SEVEN_DAYS);
    const days =
      isWeekInputVisible && isDayInputVisible
        ? Math.floor((timeInSeconds / TIME_IN_SECONDS.ONE_DAY) % 7)
        : Math.floor(timeInSeconds / TIME_IN_SECONDS.ONE_DAY);
    const hours = isDayInputVisible
      ? Math.floor((timeInSeconds / TIME_IN_SECONDS.ONE_HOUR) % 24)
      : Math.floor(timeInSeconds / TIME_IN_SECONDS.ONE_HOUR);
    const minutes = Math.floor((timeInSeconds / TIME_IN_SECONDS.ONE_MINUTE) % TIME_IN_SECONDS.ONE_MINUTE);
    const seconds = Math.floor(timeInSeconds % TIME_IN_SECONDS.ONE_MINUTE);

    const HMMSTime = {
      hours: hours >= 10 ? String(hours) : `0${hours}`,
      minutes: minutes >= 10 ? String(minutes) : `0${minutes}`,
      seconds: seconds >= 10 ? String(seconds) : `0${seconds}`
    };

    if (isDayInputVisible) {
      HMMSTime.weeks = weeks >= 10 ? String(weeks) : `0${weeks}`;
      HMMSTime.days = days >= 10 ? String(days) : `00${days}`;
    }

    return HMMSTime;
  }

  constructor(props) {
    super(props);

    this.state = {
      isToggleOpen: false,
      ...PlayerDuration.getHHMMSSTime(this.props.duration, this.props.isDayInputVisible, this.props.isWeekInputVisible)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { ...HMMSTime } = PlayerDuration.getHHMMSSTime(
      nextProps.duration,
      this.props.isDayInputVisible,
      this.props.isWeekInputVisible
    );

    if (this.props.duration !== nextProps.duration) {
      this.setState(
        {
          ...HMMSTime
        },
        this.invokeDurationCallback
      );
    }
  }

  onInputChange = e => {
    const unitKey = e.target.dataset.unit;

    this.setState({ [unitKey]: e.target.value }, this.props.onChange);
  };

  onInputLeave = e => {
    const unitKey = e.target.dataset.unit;
    const regex = new RegExp(/^0+(?!\.|$)/);
    const trimmedValue = e.target.value.replace(regex, '');
    const { ...HMMSTime } = this.state;
    const duration = durationToSeconds({ ...HMMSTime });
    const numberValue = Number(trimmedValue);

    if (this.props.hasMaxInputValue) {
      const isInputValueExceeded = checkIfInputValueExceeded(unitKey, numberValue, { ...HMMSTime });

      this.props.onMaxInputValueExceed(isInputValueExceeded);
      if (isInputValueExceeded) {
        this.setState({ [unitKey]: this.getZeroValue(unitKey) });

        return;
      }
    }

    if (numberValue <= 0) {
      this.setState({ [unitKey]: this.getZeroValue(unitKey) });
    } else if (numberValue >= 10) {
      this.setState({ [unitKey]: String(trimmedValue) });
    } else {
      this.setState({ [unitKey]: `0${trimmedValue}` });
    }

    if (this.props.validateOnChange && isInputInvalid(trimmedValue, unitKey)) {
      this.props.onInvalid(duration);

      return;
    }

    this.setState(this.invokeDurationCallback);
  };

  getZeroValue = unitKey => (unitKey === TIME_UNITS.DAYS ? '000' : '00');

  get durationElements() {
    const inputElementInitial = [TIME_UNITS.HOURS, TIME_UNITS.MINUTES, TIME_UNITS.SECONDS];

    if (this.props.isDayInputVisible) {
      inputElementInitial.unshift(TIME_UNITS.DAYS);
    }

    if (this.props.isWeekInputVisible && this.props.isDayInputVisible) {
      inputElementInitial.unshift(TIME_UNITS.WEEKS);
    }

    return inputElementInitial.map((unitKey, index) => {
      const inputClassName = classNames('duration__input', unitKey, {
        'duration__input--error': !this.isInputValid(unitKey)
      });
      const extendedMaxLength = unitKey === TIME_UNITS.DAYS ? 3 : 2;
      const colonWrapper =
        unitKey === TIME_UNITS.SECONDS ? null : (
          <span key={`span-${unitKey}`} className="duration__input__colon">
            :
          </span>
        );

      return (
        <div className="duration__wrapper--element" key={index}>
          <input
            type="number"
            key={unitKey}
            maxLength={extendedMaxLength}
            onBlur={this.onElementBlur}
            onChange={this.onElementChange}
            value={this.state[unitKey]}
            data-unit={unitKey}
            className={inputClassName}
          />
          {colonWrapper}
        </div>
      );
    });
  }

  get onElementBlur() {
    return this.props.disabled ? null : this.onInputLeave;
  }

  get onElementChange() {
    return this.props.disabled ? null : this.onInputChange;
  }

  getDurationListElements() {
    return this.props.intervals.map((interval, index) => {
      const { weeks, days, hours, minutes, seconds } = PlayerDuration.getHHMMSSTime(
        interval,
        this.props.isDayInputVisible,
        this.props.isWeekInputVisible
      );
      const colonWrapper = <span className="duration__colon">:</span>;
      const daysDurationLabel = days ? (
        <span className="duration__link--extended">
          {days}
          {colonWrapper}
        </span>
      ) : null;
      const weeksDurationLabel =
        days && weeks ? (
          <span className="duration__link--extended">
            {weeks}
            {colonWrapper}
          </span>
        ) : null;

      return (
        /* eslint react/no-array-index-key: 0 */
        <li key={index} className="duration__item">
          <a
            onClick={() => {
              this.selectDropdownValue(interval);
            }}
            className="duration__link"
          >
            {daysDurationLabel}
            {weeksDurationLabel}
            {hours}
            {colonWrapper}
            {minutes}
            {colonWrapper}
            {seconds}
          </a>
        </li>
      );
    });
  }

  get toggleDurationItem() {
    const toggleClass = classNames('duration__toggle', {
      'duration__toggle--active': this.state.isToggleOpen
    });

    if (this.props.isToggleDurationVisible) {
      return (
        <a onClick={this.toggleChange} className={toggleClass}>
          <span className="duration__arrow" />
        </a>
      );
    }

    return null;
  }

  get finalClassName() {
    return classNames('duration', this.props.className);
  }

  get durationWrapperClass() {
    return classNames('duration__wrapper', {
      day__extended: this.props.isDayInputVisible,
      week__extended: this.props.isWeekInputVisible
    });
  }

  get listClass() {
    const { isDayInputVisible, isWeekInputVisible, isToggleDurationVisible } = this.props;

    return classNames('duration__list', {
      'duration__toggle--hidden': !this.state.isToggleOpen,
      duration__extended: (isDayInputVisible || isWeekInputVisible) && isToggleDurationVisible
    });
  }

  isInputValid = unitKey => {
    const { ...HMMSTime } = this.state;
    const duration = durationToSeconds({ ...HMMSTime });

    const isInputValid = !isInputInvalid(this.state[unitKey], unitKey);
    const isDurationWithinRange = duration >= this.props.minDuration && duration <= this.props.maxDuration;

    if (this.props.isDayInputVisible || this.props.isDayInputVisible) {
      return isInputValid && isDurationWithinRange;
    }

    return isInputValid;
  };

  selectDropdownValue = interval => {
    const { ...HMMSTime } = PlayerDuration.getHHMMSSTime(
      interval,
      this.props.isDayInputVisible,
      this.props.isWeekInputVisible
    );
    const newState = {
      ...HMMSTime,
      isToggleOpen: false
    };

    this.setState(newState, this.invokeDurationCallback);
  };

  invokeDurationCallback() {
    const { ...HMMSTime } = this.state;
    const duration = durationToSeconds({ ...HMMSTime });

    const isValid = duration >= this.props.minDuration && duration <= this.props.maxDuration;

    return isValid ? this.props.onValid(duration) : this.props.onInvalid(duration);
  }

  toggleChange = () => {
    this.setState({ isToggleOpen: !this.state.isToggleOpen });
  };

  render() {
    const durationListElements = this.getDurationListElements();

    return (
      <div className={this.finalClassName}>
        <div className={this.durationWrapperClass}>
          {this.durationElements}
          {this.toggleDurationItem}
        </div>
        <ul className={this.listClass}>{durationListElements}</ul>
      </div>
    );
  }
}

PlayerDuration.propTypes = {
  /**
   * Current duration (in seconds)
   */
  duration: PropTypes.number.isRequired,

  /**
   * Minimum duration value (in seconds)
   */
  minDuration: PropTypes.number,

  /**
   * Maximum duration value (in seconds)
   */
  maxDuration: PropTypes.number,

  /**
   * Function that triggers on valid duration change
   */
  onValid: PropTypes.func,

  /**
   * Function that triggers on invalid duration change
   */
  onInvalid: PropTypes.func,

  /**
   * Is element editable
   */
  disabled: PropTypes.bool,

  /**
   * Array of duration intervals (in seconds)
   */
  intervals: PropTypes.arrayOf(PropTypes.number),

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Show / Hide Toggle Duration Button
   */
  isToggleDurationVisible: PropTypes.bool,

  /**
   * Is day input visible
   */
  isDayInputVisible: PropTypes.bool,

  /**
   * Is week input visible
   */
  isWeekInputVisible: PropTypes.bool,

  /**
   * Invoke when input value changed
   */
  onChange: PropTypes.func,

  /**
   * Validate input values on blur
   */
  validateOnChange: PropTypes.bool,

  /**
   * Function that triggers on exceeding max input value
   */
  onMaxInputValueExceed: PropTypes.func,

  /**
   * Sets max input value for each time field
   */
  hasMaxInputValue: PropTypes.bool
};

PlayerDuration.defaultProps = {
  duration: 0,
  minDuration: 0,
  maxDuration: TIME_IN_SECONDS.YEAR,
  disabled: false,
  intervals: [],
  className: '',
  isToggleDurationVisible: true,
  isDayInputVisible: false,
  isWeekInputVisible: false,
  validateOnChange: true,
  hasMaxInputValue: false,
  onChange: () => true,
  onValid: () => true,
  onInvalid: () => true,
  onMaxInputValueExceed: () => true
};

export default PlayerDuration;
