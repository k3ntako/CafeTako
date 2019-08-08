import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import ReactTimePicker from 'react-time-picker';
import styles from './timePicker.module.css';

const TimePicker = (props) => {
  const label = props.label.trim() && <Form.Label>{props.label}</Form.Label>;

  return <Form.Group>
    {label}
    <ReactTimePicker
      className={styles.timePicker}
      disableClock
      onChange={ props.onChange }
      value={props.time} />
  </Form.Group>
}

TimePicker.propTypes = {
  label: PropTypes.string,
  time: PropTypes.number,
  onChange: PropTypes.func,
}

export default TimePicker;
