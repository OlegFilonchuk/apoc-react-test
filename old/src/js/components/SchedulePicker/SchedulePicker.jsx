import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { distanceInWords, differenceInMinutes } from 'date-fns';

import Fieldset from '../Fieldset/Fieldset';
import Label from '../Label/Label';
import Button from '../Button/Button';
import ButtonGroupContainer from '../ButtonGroup/ButtonGroupContainer';
import TimePicker from '../TimePicker/TimePicker';
import ToggleButton from '../ToggleButton/ToggleButton';
import Multiselect from '../Multiselect/Multiselect';
import Checkbox, { labelPositions } from '../Checkbox/Checkbox';
import Dropdown from '../Dropdown/Dropdown';
import DropdownButton from '../Dropdown/DropdownButton';
import DropdownOption from '../Dropdown/DropdownOption';
import Input from '../Input/Input';
import { DAYTIME } from '../../utils/constants';

import './SchedulePicker.less';

class SchedulePicker extends Component {
  static DAILY = 'daily';
  static WEEKLY = 'weekly';
  static MONTHLY = 'monthly';
  static DAYS = {
    Mon: 'monday',
    Tue: 'tuesday',
    Wed: 'wednesday',
    Thu: 'thursday',
    Fri: 'friday',
    Sat: 'saturday',
    Sun: 'sunday'
  };
  static MONTHLY_ON_OPTIONS = ['day', 'first', 'second', 'third', 'fourth', 'last'];
  static MONTHLY_ON_OPTION_VALUE = [
    'day',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];
  static DROPDOWN_DAY_BUTTON = (<DropdownButton>Day</DropdownButton>);
  static PERIOD_ARRAY = [SchedulePicker.DAILY, SchedulePicker.WEEKLY, SchedulePicker.MONTHLY];
  static FALSY_RETURN = {};
  static CHECK_FOR_MODIFICATION_TIME = 60000;

  constructor(props) {
    super(props);
    this.state = {
      ui: {
        isModifiedByYou: false,
        lastModifiedByYou: `${new Date()}`,
        desc: '',
        modifiedTimeDiff: '0',
        feedback: {
          ...this.feedbackStates(props, props.schedule.period)
        }
      }
    };
  }
  componentDidMount = () => {
    if (this.props.trackModificationTime) {
      this.modificationInterval = setInterval(() => {
        this.setState(prevState => ({
          ui: {
            ...prevState.ui,
            modifiedTimeDiff: differenceInMinutes(new Date(), new Date(prevState.ui.lastModifiedByYou))
          }
        }));
      }, SchedulePicker.CHECK_FOR_MODIFICATION_TIME);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.feedback !== this.state.feedback) {
      this.setState(previousState => ({
        ui: {
          ...previousState.ui,
          lastModifiedByYou: `${new Date()}`,
          isModifiedByYou: true
        }
      }));
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.modificationInterval);
  };

  get duplicateWarning() {
    return this.props.isDuplicated ? (
      <div className="sc-alert sc-alert-error sc-animate duplicate" role="alert">
        <p className="sc-alert__label">
          <span className="sc-icon-triangle-warning" />
          Duplicate: Please change settings.
        </p>
      </div>
    ) : null;
  }
  get config() {
    return {
      ...SchedulePicker.defaultProps.schedule,
      ...this.props.schedule
    };
  }
  get removeScheduleButton() {
    return (
      <div className="del-schedule__wrapper">
        <span
          key="del-schedule-button"
          onClick={this.handleRemoveSchedule}
          className="del-schedule sc-icon-xmark circle"
        />
      </div>
    );
  }

  get schedulePickerClassName() {
    return classNames('schedule-picker', this.props.className);
  }

  get body() {
    return (
      <div>
        <div className="schedule-period-row">{this.schedulePeriodRow} </div>
        <div className="schedule-period-config-row">{this.schedulePeriodConfigRow}</div>
        {this.hintRow}
      </div>
    );
  }

  get schedulePeriodRow() {
    const selectedIndex = SchedulePicker.PERIOD_ARRAY.findIndex(element => element === this.config.period);

    return (
      <ButtonGroupContainer onChange={this.handleSchedulePeriodRowChange} selectedIndex={selectedIndex}>
        <Button onClick={this.dummyHandler} value={SchedulePicker.DAILY}>
          Daily
        </Button>
        <Button onClick={this.dummyHandler} value={SchedulePicker.WEEKLY}>
          Weekly
        </Button>
        <Button onClick={this.dummyHandler} value={SchedulePicker.MONTHLY}>
          Monthly
        </Button>
      </ButtonGroupContainer>
    );
  }

  get schedulePeriodConfigRow() {
    switch (this.config.period) {
      case SchedulePicker.DAILY: {
        return <div className={SchedulePicker.DAILY}>{this.startStopTimeRow}</div>;
      }
      case SchedulePicker.WEEKLY: {
        return (
          <div className={SchedulePicker.WEEKLY}>
            <Fieldset>
              <Label>Days Allowed</Label>
              <div className="multiselect-wrapper">
                <Multiselect
                  onChange={this.handleWeekDaysMultiselectChange}
                  noVerticalLines
                  fullWidth={false}
                  labelPosition={labelPositions.right}
                >
                  {this.daysOptions.map(({ abbreviatedDayName, dayName, dayNameWithId }) => (
                    <Checkbox
                      label={abbreviatedDayName}
                      onChange={this.handleCheckBoxChange}
                      key={dayNameWithId}
                      checked={this.config.days.some(element => element === dayName)}
                    />
                  ))}
                </Multiselect>
              </div>
            </Fieldset>
            {this.startStopTimeRow}
          </div>
        );
      }
      case SchedulePicker.MONTHLY: {
        return (
          <div className={SchedulePicker.MONTHLY}>
            <Fieldset className="monthly__fieldset">
              <Label>On</Label>
              <div className="row monthly__on">
                <div className="col-3">
                  <Dropdown
                    name="day-on"
                    onChange={this.handleMonthlyOnChange}
                    button={SchedulePicker.DROPDOWN_DAY_BUTTON}
                    className="monthly-on__dropdown-button"
                  >
                    {SchedulePicker.MONTHLY_ON_OPTIONS.map(option => (
                      <DropdownOption
                        key={option}
                        value={option}
                        label={this.firstLetterCapital(option)}
                        selected={this.config.on === option}
                      />
                    ))}
                  </Dropdown>
                </div>
                {this.config.on === SchedulePicker.defaultProps.schedule.on ? (
                  <div className="col-6">
                    <Input value={this.config.dayNumber} onChange={this.handleMonthlyDayOccurrenceChange} />
                  </div>
                ) : (
                  <div className="col-3">
                    <Dropdown
                      name="on-every"
                      onChange={this.handleMonthlyPeriodicOccurrenceChange}
                      button={SchedulePicker.DROPDOWN_DAY_BUTTON}
                      className="monthly-on__dropdown-button"
                    >
                      {SchedulePicker.MONTHLY_ON_OPTION_VALUE.map(option => (
                        <DropdownOption
                          key={option}
                          value={option}
                          label={this.firstLetterCapital(option)}
                          selected={this.config.occurrence === option}
                        />
                      ))}
                    </Dropdown>
                  </div>
                )}
              </div>
            </Fieldset>
            {this.startStopTimeRow}
          </div>
        );
      }
      default:
        return <p>Some problem occured!</p>;
    }
  }

  get daysOptions() {
    return Object.entries(SchedulePicker.DAYS).map(([abbreviatedDayName, dayName]) => ({
      abbreviatedDayName,
      dayName,
      dayNameWithId: `${this.config.id}|${dayName}`
    }));
  }

  get startStopTimeRow() {
    return (
      <div>
        <Fieldset>
          <Label>StartTime</Label>
          {this.startTime}
        </Fieldset>
        <Fieldset className="force-stop">
          <Label>Force Stop</Label>
          {this.forceStopTime}
          {this.stopTime}
        </Fieldset>
      </div>
    );
  }

  get startTime() {
    const {
      startTime: { timeValue, pmSelected }
    } = this.config;

    return <TimePicker timeValue={timeValue} pmSelected={pmSelected} onChange={this.handleStartTimeChange} />;
  }

  get forceStopTime() {
    return (
      <ToggleButton
        toggleSize="xs"
        isOn={this.config.stopTimeEnabled}
        onSwitch={this.handleForceStopTimeChange}
        className="force-stop__button"
      />
    );
  }

  get stopTime() {
    const {
      stopTime: { pmSelected, timeValue },
      stopTimeEnabled
    } = this.config;

    return stopTimeEnabled ? (
      <TimePicker
        pmSelected={pmSelected}
        timeValue={timeValue}
        onChange={this.handleStopTimeChange}
        className="time-picker--top-padding"
      />
    ) : null;
  }

  get hintRow() {
    const schedule = this.config;

    return (
      <div className="hint-row">
        {this.hintDescription}
        {schedule.author ? this.hintAuthorAndDate : null}
        <p className="hint-row__modified">{this.modifiedDesc}</p>
      </div>
    );
  }

  get modificationTimeString() {
    if (!this.props.trackModificationTime) {
      return `, ${
        this.state.ui.modifiedTimeDiff <= 1 ? ` just now` : `${this.state.ui.modifiedTimeDiff} minutes ago.`
      }`;
    }

    return '';
  }

  get modifiedDesc() {
    const {
      ui: { isModifiedByYou }
    } = this.state;
    const { modified } = this.config;

    if (!modified.by || isModifiedByYou) {
      return `Modified by You${this.modificationTimeString}`;
    }

    return `Modified by ${modified.by}, ${this.latestModificationDiffBySomeoneElse} ago.`;
  }

  get latestModificationDiffBySomeoneElse() {
    const todayDate = `${new Date()}`;

    return distanceInWords(todayDate, this.config.modified.at);
  }

  get hintDescription() {
    return <p className="hint-row__description">{this.descriptions[this.config.period]}</p>;
  }

  get descriptions() {
    return {
      [SchedulePicker.DAILY]: this.dailyDescription,
      [SchedulePicker.WEEKLY]: this.weeklyDescription,
      [SchedulePicker.MONTHLY]: this.monthlyDescription
    };
  }

  get startTimeString() {
    const { startTime } = this.config;

    return `${startTime.timeValue} ${startTime.pmSelected ? DAYTIME.PM : DAYTIME.AM}`;
  }

  get stopTimeString() {
    const { stopTime, stopTimeEnabled } = this.config;

    return stopTimeEnabled
      ? `at ${stopTime.timeValue} ${stopTime.pmSelected ? DAYTIME.PM : DAYTIME.AM}`
      : `when finished`;
  }

  get dailyDescription() {
    return `${this.props.entityType} will run every day at ${this.startTimeString} and will stop ${this.stopTimeString}.`;
  }

  get weeklyDescription() {
    const { days = [] } = this.config;
    const daysString = `${days.map((element, index) => (index > 0 ? ` and ${element}` : element))}`;

    return days.length > 0
      ? `${this.props.entityType} will run  ${daysString} ${this.startTimeString} and will stop ${this.stopTimeString}`
      : null;
  }

  get monthlyDescription() {
    const { on, dayNumber, occurrence } = this.config;

    return on === SchedulePicker.defaultProps.schedule.on
      ? `${this.props.entityType} will run on the ${dayNumber} day of every month ${this.startTimeString} ${this.stopTimeString}`
      : `${this.props.entityType} will run on the ${on} ${occurrence} of every month ${this.startTimeString} and will stop ${this.stopTimeString}`;
  }

  get hintAuthorAndDate() {
    const { author, createdAt } = this.config;

    return (
      <p className="hint-row__author">
        {`Created on ${new Date(createdAt).toDateString()} by ${author ? author.abbreviated : 'Anonymous'}`}
      </p>
    );
  }
  getCheckedDaysFromMultiselect = chcekboxesStates =>
    // retrieve checked days from Multiselect OnChange
    Object.entries(SchedulePicker.DAYS)
      .filter(([key, value], index) => Array.from(chcekboxesStates)[index][1])
      // eslint-disable-next-line no-unused-vars
      .map(([key, value]) => value);

  getIndexedDayFromDays = index => Object.entries(SchedulePicker.DAYS)[index][1];

  checkBoxIndex = checkBoxName => parseInt(checkBoxName.slice(9), 10);

  handleCheckBoxChange = e => {
    const checkBoxName = e.target.name;
    const { days } = this.config;
    const checkBoxIndex = this.checkBoxIndex(checkBoxName);
    const indexedDay = this.getIndexedDayFromDays(checkBoxIndex);
    const checkedDaysArray = this.addOrFilterDays(days, indexedDay);

    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, SchedulePicker.WEEKLY),
            days: checkedDaysArray
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  firstLetterCapital = word => word[0].toUpperCase() + word.slice(1);

  addOrFilterDays = (days, day) =>
    days.some(elem => elem === day) ? days.filter(elem => elem !== day) : days.concat(day);

  handleStartTimeChange = (timeValue, parsedTime, error, pmSelected) => {
    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, this.config.period),
            startTime: {
              timeValue,
              pmSelected,
              parsedTime,
              error
            }
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  handleForceStopTimeChange = () => {
    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, this.config.period),
            stopTimeEnabled: !this.config.stopTimeEnabled
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  handleStopTimeChange = (timeValue, parsedTime, error, pmSelected) => {
    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, this.config.period),
            stopTime: {
              parsedTime,
              error,
              timeValue,
              pmSelected
            }
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  handleWeekDaysMultiselectChange = checkBoxesStates => {
    const days = this.getCheckedDaysFromMultiselect(checkBoxesStates);

    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, SchedulePicker.WEEKLY),
            days
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  feedbackStates = (state, period) => {
    const { startTime, stopTimeEnabled, stopTime, days, on, dayNumber, occurrence, createdAt, author, id } = state;
    const basicFeedback = {
      id,
      createdAt,
      author,
      period,
      startTime,
      stopTimeEnabled,
      stopTime
    };

    switch (period) {
      case SchedulePicker.DAILY:
        return basicFeedback;
      case SchedulePicker.WEEKLY:
        return { ...basicFeedback, days };
      case SchedulePicker.MONTHLY:
        return { ...basicFeedback, on, dayNumber, occurrence };
      default:
        return SchedulePicker.FALSY_RETURN;
    }
  };

  handleSchedulePeriodRowChange = value => {
    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, value),
            period: value
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  handleMonthlyOnChange = ({ value }) => {
    const { on, dayNumber, occurrence } = SchedulePicker.defaultProps.schedule;

    this.setState(
      prevState => {
        const properMonthlyStates = {
          on: value,
          dayNumber: value !== on ? dayNumber : this.config.dayNumber,
          occurrence: value !== occurrence ? this.config.occurrence : occurrence
        };

        return {
          ui: {
            ...prevState.ui,
            feedback: {
              ...this.feedbackStates(this.config, SchedulePicker.MONTHLY),
              ...properMonthlyStates
            }
          }
        };
      },
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  handleMonthlyPeriodicOccurrenceChange = ({ value }) => {
    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, SchedulePicker.MONTHLY),
            occurrence: value
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  handleMonthlyDayOccurrenceChange = ({ target: { value } }) => {
    this.setState(
      prevState => ({
        ui: {
          ...prevState.ui,
          feedback: {
            ...this.feedbackStates(this.config, SchedulePicker.MONTHLY),
            dayNumber: value
          }
        }
      }),
      () => this.props.onChange(this.state.ui.feedback)
    );
  };

  dummyHandler = () => true;

  handleRemoveSchedule = () => {
    this.props.onRemove();
  };

  render() {
    return (
      <div className={this.schedulePickerClassName}>
        {this.removeScheduleButton}
        {this.duplicateWarning}
        {this.body}
      </div>
    );
  }
}

SchedulePicker.propTypes = {
  /**
   *  Is called whenever one of the inner inputs or checkboxes changes its state.
   *
   *  Function takes one argument that is an object, where all the fields are
   *  the same as in `schedule` prop, but with values changed in the SchedulePicker
   */
  onChange: PropTypes.func.isRequired,
  /**
   *Is called when the x-icon is clicked
   *
   */
  onRemove: PropTypes.func.isRequired,
  /**
   * Any custom class names
   */
  className: PropTypes.string,
  /**
   * if time since last modification should be tracked and displayed
   */
  trackModificationTime: PropTypes.bool,
  /**
   * entity type
   */
  entityType: PropTypes.string,
  /**
   * If scheduler is a duplicated
   */
  isDuplicated: PropTypes.bool,
  /**
   * Object of schedule properties
   */
  schedule: PropTypes.shape({
    modified: PropTypes.shape({
      /**
       * name of person that modified the scheduler
       */
      by: PropTypes.string,
      /**
       * when it was modified
       */
      at: PropTypes.any
    }),
    /**
     * scheduler id
     */
    id: PropTypes.string.isRequired,
    /**
     * scheduler period of time `daily`, `weekly`, `monthly`
     */
    period: PropTypes.string,
    /**
     * description rendered on the bottom
     */
    description: PropTypes.string,
    /**
     * when schedule was created
     */
    createdAt: PropTypes.any,
    /**
     * array of checked days in weekly period of time
     */
    days: PropTypes.array,
    /**
     * on what day of month in monthly period of thime . Possible options: `'day', 'first', 'second', 'third', 'forth', 'last'`
     */
    on: PropTypes.string,
    /**
     *  day of month in numbers `1-31`
     *
     * When `props.schedule.uiState.on === "day"` SchedulePicker will render an input for entering a month day value
     */
    dayNumber: PropTypes.number,
    /**
     *  Occurrence of schedule in the monthly period of time
     *
     * When `props.schedule.uiState.on !== "day"` SchedulePicker will render a dropdown with
     * options 'day', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
     */
    occurrence: PropTypes.string,
    /**
     * start time of schedule
     */
    startTime: PropTypes.shape({
      timeValue: PropTypes.any,
      pmSelected: PropTypes.bool
    }),
    /**
     * stop time of shedule
     */
    stopTime: PropTypes.shape({
      timeValue: PropTypes.any,
      pmSelected: PropTypes.bool
    }),
    /**
     * if stop time is enabled
     */
    stopTimeEnabled: PropTypes.bool,
    /**
     * author of schedulue
     */
    author: PropTypes.shape({
      /**
       * abbreviated name of author
       */
      abbreviated: PropTypes.string,
      /**
       * author
       */
      name: PropTypes.string
    })
  })
};

SchedulePicker.defaultProps = {
  entityType: 'Assesment',
  trackModificationTime: false,
  isDuplicated: false,
  className: '',
  schedule: {
    id: '',
    period: 'daily',
    dayNumber: 1,
    on: 'day',
    occurrence: 'day',
    days: [],
    stopTimeEnabled: false,
    stopTime: {
      timeValue: '10:00',
      pmSelected: false,
      error: false
    },
    startTime: {
      timeValue: '08:00',
      pmSelected: false,
      error: false
    },
    author: {
      abbreviated: '',
      name: ''
    },
    createdAt: `${new Date()}`,
    modified: {
      by: '',
      at: ''
    }
  }
};

export default SchedulePicker;
