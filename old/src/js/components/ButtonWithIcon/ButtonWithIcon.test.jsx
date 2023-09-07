import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import createButtonWithIcon from './createButtonWithIcon';
import Button from '../Button/Button';

describe('createButtonWithIcon', () => {
  const ButtonWithCustomIcon = createButtonWithIcon(Button);

  describe('with default set of props', () => {
    let component;
    let errorConsole;

    beforeAll(() => {
      errorConsole = spyOn(console, 'error');
    });

    beforeEach(() => {
      component = mount(
        <ButtonWithCustomIcon iconClassName={'sc-some-icon-class'} adjustHeight={24}>
          A text for button
        </ButtonWithCustomIcon>
      );
    });

    it('matches snapshot', () => {
      expect(mountToJson(component)).toMatchSnapshot();
    });

    it('prints no errors from propTypes validation', () => {
      expect(errorConsole).not.toHaveBeenCalled();
    });
  });
});
