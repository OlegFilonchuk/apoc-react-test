import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_BACKDROP_ZINDEX } from '../Backdrop/Backdrop';

export const ALERT_TYPES = {
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success'
};

const ALERT_TYPE_TO_CLASS = {
  [ALERT_TYPES.WARNING]: 'sc-alert-warning',
  [ALERT_TYPES.ERROR]: 'sc-alert-error',
  [ALERT_TYPES.SUCCESS]: 'sc-alert-success'
};

export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }

  componentWillMount() {
    this.setStateFromProps();
  }

  componentDidMount() {
    if (this.props.closeTimeout) {
      this.intervalId = setTimeout(this.close, this.props.closeTimeout * 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setStateFromProps();
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  setStateFromProps() {
    this.setState((previousState, props) => ({ isOpen: props.isOpen }));
  }

  close() {
    this.setState({ isOpen: false }, this.props.onClose);
  }

  render() {
    const alertClassName = `sc-alert sc-alert-closable sc-animate alert ${ALERT_TYPE_TO_CLASS[this.props.type]} ${
      this.props.className
    }`;

    const closeButton = this.props.isClosable ? (
      <button className="sc-close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true" className="sc-icon-xmark" />
      </button>
    ) : null;

    const { zIndex } = this.props;

    return this.state.isOpen ? (
      <div className={alertClassName} role="alert" style={{ zIndex }}>
        <div className="alert__label">{this.props.children}</div>

        {closeButton}
      </div>
    ) : null;
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf([ALERT_TYPES.SUCCESS, ALERT_TYPES.WARNING, ALERT_TYPES.ERROR]),

  /**
   * Whether alert should be opened or closed by default
   */
  isOpen: PropTypes.bool,
  /* eslint react/no-unused-prop-types: 0 */

  /**
   * Should alert have close button
   */
  isClosable: PropTypes.bool,

  /**
   * Callback to be called after Alert will be closed
   */
  onClose: PropTypes.func,

  /**
   * Can be either simple text or link
   */
  children: PropTypes.node.isRequired,

  /**
   * Time, expressed in seconds, after which Alert will close, set `0` to prevent autoclosing
   */
  closeTimeout: PropTypes.number,

  /**
   * Any custom class names
   */
  className: PropTypes.string,

  /**
   * Allow to directly override `z-index` for Alert
   */
  zIndex: PropTypes.number
};

Alert.defaultProps = {
  type: ALERT_TYPES.SUCCESS,
  isOpen: true,
  isClosable: true,
  onClose: () => true,
  closeTimeout: 3,
  className: '',
  zIndex: DEFAULT_BACKDROP_ZINDEX + 1
};
