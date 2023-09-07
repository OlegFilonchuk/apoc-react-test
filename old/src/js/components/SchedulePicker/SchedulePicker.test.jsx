import React from 'react';
import { mount } from 'enzyme';

import SchedulePicker from './SchedulePicker';

describe('<SchedulePicker />', () => {
  it('render default component properly', () => {
    const id = '123';
    const createdAt = new Date();
    const defaulFeedback = {
      period: 'daily',
      stopTimeEnabled: true,
      id,
      author: {
        abbreviated: '',
        name: ''
      },
      createdAt,
      startTime: {
        timeValue: '08:00',
        pmSelected: false,
        error: false
      },
      stopTime: {
        timeValue: '10:00',
        pmSelected: false,
        error: false
      }
    };
    const onChangeHandler = jest.fn();
    const Component = mount(
      <SchedulePicker schedule={{ id, createdAt }} onChange={onChangeHandler} onRemove={() => {}} />
    );
    const forceStopButton = Component.find('.force-stop__button button');

    expect(Component).toBeTruthy();
    forceStopButton.simulate('click');
    expect(onChangeHandler).toBeCalledWith(defaulFeedback);
  });

  it('weekly feedback check', () => {
    const id = '456';
    const createdAt = new Date();
    const weeklyProperties = {
      period: 'weekly',
      stopTimeEnabled: false,
      days: ['monday', 'friday', 'saturday'],
      id,
      author: {
        abbreviated: '',
        name: ''
      },
      createdAt,
      startTime: {
        timeValue: '08:00',
        pmSelected: false,
        parsedTime: {
          hours: 8,
          minutes: 0
        },
        error: false
      },
      stopTime: {
        timeValue: '10:00',
        pmSelected: false,
        parsedTime: {
          hours: 10,
          minutes: 0
        },
        error: false
      }
    };
    const onChangeHandler = jest.fn();
    const Component = mount(
      <SchedulePicker schedule={weeklyProperties} onChange={onChangeHandler} onRemove={() => {}} />
    );
    const forceStopButton = Component.find('.force-stop__button button');

    expect(Component).toBeTruthy();
    forceStopButton.simulate('click');
    expect(onChangeHandler).toBeCalledWith({ ...weeklyProperties, stopTimeEnabled: true });
  });

  it('monthly feedback chceck', () => {
    const id = '789';
    const createdAt = new Date();
    const monthlyProperties = {
      period: 'monthly',
      stopTimeEnabled: false,
      on: 'day',
      occurrence: 'day',
      dayNumber: 3,
      id,
      author: {
        abbreviated: '',
        name: ''
      },
      createdAt,
      startTime: {
        timeValue: '08:00',
        pmSelected: false,
        parsedTime: {
          hours: 8,
          minutes: 0
        },
        error: false
      },
      stopTime: {
        timeValue: '10:00',
        pmSelected: false,
        parsedTime: {
          hours: 10,
          minutes: 0
        },
        error: false
      }
    };
    const onChangeHandler = jest.fn();
    const Component = mount(
      <SchedulePicker schedule={monthlyProperties} onChange={onChangeHandler} onRemove={() => {}} />
    );
    const forceStopButton = Component.find('.force-stop__button button');

    expect(Component).toBeTruthy();
    forceStopButton.simulate('click');
    expect(onChangeHandler).toBeCalledWith({ ...monthlyProperties, stopTimeEnabled: true });
  });

  it('duplicated banner corrrectly rendering', () => {
    const id = '153';

    const onChangeHandler = jest.fn();
    const Component = mount(
      <SchedulePicker schedule={{ id }} isDuplicated onChange={onChangeHandler} onRemove={() => {}} />
    );

    expect(Component).toBeTruthy();
    expect(Component.exists('.duplicate')).toBeTruthy();
  });
});
