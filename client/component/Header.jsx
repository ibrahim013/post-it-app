import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Navigation from '../component/Navigation';

/**
 * @description this component is the header component
 *
 * @export
 * @class Header
 * @extends {Component}
 */
export const Header = () => (
      <Grid bsClass="fluid header" className="wrapper">
        <Row className="show-grid">
          <Col xs={2} md={1} className="icon">
          <div id="content">
            <button type="button" id="sidebarCollapse"
             className="btn btn-info navbar-btn">
            <span className="glyphicon glyphicon-th-list"/>
            </button>
          </div>
          </Col>
          <Col xs={7} md={8}>
            <h3>POST IT</h3>
          </Col>
          <Col xs={5} md={4} id="links">
          <ul className="nav navbar-nav navbar-right">
            <Navigation/>
            </ul>
          </Col>
        </Row>
      </Grid>
   );


export default withRouter(Header);
