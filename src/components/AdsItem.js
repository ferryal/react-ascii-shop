import React from 'react';
import { Card } from 'react-bootstrap';

const AdsItem = (props) => {
  const { ads } = props;

  return (
    <Card style={{ height: 150, marginBottom: 15 }}>
      <Card.Body>
        <img src={ads} style={{ height: '100%' }} alt="" />
      </Card.Body>
    </Card>
  );
};

export default AdsItem;
