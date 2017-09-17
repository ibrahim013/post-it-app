import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {

  return(
    <Grid bsClass="fluid header">
      <Row className="show-grid">
        <Col xs={12} md={8}><h1>POST IT</h1></Col>
        <Col xs={6} md={4}>
         
        </Col>
      </Row>
    </Grid>

  );
};


export default Header;
