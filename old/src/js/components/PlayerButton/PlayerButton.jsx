import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import camelCase from 'lodash/camelCase';

import Popover from '../Popover/Popover';

import './PlayerButton.less';

const classNamesMap = {
  play: 'sc-icon-right-arrow',
  stop: 'sc-icon-solid-square',
  replay: 'sc-icon-replay'
};

const PLAY_STATE = 'play';
const STOP_STATE = 'stop';
const REPLAY_STATE = 'replay';

const buttonStateCycleMap = {
  play: STOP_STATE,
  stop: REPLAY_STATE,
  replay: STOP_STATE
};

/* eslint-disable react/no-unused-prop-types */
class PlayerButton extends React.Component {
  static getCurrentState({ isStopped, isPlaying }) {
    let currentState = '';

    if (isStopped) {
      currentState = REPLAY_STATE;
    } else {
      currentState = isPlaying ? STOP_STATE : PLAY_STATE;
    }

    return currentState;
  }

  static isDisabled(currentState, { testValid, isStoppable, isReplayable }) {
    const isDisabled =
      !testValid ||
      (currentState === PLAY_STATE && !isStoppable) ||
      (currentState === STOP_STATE && !isStoppable) ||
      (currentState === STOP_STATE && !isReplayable) ||
      (currentState === REPLAY_STATE && !isReplayable);

    return isDisabled;
  }

  constructor(props) {
    super();

    const currentState = PlayerButton.getCurrentState(props);
    const isDisabled = PlayerButton.isDisabled(currentState, props);

    this.state = {
      currentState,
      isDisabled
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const currentState = PlayerButton.getCurrentState(nextProps);
    const isDisabled = PlayerButton.isDisabled(currentState, nextProps);

    this.setState({ currentState, isDisabled });
  }

  getButtonClass() {
    return classNamesMap[this.state.currentState];
  }

  handleButtonClick() {
    const { currentState } = this.state;

    const isDisabled = PlayerButton.isDisabled(currentState, this.props);

    this.setState({
      currentState: buttonStateCycleMap[currentState],
      isDisabled
    });

    const callbackFunctionName = camelCase(`on-${currentState}`);
    const isDeclared = typeof PlayerButton.propTypes[callbackFunctionName] === 'function';

    if (isDeclared) {
      this.props[callbackFunctionName]();
    }
  }

  render() {
    const { isDisabled } = this.state;
    const { errors } = this.props;

    const buttonClass = this.getButtonClass();
    /* eslint react/no-array-index-key: 0 */
    const errorsList = Array.isArray(errors) ? errors.map((error, i) => <div key={i}>{error}</div>) : null;

    const buttonWrapperClasses = classNames('play-button', this.props.className, {
      'play-button--not-standalone': !this.props.isStandalone
    });

    const button = (
      <div className={buttonWrapperClasses}>
        <button
          className="play-button__icon"
          disabled={isDisabled}
          onClick={this.handleButtonClick}
          type={this.props.buttonType}
        >
          <i className={buttonClass} />
        </button>
      </div>
    );

    return (
      <div>
        <Popover
          title={button}
          placement="topLeft"
          isAllowed={errorsList && isDisabled}
          isDisabled={isDisabled}
          hidePopup={this.props.hidePopup}
        >
          {errorsList}
        </Popover>
      </div>
    );
  }
}

/* eslint-enabled react/no-unused-prop-types */

PlayerButton.propTypes = {
  /**
   * Callback function on start playing
   */
  onPlay: PropTypes.func,

  /**
   * Callback function on stop playing
   */
  onStop: PropTypes.func,

  /**
   * Callback function on replay action
   */
  onReplay: PropTypes.func,

  /**
   * Specifies if test is valid and whether button should be disabled.
   * If {true} - button is enabled, if {false} - button is disabled
   */
  testValid: PropTypes.bool,

  /**
   * Specifies current button state: if {true} then button will have state of Stop Button
   */
  isPlaying: PropTypes.bool,

  /**
   * Specifies whether button in Play Button state should be disabled.
   * If {false} button will be disabled.
   */
  isStoppable: PropTypes.bool,

  /**
   * Specifies whether button in Replay Button state should be disabled.
   * If {false} button will be disabled.
   */
  isReplayable: PropTypes.bool,

  /**
   * Specifies current button state: if {true} then button will have state of Replay Button
   */
  isStopped: PropTypes.bool,

  /**
   * Specifies current button styles: if {true} then button will have round shape,
   * if not - it will have one straight corner to be used with another component.
   */
  isStandalone: PropTypes.bool,

  /**
   * Specifies list of errors. This list of error will be shown inside of a tooltip when button is hovered.
   * Popover with errors will be shown only if button is disabled.
   */
  errors: PropTypes.arrayOf(PropTypes.string),

  /**
   * Button type
   */
  buttonType: PropTypes.string,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Hide / show pop-up
   */
  hidePopup: PropTypes.bool
};

PlayerButton.defaultProps = {
  testValid: true,
  isPlaying: false,
  isStoppable: true,
  isReplayable: false,
  isStopped: false,
  isStandalone: true,
  errors: [],
  buttonType: 'button',
  onPlay: () => true,
  onStop: () => true,
  onReplay: () => true,
  className: '',
  hidePopup: false
};

export default PlayerButton;
