import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InlineEllipsis.less';

export default class InlineEllipsis extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.PropTypes.node,
    width: PropTypes.string
  };

  static defaultProps = {
    className: '',
    children: '',
    width: 'auto'
  };

  render() {
    const finalClassName = classNames('inline-ellipsis', this.props.className, {
      'inline-ellipsis__with-limited-width': this.props.width !== 'auto'
    });

    return (
      <div className={finalClassName} style={{ width: this.props.width }}>
        {this.props.children}
      </div>
    );
  }
}
