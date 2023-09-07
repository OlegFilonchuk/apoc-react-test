import React from 'react';
import PropTypes from 'prop-types';
import DateTime from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps() {
    this.setState((previousState, props) => {
      const value = moment(props.value);

      return { value };
    });
  }

  handleChange(date) {
    const { onChange } = this.props;

    this.setState(
      () => ({ value: date }),
      () => {
        onChange(date.toDate());
      }
    );
  }

  render() {
    const { onChange, dateFormat, timeFormat, closeOnSelect, ...props } = this.props;

    return (
      <DateTime
        {...props}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        closeOnSelect={closeOnSelect}
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  /* eslint-disable react/forbid-prop-types */
  value: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.bool,
  closeOnSelect: PropTypes.bool
};

DatePicker.defaultProps = {
  onChange: () => true,
  dateFormat: 'MM/DD/YYYY',
  value: moment(),
  timeFormat: false,
  closeOnSelect: true
};

export default DatePicker;
