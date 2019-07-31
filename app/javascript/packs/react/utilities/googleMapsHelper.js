import FetchHelper from '../../../models/FetchHelper';
const KEY = "key=AIzaSyAVyB_KRIJxSXmogxPxaEpzOmqXH1T3KLU";

const getCoordinateFromAddress = ( address ) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&${KEY}`;
    url = url.replace(/\s+/g, "+")

    let response
    return FetchHelper.get(url);
}

export {
  getCoordinateFromAddress
}
