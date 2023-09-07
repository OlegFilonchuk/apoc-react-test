import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../Popover/Popover';

const DEFAULT_SHOW_DELAY = 500;

const withPopover = Component => {
  const DecoratedComponent = ({ tooltip, ...props }) => {
    const component = <Component {...props} />;

    return (
      <Popover title={component} showAfterDelayOf={DEFAULT_SHOW_DELAY} {...props}>
        {tooltip}
      </Popover>
    );
  };

  DecoratedComponent.propTypes = {
    /**
     * Should contain items to be placed inside of a popover body
     */
    tooltip: PropTypes.node.isRequired
  };

  DecoratedComponent.displayName = `${Component.displayName}WithPopover`;

  return DecoratedComponent;
};

export default withPopover;
