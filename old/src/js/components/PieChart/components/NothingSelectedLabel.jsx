import React from 'react';
import PropTypes from 'prop-types';

const TEXT_ANCHOR = 'middle';

function NothingSelectedLabel(props) {
  return (
    <text
      x={props.size / 2}
      y={props.size / 2}
      fontSize={props.fontSize}
      fill={props.fontColor}
      textAnchor={TEXT_ANCHOR}
    >
      {props.text}
    </text>
  );
}

NothingSelectedLabel.propTypes = {
  /*
   * an svg container size.
   * component is going to use this value to place label in the middle of container.
   */
  size: PropTypes.number.isRequired,

  /*
   * text value that is going to be displayed by this label
   */
  text: PropTypes.string.isRequired,

  /*
   * font size setting for the label
   */
  fontSize: PropTypes.number.isRequired,

  /*
   * font color setting for the label
   */
  fontColor: PropTypes.string
};

NothingSelectedLabel.defaultProps = {
  fontColor: ''
};

export default NothingSelectedLabel;
