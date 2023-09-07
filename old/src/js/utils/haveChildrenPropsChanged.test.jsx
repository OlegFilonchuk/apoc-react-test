import React from 'react';
import haveChildrenPropsChanged from './haveChildrenPropsChanged';

describe('haveChildrenPropsChanged', () => {
  describe('when arguments has different lengths', () => {
    it('returns `true`', () => {
      const currentChildren = [1, 2];
      const nextChildren = [1, 2, 3, 4];

      expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeTruthy();
    });
  });

  describe('when arguments have the same length', () => {
    describe('and currentChildren === nextChildren', () => {
      it('returns `false`', () => {
        const children = [<div someProp={1} />];

        expect(haveChildrenPropsChanged(children, children)).toBeFalsy();
      });
    });

    describe('and currentChildren !== nextChildren and', () => {
      describe('and currentChildren === [] and nextChildren === []', () => {
        it('returns `false`', () => {
          const currentChildren = [];
          const nextChildren = [];

          expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeFalsy();
        });
      });

      describe('same items references', () => {
        it('returns `false`', () => {
          const child1 = <div someProp={1} />;
          const child2 = <div someOtherProp={2} />;
          const currentChildren = [child1, child2];
          const nextChildren = [child1, child2];

          expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeFalsy();
        });
      });

      describe('same items references but different order', () => {
        it('returns `true`', () => {
          const child1 = <div someProp={1} />;
          const child2 = <div someOtherProp={2} />;
          const currentChildren = [child1, child2];
          const nextChildren = [child2, child1];

          expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeTruthy();
        });
      });

      describe('different items references', () => {
        describe('all properties are the same', () => {
          it('returns `false`', () => {
            const currentChildren = [<div someProp={1} />, <div someOtherProp={2} />];
            const nextChildren = [<div someProp={1} />, <div someOtherProp={2} />];

            expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeFalsy();
          });
        });

        describe('at least one property is different value', () => {
          it('returns `true`', () => {
            const child1 = <div someProp={1} />;
            const child2 = <div someOtherProp={2} />;
            const child2Changed = <div someOtherProp={3} />;
            const currentChildren = [child1, child2];
            const nextChildren = [child1, child2Changed];

            expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeTruthy();
          });
        });

        describe('one property is a function', () => {
          it('returns false', () => {
            const createChild = () => {
              const func = () => {};

              return <div someProp={func} />;
            };
            const currentChildren = [createChild()];
            const nextChildren = [createChild()];

            expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeFalsy();
          });
        });
      });

      describe('one element is falsy', () => {
        it('returns true', () => {
          const div = <div>Test</div>;
          const p = <p>Test</p>;
          const empty = false;

          const currentChildren = [div, p];
          const nextChildren = [div, empty];

          expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeTruthy();
        });
      });
    });
  });

  describe('when both nextChildren and currentChildren are empty', () => {
    it('returns `true`', () => {
      const currentChildren = [];
      const nextChildren = [];

      expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeFalsy();
    });
  });

  describe('when currentChildren are empty', () => {
    describe('and nextChildren not empty', () => {
      it('returns `false`', () => {
        const currentChildren = [];
        const nextChildren = [1];

        expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeTruthy();
      });
    });
  });

  describe('when nextChildren are empty', () => {
    describe('and currentChildren not empty', () => {
      it('returns `false`', () => {
        const currentChildren = [1];
        const nextChildren = [];

        expect(haveChildrenPropsChanged(currentChildren, nextChildren)).toBeTruthy();
      });
    });
  });
});
