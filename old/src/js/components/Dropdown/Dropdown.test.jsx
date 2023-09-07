import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';
import DropdownOptionLink from './DropdownOptionLink';
import DropdownButton from './DropdownButton';

describe('<Dropdown>', () => {
  describe('custom props types validators', () => {
    describe('children', () => {
      describe('of wrong type', () => {
        it('returns error', () => {
          const validationResult = Dropdown.propTypes.children({ children: <div>test</div> });

          expect(validationResult).toEqual(jasmine.any(Error));
        });
      });

      describe('of <DropdownOption> type but not unique values', () => {
        it('returns error', () => {
          spyOn(PropTypes.node, 'isRequired').and.returnValue(null);

          const validationResult = Dropdown.propTypes.children({
            children: [
              <DropdownOption label={'Valebat clemens acipenser est.'} value={'xx'} />,
              <DropdownOption label={'Valebat clemens acipenser est.'} value={'xx'} />
            ]
          });

          expect(validationResult).toEqual(jasmine.any(Error));
        });
      });
    });

    describe('name', () => {
      describe('PropTypes.string', () => {
        it('returns retrieved error', () => {
          const error = new Error();

          spyOn(PropTypes, 'string').and.returnValue(error);

          const validationResult = Dropdown.propTypes.name();

          expect(validationResult).toBe(error);
        });
      });

      describe('notEmpty', () => {
        it('returns null', () => {
          spyOn(PropTypes, 'string').and.returnValue(null);

          const validationResult = Dropdown.propTypes.name({
            name: 'some name'
          });

          expect(validationResult).toEqual(null);
        });
      });

      describe('isEmpty', () => {
        it('returns null when children is <DropdownOption> ', () => {
          spyOn(PropTypes, 'string').and.returnValue(null);
          const validationResult = Dropdown.propTypes.name({
            children: <DropdownOption value={'adasd'} label={'adsasdad'} />,
            name: null
          });

          expect(validationResult).toEqual(jasmine.any(Error));
        });

        it('returns null when children is <DropdownOptionLink>', () => {
          spyOn(PropTypes, 'string').and.returnValue(null);
          const validationResult = Dropdown.propTypes.name({
            children: <DropdownOptionLink label={'adas'} href={'#'} />,
            name: null
          });

          expect(validationResult).toEqual(null);
        });
      });
    });
  });

  describe('with <DropdownOption>', () => {
    const onChange = () => true;

    it('should be rendered properly', () => {
      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />} name={'name'}>
          <DropdownOption label={'Label'} value={'some value'} />
        </Dropdown>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render by default first option as selected', () => {
      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />} name={'name'}>
          <DropdownOption label={'Label'} value={'asdas'} />
          <DropdownOption label={'Label'} value={'sadasd'} />
          <DropdownOption label={'Label'} value={'xcvxcv'} />
        </Dropdown>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render third option as selected', () => {
      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />} name="name">
          <DropdownOption label={'Label'} value={'asdas'} />
          <DropdownOption label={'Label'} value={'zxcvc'} />
          <DropdownOption label={'Label'} selected value={'asdasd'} />
        </Dropdown>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should change selected option when children are updated', () => {
      const getOptions = selectedIndex =>
        ['0', '1', '2'].map(option => (
          <DropdownOption key={option} label={`Option ${option}`} value={option} selected={option === selectedIndex} />
        ));

      const optionsBefore = getOptions();

      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />} name={'name'}>
          {optionsBefore}
        </Dropdown>
      );

      const optionsAfter = getOptions('2');

      wrapper.setProps({ children: optionsAfter });

      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.state('currentOption').value).toEqual('2');
    });

    it('should change selected option to first one when children are updated none of them are selected', () => {
      const getOptions = selectedIndex =>
        ['0', '1', '2'].map(option => (
          <DropdownOption key={option} label={`Option ${option}`} value={option} selected={option === selectedIndex} />
        ));

      const optionsBefore = getOptions('2');

      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />} name={'name'}>
          {optionsBefore}
        </Dropdown>
      );

      const optionsAfter = getOptions();

      wrapper.setProps({ children: optionsAfter });

      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.state('currentOption').value).toEqual('0');
    });
  });

  describe('with <DropdownOptionLink>', () => {
    const onChange = () => true;

    it('should be rendered properly', () => {
      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
        </Dropdown>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('when closed', () => {
    const onChange = () => true;

    it('button click should opens it', () => {
      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />} name={'name'}>
          <DropdownOption label={'Label'} value={'asdad'} />
        </Dropdown>
      );

      expect(wrapper.state().isOpen).toBeFalsy();
      wrapper.find('button').simulate('click');
      expect(wrapper.state().isOpen).toBeTruthy();
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('closeOnOutsideClick() does not change its state', () => {
      const wrapper = mount(
        <Dropdown onChange={onChange} button={<DropdownButton />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
        </Dropdown>
      );

      expect(wrapper.state().isOpen).toBeFalsy();

      wrapper.instance().closeOnOutsideClick();

      expect(wrapper.state().isOpen).toBeFalsy();
    });
  });

  describe('when open', () => {
    const onChange = () => true;

    describe('button', () => {
      it('should close it', () => {
        const wrapper = shallow(
          <Dropdown onChange={onChange} button={<button />} name={'name'}>
            <DropdownOption label={'Label'} value={'asdasd'} />
          </Dropdown>
        );

        wrapper.setState({ isOpen: true });
        wrapper.find(DropdownOption).simulate('click');
        expect(wrapper.state().isOpen).toBeFalsy();
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });

    describe('closeOnOutsideClick()', () => {
      it('should close <Dropdown> if clicked on outside of <Dropdown>', () => {
        const wrapper = mount(
          <Dropdown onChange={onChange} button={<DropdownButton />}>
            <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
          </Dropdown>
        );

        wrapper.setState({ isOpen: true });

        expect(wrapper.state().isOpen).toBeTruthy();

        wrapper.instance().root.contains = () => false;

        wrapper.instance().closeOnOutsideClick({});

        expect(wrapper.state().isOpen).toBeFalsy();
      });

      it('should close <Dropdown> if is clicked itself ', () => {
        const wrapper = mount(
          <Dropdown onChange={onChange} button={<DropdownButton />}>
            <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
          </Dropdown>
        );

        wrapper.setState({ isOpen: true });

        expect(wrapper.state().isOpen).toBeTruthy();

        wrapper.instance().closeOnOutsideClick({
          target: wrapper.root
        });

        expect(wrapper.state().isOpen).toBeFalsy();
      });

      it('should not do anything if any child of <Dropdown> is clicked', () => {
        const wrapper = mount(
          <Dropdown onChange={onChange} button={<DropdownButton />}>
            <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
          </Dropdown>
        );

        wrapper.setState({ isOpen: true });

        expect(wrapper.state().isOpen).toBeTruthy();

        wrapper.instance().root.contains = () => true;

        wrapper.instance().closeOnOutsideClick({});

        expect(wrapper.state().isOpen).toBeTruthy();
      });
    });
  });

  describe('should not overwrite sub component callbacks such as', () => {
    const onChange = () => true;

    it('onClick of <DropdownOption>', () => {
      const onClickSpy = jest.fn();

      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />} name={'afalsis'}>
          <DropdownOption label={'Eheu, domina!'} onClick={onClickSpy} value={'adasds'} />
        </Dropdown>
      );

      expect(onClickSpy).toHaveBeenCalledTimes(0);

      wrapper.find(DropdownOption).simulate('click');

      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('onClick of <DropdownOptionLink>', () => {
      const onClickSpy = jest.fn();

      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} onClick={onClickSpy} />
        </Dropdown>
      );

      expect(onClickSpy).toHaveBeenCalledTimes(0);

      wrapper.find(DropdownOptionLink).simulate('click');

      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('onClick of any button', () => {
      const onClickSpy = jest.fn();

      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button onClick={onClickSpy} />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
        </Dropdown>
      );

      expect(onClickSpy).toHaveBeenCalledTimes(0);

      wrapper.find('button').simulate('click');

      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('onKeyDown of any button', () => {
      const onKeyDown = jest.fn();

      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button onKeyDown={onKeyDown} />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
        </Dropdown>
      );

      expect(onKeyDown).toHaveBeenCalledTimes(0);

      wrapper.find('button').simulate('keyDown');

      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('onChange should be', () => {
    describe('called on', () => {
      it('<DropdownOption> click', () => {
        const onChange = jest.fn();

        const wrapper = shallow(
          <Dropdown button={<button />} onChange={onChange} name={'name'}>
            <DropdownOption label={'Eheu, domina!'} value={'asda'} />
            <DropdownOption label={'Eheu, domina!'} value={'test'} />
          </Dropdown>
        );

        wrapper
          .find(DropdownOption)
          .at(1)
          .simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          name: '',
          value: 'test',
          label: 'Eheu, domina!',
          disabled: false,
          selected: false,
          onClick: jasmine.any(Function),
          showPopupOnHover: false,
          className: '',
          icon: ''
        });

        wrapper
          .find(DropdownOption)
          .at(1)
          .simulate('click');
      });
    });

    describe('not be called on', () => {
      it('<DropdownOptionLink> click', () => {
        const onChange = jest.fn();

        const wrapper = shallow(
          <Dropdown button={<button />} onChange={onChange}>
            <DropdownOptionLink label={'Eheu, domina!'} href={'first'} />
            <DropdownOptionLink label={'Eheu, domina!'} href={'second'} />
          </Dropdown>
        );

        wrapper
          .find(DropdownOptionLink)
          .at(1)
          .simulate('click');
        wrapper
          .find(DropdownOptionLink)
          .at(0)
          .simulate('click');

        expect(onChange).toHaveBeenCalledTimes(0);
      });

      it('on button keyDown when the <Dropdown> is open and key is neither arrow up nor arrow down', () => {
        const onChange = jest.fn();

        const wrapper = shallow(
          <Dropdown button={<button />} onChange={onChange} name={'some name'}>
            <DropdownOption label={'Eheu, domina!'} value={'first'} />
            <DropdownOption label={'Eheu, domina!'} value={'second'} />
          </Dropdown>
        );

        wrapper.setState({ isOpen: true });

        // other key than arrow up or arrow down
        wrapper.find('button').simulate('keyDown', { preventDefault: () => {}, keyCode: 55 });

        expect(onChange).not.toHaveBeenCalled();
      });

      it('on button keyDown when the <Dropdown> is closed and key is arrow down', () => {
        const onChange = jest.fn();

        const wrapper = shallow(
          <Dropdown button={<button />} onChange={onChange} name={'name'}>
            <DropdownOption label={'Eheu, domina!'} value={'first'} />
            <DropdownOption label={'Eheu, domina!'} value={'second'} />
          </Dropdown>
        );

        wrapper.find('button').simulate('keyDown', { preventDefault: () => {}, keyCode: 40 });

        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('should add proper class name', () => {
    const onChange = () => true;

    it('when className prop was passed', () => {
      const wrapper = mount(
        <Dropdown onChange={onChange} button={<DropdownButton className="foo" />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
        </Dropdown>
      );

      const expectedResultNodes = wrapper.find('.foo');
      const unexpectedResultNodes = wrapper.find('.sc-btn-default');

      expect(expectedResultNodes.length).toBeTruthy();
      expect(unexpectedResultNodes.length).toBeFalsy();
    });

    it('when className prop was not passed', () => {
      const wrapper = mount(
        <Dropdown onChange={onChange} button={<DropdownButton />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
        </Dropdown>
      );

      const resultNodes = wrapper.find('.sc-btn-default');

      expect(resultNodes.length).toBeTruthy();
    });
  });

  describe('should add and remove event listener onClick "closeOnOutsideClick" callback from document', () => {
    it('when mounted and unmounted', () => {
      const onChange = () => true;

      spyOn(window.document, 'addEventListener');
      spyOn(window.document, 'removeEventListener');

      const wrapper = mount(
        <Dropdown onChange={onChange} button={<DropdownButton />}>
          <DropdownOptionLink label={'Eheu, domina!'} href={'afalsis'} />
        </Dropdown>
      );

      const eventCallback = wrapper.instance().closeOnOutsideClick;

      expect(window.document.addEventListener).toHaveBeenCalledWith('click', eventCallback);
      expect(window.document.removeEventListener).not.toHaveBeenCalled();

      wrapper.unmount();

      expect(window.document.removeEventListener).toHaveBeenCalledWith('click', eventCallback);
    });
  });

  describe('with text inside button prop', () => {
    const buttonText = "Hi, I'm button's text";

    it('should render text if no <DropdownOption> is pre-selected', () => {
      const wrapper = shallow(
        <Dropdown button={<button>{buttonText}</button>}>
          <DropdownOption label={'Eheu, domina!'} value={'afalsis'} />
        </Dropdown>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render pre-selected option label nevertheless', () => {
      const wrapper = shallow(
        <Dropdown button={<button>{buttonText}</button>}>
          <DropdownOption selected label={'Eheu, domina!'} value={'afalsis'} />
        </Dropdown>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('this text will be changed if some DD option will be selected', () => {
      const onChange = jest.fn();
      const wrapper = shallow(
        <Dropdown onChange={onChange} button={<button>{buttonText}</button>}>
          <DropdownOption label={'Eheu, domina!'} value={'afalsis'} />
          <DropdownOption label={'domina, Eheu!'} value={'afalsis'} />
        </Dropdown>
      );

      expect(wrapper.find('button').text()).toBe(buttonText);
      expect(wrapper.state().currentOption.label).toBe('Eheu, domina!');

      wrapper.update();
      wrapper.instance().forceUpdate();
      wrapper
        .find(DropdownOption)
        .at(1)
        .simulate('click');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(wrapper.state().currentOption.label).toBe('domina, Eheu!');
      expect(wrapper.find('button').text()).toBe('domina, Eheu!');
    });
  });

  describe('with withSuffix prop', () => {
    it('should add suffix and proper suffix wrapper classname', () => {
      const suffixData = {
        suffix: 'suf',
        suffixWrapperClassName: 'some-class'
      };
      const buttonText = "Hi, I'm button's text";

      const wrapper = shallow(
        <Dropdown withSuffix={suffixData} button={<button>{buttonText}</button>}>
          <DropdownOption label={'Eheu, domina!'} value={'afalsis'} />
        </Dropdown>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

describe('<DropdownOption>', () => {
  describe('prop isChecked', () => {
    it('when false it does not render sc-focus class', () => {
      const wrapper = shallow(<DropdownOption label={'some label'} name={'some name'} value={'some value'} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('when true it renders sc-focus class', () => {
      const onChange = () => true;

      const wrapper = shallow(
        <DropdownOption onChange={onChange} selected label={'some label'} name={'some name'} value={'some value'} />
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('should add and remove title attribute to label', () => {
    it('when showPopupOnHover prop is true', () => {
      const label = 'show this on hover';

      const wrapper = mount(<DropdownOption label={label} href={'https://'} showPopupOnHover />);

      const labelElement = wrapper.find('label');

      expect(labelElement.length).toBeTruthy();
      expect(labelElement.getDOMNode().getAttribute('title')).toEqual(label);
    });

    it('when showPopupOnHover prop is false', () => {
      const wrapper = mount(<DropdownOption label={'some label text'} href={'https://'} />);

      const labelElement = wrapper.find('label');

      expect(labelElement.length).toBeTruthy();
      expect(labelElement.getDOMNode().getAttribute('title')).toBeNull();
    });
  });
});

describe('<DropdownOptionLink>', () => {
  it('renders', () => {
    const wrapper = shallow(<DropdownOptionLink label={'some label'} href={'#'} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
