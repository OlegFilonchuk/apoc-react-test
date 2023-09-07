import React from 'react';
import { mount } from 'enzyme';

import SchedulePickerGroup from './SchedulePickerGroup';

describe('<SchedulePickerGroup />', () => {
  it('render component properly', () => {
    const schedules = [
      {
        id: '234',
        period: 'monthly',
        on: 'day',
        dayNumber: 5,
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: true,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: `${new Date()}`,
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      },
      {
        id: '567',
        period: 'weekly',
        days: ['monday', 'friday'],
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: true,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: `${new Date()}`,
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      }
    ];
    const onChangeHandler = () => {};
    const component = mount(<SchedulePickerGroup schedules={schedules} onChange={onChangeHandler} />);

    expect(component).toBeTruthy();
    expect(component.find('.schedule-picker').length).toEqual(2);
  });

  it('returns proper feedback in OnChange', () => {
    const schedules = [
      {
        id: '284',
        period: 'monthly',
        on: 'day',
        occurrence: 'day',
        dayNumber: 5,
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: true,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: `${new Date()}`,
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      },
      {
        id: '561',
        period: 'weekly',
        days: ['monday', 'friday'],
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: true,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: `${new Date()}`,
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      }
    ];
    const feedbackSchedules = [
      {
        id: '284',
        period: 'monthly',
        on: 'day',
        occurrence: 'day',
        dayNumber: 5,
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: false,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: `${new Date()}`,
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      },
      {
        id: '561',
        period: 'weekly',
        days: ['monday', 'friday'],
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: true,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: `${new Date()}`,
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      }
    ];
    const onChangeHandler = jest.fn();

    const component = mount(<SchedulePickerGroup schedules={schedules} onChange={onChangeHandler} />);
    const forceStopButton = component.find('.force-stop__button button').at(0);

    expect(component).toBeTruthy();
    forceStopButton.simulate('click');
    expect(onChangeHandler).toBeCalledWith(feedbackSchedules);
  });
});
