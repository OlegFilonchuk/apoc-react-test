import React, { Component } from 'react';
import classNames from 'classnames';
import { cloneDeep, isEqual } from 'lodash';
import PropTypes from 'prop-types';

import SchedulePicker from '../SchedulePicker/SchedulePicker';

import './SchedulePickerGroup.less';

class SchedulePickerGroup extends Component {
  static DAILY = 'daily';
  static WEEKLY = 'weekly';
  static MONTHLY = 'monthly';

  constructor(props) {
    super(props);
    this.state = {
      schedules: cloneDeep(this.props.schedules)
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.schedules !== this.props.schedules) {
      this.setState({
        schedules: cloneDeep(this.props.schedules)
      });
    }
  };

  get className() {
    return classNames('schedule-picker-group', this.props.className);
  }

  getChangedSchedules = schedulePropToRepalce =>
    this.state.schedules.map(schedule => (schedule.id === schedulePropToRepalce.id ? schedulePropToRepalce : schedule));

  chceckIfDuplicate(schedule, scheduleIndex) {
    return this.state.schedules.some((element, index) => {
      if (element.period === schedule.period && scheduleIndex > index) {
        switch (schedule.period) {
          case SchedulePickerGroup.DAILY:
            return isEqual(this.basicScheduleProperties(schedule), this.basicScheduleProperties(element));
          case SchedulePickerGroup.WEEKLY:
            return isEqual(
              { ...this.basicScheduleProperties(schedule), days: schedule.days },
              { ...this.basicScheduleProperties(element), days: element.days }
            );
          case SchedulePickerGroup.MONTHLY:
            return isEqual(
              {
                ...this.basicScheduleProperties(schedule),
                on: schedule.on,
                occurrence: schedule.occurence,
                dayNumber: schedule.dayNumber
              },
              {
                ...this.basicScheduleProperties(element),
                on: element.on,
                occurrence: element.occurence,
                dayNumber: element.dayNumber
              }
            );
          default:
            return false;
        }
      }

      return false;
    });
  }

  basicScheduleProperties = properties => ({
    period: properties.period,
    startTime: properties.startTime,
    stopTime: properties.stopTime,
    stopTimeEnabled: properties.stopTimeEnabled
  });

  handleScheduleChange = scheduleFeedback => {
    this.setState(
      {
        schedules: this.getChangedSchedules(scheduleFeedback)
      },
      () => {
        this.props.onPickerChange(scheduleFeedback);
        this.props.onChange(this.getChangedSchedules(scheduleFeedback));
      }
    );
  };

  handleScheduleRemove = id => {
    const filteredSchedules = this.state.schedules.filter(schedule => id !== schedule.id);

    this.setState({ schedules: filteredSchedules }, this.props.onChange(filteredSchedules));
  };

  render() {
    return (
      <div className={this.className}>
        {this.state.schedules.map((schedule, index) => {
          const isDuplicated = this.chceckIfDuplicate(schedule, index);

          return (
            <SchedulePicker
              schedule={schedule}
              className={this.props.scheduleClassName}
              trackModificationTime={this.props.trackModificationTime}
              entityType={this.props.entityType}
              key={schedule.id}
              isDuplicated={isDuplicated}
              onChange={this.handleScheduleChange}
              onRemove={() => this.handleScheduleRemove(schedule.id)}
            />
          );
        })}
      </div>
    );
  }
}

SchedulePickerGroup.propTypes = {
  /**
   * Array of schedules properties
   *
   *This properties are described in SchedulePicker component
   */
  schedules: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * custom class
   */
  className: PropTypes.string,
  /**
   * Each SchedulePicker custom class
   */
  scheduleClassName: PropTypes.string,
  /**
   * Show the last modification time
   */
  trackModificationTime: PropTypes.bool,
  /**
   * entity type
   */
  entityType: PropTypes.string,
  /**
   * called when one shedulePicker was changed with one parameter that contains this certain Schedule Picker properties
   */
  onPickerChange: PropTypes.func,
  /**
   * called when one parameter of SchedulePicker was changed
   */
  onChange: PropTypes.func.isRequired
};

SchedulePickerGroup.defaultProps = {
  className: '',
  scheduleClassName: '',
  trackModificationTime: true,
  entityType: 'Assesment',
  onPickerChange: () => {}
};

export default SchedulePickerGroup;
