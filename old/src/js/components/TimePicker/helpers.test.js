import { isTimeValid, parseTime } from './helpers';

describe('test validations', () => {
  test('validation of empty string -no empty string allowed', () => {
    const emptyString = '';

    expect(isTimeValid(emptyString)).toBeFalsy();
  });

  test('validation of non arguments -no lack of arguments ', () => {
    expect(isTimeValid()).toBeFalsy();
  });

  test('validation of letters -no letters and special signs', () => {
    const characters = 'abcdefghijklmnoprstquwxyz123456789:!@#$%^&*()';

    expect(isTimeValid(characters)).toBeFalsy();
  });

  test('validation of numbers -no numbers ', () => {
    const numbers = 123456789012336474387;

    expect(isTimeValid(numbers)).toBeFalsy();
  });

  describe('chceck primitive values', () => {
    test('boolean', () => {
      expect(isTimeValid(true)).toBeFalsy();
      expect(isTimeValid(false)).toBeFalsy();
    });

    test('null', () => {
      expect(isTimeValid(null)).toBeFalsy();
    });

    test('undefined', () => {
      expect(isTimeValid(undefined)).toBeFalsy();
    });

    test('NaN', () => {
      expect(isTimeValid(NaN)).toBeFalsy();
    });
  });

  test('validate varation of strings', () => {
    const stringsToTest = ['00', '0,0', '0.0', '23'];

    stringsToTest.forEach(string => {
      expect(isTimeValid(string)).toBeFalsy();
    });
  });
  test('validate proper value', () => {
    const stringsToTest = ['0:0', '11:59', '12:00'];

    stringsToTest.forEach(string => {
      expect(isTimeValid(string)).toBeTruthy();
    });
  });
});

describe('parsing tests', () => {
  test('parsing of empty string -no empty string allowed', () => {
    const emptyString = '';

    expect(parseTime(emptyString)).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
  });

  test('parsing of non arguments -no lack of arguments ', () => {
    expect(parseTime()).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
  });

  test('parsing of letters -no letters and special signs', () => {
    const characters = 'abcdefghijklmnoprstquwxyz123456789:!@#$%^&*()';

    expect(parseTime(characters)).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
  });

  test('parsing of numbers -no numbers ', () => {
    const numbers = 123456789012336474387;

    expect(parseTime(numbers)).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
  });

  describe('parsing of primitives', () => {
    test('boolean', () => {
      expect(parseTime(true)).toMatchObject({
        timeValue: {
          hours: '',
          minutes: ''
        },
        error: true
      });
      expect(parseTime(false)).toMatchObject({
        timeValue: {
          hours: '',
          minutes: ''
        },
        error: true
      });
    });

    test('null', () => {
      expect(parseTime(null)).toMatchObject({
        timeValue: {
          hours: '',
          minutes: ''
        },
        error: true
      });
    });

    test('undefined', () => {
      expect(parseTime(undefined)).toMatchObject({
        timeValue: {
          hours: '',
          minutes: ''
        },
        error: true
      });
    });

    test('NaN', () => {
      expect(parseTime(NaN)).toMatchObject({
        timeValue: {
          hours: '',
          minutes: ''
        },
        error: true
      });
    });
  });

  test('parsing varation of strings', () => {
    expect(parseTime('00')).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
    expect(parseTime('0,0')).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
    expect(parseTime('0.0')).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
    expect(parseTime('23')).toMatchObject({
      timeValue: {
        hours: '',
        minutes: ''
      },
      error: true
    });
  });
  test('parsing proper value', () => {
    expect(parseTime('0:0')).toMatchObject({
      timeValue: {
        hours: 0,
        minutes: 0
      },
      error: false
    });
    expect(parseTime('11:59')).toMatchObject({
      timeValue: {
        hours: 11,
        minutes: 59
      },
      error: false
    });
    expect(parseTime('12:00')).toMatchObject({
      timeValue: {
        hours: 12,
        minutes: 0
      },
      error: false
    });
  });
});
