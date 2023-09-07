import React from 'react';
import { mount } from 'enzyme';

import withCharactersLimit from './withCharactersLimit';

describe('withCharactersLimit HoC', () => {
  const BaseComponent = props => <input {...props} />;

  BaseComponent.displayName = 'BaseComponent';

  const mountWithCharactersLimit = (props, mountFn = mount) => {
    const ComponentWithCharacterLimit = withCharactersLimit(BaseComponent);

    return mountFn(<ComponentWithCharacterLimit {...props} />);
  };

  describe('render component', () => {
    it('should render div with characters limit', () => {
      const component = mountWithCharactersLimit({ value: 'test', maxLength: 10 });

      expect(component).toMatchSnapshot();
    });
  });

  describe('character limit', () => {
    it('should calculate proper left symbols count', () => {
      const component = mountWithCharactersLimit({ maxLength: 16, value: 'test' });
      const expectedCountBefore = '12';

      expect(component.find('.input-field__char-limit-counter__text').text()).toEqual(expectedCountBefore);

      const newValue = 'testtest';
      const expectedCountAfter = '8';

      component.setProps({ value: newValue });

      expect(component.find('.input-field__char-limit-counter__text').text()).toEqual(expectedCountAfter);
    });
  });
});
