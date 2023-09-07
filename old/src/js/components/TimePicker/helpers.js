import { isNumber } from 'lodash';

const timeRegEx = /^([0-9]|1[0-2]|0[0-9]):(0[0-9]|[1-5][0-9]|[0-9])$/;

export const isTimeValid = timeString => timeRegEx.test(timeString);

export const parseTime = value => {
  const isValid = isTimeValid(value);

  if (isValid) {
    const matchedTime = value.match(timeRegEx);
    // eslint-disable-next-line no-unused-vars
    const [_, hours, minutes] = matchedTime.map(matchedGroup => parseInt(matchedGroup, 10));

    if (isNumber(hours) && isNumber(minutes) && hours >= 0 && hours <= 12 && minutes >= 0 && minutes <= 60) {
      return {
        timeValue: {
          hours,
          minutes
        },
        error: false
      };
    }

    return {
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    };
  }

  return {
    timeValue: {
      hours: '',
      minutes: ''
    },
    error: true
  };
};
