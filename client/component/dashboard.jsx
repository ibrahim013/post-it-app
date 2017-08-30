import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import MessageList from '../component/MessageList';

class DashBoard extends React.Component {
render() {
return (
<Grid>
  <Row className="show-grid">
      <Col xs={12} md={4}>
      <row>
        <Image src="/assets/thumbnail.png" rounded />
      </row>
      </Col>
    <Col xs={12} md={4}><MessageList/></Col>
    <Col xs={12} md={4}>this is three</Col>
    </Row>
  </Grid>
);
}
}
export default DashBoard;
