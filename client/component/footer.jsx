import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


const Footer = () => {
  return(
    <Grid>
      <Row className="show-grid header">
        <Col xs={12} md={8}>powered by andela</Col>
        <Col xs={6} md={4}>
         copyright
        </Col>
      </Row>
    </Grid>
  );
};


export default Footer;
