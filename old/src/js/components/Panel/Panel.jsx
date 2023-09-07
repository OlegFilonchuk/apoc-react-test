import React from 'react';
import PropTypes from 'prop-types';

import PanelHeader from './PanelHeader';

const Panel = props => {
  const getPanelData = () => {
    const children = React.Children.toArray(props.children);
    const header = children.filter(child => child.type === PanelHeader)[0];
    const content = children.filter(child => child.type !== PanelHeader);

    return { header, content };
  };

  const { header, content } = getPanelData(props);
  const { modifierClass } = props;

  return (
    <div className={`sc-panel ${modifierClass}`}>
      {header}
      <div className="sc-panel-body">{content}</div>
    </div>
  );
};

Panel.propTypes = {
  /**
   * Panel elements
   */
  children: PropTypes.node,

  /**
   * CSS modifier class to change panel appearance
   */
  modifierClass: PropTypes.string
};

Panel.defaultProps = {
  children: [],
  modifierClass: ''
};

export default Panel;
