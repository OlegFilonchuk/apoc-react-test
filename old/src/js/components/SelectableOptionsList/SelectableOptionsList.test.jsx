import React from 'react';
import { shallow } from 'enzyme';

import SelectableOptionsList from './SelectableOptionsList';

describe('SelectableOptionsList', () => {
  it("should match to it's snapshot", () => {
    const standardData = {
      options: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'],
      optionsAdded: ['CCC', 'EEE'],
      onOptionAdd: () => true,
      onOptionRemove: () => true,
      countMessage: {
        single: 'test added.',
        plural: 'tests added'
      },
      maxLength: 5,
      plural: 'tests',
      placeholder: 'Search for tests',
      wrapperClassName: 'test-className',
      required: true
    };

    expect(shallow(<SelectableOptionsList {...standardData} />)).toMatchSnapshot();
  });
});
