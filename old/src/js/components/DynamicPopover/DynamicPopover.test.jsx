import React from 'react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import PopoverPlacements, { POPOVER_PLACEMENTS_OPPOSITE } from './../Popover/PopoverPlacements';

describe('DynamicPopover', () => {
  let errorConsole;
  let component;

  beforeAll(() => {
    errorConsole = spyOn(console, 'error');
  });

  describe('with default props', () => {
    /* eslint-disable global-require */
    jest.resetModules();
    const DynamicPopover = require('./DynamicPopover').default;
    /* eslint-enable global-require */

    beforeEach(() => {
      component = mount(<DynamicPopover>Some content</DynamicPopover>);
    });

    it('matches snapshot', () => {
      expect(renderToJson(component)).toMatchSnapshot();
    });
  });

  describe('stateUpdaterToAvoidViewportOverflow', () => {
    /**
     * @type {onVisibilityChangeParams}
     */
    const data = {
      isVisible: true,
      tooltipX: 0,
      tooltipWidth: 0,
      contentWidth: 0,
      contentParentWidth: 0
    };

    const initialPlacement = PopoverPlacements.LEFT_TOP;
    const oppositePlacement = POPOVER_PLACEMENTS_OPPOSITE[initialPlacement];
    let DynamicPopover;

    beforeEach(() => {
      component = mount(<DynamicPopover initialPlacement={initialPlacement}>Some content</DynamicPopover>);
    });

    describe('overflowsEdge returns true and calcTooltipWidth returns 100', () => {
      beforeAll(() => {
        /* eslint-disable global-require */
        jest.resetModules();
        jest.doMock('./overflowsEdge', () => () => true);
        jest.doMock('./calcTooltipWidth', () => () => 100);
        DynamicPopover = require('./DynamicPopover').default;
        /* eslint-enable global-require */
      });

      it('its state updater returns proper state change set', () => {
        const stateUpdater = component.instance().stateUpdaterToAvoidViewportOverflow(data);
        const stateChangeSet = stateUpdater(component.state);

        expect(stateChangeSet).toEqual({
          popoverStyles: {
            width: 100,
            maxWidth: 100
          },
          placement: oppositePlacement
        });
      });
    });

    describe('overflowsEdge returns false and calcTooltipWidth returns 100', () => {
      beforeAll(() => {
        /* eslint-disable global-require */
        jest.resetModules();
        jest.doMock('./overflowsEdge', () => () => false);
        jest.doMock('./calcTooltipWidth', () => () => 100);
        DynamicPopover = require('./DynamicPopover').default;
        /* eslint-enable global-require */
      });

      it('its state updater returns proper state change set', () => {
        const stateUpdater = component.instance().stateUpdaterToAvoidViewportOverflow(data);
        const stateChangeSet = stateUpdater(component.state);

        expect(stateChangeSet).toEqual({
          popoverStyles: {
            width: 100,
            maxWidth: 100
          },
          placement: initialPlacement
        });
      });
    });
  });

  describe('onVisibilityChange', () => {
    beforeAll(() => {
      /* eslint-disable global-require */
      jest.resetModules();
      const DynamicPopover = require('./DynamicPopover').default;
      /* eslint-enable global-require */

      component = mount(<DynamicPopover>Some content</DynamicPopover>);
      component.instance().stateUpdaterToAvoidViewportOverflow = jest.fn();
    });

    beforeEach(() => {
      component.instance().stateUpdaterToAvoidViewportOverflow.mockReset();
    });

    describe('data.isVisible = false', () => {
      it('stateUpdaterToAvoidViewportOverflow is not executed', () => {
        const data = { isVisible: false };

        component.instance().onVisibilityChange(data);
        expect(component.instance().stateUpdaterToAvoidViewportOverflow).not.toBeCalled();
      });
    });

    describe('data.isVisible = true', () => {
      it('stateUpdaterToAvoidViewportOverflow is executed', () => {
        const data = { isVisible: true };

        component.instance().onVisibilityChange(data);
        expect(component.instance().stateUpdaterToAvoidViewportOverflow).toBeCalledWith(data);
      });
    });
  });

  it('prints no errors from propTypes validation', () => {
    expect(errorConsole).not.toHaveBeenCalled();
  });
});
