import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { durationToSeconds, secondsToDurationObject } from '../../utils/timeUtils';
import { isInputInvalid } from '../../utils/timeInputUtils';
import { KEY_CODES } from '../../utils/constants';

import './DurationEditor.less';

const DELAY = 500;
const INPUTS = ['hours', 'minutes', 'seconds'];

class DurationEditor extends React.Component {
  static validateInput(value, inputName) {
    const leadingZeros = /^0+(?!\.|$)/;
    const trimmedValue = value.replace(leadingZeros, '');

    if (isInputInvalid(trimmedValue, inputName)) {
      return false;
    }

    if (Number(trimmedValue) === 0) {
      return '00';
    }

    return Number(trimmedValue) >= 10 ? String(trimmedValue) : `0${trimmedValue}`;
  }

  constructor(props) {
    super(props);

    this.state = {
      isInputShown: props.showInput,
      inputsValue: secondsToDurationObject(props.point.x),
      isAnimating: false,
      sliderInterval: 0,
      isFocus: false
    };

    this.showInput = this.showInput.bind(this);
    this.hideInput = this.hideInput.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onConfirmValueChange = this.onConfirmValueChange.bind(this);
    this.removeIsAnimating = this.removeIsAnimating.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inputsValue: secondsToDurationObject(nextProps.point.x),
      isInputShown: nextProps.showInput
    });
  }

  onFocus() {
    this.setState({ isFocus: true });
    this.showInput();
  }

  onBlur(e, inputName) {
    this.setState({ isFocus: false }, this.hideInput);
    this.onConfirmValueChange(e, inputName);
  }

  onInputChange(e, inputName) {
    this.showInput();
    const newInputsValue = this.state.inputsValue;

    newInputsValue[inputName] = e.target.value;
    this.setState({ inputsValue: newInputsValue });
  }

  onConfirmValueChange(e, inputName) {
    const validatedInput = DurationEditor.validateInput(e.target.value, inputName);

    if (validatedInput) {
      const seconds = durationToSeconds(this.state.inputsValue);
      const callback = this.props.onInputChange;

      callback(seconds);

      e.target.blur();
    }
  }

  onKeyUp(e, inputName) {
    if (e.keyCode === KEY_CODES.ENTER) {
      this.onConfirmValueChange(e, inputName);
    }
  }

  getSliderInterval() {
    return setTimeout(() => {
      this.setState({ isInputShown: false, isAnimating: false });
    }, DELAY);
  }

  showInput() {
    if (!this.state.isInputShown) {
      this.setState({ isAnimating: true });
    }
    this.setState({ isInputShown: true });
    clearTimeout(this.state.sliderInterval);
  }

  hideInput() {
    if (this.state.isFocus) {
      return;
    }
    if (this.state.isAnimating) {
      this.setState({ isInputShown: false, isAnimating: false });
    }
    this.setState({ sliderInterval: this.getSliderInterval() });
  }

  removeIsAnimating() {
    this.setState({ isAnimating: false });
  }

  render() {
    const sliderClassNames = classNames('duration-editor__slider-container__slider', {
      'duration-editor__slider-container__slider--show': this.state.isInputShown
    });

    const durationEditorClassNames = classNames('duration-editor', this.props.className, {
      'duration-editor--onTop': this.state.isInputShown
    });

    const inputs = INPUTS.map(
      inputName => (
        <div key={inputName} className="duration-editor__slider-container__slider__input-container">
          <input
            tabIndex={-1}
            value={this.state.inputsValue[inputName]}
            onFocus={this.onFocus}
            onBlur={e => this.onBlur(e, inputName)}
            onKeyUp={e => this.onKeyUp(e, inputName)}
            onChange={e => this.onInputChange(e, inputName)}
          />
        </div>
      ),
      this
    );

    const relativePositionStyles = {
      left: this.props.point.x,
      bottom: this.props.point.y
    };

    return (
      <div className={durationEditorClassNames} style={relativePositionStyles}>
        <div className="duration-editor__slider-container">
          <div
            className={sliderClassNames}
            onMouseOver={this.showInput}
            onMouseOut={this.hideInput}
            onTransitionEnd={this.removeIsAnimating}
          >
            <div className="duration-editor__slider-container__slider__top">
              <span className="duration-editor__slider-container__slider__point-name">{this.props.point.name}</span>
              {inputs}
            </div>
            <div className="duration-editor__slider-container__slider__bottom-bar" />
          </div>
        </div>
      </div>
    );
  }
}

DurationEditor.propTypes = {
  /**
   * Object with x and y coordinates.
   */
  point: PropTypes.shape({
    name: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,

  /**
   * Callback fired when one of the inputs value has changed and was valid.
   * Has one parameter - new time value in seconds.
   */
  onInputChange: PropTypes.func,
  /**
   * Flag indicating if the component should be hidden.
   */
  showInput: PropTypes.bool,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

DurationEditor.defaultProps = {
  showInput: false,
  onInputChange: () => true,
  className: ''
};

export default DurationEditor;
