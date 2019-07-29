import React from 'react';
import TimePicker from 'react-time-picker';

export default (props) => {
  const label = props.label.trim() && <label>{props.label}</label>;

  return <div>
    { label }
    <TimePicker
      disableClock
      onChange={ props.onChange }
      value={props.time} />
  </div>
}
