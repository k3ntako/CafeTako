import React, { useState } from 'react';

import CustomDate from '../../../../models/CustomDate';

const createHoursSelect = () => {
  let hours = [];
  for( let i = 1; i <= 12; i++ ){
    const hour = i < 10 ? "0" + i : String(i);
    hours.push( <option key={hour} value={hour}>{hour}</option> )
  }

  return hours;
}

const createMinsSelect = () => {
  let minutes = [];
  for( let i = 0; i < 60; i = i + 5 ){
    const minute = i < 10 ? "0" + i : String(i);
    minutes.push( <option key={minute} value={minute}>{minute}</option> )
  }

  return minutes;
}


export default (props) => {
  const hour = props.date._hour;
  const minute = props.date._minute < 10 ? "0" + String(props.date._minute) : String(props.date._minute);
  const amPM = props.date._amPM;

  const label = props.label && <label>{props.label}</label>;

  return <div>
    { label }
    <select value={hour} onChange={(e) => props.onChange({ hour: e.target.value })}>
      { createHoursSelect() }
    </select>
    <select value={minute} onChange={(e) => props.onChange({ minute: e.target.value })}>
      { createMinsSelect() }
    </select>
    <select value={amPM} onChange={(e) => props.onChange({ amPM: e.target.value })}>
      <option value={"am"}>AM</option>
      <option value={"pm"}>PM</option>
    </select>
  </div>
}
