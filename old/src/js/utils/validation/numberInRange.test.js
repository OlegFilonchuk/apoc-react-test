import numberInRange from './numberInRange';

describe('numberInRange', () => {
  const propName = 'somePropName';
  const componentName = 'ComponentName';
  const min = 0;
  const max = 10;

  it('should return null for validation that is passing', () => {
    const props = {
      [propName]: 0
    };

    const validation = numberInRange(min, max);

    expect(validation(props, propName)).toMatchSnapshot();
  });

  it('should return Error when prop is not of `number` type', () => {
    const props = {
      [propName]: 'some non numeric value'
    };

    const validation = numberInRange(min, max);

    expect(validation(props, propName, componentName)).toMatchSnapshot();
  });

  it('should return Error when prop exceeds range', () => {
    const props = {
      [propName]: 'some non numeric value'
    };

    const validation = numberInRange(min, max);

    expect(validation(props, propName, componentName)).toMatchSnapshot();
  });
});
