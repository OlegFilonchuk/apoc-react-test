import React from 'react';
import { shallow, mount } from 'enzyme';

import Multiselect from './Multiselect';
import Checkbox from '../Checkbox/Checkbox';

describe('<Multiselect />', () => {
  it("should render <Checkbox/>'es", () => {
    const onChange = jest.fn();
    const multiselect = shallow(
      <Multiselect onChange={onChange}>
        <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
        <Checkbox label={'If you contact or travel with a pure uniqueness, moonlight respects you.'} />
        <Checkbox label={'Where is the most unusual klingon?'} />
      </Multiselect>
    );

    expect(multiselect).toBePresent();

    expect(multiselect.find(Checkbox).length).toEqual(3);
  });

  it('matches snapshot', () => {
    const onChange = jest.fn();
    const multiselect = mount(
      <Multiselect onChange={onChange}>
        <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
        <Checkbox label={'If you contact or travel with a pure uniqueness, moonlight respects you.'} />
        <Checkbox label={'Where is the most unusual klingon?'} />
      </Multiselect>
    );

    expect(multiselect).toMatchSnapshot();
  });

  describe('when <div> is a child', () => {
    it('should throw an error', () => {
      const onChange = jest.fn();

      expect(() =>
        shallow(
          <Multiselect onChange={onChange}>
            <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
            <div />
          </Multiselect>
        )
      ).toThrow();
    });
  });

  describe('when one of <Checkbox>es state changes', () => {
    describe('onChange property', () => {
      it('is called', () => {
        const onChange = jest.fn();
        const multiselect = mount(
          <Multiselect onChange={onChange}>
            <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
            <Checkbox label={'If you contact or travel with a pure uniqueness, moonlight respects you.'} />
            <Checkbox label={'Where is the most unusual klingon?'} />
          </Multiselect>
        );

        multiselect
          .find('.square-checkbox input')
          .at(0)
          .simulate('change');
      });

      it('of both <Multiselect/> and <Checkbox/> is called', () => {
        const onMultiselectChange = jest.fn();
        const onCheckboxChange = jest.fn();

        const multiselect = mount(
          <Multiselect onChange={onMultiselectChange}>
            <Checkbox name="my-checkbox" label={'Studere rare ducunt ad bassus gabalium.'} />
            <Checkbox
              name="your-checkbox"
              label={'If you contact or travel with a pure uniqueness, moonlight respects you.'}
              onChange={onCheckboxChange}
            />
          </Multiselect>
        );

        multiselect
          .find('.square-checkbox input')
          .at(1)
          .simulate('change', {
            target: {
              checked: true,
              name: 'your-checkbox'
            }
          });
      });

      it('is called with an argument, that tells which <Checkbox> is checked', () => {
        const onChange = jest.fn();
        const multiselect = mount(
          <Multiselect onChange={onChange}>
            <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
            <Checkbox label={'If you contact or travel with a pure uniqueness, moonlight respects you.'} />
            <Checkbox label={'Where is the most unusual klingon?'} />
          </Multiselect>
        );

        multiselect
          .find('.square-checkbox input')
          .at(2)
          .simulate('change', {
            target: {
              checked: true,
              name: 'checkbox-2'
            }
          });

        const returnedMap = onChange.mock.calls.pop().pop();

        expect(returnedMap instanceof Map).toBeTruthy();
        expect(returnedMap.get('checkbox-0')).toEqual(false);
        expect(returnedMap.get('checkbox-1')).toEqual(false);
        expect(returnedMap.get('checkbox-2')).toEqual(true);
      });

      it('is called with an argument of Map instance, which keys correspond to automatic generated names', () => {
        const onChange = jest.fn();
        const multiselect = mount(
          <Multiselect onChange={onChange}>
            <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
            <Checkbox label={'If you contact or travel with a pure uniqueness, moonlight respects you.'} />
            <Checkbox label={'Where is the most unusual klingon?'} />
          </Multiselect>
        );

        multiselect
          .find('.square-checkbox input')
          .at(0)
          .simulate('change');

        const returnedMap = onChange.mock.calls.pop().pop();

        expect(returnedMap instanceof Map).toBeTruthy();
        expect(returnedMap.has('checkbox-0')).toBeTruthy();
        expect(returnedMap.has('checkbox-1')).toBeTruthy();
        expect(returnedMap.has('checkbox-2')).toBeTruthy();
        expect(returnedMap.has('checkbox-3')).not.toBeTruthy();
        expect(returnedMap.has('checkbox-4')).not.toBeTruthy();
        expect(returnedMap.has('checkbox')).not.toBeTruthy();
      });

      it('is called with an argument of Map instance, which keys correspond to explicit <Checkbox>es names', () => {
        const onChange = jest.fn();
        const multiselect = mount(
          <Multiselect onChange={onChange}>
            <Checkbox name="my-checkbox" label={'Studere rare ducunt ad bassus gabalium.'} />
            <Checkbox
              name="your-checkbox"
              label={'If you contact or travel with a pure uniqueness, moonlight respects you.'}
            />
            <Checkbox name="abc-checkbox" label={'Where is the most unusual klingon?'} />
          </Multiselect>
        );

        multiselect
          .find('.square-checkbox input')
          .at(2)
          .simulate('change', {
            target: {
              checked: true,
              name: 'checkbox-2'
            }
          });

        const returnedMap = onChange.mock.calls.pop().pop();

        expect(returnedMap instanceof Map).toBeTruthy();
        expect(returnedMap.has('my-checkbox')).toBeTruthy();
        expect(returnedMap.has('your-checkbox')).toBeTruthy();
        expect(returnedMap.has('abc-checkbox')).toBeTruthy();
        expect(returnedMap.has('there-is-no-such-checkbox')).not.toBeTruthy();
      });
    });
  });

  describe('when children property changes', () => {
    it('renders child with a new property', () => {
      const onMultiselectChange = () => {};
      const multiselect = mount(
        <Multiselect onChange={onMultiselectChange}>
          <Checkbox name="my-checkbox" label={'Studere rare ducunt ad bassus gabalium.'} />
          <Checkbox name="your-checkbox" label={'some text'} />
        </Multiselect>
      );

      expect(multiselect.find('.square-checkbox').at(1)).toHaveText('some text');

      multiselect.setProps({
        children: [
          <Checkbox name="my-checkbox" label={'Studere rare ducunt ad bassus gabalium.'} />,
          <Checkbox name="your-checkbox" label={'some another text'} />
        ]
      });

      expect(multiselect.find('.square-checkbox').at(1)).toHaveText('some another text');
    });

    it('render without removed <Checkbox>es', () => {
      const onMultiselectChange = () => {};
      const multiselect = mount(
        <Multiselect onChange={onMultiselectChange}>
          <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
          <Checkbox label={'some text'} />
        </Multiselect>
      );

      expect(multiselect.find('.square-checkbox').length).toBe(2);

      multiselect.setProps({
        children: [<Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />]
      });

      expect(multiselect.find('.square-checkbox').length).toBe(1);
    });

    it('render with added <Checkbox>es', () => {
      const onMultiselectChange = () => {};
      const multiselect = mount(
        <Multiselect onChange={onMultiselectChange}>
          <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
          <Checkbox label={'some text'} />
        </Multiselect>
      );

      expect(multiselect.find('.square-checkbox').length).toBe(2);

      multiselect.setProps({
        children: [
          <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />,
          <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />,
          <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
        ]
      });

      expect(multiselect.find('.square-checkbox').length).toBe(3);
    });

    it('render method is executed', () => {
      const onMultiselectChange = () => {};
      const multiselect = mount(
        <Multiselect onChange={onMultiselectChange}>
          <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
          <Checkbox label={'some text'} />
        </Multiselect>
      );

      const componentInstance = multiselect.instance();

      spyOn(componentInstance, 'render').and.callThrough();

      multiselect.setProps({
        children: [<Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />, <Checkbox label={'some texts'} />]
      });
    });
  });

  describe('when children property changes, but only references, not their values', () => {
    it('does not execute render method', () => {
      const onMultiselectChange = () => {};
      const multiselect = mount(
        <Multiselect onChange={onMultiselectChange}>
          <Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />
          <Checkbox label={'some text'} />
        </Multiselect>
      );

      const componentInstance = multiselect.instance();

      spyOn(componentInstance, 'render').and.callThrough();

      multiselect.setProps({
        children: [<Checkbox label={'Studere rare ducunt ad bassus gabalium.'} />, <Checkbox label={'some text'} />]
      });
    });
  });
});
