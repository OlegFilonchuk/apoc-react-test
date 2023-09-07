import React from 'react';
import { shallow, mount } from 'enzyme';

import DurationEditor from './DurationEditor';
import { KEY_CODES } from '../../utils/constants';

const focusAndChange = (input, value) => {
  input.simulate('focus');
  input.simulate('change', { target: { value } });
};

describe('<DurationEditor />', () => {
  const durationEditorClass = 'duration-editor';
  let point;

  beforeEach(() => {
    point = {
      x: 40,
      y: 0
    };
  });

  const testOnInputCallback = (eventType, eventData) => {
    const onInputChange = jest.fn();
    const durationEditor = mount(<DurationEditor point={point} onInputChange={onInputChange} />);
    const inputTestValue = 20;

    const input = durationEditor.find('input').last();

    focusAndChange(input, 'invalid');
    input.simulate(eventType, eventData);
    focusAndChange(input, inputTestValue);

    expect(onInputChange).not.toHaveBeenCalled();

    input.simulate(eventType, eventData);

    expect(onInputChange).toHaveBeenCalledWith(inputTestValue);
  };

  it('should render DurationEditor element', () => {
    const durationEditor = shallow(<DurationEditor point={point} />);

    expect(durationEditor).toBePresent();
  });

  it('should have classes when focusing on input', () => {
    const durationEditor = mount(<DurationEditor point={point} />);

    const input = durationEditor.find('input').first();

    const pointContainer = durationEditor.find(`.${durationEditorClass}`);
    const sliderContainer = durationEditor.find(`.${durationEditorClass}__slider-container__slider`);

    expect(pointContainer).not.toHaveClassName(`${durationEditorClass}--onTop`);
    expect(sliderContainer).not.toHaveClassName(`${durationEditorClass}__slider-container__slider--show`);

    input.simulate('focus');

    expect(pointContainer.getDOMNode().className).toContain(`${durationEditorClass}--onTop`);
    expect(sliderContainer.getDOMNode().className).toContain(`${durationEditorClass}__slider-container__slider--show`);
  });

  it('should fire onInputChange only when user changes input value to something valid and presses enter', () => {
    testOnInputCallback('keyUp', {
      keyCode: KEY_CODES.ENTER
    });
  });

  it('should fire onInputChange only when user changes input value to something valid and blurs out of input', () => {
    testOnInputCallback('blur');
  });
});
