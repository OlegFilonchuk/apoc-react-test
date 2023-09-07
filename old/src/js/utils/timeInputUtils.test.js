import { isInputInvalid } from './timeInputUtils';

describe('isInputInvalid', () => {
  it('should return true for NaN value or value below 0', () => {
    const naNValue = 'lorem ipsum';
    const belowZeroValue = -666;

    expect(isInputInvalid(naNValue, 'hours')).toEqual(true);
    expect(isInputInvalid(belowZeroValue, 'minutes')).toEqual(true);
  });

  it('should return true for value above 59 for minutes and seconds', () => {
    const invalidData = [
      [60, 'minutes'],
      [60, 'seconds'],
      [71, 'minutes'],
      [89, 'seconds']
    ];

    invalidData.forEach(data => {
      expect(isInputInvalid(...data)).toEqual(true);
    });
  });

  it('should return false when value is between 0 and 59 and is minutes or seconds', () => {
    const validData = [
      [0, 'minutes'],
      [0, 'seconds'],
      [5, 'minutes'],
      [7, 'seconds'],
      [12, 'minutes'],
      [13, 'seconds'],
      [45, 'minutes'],
      [59, 'seconds']
    ];

    validData.forEach(data => {
      expect(isInputInvalid(...data)).toEqual(false);
    });
  });
});
