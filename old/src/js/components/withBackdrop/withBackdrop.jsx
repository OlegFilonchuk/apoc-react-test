import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';

const getBackdrop = backdropProps => <Backdrop {...backdropProps} isVisible />;

export default (ComposedComponent, observedPropertyName) => {
  class DecoratedComponent extends Component {
    constructor(props) {
      super(props);

      /**
       * Hook into `onClose` event to detect internal state changes
       * in composed component
       */
      this.hasOnClose = typeof ComposedComponent.propTypes.onClose === 'function';

      if (this.hasOnClose) {
        this.onClose = (...args) => {
          this.setState(() => ({ isVisible: false }));

          /* eslint react/prop-types: 0 */
          this.props.onClose(...args);
        };
      }

      this.getHoc = this.getHoc.bind(this);
    }

    componentWillMount() {
      this.propsToState();
    }

    componentWillReceiveProps() {
      this.propsToState();
    }

    getHoc() {
      const { backdrop, ...props } = this.props;

      const backdropComponent = getBackdrop(backdrop);

      if (this.hasOnClose) {
        props.onClose = this.onClose;
      }

      const component = <ComposedComponent {...props} />;

      return (
        <div>
          {backdropComponent}
          {component}
        </div>
      );
    }

    propsToState() {
      this.setState((previousState, props) => ({ isVisible: props[observedPropertyName] }));
    }

    render() {
      return this.state.isVisible ? this.getHoc() : null;
    }
  }

  DecoratedComponent.propTypes = {
    backdrop: PropTypes.shape({
      ...Backdrop.propTypes
    })
  };

  DecoratedComponent.defaultProps = {
    backdrop: { ...Backdrop.defaultProps }
  };

  DecoratedComponent.displayName = `${ComposedComponent.displayName}WithBackdrop`;

  return DecoratedComponent;
};
