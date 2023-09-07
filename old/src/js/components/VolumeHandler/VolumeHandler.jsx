import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import getMouse from '../../utils/getMouse';

import './VolumeHandler.less';

export default class VolumeHandler extends React.Component {
  static getTopValue(top, min, max) {
    if (top > max) {
      return max;
    }
    if (top < min) {
      return min;
    }

    return top;
  }

  constructor(props) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.calculateCurrentPercentage = this.calculateCurrentPercentage.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updateSlider = this.updateSlider.bind(this);

    this.state = {
      max: props.max,
      isDragging: false,
      currentPercentage: this.calculateCurrentPercentage(props.value),
      value: props.value
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.onDragEnd);
  }

  componentWillReceiveProps(props) {
    const { value } = props;

    if (value !== this.state.value) {
      const currentPercentage = this.calculateCurrentPercentage(value);

      this.setState({ currentPercentage, value });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onDragEnd);
  }

  onMouseDown(e) {
    const startY = getMouse(e, this.wrapper).y;
    const isDragging = true;

    this.setState({ startY, isDragging });
  }

  onDrag(e) {
    e.preventDefault();

    if (this.state.isDragging) {
      const proposedY = getMouse(e, this.wrapper).y;

      document.documentElement.classList.add('volume-handler--dragging');

      this.updateSlider(proposedY);
    }
  }

  onDragEnd() {
    document.documentElement.classList.remove('volume-handler--dragging');

    this.setState({
      isDragging: false
    });
  }

  calculateCurrentPercentage(value) {
    return 100 - (value * 100) / this.props.max;
  }

  updateSlider(y) {
    const maxTop = this.wrapper.offsetHeight - 5;
    const minTop = 0;
    const proposedTop = this.slider.offsetTop - (this.state.startY - y);
    const newTop = VolumeHandler.getTopValue(proposedTop, minTop, maxTop);

    const reversePercentage = maxTop - newTop;
    const newScalePercentageValue = (reversePercentage * 100) / maxTop;

    const newValue = (this.props.max * newScalePercentageValue) / 100;

    this.setState(
      {
        currentPercentage: newTop,
        startY: y,
        value: newValue
      },
      this.props.onChange.bind(null, newValue)
    );
  }

  render() {
    const finalClassName = classNames('slider', this.props.className);
    const progressHeight = 100 - this.state.currentPercentage >= 0 ? 100 - this.state.currentPercentage : 0;
    const currentPercentage = this.state.currentPercentage;

    return (
      <div className={finalClassName}>
        <div className="slider__max-label">Max</div>
        <div
          ref={wrapper => {
            this.wrapper = wrapper;
          }}
          className="slider__scale"
        >
          <span
            ref={slider => {
              this.slider = slider;
            }}
            className="slider__thumb"
            style={{ top: `${currentPercentage}px` }}
            onMouseDown={this.onMouseDown}
          />
          <div className="slider__scale__label" style={{ top: `${currentPercentage}px` }}>
            {this.props.children}
          </div>
          <div className="slider--progress" style={{ height: `${progressHeight}%` }} />
          <div className="slider__scale--border" />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
VolumeHandler.propTypes = {
  /**
   * Current volume value
   */
  value: PropTypes.number.isRequired,

  /**
   * Maximum volume value
   */
  max: PropTypes.number.isRequired,

  /**
   * Function that triggers on volume change
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Children content of the volume handler component
   */
  children: PropTypes.node,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};
/* eslint-enable react/no-unused-prop-types */

VolumeHandler.defaultProps = {
  children: '',
  className: ''
};
