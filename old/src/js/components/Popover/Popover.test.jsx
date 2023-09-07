import React from 'react';
import { shallow, mount } from 'enzyme';

import Popover from './Popover';
import POPOVER_PLACEMENTS from './PopoverPlacements';
import POPOVER_OPEN_TRIGGER from './PopoverOpenTrigger';

describe('<Popover />', () => {
  const DEFAULT_DELAY = 500;

  describe('default bevahior', () => {
    it(`should have default title and placement = ${Object.keys(POPOVER_PLACEMENTS)[0]}`, () => {
      const popoverContent = 'Some content for popover';
      const popover = shallow(<Popover>{popoverContent}</Popover>);

      expect(popover).toMatchSnapshot();
    });
  });

  describe('rendering with', () => {
    describe('default placement and', () => {
      describe('simple text', () => {
        it('should match snapshot', () => {
          const simpleTextTitle = 'Simple Text Title';
          const simpleTextContent = 'Simple Popover Text Content';
          const popover = shallow(<Popover title={simpleTextTitle}>{simpleTextContent}</Popover>);

          expect(popover).toMatchSnapshot();
        });
      });

      describe('React.Element as a title', () => {
        it('should match snapshot', () => {
          const Button = () => <button>Simple React.Element</button>;
          const popover = shallow(<Popover title={<Button />}>Simple Popover Text Content</Popover>);

          expect(popover).toMatchSnapshot();
        });
      });
    });

    describe('default title and', () => {
      Object.keys(POPOVER_PLACEMENTS).forEach(placement => {
        describe(`placement="${POPOVER_PLACEMENTS[placement]}"`, () => {
          it('should match snapshot', () => {
            const popover = shallow(
              <Popover placement={POPOVER_PLACEMENTS[placement]}>Simple Popover Text Content</Popover>
            );

            expect(popover).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('open/close logic', () => {
    describe('when `isVisible` property is `true`', () => {
      describe('and `openTrigger` is manual', () => {
        it('should show popover', () => {
          const popover = mount(<Popover isVisible openTrigger={POPOVER_OPEN_TRIGGER.MANUAL} />);

          expect(popover.find('.qtip').getDOMNode().style.display).toEqual('block');
        });
      });
    });

    describe('when `isAllowed` property is', () => {
      describe('false', () => {
        it('should NOT show popover and not react to mouse events', () => {
          const popover = mount(<Popover isAllowed={false} />);

          popover.find('.popover-title').simulate('mouseover');

          expect(popover.find('.qtip').getDOMNode().style.display).toEqual('none');

          popover.find('.qtip').simulate('mouseleave');

          expect(popover.find('.qtip').getDOMNode().style.display).toEqual('none');
        });
      });

      describe('true', () => {
        describe('and user moves mouse over `.popover-title`', () => {
          describe('and then mouse leaves `.qtip`', () => {
            it('should show popover and then hide immediately', () => {
              const popover = mount(<Popover isAllowed />);

              popover.find('.popover-title').simulate('mouseover');

              expect(popover.find('.qtip').getDOMNode().style.display).toEqual('block');

              popover.find('.qtip').simulate('mouseleave');

              expect(popover.find('.qtip').getDOMNode().style.display).toEqual('none');
            });
          });

          describe('and then mouse leaves `.popover-title`', () => {
            it(`should show popover and hide after delay of ${DEFAULT_DELAY}`, () => {
              const popover = mount(<Popover isAllowed />);

              popover.find('.popover-title').simulate('mouseover');

              expect(popover.find('.qtip').getDOMNode().style.display).toEqual('block');

              popover.find('.popover-title').simulate('mouseleave');

              return new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                }, DEFAULT_DELAY);
              }).then(() => {
                expect(popover.find('.qtip').getDOMNode().style.display).toEqual('none');
              });
            });
          });
        });
      });
    });

    describe('when custom timer for hiding was not specified', () => {
      it(`should hide Popover after ${DEFAULT_DELAY}`, () => {
        const popover = mount(<Popover isAllowed />);

        popover.find('.popover-title').simulate('mouseover');
        popover.find('.popover-title').simulate('mouseleave');

        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, DEFAULT_DELAY);
        }).then(() => {
          expect(popover.find('.qtip').getDOMNode().style.display).toEqual('none');
        });
      });
    });

    describe('when user clicks close button', () => {
      it('should close popover immediately', () => {
        const popover = mount(<Popover isClosable>Some test content</Popover>);

        popover.find('.popover-title').simulate('mouseover');

        expect(popover.find('.qtip').getDOMNode().style.display).toEqual('block');

        popover
          .find('.qtip')
          .find('a')
          .simulate('click');

        expect(popover.find('.qtip').getDOMNode().style.display).toEqual('none');
      });
    });

    describe('when `openTrigger` property is specified and user', () => {
      describe('hovers `.popover-title`', () => {
        it('should NOT open Popover', () => {
          const popover = mount(<Popover openTrigger={POPOVER_OPEN_TRIGGER.CLICK_OUTSIDE}>Some test content</Popover>);

          const popoverTitle = popover.find('.popover-title');

          popoverTitle.simulate('mouseover');

          expect(popoverTitle).not.toHaveClassName('popover-title--visible');
          expect(popover.find('.qtip').getDOMNode().style.display).not.toEqual('block');
        });
      });

      describe('clicks `.popover-title`', () => {
        it('should add `popover-title--visible` and open Popover', () => {
          const popover = mount(<Popover openTrigger={POPOVER_OPEN_TRIGGER.CLICK_OUTSIDE}>Some test content</Popover>);

          const popoverTitle = popover.find('.popover-title');

          popoverTitle.simulate('click');

          expect(popoverTitle.getDOMNode().className).toContain('popover-title--visible');
        });
      });
    });

    describe('when `showAfterDelayOf` property is specified', () => {
      it('should show Popover after specified delay', () => {
        const popoverContent = 'Some content for popover';
        const showAfterDelayOf = 550;

        const popover = mount(<Popover showAfterDelayOf={showAfterDelayOf}>{popoverContent}</Popover>);

        const popoverTitle = popover.find('.popover-title');
        const qtip = popover.find('.qtip');

        expect(qtip.getDOMNode().style.display).toEqual('none');

        popoverTitle.simulate('mouseover');

        expect(qtip.getDOMNode().style.display).toEqual('none');

        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, showAfterDelayOf);
        }).then(() => {
          expect(qtip.getDOMNode().style.display).toEqual('block');
        });
      });
    });
  });

  describe('delays testing', () => {
    describe('when timer has already been set', () => {
      it('should not set timer again', () => {
        const LESS_THAN_DEFAULT_DELAY = 200;

        const popover = mount(<Popover isAllowed />);

        popover.find('.popover-title').simulate('mouseover');

        expect(popover.find('.qtip').getDOMNode().style.display).toEqual('block');

        popover.find('.popover-title').simulate('mouseleave');

        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, LESS_THAN_DEFAULT_DELAY);
        }).then(() => {
          expect(popover.find('.qtip').getDOMNode().style.display).toEqual('block');
        });
      });
    });

    describe('when user hovers `.qtip` element', () => {
      it('should clear timeout and not hide `Popover`', () => {
        const popover = mount(<Popover isAllowed />);

        popover.find('.popover-title').simulate('mouseover');
        popover.find('.popover-title').simulate('mouseleave');
        popover.find('.qtip').simulate('mouseover');

        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, DEFAULT_DELAY);
        }).then(() => expect(popover.find('.qtip').getDOMNode().style.display).toEqual('block'));
      });
    });
  });

  describe('when `popoverStyles` property is specified', () => {
    it('should apply custom styles', () => {
      const additionalStyles = {
        color: 'green',
        border: '1px solid blue'
      };
      const popover = shallow(<Popover isAllowed popoverStyles={additionalStyles} />);

      expect(popover).toMatchSnapshot();
    });
  });

  describe('when Popover is closed, `onClose` prop', () => {
    it('should be called', () => {
      const onCloseSpy = jest.fn();

      const popover = mount(<Popover onClose={onCloseSpy} />);

      popover.find('.popover-title').simulate('mouseover');

      popover.find('.qtip').simulate('mouseleave');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when `removeChildrenFromDOMWhenHidden` prop set to', () => {
    describe('`true` and Popover is hidden', () => {
      it('should not render children', () => {
        const wrapper = mount(
          <Popover removeChildrenFromDOMWhenHidden>
            <div />
          </Popover>
        );

        expect(wrapper.find('.tooltip-body > div')).not.toBePresent();
      });
    });

    describe('`true` and Popover is visible', () => {
      it('should render children', () => {
        const wrapper = mount(
          <Popover removeChildrenFromDOMWhenHidden>
            <div />
          </Popover>
        );

        wrapper.find('.popover-title').simulate('mouseover');

        expect(wrapper.find('.tooltip-body > div')).toBePresent();
      });
    });

    describe('`false` and Popover is hidden', () => {
      it('should render children', () => {
        const wrapper = mount(
          <Popover removeChildrenFromDOMWhenHidden={false}>
            <div />
          </Popover>
        );

        expect(wrapper.find('.tooltip-body > div')).toBePresent();
      });
    });
  });

  describe('when `followCursorPosition` prop is set to `true', () => {
    it('should add class `position-fixed` to qtip component', () => {
      const popover = shallow(<Popover placement={POPOVER_PLACEMENTS.BOTTOM_LEFT} followCursorPosition />);

      expect(popover.find('.qtip')).toHaveClassName('position-fixed');
    });
  });

  // TODO: since for now it's not possible to simulate `mousemove` event on a
  // TODO: component I mark this tests group as skipped until it will be fixed on enzyme-react
  describe.skip('when `followCursorPosition` prop is set to `true', () => {
    const MOUSEOVER_EVENT = 'mouseover';
    const MOUSEMOVE_EVENT = 'mousemove';
    const MOUSELEAVE_EVENT = 'mouseleave';

    describe('and `title component`', () => {
      describe('is `hovered`', () => {
        const addBackup = { ...() => {}, ...Node.prototype.addEventListener };
        const removeBackup = { ...() => {}, ...Node.prototype.removeEventListener };

        beforeEach(() => {
          Node.prototype.addEventListener = jest.fn();
          Node.prototype.removeEventListener = jest.fn();
        });

        afterEach(() => {
          Node.prototype.addEventListener = addBackup;
          Node.prototype.removeEventListener = removeBackup;
        });

        describe('when `placement`', () => {
          describe(`equal to "${POPOVER_PLACEMENTS.BOTTOM_LEFT}"`, () => {
            it(`should add "${MOUSEMOVE_EVENT}" event listener`, () => {
              const popover = mount(<Popover placement={POPOVER_PLACEMENTS.BOTTOM_LEFT} followCursorPosition />);
              const titleComponent = popover.find('.popover-title');

              titleComponent.simulate(MOUSEOVER_EVENT);

              expect(Node.prototype.addEventListener).toHaveBeenCalledWith(MOUSEMOVE_EVENT, jasmine.anything());
            });
          });

          describe(`equal to "${POPOVER_PLACEMENTS.BOTTOM_RIGHT}"`, () => {
            it(`should add "${MOUSEMOVE_EVENT}" event listener`, () => {
              const popover = mount(<Popover placement={POPOVER_PLACEMENTS.BOTTOM_RIGHT} followCursorPosition />);
              const titleComponent = popover.find('.popover-title');

              titleComponent.simulate(MOUSEOVER_EVENT);

              expect(Node.prototype.addEventListener).toHaveBeenCalledWith(MOUSEMOVE_EVENT, jasmine.anything());

              titleComponent.simulate(MOUSEMOVE_EVENT, { clientX: 0, clientY: 0 });
            });
          });

          describe(`is NOT equal to both "${POPOVER_PLACEMENTS.BOTTOM_LEFT}" or "${POPOVER_PLACEMENTS.BOTTOM_RIGHT}"`, () => {
            const placments = Object.keys(POPOVER_PLACEMENTS).map(placement => POPOVER_PLACEMENTS[placement]);

            placments.forEach(placement => {
              if (placement === POPOVER_PLACEMENTS.BOTTOM_LEFT || placement === POPOVER_PLACEMENTS.BOTTOM_RIGHT) {
                return;
              }

              describe(`and equal to ${placement}`, () => {
                it(`should not add ${MOUSEMOVE_EVENT} event listener`, () => {
                  const popover = mount(<Popover placement={placement} followCursorPosition />);
                  const titleComponent = popover.find('.popover-title');

                  titleComponent.simulate(MOUSEOVER_EVENT);

                  expect(Node.prototype.addEventListener).not.toHaveBeenCalledWith(MOUSEMOVE_EVENT, jasmine.anything());
                });
              });
            });
          });
        });

        describe(`and on "${MOUSELEAVE_EVENT}"`, () => {
          it(`should remove "${MOUSEMOVE_EVENT}" listener from "title component"`, () => {
            const popover = mount(<Popover placement={POPOVER_PLACEMENTS.BOTTOM_LEFT} followCursorPosition />);

            const titleComponent = popover.find('.popover-title');

            titleComponent.simulate(MOUSEOVER_EVENT);

            expect(Node.prototype.addEventListener).toHaveBeenCalledWith(MOUSEMOVE_EVENT, jasmine.anything());

            titleComponent.simulate(MOUSELEAVE_EVENT);

            return new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, DEFAULT_DELAY);
            }).then(() => {
              expect(Node.prototype.removeEventListener).toHaveBeenCalledWith(MOUSEMOVE_EVENT, jasmine.anything());
            });
          });
        });
      });
    });
  });
});
