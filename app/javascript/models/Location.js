import FetchHelper from './FetchHelper';

export default class Location{
  constructor( props ){
    const { name, address, hours, id } = props;

    this._id = id;
    this._name = name;
    this._address = address;
    this._hours = hours || {};
  }

  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }
  get address(){
    return this._address;
  }
  get hours(){
    return this._hours;
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
      return new Location( props );
    });
  }

  static getAll( limit = 20 ){
    return FetchHelper.get('/api/v1/locations', {
      limit
    })
    .then(responseJSON => {
      return responseJSON.map(location => {
        return new Location( location );
      })
    });
  }

}
