import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PanelUtils from './PanelUtils';
import PanelMenu from './PanelMenu';

const PanelHeader = props => {
  const getHeaderData = () => {
    const children = React.Children.toArray(props.children);
    const title = children.filter(child => child.type !== PanelMenu && child.type !== PanelUtils);
    const utils = children.filter(child => child.type === PanelUtils)[0];
    const menu = children.filter(child => child.type === PanelMenu)[0];

    return { title, utils, menu };
  };

  const { title, utils, menu } = getHeaderData();
  const finalClassName = classNames('sc-panel-heading', props.className);

  return (
    <div className={finalClassName}>
      <div className="sc-panel-title">
        {title}
        {menu}
      </div>
      {utils}
    </div>
  );
};

PanelHeader.propTypes = {
  /**
   * Panel header components
   */
  children: PropTypes.node.isRequired,

  /**
   * Any custom class names
   */
  className: PropTypes.string
};

PanelHeader.defaultProps = {
  className: ''
};

export default PanelHeader;
