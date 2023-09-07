import React from 'react';

import TextPlaceholder from './TextPlaceholder';

describe('<TextPlaceholder>', () => {
  it('should match snapshot', () => {
    expect(<TextPlaceholder text="Test Text" />).toMatchSnapshot();
  });
});
