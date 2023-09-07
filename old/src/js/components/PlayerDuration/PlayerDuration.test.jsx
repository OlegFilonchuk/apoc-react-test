import React from 'react';
import { mount } from 'enzyme';

import PlayerDuration from './PlayerDuration';

describe('<PlayerDuration />', () => {
  it('should trigger "onInvalid" when duration hours is less than min duration', () => {
    // arrange
    const minDuration = 7200;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration hours is less than min duration', () => {
    // arrange
    const minDuration = 7200;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration hours is greater than min duration', () => {
    // arrange
    const minDuration = 7200;
    const hoursToSet = '3';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration hours is greater than min duration', () => {
    // arrange
    const minDuration = 7200;
    const hoursToSet = '3';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration hours is equal to min duration', () => {
    // arrange
    const minDuration = 7200;
    const hoursToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration hours is equal to min duration', () => {
    // arrange
    const minDuration = 7200;
    const hoursToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration hours is greater than max duration', () => {
    // arrange
    const maxDuration = 3600;
    const hoursToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration hours is greater than max duration', () => {
    // arrange
    const maxDuration = 3600;
    const hoursToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration hours is equal to max duration but minutes are greater than 0', () => {
    // arrange
    const maxDuration = 3600;
    const duration = 3660;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration hours is equal to max duration but minutes are greater than 0', () => {
    // arrange
    const maxDuration = 3600;
    const duration = 3660;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration hours is equal to max duration but seconds are greater than 0', () => {
    // arrange
    const maxDuration = 3600;
    const duration = 3603;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration hours is equal to max duration but seconds are greater than 0', () => {
    // arrange
    const maxDuration = 3600;
    const duration = 3603;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration hours is equal to max duration', () => {
    // arrange
    const maxDuration = 3600;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration hours is equal to max duration', () => {
    // arrange
    const maxDuration = 3600;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration hours is less than max duration', () => {
    // arrange
    const maxDuration = 7200;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration hours is less than max duration', () => {
    // arrange
    const maxDuration = 7200;
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration minutes is less than min duration', () => {
    // arrange
    const minDuration = 120;
    const minutesToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration minutes is less than min duration', () => {
    // arrange
    const minDuration = 120;
    const minutesToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration minutes is equal to min duration', () => {
    // arrange
    const minDuration = 120;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration minutes is equal to min duration', () => {
    // arrange
    const minDuration = 120;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration minutes is greater than max duration', () => {
    // arrange
    const maxDuration = 120;
    const minutesToSet = '3';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration minutes is greater than max duration', () => {
    // arrange
    const maxDuration = 120;
    const minutesToSet = '3';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration minutes is equal to max duration but seconds are greater than 0', () => {
    // arrange
    const maxDuration = 120;
    const duration = 121;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration minutes is equal to max duration but seconds are greater than 0', () => {
    // arrange
    const maxDuration = 120;
    const duration = 121;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration minutes is equal to max duration but hours are greater than 0', () => {
    // arrange
    const maxDuration = 120;
    const duration = 3600;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration minutes is equal to max duration but hours are greater than 0', () => {
    // arrange
    const maxDuration = 120;
    const duration = 3600;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration minutes is equal to max duration', () => {
    // arrange
    const maxDuration = 120;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration minutes is equal to max duration', () => {
    // arrange
    const maxDuration = 120;
    const minutesToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration minutes is less than max duration', () => {
    // arrange
    const maxDuration = 120;
    const minutesToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration minutes is less than max duration', () => {
    // arrange
    const maxDuration = 120;
    const minutesToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration seconds is less than min duration', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration seconds is less than min duration', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration seconds is less than min duration but minutes exceed it', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '1';
    const duration = 60;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration seconds is less than min duration but minutes exceed it', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '1';
    const duration = 60;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration seconds is less than min duration but hours exceed it', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '1';
    const duration = 3600;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration seconds is less than min duration but hours exceed it', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '1';
    const duration = 3600;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration seconds is equal to min duration', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration seconds is equal to min duration', () => {
    // arrange
    const minDuration = 2;
    const secondsToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration seconds is greater than min duration', () => {
    // arrange
    const minDuration = 1;
    const secondsToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration seconds is greater than min duration', () => {
    // arrange
    const minDuration = 1;
    const secondsToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} minDuration={minDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration seconds is greater than max duration', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration seconds is greater than max duration', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '2';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration seconds is equal to max duration but minutes are greater than 0', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '1';
    const duration = 60;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration seconds is equal to max duration but minutes are greater than 0', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '1';
    const duration = 60;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration seconds is equal to max duration but hours are greater than 0', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '1';
    const duration = 3600;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration seconds is equal to max duration but hours are greater than 0', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '1';
    const duration = 3600;
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(
      <PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} duration={duration} />
    );

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration seconds is equal to max duration', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration seconds is equal to max duration', () => {
    // arrange
    const maxDuration = 1;
    const secondsToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onValid" when duration seconds is less than max duration', () => {
    // arrange
    const maxDuration = 2;
    const secondsToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onInvalid" when duration seconds is less than max duration', () => {
    // arrange
    const maxDuration = 2;
    const secondsToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} maxDuration={maxDuration} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration hours is less than 0', () => {
    // arrange
    const secondsToSet = '-1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration hours is less than 0', () => {
    // arrange
    const secondsToSet = '-1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration minutes is less than 0', () => {
    // arrange
    const secondsToSet = '-1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration minutes is less than 0', () => {
    // arrange
    const secondsToSet = '-1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when duration seconds is less than 0', () => {
    // arrange
    const secondsToSet = '-1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };
    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when duration seconds is less than 0', () => {
    // arrange
    const secondsToSet = '-1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should fire callback with proper duration time when changing hours', () => {
    // arrange
    const hoursToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: hoursToSet,
        dataset: { unit: 'hours' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="hours"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
    expect(onValid).toHaveBeenCalledWith(3600);
  });

  it('should fire callback with proper duration time when changing minutes', () => {
    // arrange
    const minutesToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };
    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
    expect(onValid).toHaveBeenCalledWith(60);
  });

  it('should fire callback with proper duration time when changing seconds', () => {
    // arrange
    const secondsToSet = '1';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };
    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(1);
    expect(onValid).toHaveBeenCalledWith(1);
  });

  it('should render pre-defined list of durations', () => {
    // arrange
    const durations = {
      600: '00:10:00',
      1800: '00:30:00',
      3600: '01:00:00',
      21600: '06:00:00',
      86400: '24:00:00'
    };

    const durationsInSeconds = Object.keys(durations).map(durationInSeconds => parseInt(durationInSeconds, 10));

    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} intervals={durationsInSeconds} />);

    // act
    const list = component.find('.duration__item');

    // assert
    list.forEach((listElement, index) => {
      expect(listElement.text()).toEqual(durations[durationsInSeconds[index]]);
    });
  });

  it('should allow to choose duration from the pre-defined list', () => {
    // arrange
    const durations = {
      600: '00:10:00',
      1800: '00:30:00',
      3600: '01:00:00',
      21600: '06:00:00',
      86400: '24:00:00'
    };

    const durationsInSeconds = Object.keys(durations).map(durationInSeconds => parseInt(durationInSeconds, 10));

    const onInvalid = jest.fn();
    const onValid = jest.fn();

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} intervals={durationsInSeconds} />);

    // act
    const list = component.find('.duration__item');

    // assert
    list.forEach((listElement, index) => {
      listElement.find('a').simulate('click');
      expect(onValid).toHaveBeenCalledWith(durationsInSeconds[index]);
    });
  });

  it('should set value on field to 00 when given value is empty', () => {
    // arrange
    const secondsToSet = '';
    const expectedValue = '00';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(input.props().value).toEqual(expectedValue);
  });

  it('should format value on field to 00 when given value eqaul "0"', () => {
    // arrange
    const secondsToSet = '0';
    const expectedValue = '00';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(input.props().value).toEqual(expectedValue);
  });

  it.skip('should format value on field to 08 when given value eqaul "8"', () => {
    // arrange
    const secondsToSet = '8';
    const expectedValue = '08';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    const updatedInput = component.find('[data-unit="seconds"]');

    expect(updatedInput.props().value).toEqual(expectedValue);
  });

  it('should trigger "onInvalid" when minutes are greater than 59', () => {
    // arrange
    const minutesToSet = '60';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when minutes are greater than 59', () => {
    // arrange
    const minutesToSet = '60';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: minutesToSet,
        dataset: { unit: 'minutes' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="minutes"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it('should trigger "onInvalid" when seconds are greater than 59', () => {
    // arrange
    const secondsToSet = '60';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onInvalid).toHaveBeenCalledTimes(1);
  });

  it('should NOT trigger "onValid" when seconds are greater than 59', () => {
    // arrange
    const secondsToSet = '60';
    const onInvalid = jest.fn();
    const onValid = jest.fn();
    const eventMock = {
      target: {
        value: secondsToSet,
        dataset: { unit: 'seconds' }
      }
    };

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="seconds"]');

    input.simulate('change', eventMock);
    input.simulate('blur', eventMock);

    // assert
    expect(onValid).toHaveBeenCalledTimes(0);
  });

  it.skip('should change duration when component receive props and duration is different', () => {
    // arrange
    const duration = 3600;
    const expectedDuration = '02';
    const durationToSet = 7200;
    const onValid = jest.fn();
    const onInvalid = jest.fn();

    const component = mount(<PlayerDuration duration={duration} onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="hours"]');

    expect(input.props().value).toEqual('01');

    component.setProps({ duration: durationToSet });

    expect(input.getDOMNode().getAttribute('value')).toEqual(expectedDuration);
  });

  it('should not change duration when component receive props and duration is equal to previous', () => {
    // arrange
    const duration = 3600;
    const expectedDuration = '01';
    const durationToSet = 3600;
    const onValid = jest.fn();
    const onInvalid = jest.fn();

    const component = mount(<PlayerDuration duration={duration} onValid={onValid} onInvalid={onInvalid} />);

    // act
    const input = component.find('[data-unit="hours"]');

    expect(input.props().value).toEqual(expectedDuration);
    component.setProps({ duration: durationToSet });

    // assert
    expect(input.props().value).toEqual(expectedDuration);
  });

  it('should close intervals dropdown when interval selected', () => {
    // arrange
    const durations = {
      600: '00:10:00'
    };

    const durationsInSeconds = Object.keys(durations).map(durationInSeconds => parseInt(durationInSeconds, 10));

    const onInvalid = jest.fn();
    const onValid = jest.fn();

    const component = mount(<PlayerDuration onValid={onValid} onInvalid={onInvalid} intervals={durationsInSeconds} />);

    // act
    expect(component.state('isToggleOpen')).toEqual(false);
    const toggle = component.find('.duration__toggle');

    toggle.simulate('click');
    expect(component.state('isToggleOpen')).toEqual(true);

    const interval = component.find('.duration__item a');

    interval.simulate('click');

    // assert
    expect(component.state('isToggleOpen')).toEqual(false);
  });
});
