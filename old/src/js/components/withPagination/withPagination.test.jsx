import React from 'react';
import { mount } from 'enzyme';

import withPagination from './withPagination';

describe('withPagination HoC', () => {
  describe('render component', () => {
    const div = () => <div />;

    div.displayName = 'div';

    it('should render <div> with Pagination', () => {
      const DivWithPagination = withPagination(div);
      const paginationProps = {
        key: 'pagination',
        currentPage: 16,
        itemsPerPage: 5,
        totalItems: 82,
        onChange: () => {
          // update table row data
        }
      };
      const component = mount(<DivWithPagination paginationProps={paginationProps} />);

      expect(component).toMatchSnapshot();
    });
  });
});
