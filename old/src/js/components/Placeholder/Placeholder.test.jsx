import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Placeholder from './Placeholder';

const mountPlaceholder = (children = null, props = {}, mountMethod = shallow) =>
  mountMethod(<Placeholder {...props}>{children}</Placeholder>);

describe('<Placeholder />', () => {
  it('should render <Placeholder />', () => {
    const content = <div> Some placeholder content </div>;

    expect(toJson(mountPlaceholder(content))).toMatchSnapshot();
  });

  it('should render <Placeholder /> with close icon', () => {
    const content = <div> Some placeholder content </div>;
    const isClosable = true;

    expect(toJson(mountPlaceholder(content, { isClosable }))).toMatchSnapshot();
  });

  it('should call onClose when close icon clicked', () => {
    const content = <div> Some placeholder content </div>;
    const isClosable = true;
    const onClose = jest.fn();

    const placeholder = mountPlaceholder(content, { isClosable, onClose });

    placeholder.find('.placeholder__close-icon').simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
