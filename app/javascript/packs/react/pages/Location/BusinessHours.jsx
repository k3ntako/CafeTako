import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const convertMinToHours = ( hours ) => {
  if( !hours ) return [ null, null ];
  return [ hours.open_time, hours.close_time ].map(time => {
    let hour = Math.floor(min / 60);
    hour = hour || 12; //if 0, change to 12
    hour = hour > 12 ? hour - 12 : hour;
    const hourStr = hour < 10 ? "0" + String(hour) : String(hour);

    const minute = min % 60
    const minuteStr = minute < 10 ? "0" + String(minute) : String(minute);

    const amPM = min < 720 ? "AM" : "PM";

    return `${hourStr}:${minuteStr} ${amPM}`;
  });
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const BusinessHours = (props) => {
  const { businessHours } = props;

  const businessHoursHTML = daysOfWeek.map(day => {
    const [ openTimeStr, closeTimeStr ] = convertMinToHours(businessHours[day]);

    let hours = <td>{openTimeStr} to {closeTimeStr}</td>
    if( !openTimeStr || !closeTimeStr ){
      hours = <td>Unknown</td>
    }

    return <tr key={day}>
      <td className={styles.dayName}>{day}</td>
      { hours }
    </tr>
  });

  return <div>
    <h4>Hours</h4>
    <table className={styles.businessHours}>
      <tbody>
        {businessHoursHTML}
      </tbody>
    </table>
  </div>
}

const bhShape = PropTypes.shape({
  id: PropTypes.number,
  open_time: PropTypes.number,
  close_time: PropTypes.number
})

BusinessHours.propTypes = {
  title: PropTypes.shape({
    Sunday: bhShape,
    Monday: bhShape,
    Tuesday: bhShape,
    Wednesday: bhShape,
    Thursday: bhShape,
    Friday: bhShape,
    Saturday: bhShape,
  }),
}

export default BusinessHours;
