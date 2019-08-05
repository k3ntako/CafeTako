import React from 'react';

import styles from './index.module.css';

const convertMinToHours = ( min ) => {
  let hour = Math.floor(min / 60);
  hour = hour || 12; //if 0, change to 12
  hour = hour > 12 ? hour - 12 : hour;
  const hourStr = hour < 10 ? "0" + String(hour) : String(hour);

  const minute = min % 60
  const minuteStr = minute < 10 ? "0" + String(minute) : String(minute);

  const amPM = min < 720 ? "AM" : "PM";

  return `${hourStr}:${minuteStr} ${amPM}`
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export default (props) => {
  const { businessHours } = props;

  const businessHoursHTML = daysOfWeek.map(day => {
    const openTimeStr = convertMinToHours(businessHours[day].open_time)
    const closeTimeStr = convertMinToHours(businessHours[day].close_time)
    return <tr key={day}>
      <td className={styles.dayName}>{day}</td>
      <td>{openTimeStr} to {closeTimeStr}</td>
    </tr>
  })

  return <div>
    <h4>Hours</h4>
    <table className={styles.businessHours}>
      <tbody>
        {businessHoursHTML}
      </tbody>
    </table>
  </div>
}
