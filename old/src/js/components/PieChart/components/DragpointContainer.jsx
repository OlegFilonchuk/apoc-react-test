import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import Dragpoint from './Dragpoint';
import { roundTo } from './Sector/Math';
import { getDataTestElementProps } from '../../../utils/dataTestElementPropUtils';

const DECIMAL_PLACES = 6; // four decimal places percent accuracy
const PERCENTAGE_PERIOD = 1; // added for clarity

/*
Calculates the start percentage of a sector. Params are state/frozenState and index
*/
const getSectorStart = ({ data, percentageShift }, idx) => {
  let sectorStart = percentageShift;

  data.every((sector, sectorIdx) => {
    if (sectorIdx < idx) {
      sectorStart += sector.percentage;

      return true;
    }

    return false;
  });

  return sectorStart;
};

/*
Gets the percentage of a sector based on state, index (of the sector),
mouse/target/position percentage (0 < targetPercentage < 1) and the initial percentage of the sector
Every arguments should be adjusted to modulus 1
*/
const getNewPercentage = (frozenState, idx, targetPercentage) => {
  const { data, percentageShift } = frozenState;
  const initialPercentage = (getSectorStart(frozenState, idx) + frozenState.data[idx].percentage) % PERCENTAGE_PERIOD;
  const deltaPercentage = initialPercentage - targetPercentage;

  const adjustedShift =
    percentageShift < 0 ? (percentageShift % PERCENTAGE_PERIOD) + 1 : percentageShift % PERCENTAGE_PERIOD;
  // 0 <= adjustedShift < 1
  // 0 < targetPercentage <= 1
  const sectorStart = getSectorStart({ data, percentageShift: adjustedShift }, idx) % PERCENTAGE_PERIOD; // 0 <= ss < 1
  const sectorEnd = sectorStart + data[idx].percentage; // 0 <= se < 2
  let newPercentage = (data[idx].percentage - deltaPercentage) % PERCENTAGE_PERIOD;

  if (sectorEnd < 1 && newPercentage < 0) {
    newPercentage = 1 + newPercentage;
  }

  return newPercentage;
};

const getNewState = (frozenState, idx, targetPercentage, onPercentageAdjust) => {
  const { data, percentageShift } = frozenState;

  const newPercentage = onPercentageAdjust(getNewPercentage(frozenState, idx, targetPercentage));

  const delta = data[idx].percentage - newPercentage;
  const restPercentage = 1 - data[idx].percentage;
  const change = delta / restPercentage;
  let total = 0;
  let newPercentageShift = percentageShift;

  /*
  In a single pass
  - calc the relative change of every sector excluding the sector that is beeing dragged
  - adjust the final sector so total is always 1 (100%)
  */
  const newData = data.map((sector, sectorIdx) => {
    let percentage = sectorIdx === idx ? newPercentage : sector.percentage + sector.percentage * change;

    percentage = roundTo(percentage, DECIMAL_PLACES);
    total += percentage;

    if (sectorIdx < idx) {
      newPercentageShift -= roundTo(sector.percentage * change, DECIMAL_PLACES);
    }

    if (sectorIdx === data.length - 1) {
      percentage += roundTo(1 - total, DECIMAL_PLACES); // needed to lessen js rounding issues
    }

    return {
      ...sector,
      percentage
    };
  });

  return { data: newData, percentageShift: newPercentageShift };
};

class DragpointContainer extends Component {
  constructor(props) {
    super(props);

    this.onPointChangeStart = this.onPointChangeStart.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onPointChangeStart() {
    this.setState({
      pointChange: true,
      frozenState: {
        data: cloneDeep(this.props.data),
        percentageShift: this.props.percentageShift
      }
    });

    this.props.setDraggingFlag(true);
  }

  onPointChangeEnd = () => {
    this.props.setDraggingFlag(false);
  };

  onMouseLeave() {
    if (this.state && this.state.pointChange) {
      this.setState({
        ...this.state,
        pointChange: false
      });
    }
    this.props.onMouseLeave();
  }

  onPointChange(angle, idx) {
    const targetPercentage = angle / (Math.PI * 2);

    const newState = getNewState(this.state.frozenState, idx, targetPercentage, this.props.onPercentageAdjust);

    this.props.onChange({ ...newState }, idx);
  }

  render() {
    let percentageShift = this.props.percentageShift;

    const dragPoints = this.props.data.map((sector, idx) => {
      const component = (
        <Dragpoint
          percentage={percentageShift + sector.percentage}
          radius={this.props.radius}
          key={sector.id}
          pointRadius={this.props.pointRadius}
          onChange={angle => this.onPointChange(angle, idx)}
          onChangeStart={this.onPointChangeStart}
          onChangeEnd={this.onPointChangeEnd}
          onMouseEnter={() => this.props.onMouseEnter(idx, sector.id)}
          onMouseLeave={this.onMouseLeave}
          {...getDataTestElementProps(`dragpoint-${sector.id}`)}
        />
      );

      percentageShift += sector.percentage;

      return component;
    });

    return (
      <g
        ref={node => {
          this.node = node;
        }}
      >
        {dragPoints}
      </g>
    );
  }
}

DragpointContainer.propTypes = {
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
       * Label for `Sector` to display
       */
      label: PropTypes.string,

      /**
       * Filling color of `Sector`
       */
      color: PropTypes.string.isRequired,

      /**
       * Key for this sector - used in callback events
       */
      id: PropTypes.string
    })
  ).isRequired,

  /**
   * Inner radius(radius - handles radius) of the piechart
   */
  radius: PropTypes.number.isRequired,

  /**
   * percentageShift from the PieChart
   */
  percentageShift: PropTypes.number.isRequired,

  /**
   * Radius/size of the handle (Dragpoint)
   */
  pointRadius: PropTypes.number,

  /**
   * Callback fired on every change. Two args:
   * {
   *    data: (changed) state of the piechart
   *    percentageShift: new shift (adjusted to be 0 < shift < 1)
   * },
   * idx: of sector that's changing
   */
  onChange: PropTypes.func,

  /**
   * Callback fired when the mouse is hovering a dragpoint.
   * One arg - index of the sector this point is controlling
   */
  onMouseEnter: PropTypes.func,

  /**
   * Callback fired when the mouse stopped hovering dragpoint
   */
  onMouseLeave: PropTypes.func,

  /**
   * Callback that gives you the chance to change the percentage of the drag
   * One arg: the percentage (mouse position) of the drag.
   * For example the percentage can be rounded here and returned.
   */
  onPercentageAdjust: PropTypes.func,

  setDraggingFlag: PropTypes.func.isRequired
};

DragpointContainer.defaultProps = {
  pointRadius: 8,
  onChange: () => true,
  onMouseEnter: () => true,
  onMouseLeave: () => true,
  onPercentageAdjust: percentage => percentage
};

export default DragpointContainer;
