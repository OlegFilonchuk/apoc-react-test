import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Sector from './components/Sector/Sector';
import Outline from './components/Outline';
import DragpointContainer from './components/DragpointContainer';
import NothingSelectedLabel from './components/NothingSelectedLabel';

import './PieChart.less';

/* eslint-disable react/prop-types, react/no-unused-prop-types */

/* @todo
 *  [CF-5784] We need to refactor PieChart to make it simplier && try to improve it's performance
 */

const DEFAULT_LABEL = null;
const DEFAULT_FONT_SIZE = 12;
const HANDLES_RADIUS = 8;

const getSectorComponents = ({
  data,
  sectorKey,
  radius,
  percentageShift,
  hoverIdx,
  onRemove,
  maxSectorAngle,
  outerLabelColor,
  size,
  labelOffset,
  onSectorEnter,
  hoveredSectorId,
  sectorIdForHighlight,
  draggingInProgress,
  useBendPointer,
  useHighlight,
  labels,
  fontSize,
  backgroundColor,
  maxNameLengths,
  useCoveringFix,
  piechartPadding,
  box
}) => {
  let movingPercentageShift = percentageShift;

  return data.map((sector, idx) => {
    const color = sector.color;
    const label = sector.label || DEFAULT_LABEL;

    const component = (
      <Sector
        percentageShift={movingPercentageShift}
        percentage={sector.percentage}
        color={color}
        centerShift={radius}
        label={label}
        fontSize={fontSize}
        key={sector[sectorKey]}
        highlight={idx === hoverIdx && useHighlight}
        name={sector.name}
        labels={labels}
        id={sector.id}
        hasWarn={sector.warn && sector.warn.hasWarn}
        onRemove={onRemove}
        labelOffsetData={{
          maxSectorAngle,
          outerLabelColor,
          labelOffset,
          useBendPointer
        }}
        size={size}
        numberOfElements={data.length}
        onSectorEnter={onSectorEnter}
        hoveredSectorIdForHighlight={hoveredSectorId}
        customSectorIdForHighlight={sectorIdForHighlight}
        draggingInProgress={draggingInProgress}
        backgroundColor={backgroundColor}
        maxNameLengths={maxNameLengths}
        useCoveringFix={useCoveringFix}
        piechartPadding={piechartPadding}
        box={box}
      />
    );

    movingPercentageShift += sector.percentage;

    return component;
  });
};

const getNothingSelectedLabel = ({
  size,
  nothingSelectedText,
  nothingSelectedTextFontColor,
  nothingSelectedTextFontSize,
  data
}) =>
  !data.length && (
    <NothingSelectedLabel
      size={size}
      text={nothingSelectedText}
      fontColor={nothingSelectedTextFontColor}
      fontSize={nothingSelectedTextFontSize}
    />
  );

const isDragpointContainerNeeded = ({ data, editable }) => data.length > 1 && !!editable;
const getDragpointContainer = ({
  radius,
  editable,
  data,
  percentageShift,
  onChange,
  onPercentageAdjust,
  onMouseEnter,
  onMouseLeave,
  setDraggingFlag
}) =>
  isDragpointContainerNeeded({ data, editable }) && (
    <DragpointContainer
      radius={radius}
      data={data}
      percentageShift={percentageShift}
      onChange={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPercentageAdjust={onPercentageAdjust}
      setDraggingFlag={setDraggingFlag}
    />
  );

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draggingInProgress: false
    };

    this.onDragPointMouseEnter = this.onDragPointMouseEnter.bind(this);
    this.onSectorEnter = this.onSectorEnter.bind(this);
  }

  onDragPointMouseEnter(idx, id) {
    if (!this.state.draggingInProgress) {
      this.props.onSectorHover(id);
    }
  }

  onSectorEnter(sectorId) {
    if (!this.state.draggingInProgress) {
      this.props.onSectorHover(sectorId);
    }
  }

  setDraggingFlag = draggingInProgress => {
    this.setState(prevState => ({
      ...prevState,
      draggingInProgress
    }));

    /**
     * Not made as setState callback, as there is an edge case
     * where setState or callback is not invoked
     */
    if (!draggingInProgress) {
      setTimeout(this.props.onDragEnd, 0);
    }
  };

  render() {
    const finalClassName = classNames('piechart-wrapper', this.props.className);
    const innerSize = this.props.size - HANDLES_RADIUS * 2;
    const radius = innerSize / 2;

    const sectorComponents = getSectorComponents({
      ...this.props,
      radius,
      hoverIdx: this.state.hoverIdx,
      onSectorEnter: this.onSectorEnter,
      hoveredSectorId: this.state.hoveredSectorId,
      draggingInProgress: this.state.draggingInProgress
    });

    const outline = <Outline size={innerSize} outlineWarning={this.props.outlineWarning} />;

    const nothingSelectedLabel = getNothingSelectedLabel({
      ...this.props,
      size: innerSize
    });

    const dragPointsContainer = getDragpointContainer({
      ...this.props,
      radius,
      onMouseEnter: this.onDragPointMouseEnter,
      setDraggingFlag: this.setDraggingFlag,
      isDraggingInProgress: this.isDraggingInProgress
    });

    const piechartWrapperCorrection = this.props.piechartPadding * 2;

    const styles = {
      pieChart: {
        width: this.props.size + piechartWrapperCorrection,
        height: this.props.size + piechartWrapperCorrection
      },
      warning: {
        top: `${this.props.warnMessageTopMargin}px`,
        fontSize: `${this.props.fontSize}px`
      }
    };

    const activeWarningMessages = this.props.data
      .filter(mixer => mixer.warn && mixer.warn.hasWarn)
      .map(mixer => mixer.warn.sectorWarnMessage);

    const shouldDisplayWarningMessage = activeWarningMessages.length;

    return (
      <div className={finalClassName}>
        {shouldDisplayWarningMessage ? (
          <div className="piechart-warning" style={styles.warning}>
            {activeWarningMessages[0]}
          </div>
        ) : null}
        <svg
          style={styles.pieChart}
          className="piechart"
          ref={node => {
            this.svg = node;
          }}
        >
          <defs>{this.props.highlightFilter}</defs>
          <g transform={`translate(${this.props.piechartPadding}, ${this.props.piechartPadding})`}>
            <g transform={`translate(${HANDLES_RADIUS}, ${HANDLES_RADIUS})`}>
              {outline}
              {sectorComponents}
              {dragPointsContainer}
              {nothingSelectedLabel}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

PieChart.defaultProps = {
  sectorKey: 'id',
  fontSize: DEFAULT_FONT_SIZE,
  nothingSelectedText: 'Nothing to display',
  nothingSelectedTextFontSize: 18,
  nothingSelectedTextFontColor: 'black',
  percentageShift: 0,
  editable: false,
  onChange: () => true,
  onDragEnd: () => true,
  onPercentageAdjust: percentage => percentage,
  highlightFilter: (
    <filter id="highlight">
      <feColorMatrix
        type="matrix"
        values={`
        1.3  0    0    0    0
        0    1.3  0    0    0
        0    0    1.3  0    0
        0    0    0    1    0`}
      />
    </filter>
  ),
  labelOffset: {
    innerLabelOffset: 0,
    outerLabelOffset: 0
  },
  useBendPointer: false,
  maxSectorAngle: 0,
  outerLabelColor: '#000000',
  useHighlight: true,
  piechartPadding: 0,
  sectorIdForHighlight: '',
  onSectorHover: () => true,
  backgroundColor: 'white',
  maxNameLengths: {
    inner: Infinity,
    outer: Infinity
  },
  useCoveringFix: false,
  warnMessageTopMargin: 0,
  warn: {
    hasWarn: false,
    sectorWarnMessage: ''
  },
  className: ''
};

PieChart.propTypes = {
  sectorKey: PropTypes.string,

  /**
   * Represents `Sectors` information.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Percentage displayed by `Sector`
       */
      percentage: PropTypes.number.isRequired,

      /*
       * Label for `Sector` to display - %% - will be replaced by the percentage
       */
      label: PropTypes.string,

      /**
       * Filling color of `Sector`
       */
      color: PropTypes.string.isRequired,

      /**
       * Key for this sector - used in callback events
       */
      id: PropTypes.string,

      warn: PropTypes.shape({
        hasWarn: PropTypes.bool,
        sectorWarnMessage: PropTypes.string
      })
    })
  ).isRequired,

  /**
   * Percentage by which the whole pieChart should be rotated.
   */
  percentageShift: PropTypes.number,

  /**
   * Size of SVG square side. `PieChart` is going to be placed in the center of this SVG.
   */
  size: PropTypes.number.isRequired,

  /**
   * Font size of text labels
   */
  fontSize: PropTypes.number,

  /**
   * Text that is going to be displayed in case
   * if there's no information to display with a pie chart
   */
  nothingSelectedText: PropTypes.string,

  /**
   * Font size of "Nothing is selected" text
   */
  nothingSelectedTextFontSize: PropTypes.number,

  /**
   * Font color of "Nothing is selected" text
   */
  nothingSelectedTextFontColor: PropTypes.string,

  /**
   * Is the chart editable
   */
  editable: PropTypes.bool,

  /**
   * onChange event handler - set state and control the component here.
   * Same args as DragpointContainer.onChange. Two args:
   * {
   *    data: (changed) state of the piechart
   *    percentageShift: new shift (adjusted to be 0 < shift < 1)
   * },
   * idx: of sector that's changing
   */
  onChange: PropTypes.func,

  /**
   * onDragEnd event handler - a callback when dragging ends
   */
  onDragEnd: PropTypes.func,

  /**
   * onAdjustDrag is called before distribution recalc so you can adjust
   * the percentage change
   */
  onPercentageAdjust: PropTypes.func,

  /**
   * Highlight slice SVG filter
   */
  highlightFilter: PropTypes.node,

  /**
   * Outer label offset translate after receiving too low angle,
   * Inner label offset translate to customize label offset from PieChart center
   */
  labelOffset: PropTypes.shape({
    innerLabelOffset: PropTypes.number,
    outerLabelOffset: PropTypes.number
  }),

  /**
   * If sector angle is lower than maxSectorAngle, PieChart translate labels to the outside of a PieChart
   */
  maxSectorAngle: PropTypes.number,

  /**
   * Font color of outer label
   */
  outerLabelColor: PropTypes.string,

  /**
   * Prop responsible for using highlights on a sectors
   */
  useHighlight: PropTypes.bool,
  /**
   * On sector hover callback
   */
  onSectorHover: PropTypes.func,
  /**
   * Sector with specific id to higlight
   */
  sectorIdForHighlight: PropTypes.string,
  backgroundColor: PropTypes.string,
  /**
   * max "name" label lengths
   */
  maxNameLengths: PropTypes.shape({
    inner: PropTypes.number,
    outer: PropTypes.number
  }),
  /*
   * pointer is curved, labels are moved to the left / right (depends on actual position)
   */
  useBendPointer: PropTypes.bool,
  /*
   * It partially fixes labels hovering each other on the top, if bendPointer is true
   */
  useCoveringFix: PropTypes.bool,

  warnMessageTopMargin: PropTypes.number,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

export default PieChart;
