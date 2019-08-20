import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import styles from './index.module.css';

export default (props) => {
  const [chainName, locationName] = props.location.chainAndLocationNames;

  let locationNameHTML;
  if( chainName !== locationName ){
    locationNameHTML = <Card.Text className={styles.locationName}>
      { locationName }
    </Card.Text>
  }

  return <Col className={styles.locationCard} xs={12}>
    <Card className={`${styles.card} ${props.className}`}>
      <Card.Body>
        <Card.Title className={styles.cardTitle}>
          <Link to={ props.location.locationURL }>
            {chainName}
          </Link>
        </Card.Title>
        { locationNameHTML  }
        <Card.Text>{ props.location.address }</Card.Text>
      </Card.Body>
    </Card>
  </Col>
}
