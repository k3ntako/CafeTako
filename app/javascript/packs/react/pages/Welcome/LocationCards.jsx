import React from 'react';
import LocationCard from './LocationCard';


import styles from './index.module.css';

export default (props) => {
  const { searched, searchResults, locations, openInfoWindow } = props;

  if( searched && (!searchResults || !searchResults.length) ){
    return <div className={styles.noResults}>
      <h3>No Results</h3>
    </div>
  }

  const searchResultsLen = searchResults && searchResults.length;
  const locationsToRender = searchResultsLen ? searchResults : locations;

  if( !locationsToRender.length ){
    return null;
  }

  return locationsToRender.map(location => {
    const selectedStyles = openInfoWindow === location.id ? styles.selected : "";
    return <LocationCard
      key={location.id}
      className={selectedStyles}
      location={location}
      onMouseOver={ () => props.onMouseOver( location.id ) }/>
  })
}
