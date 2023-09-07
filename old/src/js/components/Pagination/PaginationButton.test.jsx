import React from 'react';
import { mount } from 'enzyme';

import PaginationButton from './PaginationButton';

describe('<PaginationButton/>', () => {
  it('should render PaginationButton component', () => {
    // arrange
    const expectedCurrentPage = 0;
    const onClick = jest.fn();
    const isCurrentPage = false;
    const isBreadcrumbs = false;

    // act
    const component = mount(
      <PaginationButton onClick={onClick} isBreadcrumbs={isBreadcrumbs} currentPage={isCurrentPage} label={1} />
    );

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.current-page').length).toEqual(expectedCurrentPage);
    expect(component.find('.page-label').text()).toBe('1');
  });

  it('should render PaginationButton component with current page', () => {
    // arrange
    const expectedCurrentPage = 1;
    const onClick = jest.fn();
    const isCurrentPage = true;
    const isBreadcrumbs = false;

    // act
    const component = mount(
      <PaginationButton onClick={onClick} isBreadcrumbs={isBreadcrumbs} currentPage={isCurrentPage} label={2} />
    );

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.current-page').length).toEqual(expectedCurrentPage);
    expect(component.find('.current-page').text()).toBe('2');
  });

  it('should render PaginationButton component with breadcrumbs delimiter', () => {
    // arrange
    const expectedButtonContent = '…';
    const onClick = jest.fn();
    const isCurrentPage = false;
    const isBreadcrumbs = true;

    // act
    const component = mount(
      <PaginationButton onClick={onClick} isBreadcrumbs={isBreadcrumbs} currentPage={isCurrentPage} />
    );

    // assert
    expect(component).toBeTruthy();
    expect(component.find('.page-break').length).toBe(1);
    expect(component.find('.page-break').text()).toBe(expectedButtonContent);
  });

  it('should call onClick prop function on click event', () => {
    // arrange
    const onClick = jest.fn();
    const isCurrentPage = false;
    const isBreadcrumbs = false;

    // act
    const component = mount(
      <PaginationButton onClick={onClick} isBreadcrumbs={isBreadcrumbs} currentPage={isCurrentPage} label={1} />
    );

    // assert
    component.find('.page-label').simulate('click');
    expect(component).toBeTruthy();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
