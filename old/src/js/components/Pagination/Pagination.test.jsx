import React from 'react';
import { mount } from 'enzyme';

import Pagination from './Pagination';

describe('<Pagination />', () => {
  let currentPage = 1;

  beforeEach(() => {
    currentPage = 1;
  });

  function onChange(page) {
    currentPage = page;
  }

  it('should render pagination component', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 7;
    const itemsPerPage = 5;
    const expectedCurrentPage = 2;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    // .current-page is 2 when you are on first or last page
    expect(component.find('.current-page').length).toEqual(expectedCurrentPage);
    expect(
      component
        .find('.current-page')
        .at(1)
        .text()
    ).toBe('1');
    expect(component.find('.page').length).toBe(maximumPaginationSize + 2);
  });

  // tests for max pagination size 7
  it('should render pagination if current page is at the middle pagination size 7', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 7;
    const itemsPerPage = 5;
    const totalPages = totalItems / itemsPerPage;

    currentPage = 6;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    expect(component.find('.current-page').length).toEqual(1);
    expect(component.find('.current-page').text()).toBe('6');

    // check current page neighbour elements
    expect(
      component
        .find('.page')
        .at(3)
        .text()
    ).toBe('5');
    expect(
      component
        .find('.page')
        .at(5)
        .text()
    ).toBe('7');

    // check first and last element position
    expect(
      component
        .find('.page')
        .at(1)
        .text()
    ).toBe('1');
    expect(
      component
        .find('.page')
        .at(7)
        .text()
    ).toBe(String(totalPages));

    // check breadcumps
    expect(
      component
        .find('.page')
        .at(2)
        .text()
    ).toBe('…');
    expect(
      component
        .find('.page')
        .at(6)
        .text()
    ).toBe('…');

    expect(component.find('.page').length).toBe(maximumPaginationSize + 2);
  });

  it('should render pagination if current page is at the beginning pagination size 7', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 7;
    const itemsPerPage = 5;
    const totalPages = totalItems / itemsPerPage;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    expect(component.find('.current-page').length).toEqual(2);
    expect(
      component
        .find('.current-page')
        .at(1)
        .text()
    ).toBe('1');

    expect(
      component
        .find('.page')
        .at(2)
        .text()
    ).toBe('2');
    expect(
      component
        .find('.page')
        .at(3)
        .text()
    ).toBe('3');
    expect(
      component
        .find('.page')
        .at(4)
        .text()
    ).toBe('4');
    expect(
      component
        .find('.page')
        .at(5)
        .text()
    ).toBe('5');
    expect(
      component
        .find('.page')
        .at(6)
        .text()
    ).toBe('…');
    expect(
      component
        .find('.page')
        .at(7)
        .text()
    ).toBe(String(totalPages));
    expect(component.find('.page').length).toBe(maximumPaginationSize + 2);
  });

  it('should render pagination if current page is at the end pagination size 7', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 7;
    const itemsPerPage = 5;

    currentPage = 17;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    expect(component.find('.current-page').length).toEqual(2);

    expect(
      component
        .find('.page')
        .at(1)
        .text()
    ).toBe('1');
    expect(
      component
        .find('.page')
        .at(2)
        .text()
    ).toBe('…');
    expect(
      component
        .find('.page')
        .at(3)
        .text()
    ).toBe('13');
    expect(
      component
        .find('.page')
        .at(4)
        .text()
    ).toBe('14');
    expect(
      component
        .find('.page')
        .at(5)
        .text()
    ).toBe('15');
    expect(
      component
        .find('.page')
        .at(6)
        .text()
    ).toBe('16');
    expect(
      component
        .find('.current-page')
        .at(0)
        .text()
    ).toBe('17');
    expect(component.find('.page').length).toBe(maximumPaginationSize + 2);
  });

  // tests for max pagination size 9
  it('should render pagination if current page is at the middle pagination size 9', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 9;
    const itemsPerPage = 5;
    const totalPages = totalItems / itemsPerPage;

    currentPage = 6;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    expect(component.find('.current-page').length).toEqual(1);
    expect(component.find('.current-page').text()).toBe('6');

    // check current page neighbour elements
    expect(
      component
        .find('.page')
        .at(3)
        .text()
    ).toBe('4');
    expect(
      component
        .find('.page')
        .at(4)
        .text()
    ).toBe('5');
    expect(
      component
        .find('.page')
        .at(6)
        .text()
    ).toBe('7');
    expect(
      component
        .find('.page')
        .at(7)
        .text()
    ).toBe('8');

    // check first and last element position
    expect(
      component
        .find('.page')
        .at(1)
        .text()
    ).toBe('1');
    expect(
      component
        .find('.page')
        .at(9)
        .text()
    ).toBe(String(totalPages));

    // check breadcumps
    expect(
      component
        .find('.page')
        .at(2)
        .text()
    ).toBe('…');
    expect(
      component
        .find('.page')
        .at(8)
        .text()
    ).toBe('…');

    expect(component.find('.page').length).toBe(maximumPaginationSize + 2);
  });

  it('should render pagination if current page is at the beginning pagination size 9', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 9;
    const itemsPerPage = 5;
    const totalPages = totalItems / itemsPerPage;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    expect(component.find('.current-page').length).toEqual(2);
    expect(
      component
        .find('.current-page')
        .at(1)
        .text()
    ).toBe('1');

    expect(
      component
        .find('.page')
        .at(2)
        .text()
    ).toBe('2');
    expect(
      component
        .find('.page')
        .at(3)
        .text()
    ).toBe('3');
    expect(
      component
        .find('.page')
        .at(4)
        .text()
    ).toBe('4');
    expect(
      component
        .find('.page')
        .at(5)
        .text()
    ).toBe('5');
    expect(
      component
        .find('.page')
        .at(6)
        .text()
    ).toBe('6');
    expect(
      component
        .find('.page')
        .at(7)
        .text()
    ).toBe('7');
    expect(
      component
        .find('.page')
        .at(8)
        .text()
    ).toBe('…');
    expect(
      component
        .find('.page')
        .at(9)
        .text()
    ).toBe(String(totalPages));
    expect(component.find('.page').length).toBe(maximumPaginationSize + 2);
  });

  it('should render if current page is at the end pagination size 9', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 9;
    const itemsPerPage = 5;

    currentPage = 17;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    expect(component.find('.current-page').length).toEqual(2);

    expect(
      component
        .find('.page')
        .at(1)
        .text()
    ).toBe('1');
    expect(
      component
        .find('.page')
        .at(2)
        .text()
    ).toBe('…');
    expect(
      component
        .find('.page')
        .at(3)
        .text()
    ).toBe('11');
    expect(
      component
        .find('.page')
        .at(4)
        .text()
    ).toBe('12');
    expect(
      component
        .find('.page')
        .at(5)
        .text()
    ).toBe('13');
    expect(
      component
        .find('.page')
        .at(6)
        .text()
    ).toBe('14');
    expect(
      component
        .find('.page')
        .at(7)
        .text()
    ).toBe('15');
    expect(
      component
        .find('.page')
        .at(8)
        .text()
    ).toBe('16');
    expect(
      component
        .find('.current-page')
        .at(0)
        .text()
    ).toBe('17');
    expect(component.find('.page').length).toBe(maximumPaginationSize + 2);
  });

  it('should render if pagination size is bigger than total pages amount', () => {
    // arrange
    const totalItems = 40;
    const maximumPaginationSize = 9;
    const itemsPerPage = 5;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();

    expect(component.find('.current-page').length).toEqual(2);
    expect(
      component
        .find('.current-page')
        .at(1)
        .text()
    ).toBe('1');

    expect(
      component
        .find('.page')
        .at(1)
        .text()
    ).toBe('1');
    expect(
      component
        .find('.page')
        .at(2)
        .text()
    ).toBe('2');
    expect(
      component
        .find('.page')
        .at(3)
        .text()
    ).toBe('3');
    expect(
      component
        .find('.page')
        .at(4)
        .text()
    ).toBe('4');
    expect(
      component
        .find('.page')
        .at(5)
        .text()
    ).toBe('5');
    expect(
      component
        .find('.page')
        .at(6)
        .text()
    ).toBe('6');
    expect(
      component
        .find('.page')
        .at(7)
        .text()
    ).toBe('7');
    expect(
      component
        .find('.page')
        .at(8)
        .text()
    ).toBe('8');
  });

  it('should correct rounding number of pages and render it if page amount is not integer', () => {
    // arrange
    const totalItems = 20;
    const maximumPaginationSize = 7;
    const itemsPerPage = 6;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    // assert
    expect(component).toBeTruthy();
    // should be 4 pages and 2 navigation buttons
    expect(component.find('.page').length).toEqual(6);
  });

  it('should go to next page on next caret click', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 7;
    const itemsPerPage = 5;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    component.find('.sc-icon-caret-right').simulate('click');
    component.setProps({ currentPage });

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.current-page').length).toEqual(1);
    expect(component.find('.current-page').text()).toEqual('2');
  });

  it('should go to prev page on prev caret click', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 7;
    const itemsPerPage = 5;

    currentPage = 2;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    component.find('.sc-icon-caret-left').simulate('click');
    component.setProps({ currentPage });

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.current-page').length).toEqual(2);
    expect(
      component
        .find('.current-page')
        .at(1)
        .text()
    ).toEqual('1');
  });

  it('should go to page on page click', () => {
    // arrange
    const totalItems = 85;
    const maximumPaginationSize = 7;
    const itemsPerPage = 5;

    currentPage = 3;

    // act
    const component = mount(
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maximumPaginationSize={maximumPaginationSize}
        onChange={onChange}
      />
    );

    component
      .find('.page-label')
      .at(3)
      .simulate('click');
    component.setProps({ currentPage });

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.current-page').length).toEqual(1);
    expect(component.find('.current-page').text()).toEqual('3');
  });
});
