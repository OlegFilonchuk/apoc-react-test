import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TableHeadRow from './TableHeadRow';

describe('<TableRow />', () => {
  it('should match snapshot', () => {
    const row = shallow(
      <TableHeadRow>
        <td>Content</td>
        <td>Content</td>
      </TableHeadRow>
    );

    expect(toJson(row)).toMatchSnapshot();
  });
});
