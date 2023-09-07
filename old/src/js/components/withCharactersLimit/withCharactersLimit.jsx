import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './withCharactersLimit.less';

const withCharactersLimit = BaseComponent => {
  class DecoratedComponent extends Component {
    constructor(props) {
      super(props);

      this.getLettersLeftCount = this.getLettersLeftCount.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
      this.setValue(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setValue(nextProps);
      }
    }

    onChange(e) {
      e.persist();
      const value = e.target.value;

      this.setState({ value }, () => {
        this.props.onChange(e);
      });
    }

    setValue(props) {
      const value = props.value;

      this.setState(prevState => ({
        ...prevState,
        value
      }));
    }

    getLettersLeftCount(inputValue) {
      const { maxLength } = this.props;
      const offset = maxLength - inputValue.length;

      return offset < 0 ? 0 : offset;
    }

    render() {
      const { value } = this.state;
      const { onChange, className, ...restProps } = this.props;
      const lettersLeftCount = this.getLettersLeftCount(value);

      return (
        <div className="characters-limit">
          <BaseComponent
            {...restProps}
            onChange={this.onChange}
            value={value}
            className={`${className} with-characters-limit-input`}
          />
          <div className="input-field__char-limit-counter">
            <div className="input-field__char-limit-counter__text">{lettersLeftCount}</div>
          </div>
        </div>
      );
    }
  }

  DecoratedComponent.propTypes = {
    ...BaseComponent.propTypes,
    /**
     * Maximum length of the textarea field
     */
    maxLength: PropTypes.number,
    value: PropTypes.string
  };

  DecoratedComponent.defaultProps = {
    ...BaseComponent.defaultProps,
    maxLength: 280,
    value: ''
  };

  DecoratedComponent.displayName = `${BaseComponent.displayName}WithCharactersLimit`;

  return DecoratedComponent;
};

export default withCharactersLimit;
