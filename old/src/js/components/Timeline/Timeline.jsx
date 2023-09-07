import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { secondsToDurationString } from '../../utils/timeUtils';

import './Timeline.less';

class Timeline extends React.Component {
  static getTimelineLabel(index, offset, time) {
    return (
      <div className="timeline__label" key={index} style={{ left: `${offset}px` }}>
        <div className="timeline__label__text">{secondsToDurationString(time)}</div>
      </div>
    );
  }

  componentDidMount() {
    this.timelineWidth = this.props.chartWidth || this.container.offsetWidth;
    this.forceUpdate();
  }

  getTimeline(duration, periods) {
    const elementTimeDuration = duration / periods;
    const getPartDuration = index => elementTimeDuration * index;

    const leftOffset = this.timelineWidth / this.props.periods;

    const timelineElement = Timeline.getTimelineLabel(0, 0, 0);

    const periodElements = [...Array(periods).keys()].map(i => {
      const elementOffset = leftOffset * (i + 1);
      const elementIndex = i + 1;
      const time = getPartDuration(elementIndex);

      return Timeline.getTimelineLabel(elementIndex, elementOffset, time);
    });

    return [timelineElement, ...periodElements];
  }

  getTimelinePoints(points) {
    return Object.keys(points).map(key => {
      const duration = (points[key] / this.props.duration) * this.timelineWidth;

      return (
        <div key={key} className="timeline__point" style={{ left: `${duration}px` }}>
          <div className="timeline__point__text">{secondsToDurationString(points[key])}</div>
        </div>
      );
    });
  }

  render() {
    const finalClassName = classNames('timeline', this.props.className);
    const timeLine = this.getTimeline(this.props.duration, this.props.periods);
    const points = this.getTimelinePoints(this.props.points || {});

    return (
      <div className={finalClassName}>
        <div
          className="timeline__labels"
          ref={container => {
            this.container = container;
          }}
        >
          {timeLine}
          {points}
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  /**
   * Timeline duration in seconds
   */
  duration: PropTypes.number.isRequired,

  /**
   * Amount of timeline bars that duration should be split to
   */
  periods: PropTypes.number,

  /**
   * Width of the timeline, optional.
   */
  chartWidth: PropTypes.number,

  /**
   * Point elements for displaying timeline labels
   */
  points: PropTypes.objectOf(PropTypes.number),

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

Timeline.defaultProps = {
  periods: 7,
  chartWidth: 0,
  points: {},
  className: ''
};

export default Timeline;
