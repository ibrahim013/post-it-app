import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import MessageList from '../component/MessageList';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
import AddMessage from '../component/AddMessage';
import { connect } from 'react-redux';
import { SignOut } from '../actions/LogInAction';
import dateTime from 'date-time';
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    this.props.SignOut();
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="row linkheader" />
        <Grid data-spy="scroll">
          <Row className="show-grid ">
            <Col xs={12} md={3} className="asidelist">
              <Row className="show-grid create">
              <div id='signout'>
                    <h3>
                      <button
                        onClick={() => {
                          this.onSubmit();
                        }}
                      >
                        Sign out
                      </button>
                    </h3>
                  </div>
                <Col xs={12} md={7}>
                   <div>    
                  <h3>Groups</h3>
                  </div> 
                </Col>
                <Col xs={12} md={5} className="bot">
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
    );
  }
}

export default connect(null, { SignOut })(DashBoard);
