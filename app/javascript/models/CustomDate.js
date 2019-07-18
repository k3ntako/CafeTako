const FIELDS = [ "year", "month", "date", "hour", "minute", "second" ]

export default class CustomDate {
  constructor( date ){
    this._year = null;
    this._month = null;
    this._date = null;
    this._hour = null;
    this._minute = null;
    this._second = null;
    this._amPM = null;
    this._timezone = null; //no way to set it now;

    this.setCustomDate( date );
  }

  setCustomDate( date ){
    for ( let key in date ){
      const keyLower = key.toLowerCase();
      const number = Number(date[keyLower]);

      if( keyLower === "ampm" && date[key] && (date[key].toLowerCase() === "am" || date[key].toLowerCase() === "pm") ){
        this._amPM = date[key].toLowerCase();
      }else if( FIELDS.includes(keyLower) && !isNaN(number) ){
        this[ "_" + keyLower ] = number;
      }else if( FIELDS.includes(keyLower) && isNaN(number) ){
        console.error(`Received invalid value, "${date[key]}", for field, "${key}".`)
      }else{
        console.error(`The field, "${key}", does not exist and will be ignored.`)
      }
    }
  }

  getTimeInMinutes(){
    const pmAdjust = this._amPM === "pm" ? 12 * 60 : 0;
    return this._hour * 60 + this._minute + pmAdjust;
  }

}
