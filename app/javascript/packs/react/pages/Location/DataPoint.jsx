import React from 'react';

// "units" argument is used only if the "value" is a number
// "units" is an array with the unit for 0, 1, and multiple items in that order.

export default (props) => {
  const { title, value, units } = props;

  if( !title || (!value && value !== 0) ){
    return null;
  }

  let unit = "";
  if( units && units.length ){
    const valAsNum = Number(value);
    unit = !valAsNum || typeof valAsNum !== "number" ?
      units[0] : valAsNum === 1 ?
        unit[1] : units[2];

    unit = " " + unit;
  }

  return <div>
    <strong>{ title }: </strong><span>{`${value}${unit}`}</span>
  </div>
}
