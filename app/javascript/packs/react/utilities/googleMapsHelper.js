const COMPONENT_TITLES = [ "street_number", "route", "sublocality_level_1",
  "administrative_area_level_1", "country", "postal_code" ];
// Removed: "neighborhood", "administrative_area_level_2", "postal_code_suffix"
// "administrative_area_level_2" is county in NYC
// Duplicates: "sublocality", "political"
// "sublocality" often found together with "sublocality_level_1"
// "political" often found with others, but not alone


const parsePlace = ( place ) => {
  let newAddressComponents = {};

  place.address_components.forEach(comp => {
    const type = comp.types.find(type => COMPONENT_TITLES.includes(type))
    if( type ){
      newAddressComponents[type] = comp.short_name;
    };
  });

  return Object.assign(place, { newAddressComponents });
}

module.exports = {
  parsePlace
}
