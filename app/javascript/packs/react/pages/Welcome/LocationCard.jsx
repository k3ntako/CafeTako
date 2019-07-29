import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import styles from './index.module.css';

export default (props) => {
  return <Col className={styles.card} xs={12} sm={6} lg={4}>
    <Card>
      <Card.Body>
        <Card.Title>
          <Link to={ props.location.locationURL }>
            {props.location.fullName}
          </Link>
        </Card.Title>
        <Card.Text>{ props.location.address }</Card.Text>
      </Card.Body>
    </Card>
  </Col>
}
