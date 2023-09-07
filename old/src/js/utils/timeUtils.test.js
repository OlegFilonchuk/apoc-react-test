import * as timeUtils from './timeUtils';

describe('timeUtils.secondsToDurationObject', () => {
  it('should format duration when give seconds', () => {
    const dataToFormat = [
      {
        before: 30,
        after: {
          hours: 0,
          minutes: 0,
          seconds: 30
        }
      },
      {
        before: 1,
        after: {
          hours: 0,
          minutes: 0,
          seconds: 1
        }
      },
      {
        before: 0,
        after: {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      },
      {
        before: 60,
        after: {
          hours: 0,
          minutes: 1,
          seconds: 0
        }
      },
      {
        before: 61,
        after: {
          hours: 0,
          minutes: 1,
          seconds: 1
        }
      },
      {
        before: 78,
        after: {
          hours: 0,
          minutes: 1,
          seconds: 18
        }
      },
      {
        before: 661,
        after: {
          hours: 0,
          minutes: 11,
          seconds: 1
        }
      },
      {
        before: 3601,
        after: {
          hours: 1,
          minutes: 0,
          seconds: 1
        }
      },
      {
        before: 3660,
        after: {
          hours: 1,
          minutes: 1,
          seconds: 0
        }
      },
      {
        before: 3661,
        after: {
          hours: 1,
          minutes: 1,
          seconds: 1
        }
      },
      {
        before: 7365,
        after: {
          hours: 2,
          minutes: 2,
          seconds: 45
        }
      }
    ];

    dataToFormat.forEach(value => {
      const receivedSecondsToDuration = timeUtils.secondsToDurationObject(value.before);
      const expectedSecondsToDuration = value.after;

      expect(receivedSecondsToDuration).toEqual(expectedSecondsToDuration);
    });
  });
});

describe('timeUtils.durationToSeconds', () => {
  it('should format seconds when give duration', () => {
    const dataToFormat = [
      {
        before: 30,
        after: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 30
        }
      },
      {
        before: 1,
        after: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 1
        }
      },
      {
        before: 0,
        after: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      },
      {
        before: 60,
        after: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 1,
          seconds: 0
        }
      },
      {
        before: 61,
        after: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 1,
          seconds: 1
        }
      },
      {
        before: 78,
        after: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 1,
          seconds: 18
        }
      },
      {
        before: 661,
        after: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 11,
          seconds: 1
        }
      },
      {
        before: 3601,
        after: {
          weeks: 0,
          days: 0,
          hours: 1,
          minutes: 0,
          seconds: 1
        }
      },
      {
        before: 3660,
        after: {
          weeks: 0,
          days: 0,
          hours: 1,
          minutes: 1,
          seconds: 0
        }
      },
      {
        before: 3661,
        after: {
          weeks: 0,
          days: 0,
          hours: 1,
          minutes: 1,
          seconds: 1
        }
      },
      {
        before: 7365,
        after: {
          weeks: 0,
          days: 0,
          hours: 2,
          minutes: 2,
          seconds: 45
        }
      }
    ];

    dataToFormat.forEach(value => {
      const receivedDurationToSeconds = timeUtils.durationToSeconds(value.after);
      const expectedDurationToSeconds = value.before;

      expect(receivedDurationToSeconds).toEqual(expectedDurationToSeconds);
    });
  });
});

describe('timeUtils.secondsToDurationString', () => {
  it('should format duration in HH:mm:ss format when give seconds', () => {
    const dataToFormat = [
      {
        before: 30,
        after: '00:00:30'
      },
      {
        before: 1,
        after: '00:00:01'
      },
      {
        before: 0,
        after: '00:00:00'
      },
      {
        before: 60,
        after: '00:01:00'
      },
      {
        before: 61,
        after: '00:01:01'
      },
      {
        before: 78,
        after: '00:01:18'
      },
      {
        before: 661,
        after: '00:11:01'
      },
      {
        before: 3601,
        after: '01:00:01'
      },
      {
        before: 3607,
        after: '01:00:07'
      },
      {
        before: 3660,
        after: '01:01:00'
      },
      {
        before: 3661,
        after: '01:01:01'
      },
      {
        before: 7365,
        after: '02:02:45'
      }
    ];

    dataToFormat.forEach(value => {
      const received = timeUtils.secondsToDurationString(value.before);
      const expected = value.after;

      expect(received).toEqual(expected);
    });
  });
});
