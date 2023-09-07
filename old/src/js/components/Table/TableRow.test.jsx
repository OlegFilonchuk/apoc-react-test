import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TableRow from './TableRow';

const mountRow = ({ mountMethod = mount, props = {} }) =>
  mountMethod(
    <TableRow {...props}>
      <td>Content</td>
      <td>Content</td>
    </TableRow>,
    {
      attachTo: document.createElement('tbody')
    }
  );

describe('<TableRow />', () => {
  it('should match snapshot', () => {
    expect(toJson(mountRow({ mountMethod: shallow }))).toMatchSnapshot();
  });

  it('correctly set `className`', () => {
    const cell = mountRow({ props: { className: 'some-extra-class' } });
    const element = cell.find('tr');

    expect(element).toHaveClassName('some-extra-class');
  });
});
