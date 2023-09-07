import React from 'react';
import { mount } from 'enzyme';

import FileInput from '../FileInput/FileInput';

describe('<FileInput />', () => {
  it('should render FileInput component', () => {
    const fileInput = mount(<FileInput onChange={() => true} />);

    expect(fileInput).toMatchSnapshot();
  });

  it('should tigger click on intpu type="file" when the compoenent is clicked', () => {
    const onClick = jest.fn();
    const onChange = jest.fn();

    const fileInput = mount(<FileInput onClick={onClick} onChange={onChange} />);
    const input = fileInput.find('input');

    fileInput.simulate('click');
    input.simulate('change');

    expect(onClick).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });
});
