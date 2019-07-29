const convertToString = ( num ) => {
  const timeInMinutes = Number(num);
  if( isNaN(timeInMinutes) || num > 1439 || num < 0 ){
    throw new Error("Invalid time in minutes");
    return;
  }

  const mins = num % 60;
  let hours = Math.floor(num/60);
  let amPM = " AM";
  if( hours > 12 ){
    hours -= 12;
    amPM = " PM"
  }else if( hours === 0 ){
    hours = 12;
  }

  const minsStr = mins > 9 ? String(mins) : "0" + String(mins);
  const hoursStr = hours > 9 ? String(hours) : "0" + String(hours);

  return String(hoursStr) + ":" + minsStr + amPM;
}

const convertToMinutes = ( hour, minute, amPM = "AM" ) => {
  if( isNaN(Number(hour)) || hour > 12 || hour < 0 ){
    throw new Error(`Invalid hour (only 12 hour clock allowed): ${hour}`);
    return;
  }else if( isNaN(Number(minute)) || minute > 59 || minute < 0 ){
    throw new Error(`Invalid minute ${minute}`);
    return;
  }else if (!"ampm".includes(amPM.toLowerCase())) {
    throw new Error(`Invalid period (AM or PM): ${amPM}`);
    return;
  }

  const amPMAdjust = amPM.toLowerCase() === "am" ? 0 : 12 * 60;
  return hour * 60 + minute + amPMAdjust;
}

module.exports = {
  convertToString,
  convertToMinutes,
}
