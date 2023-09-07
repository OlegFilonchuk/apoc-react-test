import { TIME_UNITS, TIME_MAX_VALUES } from './constants';

export const isInputInvalid = (value, key) => {
  if (isNaN(value) || Number(value) < 0) {
    return true;
  }

  return (
    ((key === TIME_UNITS.MINUTES || key === TIME_UNITS.SECONDS) && value > TIME_MAX_VALUES.SECONDS_MINUTES) ||
    (key === TIME_UNITS.HOURS && value > TIME_MAX_VALUES.HOURS) ||
    (key === TIME_UNITS.DAYS && value > TIME_MAX_VALUES.DAYS)
  );
};

export const checkIfInputValueExceeded = (timeUnit, timeValue, timeState) => {
  const isDaysValueExceeded = () =>
    timeUnit === TIME_UNITS.DAYS && timeValue > TIME_MAX_VALUES.DAYS && timeState.weeks > 0;
  const isHoursValueExceeded = () =>
    timeUnit === TIME_UNITS.HOURS && timeValue > TIME_MAX_VALUES.HOURS && (timeState.weeks > 0 || timeState.days > 0);
  const isMinutesValueExceeded = () =>
    timeUnit === TIME_UNITS.MINUTES &&
    timeValue > TIME_MAX_VALUES.SECONDS_MINUTES &&
    (timeState.weeks > 0 || timeState.days > 0 || timeState.hours > 0);
  const isSecondsValueExceeded = () =>
    timeUnit === TIME_UNITS.SECONDS &&
    timeValue > TIME_MAX_VALUES.SECONDS_MINUTES &&
    (timeState.weeks > 0 || timeState.days > 0 || timeState.hours > 0 || timeState.minutes > 0);

  return isDaysValueExceeded() || isHoursValueExceeded() || isMinutesValueExceeded() || isSecondsValueExceeded();
};
