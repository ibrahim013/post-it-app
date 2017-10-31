import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import dateTime from 'date-time';
import { withRouter } from 'react-router-dom';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
import { SignOut } from '../actions/UserAction';

const socket = io();
/**
 * 
 * @description add user to group
 * @export
 * @class Dashboard
 * @extends {Component}
 */
const DashBoard = () => (
  <div>
    <div>
      <div className="row linkheader" />
      <Grid data-spy="scroll">
        <Row className="show-grid ">
          <Col xs={12} md={3} className="asidelist">
            <Row className="show-grid create-group">
              <Col xs={7} md={7}>
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
            <Row className=" ">
              <Col xs={12} md={12}>
                <div> </div>
                <div className="one">
                  <div className="" />
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
    ); }
  </div>
);

export default withRouter(connect(null, { SignOut })(DashBoard));
