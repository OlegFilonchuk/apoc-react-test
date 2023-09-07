import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ProgressStatusStage.less';

export const STAGE_STATUS = {
  WAITING: 'waiting',
  INPROGRESS: 'inprogress',
  FINISHED: 'finished'
};

Object.freeze(STAGE_STATUS);

const loadingStatusIcon = (status, baseClass) => {
  if (status === STAGE_STATUS.INPROGRESS) {
    return <div className={`${baseClass}__progress-animation`} />;
  } else if (status === STAGE_STATUS.FINISHED) {
    return <span className="sc-icon-check" />;
  }

  return null;
};

function ProgressStatusStage(props) {
  const { className, title, status } = props;

  const baseClass = 'progress-status-stage';
  const containerBaseClass = `${baseClass}__container`;

  const containerClasses = classNames(containerBaseClass, className, {
    [`${containerBaseClass}--finished`]: status === STAGE_STATUS.FINISHED,
    [`${containerBaseClass}--inprogress`]: status === STAGE_STATUS.INPROGRESS
  });

  return (
    <li className={`${baseClass}__wrapper`}>
      <div className={containerClasses}>
        <span className={`${containerBaseClass}-title`}>{title}</span>
        {loadingStatusIcon(status, baseClass)}
      </div>
    </li>
  );
}

ProgressStatusStage.propTypes = {
  /**
   * List of custom classes added to component
   */
  className: PropTypes.string,
  /**
   * The status of the stage
   */
  status: PropTypes.oneOf([STAGE_STATUS.WAITING, STAGE_STATUS.INPROGRESS, STAGE_STATUS.FINISHED]),
  /**
   * The title of the stage
   * ..maybe use status prop oneOf['finished', 'inprogress'] ?!
   */
  title: PropTypes.string.isRequired
};

ProgressStatusStage.defaultProps = {
  className: '',
  status: STAGE_STATUS.WAITING
};

export default ProgressStatusStage;
