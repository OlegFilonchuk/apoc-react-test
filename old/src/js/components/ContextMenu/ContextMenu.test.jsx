import React from 'react';

import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ContextMenu from './ContextMenu';
import ContextOption from './ContextOption';
import ContextOptionLink from './ContextOptionLink';

jest.mock('rc-util/lib/Portal', () => ({ children }) => children);

jest.useFakeTimers();

describe('<ContextMenu>', () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'offsetWidth', {
      value: 0
    });
  });

  describe('when renders', () => {
    let wrapper;
    const onClick = () => true;

    beforeEach(() => {
      wrapper = mount(
        <ContextMenu>
          <ContextOptionLink onClick={onClick} href="#">
            Edit
          </ContextOptionLink>
          <ContextOption onClick={onClick}>Rename</ContextOption>
          <ContextOption onClick={onClick}>Duplicate</ContextOption>
          <ContextOption onClick={onClick}>Delete</ContextOption>
        </ContextMenu>
      );
    });

    afterEach(() => {
      jest.clearAllTimers();
      wrapper = null;
    });

    it('should render correct markup', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should be closed by default', () => {
      expect(wrapper.state().isOpen).toBeFalsy();
    });

    it('should render with empty title', () => {
      expect(wrapper.find('.context-menu__button')).toHaveProp('title', '');
    });
  });

  it('should allow customizing menu button', () => {
    const CUSTOM_TITLE = 'asdfawer';
    const onButtonClick = jest.fn();
    const onButtonMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const optionClick = () => true;
    const wrapper = mount(
      <ContextMenu
        ButtonComponent={props => (
          <div {...props} className="custom-menu-button">
            hello world
          </div>
        )}
        title={CUSTOM_TITLE}
        onButtonClick={onButtonClick}
        onButtonMouseOver={onButtonMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <ContextOptionLink href="#">Edit</ContextOptionLink>
        <ContextOption onClick={optionClick}>Rename</ContextOption>
        <ContextOption onClick={optionClick}>Duplicate</ContextOption>
        <ContextOption onClick={optionClick}>Delete</ContextOption>
      </ContextMenu>
    );

    const customButtonWrapper = wrapper.find('.custom-menu-button');

    expect(customButtonWrapper.length).toEqual(1);

    // should receive all the props from context menu
    expect(customButtonWrapper).toHaveProp('title', CUSTOM_TITLE);

    customButtonWrapper.simulate('click');
    expect(onButtonClick).toHaveBeenCalled();

    customButtonWrapper.simulate('mouseOver');
    expect(onButtonMouseOver).toHaveBeenCalled();

    customButtonWrapper.simulate('mouseLeave');
    expect(onMouseLeave).toHaveBeenCalled();
    jest.clearAllTimers();
  });

  describe('when passing custom title property', () => {
    let wrapper;
    const CUSTOM_TITLE = 'FOO';
    const onClick = () => true;

    beforeEach(() => {
      wrapper = mount(
        <ContextMenu title={CUSTOM_TITLE}>
          <ContextOptionLink onClick={onClick} href="#">
            Edit
          </ContextOptionLink>
          <ContextOption onClick={onClick}>Rename</ContextOption>
          <ContextOption onClick={onClick}>Duplicate</ContextOption>
          <ContextOption onClick={onClick}>Delete</ContextOption>
        </ContextMenu>
      );
    });

    afterEach(() => {
      jest.clearAllTimers();
      wrapper = null;
    });

    it('should render with custom title', () => {
      expect(wrapper.find('.context-menu__button')).toHaveProp('title', CUSTOM_TITLE);
    });
  });

  describe('when user clicks on ContextButton', () => {
    const mountPoint = document.createElement('div');
    let contextMenu;
    let button;
    const onClick = () => true;

    beforeEach(() => {
      contextMenu = ReactDOM.render(
        <ContextMenu>
          <ContextOptionLink onClick={onClick} href="#!projects">
            Edit
          </ContextOptionLink>
          <ContextOption onClick={onClick}>Rename</ContextOption>
          <ContextOption onClick={onClick}>Duplicate</ContextOption>
          <ContextOption onClick={onClick}>Delete</ContextOption>
        </ContextMenu>,
        mountPoint
      );
      button = TestUtils.findRenderedDOMComponentWithClass(contextMenu, 'context-menu__button');
    });

    afterEach(() => {
      jest.clearAllTimers();
      contextMenu = null;
      button = null;
      ReactDOM.unmountComponentAtNode(mountPoint);
    });

    describe('and ContextMenu is not visible', () => {
      it('should show menu', () => {
        TestUtils.Simulate.mouseDown(button, { button: 0 });

        expect(contextMenu.state.isOpen).toBeTruthy();
      });
    });

    describe('and ContextMenu is expanded', () => {
      it('should hide menu', () => {
        // open
        TestUtils.Simulate.mouseDown(button, { button: 0 });

        expect(contextMenu.state.isOpen).toBeTruthy();

        TestUtils.Simulate.mouseDown(button, { button: 0 });

        expect(contextMenu.state.isOpen).toBeFalsy();
      });
    });
  });

  describe('when user hovers ContextButton', () => {
    const onClick = () => true;

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should call onButtonClick() callback once', () => {
      const onButtonClickSpy = jest.fn();

      const wrapper = mount(
        <ContextMenu onButtonClick={onButtonClickSpy}>
          <ContextOptionLink onClick={onClick} href="#!projects">
            Edit
          </ContextOptionLink>
          <ContextOption onClick={onClick}>Rename</ContextOption>
          <ContextOption onClick={onClick}>Duplicate</ContextOption>
          <ContextOption onClick={onClick}>Delete</ContextOption>
        </ContextMenu>
      );

      wrapper.simulate('click');

      expect(onButtonClickSpy).toHaveBeenCalled();
    });

    it('should call onButtonMouseOver callback', () => {
      const onButtonMouseOver = jest.fn();

      const wrapper = mount(
        <ContextMenu onButtonMouseOver={onButtonMouseOver}>
          <ContextOptionLink onClick={onClick} href="#!projects">
            Edit
          </ContextOptionLink>
          <ContextOption onClick={onClick}>Rename</ContextOption>
          <ContextOption onClick={onClick}>Duplicate</ContextOption>
          <ContextOption onClick={onClick}>Delete</ContextOption>
        </ContextMenu>
      );

      wrapper.find('ContextButton button').simulate('mouseover');

      expect(onButtonMouseOver).toHaveBeenCalled();
    });
  });

  describe('when user moves mouse out of the ContextButton', () => {
    const mountPoint = document.createElement('div');
    const onClick = () => true;
    const onMenuMouseOver = jest.fn();
    const onMenuMouseLeave = jest.fn();

    let contextMenu;
    let button;

    beforeEach(() => {
      contextMenu = ReactDOM.render(
        <ContextMenu onMenuMouseOver={onMenuMouseOver} onMenuMouseLeave={onMenuMouseLeave}>
          <ContextOptionLink onClick={onClick} href="#">
            Edit
          </ContextOptionLink>
          <ContextOption onClick={onClick}>Rename</ContextOption>
          <ContextOption onClick={onClick}>Duplicate</ContextOption>
          <ContextOption onClick={onClick}>Delete</ContextOption>
        </ContextMenu>,
        mountPoint
      );
      button = TestUtils.findRenderedDOMComponentWithClass(contextMenu, 'context-menu__button');
    });

    afterEach(() => {
      jest.clearAllTimers();
      contextMenu = null;
      button = null;
      ReactDOM.unmountComponentAtNode(mountPoint);
      document.body.innerHTML = '';
    });

    describe('and not over the context menu', () => {
      it('should hide menu', () => {
        TestUtils.Simulate.mouseDown(button, { button: 0 });
        expect(contextMenu.state.isOpen).toBeTruthy();

        contextMenu.hideOnButtonLeave();

        jest.runAllTimers();

        expect(contextMenu.state.isOpen).toBeFalsy();
      });
    });

    describe('and takes it over the context menu', () => {
      it('should not hide menu', () => {
        TestUtils.Simulate.mouseDown(button, { button: 0 });
        expect(contextMenu.state.isOpen).toBeTruthy();

        contextMenu.hideOnButtonLeave();

        const menuList = TestUtils.findRenderedDOMComponentWithTag(contextMenu, 'ul');

        TestUtils.Simulate.mouseOver(menuList);

        expect(onMenuMouseOver).toHaveBeenCalled();

        jest.runAllTimers();

        expect(contextMenu.state.isOpen).toBeTruthy();
      });

      it('should hide menu on mouseleave menu', () => {
        TestUtils.Simulate.mouseDown(button, { button: 0 });
        expect(contextMenu.state.isOpen).toBeTruthy();

        const menuList = TestUtils.findRenderedDOMComponentWithTag(contextMenu, 'ul');

        TestUtils.Simulate.mouseLeave(menuList);

        expect(onMenuMouseLeave).toHaveBeenCalled();

        jest.runAllTimers();

        expect(contextMenu.state.isOpen).toBeFalsy();
      });

      it('should hide menu on mouse scroll', () => {
        const mockedWindow = {};

        window.addEventListener = jest.fn((event, cb) => {
          mockedWindow[event] = cb;
        });

        TestUtils.Simulate.mouseDown(button, { button: 0 });
        expect(contextMenu.state.isOpen).toBeTruthy();

        mockedWindow.scroll();

        expect(contextMenu.state.isOpen).toBeFalsy();
      });
    });
  });
});
