import React from 'react';
import PropTypes from 'prop-types';

import numberInRange from '../../utils/validation/numberInRange';
import Progressbar from '../Progressbar/Progressbar';
import { STAGE_STATUS } from './ProgressStatusStage';

import './ProgressStatus.less';

function ProgressStatus(props) {
  const { className, children, progressLabel, progress } = props;

  const stageStep = 100 / children.length;

  const baseClass = 'progress-status';
  const progressStatusClasses = `${baseClass} ${className}`;
  const status = index => {
    if (stageStep * (index + 1) <= progress !== stageStep * index <= progress) {
      return STAGE_STATUS.INPROGRESS;
    } else if (stageStep * (index + 1) <= progress) {
      return STAGE_STATUS.FINISHED;
    }

    return STAGE_STATUS.WAITING;
  };

  const stages = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      status: status(index)
    })
  );

  return (
    <div className={progressStatusClasses}>
      <div className="sc-row sc-row-no-gutter">
        <div className="sc-col-sm-8 sc-col-sm-3-offset">
          <ul className={`${baseClass}__stages-container`}>{stages}</ul>
        </div>
      </div>
      <div className="sc-row sc-row-no-gutter">
        <div className={`sc-col-sm-3 ${baseClass}__label`}>{progressLabel}</div>
        <div className="sc-col-sm-8">
          <Progressbar percentage={progress} />
        </div>
        <div className={`sc-col-sm-1 ${baseClass}__progress`}>{progress}%</div>
      </div>
    </div>
  );
}

ProgressStatus.propTypes = {
  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,
  /**
   * The label of the progress ex: filename beeing processed
   */
  progressLabel: PropTypes.string.isRequired,
  /**
   * The progress so far in percents
   */
  progress: numberInRange(0, 100),
  /**
   * `ProgressStatusStage`s child nodes
   */
  children: PropTypes.node.isRequired
};

ProgressStatus.defaultProps = {
  progress: 0,
  className: ''
};

export default ProgressStatus;
