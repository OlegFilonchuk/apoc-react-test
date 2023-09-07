import React from 'react';
import Measure from 'react-measure';
import { mount } from 'enzyme';
import Collapse from './Collapse';
import CollapseHeader from './CollapseHeader';

describe('<Collapse>', () => {
  let wrapper;
  const panelWrapperClass = 'panel__wrapper';

  beforeEach(() => {
    Collapse.prototype.onHeightReady = () => {}; // mocking this function as height cannot be properly calculated in JsDOM
  });

  describe('default behaviour', () => {
    beforeEach(() => {
      wrapper = mount(
        <Collapse title="Gloss observare in placidus burdigala!" onToggled={() => true}>
          <div>Galluss sunt lunas de albus apolloniates.</div>
        </Collapse>
      );
      wrapper.setState({ height: 0 });
    });

    it('isCollapsed by default', () => {
      expect(wrapper.state('isCollapsed')).toEqual(true);
    });

    it('renders with Measure', () => {
      expect(wrapper.find(Measure)).toBePresent();
    });

    it('should change class when clicked on', () => {
      const panelWrapper = wrapper.find(`.${panelWrapperClass}`);

      expect(panelWrapper).toHaveClassName(`${panelWrapperClass}--collapsed`);

      const collapseIcon = wrapper.find('.sc-collapse-icon');

      collapseIcon.simulate('click');

      const updatedPanelWrapper = wrapper.find(`.${panelWrapperClass}`);

      expect(updatedPanelWrapper).not.toHaveClassName(`${panelWrapperClass}--collapsed`);
    });

    it('should have max-height 0 by when collapsed', () => {
      const panelWrapper = wrapper.find(`.${panelWrapperClass}`);

      expect(panelWrapper.getDOMNode().style.maxHeight).toEqual('0');
    });

    it('customContent is not present by default', () => {
      const customContent = wrapper.find(`.collapse__custom-content`);

      expect(customContent).toHaveLength(0);
    });
  });

  describe('with custom content added', () => {
    beforeEach(() => {
      wrapper = mount(
        <Collapse
          title="Gloss observare in placidus burdigala!"
          onToggled={() => true}
          customContent={
            <div>
              <span>Text 1</span>
              <span>Text 2</span>
            </div>
          }
        >
          <div>Galluss sunt lunas de albus apolloniates.</div>
        </Collapse>
      );
      wrapper.setState({ height: 0 });
    });

    it('customContent is present', () => {
      const customContent = wrapper.find(`.collapse__custom-content`);

      expect(customContent).toHaveLength(1);
    });
  });

  describe('toggling logic', () => {
    const onToggled = jest.fn();

    const mountElement = (isPanelButton, isClickDisabled) =>
      mount(
        <Collapse onToggled={onToggled} title="" isPanelButton={isPanelButton} isClickDisabled={isClickDisabled}>
          <div />
        </Collapse>
      );

    afterEach(() => onToggled.mockClear());

    describe('click is enabled', () => {
      const mountElementAndClickBySelector = (isPanelButton, selector) => {
        const element = mountElement(isPanelButton, false);

        element.find(selector).simulate('click');
      };

      describe('header click', () => {
        const headerSelector = '.sc-panel-heading';

        it('should trigger "onToggle" callback when clicking on header', () => {
          mountElementAndClickBySelector(true, headerSelector);

          expect(onToggled).toHaveBeenCalled();
        });

        it('should not trigger "onToggle" callback when clicking on header', () => {
          mountElementAndClickBySelector(false, headerSelector);

          expect(onToggled).not.toHaveBeenCalled();
        });
      });

      describe('icon click', () => {
        const iconSelector = '.sc-collapse-icon';

        it('should trigger "onToggle" callback when clicking on icon', () => {
          mountElementAndClickBySelector(true, iconSelector);

          expect(onToggled).toHaveBeenCalled();
        });

        it('should trigger "onToggle" callback when clicking on header', () => {
          mountElementAndClickBySelector(false, iconSelector);

          expect(onToggled).toHaveBeenCalled();
        });
      });
    });

    describe('click is disabled', () => {
      const mountElementAndClickEverything = isPanelButton => {
        const element = mountElement(isPanelButton, true);

        element.find('.sc-panel-heading').simulate('click');
        element.find('.sc-collapse-icon').simulate('click');
      };

      it('should trigger "onToggle" callback when clicking on header', () => {
        mountElementAndClickEverything(true);

        expect(onToggled).not.toHaveBeenCalled();
      });

      it('should not trigger "onToggle" callback when clicking on header', () => {
        mountElementAndClickEverything(false);

        expect(onToggled).not.toHaveBeenCalled();
      });
    });
  });

  describe('shouldComponentUpdate', () => {
    beforeEach(() => {
      wrapper = mount(
        <Collapse title="Gloss observare in placidus burdigala!" onToggled={() => true}>
          <div>Galluss sunt lunas de albus apolloniates.</div>
        </Collapse>
      );
      wrapper.setState({ height: 0 });
    });

    it('reacts to title changes', () => {
      const title = `Expected title ${Math.random()}`;

      wrapper.setProps({ title });

      expect(wrapper.find(CollapseHeader)).toHaveProp('title', title);
    });
  });
});
