import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import dateTime from 'date-time';
import { withRouter } from 'react-router-dom';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
import Navigation from './Navigation';

/**
 * @description add user to group
 *
 * @function DashBoard
 *
 * @return {DOM} DOM component
 */
export const DashBoard = () => (
  <div>
    <div>
      <div className="row linkheader" />
      <Grid data-spy="scroll">
        <Row className="show-grid wrapper">
          <Col xs={12} md={2} className="asidelist sidebar">
            <Row className="show-grid create-group">
              <Col md={12} className="sidenav">
                <ul className="sidelist">
                  <Navigation />
                </ul>
              </Col>
              <Col xs={7} md={6}>
                <div>
                  <h3>Groups</h3>
                </div>
              </Col>
              <Col xs={5} md={5} className="bot">
                <button
                  type="button"
                  className="btn btn-info"
                  data-toggle="collapse"
                  data-target="#addgroup"
                >
                  +
                </button>
              </Col>
            </Row>

            <div id="addgroup" className="collapse">
              <AddGroup />
            </div>
            <div>
              <GetGroupList />
            </div>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={12} className="time">
                <div> </div>
                <div className="one">
                  <div className="time-content" />
                  <h3>Today</h3>
                  <h3>{dateTime()}</h3>
                </div>
              </Col>
            </Row>
            <div />
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
);

export default withRouter(DashBoard);
