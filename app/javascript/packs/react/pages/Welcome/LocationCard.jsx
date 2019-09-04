import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import styles from './index.module.css';

export default (props) => {
  const { className, location, onSelectedLocationChange } = props;
  const [chainName, locationName] = location.chainAndLocationNames;

  let locationNameHTML;
  if( chainName !== locationName ){
    locationNameHTML = <Card.Text className={styles.locationName}>
      { locationName }
    </Card.Text>
  }

  const id = "location-" + location.id;

  return <Card id={id}
      className={`${styles.card} ${className}`}
      onMouseOver={ () => onSelectedLocationChange( location.id ) } >
    <Card.Body>
      <Card.Title className={styles.cardTitle}>
        <Link to={ location.locationURL }>
          {chainName}
        </Link>
      </Card.Title>
      { locationNameHTML  }
      <Card.Text>{ location.fullAddress }</Card.Text>
    </Card.Body>
  </Card>
}
