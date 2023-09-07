import React from 'react';
import { mount } from 'enzyme';

import pascalCase from '../../utils/pascalCase';
import IconButton from './IconButton';
import IconButtonPresets from './IconButtonPresets';
import Button from '../Button/Button';
import { getDataTestElementProps } from '../../utils/dataTestElementPropUtils';

// TODO: write more tests!
describe('<IconButton />', () => {
  describe('used with a preset', () => {
    Object.keys(IconButtonPresets).forEach(key => {
      const presetName = pascalCase(key);
      const Preset = IconButton[presetName];

      it(`should render <IconButton.${presetName} /> component`, () => {
        // act
        const component = mount(<Preset {...getDataTestElementProps('testDataTestElement')} />);

        // assert
        expect(component).toMatchSnapshot();
      });
    });
  });

  it('to render a Button', () => {
    const component = mount(<IconButton.Default {...getDataTestElementProps('testDataTestElement')} />);

    expect(component.find(Button)).toMatchSnapshot();
  });

  describe('with disabled prop', () => {
    it('shoud have the button disabled', () => {
      const component = mount(<IconButton.Default disabled />);

      expect(component.find(Button).props().disabled).toEqual(true);
    });
  });

  describe('with compact prop', () => {
    it('shoud have the icon-button--compact class', () => {
      const component = mount(<IconButton.Default compact />);

      expect(component.find(Button).hasClass('icon-button--compact')).toEqual(true);
    });
  });

  describe('with onClick prop', () => {
    it('to respond to click events', () => {
      let timesClicked = 0;
      const clickSpy = () => {
        timesClicked += 1;
      };

      const component = mount(<IconButton.Default onClick={clickSpy} />);

      component.find(Button).simulate('click');
      component.find(Button).simulate('click');
      component.find(Button).simulate('click');

      expect(timesClicked).toEqual(3);
    });
  });
});
