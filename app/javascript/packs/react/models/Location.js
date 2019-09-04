import FetchHelper from './FetchHelper';

export default class Location{
  constructor( props ){
    const { id, name, address, business_hours, reviews, chain, lat, lng  } = props;

    this._chain = chain;
    this._id = id;
    this._name = name;
    this._address = {
      addressPart1: address.address_part_1,
      addressPart2: address.address_part_2,
      addressPart3: address.address_part_3,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      country: address.country,
    };
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
  get fullAddress(){
    const { addressPart1, addressPart2, city, state, zipcode } = this._address;
    return `${addressPart1} ${addressPart2 || ""} ${city}, ${state} ${zipcode}`;
  }
  get streetAddress(){
    const { addressPart1, addressPart2 } = this._address;
    return `${addressPart1} ${addressPart2 || ""}`;
  }
  get municipalityAddress(){
    const { city, state, zipcode } = this._address;
    return `${city}, ${state} ${zipcode}`;
  }

  static validateAddress( address ){
    if( !address ){
      console.warn("address is required and should be an object.");
      return false;
    }

    ["addressPart1", "city", "state", "zipcode", "country"].forEach(key => {
      const val = address[key];
      if( !val || typeof val !== "string" || !val.trim().length ){
        console.warn(`${key} is required`);
        return false;
      };
    });

    if( !/^[\d+]{5}$/.test(address.zipcode) ){
      console.warn("Zipcode has to be a five character long string of digits");
      return false;
    };

    ["addressPart2", "addressPart3"].forEach(key => {
      const val = address[key];
      if( val && typeof val !== "string"){
        console.warn(`${key} and addressPart3 has to be a string`);
        return false;
      }
    });

    return true;
  }

  static create( props ){
    const { name, address, businessHours, lat, lng } = props;
    const chain = Number(props.chain)

    if( !name || !Location.validateAddress(address) ){
      console.error("Invalid name or address.");
      return null;
    }else if( !chain || isNaN(chain) ){
      console.error("Invalid chain.");
      return null;
    }

    const rubyAddress = FetchHelper.convertToRubySyntax(address);

    return FetchHelper.post(`/api/v1/chains/${chain}/locations`, {
      name, address: rubyAddress, businessHours, lat, lng
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

  static search( searchString = "", lat, lng ){
    return FetchHelper.get(`/api/v1/search?search=${searchString}&lat=${lat}&lng=${lng}`)
      .then(responseJSON => {
        const locations = responseJSON.locations.map(locJSON => new Location( locJSON ));
        return {
          locations,
          bounds: Location.parseBounds( locations ),
        }
      });
  }

  static parseBounds( locations ){
    let maxLat, maxLng, minLat, minLng;
    locations.forEach(loc => {
      maxLat = !maxLat || maxLat < loc.lat ? loc.lat : maxLat;
      maxLng = !maxLng || maxLng < loc.lng ? loc.lng : maxLng;
      minLat = !minLat || minLat > loc.lat ? loc.lat : minLat;
      minLng = !minLng || minLng > loc.lng ? loc.lng : minLng;
    });

    return [
      {
        lat: minLat,
        lng: minLng,
      },{
        lat: maxLat,
        lng: maxLng,
      }
    ];
  }

  addReview( review ){
    this._reviwews.push(review);
  }

}
