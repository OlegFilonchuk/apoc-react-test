import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import InlineEllipsis from './InlineEllipsis';

describe('InlineEllipsis', () => {
  let errorConsole;
  let component;

  beforeAll(() => {
    errorConsole = spyOn(console, 'error');
  });

  describe('with default set of props', () => {
    beforeEach(() => {
      component = mount(<InlineEllipsis>Hello world</InlineEllipsis>);
    });

    it('matches snapshot', () => expect(mountToJson(component)).toMatchSnapshot());
  });

  it('prints no errors from propTypes validation', () => {
    expect(errorConsole).not.toHaveBeenCalled();
  });
});
