import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox, { labelPositions } from './Checkbox';

describe('<Checkbox />', () => {
  it('renders input[type="checkbox"] wrapped in html structure', () => {
    const checkbox = shallow(<Checkbox label={'adasdas'} />);

    expect(checkbox).toBePresent();

    const squareCheckbox = checkbox.find('.square-checkbox');

    expect(squareCheckbox).toBePresent();

    const square = squareCheckbox.find('.square-checkbox-square');
    const label = squareCheckbox.find('.square-checkbox__label');

    expect(square).toBePresent();
    expect(label).toBePresent();

    const realCheckbox = square.find('input[type="checkbox"]');
    const spanForDrawingCheckbox = square.find('span');

    expect(realCheckbox).toBePresent();
    expect(spanForDrawingCheckbox).toBePresent();
  });

  it('renders with label positioned to right from checkbox by default', () => {
    const checkbox = shallow(<Checkbox label={'asadasd'} />);

    expect(
      checkbox
        .find('.square-checkbox')
        .children()
        .first()
    ).toHaveClassName('square-checkbox-square');
    expect(
      checkbox
        .find('.square-checkbox')
        .children()
        .last()
    ).toHaveClassName('square-checkbox__label');
  });

  it('prop labelPosition controls position correctly', () => {
    const checkboxWithLabelToLeft = shallow(<Checkbox label={'adasd'} labelPosition={labelPositions.left} />);

    expect(
      checkboxWithLabelToLeft
        .find('.square-checkbox')
        .children()
        .first()
    ).toHaveClassName('square-checkbox__label');
    expect(
      checkboxWithLabelToLeft
        .find('.square-checkbox')
        .children()
        .last()
    ).toHaveClassName('square-checkbox-square');

    const checkboxWithLabelToRight = shallow(<Checkbox label={'asdasd'} labelPosition={labelPositions.right} />);

    expect(
      checkboxWithLabelToRight
        .find('.square-checkbox')
        .children()
        .first()
    ).toHaveClassName('square-checkbox-square');
    expect(
      checkboxWithLabelToRight
        .find('.square-checkbox')
        .children()
        .last()
    ).toHaveClassName('square-checkbox__label');
  });

  it('prop fullWidth=true adds css class', () => {
    const checkboxWithDefaultFullWidthValue = shallow(<Checkbox label={'asdasds'} />);
    const notFullWidthCheckbox = shallow(<Checkbox label={'asdasd'} fullWidth={false} />);

    expect(checkboxWithDefaultFullWidthValue.find('.square-checkbox')).not.toHaveClassName(
      'square-checkbox-full-width'
    );
    expect(notFullWidthCheckbox.find('.square-checkbox')).not.toHaveClassName('square-checkbox-full-width');

    const checkbox = shallow(<Checkbox label={'asdads'} fullWidth />);

    expect(checkbox.find('.square-checkbox')).toHaveClassName('square-checkbox-full-width');
  });

  it('prop label adds renders text', () => {
    const checkbox = shallow(<Checkbox label={'Abracadabra!'} />);

    expect(checkbox.find('.square-checkbox__label')).toHaveText('Abracadabra!');
  });

  it('prop label adds renders element', () => {
    const checkbox = shallow(<Checkbox label={<span>text in span</span>} />);

    const elementInLabel = checkbox.find('.square-checkbox__label').children('span');

    expect(elementInLabel.length).toEqual(1);
    expect(elementInLabel).toHaveText('text in span');
  });

  describe('when prop disabled is set', () => {
    describe('to `true`', () => {
      it('renders disabled component', () => {
        const wrapper = mount(<Checkbox label="test" disabled />);

        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });
    describe('to `false`', () => {
      it('renders enabled component', () => {
        const wrapper = mount(<Checkbox label="test" disabled={false} />);

        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });
  });

  describe('when onChange event is triggered on <input/>', () => {
    it('should have onChange callback called once', () => {
      const onChangeCallback = jest.fn();

      const checkbox = mount(<Checkbox label={<span>text in span</span>} onChange={onChangeCallback} />);

      expect(checkbox.find('input')).toBePresent();
      checkbox.find('input').simulate('change', {
        // we are simulating the real values from the browser
        target: {
          name: 'some-checkbox', // browser will call the event with target.name being the 'name' attribute
          checked: true // and here with target.checked being true/false whether the checkbox is checked or not
        }
      });

      expect(onChangeCallback).toHaveBeenCalledTimes(1);
      expect(onChangeCallback).toHaveBeenCalledWith(
        jasmine.objectContaining({
          target: {
            name: 'some-checkbox',
            checked: true
          }
        })
      );
    });
  });

  describe('alt text', () => {
    const label = 'some.label.content';
    const title = 'some.title.content';

    let checkBox;

    function mountCheckbox(showHint) {
      checkBox = shallow(<Checkbox label={label} tooltip={title} showHint={showHint} />);
    }

    const testLabeltTitle = expectedValue => {
      const labelElement = checkBox.find('.square-checkbox__label');
      const result = labelElement.props().title;

      expect(result).toEqual(expectedValue);
    };

    it('should have correct HTML structure', () => {
      const showHint = true;

      mount(<Checkbox label={label} tooltip={title} showHint={showHint} />);

      expect(checkBox).toMatchSnapshot();
    });

    it('should add a title on label element', () => {
      const showHint = true;

      // add something
      mountCheckbox(showHint);

      testLabeltTitle(title);
    });

    it('should not add a title on label element', () => {
      const showHint = false;

      mountCheckbox(showHint);

      testLabeltTitle(null);
    });
  });

  describe('className', () => {
    const className = 'some-class-name';

    let checkBox;

    function mountCheckbox(additionalClassName) {
      checkBox = shallow(<Checkbox label="some.label.content" className={additionalClassName} />);
    }

    const testClassNamePresence = expectedClassNamePresence => {
      const classNameIsPresent = checkBox.find(`.${className}`).length !== 0;

      expect(classNameIsPresent).toEqual(expectedClassNamePresence);
    };

    it('should add an additional classname for label', () => {
      mountCheckbox(className);

      testClassNamePresence(true);
    });

    it('should not add an additional classname for label', () => {
      mountCheckbox('');

      testClassNamePresence(false);
    });
  });
});
