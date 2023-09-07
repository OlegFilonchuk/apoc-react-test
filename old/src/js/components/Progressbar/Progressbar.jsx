import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import numberInRange from '../../utils/validation/numberInRange';

import './Progressbar.less';

function Progressbar(props) {
  const { titleSettings, color, className, percentage } = props;

  const findProgressRange = range => (percentage >= range.min && percentage <= range.max ? range : null);

  const getBarDynamicClass = () => {
    if (color && color.dynamic) {
      const percentageRange = color.range.find(findProgressRange);

      return percentageRange ? percentageRange.className : '';
    }

    return '';
  };

  const getBarClass = () => {
    const rangeDynamicClass = getBarDynamicClass();

    return classNames(className, rangeDynamicClass, 'sc-progress-bar', {
      'progress-inner-text': titleSettings && titleSettings.inside
    });
  };

  const isTitleOutside = titleSettings && titleSettings.outside;
  const isInnerPercentage = titleSettings && titleSettings.inside;
  const title = isTitleOutside ? <span className="sa-progress-title-sync">{percentage}%</span> : null;
  const innerLabel = isInnerPercentage ? `${percentage}%` : null;
  const progressBarWidth = percentage > 100 ? 100 : percentage;

  return (
    <div>
      {title}
      <div className="sc-progress">
        <div style={{ width: `${progressBarWidth}%` }} className={getBarClass()}>
          {innerLabel}
        </div>
      </div>
    </div>
  );
}

Progressbar.propTypes = {
  /**
   * title options for title
   */
  titleSettings: PropTypes.shape({
    outside: PropTypes.bool,
    inside: PropTypes.bool
  }),

  /**
   * {Object} color Options for progressbar color
   * @property {Boolean} dynamic Has progressbar a dynamic color range
   * @property {Object} range Settings for dynamic color change
   * @property {Number} min Minimum percentage value needed to apply a class
   * @property {Number} max Maximum percentage needed to apply a class
   * @property {String} className Class name that will be applied based on min and max rules
   */
  color: PropTypes.shape({
    dynamic: PropTypes.bool,
    range: PropTypes.arrayOf(
      PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
        className: PropTypes.string
      })
    )
  }),

  /**
   * Classes to inherit
   */
  className: PropTypes.string,

  /**
   * Percentage options for title
   */
  percentage: numberInRange(0, 100)
};

Progressbar.defaultProps = {
  className: '',
  titleSettings: {
    inside: false,
    outside: false
  },
  color: {
    dynamic: false
  },
  percentage: 0
};

export default Progressbar;
