import React from 'react';
import Form from 'react-bootstrap/Form';
import TimePicker from 'react-time-picker';
import styles from './timePicker.module.css';

export default (props) => {
  const label = props.label.trim() && <Form.Label>{props.label}</Form.Label>;

  return <Form.Group>
    {label}
    <TimePicker
      className={styles.timePicker}
      disableClock
      onChange={ props.onChange }
      value={props.time} />
  </Form.Group>
}
