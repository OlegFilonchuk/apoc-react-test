import React from 'react';
import { shallow } from 'enzyme';
import CommaSeparatedInput from './CommaSeparatedInput';

describe('CommaSeparatedInput', () => {
  it('Should match snapshot', () => {
    expect(shallow(<CommaSeparatedInput value={['200', '600', '9000']} />)).toMatchSnapshot();
  });
});
