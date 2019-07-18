import FetchHelper from './FetchHelper';

export default class Location{
  constructor( props ){
    const { id, name, address, businessHours, reviews } = props;

    this._id = id;
    this._name = name;
    this._address = address;
    this._businessHours = businessHours || {};
    this._reviews = reviews || [];
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
  get businessHours(){
    return this._businessHours;
  }

  static create( props ){
    const { name, address, businessHours } = props;

    if( !name || !address){
      console.error("Invalid name or address.");
      return null;
    }

    return FetchHelper.post('/api/v1/locations', {
      name, address, businessHours
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

  static get( id ){
    return FetchHelper.get('/api/v1/locations/' + id, {
      id
    })
    .then(responseJSON => responseJSON);
  }

  addReview( review ){
    this._reviwews.push(review);
  }

}
