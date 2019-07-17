import FetchHelper from './FetchHelper';

export default class Location{
  constructor( props ){
    const { name, address, hours } = props;

    this._name = name;
    this._address = address;
    this._hours = hours || {};
  }

  static create( props ){
    const { name, address, hours } = props;

    if( !name || !address){
      console.error("Invalid name or address.");
      return null;
    }

    return FetchHelper.post('/api/v1/locations', {
      name, address, hours
    }).then(response => {
      console.log(response);
      return new Location( props );
    });
  }

}
