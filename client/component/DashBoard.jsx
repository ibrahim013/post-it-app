import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import MessageList from '../component/MessageList';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
import Members from '../component/Members';
import AddMessage from '../component/AddMessage';

class DashBoard extends React.Component {
  render() {
    return (
  <Grid data-spy="scroll">
    <Row className="show-grid ">
      <Col xs={12} md={3} className="asidelist">

        <Row className="show-grid create">
          <Col xs={12} md={7} >
            <h3>Groups</h3>
          </Col>
          <Col xs={12} md={5} className="bot">
            <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#addgroup">+</button>
          </Col>
        </Row>

        <div id="addgroup" className="collapse">
          <AddGroup />
        </div>
        <div>
          <GetGroupList />
        </div>

      </Col>
      {/* <Col xs={12} md={6}>
        <Row className=" aside">
          <Col xs={12} md={9}  >
            <h1>Messages</h1>
          </Col>
          <Col xs={12} md={3} >
            <button name="signout" className="btn btn-primary btn-small"
              onSubmit={this.onSubmit}>
              Sign out
        </button>
          </Col>
        </Row>
        <div>

          <h3>Message Board is Empty</h3>
        </div>
        <div>
          <AddMessage/>
        </div>
      </Col> */}
      {/* <Col xs={12} md={3} >
        <Row className="show-grid create">
          <Col xs={12} md={7} >
            <h3>Members</h3>
          </Col>
          <Col xs={12} md={5} className="bot">
            <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#members">+</button>
          </Col>
        </Row>
        <div id="members" className="collapse">
          <Members />
        </div>
      </Col> */}
    </Row>
  </Grid>
)
}
}

export default DashBoard;
