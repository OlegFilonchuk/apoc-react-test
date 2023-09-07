import React from 'react';
import { mount } from 'enzyme';

import PlayerButton from './PlayerButton';

describe('<PlayerButton />', () => {
  const playButtonClass = 'sc-icon-right-arrow';
  const stopButtonClass = 'sc-icon-solid-square';
  const replayButtonClass = 'sc-icon-replay';

  /**
   * should render enabled play button when test is valid and test is not playing
   * should render enabled stop button when test is playing
   * should render enabled replay button when test is stopped and is replayable
   * should render disabled play button when test is invalid
   * should render disabled stop button when test is valid and is playing and is not stoppable
   * should render disabled replay button when test is stopped and is not replayable
   */
  it('should render enabled play button when test is valid and test is not playing', () => {
    const button = mount(<PlayerButton testValid isPlaying={false} />);

    expect(button.state('currentState')).toEqual('play');
    expect(button.state('isDisabled')).toBeFalsy();
    expect(button.find('button')).not.toBeDisabled();
    expect(button.find('i')).toHaveClassName(playButtonClass);
  });

  it.skip('should render enabled stop button when test is playing and is stoppable', () => {
    const button = mount(<PlayerButton isPlaying isStoppable />);

    expect(button.state('currentState')).toEqual('stop');
    expect(button.state('isDisabled')).toBeFalsy();
    expect(button.find('i')).toHaveClassName(stopButtonClass);
    expect(button.find('button')).not.toBeDisabled();
  });

  it('should render enabled replay button when test is stopped and is replayable', () => {
    const button = mount(<PlayerButton isStopped isReplayable />);

    expect(button.state('currentState')).toEqual('replay');
    expect(button.state('isDisabled')).toBeFalsy();
    expect(button.find('i')).toHaveClassName(replayButtonClass);
    expect(button.find('button')).not.toBeDisabled();
  });

  it('should render disabled play button when test is invalid', () => {
    const button = mount(<PlayerButton testValid={false} />);

    expect(button.state('currentState')).toEqual('play');
    expect(button.state('isDisabled')).toBeTruthy();
    expect(button.find('i')).toHaveClassName(playButtonClass);
    expect(button.find('button')).toBeDisabled();
  });

  it('should render disabled stop button when test is valid and is playing and is not stoppable', () => {
    const button = mount(<PlayerButton testValid isPlaying isStoppable={false} />);

    expect(button.state('currentState')).toEqual('stop');
    expect(button.state('isDisabled')).toBeTruthy();
    expect(button.find('i')).toHaveClassName(stopButtonClass);
    expect(button.find('button')).toBeDisabled();
  });

  it('should render disabled replay button when test is stopped and is not replayable', () => {
    const button = mount(<PlayerButton isStopped isReplayable={false} />);

    expect(button.state('currentState')).toEqual('replay');
    expect(button.state('isDisabled')).toBeTruthy();
    expect(button.find('i')).toHaveClassName(replayButtonClass);
    expect(button.find('button')).toBeDisabled();
  });

  it('should trigger "onPlay" callback when starting playing', () => {
    const onPlay = jest.fn();

    const button = mount(<PlayerButton testValid isPlaying={false} onPlay={onPlay} />);

    button.find('button').simulate('click');

    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it.skip('should trigger "onStop" callback when stopping playing', () => {
    const onStop = jest.fn();

    const button = mount(<PlayerButton testValid isPlaying isStoppable onStop={onStop} />);

    button.find('button').simulate('click');

    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it('should trigger "onReplay" callback when replaying', () => {
    const onReplay = jest.fn();

    const button = mount(<PlayerButton testValid isStopped isReplayable onReplay={onReplay} />);

    button.find('button').simulate('click');

    expect(onReplay).toHaveBeenCalledTimes(1);
  });

  it('should not trigger "onPlay" callback when starting playing if not specified', () => {
    const onPlay = jest.fn();

    const button = mount(<PlayerButton testValid isPlaying={false} />);

    button.find('button').simulate('click');

    expect(onPlay).toHaveBeenCalledTimes(0);
  });

  it('should not trigger "onPlay" callback when trying to start playing invalid test', () => {
    const onPlay = jest.fn();

    const button = mount(<PlayerButton testValid={false} isPlaying={false} onPlay={onPlay} />);

    button.find('button').simulate('click');

    expect(onPlay).toHaveBeenCalledTimes(0);
  });

  it('should not trigger "onStop" callback when stopping not stoppable test', () => {
    const onStop = jest.fn();

    const button = mount(<PlayerButton isPlaying isStoppable={false} onStop={onStop} />);

    button.find('button').simulate('click');

    expect(onStop).toHaveBeenCalledTimes(0);
  });

  it('should not trigger "onReplay" callback when replaying not replayable test', () => {
    const onReplay = jest.fn();

    const button = mount(<PlayerButton testValid isPlaying isReplayable={false} onReplay={onReplay} />);

    button.find('button').simulate('click');

    expect(onReplay).toHaveBeenCalledTimes(0);
  });

  it('should not display any error message when test is valid', () => {
    const button = mount(<PlayerButton testValid errors={['Do not show me']} />);

    button.find('.popover-title').simulate('mouseover');

    expect(button.find('.qtip').getDOMNode().style.display).toEqual('none');
  });

  it('should display error message when test is invalid', () => {
    const button = mount(<PlayerButton testValid={false} errors={['Do not show me']} />);

    button.find('.popover-title').simulate('mouseover');

    expect(button.find('.qtip').getDOMNode().style.display).toEqual('block');
  });

  it('should have additional class when used standalone', () => {
    const button = mount(<PlayerButton testValid isStandalone={false} />);

    expect(button.find('.play-button')).toHaveClassName('play-button--not-standalone');
  });

  it.skip('should have default values for props', () => {
    const button = mount(<PlayerButton />);

    const expectedDefaultProps = {
      testValid: true,
      isPlaying: false,
      isStoppable: false,
      isReplayable: false,
      isStopped: false,
      isStandalone: true,
      errors: [],
      buttonType: 'button',
      onPlay: expect.any(Function),
      onStop: expect.any(Function),
      onReplay: expect.any(Function)
    };

    expect(button.props()).toEqual(expectedDefaultProps);
  });
});
