import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Point.less';

const Point = props => {
  const pointClassNames = classNames('point', { 'point--onTop': props.isSelected });

  const relativePositionStyles = {
    left: props.point.x,
    bottom: props.point.y
  };

  return (
    <div className={pointClassNames} style={relativePositionStyles}>
      <div
        className="point__handler"
        onMouseDown={props.onMouseDown}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
      />
    </div>
  );
};

Point.propTypes = {
  /**
   * Object with x and y coordinates.
   */
  point: PropTypes.shape({
    name: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,

  /**
   * Callback fired on mousedown event on handler element.
   * Used by parent component to indicate start of dragging.
   */
  onMouseDown: PropTypes.func,

  /**
   * Callback fired on mouseover event on handler element.
   * Can be used by parent component for some interaction.
   */
  onMouseOver: PropTypes.func,

  /**
   * Callback fired on mouseout event on handler element.
   * Can be used by parent component for some interaction.
   */
  onMouseOut: PropTypes.func,

  /**
   * Flag indicating if current point is selected
   */
  isSelected: PropTypes.bool
};

Point.defaultProps = {
  isSelected: false,
  onMouseDown: () => true,
  onMouseOver: () => true,
  onMouseOut: () => true
};

export default Point;
