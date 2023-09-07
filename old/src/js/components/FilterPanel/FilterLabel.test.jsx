import React from 'react';
import { shallow } from 'enzyme';

import FilterLabel from './FilterLabel';

describe('<FilterLabel />', () => {
  it('should render correct html', () => {
    const filterLabel = shallow(<FilterLabel label={'testLabel'} userProfilesCount={1} />);

    expect(filterLabel).toMatchSnapshot();
  });
});
