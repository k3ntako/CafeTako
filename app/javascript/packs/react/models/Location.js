import FetchHelper from './FetchHelper';

export default class Location{
  constructor( props ){
    const { id, name, address, business_hours, reviews, chain, lat, lng  } = props;

    this._chain = chain;
    this._id = id;
    this._name = name;
    this._address = address;
    this._businessHours = business_hours || {};
    this._reviews = reviews || [];
    this._lat = Number(lat);
    this._lng = Number(lng);
  }

  get chain(){ return this._chain; }
  get id(){ return this._id; }
  get name(){ return this._name; }
  get address(){ return this._address; }
  get reviews(){ return this._reviews; }
  get businessHours(){ return this._businessHours; }
  get lat(){ return this._lat; }
  get lng(){ return this._lng; }
  get locationURL(){ return `/chains/${this._chain.id}/locations/${this._id}`; }
  get fullName(){
    if( this._chain.name.trim().toLowerCase() === this._name.trim().toLowerCase() ){
      return this._chain.name;
    }

    return `${this._chain.name} (${this._name})`;
  }
  get chainAndLocationNames(){ return [ this._chain.name, this._name ]; }

  static create( props ){
    const { name, address, businessHours, lat, lng } = props;
    const chain = Number(props.chain)

    if( !name || !address ){
      console.error("Invalid name or address.");
      return null;
    }else if( !chain || isNaN(chain) ){
      console.error("Invalid chain.");
      return null;
    }

    return FetchHelper.post(`/api/v1/chains/${chain}/locations`, {
      name, address, businessHours, lat, lng
    }).then(responseJSON => {
      let propsWithId = Object.assign({}, props, responseJSON);
      return new Location( propsWithId );
    });
  }

  static getAll( limit = 24 ){
    return FetchHelper.get('/api/v1/chains/all/locations', {
      limit
    })
    .then(responseJSON => {
      return responseJSON.map(location => {
        return new Location( location );
      })
    });
  }

  static get( chainId, id ){
    return FetchHelper.get(`/api/v1/chains/${chainId}/locations/${id}`)
      .then(responseJSON => new Location( responseJSON ));
  }

  static search( searchString, lat, lng ){
    return FetchHelper.get(`/api/v1/search?search=${searchString}&lat=${lat}&lng=${lng}`)
      .then(responseJSON => responseJSON.locations.map(locJSON => new Location( locJSON )));
  }

  addReview( review ){
    this._reviwews.push(review);
  }

}
